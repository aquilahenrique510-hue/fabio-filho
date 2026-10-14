import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Lettering6, cuesSfx6, tempos6De, duracao6De, type Tempos6} from './Lettering6';
import {Pops, comDestaqueForte, ZOOM_DE} from './base';

/**
 * LETTERING MODELO 6 COMO FERRAMENTA — composição LETTER-Modelo6, fundo
 * TRANSPARENTE, texto por props:
 *
 *   npx remotion render LETTER-Modelo6 saida-alpha.mov \
 *     --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
 *     --props='{"cima":"Crie letterings","destaque":"ATRATIVOS","baixo":"sem esforço"}'
 *
 * O desenho é de 2 palavras em cada linha pequena e UMA na grande — os limites
 * estão em `LIMITES.modelo6`, tirados da referência dele.
 */
export type Modelo6Props = {
  cima: string;
  destaque: string;
  baixo: string;
  tempos?: Tempos6;
  duracao?: number;
  zoomDe?: number;
  centroY?: number;
};

export const TEMPOS6_PADRAO: Tempos6 = {cima: 0.12, destaque: 0.3, baixo: 0.52, brilho: 0.75};
export const DURACAO6_PADRAO = 3.4;

export const LetteringModelo6: React.FC<Modelo6Props> = ({
  cima,
  destaque,
  baixo,
  tempos,
  duracao,
  zoomDe = ZOOM_DE,
  centroY = 1180,
}) => {
  const t = tempos ?? tempos6De(cima, destaque);
  return (
    <AbsoluteFill>
      {/* uma batida por linha; a última, o brilho varrendo, mais alta */}
      <Pops cues={comDestaqueForte(cuesSfx6(t))} />
      <CameraMotionBlur shutterAngle={180} samples={8}>
        <Lettering6
          cima={cima}
          destaque={destaque}
          baixo={baixo}
          tempos={t}
          zoom={{de: zoomDe, ate: 1, duracao: duracao ?? duracao6De(cima, destaque, baixo)}}
          centroY={centroY}
        />
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};

export {tempos6De, duracao6De};
