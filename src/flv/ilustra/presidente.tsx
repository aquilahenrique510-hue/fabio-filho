// V3 · FLV-T-Tesoura · canto superior direito, saindo da borda ao lado da cabeça do Nikolas · 00:01,900 → 00:05,700
// Pedido (15/10/2026): o vídeo de referência dele (homem de terno, faixa presidencial
// e tesoura gigante) RECONSTRUÍDO EM ILUSTRAÇÃO, no traço das outras peças, para ir
// no centro, saindo de trás de uma tribuna (pedido seguinte), durante "cortar isso, aquilo e aquilo outro".
//   espia da borda direita ........... 00:01,900
//   a tesoura fecha .................. 00:02,660 ("isso,") · 03,100 ("aquilo e") · 03,640 ("outro.")
//   sai antes do Gatorade ............ 00:05,700 (a cena do corte da FLV-A3 sai em 5,6)
// SEM SOM de propósito: a FLV-A3-Abertura já toca o obturador nesses três cortes —
// repetir aqui empilharia o mesmo som (CLAUDE.md §4.1.1).
// Figura genérica (sem rosto de ninguém): terno, faixa, tesoura — é o boato, não o retrato.
import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {INOUT, type Tema} from '../../shared/design';
import {Cena} from '../comum';
import {CABELO, PELE, entra, rel} from './base';

export const TESOURA = {inicio: 1.9, fim: 5.7};
const CORTES = [2.66, 3.1, 3.64].map((t) => t - TESOURA.inicio);

const TERNO = '#1E2A44';
const TERNO_LUZ = '#2B3A5E';
const ACO = '#C9CDD2';
const ACO_ESC = '#8A9099';
const VERDE = '#1F8A4C';
const AMARELO = '#F2C230';

const Lamina: React.FC<{ang: number; frente?: boolean}> = ({ang, frente}) => (
	<g transform={`rotate(${ang})`}>
		<path d="M-30 0 L-4 -500 L6 -500 L30 0 Z" fill={frente ? ACO : '#E4E7EA'} stroke={ACO_ESC} strokeWidth={4} />
		<path d="M4 -30 L4 -470" stroke="#FFFFFF" strokeWidth={4} opacity={0.6} />
		<path d="M-12 0 L-12 70 M12 0 L12 70" stroke={ACO_ESC} strokeWidth={10} />
		<circle cx={0} cy={110} r={44} fill="none" stroke={ACO} strokeWidth={20} />
		<circle cx={0} cy={110} r={44} fill="none" stroke={ACO_ESC} strokeWidth={3} />
	</g>
);

// mão na argola da lâmina: posição da argola girada
const argola = (ang: number) => {
	const a = (ang * Math.PI) / 180;
	return [-110 * Math.sin(a), 110 * Math.cos(a)];
};

