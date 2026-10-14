import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, useVideoConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {trava, f, COR} from '../shared/design';
import type {Zoom} from './Lettering';
import {
  COOLVETICA,
  MONTSERRAT,
  useFontesProntas,
  mola,
  MOLA_MACIA,
  MOLA_DESTAQUE,
  SOMBRA_SUAVE,
  LARG_ALVO,
  folgaAcento,
  deriva,
  garanteQueCabe,
  LIMITES,
  ZOOM_EXTRA,
} from './base';

/**
 * LETTERING DE DESTAQUE — MODELO 4, do print que ele mandou em 15/09/2026
 * ("para dar VIDA / em nossos / VÍDEOS").
 *
 *   linha A   pequena branca + PALAVRA AMARELA, lado a lado, mesma base
 *   linha B   pequena branca, deslocada para a direita
 *   linha C   PALAVRA AMARELA, deslocada mais ainda para a direita
 *
 * O que é próprio deste modelo:
 * - DUAS palavras de destaque, não uma, e em AMARELO (`COR.marca`, o mesmo
 *   amarelo do marca-texto da série) contra o branco das pequenas.
 * - ESCADA NA DIAGONAL: cada linha começa mais à direita que a anterior, e o
 *   bloco inteiro desce para a direita. É o escalonamento que dá o movimento
 *   no print, mesmo parado.
 * - As linhas se APERTAM na vertical (as caixas se invadem), mantendo a regra da
 *   série: as LETRAS não encostam — inclusive o acento do "Í" de VÍDEOS, que é
 *   exatamente o caso que o print tem e que já me pegou no modelo 2.
 *
 * Fontes: as padrão dele — Coolvetica nas pequenas, Montserrat Black nos
 * destaques. O peso light é identidade do modelo 3 e não vem para cá.
 *
 * O TAMANHO SAI DE DUAS RESTRIÇÕES, a mais apertada manda: a linha A inteira
 * (pequena + destaque) e a linha C (o outro destaque) têm de caber na largura
 * alvo da série.
 */

export type Tempos4 = {
  /** a linha A (pequena + 1º destaque) entra */
  linhaA: number;
  /** a linha B (pequena) entra */
  linhaB: number;
  /** a linha C (2º destaque) entra */
  linhaC: number;
};

export const cuesSfx4 = (t: Tempos4) => [
  {t: t.linhaA, som: 'whoosh curto', gesto: 'pequena + 1º destaque sobem'},
  {t: t.linhaB, som: 'swish', gesto: 'a pequena do meio sobe'},
  {t: t.linhaC, som: 'whoosh + impacto', gesto: 'o 2º destaque sobe e assenta'},
];

/** inclinação do falso itálico, em graus — a mesma do modelo 3 */
const INCLINA = 9;

