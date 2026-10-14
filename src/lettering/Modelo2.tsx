import React from 'react';
import {AbsoluteFill} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {Lettering2, cuesSfx2, type Tempos2} from './Lettering2';
import {ritmo, ritmoDaFrase, duracaoDe, Pops, comDestaqueForte, ZOOM_DE} from './base';

/**
 * LETTERING MODELO 2 COMO FERRAMENTA — composição LETTER-Modelo2, fundo
 * TRANSPARENTE, texto por props:
 *
 *   npx remotion render LETTER-Modelo2 saida-alpha.mov \
 *     --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
 *     --props='{"pequena":"parar de criar","destaque":"IMPOSTO"}'
 *
 * O DESENHO É 3–4 PALAVRAS EM CIMA E UMA EMBAIXO (pedido dele em 15/09/2026).
 * Frase longa ainda renderiza, mas foge do estilo.
 *
 * Tempos, duração e zoom são opcionais. Motion blur de câmera como no modelo 1.
 */
export type Modelo2Props = {
  pequena: string;
  destaque: string;
  tempos?: Tempos2;
  duracao?: number;
  zoomDe?: number;
  centroY?: number;
};

export const TEMPOS2_PADRAO: Tempos2 = {pequena: 0.15, destaque: 0.42};
export const DURACAO2_PADRAO = 3.2;

/**
 * TEMPOS E DURAÇÃO SAEM DO TEXTO. O destaque espera as palavras de cima subirem
 * (cada uma no seu ritmo, pelo tamanho), mas entra antes de a última assentar —
 * as entradas continuam se sobrepondo.
 */
export const tempos2De = (pequena: string): Tempos2 => {
  const subida = ritmoDaFrase(pequena) * 0.55;
  return {pequena: 0.15, destaque: Number((0.15 + Math.max(0.22, subida)).toFixed(3))};
};
export const duracao2De = (pequena: string, destaque: string) =>
  duracaoDe(tempos2De(pequena).destaque + ritmo(destaque) + 0.35);

export const LetteringModelo2: React.FC<Modelo2Props> = ({
  pequena,
  destaque,
  tempos,
  duracao,
  zoomDe = ZOOM_DE,
  centroY = 1180,
}) => (
  <AbsoluteFill>
    {/* um pop por palavra que sobe, mais um no destaque — o som de digitação
        que ele pediu. Fica FORA do motion blur de propósito (ver base.tsx). */}
    <Pops
      cues={comDestaqueForte(
        cuesSfx2(tempos ?? tempos2De(pequena), pequena.split(' ').length)
      )}
    />
    <CameraMotionBlur shutterAngle={180} samples={8}>
      <Lettering2
        pequena={pequena}
        destaque={destaque}
        tempos={tempos ?? tempos2De(pequena)}
        zoom={{de: zoomDe, ate: 1, duracao: duracao ?? duracao2De(pequena, destaque)}}
        centroY={centroY}
      />
    </CameraMotionBlur>
  </AbsoluteFill>
);
