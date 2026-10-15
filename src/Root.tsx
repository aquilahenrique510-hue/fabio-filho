import React from 'react';
import {Composition} from 'remotion';
import {ALT, FPS, LARG, f} from './shared/design';
import {Capitulo, type CapituloProps} from './flv/Capitulo';
import {CAPITULOS} from './flv/config';
import {PalavraPorPalavra, ESSA_NEM_EU, duracaoPalavras} from './flv/PalavraPorPalavra';
import {Numeros, SEM_MEDO, CASAS, CRESCE, MINISTERIOS, type NumerosProps} from './flv/Numeros';
import {Barras, IMPOSTO} from './flv/Barras';
import {Trem, TREM} from './flv/Trem';
import {Simbolos, MARCADORES} from './flv/Simbolos';
import {Boatos, BOATOS} from './flv/Boatos';
import {DocumentoCapa, Pagina15, Pagina58, K, L, M} from './flv/Documento';
import {Clarea, CLAREA, MenosImposto, MENOS_IMPOSTO, Chamas, CHAMAS} from './flv/Ilustra';
import type {Tema} from './shared/design';
import {V2, V2_DURACAO} from './flv/V2';
import {Abertura, ABERTURA} from './flv/ilustra/abertura';
import {Bet, BET, Consumo, CONSUMO} from './flv/ilustra/cap1a5';
import {Tesoura, TESOURA} from './flv/ilustra/presidente';

const durDe = (j: {inicio: number; fim: number}) => Math.round(f(j.fim - j.inicio));
const NUMEROS = [
  {id: 'FLV-C-SemMedo', j: SEM_MEDO},
  {id: 'FLV-G-Casas', j: CASAS},
  {id: 'FLV-H-Cresce', j: CRESCE},
  {id: 'FLV-J-Ministerios', j: MINISTERIOS},
];
const PECAS: {id: string; c: React.FC<{tema: Tema}>; j: {inicio: number; fim: number}}[] = [
  {id: 'FLV-A-Boatos', c: Boatos, j: BOATOS},
  {id: 'FLV-F-Marcadores', c: Simbolos, j: MARCADORES},
  {id: 'FLV-D-Imposto', c: Barras, j: IMPOSTO},
  {id: 'FLV-E-Trem', c: Trem, j: TREM},
  {id: 'FLV-K-Documento', c: DocumentoCapa, j: K},
  {id: 'FLV-L-Pagina15', c: Pagina15, j: L},
  {id: 'FLV-M-Pagina58', c: Pagina58, j: M},
  {id: 'FLV-I-Clarea', c: Clarea, j: CLAREA},
  // V3 (15/10/2026): abertura ilustrada, carrinho do consumo, bet → comida
  {id: 'FLV-A3-Abertura', c: Abertura, j: ABERTURA},
  {id: 'FLV-R-Consumo', c: Consumo, j: CONSUMO},
  {id: 'FLV-Q-Bet', c: Bet, j: BET},
  {id: 'FLV-N-MenosImposto', c: MenosImposto, j: MENOS_IMPOSTO},
  {id: 'FLV-T-Tesoura', c: Tesoura, j: TESOURA}, // canto, por cima da FLV-A3
  {id: 'FLV-O-Chamas', c: Chamas, j: CHAMAS},
];

// ── lettering (kit KIT - LETTERING NIKOLAS, 30/09/2026) ─────────────────────
import {LetteringExemplo, EXEMPLO_DUR} from './lettering/Exemplo';
import {LetteringModelo1, DURACAO_PADRAO as LETTER_DUR, type Modelo1Props} from './lettering/Modelo1';
import {LetteringExemplo2, EXEMPLO2_DUR, type Exemplo2Props} from './lettering/Exemplo2';
import {LetteringModelo2, DURACAO2_PADRAO as LETTER2_DUR, duracao2De, type Modelo2Props} from './lettering/Modelo2';
import {LetteringExemplo3, EXEMPLO3_DUR, type Exemplo3Props} from './lettering/Exemplo3';
import {LetteringModelo3, DURACAO3_PADRAO as LETTER3_DUR, duracao3De, type Modelo3Props} from './lettering/Modelo3';
import {LetteringExemplo4, EXEMPLO4_DUR, type Exemplo4Props} from './lettering/Exemplo4';
import {LetteringModelo4, DURACAO4_PADRAO as LETTER4_DUR, duracao4De, type Modelo4Props} from './lettering/Modelo4';
import {LetteringExemplo5, EXEMPLO5_DUR, type Exemplo5Props} from './lettering/Exemplo5';
import {LetteringModelo5, DURACAO5_PADRAO as LETTER5_DUR, duracao5De, type Modelo5Props} from './lettering/Modelo5';
import {LetteringExemplo6, EXEMPLO6_DUR, type Exemplo6Props} from './lettering/Exemplo6';
import {LetteringModelo6, DURACAO6_PADRAO as LETTER6_DUR, duracao6De, type Modelo6Props} from './lettering/Modelo6';

