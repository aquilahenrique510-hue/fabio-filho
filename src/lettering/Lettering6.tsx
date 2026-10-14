import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';
import {measureText, fitText} from '@remotion/layout-utils';
import {trava, f} from '../shared/design';
import type {Zoom} from './Lettering';
import {
  COOLVETICA,
  MONTSERRAT,
  useFontesProntas,
  LARG_ALVO,
  MOLA_MACIA,
  MOLA_DESTAQUE,
  mola,
  deriva,
  garanteQueCabe,
  LIMITES,
  SOMBRA_SUAVE,
  ritmo,
  ZOOM_EXTRA,
} from './base';

/**
 * MODELO 6 — "Crie letterings ATRATIVOS sem esforço". Referência dele em
 * 22/09/2026: print + vídeo.
 *
 * É PRIMO DO MODELO 5 no esqueleto (pequena · GRANDE · pequena, com invasão) e
 * separado dele em tudo que importa:
 *
 *   · a palavra grande é CROMADA — degradê vertical pintado dentro das letras,
 *     com um BRILHO que varre da esquerda para a direita. Medido no print dela:
 *     os tons vão de 56 a 254 dentro dos mesmos glifos, que é o contraste de um
 *     metal, não de uma cor chapada;
 *   · nada digita e nada pisca: as três linhas entram DESFOCADAS e vão ficando
 *     nítidas (os primeiros quadros do vídeo estão todos embaçados);
 *   · a pequena de cima alinha à ESQUERDA e a de baixo à DIREITA — no print a
 *     de cima começa logo depois do "A" e a de baixo termina junto do "S".
 *
 * Fontes as nossas, como sempre: Coolvetica nas pequenas, Montserrat Black na
 * grande.
 */

/**
 * O CROMADO, em paradas de degradê.
 *
 * Um metal não é "cinza": é uma pilha de faixas onde o claro e o escuro se
 * encontram de repente. A parada dupla no meio (0,50 escuro / 0,52 claro) é a
 * linha do horizonte — é ela que faz a letra parecer uma chapa polida em vez
 * de um texto com sombra.
 */
const CROMADO = [
  '#8C8C8C 0%',
  '#F2F2F2 22%',
  '#FFFFFF 38%',
  '#3E3E3E 50%',
  '#4A4A4A 52%',
  '#D8D8D8 70%',
  '#9A9A9A 86%',
  '#6E6E6E 100%',
].join(', ');

export type Tempos6 = {
  /** a linha de cima chega */
  cima: number;
  /** a palavra grande chega */
  destaque: number;
  /** a linha de baixo chega */
  baixo: number;
  /** o brilho começa a varrer a palavra */
  brilho: number;
};

/** os pontos de batida do SFX: uma por linha, e o brilho no fim */
export const cuesSfx6 = (t: Tempos6) => [
  {t: t.cima, som: 'whoosh leve', gesto: 'a linha de cima chega e desembaça'},
  {t: t.destaque, som: 'whoosh + impacto', gesto: 'a palavra cromada chega'},
  {t: t.baixo, som: 'swish', gesto: 'a linha de baixo chega'},
  {t: t.brilho, som: 'shimmer', gesto: 'o brilho varre a palavra'},
];

/** a pequena em relação ao corpo da grande (medido no print) */
const PROPORCAO_PEQUENA = 0.4;
/** quanto as pequenas invadem a grande, em fração do corpo dela */
const INVASAO = 0.09;
/** falso itálico das pequenas, em graus */
const INCLINA = 12;
/** quanto a de cima recua da borda esquerda da grande, em fração do corpo */
const RECUO_CIMA = 0.22;

