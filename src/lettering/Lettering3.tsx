import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, useVideoConfig} from 'remotion';
import {measureText} from '@remotion/layout-utils';
import {trava, f} from '../shared/design';
import type {Zoom} from './Lettering';
import {
  PEQUENA,
  PESO_PEQUENA,
  MONTSERRAT,
  useFontesProntas,
  mola,
  MOLA_MACIA,
  MOLA_DESTAQUE,
  MOLA_CORTE,
  SOMBRA_SUAVE,
  deriva,
  garanteQueCabe,
  LIMITES,
  ZOOM_EXTRA,
} from './base';

/**
 * LETTERING DE DESTAQUE — MODELO 3, do print que ele mandou em 15/09/2026
 * ("transformar ALCANCE em impressã[o]").
 *
 *   antes     Coolvetica pequena, à ESQUERDA, na mesma linha de base
 *   DESTAQUE  Montserrat Black, gigante, começa depois da linha pequena e chega
 *             perto da borda direita
 *   depois    Coolvetica pequena, embaixo e deslocada para a direita
 *
 * O que é próprio deste modelo:
 * - FALSO ITÁLICO em tudo (skewX): a Coolvetica que ele mandou não tem itálico,
 *   e no print as três partes são inclinadas.
 * - As três partes se SOBREPÕEM na horizontal, e a palavra grande fica por cima
 *   com sombra, que é o que mantém tudo legível.
 * - CORTE HORIZONTAL na palavra grande, com a MECÂNICA COMPLETA DO MODELO 1.
 *
 * ── O CORTE, QUE EU JÁ ERREI DUAS VEZES ───────────────────────────────────────
 * 1ª tentativa: degrau desenhado desde o primeiro quadro. Não existia o momento
 *    de partir. Ele: "não tá com a mesma animação do modelo 1".
 * 2ª tentativa: animei o deslocamento e pus um drop-shadow no próprio elemento
 *    cortado. Continuou pobre. Ele: "viu que tem sombra no corte, dando aquele
 *    efeito 3D e tal".
 * O que o modelo 1 faz de verdade, e que agora está aqui:
 *   a) DOIS tempos, não um: `reparte` (curva, 0,7 s) governa sombra, degradê e a
 *      abertura da fresta; `desliza` (mola subamortecida) governa o deslocamento
 *      horizontal, e é ele que passa do ponto e volta.
 *   b) O 3D NÃO vem da sombra projetada: vem de um DEGRADÊ CINZA pintado DENTRO
 *      das letras da metade de baixo, logo abaixo da linha do corte
 *      (`background-clip: text`). É isso que lê como espessura da letra.
 *   c) A sombra dura fica num WRAPPER em volta da metade de cima — não no
 *      elemento cortado. No elemento, o drop-shadow desenha a silhueta inteira;
 *      no wrapper, ele cai da borda do corte sobre a metade de baixo.
 *   d) A metade de cima ainda sobe um pouco (1,2% do corpo), abrindo a fresta.
 *   e) Ordem no DOM: a metade de BAIXO primeiro, senão a sombra fica atrás dela.
 */

export type Tempos3 = {
  /** a linha pequena da esquerda entra */
  antes: number;
  /** a palavra destaque entra */
  destaque: number;
  /** a palavra destaque REPARTE no corte horizontal */
  corte: number;
  /** a linha pequena de baixo entra */
  depois: number;
};

export const cuesSfx3 = (t: Tempos3) => [
  {t: t.antes, som: 'whoosh curto', gesto: 'a linha pequena da esquerda entra'},
  {t: t.destaque, som: 'whoosh + impacto', gesto: 'a palavra destaque atravessa'},
  {t: t.corte, som: 'click + whoosh curto', gesto: 'a palavra reparte no corte'},
  {t: t.depois, som: 'swish', gesto: 'a linha de baixo entra'},
];

/** inclinação do falso itálico, em graus */
const INCLINA = 9;
/**
 * O CORTE É DIAGONAL, COM OS MESMOS NÚMEROS DO MODELO 1: passa a 66% da altura
 * da caixa na primeira letra e a 36% na última ("o corte pode ser mais um pouco
 * ainda na transversal, bem Motion mesmo", da rodada do modelo 1).
 */
const CORTE_E = 0.66;
const CORTE_D = 0.36;

