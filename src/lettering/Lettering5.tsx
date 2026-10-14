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
  folgaAcento,
  SOMBRA_SUAVE,
  ritmo,
  ZOOM_EXTRA,
} from './base';

/**
 * MODELO 5 — "Comente TEXT para receber". Referência dele em 21/09/2026: um
 * print e, desta vez, o VÍDEO da animação (que é o que faz diferença — de print
 * não se tira movimento).
 *
 * O DESENHO, medido no print (1290×2796):
 *   · linha pequena em cima, itálica, branca;
 *   · PALAVRA GRANDE em caixa alta, LARANJA #FF6700 — medida pixel a pixel no
 *     arquivo dele, é laranja puro, não o amarelo #FFD84D da série;
 *   · linha pequena embaixo, itálica, branca;
 *   · as pequenas INVADEM a grande em cima e embaixo — a base do "Comente"
 *     entra no topo do TEXT e o topo do "para receber" entra na base dele. As
 *     caixas se sobrepõem; as letras, não (a regra de sempre).
 *
 * AS FONTES SÃO AS NOSSAS, e foi o pedido literal ("mantenha as fontes que a
 * gente usa"): Coolvetica nas pequenas, Montserrat Black na grande. A fonte do
 * print é outra e fica de fora — fonte de um modelo é identidade dele.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * O MOVIMENTO, TIRADO DO VÍDEO QUADRO A QUADRO (7,2 s a 60 fps)
 *
 * 1. A LINHA DE CIMA DIGITA, em ordem: C · Co · Com · Come · Comen · Comente.
 *    Cada letra chega com um fantasma embaçado que some.
 *
 * 2. A PALAVRA GRANDE NÃO ENTRA EM ORDEM — e é isso que dá o caráter dela.
 *    Extraí os quadros: "XT" → "T_T" → "TE_T" → "T_XT" → "TEX" → "TE_T" →
 *    "TEXT". As letras acendem EMBARALHADAS e ainda PISCAM antes de fixar.
 *    Não é digitação da esquerda para a direita; é letreiro ligando.
 *
 * 3. A LINHA DE BAIXO chega esmaecida e vai ficando branca — nos primeiros
 *    quadros ela está cinza, com o texto já inteiro.
 *
 * O resto é o padrão da série, que vale para todos os modelos: dynamic zoom do
 * bloco (110% → 100%), `deriva` para nada ficar parado depois de assentar,
 * molas moles e os 0,75 s finais desvanecendo por cima do zoom que continua.
 */

/** o laranja do print dele, medido no arquivo: 82 mil pixels em #FF6700 */
export const LARANJA = '#FF6700';

export type Tempos5 = {
  /** a linha de cima começa a digitar */
  cima: number;
  /** as letras da palavra grande começam a acender */
  destaque: number;
  /** a linha de baixo aparece */
  baixo: number;
};

/** os pontos de batida do SFX: uma tecla por letra que entra */
export const cuesSfx5 = (t: Tempos5, cima: string, destaque: string) => [
  ...cima.split('').map((_, i) => ({
    t: Number((t.cima + i * 0.055).toFixed(3)),
    som: 'pop de tecla',
    gesto: `letra ${i + 1} da linha de cima`,
  })),
  ...destaque.split('').map((_, i) => ({
    t: Number((t.destaque + i * 0.075).toFixed(3)),
    som: 'pop de tecla',
    gesto: `letra ${i + 1} da palavra grande`,
  })),
  {t: t.baixo, som: 'pop + ar', gesto: 'a linha de baixo assenta'},
];

/** intervalo entre as letras que digitam, em segundos */
const PASSO_CIMA = 0.055;
/** intervalo entre as letras que acendem na palavra grande */
const PASSO_DESTAQUE = 0.075;
/** a pequena em relação ao corpo da grande (medido no print: ~0,42) */
const PROPORCAO_PEQUENA = 0.42;
/** quanto a pequena invade a grande, em fração do corpo da grande */
const INVASAO = 0.085;
/** falso itálico das linhas pequenas, em graus */
const INCLINA = 12;

