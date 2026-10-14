import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, useVideoConfig} from 'remotion';
import {fitText, measureText} from '@remotion/layout-utils';
import {trava, f} from '../shared/design';
import type {Zoom} from './Lettering';
import {
  COOLVETICA,
  MONTSERRAT,
  useFontesProntas,
  mola,
  MOLA_MACIA,
  MOLA_DESTAQUE,
  SOMBRA_SUAVE,
  SOMBRA_SUAVE_FILTRO,
  LARG_ALVO,
  folgaAcento,
  deriva,
  garanteQueCabe,
  LIMITES,
  ZOOM_EXTRA,
} from './base';

/**
 * LETTERING DE DESTAQUE — MODELO 2, pedido em 15/09/2026:
 * "faz também um lettering que é na mesma pegada, só que as letras menores
 * ficam em cima e a palavra destaque fica embaixo, e só, animação de baixo pra
 * cima com o mesmo zoom dinâmico".
 *
 *   texto pequeno  Coolvetica, em cima, até duas linhas  → sobe, linha a linha
 *   destaque       Montserrat Black, embaixo, caixa alta  → sobe logo depois
 *
 * "E SÓ": sem corte na diagonal, sem desembaçar, sem terceira linha. O que ele
 * herda do modelo 1 é a PEGADA — as mesmas fontes, a mesma sombra suave, o
 * mesmo dynamic zoom, as mesmas molas, a mesma regra de as letras nunca
 * encostarem, e o motion blur de câmera na composição (Modelo2.tsx).
 *
 * AS DUAS ENTRADAS SE SOBREPÕEM: o destaque começa a subir quando o texto
 * pequeno ainda está chegando — a regra da v4 ("uma animação começar junto com
 * a outra") vale aqui também.
 *
 * AS MOLAS SÃO SUPERAMORTECIDAS NAS DUAS LINHAS, e não é timidez: as duas sobem
 * na direção de algo — o texto pequeno em direção à borda de cima, o destaque em
 * direção ao texto pequeno. Passar do ponto seria o destaque encostar no texto
 * de cima no meio do movimento.
 */

export type Tempos2 = {
  /** o texto pequeno começa a subir */
  pequena: number;
  /** a palavra destaque começa a subir */
  destaque: number;
};

/** os pontos de batida para o SFX saem dos mesmos tempos que movem o texto */
export const cuesSfx2 = (t: Tempos2, linhasPequenas: number) => [
  ...Array.from({length: linhasPequenas}).map((_, i) => ({
    /* 0,05 e não 0,08: é o passo real com que as palavras sobem (ver o
       `tempos.pequena + i * 0.05` lá embaixo). Enquanto nada tocava esses
       cues, os dois números conviveram sem ninguém notar. */
    t: Number((t.pequena + i * 0.05).toFixed(3)),
    som: i === 0 ? 'whoosh leve' : 'swish curto',
    gesto: `texto pequeno, linha ${i + 1}, sobe`,
  })),
  {t: t.destaque, som: 'whoosh + impact/pop', gesto: 'a palavra destaque sobe e assenta'},
];

/**
 * UMA LINHA SÓ EM CIMA, CASADA COM A LARGURA DA PALAVRA DESTAQUE.
 *
 * Ele viu o primeiro exemplo (a frase inteira em cima, em duas linhas) e
 * cortou: "não precisa desse tanto de palavras, coloca tipo umas 3 ou 4
 * palavras em cima e só uma embaixo". O desenho do modelo 2 é esse: 3–4
 * palavras em cima numa linha só, UMA palavra embaixo.
 *
 * O corpo do texto pequeno cresce até a linha ocupar 96% da largura da palavra
 * destaque: as duas viram um bloco fechado, sem sobra de um lado. Teto de 46%
 * do corpo do destaque, para o destaque continuar mandando.
 *
 * A quebra em duas linhas continua no código como rede de proteção (se alguém
 * passar uma frase longa), mas não é o desenho.
 */
const blocoPequeno = (texto: string, sD: number, largD: number) => {
  const palavras = texto.split(' ');
  const mede = (s: string, corpo: number) => measureText({text: s, fontFamily: COOLVETICA, fontSize: corpo}).width;
  const corpoUmaLinha = (largD * 0.96 * 100) / mede(texto, 100);
  if (corpoUmaLinha >= sD * 0.3) {
    return {sP: Math.min(sD * 0.46, corpoUmaLinha), palavras, linhas: [palavras.map((_, i) => i)]};
  }
  let melhor = 1;
  let menorMax = Infinity;
  for (let q = 1; q < palavras.length; q++) {
    const m = Math.max(mede(palavras.slice(0, q).join(' '), 100), mede(palavras.slice(q).join(' '), 100));
    if (m < menorMax) {
      menorMax = m;
      melhor = q;
    }
  }
  const corpo = Math.min(sD * 0.6, (largD * 0.82 * 100) / menorMax);
  return {
    sP: corpo,
    palavras,
    linhas: [palavras.slice(0, melhor).map((_, i) => i), palavras.slice(melhor).map((_, i) => i + melhor)],
  };
};

