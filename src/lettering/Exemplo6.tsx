import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {LetteringModelo6, DURACAO6_PADRAO, duracao6De} from './Modelo6';
import {PAN, trava} from '../shared/design';

/**
 * EXEMPLO DO MODELO 6 (22/09/2026) — a frase da referência dele, para dar para
 * comparar lado a lado com o vídeo que ele mandou.
 */
export const EXEMPLO6_DUR = DURACAO6_PADRAO;

export type Exemplo6Props = {
  cima: string;
  destaque: string;
  baixo: string;
};

export const LetteringExemplo6: React.FC<Exemplo6Props> = ({cima, destaque, baixo}) => {
  const frame = useCurrentFrame();
  const dur = duracao6De(cima, destaque, baixo);
  const push = interpolate(frame, [0, dur * 60], [1, 1.03], {...trava, easing: PAN});
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img
        src={staticFile('lettering/fundo_exemplo.png')}
        style={{width: 1080, height: 1920, transform: `scale(${push.toFixed(4)})`}}
      />
      <LetteringModelo6 cima={cima} destaque={destaque} baixo={baixo} />
    </AbsoluteFill>
  );
};
