// BASE DAS ILUSTRAÇÕES DA V2 — tudo que as ~20 peças de proposta compartilham,
// num lugar só (a lição do CLAUDE.md §6.1: regra que mora em código
// compartilhado não decai; redigitada de memória, decai).
//   · Peca: Cena (placa fora do grupo) + Sons + SVG na escala única + rótulo + fonte
//   · rótulo literal da fala, escalonado DEPOIS do desenho; fonte por último
//   · escala única ESCALA_ILUSTRA ("cuidado com o tamanho dos elementos")
//   · tinta pelo tema; cores de identidade com par claro (design.ts)
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COR, EXPO_OUT, INOUT, f, limita, type Tema} from '../../shared/design';
import {Cena, sobe, sombra, tinta, tintaMeta} from '../comum';
import {Sons, type Cue} from '../som';

export const ESCALA_ILUSTRA = 0.8;
const CX = 540;
const CY = 1250;

export const PELE = '#F2C8A0';
export const CABELO = '#3B2A22';

/** progresso 0→1 de um gesto que começa em `t` (s, relativo à peça) e dura `dur` s */
export const rel = (frame: number, t: number, dur: number) => limita((frame / 60 - t) / dur);
export const entra = (frame: number, t: number, dur = 0.5) => EXPO_OUT(rel(frame, t, dur));
export const vira = (frame: number, t: number, dur = 0.6) => INOUT(rel(frame, t, dur));

export type Desenho = (p: {frame: number; tema: Tema; cor: string}) => React.ReactNode;

export const Peca: React.FC<{
	tema: Tema;
	inicio: number; // s no SRT (para converter os tempos)
	rotulo?: React.ReactNode;
	tRotulo?: number; // s no SRT
	fonte?: string;
	cues?: Cue[]; // t em s NO SRT
	desenho: Desenho;
	topoRotulo?: number;
}> = ({tema, inicio, rotulo, tRotulo, fonte, cues = [], desenho, topoRotulo = 560}) => {
	const frame = useCurrentFrame();
	const cor = tinta(tema);
	const tr = (tRotulo ?? inicio + 0.15) - inicio;
	const eR = sobe(frame, f(tr), f(0.45));
	const eF = sobe(frame, f(tr + 0.35), f(0.5));
	return (
		<Cena tema={tema}>
			<Sons cues={cues.map((c) => ({...c, t: c.t - inicio}))} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
				<g transform={`translate(${CX} ${CY}) scale(${ESCALA_ILUSTRA}) translate(${-CX} ${-CY})`}>
					{desenho({frame, tema, cor})}
				</g>
			</svg>
			{rotulo && (
				<div
					style={{
						position: 'absolute', left: 96, right: 96, top: topoRotulo, textAlign: 'center',
						fontSize: 52, fontWeight: 800, lineHeight: 1.12, color: cor, textShadow: sombra(tema),
						opacity: eR, transform: `translateY(${((1 - eR) * 26).toFixed(1)}px)`,
					}}
				>
					{rotulo}
				</div>
			)}
			{fonte && (
				<div
					style={{
						position: 'absolute', left: 0, right: 0, top: 1660, textAlign: 'center', fontSize: 30, fontWeight: 500,
						letterSpacing: '0.08em', textTransform: 'uppercase', color: tintaMeta(tema), opacity: eF,
					}}
				>
					{fonte}
				</div>
			)}
		</Cena>
	);
};

/** destaque amarelo dentro do rótulo */
export const Am: React.FC<{children: React.ReactNode}> = ({children}) => <span style={{color: COR.marca}}>{children}</span>;

// ── personagens e objetos reutilizáveis (vetor chapado) ─────────────────────