export const Lettering2: React.FC<{
  pequena: string;
  destaque: string;
  tempos: Tempos2;
  zoom?: Zoom;
  centroY?: number;
}> = ({pequena, destaque, tempos, zoom, centroY = 1180}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: duracaoTotal} = useVideoConfig();
  const pronto = useFontesProntas();

  const medidas = React.useMemo(() => {
    if (!pronto) return null;
    const sD = Math.min(
      260,
      fitText({text: destaque, withinWidth: LARG_ALVO, fontFamily: MONTSERRAT, fontWeight: 900, letterSpacing: '-0.02em'}).fontSize
    );
    // limites calibrados pelos casos aprovados (o modelo 2 quebra a pequena em
    // duas linhas, então aguenta um pouco mais de texto que os outros)
    garanteQueCabe('modelo 2', sD, [
      {parte: 'a linha pequena de cima', texto: pequena, max: LIMITES.modelo2.pequena},
      {parte: 'o destaque', texto: destaque, max: LIMITES.modelo2.destaque},
    ]);
    const largD = measureText({text: destaque, fontFamily: MONTSERRAT, fontWeight: 900, fontSize: sD, letterSpacing: '-0.02em'}).width;
    return {sD, ...blocoPequeno(pequena, sD, largD)};
  }, [pronto, pequena, destaque]);

  if (!medidas) return null;
  const {sD, sP, palavras, linhas} = medidas;
  const n = linhas.length;
  const passoLinha = sP * 1.08;

  /**
   * A MONTAGEM VERTICAL, pela métrica das fontes (line-height 1):
   *   Montserrat: topo das maiúsculas a 0,1585 em, base a 0,8585 em.
   *   Coolvetica: base a 0,867 em, descendente +0,233 em, ascendente ~0,72 em.
   * A descendente da ÚLTIMA linha pequena termina 6% do corpo do destaque acima
   * do topo das maiúsculas dele. O bloco visual (da ascendente da primeira linha
   * pequena até a base do destaque) fica centrado em `centroY`.
   */
  const topoD =
    centroY - (0.957 * sD - (0.953 + (n - 1) * 1.08) * sP) / 2;
  // acento em maiúscula (Ô, Ã, É…) sobe ~0,12 em acima das capitulares: no
  // primeiro render o "m" de "um" quase encostou no circunflexo de ELETRÔNICO
  const topoCaps = topoD + 0.1585 * sD - folgaAcento(destaque) * sD;
  const topoUltimaPequena = topoCaps - 0.06 * sD - 1.1 * sP;
  const topoPrimeiraPequena = topoUltimaPequena - (n - 1) * passoLinha;

  /*
    O ZOOM NÃO PARA E O TEXTO SAI DESVANECENDO ("deixa o movimento de zoom até
    ele sumir desvanecendo, bem fluido"): a escala segue descendo mais 3% até o
    último quadro e os 0,75 s finais esmaecem por cima desse movimento — nada
    de terminar parado e nítido.
  */
  const z = zoom
    ? interpolate(frame, [0, duracaoTotal], [zoom.de, zoom.ate - ZOOM_EXTRA], {
        ...trava,
        easing: Easing.bezier(0.3, 0.2, 0.25, 1),
      })
    : 1;
  const desvanece = interpolate(frame, [duracaoTotal - f(0.75), duracaoTotal - 1], [1, 0], {
    ...trava,
    easing: Easing.bezier(0.4, 0, 0.7, 1),
  });

  const kD = mola(frame, tempos.destaque, MOLA_DESTAQUE);
  const opD = interpolate(frame, [f(tempos.destaque), f(tempos.destaque + 0.45)], [0, 1], trava);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: desvanece,
          // deriva: o bloco nunca para de andar, mesmo depois de assentar
          transform: `translateY(${deriva(frame, duracaoTotal, -14).toFixed(2)}px) scale(${z.toFixed(5)})`,
          transformOrigin: `540px ${centroY}px`,
        }}
      >
        {/*
          TEXTO PEQUENO — PALAVRA POR PALAVRA, de baixo para cima ("toda vindo
          de baixo pra cima"). 0,05 s entre palavras: junto o bastante para
          ainda ler como uma linha só subindo, solto o bastante para ter onda.
        */}
        {linhas.map((indices, li) => (
          <div
            key={li}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: topoPrimeiraPequena + li * passoLinha,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'baseline',
              gap: sP * 0.26,
              fontFamily: COOLVETICA,
              fontSize: sP,
              lineHeight: 1,
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}
          >
            {indices.map((i) => {
              const t = tempos.pequena + i * 0.05;
              const k = mola(frame, t, MOLA_MACIA);
              const op = interpolate(frame, [f(t), f(t + 0.45)], [0, 1], trava);
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    textShadow: SOMBRA_SUAVE,
                    opacity: op,
                    transform: `translateY(${((1 - k) * sP * 2.4).toFixed(2)}px)`,
                    filter: k < 0.99 ? `blur(${((1 - k) * 9).toFixed(2)}px)` : undefined,
                  }}
                >
                  {palavras[i]}
                </span>
              );
            })}
          </div>
        ))}

        {/* DESTAQUE — sobe de mais longe e mais pesado */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: topoD,
            textAlign: 'center',
            fontFamily: MONTSERRAT,
            fontWeight: 900,
            fontSize: sD,
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            opacity: opD,
            transform: `translateY(${((1 - kD) * sD * 1.15).toFixed(2)}px) scale(${(1 + (1 - kD) * 0.05).toFixed(4)})`,
            filter: `${kD < 0.99 ? `blur(${((1 - kD) * 13).toFixed(2)}px) ` : ''}${SOMBRA_SUAVE_FILTRO}`,
          }}
        >
          {destaque}
        </div>
      </div>
    </AbsoluteFill>
  );
};
