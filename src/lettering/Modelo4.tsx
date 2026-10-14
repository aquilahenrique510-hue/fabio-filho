import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Lettering4, cuesSfx4, type Tempos4} from './Lettering4';
import {ritmo, ritmoDaFrase, duracaoDe, Pops, comDestaqueForte, ZOOM_DE} from './base';

/**
 * LETTERING MODELO 4 COMO FERRAMENTA — composição LETTER-Modelo4, fundo
 * TRANSPARENTE, texto por props:
 *
 *   npx remotion render LETTER-Modelo4 saida-alpha.mov \
 *     --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
 *     --props='{"pequena1":"parar de criar","destaque1":"IMPOSTO","pequena2":"em cima de","destaque2":"IMPOSTO"}'
 *
 * Duas palavras em amarelo, escada na diagonal, fontes padrão da série.
 */
export type Modelo4Props = {
  pequena1: string;
  destaque1: string;
  pequena2: string;
  destaque2: string;
  tempos?: Tempos4;
  duracao?: number;
  zoomDe?: number;
  centroY?: number;
};

export const TEMPOS4_PADRAO: Tempos4 = {linhaA: 0.15, linhaB: 0.34, linhaC: 0.52};
export const DURACAO4_PADRAO = 3.6;

/** cada linha espera a anterior conforme o TAMANHO do que entrou */
export const tempos4De = (pequena1: string, destaque1: string, pequena2: string): Tempos4 => {
  const a = 0.15;
  const b = Number((a + Math.max(0.19, (ritmoDaFrase(pequena1) + ritmo(destaque1)) * 0.4)).toFixed(3));
  const c = Number((b + Math.max(0.18, ritmoDaFrase(pequena2) * 0.5)).toFixed(3));
  return {linhaA: a, linhaB: b, linhaC: c};
};
export const duracao4De = (pequena1: string, destaque1: string, pequena2: string, destaque2: string) =>
  duracaoDe(tempos4De(pequena1, destaque1, pequena2).linhaC + ritmo(destaque2) + 0.35);

export const LetteringModelo4: React.FC<Modelo4Props> = ({
  pequena1,
  destaque1,
  pequena2,
  destaque2,
  tempos,
  duracao,
  zoomDe = ZOOM_DE,
  centroY = 1180,
}) => (
  <AbsoluteFill>
    {/* um pop em cada uma das três entradas; o último, o 2º destaque, mais alto */}
    <Pops
      cues={comDestaqueForte(cuesSfx4(tempos ?? tempos4De(pequena1, destaque1, pequena2)))}
    />
    <CameraMotionBlur shutterAngle={180} samples={8}>
      <Lettering4
        pequena1={pequena1}
        destaque1={destaque1}
        pequena2={pequena2}
        destaque2={destaque2}
        tempos={tempos ?? tempos4De(pequena1, destaque1, pequena2)}
        zoom={{de: zoomDe, ate: 1, duracao: duracao ?? duracao4De(pequena1, destaque1, pequena2, destaque2)}}
        centroY={centroY}
      />
    </CameraMotionBlur>
  </AbsoluteFill>
);
