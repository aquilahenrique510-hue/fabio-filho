// O que as peças do FLV compartilham: fonte da série, tinta por tema, a cena
// (placa FORA do grupo que esmaece), saída padrão e o hodômetro.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Archivo';
import {COR, EXPO_OUT, INOUT, deriva, f, limita, placa, type Tema} from '../shared/design';

export const {fontFamily: ARCHIVO} = loadFont('normal', {weights: ['500', '700', '800'], subsets: ['latin', 'latin-ext']});

/** No claro a tinta é escura; no alfa e no escuro é branca (o escuro é o alfa sobre #15171A). */
export const tinta = (tema: Tema) => (tema === 'claro' ? COR.texto : '#FFFFFF');
export const tintaMeta = (tema: Tema) => (tema === 'claro' ? COR.meta : 'rgba(255,255,255,0.72)');
export const sombra = (tema: Tema) =>
	tema === 'claro' ? 'none' : '0 5px 18px rgba(0,0,0,.55), 0 1px 3px rgba(0,0,0,.35)';

export const SAIDA = 21; // quadros (nunca menos de ~12)
export const FOLGA_FIM = 4; // a saída fecha 4 quadros antes do fim

export const sobe = (frame: number, inicio: number, dur: number) => EXPO_OUT(limita((frame - inicio) / dur));

/** Opacidade de saída: fecha FOLGA_FIM quadros antes do último. */
export const useSaida = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const fim = durationInFrames - FOLGA_FIM;
	return 1 - INOUT(limita((frame - (fim - SAIDA)) / SAIDA));
};

/** Placa fora do grupo que esmaece; conteúdo dentro, com deriva e saída. */
export const Cena: React.FC<{tema: Tema; children: React.ReactNode; derivaPx?: number}> = ({tema, children, derivaPx = -12}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const op = useSaida();
	const fundo = placa(tema);
	return (
		<AbsoluteFill style={{backgroundColor: fundo ?? 'transparent'}}>
			<AbsoluteFill
				style={{
					// 6 quadros de entrada: nenhuma peça nasce acesa no quadro 0
					opacity: op * limita(frame / 6),
					fontFamily: ARCHIVO,
					transform: `translateY(${deriva(frame, durationInFrames, derivaPx).toFixed(2)}px)`,
				}}
			>
				{children}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

/**
 * HODÔMETRO — reconstruído pelo CLAUDE.md (§3.3: "cada casa mede px × 0,6").
 * O `Odometro` original mora em src/pix na máquina dele; quando vier, este sai.
 * Só para QUANTIDADE. Separadores (ponto, vírgula) ficam parados.
 * A casa da direita é a que mais gira, como num contador de verdade.
 */
export const Odometro: React.FC<{
	valor: string;
	px: number;
	cor: string;
	inicio: number; // quadro
	dur?: number; // quadros
	sombraTexto?: string;
}> = ({valor, px, cor, inicio, dur = f(1.1), sombraTexto = 'none'}) => {
	const frame = useCurrentFrame();
	const chars = valor.split('');
	const digitos = chars.filter((c) => /\d/.test(c)).length;
	let k = digitos; // posição a partir da esquerda, contando só dígitos
	const h = px * 1.0;
	return (
		<span style={{display: 'inline-flex', alignItems: 'flex-start', height: h, lineHeight: 1, textShadow: sombraTexto}}>
			{chars.map((c, i) => {
				if (!/\d/.test(c)) {
					return (
						<span key={i} style={{fontSize: px, height: h, color: cor, lineHeight: 1, fontWeight: 800}}>
							{c}
						</span>
					);
				}
				k -= 1; // k = posição a partir da direita
				const d = Number(c);
				// casa da direita gira mais; as da esquerda, uma volta
				const giro = k === 0 ? digitos + 1 : 1;
				const percurso = d + 10 * giro;
				const atraso = (digitos - 1 - k) * 3;
				const p = EXPO_OUT(limita((frame - inicio - atraso) / dur));
				const y = -p * percurso * h;
				return (
					<span key={i} style={{display: 'inline-block', width: px * 0.6, height: h, overflow: 'hidden', position: 'relative'}}>
						<span style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${y.toFixed(2)}px)`}}>
							{Array.from({length: percurso + 1}, (_, j) => (
								<span
									key={j}
									style={{
										display: 'block',
										height: h,
										width: px * 0.6,
										textAlign: 'center',
										fontSize: px,
										lineHeight: `${h}px`,
										fontWeight: 800,
										color: cor,
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									{j % 10}
								</span>
							))}
						</span>
					</span>
				);
			})}
		</span>
	);
};

export const opEntrada = (frame: number, inicio: number, dur = f(0.35)) =>
	interpolate(frame, [inicio, inicio + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
