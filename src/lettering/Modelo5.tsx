import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Lettering5, cuesSfx5, tempos5De, duracao5De, type Tempos5} from './Lettering5';
import {ZOOM_DE} from './base';
import {Pops, comDestaqueForte} from './base';

/**
 * LETTERING MODELO 5 COMO FERRAMENTA — composição LETTER-Modelo5, fundo
 * TRANSPARENTE, texto por props:
 *
 *   npx remotion render LETTER-Modelo5 saida-alpha.mov \
 *     --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
 *     --props='{"cima":"Comente","destaque":"TEXT","baixo":"para receber"}'
 *
 * O DESENHO É UMA PALAVRA GRANDE entre duas linhas pequenas que a invadem.
 * O limite é de 3 palavras em cada linha pequena e UMA na grande — e vale o de
 * sempre: o limite é onde o render PARA, não é o desenho. Duas palavras em
 * cima e duas embaixo é o que fica bonito.
 *
 * O SOM: um pop de tecla por letra que entra, que é o que a animação pede —
 * a linha de cima digita e a palavra grande acende letra a letra.
 */
export type Modelo5Props = {
  cima: string;
  destaque: string;
  baixo: string;
  tempos?: Tempos5;
  duracao?: number;
  zoomDe?: number;
  centroY?: number;
};

export const TEMPOS5_PADRAO: Tempos5 = {cima: 0.12, destaque: 0.38, baixo: 0.78};
export const DURACAO5_PADRAO = 3.4;

export const LetteringModelo5: React.FC<Modelo5Props> = ({
  cima,
  destaque,
  baixo,
  tempos,
  duracao,
  zoomDe = ZOOM_DE,
  centroY = 1180,
}) => {
  const t = tempos ?? tempos5De(cima, destaque);
  return (
    <AbsoluteFill>
      {/* uma tecla por letra — e a última, a linha de baixo, mais alta */}
      <Pops cues={comDestaqueForte(cuesSfx5(t, cima, destaque.toUpperCase()))} />
      <CameraMotionBlur shutterAngle={180} samples={8}>
        <Lettering5
          cima={cima}
          destaque={destaque}
          baixo={baixo}
          tempos={t}
          zoom={{
            de: zoomDe,
            ate: 1,
            duracao: duracao ?? duracao5De(cima, destaque, baixo),
          }}
          centroY={centroY}
        />
      </CameraMotionBlur>
    </AbsoluteFill>
  );
};

export {tempos5De, duracao5De};
