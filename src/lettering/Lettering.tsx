import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  spring,
  staticFile,
  delayRender,
  continueRender,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Montserrat';
import {fitText, measureText} from '@remotion/layout-utils';
import {trava, f} from '../shared/design';
import {folgaAcento, deriva, ZOOM_EXTRA, garanteQueCabe, LIMITES} from './base';

/**
 * LETTERING DE DESTAQUE — modelo 1 ("Porque a / INCLUSÃO / só dentro da
 * escola"), pedido em 15/09/2026. Versão 5.
 *
 *   linha 1  Coolvetica, pequena   → sobe inteira, de uma vez
 *   linha 2  Montserrat Black      → entra INTEIRA e embaçada, fica nítida e
 *            gigante, caixa alta     então se REPARTE na diagonal
 *   linha 3  Coolvetica, média     → palavra por palavra, de baixo para cima,
 *                                     com desfoque de movimento
 *
 * ── HISTÓRICO DOS AJUSTES ─────────────────────────────────────────────────
 *   v2  corte na diagonal, sombra dura
 *   v3  letras não encostam, sombra suave nas outras linhas, corte mais inclinado
 *   v4  dynamic zoom, entradas sobrepostas, molas, motion blur de câmera
 *   v5  (as melhorias que eu propus e ele aprovou em 15/09/2026)
 *       · LARGURA MEDIDA, não estimada: a v4 calculava o corpo da linha 2 pelo
 *         número de letras, e isso erra — "IMPOSTO" e "LIBERDADE" têm larguras
 *         muito diferentes por causa de M e O largos e I estreito. Agora o corpo
 *         sai de `fitText` sobre a fonte já carregada.
 *       · QUEBRA DE LINHA na linha 3, medida palavra por palavra; se passar de
 *         duas linhas, o corpo diminui até caber.
 *       · O CORTE MAIS FIEL AO MODELO: além da sombra dura, a metade de baixo
 *         ganha o degradê cinza que o print mostra logo abaixo do corte — e o
 *         degradê segue a DIAGONAL, não a horizontal.
 *       · RITMO DAS PALAVRAS PELO TAMANHO: palavra longa leva mais tempo para ser
 *         dita, então a seguinte espera mais. Quatro palavras a 0,14 s exatos
 *         soavam como metralhadora.
 *       · pronto para virar FERRAMENTA: ver `Modelo1.tsx`.
 *
 * ── MOLAS ─────────────────────────────────────────────────────────────────
 * Linhas 1 e 3 com mola SUPERAMORTECIDA (não passam do ponto, então não encostam
 * na linha 2); o corte com mola SUBAMORTECIDA (passa ~6% e volta). O desfoque de
 * movimento da linha 3 sai da velocidade da mola.
 */

const montserrat = loadFont('normal', {weights: ['900'], subsets: ['latin', 'latin-ext']});
const MONTSERRAT = montserrat.fontFamily;

/** Coolvetica é arquivo local (public/fonts/Coolvetica_Rg.otf) */
export const COOLVETICA = 'Coolvetica';
const coolveticaPronta: Promise<void> =
  typeof window !== 'undefined' && typeof FontFace !== 'undefined'
    ? (() => {
        const espera = delayRender('Coolvetica');
        return new FontFace(COOLVETICA, `url(${staticFile('fonts/Coolvetica_Rg.otf')}) format('opentype')`)
          .load()
          .then((fonte) => {
            // o lib DOM do TS 5.6 não declara FontFaceSet.add, que o Chromium tem
            (document.fonts as unknown as {add: (f: FontFace) => void}).add(fonte);
          })
          .catch((erro) => console.error('Coolvetica não carregou', erro))
          .finally(() => continueRender(espera));
      })()
    : Promise.resolve();

/**
 * MEDIR SÓ DEPOIS DE AS DUAS FONTES CARREGAREM. Medir antes mede a fonte de
 * sistema, e o React não mede de novo sozinho quando a fonte chega — o layout
 * ficaria calculado para a letra errada. O render espera esta promessa.
 */
const useFontesProntas = () => {
  const [pronto, setPronto] = React.useState(false);
  const [espera] = React.useState(() => delayRender('medir o lettering'));
  React.useEffect(() => {
    Promise.all([montserrat.waitUntilDone(), coolveticaPronta])
      .then(() => document.fonts.ready)
      .then(() => {
        setPronto(true);
        continueRender(espera);
      })
      .catch(() => continueRender(espera));
  }, [espera]);
  return pronto;
};

