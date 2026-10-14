import React from 'react';
import {spring, staticFile, delayRender, continueRender, interpolate, Easing, Sequence, Audio} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Montserrat';
import {measureText} from '@remotion/layout-utils';
import {f, trava} from '../shared/design';

/**
 * O QUE TODO MODELO DE LETTERING COMPARTILHA — fontes, espera pelas fontes,
 * molas, sombra e quebra de linha medida. Nasceu com o modelo 2 (15/09/2026):
 * o segundo modelo não pode reinventar o que o primeiro já acertou em cinco
 * rodadas de ajuste.
 */

export const montserrat = loadFont('normal', {weights: ['300', '900'], subsets: ['latin', 'latin-ext']});
export const MONTSERRAT = montserrat.fontFamily;

/**
 * A FONTE LEVE — SÓ DO MODELO 3 (pedido de 15/09/2026: "pode também pegar uma
 * versão da fonte light", e logo depois: "a light é só naquela, o resto mantém").
 * Modelos 1 e 2 continuam na Coolvetica; eu tinha trocado nos três e ele corrigiu.
 *
 * A Coolvetica Light NÃO existe na máquina dele — procurei em Downloads, Desktop,
 * Documentos, nas fontes do Windows e nos arquivos que ele enviou: só existe a
 * Regular (`Coolvetica_Rg.otf`), em três cópias do mesmo arquivo. Então o peso
 * leve sai do Montserrat 300, que já está no projeto e é a mesma família do
 * destaque em Black — o contraste leve/pesado fica coerente de propósito.
 *
 * Se ele mandar o arquivo da Coolvetica Light, é só carregar igual à Regular e
 * apontar PEQUENA para ela: nada mais muda.
 */
export const PEQUENA = MONTSERRAT;
export const PESO_PEQUENA = 300;

/** Coolvetica é arquivo local (public/fonts/Coolvetica_Rg.otf) */
export const COOLVETICA = 'Coolvetica';
export const coolveticaPronta: Promise<void> =
  typeof window !== 'undefined' && typeof FontFace !== 'undefined'
    ? (() => {
        const espera = delayRender('Coolvetica (base)');
        return new FontFace(COOLVETICA, `url(${staticFile('fonts/Coolvetica_Rg.otf')}) format('opentype')`)
          .load()
          .then((fonte) => {
            (document.fonts as unknown as {add: (f: FontFace) => void}).add(fonte);
          })
          .catch((erro) => console.error('Coolvetica não carregou', erro))
          .finally(() => continueRender(espera));
      })()
    : Promise.resolve();

/**
 * Medir só depois de as duas fontes carregarem: medir antes mede a fonte de
 * sistema, e o React não mede de novo sozinho quando a fonte chega.
 */