const Presidente: React.FC<{abre: number; respira: number}> = ({abre, respira}) => {
	const a = 9 + 19 * abre;
	const piv = 230;
	const [lx, ly] = argola(a); // lâmina que aponta p/ cima-esquerda tem a argola embaixo-direita
	const [rx, ry] = argola(-a);
	return (
		<g transform={`scale(${1 + respira * 0.012})`}>
			{/* tronco largo, ombros de quem malha */}
			<path d="M-260 140 Q-262 20 -150 -4 L-44 -24 L44 -24 L150 -4 Q262 20 260 140 L280 560 L-280 560 Z" fill={TERNO} />
			<ellipse cx={-210} cy={170} rx={72} ry={120} fill={TERNO_LUZ} />
			<ellipse cx={210} cy={170} rx={72} ry={120} fill={TERNO_LUZ} />
			{/* camisa e gravata */}
			<path d="M-58 -24 L0 100 L58 -24 Z" fill="#FFFFFF" />
			<path d="M-14 -14 L14 -14 L18 8 L9 118 L0 132 L-9 118 L-18 8 Z" fill={AMARELO} />
			<path d="M-58 -24 L0 100 L-30 160 L-110 0 Z" fill={TERNO_LUZ} />
			<path d="M58 -24 L0 100 L30 160 L110 0 Z" fill={TERNO_LUZ} />
			{/* faixa presidencial: verde nas bordas, amarelo no meio, ombro esq. → quadril dir. */}
			<path d="M-175 -6 L-95 -20 L250 520 L165 540 Z" fill={VERDE} />
			<path d="M-150 -10 L-118 -16 L222 526 L192 532 Z" fill={AMARELO} />
			<g transform="translate(30 210) rotate(32)">
				<circle r={28} fill="#1F4B99" stroke={AMARELO} strokeWidth={8} />
				<circle r={10} fill="#FFFFFF" opacity={0.85} />
			</g>
			{/* pescoço e cabeça */}
			<rect x={-34} y={-80} width={68} height={70} rx={14} fill="#E3B48A" />
			<ellipse cx={-74} cy={-160} rx={14} ry={24} fill={PELE} />
			<ellipse cx={74} cy={-160} rx={14} ry={24} fill={PELE} />
			<path d="M-72 -190 Q-72 -270 0 -272 Q72 -270 72 -190 L68 -120 Q60 -70 0 -62 Q-60 -70 -68 -120 Z" fill={PELE} />
			<path d="M-78 -178 Q-84 -282 0 -288 Q60 -290 82 -226 Q84 -200 76 -176 Q70 -236 20 -240 Q-30 -246 -64 -214 Q-74 -200 -78 -178 Z" fill={CABELO} />
			{/* sobrancelhas fechadas, boca apertada, queixo marcado */}
			<path d="M-50 -182 L-16 -174" stroke={CABELO} strokeWidth={10} strokeLinecap="round" />
			<path d="M50 -182 L16 -174" stroke={CABELO} strokeWidth={10} strokeLinecap="round" />
			<circle cx={-30} cy={-158} r={6} fill="#1A1A1A" />
			<circle cx={30} cy={-158} r={6} fill="#1A1A1A" />
			<path d="M-4 -150 L-8 -120 L4 -118" stroke="#C99572" strokeWidth={5} fill="none" strokeLinecap="round" />
			<path d="M-24 -98 Q0 -94 24 -98" stroke="#7A2E2E" strokeWidth={7} fill="none" strokeLinecap="round" />
			<path d="M0 -78 L0 -68" stroke="#C99572" strokeWidth={4} strokeLinecap="round" />
			{/* tesoura gigante: as lâminas cruzam na frente do peito */}
			<g transform={`translate(0 ${piv})`}>
				<Lamina ang={a} />
				<Lamina ang={-a} frente />
				<circle r={14} fill={ACO_ESC} />
				<circle r={6} fill="#FFFFFF" />
			</g>
			{/* braços até as argolas: contorno escuro + tom mais claro, senão somem no terno */}
			<path d={`M-250 180 Q-280 330 -190 400 L${lx - 30} ${piv + ly + 10}`} stroke="#121A2E" strokeWidth={108} fill="none" strokeLinecap="round" />
			<path d={`M-250 180 Q-280 330 -190 400 L${lx - 30} ${piv + ly + 10}`} stroke={TERNO_LUZ} strokeWidth={90} fill="none" strokeLinecap="round" />
			<path d={`M250 180 Q280 330 190 400 L${rx + 30} ${piv + ry + 10}`} stroke="#121A2E" strokeWidth={108} fill="none" strokeLinecap="round" />
			<path d={`M250 180 Q280 330 190 400 L${rx + 30} ${piv + ry + 10}`} stroke={TERNO_LUZ} strokeWidth={90} fill="none" strokeLinecap="round" />
			<circle cx={lx - 30} cy={piv + ly + 10} r={44} fill="#FFFFFF" />
			<circle cx={rx + 30} cy={piv + ry + 10} r={44} fill="#FFFFFF" />
			<ellipse cx={lx} cy={piv + ly} rx={46} ry={40} fill={PELE} />
			<ellipse cx={rx} cy={piv + ry} rx={46} ry={40} fill={PELE} />
		</g>
	);
};

