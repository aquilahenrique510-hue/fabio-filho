import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {LetteringModelo1, TEMPOS_PADRAO, DURACAO_PADRAO} from './Modelo1';
import {PAN, trava} from '../shared/design';

/**
 * EXEMPLO DO LETTERING — versão 5 (15/09/2026). O mesmo LETTER-Modelo1 com o
 * fundo por baixo, só para visualizar.
 *
 * A FRASE é literal do fecho do Imposto sobre Imposto (Aquila 18.srt), "...parar
 * de criar imposto em cima de imposto" — trecho de rosto, sem elemento para pôr.
 *
 * O FUNDO é o único quadro limpo dele no projeto: `Sequência aninhada 05.mp4` é
 * uma sequência editada com textos de outros planos gravados na imagem.
 *
 * O RITMO é de leitura, não do áudio (não há o áudio desse trecho). As palavras
 * da linha 3 agora seguem o tamanho de cada uma: 1,300 · 1,416 · 1,568 · 1,684.
 */
export const EXEMPLO_DUR = DURACAO_PADRAO;

export const LetteringExemplo: React.FC = () => {
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, EXEMPLO_DUR * 60], [1, 1.03], {...trava, easing: PAN});
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img
        src={staticFile('lettering/fundo_exemplo.png')}
        style={{width: 1080, height: 1920, transform: `scale(${push.toFixed(4)})`}}
      />
      <LetteringModelo1
        linha1="parar de criar"
        linha2="IMPOSTO"
        linha3="em cima de imposto"
        tempos={TEMPOS_PADRAO}
        duracao={EXEMPLO_DUR}
      />
    </AbsoluteFill>
  );
};
