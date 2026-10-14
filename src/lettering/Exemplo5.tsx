import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {LetteringModelo5, DURACAO5_PADRAO, duracao5De} from './Modelo5';
import {PAN, trava} from '../shared/design';

/**
 * EXEMPLO DO MODELO 5 (21/09/2026).
 *
 * A FRASE É A DA REFERÊNCIA DELE — "Comente TEXT para receber" — de propósito:
 * é a única forma de comparar lado a lado o que ele mandou com o que saiu, e
 * de ver que a mecânica bate (a de cima digitando, a grande acendendo
 * embaralhada, a de baixo chegando esmaecida).
 *
 * Para usar numa peça de verdade a frase muda, e aí valem os limites do
 * modelo: 3 palavras por linha pequena e UMA na grande.
 */
export const EXEMPLO5_DUR = DURACAO5_PADRAO;

export type Exemplo5Props = {
  cima: string;
  destaque: string;
  baixo: string;
};

export const LetteringExemplo5: React.FC<Exemplo5Props> = ({cima, destaque, baixo}) => {
  const frame = useCurrentFrame();
  const dur = duracao5De(cima, destaque, baixo);
  const push = interpolate(frame, [0, dur * 60], [1, 1.03], {...trava, easing: PAN});
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img
        src={staticFile('lettering/fundo_exemplo.png')}
        style={{width: 1080, height: 1920, transform: `scale(${push.toFixed(4)})`}}
      />
      <LetteringModelo5 cima={cima} destaque={destaque} baixo={baixo} />
    </AbsoluteFill>
  );
};
