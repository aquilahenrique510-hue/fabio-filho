import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Lettering, cuesSfx, type Tempos} from './Lettering';
import {ZOOM_DE} from './base';
import {Pops} from './base';

/**
 * O LETTERING COMO FERRAMENTA — composição LETTER-Modelo1, com FUNDO
 * TRANSPARENTE, para entrar direto no Premiere por cima da gravação.
 *
 * O texto e os tempos entram por PROPS, sem mexer em código:
 *
 *   npx remotion render LETTER-Modelo1 saida-alpha.mov \
 *     --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
 *     --props='{"linha1":"porque a","linha2":"INCLUSÃO","linha3":"só dentro da escola"}'
 *
 * Tempos, duração e zoom são opcionais: sem eles valem os do exemplo, e o ritmo
 * das palavras da linha 3 sai do tamanho de cada palavra. Com o SRT, passar os
 * tempos da fala em `tempos`.
 *
 * O motion blur de câmera (8 amostras, obturador de 180°) funciona com fundo
 * transparente: as amostras são camadas com opacidade, e o canal alfa guarda o
 * rastro.
 */
export type Modelo1Props = {
  linha1: string;
  linha2: string;
  linha3: string;
  tempos?: Tempos;
  duracao?: number;
  zoomDe?: number;
  centroY?: number;
};

export const TEMPOS_PADRAO: Tempos = {linha1: 0.15, linha2: 0.4, corte: 1.1, linha3: 1.3};
export const DURACAO_PADRAO = 4.6;

export const LetteringModelo1: React.FC<Modelo1Props> = ({
  linha1,
  linha2,
  linha3,
  tempos = TEMPOS_PADRAO,
  duracao = DURACAO_PADRAO,
  zoomDe = ZOOM_DE,
  centroY = 1180,
}) => (
  <AbsoluteFill>
    {/* AQUI O FORTE É O CORTE, não o último cue. No modelo 1 o clímax é a
        linha 2 repartindo na diagonal; as palavras da linha 3 vêm depois, e
        são a digitação miúda. Por isso este não usa `comDestaqueForte`. */}
    <Pops
      cues={cuesSfx(tempos, linha3).map((c) => ({
        t: c.t,
        forte: c.t === tempos.corte,
      }))}
    />
    <CameraMotionBlur shutterAngle={180} samples={8}>
      <Lettering
        linha1={linha1}
        linha2={linha2}
        linha3={linha3}
        tempos={tempos}
        zoom={{de: zoomDe, ate: 1, duracao}}
        centroY={centroY}
      />
    </CameraMotionBlur>
  </AbsoluteFill>
);