export const Lettering3: React.FC<{
  antes: string;
  destaque: string;
  depois: string;
  tempos: Tempos3;
  zoom?: Zoom;
  centroY?: number;
}> = ({antes, destaque, depois, tempos, zoom, centroY = 1180}) => {
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

    const kD = por100(destaque, MONTSERRAT, 900);
    const kA = por100(antes, PEQUENA, PESO_PEQUENA);
    const kP = por100(depois, PEQUENA, PESO_PEQUENA);

    /* margem + antes + folga + destaque = 88% da largura do quadro.
       Histórico: 112% sumia a última letra inteira; 106% batia com o print; 94%
       quando ele pediu menos área; e 88% quando pediu o texto "um pouco mais pra
       dentro" — agora nada atravessa a borda, o bloco só chega perto dela. */
    const PROPORCAO_PEQUENA = 0.33;
    const MARGEM_ESQ = 60;
    const bruto = (1080 * 0.88 - MARGEM_ESQ) / (PROPORCAO_PEQUENA * kA + 0.04 + kD);
    const sD = Math.min(200, bruto);
    // "todo ano, milhares de" + CELULARES + "computadores e equipamentos" passa
    garanteQueCabe('modelo 3', sD, [
      {parte: 'a linha pequena da esquerda', texto: antes, max: LIMITES.modelo3.antes},
      {parte: 'o destaque', texto: destaque, max: LIMITES.modelo3.destaque},
      {parte: 'a linha pequena de baixo', texto: depois, max: LIMITES.modelo3.depois},
    ]);
    const sP = sD * PROPORCAO_PEQUENA;

    const largA = kA * sP;
    const largD = kD * sD;
    const largP = kP * sP;
    const xD = MARGEM_ESQ + largA + sD * 0.04;
    return {sD, sP, largA, largD, largP, xA: MARGEM_ESQ, xD};
  }, [pronto, antes, destaque, depois]);

  if (!medidas) return null;
  const {sD, sP, largD, largP, xA, xD} = medidas;

  /* Métrica: Montserrat tem a base das maiúsculas a 0,8585 em e a Coolvetica a
     0,867 em. A linha de base das três partes é `centroY`; a linha de baixo
     desce 0,42 do corpo do destaque e invade a barriga dele, como no print. */
  const topoD = centroY - 0.8585 * sD;
  const topoA = centroY - 0.867 * sP;
  const topoP = centroY + sD * 0.42 - 0.867 * sP;
  /* A LINHA DE BAIXO RECUA O QUANTO DER, SEM SAIR DA TELA.
     Era recuo fixo (26% da largura da palavra). Com "em cima de imposto" cabia;
     com "computadores e equipamentos" o fim da linha atravessava a borda e a
     última letra sumia. Agora o recuo é o menor entre os 26% de sempre e o que
     ainda deixa a linha inteira dentro da margem — adaptado ao texto. */
  const recuoDesejado = largD * 0.26;
  const recuoQueCabe = Math.max(0, 1080 - 60 - largP - xD);
  const xP = xD + Math.min(recuoDesejado, recuoQueCabe);

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

  const kA2 = mola(frame, tempos.antes, MOLA_MACIA);
  const opA = interpolate(frame, [f(tempos.antes), f(tempos.antes + 0.3)], [0, 1], trava);
  const kD2 = mola(frame, tempos.destaque, MOLA_DESTAQUE);
  const opD = interpolate(frame, [f(tempos.destaque), f(tempos.destaque + 0.28)], [0, 1], trava);
  const kP2 = mola(frame, tempos.depois, MOLA_MACIA);
  const opP = interpolate(frame, [f(tempos.depois), f(tempos.depois + 0.3)], [0, 1], trava);

  const italico = `skewX(-${INCLINA}deg)`;
  const pequena = (topo: number, esquerda: number, k: number, op: number, vemDaDireita: boolean, texto: string) => (
    <div
      style={{
        position: 'absolute',
        top: topo,
        left: esquerda,
        fontFamily: PEQUENA,
        fontWeight: PESO_PEQUENA,
        fontSize: sP,
        lineHeight: 1,
        color: '#FFFFFF',
        whiteSpace: 'nowrap',
        textShadow: SOMBRA_SUAVE,
        opacity: op,
        transform: `translate(${(((1 - k) * sP * (vemDaDireita ? 2.1 : -2.1))).toFixed(2)}px, ${(
          (1 - k) *
          sP *
          1.15
        ).toFixed(2)}px) ${italico}`,
        filter: k < 0.99 ? `blur(${((1 - k) * 8).toFixed(2)}px)` : undefined,
      }}
    >
      {texto}
    </div>
  );

  /* ── O CORTE ────────────────────────────────────────────────────────────────
     `reparte` (curva) manda na sombra, no degradê e na fresta; `desliza` (mola
     subamortecida) manda no deslocamento — passa do ponto e volta. */
  const reparte = interpolate(frame, [f(tempos.corte), f(tempos.corte + 0.7)], [0, 1], {
    ...trava,
    easing: Easing.bezier(0.45, 0, 0.3, 1),
  });
  const desliza = mola(frame, tempos.corte, MOLA_CORTE);
  const dx = sD * 0.07 * desliza;

  /* ── A MATEMÁTICA DO CORTE, COPIADA DO MODELO 1 ────────────────────────────
     Corte DIAGONAL (não horizontal, como eu tinha feito): passa a 66% da caixa
     na primeira letra e a 36% na última. As metades deslizam AO LONGO da
     diagonal — daí o deslocamento vertical proporcional à inclinação.
     `W` aqui é a largura da palavra (no modelo 1 é o quadro inteiro). */
  const H = sD;
  const W = largD;
  const inclinacao = ((CORTE_D - CORTE_E) * H) / W;
  const cE = (CORTE_E - 0.2 * (CORTE_D - CORTE_E)) * 100;
  const cD = (CORTE_D + 0.2 * (CORTE_D - CORTE_E)) * 100;

  /* O DEGRADÊ CINZA ABAIXO DO CORTE, SEGUINDO A DIAGONAL: o eixo do gradiente é
     a NORMAL da reta do corte, e a posição da faixa sai da projeção de um ponto
     da reta sobre essa normal, dividida pelo comprimento da linha do gradiente
     (W·|sen A| + H·|cos A|, como o CSS define). Idem modelo 1. */
  const dyCorte = (CORTE_D - CORTE_E) * H;
  const nLen = Math.hypot(dyCorte, W);
  const ux = -dyCorte / nLen;
  const uy = W / nLen;
  const anguloRad = Math.atan2(ux, -uy);
  const L = W * Math.abs(Math.sin(anguloRad)) + H * Math.abs(Math.cos(anguloRad));
  const pontoCorteY = (H * (CORTE_E + CORTE_D)) / 2;
  const tCorte = (((0 * ux + (pontoCorteY - H / 2) * uy) / L + 0.5) * 100);
  const tFim = tCorte + ((H * 0.1) / L) * 100;
  const cinza = Math.round(255 - 78 * reparte);

  /** as duas metades, exatamente como o modelo 1 monta as dele */
  const metade = (cima: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    fontFamily: MONTSERRAT,
    fontWeight: 900,
    fontSize: sD,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
    clipPath: cima
      ? `polygon(-20% -30%, 120% -30%, 120% ${cD + 0.8}%, -20% ${cE + 0.8}%)`
      : `polygon(-20% ${cE}%, 120% ${cD}%, 120% 130%, -20% 130%)`,
    transform: `translate(${(cima ? -dx : dx).toFixed(2)}px, ${(
      (cima ? dx : -dx) * -inclinacao +
      (cima ? -sD * 0.012 * reparte : 0)
    ).toFixed(2)}px)`,
    ...(cima
      ? {color: '#FFFFFF'}
      : {
          backgroundImage: `linear-gradient(${((anguloRad * 180) / Math.PI).toFixed(3)}deg, #FFFFFF ${tCorte.toFixed(
            3
          )}%, rgb(${cinza},${cinza},${cinza}) ${tCorte.toFixed(3)}%, #FFFFFF ${tFim.toFixed(3)}%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }),
  });

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: desvanece,
          // deriva: o bloco nunca para de andar, mesmo depois de assentar
          transform: `translate(${deriva(frame, duracaoTotal, -10).toFixed(2)}px, ${deriva(
            frame,
            duracaoTotal,
            -12
          ).toFixed(2)}px) scale(${z.toFixed(5)}) rotate(-1.2deg)`,
          transformOrigin: `540px ${centroY}px`,
        }}
      >
        {pequena(topoA, xA, kA2, opA, false, antes)}

        {/* PALAVRA DESTAQUE — por cima, com sombra suave sobre as pequenas */}
        <div
          style={{
            position: 'absolute',
            top: topoD,
            left: xD,
            width: largD,
            height: sD,
            opacity: opD,
            transform: `translate(${((1 - kD2) * sD * 0.45).toFixed(2)}px, ${((1 - kD2) * sD * 0.65).toFixed(
              2
            )}px) ${italico}`,
            filter: `${kD2 < 0.99 ? `blur(${((1 - kD2) * 12).toFixed(2)}px) ` : ''}drop-shadow(0 ${(
              sD * 0.05
            ).toFixed(1)}px ${(sD * 0.02).toFixed(1)}px rgba(0,0,0,.7))`,
          }}
        >
          {/* a de BAIXO primeiro, com o degradê que faz a espessura */}
          <div style={metade(false)}>{destaque}</div>
          {/* a de CIMA dentro do wrapper que carrega a SOMBRA DURA do corte */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: `drop-shadow(0 ${(sD * 0.075 * reparte).toFixed(1)}px ${(sD * 0.012).toFixed(
                1
              )}px rgba(0,0,0,${(0.72 * reparte).toFixed(3)}))`,
            }}
          >
            <div style={metade(true)}>{destaque}</div>
          </div>
        </div>

        {pequena(topoP, xP, kP2, opP, true, depois)}
      </div>
    </AbsoluteFill>
  );
};