const FPS = 60;
// molas menos duras (o porquê está no comentário longo de base.tsx): damping 200
// travava o movimento na chegada; agora passam 1–2% do ponto e voltam
const MOLA_MACIA = {damping: 30, stiffness: 38, mass: 1.7} as const;
const MOLA_CORTE = {damping: 11, stiffness: 70, mass: 1} as const;
const MOLA_PALAVRA = {damping: 26, stiffness: 62, mass: 1.1} as const;

const mola = (frame: number, inicio: number, config: {damping: number; stiffness: number; mass: number}) =>
  frame < f(inicio) ? 0 : spring({frame: frame - f(inicio), fps: FPS, config});

export type Tempos = {
  linha1: number;
  linha2: number;
  corte: number;
  /** quando a primeira palavra da linha 3 sobe */
  linha3: number;
  /** opcional: instante de cada palavra. Sem isso, o ritmo sai do tamanho delas */
  palavras?: readonly number[];
};

export type Zoom = {de: number; ate: number; duracao: number};

/**
 * O RITMO DAS PALAVRAS PELO TAMANHO DE CADA UMA. A palavra seguinte espera
 * 0,08 s mais 18 ms por letra da anterior, com teto de 0,22 s.
 * "em cima de imposto" → 1,300 · 1,416 · 1,568 · 1,684.
 */
export const ritmoPalavras = (inicio: number, texto: string): number[] => {
  const palavras = texto.split(' ');
  const tempos: number[] = [];
  let t = inicio;
  palavras.forEach((p, i) => {
    tempos.push(Number(t.toFixed(3)));
    if (i < palavras.length - 1) t += Math.min(0.22, 0.08 + 0.018 * p.length);
  });
  return tempos;
};

export const temposPalavras = (tempos: Tempos, linha3: string) =>
  tempos.palavras ?? ritmoPalavras(tempos.linha3, linha3);

/** os pontos de batida para o SFX saem dos MESMOS tempos que movem o texto */
export const cuesSfx = (tempos: Tempos, linha3: string) => [
  {t: tempos.linha1, som: 'whoosh', gesto: 'linha 1 sobe'},
  {t: tempos.linha2, som: 'wind', gesto: 'linha 2 chega embaçada e vai ficando nítida (som longo, ~1 s)'},
  {t: tempos.corte, som: 'click + whoosh curto', gesto: 'a linha 2 reparte na diagonal'},
  ...temposPalavras(tempos, linha3).map((p, i) => ({t: p, som: 'click/pop', gesto: `linha 3, palavra ${i + 1}`})),
];

/** largura máxima do bloco em repouso: 78% do quadro — ele pediu menos área */
const LARG_ALVO = 1080 * 0.78;

