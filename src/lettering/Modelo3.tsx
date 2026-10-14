import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Lettering3, cuesSfx3, type Tempos3} from './Lettering3';
import {ritmo, ritmoDaFrase, duracaoDe, Pops, comDestaqueForte, ZOOM_DE} from './base';

/**
 * LETTERING MODELO 3 COMO FERRAMENTA — composição LETTER-Modelo3, fundo
 * TRANSPARENTE, texto por props:
 *
 *   npx remotion render LETTER-Modelo3 saida-alpha.mov \
 *     --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
 *     --props='{"antes":"parar de criar","destaque":"IMPOSTO","depois":"em cima de imposto"}'
 *
 * A palavra do meio SANGRA pela direita de propósito — é o estilo do print.
 */
export type Modelo3Props = {
  antes: string;
  destaque: string;
  depois: string;
  tempos?: Tempos3;
  duracao?: number;
  zoomDe?: number;
  centroY?: number;
};

export const TEMPOS3_PADRAO: Tempos3 = {antes: 0.15, destaque: 0.34, corte: 0.92, depois: 0.62};
export const DURACAO3_PADRAO = 3.6;

/** tempos e duração pelo texto: frase maior pede mais tempo antes do corte */
export const tempos3De = (antes: string, destaque: string, depois: string): Tempos3 => {
  const a = 0.15;
  const d = Number((a + Math.max(0.16, ritmoDaFrase(antes) * 0.45)).toFixed(3));
  const p = Number((d + Math.max(0.24, ritmo(destaque) * 0.9)).toFixed(3));
  const c = Number((p + Math.max(0.28, ritmoDaFrase(depois) * 0.45)).toFixed(3));
  return {antes: a, destaque: d, corte: c, depois: p};
};
export const duracao3De = (antes: string, destaque: string, depois: string) =>
  duracaoDe(tempos3De(antes, destaque, depois).corte + 0.7);

export const LetteringModelo3: React.FC<Modelo3Props> = ({
  antes,
  destaque,
  depois,
  tempos,
  duracao,
  zoomDe = ZOOM_DE,
  centroY = 1180,
}) => (
  <AbsoluteFill>
    {/* um pop por entrada; o último, o destaque que reparte, mais alto */}
    <Pops cues={comDestaqueForte(cuesSfx3(tempos ?? tempos3De(antes, destaque, depois)))} />
    <CameraMotionBlur shutterAngle={180} samples={8}>
      <Lettering3
        antes={antes}
        destaque={destaque}
        depois={depois}
        tempos={tempos ?? tempos3De(antes, destaque, depois)}
        zoom={{de: zoomDe, ate: 1, duracao: duracao ?? duracao3De(antes, destaque, depois)}}
        centroY={centroY}
      />
    </CameraMotionBlur>
  </AbsoluteFill>
);