export const Root: React.FC = () => (
  <>
    {/* FLV · V2 ILUSTRADA — o vídeo inteiro, com SFX */}
    <Composition<any, {tema: Tema}>
      id="FLV-V2-Completo"
      component={V2}
      durationInFrames={Math.round(f(V2_DURACAO))}
      fps={FPS}
      width={LARG}
      height={ALT}
      defaultProps={{tema: 'alfa'}}
    />

    {/* FLV — peças com tema (alfa / claro / escuro por --props) */}
    {PECAS.map((p) => (
      <Composition<any, {tema: Tema}>
        key={p.id}
        id={p.id}
        component={p.c}
        durationInFrames={durDe(p.j)}
        fps={FPS}
        width={LARG}
        height={ALT}
        defaultProps={{tema: 'alfa'}}
      />
    ))}
    {NUMEROS.map((n) => (
      <Composition<any, NumerosProps>
        key={n.id}
        id={n.id}
        component={Numeros}
        durationInFrames={durDe(n.j)}
        fps={FPS}
        width={LARG}
        height={ALT}
        defaultProps={{tema: 'alfa', itens: n.j.itens}}
      />
    ))}

    {/* FLV — "E essa nem eu esperava", palavra por palavra (01:51,480) */}
    <Composition
      id="FLV-L2-EssaNemEu"
      component={PalavraPorPalavra}
      durationInFrames={Math.round(f(duracaoPalavras(ESSA_NEM_EU)))}
      fps={FPS}
      width={LARG}
      height={ALT}
    />

    {/* FLV — "O Flávio real", card de capítulo 1/9 → 9/9 */}
    {CAPITULOS.map((c) => (
      <Composition<any, CapituloProps>
        key={c.n}
        id={`FLV-B-Capitulo-${c.n}`}
        component={Capitulo}
        durationInFrames={Math.round(f(c.fim - c.inicio))}
        fps={FPS}
        width={LARG}
        height={ALT}
        defaultProps={{n: c.n, tema: 'alfa'}}
      />
    ))}

      <Composition
        id="LETTER-Exemplo"
        component={LetteringExemplo}
        durationInFrames={Math.round(EXEMPLO_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
      />

      {/*
        O LETTERING COMO FERRAMENTA (v5, 15/09/2026): fundo TRANSPARENTE, texto e
        tempos por --props, duracao calculada a partir de props.duracao. Ver
        src/lettering/Modelo1.tsx para o comando de render.
      */}
      <Composition
        id="LETTER-Modelo1"
        component={LetteringModelo1}
        durationInFrames={Math.round(LETTER_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{linha1: 'parar de criar', linha2: 'IMPOSTO', linha3: 'em cima de imposto'} as Modelo1Props}
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round((props.duracao ?? LETTER_DUR) * 60),
        })}
      />
      <Composition
        id="LETTER-Exemplo2"
        component={LetteringExemplo2}
        durationInFrames={Math.round(EXEMPLO2_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{pequena: 'parar de criar', destaque: 'IMPOSTO'} as Exemplo2Props}
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(duracao2De(props.pequena, props.destaque) * 60),
        })}
      />
      <Composition
        id="LETTER-Modelo2"
        component={LetteringModelo2}
        durationInFrames={Math.round(LETTER2_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={{pequena: 'parar de criar', destaque: 'IMPOSTO'} as Modelo2Props}
        calculateMetadata={({props}) => ({
          // a duração sai do TEXTO: frase maior, peça maior
          durationInFrames: Math.round(
            (props.duracao ?? duracao2De(props.pequena, props.destaque) ?? LETTER2_DUR) * 60
          ),
        })}
      />
      <Composition
        id="LETTER-Exemplo3"
        component={LetteringExemplo3}
        durationInFrames={Math.round(EXEMPLO3_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {antes: 'parar de criar', destaque: 'IMPOSTO', depois: 'em cima de imposto'} as Exemplo3Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(duracao3De(props.antes, props.destaque, props.depois) * 60),
        })}
      />
      <Composition
        id="LETTER-Modelo3"
        component={LetteringModelo3}
        durationInFrames={Math.round(LETTER3_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {antes: 'parar de criar', destaque: 'IMPOSTO', depois: 'em cima de imposto'} as Modelo3Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(
            (props.duracao ?? duracao3De(props.antes, props.destaque, props.depois) ?? LETTER3_DUR) * 60
          ),
        })}
      />
      <Composition
        id="LETTER-Exemplo4"
        component={LetteringExemplo4}
        durationInFrames={Math.round(EXEMPLO4_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {
            pequena1: 'parar de criar',
            destaque1: 'IMPOSTO',
            pequena2: 'em cima de',
            destaque2: 'IMPOSTO',
          } as Exemplo4Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(
            duracao4De(props.pequena1, props.destaque1, props.pequena2, props.destaque2) * 60
          ),
        })}
      />
      <Composition
        id="LETTER-Modelo4"
        component={LetteringModelo4}
        durationInFrames={Math.round(LETTER4_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {
            pequena1: 'parar de criar',
            destaque1: 'IMPOSTO',
            pequena2: 'em cima de',
            destaque2: 'IMPOSTO',
          } as Modelo4Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(
            (props.duracao ??
              duracao4De(props.pequena1, props.destaque1, props.pequena2, props.destaque2) ??
              LETTER4_DUR) * 60
          ),
        })}
      />

      {/*
        MODELO 5 (21/09/2026) - referencia dele em print E VIDEO. Uma palavra
        grande LARANJA (#FF6700, medido no print) entre duas linhas pequenas em
        italico que a invadem. As fontes sao as NOSSAS, por pedido literal dele:
        Coolvetica nas pequenas, Montserrat Black na grande.

        O movimento saiu do video quadro a quadro: a linha de cima DIGITA em
        ordem, a palavra grande acende EMBARALHADA e piscando (extraido: "XT" ->
        "T_T" -> "TE_T" -> "T_XT" -> "TEX" -> "TEXT"), e a linha de baixo chega
        esmaecida e vai ficando branca. Um pop de tecla por letra.
      */}
      <Composition
        id="LETTER-Exemplo5"
        component={LetteringExemplo5}
        durationInFrames={Math.round(EXEMPLO5_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {cima: 'Comente', destaque: 'TEXT', baixo: 'para receber'} as Exemplo5Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(
            duracao5De(props.cima, props.destaque, props.baixo) * 60
          ),
        })}
      />
      <Composition
        id="LETTER-Modelo5"
        component={LetteringModelo5}
        durationInFrames={Math.round(LETTER5_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {cima: 'Comente', destaque: 'TEXT', baixo: 'para receber'} as Modelo5Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(
            (props.duracao ?? duracao5De(props.cima, props.destaque, props.baixo) ?? LETTER5_DUR) *
              60
          ),
        })}
      />

      {/*
        MODELO 6 (22/09/2026) - print e video. Mesmo esqueleto do 5 (pequena ·
        GRANDE · pequena), e separado dele no que importa: a palavra grande e
        CROMADA (degrade vertical dentro das letras, medido no print: tons de 56
        a 254 nos mesmos glifos) com um BRILHO que varre da esquerda para a
        direita; nada digita e nada pisca - as tres linhas chegam DESFOCADAS e
        desembacam; a pequena de cima alinha a esquerda e a de baixo a direita.
      */}
      <Composition
        id="LETTER-Exemplo6"
        component={LetteringExemplo6}
        durationInFrames={Math.round(EXEMPLO6_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {cima: 'Crie letterings', destaque: 'ATRATIVOS', baixo: 'sem esforço'} as Exemplo6Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(duracao6De(props.cima, props.destaque, props.baixo) * 60),
        })}
      />
      <Composition
        id="LETTER-Modelo6"
        component={LetteringModelo6}
        durationInFrames={Math.round(LETTER6_DUR * 60)}
        fps={60}
        width={1080}
        height={1920}
        defaultProps={
          {cima: 'Crie letterings', destaque: 'ATRATIVOS', baixo: 'sem esforço'} as Modelo6Props
        }
        calculateMetadata={({props}) => ({
          durationInFrames: Math.round(
            (props.duracao ?? duracao6De(props.cima, props.destaque, props.baixo) ?? LETTER6_DUR) * 60
          ),
        })}
      />
  </>
);