/** Pessoa: cabeça + corpo. `humor` 0 = neutro/sério, 1 = sorrindo. */
export const Pessoa: React.FC<{
	x: number; y: number; s?: number; roupa: string; cabelo?: 'curto' | 'longo' | 'grisalho'; humor?: number; op?: number;
}> = ({x, y, s = 1, roupa, cabelo = 'curto', humor = 1, op = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
		{cabelo === 'longo' && <path d="M-74 -10 Q-86 -116 0 -124 Q86 -116 74 -10 L80 86 L-80 86 Z" fill={CABELO} />}
		<circle cx={0} cy={0} r={66} fill={PELE} />
		{cabelo !== 'longo' && <path d="M-66 -8 Q-62 -78 0 -80 Q62 -78 66 -8 Q40 -44 0 -44 Q-40 -44 -66 -8 Z" fill={cabelo === 'grisalho' ? '#C9CDD2' : CABELO} />}
		<circle cx={-22} cy={2} r={7} fill="#1A1A1A" />
		<circle cx={22} cy={2} r={7} fill="#1A1A1A" />
		<path d={`M-20 28 Q0 ${28 + 16 * humor} 20 28`} stroke="#7A2E2E" strokeWidth={6} fill="none" strokeLinecap="round" />
		<rect x={-78} y={76} width={156} height={230} rx={60} fill={roupa} />
	</g>
);

/** Casa simples */
export const Casa: React.FC<{x: number; y: number; s?: number; cor: string; telhado: string; op?: number}> = ({x, y, s = 1, cor, telhado, op = 1}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
		<path d="M-120 0 L0 -100 L120 0 Z" fill={telhado} />
		<rect x={-96} y={0} width={192} height={150} fill={cor} />
		<rect x={-24} y={60} width={48} height={90} rx={6} fill={telhado} />
		<rect x={-76} y={30} width={36} height={36} rx={4} fill="#FFFFFF" opacity={0.85} />
		<rect x={40} y={30} width={36} height={36} rx={4} fill="#FFFFFF" opacity={0.85} />
	</g>
);

/** Moeda */
export const Moeda: React.FC<{x: number; y: number; r?: number; op?: number}> = ({x, y, r = 30, op = 1}) => (
	<g opacity={op}>
		<circle cx={x} cy={y} r={r} fill={COR.marca} />
		<text x={x} y={y + r * 0.36} textAnchor="middle" fontSize={r} fontWeight={800} fill="#7A5A00">$</text>
	</g>
);

/** Celular */
export const Celular: React.FC<{x: number; y: number; s?: number; tela?: string; cor: string}> = ({x, y, s = 1, tela = '#FFFFFF', cor}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`}>
		<rect x={-60} y={-110} width={120} height={220} rx={20} fill="#15171A" stroke={cor} strokeWidth={5} />
		<rect x={-48} y={-90} width={96} height={170} rx={8} fill={tela} />
	</g>
);

/** Documento com linhas */
export const Papel: React.FC<{x: number; y: number; s?: number; rot?: number; op?: number; marca?: boolean}> = ({x, y, s = 1, rot = 0, op = 1, marca}) => (
	<g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`} opacity={op}>
		<rect x={-80} y={-105} width={160} height={210} rx={10} fill="#FFFFFF" stroke="#C9CDD2" strokeWidth={3} />
		{[-60, -30, 0, 30].map((yy, i) => (
			<rect key={i} x={-56} y={yy} width={i === 3 ? 70 : 112} height={12} rx={6} fill={i === 0 && marca ? COR.marca : '#C9CDD2'} />
		))}
	</g>
);

/** Seta (de a para b) */
export const Seta: React.FC<{x1: number; y1: number; x2: number; y2: number; cor: string; p?: number; w?: number}> = ({x1, y1, x2, y2, cor, p = 1, w = 10}) => {
	const x = x1 + (x2 - x1) * p;
	const y = y1 + (y2 - y1) * p;
	const a = Math.atan2(y2 - y1, x2 - x1);
	const c = 26;
	return (
		<g opacity={p > 0 ? 1 : 0}>
			<line x1={x1} y1={y1} x2={x} y2={y} stroke={cor} strokeWidth={w} strokeLinecap="round" />
			<path
				d={`M${x} ${y} L${x - c * Math.cos(a - 0.5)} ${y - c * Math.sin(a - 0.5)} L${x - c * Math.cos(a + 0.5)} ${y - c * Math.sin(a + 0.5)} Z`}
				fill={cor}
			/>
		</g>
	);
};

/** X de "proibido/riscado", desenhado em dois traços */
export const Risco: React.FC<{x: number; y: number; r: number; p: number; cor: string}> = ({x, y, r, p, cor}) => {
	const a = Math.min(1, p * 2);
	const b = Math.max(0, p * 2 - 1);
	return (
		<g strokeLinecap="round" stroke={cor} strokeWidth={16}>
			<line x1={x - r} y1={y - r} x2={x - r + 2 * r * a} y2={y - r + 2 * r * a} opacity={a > 0 ? 1 : 0} />
			<line x1={x + r} y1={y - r} x2={x + r - 2 * r * b} y2={y - r + 2 * r * b} opacity={b > 0 ? 1 : 0} />
		</g>
	);
};
