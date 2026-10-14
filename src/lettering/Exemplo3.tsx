import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {LetteringModelo3, DURACAO3_PADRAO, duracao3De} from './Modelo3';
import {PAN, trava} from '../shared/design';

/**
 * EXEMPLO DO MODELO 3 (15/09/2026).
 *
 * FRASE LITERAL do Aquila 18.srt (00:24,758 → 00:27,060): "parar de criar
 * imposto em cima de imposto". A mesma frase do exemplo do modelo 1, de
 * propósito: assim dá para comparar os estilos lado a lado com o mesmo texto.
 */
export const EXEMPLO3_DUR = DURACAO3_PADRAO;

/** frases por prop; campos obrigatórios (ver o comentário no Exemplo2.tsx) */
export type Exemplo3Props = {antes: string; destaque: string; depois: string};

export const LetteringExemplo3: React.FC<Exemplo3Props> = ({antes, destaque, depois}) => {
  const frame = useCurrentFrame();
  const dur = duracao3De(antes, destaque, depois);
  const push = interpolate(frame, [0, dur * 60], [1, 1.03], {...trava, easing: PAN});
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img
        src={staticFile('lettering/fundo_exemplo.png')}
        style={{width: 1080, height: 1920, transform: `scale(${push.toFixed(4)})`}}
      />
      <LetteringModelo3 antes={antes} destaque={destaque} depois={depois} />
    </AbsoluteFill>
  );
};
