// FLV-A-Boatos · gancho · 00:00,080 → 00:07,820
// "Você já deve ter visto alguém dizendo que o Flávio iria cortar isso, aquilo
// e aquilo outro. Disseram até que o Gatorade ia virar mais Gatorade."
// Posts de boato caindo um sobre o outro. NENHUM texto legível: nome, @, foto e
// frase são barras cinza — o vídeo não mostra o boato de ninguém (exposição de
// pessoa comum, alerta 8.4 do dossiê) e não afirma o que cada um disse.
// Sem marca de bebida (marca registrada).
// Cada post cai no onset de um cue:
//   "que o Flávio" 01,560 · "cortar" 02,200 · "isso," 02,660 · "aquilo e" 02,900
//   "outro." 03,640 · "Disseram" 04,260 · "Gatorade" 05,840
// Em "Mas não," (07,820) a pilha inteira já saiu: a peça fecha ali.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COR, EXPO_OUT, f, limita, type Tema} from '../shared/design';
import {Cena} from './comum';

export const BOATOS = {inicio: 0.08, fim: 7.82};

const ONSETS = [1.56, 2.2, 2.66, 2.9, 3.64, 4.26, 5.84].map((t) => t - BOATOS.inicio);
const POSES = [
	{x: 120, y: 520, rot: -6},
	{x: 300, y: 760, rot: 5},
	{x: 90, y: 980, rot: -3},
	{x: 330, y: 1180, rot: 7},
	{x: 150, y: 1360, rot: -8},
	{x: 260, y: 620, rot: 3},
	{x: 200, y: 1060, rot: -2},
];

export const Boatos: React.FC<{tema: Tema}> = ({tema}) => (
	<Cena tema={tema} derivaPx={-20}>
		{ONSETS.map((t, i) => (
			<Post key={i} tema={tema} t={t} pose={POSES[i]} i={i} />
		))}
	</Cena>
);

const Post: React.FC<{tema: Tema; t: number; pose: {x: number; y: number; rot: number}; i: number}> = ({tema, t, pose, i}) => {
	const frame = useCurrentFrame();
	const ini = f(t);
	const p = EXPO_OUT(limita((frame - ini) / f(0.45)));
	if (frame < ini) return null;
	// cai de cima, girando um pouco mais, e assenta
	const y = pose.y - (1 - p) * 260;
	const rot = pose.rot + (1 - p) * (i % 2 ? 9 : -9);
	const s = 1.12 - 0.12 * p;
	const papel = '#FFFFFF';
	const barra = '#D5D9DE';
	const barraForte = '#AEB4BB';
	return (
		<div
			style={{
				position: 'absolute',
				left: pose.x,
				top: y,
				width: 640,
				transform: `rotate(${rot.toFixed(2)}deg) scale(${s.toFixed(4)})`,
				opacity: p,
				backgroundColor: papel,
				borderRadius: 26,
				padding: '30px 34px 34px',
				boxShadow: tema === 'claro' ? '0 18px 50px rgba(0,0,0,.18), 0 2px 6px rgba(0,0,0,.12)' : '0 22px 60px rgba(0,0,0,.55)',
			}}
		>
			{/* cabeçalho: avatar e nome viram formas, nada legível */}
			<div style={{display: 'flex', alignItems: 'center', gap: 18}}>
				<div style={{width: 72, height: 72, borderRadius: 36, backgroundColor: barra}} />
				<div>
					<div style={{width: 200 + (i % 3) * 40, height: 20, borderRadius: 10, backgroundColor: barraForte}} />
					<div style={{width: 130, height: 16, borderRadius: 8, backgroundColor: barra, marginTop: 10}} />
				</div>
			</div>
			{/* texto do boato: barras */}
			{[0.96, 0.88, 0.62 + (i % 2) * 0.2].map((w, j) => (
				<div key={j} style={{width: `${w * 100}%`, height: 22, borderRadius: 11, backgroundColor: barra, marginTop: j === 0 ? 26 : 14}} />
			))}
			{/* selo de "boato": um ponto de interrogação em chapa amarela */}
			<div
				style={{
					position: 'absolute',
					right: 26,
					top: 26,
					width: 64,
					height: 64,
					borderRadius: 14,
					backgroundColor: COR.marca,
					color: COR.texto,
					fontSize: 46,
					fontWeight: 800,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				?
			</div>
		</div>
	);
};
