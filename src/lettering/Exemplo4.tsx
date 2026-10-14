import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {LetteringModelo4, DURACAO4_PADRAO, duracao4De} from './Modelo4';
import {PAN, trava} from '../shared/design';

/**
 * EXEMPLO DO MODELO 4 (15/09/2026).
 *
 * FRASE LITERAL do Aquila 18.srt (00:24,758 → 00:27,060): "parar de criar
 * imposto em cima de imposto". A repetição de IMPOSTO cai bem no desenho de
 * DUAS palavras em amarelo — e é a frase que ele fala, não uma montagem minha.
 */
export const EXEMPLO4_DUR = DURACAO4_PADRAO;

/** frases por prop; campos obrigatórios (ver o comentário no Exemplo2.tsx) */
export type Exemplo4Props = {
  pequena1: string;
  destaque1: string;
  pequena2: string;
  destaque2: string;
};

export const LetteringExemplo4: React.FC<Exemplo4Props> = ({
  pequena1,
  destaque1,
  pequena2,
  destaque2,
}) => {
  const frame = useCurrentFrame();
  const dur = duracao4De(pequena1, destaque1, pequena2, destaque2);
  const push = interpolate(frame, [0, dur * 60], [1, 1.03], {...trava, easing: PAN});
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img
        src={staticFile('lettering/fundo_exemplo.png')}
        style={{width: 1080, height: 1920, transform: `scale(${push.toFixed(4)})`}}
      />
      <LetteringModelo4
        pequena1={pequena1}
        destaque1={destaque1}
        pequena2={pequena2}
        destaque2={destaque2}
      />
    </AbsoluteFill>
  );
};