/**
 * A ORDEM EM QUE AS LETRAS ACENDEM — embaralhada, mas DETERMINÍSTICA.
 *
 * O vídeo mostra as letras entrando fora de ordem, e um `Math.random()` aqui
 * seria um erro caro: cada quadro do render é uma execução nova, e a peça
 * piscaria diferente em cada frame. Esta conta dá sempre a mesma permutação
 * para o mesmo tamanho de palavra, sem repetir índice.
 */
const ordemEmbaralhada = (n: number): number[] => {
  const passo = n % 2 === 0 ? 3 : 2;
  const fora: number[] = [];
  for (let i = 0, k = 0; i < n; i++) {
    while (fora.includes(k % n)) k++;
    fora.push(k % n);
    k += passo;
  }
  return fora;
};

/**
 * O PISCA DE CADA LETRA, em quadros a partir da entrada dela.
 * acende 2 · apaga 3 · acende 3 · apaga 2 · fica. É o que o vídeo mostra:
 * a letra aparece, some e volta antes de assentar.
 */
const acesa = (d: number): number => {
  if (d < 0) return 0;
  if (d < 2) return 1;
  if (d < 5) return 0;
  if (d < 8) return 1;
  if (d < 10) return 0;
  return 1;
};

export const Lettering5: React.FC<{
  cima: string;
  destaque: string;
  baixo: string;
  tempos: Tempos5;
  zoom: Zoom;
  centroY?: number;
}> = ({cima, destaque, baixo, tempos, zoom, centroY = 1180}) => {
  const frame = useCurrentFrame();
  const pronto = useFontesProntas();

  const medidas = React.useMemo(() => {
    if (!pronto) return null;
    const GRANDE = destaque.toUpperCase();

    /* o corpo sai da palavra grande: ela é quem ocupa a largura alvo */
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
    const sP = sD * PROPORCAO_PEQUENA;

    /* as pequenas não podem passar da grande: se passarem, encolhem até caber */
    const mede = (t: string, px: number) =>
      measureText({text: t, fontFamily: COOLVETICA, fontSize: px, letterSpacing: '0'}).width;
    const largG = measureText({
      text: GRANDE,
      fontFamily: MONTSERRAT,
      fontWeight: 900,
      fontSize: sD,
      letterSpacing: '-0.01em',
    }).width;
    const cabe = (t: string) => {
      let px = sP;
      while (px > 20 && mede(t, px) > largG * 0.98) px *= 0.96;
      return px;
    };

    garanteQueCabe('modelo 5', sD, [
      {parte: 'a linha de cima', texto: cima, max: LIMITES.modelo5.cima},
      {parte: 'a palavra grande', texto: GRANDE, max: LIMITES.modelo5.destaque},
      {parte: 'a linha de baixo', texto: baixo, max: LIMITES.modelo5.baixo},
    ]);

    return {sD, sPcima: cabe(cima), sPbaixo: cabe(baixo), largG, GRANDE};
  }, [pronto, cima, destaque, baixo]);

  if (!medidas) return null;
  const {sD, sPcima, sPbaixo, GRANDE} = medidas;

  const duracaoTotal = f(zoom.duracao);

  /* dynamic zoom que NÃO trava: segue descendo 3% até o último quadro */
  const escala = interpolate(frame, [0, duracaoTotal], [zoom.de, zoom.ate - ZOOM_EXTRA], {
    ...trava,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  /* nada fica parado depois de assentar */
  const anda = deriva(frame, duracaoTotal, 14);
  /* os 0,75 s finais desvanecem POR CIMA do movimento que continua */
  const some = interpolate(
    frame,
    [duracaoTotal - f(0.75), duracaoTotal - 3],
    [1, 0],
    trava
  );

  const letrasCima = cima.split('');
  const letrasGrande = GRANDE.split('');
  const ordem = ordemEmbaralhada(letrasGrande.length);

  /* a linha de baixo: entra inteira, esmaecida, e vai ficando branca */
  const kBaixo = mola(frame, tempos.baixo, MOLA_MACIA);
  const nitidezBaixo = interpolate(
    frame,
    [f(tempos.baixo), f(tempos.baixo + 0.45)],
    [0, 1],
    trava
  );

  const pequena = (px: number): React.CSSProperties => ({
    fontFamily: COOLVETICA,
    fontSize: px,
    lineHeight: 1,
    color: '#FFFFFF',
    textShadow: SOMBRA_SUAVE,
    whiteSpace: 'pre',
    transform: `skewX(-${INCLINA}deg)`,
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: some,
          transform: `translateY(${anda.toFixed(2)}px) scale(${escala.toFixed(4)})`,
          transformOrigin: 'center',
        }}
      >
        {/* ── a linha de cima DIGITA, letra a letra, em ordem ── */}
        <div
          style={{
            ...pequena(sPcima),
            marginBottom: -sD * INVASAO - folgaAcento(cima) * sPcima,
            zIndex: 2,
          }}
        >
          {letrasCima.map((c, i) => {
            const t = tempos.cima + i * PASSO_CIMA;
            const k = mola(frame, t, MOLA_MACIA);
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: k,
                  /* o fantasma embaçado que some, como no vídeo */
                  filter: k < 1 ? `blur(${((1 - k) * 7).toFixed(2)}px)` : 'none',
                  transform: `translateY(${((1 - k) * sPcima * 0.28).toFixed(2)}px)`,
                }}
              >
                {c === ' ' ? ' ' : c}
              </span>
            );
          })}
        </div>

        {/* ── a palavra grande: letras acendem EMBARALHADAS, piscando ── */}
        <div
          style={{
            fontFamily: MONTSERRAT,
            fontWeight: 900,
            fontSize: sD,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: LARANJA,
            whiteSpace: 'pre',
            zIndex: 1,
          }}
        >
          {letrasGrande.map((c, i) => {
            /* a i-ésima letra a acender é ordem[i] — não a i-ésima da palavra */
            const posicaoNaFila = ordem.indexOf(i);
            const t = tempos.destaque + posicaoNaFila * PASSO_DESTAQUE;
            const d = frame - f(t);
            const ligada = acesa(d);
            const k = mola(frame, t, MOLA_DESTAQUE);
            return (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  opacity: ligada,
                  transform: `scale(${(0.88 + 0.12 * k).toFixed(4)})`,
                }}
              >
                {c === ' ' ? ' ' : c}
              </span>
            );
          })}
        </div>

        {/* ── a linha de baixo: chega esmaecida e fica branca ── */}
        <div
          style={{
            ...pequena(sPbaixo),
            marginTop: -sD * INVASAO,
            zIndex: 2,
            opacity: kBaixo,
            color: `rgba(255,255,255,${(0.45 + 0.55 * nitidezBaixo).toFixed(3)})`,
            filter: nitidezBaixo < 1 ? `blur(${((1 - nitidezBaixo) * 5).toFixed(2)}px)` : 'none',
            transform: `skewX(-${INCLINA}deg) translateY(${((1 - kBaixo) * sPbaixo * 0.4).toFixed(2)}px)`,
          }}
        >
          {baixo}
        </div>
      </div>
    </div>
  );
};

/** tempos tirados do tamanho de cada parte, como nos outros modelos */
export const tempos5De = (cima: string, destaque: string): Tempos5 => {
  const fimCima = 0.12 + cima.length * PASSO_CIMA;
  const inicioDestaque = Number((fimCima - 0.1).toFixed(3));
  const fimDestaque = inicioDestaque + destaque.length * PASSO_DESTAQUE;
  return {
    cima: 0.12,
    destaque: inicioDestaque,
    baixo: Number((fimDestaque - 0.08).toFixed(3)),
  };
};

export const duracao5De = (cima: string, destaque: string, baixo: string) => {
  const t = tempos5De(cima, destaque);
  return Number(Math.max(1.9, t.baixo + ritmo(baixo) + 0.55 + 1.35).toFixed(2));
};