export const useFontesProntas = () => {
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

export const FPS = 60;
export type Mola = {damping: number; stiffness: number; mass: number};

/**
 * ── POR QUE AS MOLAS MUDARAM (15/09/2026) ────────────────────────────────────
 * Ele: "por algum motivo tô achando essas animações meio duras". O motivo tem
 * nome: damping 200 é SUPERAMORTECIDO — o elemento chega e trava de vez, sem
 * nenhum resquício de movimento, e o olho lê isso como mecânico.
 *
 * Agora as molas têm amortecimento baixo o bastante para PASSAR UM POUCO do
 * ponto e voltar (1–2%), e massa maior, que alonga a chegada. O motion blur de
 * câmera tem mais deslocamento para borrar, então o movimento também fica mais
 * macio de graça.
 *
 * O overshoot é pequeno de propósito: estas linhas sobem EM DIREÇÃO a outra
 * linha, e a regra de as letras nunca encostarem continua valendo.
 */
export const MOLA_MACIA: Mola = {damping: 30, stiffness: 38, mass: 1.7};
/** a palavra destaque: mais pesada, chega com mais presença e assenta devagar */
export const MOLA_DESTAQUE: Mola = {damping: 34, stiffness: 40, mass: 2};
/**
 * O CORTE: subamortecida de propósito — passa do ponto e volta. É o que dá o
 * estalo de a palavra se repartir. A mesma do modelo 1; virou base quando ele
 * cobrou que o modelo 3 não tinha esse movimento.
 */
export const MOLA_CORTE: Mola = {damping: 11, stiffness: 70, mass: 1};

export const mola = (frame: number, inicio: number, config: Mola) =>
  frame < f(inicio) ? 0 : spring({frame: frame - f(inicio), fps: FPS, config});

/**
 * DERIVA: depois de assentar, NADA fica parado. O bloco inteiro continua
 * escorregando alguns pixels até o fim da peça — não se percebe olhando, se
 * percebe quando NÃO tem. É o segundo remédio para a dureza, junto com as
 * molas: o dynamic zoom sozinho não dá isso, porque escala não é translação.
 */
/**
 * A `deriva` MUDOU DE CASA em 22/09/2026: agora mora em `shared/design.ts`,
 * porque a cura para "a tela congela depois de assentar" nao e do lettering —
 * e da serie. Enquanto ela morou aqui, so o lettering se curou: as pecas de
 * grafismo do Aquila 18 ficaram 51% do tempo paradas e ninguem viu.
 * Reexportada para nao quebrar quem ja importava daqui.
 */
export {deriva} from '../shared/design';

/**
 * ── TUDO SE ADAPTA AO TEXTO ───────────────────────────────────────────────────
 * As MEDIDAS já se adaptavam (corpo, quebra de linha, folga de acento, largura).
 * Os TEMPOS não: o intervalo entre palavras era fixo e a duração da peça também,
 * então frase curta sobrava tela parada e frase longa atropelava. Ele cobrou:
 * "você sabe que tem que adaptar sempre dependendo das palavras né?".
 *
 * `ritmo` dá o intervalo de um gesto pelo TAMANHO do que entrou — palavra longa
 * pede mais tempo para ser lida antes da próxima.
 * `duracaoDe` fecha a peça: último gesto + assentar + os 0,75 s do desvanecer.
 */
export const ritmo = (texto: string) => Math.min(0.3, 0.1 + 0.018 * texto.length);
export const ritmoDaFrase = (texto: string) =>
  texto.split(' ').reduce((total, palavra) => total + ritmo(palavra), 0);
/**
 * O que vem depois do último gesto: assentar (0,6 s) + desvanecer (0,75 s).
 *
 * O PISO ERA ALTO DEMAIS: em 2,6 s, "o Brasil gasta BILHÕES" e "isso realmente
 * FUNCIONA?" davam exatamente a mesma duração — quem mandava era o piso, não o
 * texto, e a adaptação sumia justo nas frases curtas. Agora o piso é só o mínimo
 * para a peça não ficar subliminar (1,9 s) e quem manda é sempre a frase.
 */
export const CAUDA = 1.35;
export const duracaoDe = (fimDoUltimoGesto: number) =>
  Number(Math.max(1.9, fimDoUltimoGesto + CAUDA).toFixed(2));

/**
 * ── O LETTERING RECUSA FRASE GRANDE DEMAIS ───────────────────────────────────
 * "Em todos que você for fazer, cuidado com o número de palavras. Tá horrível."
 *
 * Ele está certo, e o erro foi de POSTURA, não só de conta: eu vinha encolhendo
 * o texto até caber. Encolher até caber não é cuidar do número de palavras — é
 * esconder o problema e entregar uma peça ilegível.
 *
 * Agora o componente FALHA ALTO: se a frase não couber com o destaque em tamanho
 * legível, o render para com uma mensagem dizendo o que cortar. Peça feia não
 * sai daqui; quem corta a frase sou eu, antes de renderizar.
 *
 * O PISO SAI DOS CASOS QUE ELE APROVOU, não de chute meu. Primeiro pus 120 px e
 * a regra reprovou o próprio exemplo padrão do modelo 4 (destaque em 116 px) e o
 * "CELULARES" do modelo 3 (92 px) — os dois aprovados por ele. O caso que ele
 * chamou de horrível tinha o destaque em ~51 px. Piso em 85 px separa os dois
 * mundos com folga.
 */
export const CORPO_MINIMO = 85;

export const garanteQueCabe = (
  modelo: string,
  corpoDoDestaque: number,
  limitePalavras: {parte: string; texto: string; max: number}[]
) => {
  const longas = limitePalavras.filter((p) => p.texto.trim().split(/\s+/).length > p.max);
  if (longas.length > 0) {
    const lista = longas
      .map((p) => `${p.parte} tem ${p.texto.trim().split(/\s+/).length} palavras (máximo ${p.max}): "${p.texto}"`)
      .join(' · ');
    throw new Error(
      `[lettering ${modelo}] frase grande demais para este modelo — ${lista}. ` +
        `Corte a frase ou use outro modelo: encolher o texto até caber deixa a peça ilegível.`
    );
  }
  if (corpoDoDestaque < CORPO_MINIMO) {
    throw new Error(
      `[lettering ${modelo}] a frase só coube com o destaque em ${Math.round(corpoDoDestaque)}px, ` +
        `abaixo do mínimo legível (${CORPO_MINIMO}px). Corte a frase ou use outro modelo.`
    );
  }
};

export const SOMBRA_SUAVE = '0 5px 18px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.35)';
export const SOMBRA_SUAVE_FILTRO = 'drop-shadow(0 5px 14px rgba(0,0,0,.5))';

/**
 * Quanto (em em do corpo) o destaque em caixa alta cresce para CIMA por causa
 * de acento. Montserrat Black: circunflexo/til/agudo ficam ~0,13 em acima do
 * topo das capitulares. Sem acento, nada. Usar em TODO modelo que empilha
 * texto em cima de um destaque em caixa alta.
 */
export const folgaAcento = (texto: string) => (/[ÀÁÂÃÄÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÑ]/.test(texto) ? 0.13 : 0);

/**
 * Largura máxima do bloco em repouso. Era 85% do quadro; ele pediu para o
 * lettering tomar MENOS ÁREA (15/09/2026), então caiu para 78% — vale para todos
 * os modelos, que é o padrão que ele quer mantido.
 */
export const LARG_ALVO = 1080 * 0.78;

/**
 * QUEBRA DE LINHA MEDIDA, palavra por palavra, em até `maxLinhas`. Se não
 * couber, o corpo diminui 8% por tentativa. Devolve as linhas como listas de
 * ÍNDICES de palavra, para a animação poder cronometrar cada palavra.
 */
export const quebrarLinhas = (
  texto: string,
  fontFamily: string,
  corpoInicial: number,
  larguraMax: number,
  maxLinhas: number
) => {
  const palavras = texto.split(' ');
  let corpo = corpoInicial;
  let linhas: number[][] = [];
  for (let tentativa = 0; tentativa < 14; tentativa++) {
    const espaco =
      measureText({text: 'a a', fontFamily, fontSize: corpo}).width -
      measureText({text: 'aa', fontFamily, fontSize: corpo}).width;
    linhas = [[]];
    let larguraLinha = 0;
    palavras.forEach((p, i) => {
      const w = measureText({text: p, fontFamily, fontSize: corpo}).width;
      const atual = linhas[linhas.length - 1];
      const somada = atual.length === 0 ? w : larguraLinha + espaco + w;
      if (atual.length > 0 && somada > larguraMax) {
        linhas.push([i]);
        larguraLinha = w;
      } else {
        atual.push(i);
        larguraLinha = somada;
      }
    });
    if (linhas.length <= maxLinhas) break;
    corpo *= 0.92;
  }
  return {palavras, linhas, corpo};
};

/* ── O SOM ───────────────────────────────────────────────────────────────────

   OS POPS SÃO OS ARQUIVOS DELE — `SFX - LETTERING/SFX POP 1.mp3` e `2.mp3`,
   copiados para `public/sfx/lettering/`. São o "pop" que ele descreveu lá atrás:
   som de DIGITAÇÃO, tecla seca e curta, não bolha.

   POR QUE ISSO NÃO EXISTIA ATÉ 21/09/2026, e é a falha que ele cobrou:
   os quatro modelos já exportavam `cuesSfx…`, mas NINGUÉM os consumia — eram
   comentários dizendo onde o som deveria entrar. Os letterings saíam mudos, e
   eu ainda escrevi num LEIA-ME que "nenhum SFX foi usado". Pior: o cue do
   modelo 2 marcava 0,08 s entre palavras enquanto o texto sobe a 0,05 s. Cue
   que ninguém toca não tem como se desmentir.

   UM POP POR ENTRADA, ALTERNANDO OS DOIS ARQUIVOS. Ele mandou dois de
   propósito: a mesma amostra repetida cinco vezes vira máquina de escrever de
   desenho animado. Alternando, lê como dedo em teclado.

   O DESTAQUE É MAIS ALTO, NÃO OUTRO SOM. 0,9 contra 0,55: é a mesma tecla,
   batida com mais força — o que a palavra grande faz na imagem.

   FORA DO `CameraMotionBlur`: o motion blur renderiza o mesmo frame várias
   vezes por quadro, e áudio dentro dele sai repetido. */
export type Cue = {t: number; forte?: boolean};

/**
 * OS ARQUIVOS SÃO OS DELE, COM O PICO LEVANTADO — e sem isso o pop não se ouve.
 *
 * Medido nos MP3 originais: pico de -11,9 dB (pop 1) e -11,7 dB (pop 2). Ou
 * seja, mesmo com `volume={1}` o som nunca passaria de -11,8 dB; com o 0,55
 * das entradas, ia para -17 dB. No primeiro render da amostra o pico do vídeo
 * inteiro deu -12,7 dB — tecnicamente lá, praticamente inaudível, e ele
 * perguntou se eu tinha mesmo posto SFX.
 *
 * `volume=+10,9 dB` e `+10,7 dB` levam os dois a -1,0 dBFS, em WAV para não
 * recomprimir o que já é MP3. O transiente não se move: o ataque continua em
 * 68,6 ms e 51,4 ms (era 69,7 e 53,6 — a diferença é o limiar de medição).
 * Os MP3 originais ficam ao lado, intactos.
 */
const POP = ['sfx/lettering/pop_1.wav', 'sfx/lettering/pop_2.wav'];

/**
 * CADA ARQUIVO TEM SEU PRÓPRIO SILÊNCIO ANTES DA BATIDA, e sem descontar isso
 * o som entra atrasado. Medido com `silencedetect` nos arquivos dele:
 * pop_1 só ataca aos 69,7 ms e pop_2 aos 53,6 ms — num arquivo de 101 ms
 * inteiro, ou seja, quase 70% de silêncio na frente do primeiro.
 *
 * Começar a tocar no frame do movimento punha a tecla 4 quadros DEPOIS do
 * gesto, e o primeiro render saiu assim (pops medidos em 0,103 / 2,537 / 5,970
 * para cues em 0,03 / 2,48 / 5,90). Adiantando o começo pelo silêncio de cada
 * arquivo, o TRANSIENTE cai no quadro certo — que é o que o ouvido casa com a
 * imagem, não o começo do arquivo.
 */
const ATRASO_POP = [0.0697, 0.0536];

export const Pops: React.FC<{cues: readonly Cue[]}> = ({cues}) => (
  <>
    {cues.map((c, i) => {
      const arquivo = i % POP.length;
      return (
        <Sequence
          key={i}
          from={Math.max(0, Math.round(f(c.t - ATRASO_POP[arquivo])))}
          layout="none"
        >
          <Audio src={staticFile(POP[arquivo])} volume={c.forte ? 0.9 : 0.55} />
        </Sequence>
      );
    })}
  </>
);

/** marca o ÚLTIMO cue como o forte — em todos os modelos o último é o destaque */
export const comDestaqueForte = (cues: readonly {t: number}[]): Cue[] =>
  cues.map((c, i) => ({t: c.t, forte: i === cues.length - 1}));

/* ── O DYNAMIC ZOOM ──────────────────────────────────────────────────────────

   ESTES DOIS NÚMEROS SÃO O PADRÃO DA SÉRIE, e agora vivem num lugar só.
   Antes o `1.1` estava repetido nos cinco `Modelo*.tsx` e o `0.03` nos cinco
   `Lettering*.tsx`: mudar "o zoom de todos" dependia de eu lembrar de dez
   lugares. Regra de comportamento vale para todos os modelos — então ela tem
   de morar onde todos leem.

   ZOOM_DE     — o bloco começa neste tamanho e desce até 100%.
   ZOOM_EXTRA  — e NÃO TRAVA no 100%: segue descendo isto até o último quadro,
                 com os 0,75 s finais desvanecendo por cima do movimento.

   22/09/2026: ele pediu "um pouco mais aquele zoom que a gente já combinou".
   1,10 → 1,26 na entrada (ele escolheu o mais forte dos três que mandei) e
   3% → 4% na descida. */
export const ZOOM_DE = 1.26;
export const ZOOM_EXTRA = 0.04;

/* ── QUANTAS PALAVRAS CABEM EM CADA MODELO ───────────────────────────────────

   Pedido dele em 22/09/2026: "analise todos os modelos que você tem salvo, e
   coloque como regra um número específico de palavras de acordo com cada
   referência. Não quero linhas enormes de texto, quero algo bem bonito e
   estético."

   ENTÃO OS NÚMEROS SAEM DAS REFERÊNCIAS QUE ELE MANDOU, não de chute meu. O que
   cada print/vídeo dele mostra, contado palavra por palavra:

     modelo 1  "parar de criar" (3) · IMPOSTO (1) · "em cima de imposto" (4)
     modelo 2  a regra dita por ele: "3 ou 4 palavras em cima e SÓ UMA embaixo"
     modelo 3  "parar de criar" (3) · IMPOSTO (1) · "em cima de imposto" (4)
     modelo 4  "para dar" (2) · VIDA (1) · "em nossos" (2) · VÍDEOS (1)
     modelo 5  "Comente" (1) · TEXT (1) · "para receber" (2)
     modelo 6  "Crie letterings" (2) · ATRATIVOS (1) · "sem esforço" (2)

   DUAS DECISÕES QUE VALEM PARA TODOS:

   1. O DESTAQUE É SEMPRE UMA PALAVRA SÓ. Era 2 no modelo 2 e 5 no modelo 3 —
      sobra de quando os limites eram chute. Destaque com duas palavras encolhe
      o corpo e é exatamente o "lettering feio" que ele reprovou.

   2. NENHUM LIMITE PASSA DA REFERÊNCIA. Onde a referência tem 2, o limite é 2.
      Antes o modelo 5 aceitava 3 onde a referência tem 1, e o modelo 3 aceitava
      5 onde a referência tem 3 — folga que só servia para eu escrever demais.

   Onde a linha SANGRA pela borda (a de baixo do modelo 3) o limite acompanha a
   referência, que já usa 4 ali: é o desenho daquele modelo, não descuido.

   Isto é TETO, não alvo: o bonito costuma estar um abaixo. */
export const LIMITES = {
  modelo1: {linha1: 3, linha2: 1, linha3: 4},
  modelo2: {pequena: 4, destaque: 1},
  modelo3: {antes: 3, destaque: 1, depois: 4},
  modelo4: {pequena1: 3, destaque1: 1, pequena2: 3, destaque2: 1},
  modelo5: {cima: 2, destaque: 1, baixo: 2},
  modelo6: {cima: 2, destaque: 1, baixo: 2},
} as const;