export const Lettering4: React.FC<{
  pequena1: string;
  destaque1: string;
  pequena2: string;
  destaque2: string;
  tempos: Tempos4;
  zoom?: Zoom;
  centroY?: number;
}> = ({pequena1, destaque1, pequena2, destaque2, tempos, zoom, centroY = 1180}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: duracaoTotal} = useVideoConfig();
  const pronto = useFontesProntas();

  const medidas = React.useMemo(() => {
    if (!pronto) return null;
    const por100 = (texto: string, familia: string, peso?: number) =>
      measureText({
        text: texto,
        fontFamily: familia,
        fontSize: 100,
        fontWeight: peso,
        letterSpacing: peso === 900 ? '-0.02em' : undefined,
      }).width / 100;

    const kP1 = por100(pequena1, COOLVETICA);
    const kP2 = por100(pequena2, COOLVETICA);
    const kD1 = por100(destaque1, MONTSERRAT, 900);
    const kD2 = por100(destaque2, MONTSERRAT, 900);

    const PROPORCAO_PEQUENA = 0.42;
    const FOLGA = 0.06; // entre a pequena e o destaque, na linha A
    /* A 2ª palavra amarela nasce ANCORADA NA 1ª, deslocada 0,55 do corpo para a
       ESQUERDA — é o que o print mostra: VÍDEOS começa um pouco antes de VIDA e
       entra por baixo do texto pequeno. (Antes eu recuava a linha C a partir da
       margem, e a escada ficava com outro desenho.) */
    const ENTRA = 0.55;
    const RECUO_B = 0.55;

    /* AS TRÊS LINHAS ENTRAM NA CONTA, e a mais apertada manda.
       Antes só A e C entravam: a linha do MEIO não tinha restrição nenhuma e,
       com muitas palavras, atravessava a tela ("cuidado com a quantidade de
       palavras também"). */
    const porLinhaA = LARG_ALVO / (PROPORCAO_PEQUENA * kP1 + FOLGA + kD1);
    const porLinhaB = LARG_ALVO / (RECUO_B + PROPORCAO_PEQUENA * kP2);
    const coefC = PROPORCAO_PEQUENA * kP1 + FOLGA - ENTRA + kD2;
    const porLinhaC = coefC > 0 ? LARG_ALVO / coefC : Infinity;
    /* Sem piso: piso e "caber" são contraditórios (com piso de 70, uma frase que
       pedia 51 px era empurrada para fora do quadro). A conta manda — e se o
       resultado for ilegível, `garanteQueCabe` PARA o render em vez de entregar
       feio. */
    const sD = Math.min(200, Math.min(porLinhaA, porLinhaB, porLinhaC));
    // "colocava em risco a" (4) + LIBERDADE + "de" + EXPRESSÃO passa; a frase de
    // 7 palavras que ele reprovou, não
    garanteQueCabe('modelo 4', sD, [
      {parte: 'a linha pequena de cima', texto: pequena1, max: LIMITES.modelo4.pequena1},
      {parte: 'a linha pequena do meio', texto: pequena2, max: LIMITES.modelo4.pequena2},
      {parte: 'o 1º destaque', texto: destaque1, max: LIMITES.modelo4.destaque1},
      {parte: 'o 2º destaque', texto: destaque2, max: LIMITES.modelo4.destaque2},
    ]);
    const sP = sD * PROPORCAO_PEQUENA;

    return {
      sD,
      sP,
      largP1: kP1 * sP,
      largP2: kP2 * sP,
      largD1: kD1 * sD,
      largD2: kD2 * sD,
      folga: FOLGA * sD,
    };
  }, [pronto, pequena1, pequena2, destaque1, destaque2]);

  if (!medidas) return null;
  const {sD, sP, largP1, largD1, largD2, folga} = medidas;

  /* ── A ESCADA ──────────────────────────────────────────────────────────────
     Cada linha começa mais à direita: B recua 0,35 do corpo do destaque e C,
     0,9. O bloco todo é centrado pelo retângulo que envolve as três linhas, para
     a escada não empurrar o conjunto para fora do quadro. */
  /* a linha do meio entra um pouco mais pra dentro que a de cima */
  const recuoB = sD * 0.55;
  /* e a 2ª palavra amarela ENTRA por baixo do texto pequeno: ancorada no início
     da 1ª palavra amarela, 0,55 do corpo para a esquerda, como no print */
  const xDestaque1Rel = largP1 + folga;
  const recuoC = xDestaque1Rel - sD * 0.55;
  const largA = xDestaque1Rel + largD1;
  const esquerdaRel = Math.min(0, recuoC);
  const direitaRel = Math.max(largA, recuoC + largD2);
  const x0 = 540 - (esquerdaRel + direitaRel) / 2;

  /* ── AS BASES ──────────────────────────────────────────────────────────────
     Montserrat: base das maiúsculas a 0,8585 em. Coolvetica: 0,867 em.
     A linha B fica logo abaixo da A, e a C logo abaixo da B, apertadas; o acento
     do destaque da linha C sobe 0,13 em acima das capitulares (folgaAcento), e
     por isso a linha C desce essa folga a mais. */
  const baseA = 0;
  const baseB = baseA + sP * 1.05;
  const baseC = baseB + sD * (0.8 + folgaAcento(destaque2));
  const alturaBloco = baseC + sD * 0.1415 - (baseA - 0.8585 * sD);
  const topoBloco = centroY - alturaBloco / 2 - (baseA - 0.8585 * sD) - 0.8585 * sD;
  const yBase = (b: number) => topoBloco + b;

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

  const italico = `skewX(-${INCLINA}deg)`;

  /** uma parte do bloco: sobe de baixo para cima, com o desfoque sumindo */
  const parte = (
    texto: string,
    ehDestaque: boolean,
    esquerda: number,
    base: number,
    inicio: number
  ): React.ReactElement => {
    const corpo = ehDestaque ? sD : sP;
    const k = mola(frame, inicio, ehDestaque ? MOLA_DESTAQUE : MOLA_MACIA);
    const op = interpolate(frame, [f(inicio), f(inicio + 0.45)], [0, 1], trava);
    return (
      <div
        style={{
          position: 'absolute',
          left: esquerda,
          top: yBase(base) - (ehDestaque ? 0.8585 : 0.867) * corpo,
          fontFamily: ehDestaque ? MONTSERRAT : COOLVETICA,
          fontWeight: ehDestaque ? 900 : undefined,
          fontSize: corpo,
          lineHeight: 1,
          letterSpacing: ehDestaque ? '-0.02em' : undefined,
          color: ehDestaque ? COR.marca : '#FFFFFF',
          whiteSpace: 'nowrap',
          textShadow: ehDestaque ? undefined : SOMBRA_SUAVE,
          opacity: op,
          transform: `translateY(${((1 - k) * corpo * (ehDestaque ? 1.05 : 1.9)).toFixed(2)}px) ${italico}`,
          filter: `${k < 0.99 ? `blur(${((1 - k) * (ehDestaque ? 12 : 8)).toFixed(2)}px) ` : ''}${
            ehDestaque
              ? `drop-shadow(0 ${(corpo * 0.05).toFixed(1)}px ${(corpo * 0.02).toFixed(1)}px rgba(0,0,0,.7))`
              : ''
          }`,
        }}
      >
        {texto}
      </div>
    );
  };

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: desvanece,
          // deriva: o bloco nunca para de andar, mesmo depois de assentar
          transform: `translate(${deriva(frame, duracaoTotal, -8).toFixed(2)}px, ${deriva(
            frame,
            duracaoTotal,
            -12
          ).toFixed(2)}px) scale(${z.toFixed(5)})`,
          transformOrigin: `540px ${centroY}px`,
        }}
      >
        {parte(pequena1, false, x0, baseA, tempos.linhaA)}
        {parte(destaque1, true, x0 + largP1 + folga, baseA, tempos.linhaA + 0.06)}
        {parte(pequena2, false, x0 + recuoB, baseB, tempos.linhaB)}
        {parte(destaque2, true, x0 + recuoC, baseC, tempos.linhaC)}
      </div>
    </AbsoluteFill>
  );
};
