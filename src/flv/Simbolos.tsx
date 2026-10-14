// FLV-F-Marcadores · campo de símbolos · 00:10,940 → 00:26,060
// "Eu li as 76 páginas do plano de governo do Flávio..."
// SÍMBOLO: o MARCADOR DE PÁGINA (a fita com o V embaixo) — substantivo da frase
// ("páginas") fazendo o gesto dela (ler e marcar): cada fita DESCE e assenta,
// como quem marca a página que leu. Não usado antes na série (§3.7).
// TOM: marcar página é ler, não afirma nada que a fala não diga.
// Duas camadas com paralaxe de verdade (A perto: maior, mais rápida, nítida;
// B longe: menor, mais lenta, desfocada), tamanhos muito diferentes, sangrando
// pela borda, nunca contável, vazio central TORTO (não é anel) onde entra o
// documento.
// Formas opacas dentro de um grupo que carrega a opacidade — sem marcas de
// sobreposição (§1.9).
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {EXPO_OUT, deriva, f, limita, placa, type Tema} from '../shared/design';
import {tinta, useSaida} from './comum';

export const MARCADORES = {inicio: 10.94, fim: 26.06};

// gerador determinístico (Math.random muda a cada quadro do render)
const semente = (s: number) => () => {
	s |= 0;
	s = (s + 0x6d2b79f5) | 0;
	let t = Math.imul(s ^ (s >>> 15), 1 | s);
	t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
	return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// vazio central torto, em volta de onde o documento entra
const VX = 560;
const VY = 900;
const dentroDoVazio = (x: number, y: number) => {
	const a = Math.atan2(y - VY, x - VX);
	const r = 1 + 0.16 * Math.sin(3 * a + 0.8) + 0.09 * Math.sin(5 * a + 2.1);
	const dx = (x - VX) / (430 * r);
	const dy = (y - VY) / (640 * r);
	return dx * dx + dy * dy < 1;
};

type Fita = {x: number; y: number; w: number; rot: number; atraso: number};

const gera = (n: number, seed: number, wMin: number, wMax: number): Fita[] => {
	const r = semente(seed);
	const out: Fita[] = [];
	let tent = 0;
	while (out.length < n && tent < 4000) {
		tent++;
		const x = -80 + r() * 1240;
		const y = -120 + r() * 2160;
		if (dentroDoVazio(x, y)) continue;
		const w = wMin + Math.pow(r(), 1.8) * (wMax - wMin);
		out.push({x, y, w, rot: -14 + r() * 28, atraso: r() * 1.6});
	}
	return out;
};

const CAMADA_A = gera(26, 7, 34, 120);
const CAMADA_B = gera(34, 19, 16, 54);

const FitaSvg: React.FC<{w: number; cor: string}> = ({w, cor}) => {
	const h = w * 2.6;
	const v = w * 0.42;
	return (
		<svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display: 'block', overflow: 'visible'}}>
			<path d={`M0 0 H${w} V${h} L${w / 2} ${h - v} L0 ${h} Z`} fill={cor} />
		</svg>
	);
};

const Camada: React.FC<{fitas: Fita[]; cor: string; vel: number; desfoque: number; queda: number}> = ({
	fitas,
	cor,
	vel,
	desfoque,
	queda,
}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	// paralaxe: a camada inteira sobe devagar, a de perto mais rápido
	const subida = (frame / durationInFrames) * vel;
	return (
		<AbsoluteFill style={{filter: desfoque ? `blur(${desfoque}px)` : undefined, transform: `translateY(${(-subida).toFixed(2)}px)`}}>
			{fitas.map((ft, i) => {
				const p = EXPO_OUT(limita((frame - f(ft.atraso)) / f(0.9)));
				// o gesto: a fita DESCE e assenta, como quem marca a página
				const y = ft.y - (1 - p) * queda;
				const balanco = Math.sin((frame + i * 37) / 70) * 2.5;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: ft.x,
							top: y,
							transform: `rotate(${(ft.rot + balanco).toFixed(2)}deg)`,
							transformOrigin: '50% 0',
							opacity: p,
						}}
					>
						<FitaSvg w={ft.w} cor={cor} />
					</div>
				);
			})}
		</AbsoluteFill>
	);
};

export const Simbolos: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const saida = useSaida();
	const cor = tinta(tema);
	const fundo = placa(tema);
	return (
		<AbsoluteFill style={{backgroundColor: fundo ?? 'transparent'}}>
			<AbsoluteFill style={{transform: `translateX(${deriva(frame, durationInFrames, 10).toFixed(2)}px)`}}>
				{/* longe */}
				<AbsoluteFill style={{opacity: 0.16 * saida}}>
					<Camada fitas={CAMADA_B} cor={cor} vel={60} desfoque={5} queda={90} />
				</AbsoluteFill>
				{/* perto */}
				<AbsoluteFill style={{opacity: 0.3 * saida}}>
					<Camada fitas={CAMADA_A} cor={cor} vel={170} desfoque={0} queda={180} />
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
