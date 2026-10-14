import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {LetteringModelo2, DURACAO2_PADRAO, duracao2De} from './Modelo2';
import {PAN, trava} from '../shared/design';

/**
 * EXEMPLO DO MODELO 2 (15/09/2026, 2ª versão).
 *
 * A 1ª versão trazia a frase inteira em cima ("chega de tratar o contribuinte
 * como se fosse um" / CAIXA ELETRÔNICO) e ele cortou: "não precisa desse tanto
 * de palavras, 3 ou 4 em cima e só uma embaixo". Agora são 3 palavras em cima e
 * 1 embaixo.
 *
 * A FRASE É LITERAL do Aquila 18.srt (00:24,758 → 00:25,892): "parar de criar
 * imposto" — as quatro palavras seguidas, na ordem em que ele fala.
 *
 * FUNDO: o único quadro limpo dele no projeto, como no exemplo do modelo 1.
 */
export const EXEMPLO2_DUR = DURACAO2_PADRAO;

/**
 * O exemplo aceita OUTRAS FRASES por prop, para testar a adaptação ao texto.
 * Os campos são OBRIGATÓRIOS de propósito: com campos opcionais, o genérico do
 * `<Composition>` infere `{}` dentro de `calculateMetadata` e o TypeScript
 * reclama. O texto padrão vive no `defaultProps` da composição, num lugar só.
 */
export type Exemplo2Props = {pequena: string; destaque: string};

export const LetteringExemplo2: React.FC<Exemplo2Props> = ({pequena, destaque}) => {
  const frame = useCurrentFrame();
  const dur = duracao2De(pequena, destaque);
  const push = interpolate(frame, [0, dur * 60], [1, 1.03], {...trava, easing: PAN});
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Img
        src={staticFile('lettering/fundo_exemplo.png')}
        style={{width: 1080, height: 1920, transform: `scale(${push.toFixed(4)})`}}
      />
      <LetteringModelo2 pequena={pequena} destaque={destaque} />
    </AbsoluteFill>
  );
};