export const Lettering: React.FC<{
  linha1: string;
  linha2: string;
  linha3: string;
  tempos: Tempos;
  zoom?: Zoom;
  centroY?: number;
}> = ({linha1, linha2, linha3, tempos, zoom, centroY = 1180}) => {
  const frame = useCurrentFrame();
  const {durationInFrames: duracaoTotal} = useVideoConfig();
  const pronto = useFontesProntas();

  /* ── as medidas, com as fontes de verdade ──────────────────────────────── */
  const medidas = React.useMemo(() => {
    if (!pronto) return null;
    const esp2 = '-0.02em';
    const s2 = Math.min(250, fitText({text: linha2, withinWidth: LARG_ALVO, fontFamily: MONTSERRAT, fontWeight: 900, letterSpacing: esp2}).fontSize);
    const larg2 = measureText({text: linha2, fontFamily: MONTSERRAT, fontWeight: 900, fontSize: s2, letterSpacing: esp2}).width;

    const s1Max = fitText({text: linha1, withinWidth: LARG_ALVO * 0.94, fontFamily: COOLVETICA}).fontSize;
    const s1 = Math.min(s2 * 0.4, s1Max);

    /* linha 3: quebra gulosa palavra a palavra; mais de duas linhas → encolhe */
    const palavras = linha3.split(' ');
    let s3 = s2 * 0.4;
    let linhas: number[][] = [];
    for (let tentativa = 0; tentativa < 12; tentativa++) {
      const espaco = measureText({text: 'a a', fontFamily: COOLVETICA, fontSize: s3}).width -
        measureText({text: 'aa', fontFamily: COOLVETICA, fontSize: s3}).width;
      linhas = [[]];
      let larguraLinha = 0;
      palavras.forEach((p, i) => {
        const w = measureText({text: p, fontFamily: COOLVETICA, fontSize: s3}).width;
        const atual = linhas[linhas.length - 1];
        const somada = atual.length === 0 ? w : larguraLinha + espaco + w;
        if (atual.length > 0 && somada > LARG_ALVO) {
          linhas.push([i]);
          larguraLinha = w;
        } else {
          atual.push(i);
          larguraLinha = somada;
        }
      });
      if (linhas.length <= 2) break;
      s3 *= 0.92;
    }
    /**
     * O MODELO 1 ERA O ÚNICO SEM ESTE FREIO — e é o mais antigo, o que explica:
     * quando `garanteQueCabe` nasceu (17/09), ele já estava pronto e eu só pus
     * nos modelos novos. Frase grande demais aqui não parava o render, só saía
     * feia. Limites em `LIMITES.modelo1`, tirados da referência dele
     * ("parar de criar" · IMPOSTO · "em cima de imposto").
     */
    garanteQueCabe('modelo 1', s2, [
      {parte: 'a linha 1', texto: linha1, max: LIMITES.modelo1.linha1},
      {parte: 'a linha 2 (o destaque)', texto: linha2, max: LIMITES.modelo1.linha2},
      {parte: 'a linha 3', texto: linha3, max: LIMITES.modelo1.linha3},
    ]);
    return {s1, s2, s3, larg2, linhas, palavras};
  }, [pronto, linha1, linha2, linha3]);

  if (!medidas) return null;
  const {s1, s2, s3, larg2, linhas, palavras} = medidas;

  const topo2 = centroY - s2 / 2;
  const base2 = topo2 + s2 * 0.8585;

  /* o corte na diagonal: mais baixo na primeira letra, mais alto na última */
  const corteE = 0.66;
  const corteD = 0.36;
  const cE = (corteE - 0.2 * (corteD - corteE)) * 100;
  const cD = (corteD + 0.2 * (corteD - corteE)) * 100;

  const sombra = '0 5px 18px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.35)';
  const sombraFiltro = 'drop-shadow(0 5px 14px rgba(0,0,0,.5))';

  /* ── dynamic zoom do bloco inteiro ───────────────────────────────────────
     Escala única no GRUPO para as folgas entre as linhas não mudarem.
     A 85% da largura em repouso e zoom de 110%, a v4 mediu ~40 px de folga de
     cada lado no pior quadro do corte.

     O ZOOM NÃO PARA E O TEXTO SAI DESVANECENDO (pedido de 15/09/2026: "deixa o
     movimento de zoom até ele sumir desvanecendo, bem fluido"). Antes a escala
     chegava em `ate` e travava, e a peça terminava com o texto parado e nítido —
     corte seco no Premiere. Agora a escala segue descendo mais 3% até o último
     quadro, e os últimos 0,75 s desvanecem por cima desse movimento. */
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

  const p1 = mola(frame, tempos.linha1, MOLA_MACIA);
  const op1 = interpolate(frame, [f(tempos.linha1), f(tempos.linha1 + 0.4)], [0, 1], trava);

  const op2 = interpolate(frame, [f(tempos.linha2), f(tempos.linha2 + 0.45)], [0, 1], trava);
  const foco2 = interpolate(frame, [f(tempos.linha2), f(tempos.linha2 + 1.15)], [1, 0], {...trava, easing: Easing.out(Easing.cubic)});
  const escala2 = interpolate(frame, [f(tempos.linha2), f(tempos.linha2 + 1.3)], [1.06, 1], {...trava, easing: Easing.out(Easing.cubic)});
  const reparte = interpolate(frame, [f(tempos.corte), f(tempos.corte + 0.7)], [0, 1], {...trava, easing: Easing.bezier(0.45, 0, 0.3, 1)});
  const desliza = mola(frame, tempos.corte, MOLA_CORTE);
  const dx = s2 * 0.07 * desliza;
  const W = 1080;
  const H = s2;
  const inclinacao = ((corteD - corteE) * H) / W;

  /**
   * O DEGRADÊ CINZA ABAIXO DO CORTE, SEGUINDO A DIAGONAL.
   * Um `linear-gradient` do CSS pinta faixas perpendiculares ao eixo dele. O
   * eixo aqui é a NORMAL da reta do corte, então as faixas ficam paralelas ao
   * corte. A posição do corte ao longo desse eixo sai da projeção de um ponto
   * da reta sobre a normal, dividida pelo comprimento da linha do gradiente
   * (W·|sen A| + H·|cos A|, que é como o CSS define essa linha).
   */
  const dyCorte = (corteD - corteE) * H;
  const nLen = Math.hypot(dyCorte, W);
  const ux = -dyCorte / nLen;
  const uy = W / nLen;
  const anguloRad = Math.atan2(ux, -uy);
  const L = W * Math.abs(Math.sin(anguloRad)) + H * Math.abs(Math.cos(anguloRad));
  const pontoCorteY = H * (corteE + corteD) / 2;
  const tCorte = ((0 * ux + (pontoCorteY - H / 2) * uy) / L + 0.5) * 100;
  const tFim = tCorte + ((H * 0.1) / L) * 100;
  const cinza = Math.round(255 - 78 * reparte);

  const metade = (cima: boolean): React.CSSProperties => ({
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    textAlign: 'center',
    fontFamily: MONTSERRAT,
    fontWeight: 900,
    fontSize: s2,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    whiteSpace: 'nowrap',
    clipPath: cima
      ? `polygon(-20% -30%, 120% -30%, 120% ${cD + 0.8}%, -20% ${cE + 0.8}%)`
      : `polygon(-20% ${cE}%, 120% ${cD}%, 120% 130%, -20% 130%)`,
    transform: `translate(${(cima ? -dx : dx).toFixed(2)}px, ${((cima ? dx : -dx) * -inclinacao + (cima ? -s2 * 0.012 * reparte : 0)).toFixed(2)}px)`,
    ...(cima
      ? {color: '#FFFFFF'}
      : {
          backgroundImage: `linear-gradient(${((anguloRad * 180) / Math.PI).toFixed(3)}deg, #FFFFFF ${tCorte.toFixed(3)}%, rgb(${cinza},${cinza},${cinza}) ${tCorte.toFixed(3)}%, #FFFFFF ${tFim.toFixed(3)}%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }),
  });

  const SUBIDA = s3 * 1.1;
  const tPal = temposPalavras(tempos, linha3);
  const tPalavra = (i: number) => tPal[i] ?? tPal[tPal.length - 1];
  const alturaLinha3 = s3 * 1.08;

  return (
    <AbsoluteFill>
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <defs>
          {palavras.map((_, i) => {
            const t = tPalavra(i);
            const vel = (mola(frame, t, MOLA_PALAVRA) - mola(frame - 1, t, MOLA_PALAVRA)) * SUBIDA;
            return (
              <filter key={i} id={`mbL3_${i}_${frame}`} x="-10%" y="-80%" width="120%" height="260%">
                <feGaussianBlur stdDeviation={`0 ${Math.min(16, Math.abs(vel) * 1.3).toFixed(2)}`} />
              </filter>
            );
          })}
        </defs>
      </svg>

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
        {/* LINHA 2 */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: topo2,
            height: s2,
            opacity: op2,
            transform: `scale(${escala2.toFixed(4)})`,
            filter: `blur(${(foco2 * 28).toFixed(2)}px) ${sombraFiltro}`,
          }}
        >
          <div style={metade(false)}>{linha2}</div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              filter: `drop-shadow(0 ${(s2 * 0.075 * reparte).toFixed(1)}px ${(s2 * 0.012).toFixed(1)}px rgba(0,0,0,${(0.72 * reparte).toFixed(3)}))`,
            }}
          >
            <div style={metade(true)}>{linha2}</div>
          </div>
        </div>

        {/* LINHA 1 — recuada 6% a partir do começo MEDIDO da linha 2 */}
        <div
          style={{
            position: 'absolute',
            left: 540 - larg2 / 2 + larg2 * 0.06,
            // folgaAcento: "INCLUSÃO" e cia. — o til sobe acima das capitulares
            top: topo2 + s2 * 0.1585 - s2 * folgaAcento(linha2) - s2 * 0.06 - s1 * 1.1,
            fontFamily: COOLVETICA,
            fontSize: s1,
            lineHeight: 1,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            textShadow: sombra,
            opacity: op1,
            transform: `translateY(${((1 - p1) * s1 * 1.6).toFixed(2)}px)`,
            filter: p1 < 0.985 ? `blur(${((1 - p1) * 7).toFixed(2)}px)` : undefined,
          }}
        >
          {linha1}
        </div>

        {/* LINHA 3 — em até duas linhas, quebradas pela medida */}
        {linhas.map((indices, li) => (
          <div
            key={li}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: base2 + s2 * 0.04 - s3 * (0.867 - 0.72) + li * alturaLinha3,
              display: 'flex',
              justifyContent: 'center',
              gap: s3 * 0.26,
              fontFamily: COOLVETICA,
              fontSize: s3,
              lineHeight: 1,
              color: '#FFFFFF',
              whiteSpace: 'nowrap',
            }}
          >
            {indices.map((i) => {
              const t = tPalavra(i);
              const k = mola(frame, t, MOLA_PALAVRA);
              const op = interpolate(frame, [f(t), f(t + 0.22)], [0, 1], trava);
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    opacity: op,
                    transform: `translateY(${((1 - k) * SUBIDA).toFixed(2)}px)`,
                    filter: `url(#mbL3_${i}_${frame})`,
                    textShadow: sombra,
                  }}
                >
                  {palavras[i]}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