const Tribuna: React.FC<{topo: number; t: number}> = ({topo, t}) => (
	<g>
		{/* microfones: hastes saindo do tampo, inclinadas para ele */}
		{[-1, 1].map((l) => (
			<g key={l} transform={`translate(${540 + l * 70} ${topo + 6}) rotate(${l * -18})`}>
				<path d="M0 0 L0 -95" stroke="#2A2E33" strokeWidth={8} strokeLinecap="round" />
				<rect x={-11} y={-128} width={22} height={40} rx={11} fill="#3A3F45" />
			</g>
		))}
		{/* tampo e corpo da tribuna */}
		<rect x={250} y={topo - 6} width={580} height={36} rx={10} fill="#6B4A32" />
		<path d={`M276 ${topo + 28} L804 ${topo + 28} L770 ${topo + 470} L310 ${topo + 470} Z`} fill="#8A5F3F" />
		<path d={`M300 ${topo + 28} L330 ${topo + 28} L350 ${topo + 470} L322 ${topo + 470} Z`} fill="#FFFFFF" opacity={0.08} />
		<rect x={290} y={topo + 470} width={500} height={22} rx={6} fill="#6B4A32" />
		{/* selo "?" na frente: é o boato, não um discurso de verdade */}
		<g transform={`translate(540 ${topo + 210}) rotate(${2 * Math.sin(t * 2)})`}>
			<circle r={96} fill={AMARELO} stroke="#C99A1E" strokeWidth={8} />
			<text x={0} y={42} textAnchor="middle" fontSize={130} fontWeight={800} fill="#15171A" fontFamily="inherit">?</text>
		</g>
	</g>
);

export const Tesoura: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const t = frame / 60;
	const e = entra(frame, 0, 0.7);
	// fecha em cada corte: abre → fecha em ~0,15 s e reabre
	const fecha = Math.max(...CORTES.map((c) => {
		const d = t - c;
		return d > -0.12 && d < 0.2 ? 1 - Math.min(1, Math.abs(d - 0.02) / 0.14) : 0;
	}));
	// tranco do corpo em cada corte
	const tranco = fecha * 10;
	const respira = Math.sin(t * 3.2);
	// sai deslizando de volta para a borda nos últimos 0,45 s (a Cena ainda esmaece por cima)
	const {durationInFrames} = useVideoConfig();
	const sai = INOUT(rel(frame, (durationInFrames - 4) / 60 - 0.45, 0.45));
	const fora = (1 - e) + sai; // 0 = no lugar, 1 = escondido atrás da borda direita
	// a tribuna sobe primeiro; ele sobe de trás dela logo depois
	const eTrib = entra(frame, 0, 0.55);
	const eBon = entra(frame, 0.18, 0.75);
	const TOPO = 1250; // borda de cima da tribuna: o corpo dele acaba atrás dela
	return (
		<Cena tema={tema} derivaPx={-10}>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<defs>
					<clipPath id="tes-atras">
						<rect x={0} y={0} width={1080} height={TOPO + 20} />
					</clipPath>
				</defs>
				<g transform={`translate(0 ${(1 - eTrib) * 500})`}>
					{/* boneco: no centro, sai de trás da tribuna */}
					<g clipPath="url(#tes-atras)">
						<g transform={`translate(540 ${960 + (1 - eBon) * 520 + tranco}) rotate(${1.5 * Math.sin(t * 1.3)}) scale(0.72)`}>
							<Presidente abre={1 - fecha} respira={respira} />
						</g>
					</g>
					<Tribuna topo={TOPO} t={t} />
				</g>
			</svg>
		</Cena>
	);
};