export const Lettering6: React.FC<{
  cima: string;
  destaque: string;
  baixo: string;
  tempos: Tempos6;
  zoom: Zoom;
  centroY?: number;
}> = ({cima, destaque, baixo, tempos, zoom, centroY = 1180}) => {
  const frame = useCurrentFrame();
  const pronto = useFontesProntas();

  const medidas = React.useMemo(() => {
    if (!pronto) return null;
    const GRANDE = destaque.toUpperCase();
    const sD = Math.min(
      220,
      fitText({
        text: GRANDE,
        withinWidth: LARG_ALVO,
        fontFamily: MONTSERRAT,
        fontWeight: 900,
        letterSpacing: '-0.01em',
      }).fontSize
    );
    const largG = measureText({
      text: GRANDE,
      fontFamily: MONTSERRAT,
      fontWeight: 900,
      fontSize: sD,
      letterSpacing: '-0.01em',
    }).width;
    const mede = (t: string, px: number) =>
      measureText({text: t, fontFamily: COOLVETICA, fontSize: px}).width;
    /* a pequena nunca passa da grande: encolhe até caber com folga */
    const cabe = (t: string, tetoRel: number) => {
      let px = sD * PROPORCAO_PEQUENA;
      while (px > 20 && mede(t, px) > largG * tetoRel) px *= 0.96;
      return px;
    };

    garanteQueCabe('modelo 6', sD, [
      {parte: 'a linha de cima', texto: cima, max: LIMITES.modelo6.cima},
      {parte: 'a palavra grande', texto: GRANDE, max: LIMITES.modelo6.destaque},
      {parte: 'a linha de baixo', texto: baixo, max: LIMITES.modelo6.baixo},
    ]);

    return {
      sD,
      largG,
      GRANDE,
      sPcima: cabe(cima, 0.72),
      sPbaixo: cabe(baixo, 0.66),
    };
  }, [pronto, cima, destaque, baixo]);

  if (!medidas) return null;
  const {sD, largG, GRANDE, sPcima, sPbaixo} = medidas;

  const duracaoTotal = f(zoom.duracao);

  const escala = interpolate(frame, [0, duracaoTotal], [zoom.de, zoom.ate - ZOOM_EXTRA], {
    ...trava,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const anda = deriva(frame, duracaoTotal, -12);
  const some = interpolate(frame, [duracaoTotal - f(0.75), duracaoTotal - 3], [1, 0], trava);

  /**
   * CADA LINHA CHEGA DESFOCADA E DESEMBAÇA. É a entrada do vídeo dele: nada
   * digita, nada pisca — o texto já vem inteiro, fora de foco, e ganha nitidez.
   * O desfoque é grande no começo (14 px) porque é o que se vê nos primeiros
   * quadros da referência.
   */
  const chega = (t: number, molaConf = MOLA_MACIA) => {
    const k = mola(frame, t, molaConf);
    const nitidez = interpolate(frame, [f(t), f(t + 0.5)], [0, 1], trava);
    return {k, nitidez, blur: nitidez < 1 ? `blur(${((1 - nitidez) * 14).toFixed(2)}px)` : 'none'};
  };
  const c = chega(tempos.cima);
  const g = chega(tempos.destaque, MOLA_DESTAQUE);
  const b = chega(tempos.baixo);

  /**
   * O BRILHO QUE VARRE. Uma faixa clara atravessa a palavra da esquerda para a
   * direita — no vídeo o ponto claro começa no "A" e termina no "S". É um
   * segundo degradê, por cima do cromado, com a posição andando de -35% a 135%.
   */
  const varre = interpolate(frame, [f(tempos.brilho), f(tempos.brilho + 1.1)], [-35, 135], {
    ...trava,
    easing: Easing.bezier(0.35, 0, 0.2, 1),
  });

  const pequena = (px: number): React.CSSProperties => ({
    fontFamily: COOLVETICA,
    fontSize: px,
    lineHeight: 1,
    color: '#FFFFFF',
    textShadow: SOMBRA_SUAVE,
    whiteSpace: 'pre',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: centroY,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: largG,
          opacity: some,
          transform: `translateY(${anda.toFixed(2)}px) scale(${escala.toFixed(4)})`,
          transformOrigin: 'center',
        }}
      >
        {/* ── de cima, à ESQUERDA, recuada do começo da palavra ── */}
        <div
          style={{
            ...pequena(sPcima),
            marginLeft: sD * RECUO_CIMA,
            marginBottom: -sD * INVASAO,
            opacity: c.k,
            filter: c.blur,
            transform: `skewX(-${INCLINA}deg) translateY(${((1 - c.k) * sPcima * 0.5).toFixed(2)}px)`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {cima}
        </div>

        {/* ── a palavra CROMADA, com o brilho varrendo ── */}
        <div style={{position: 'relative', zIndex: 1, opacity: g.k, filter: g.blur}}>
          <div
            style={{
              fontFamily: MONTSERRAT,
              fontWeight: 900,
              fontSize: sD,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre',
              backgroundImage: `linear-gradient(180deg, ${CROMADO})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              transform: `scale(${(0.96 + 0.04 * g.k).toFixed(4)})`,
              transformOrigin: 'left center',
            }}
          >
            {GRANDE}
          </div>
          {/* o brilho: a MESMA palavra por cima, recortada por uma faixa clara */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              fontFamily: MONTSERRAT,
              fontWeight: 900,
              fontSize: sD,
              lineHeight: 1,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre',
              backgroundImage:
                'linear-gradient(100deg, transparent 0%, transparent 38%, rgba(255,255,255,.95) 50%, transparent 62%, transparent 100%)',
              backgroundSize: '260% 100%',
              backgroundPosition: `${varre.toFixed(1)}% 0`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              transform: `scale(${(0.96 + 0.04 * g.k).toFixed(4)})`,
              transformOrigin: 'left center',
              pointerEvents: 'none',
            }}
          >
            {GRANDE}
          </div>
        </div>

        {/* ── de baixo, à DIREITA ── */}
        <div
          style={{
            ...pequena(sPbaixo),
            marginTop: -sD * INVASAO,
            textAlign: 'right',
            opacity: b.k,
            filter: b.blur,
            transform: `skewX(-${INCLINA}deg) translateY(${((1 - b.k) * sPbaixo * -0.5).toFixed(2)}px)`,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {baixo}
        </div>
      </div>
    </div>
  );
};

/** tempos pelo tamanho de cada parte — as três entradas se sobrepõem */
export const tempos6De = (cima: string, destaque: string): Tempos6 => {
  const tCima = 0.12;
  const tDestaque = Number((tCima + Math.max(0.16, ritmo(cima) * 0.7)).toFixed(3));
  const tBaixo = Number((tDestaque + Math.max(0.18, ritmo(destaque) * 0.8)).toFixed(3));
  return {cima: tCima, destaque: tDestaque, baixo: tBaixo, brilho: Number((tDestaque + 0.45).toFixed(3))};
};

export const duracao6De = (cima: string, destaque: string, baixo: string) => {
  const t = tempos6De(cima, destaque);
  return Number(Math.max(1.9, t.baixo + ritmo(baixo) + 0.6 + 1.35).toFixed(2));
};
