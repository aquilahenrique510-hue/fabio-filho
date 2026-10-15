// NK na Bahia — o que as peças compartilham: tempo em segundos do SRT, título de
// eixo, linha de fonte, número com hodômetro, barra e os ícones do vídeo.
// Regras da série: nada nasce aceso (Cena), saída de 21 quadros 4 antes do fim,
// quantidade rola no hodômetro, fonte fica >= 1,5 s na tela.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ALERTA, COR, EXPO_OUT, INOUT, f, limita, par, type Tema} from '../shared/design';
import {Odometro, sobe, sombra, tinta, tintaMeta} from '../flv/comum';

export {ALERTA, COR, EXPO_OUT, INOUT, f, limita, par};
export type {Tema};

/** progresso 0→1 de um gesto que começa em t (s, relativo à peça) e dura d */
export const rel = (frame: number, t: number, d: number) => limita((frame / 60 - t) / d);
export const entra = (frame: number, t: number, d = 0.5) => EXPO_OUT(rel(frame, t, d));
export const vira = (frame: number, t: number, d = 0.6) => INOUT(rel(frame, t, d));

/** "chip" do eixo (SEGURANÇA, EMPREGO...) — sobe e assenta */
export const Eixo: React.FC<{tema: Tema; t: number; top?: number; cor?: string; children: React.ReactNode}> = ({
	tema, t, top = 560, cor = COR.marca, children,
}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, f(t), f(0.45));
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', opacity: e, transform: `translateY(${((1 - e) * 24).toFixed(1)}px)`}}>
			<div style={{padding: '10px 26px', borderRadius: 14, background: cor, color: '#15171A', fontSize: 40, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: tema === 'claro' ? 'none' : '0 6px 22px rgba(0,0,0,.35)'}}>
				{children}
			</div>
		</div>
	);
};

/** texto de apoio (literal da fala) */
export const Texto: React.FC<{tema: Tema; t: number; top: number; size?: number; peso?: number; cor?: string; children: React.ReactNode}> = ({
	tema, t, top, size = 50, peso = 800, cor, children,
}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, f(t), f(0.45));
	return (
		<div style={{position: 'absolute', left: 90, right: 90, top, textAlign: 'center', fontSize: size, fontWeight: peso, lineHeight: 1.12, color: cor ?? tinta(tema), textShadow: sombra(tema), opacity: e, transform: `translateY(${((1 - e) * 26).toFixed(1)}px)`}}>
			{children}
		</div>
	);
};

/** linha de fonte — entra depois do conteúdo e fica tempo de ser lida */
export const Fonte: React.FC<{tema: Tema; t: number; top?: number; children: React.ReactNode}> = ({tema, t, top = 1660, children}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, f(t), f(0.5));
	return (
		<div style={{position: 'absolute', left: 60, right: 60, top, textAlign: 'center', fontSize: 28, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase', color: tintaMeta(tema), textShadow: sombra(tema), opacity: e}}>
			{children}
		</div>
	);
};

/** número grande no hodômetro + unidade */
export const Numero: React.FC<{tema: Tema; t: number; top: number; valor: string; px?: number; antes?: string; depois?: string; cor?: string; dur?: number}> = ({
	tema, t, top, valor, px = 170, antes, depois, cor, dur = 1.1,
}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, f(t) - f(0.2), f(0.4));
	const c = cor ?? tinta(tema);
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top, display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 14, color: c, textShadow: sombra(tema), opacity: e, transform: `scale(${(0.92 + 0.08 * e).toFixed(3)})`}}>
			{antes && <span style={{fontSize: px * 0.55, fontWeight: 800}}>{antes}</span>}
			<Odometro valor={valor} px={px} cor={c} inicio={f(t)} dur={f(dur)} sombraTexto={sombra(tema)} />
			{depois && <span style={{fontSize: px * 0.5, fontWeight: 800}}>{depois}</span>}
		</div>
	);
};

/** barra horizontal com rótulo e valor rolando */
export const Barra: React.FC<{tema: Tema; t: number; top: number; pct: number; max: number; nome: string; valor: string; cor: string; sub?: string}> = ({
	tema, t, top, pct, max, nome, valor, cor, sub,
}) => {
	const frame = useCurrentFrame();
	const p = EXPO_OUT(limita((frame - f(t)) / f(0.9)));
	const e = sobe(frame, f(t) - f(0.25), f(0.4));
	const L = 620;
	return (
		<div style={{position: 'absolute', left: 130, top, width: 820, opacity: e, transform: `translateX(${((1 - e) * -30).toFixed(1)}px)`}}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: tinta(tema), textShadow: sombra(tema)}}>
				<span style={{fontSize: 44, fontWeight: 800}}>{nome}</span>
				<span style={{display: 'flex', alignItems: 'baseline'}}>
					<Odometro valor={valor} px={64} cor={tinta(tema)} inicio={f(t)} dur={f(0.9)} sombraTexto={sombra(tema)} />
					<span style={{fontSize: 40, fontWeight: 800, marginLeft: 4}}>%</span>
				</span>
			</div>
			<div style={{marginTop: 10, height: 46, width: L, borderRadius: 10, background: tema === 'claro' ? '#E4E7EA' : 'rgba(255,255,255,0.16)'}}>
				<div style={{height: 46, width: (L * pct * p) / max, borderRadius: 10, background: cor}} />
			</div>
			{sub && <div style={{marginTop: 8, fontSize: 30, fontWeight: 600, color: tintaMeta(tema), textShadow: sombra(tema)}}>{sub}</div>}
		</div>
	);
};

// ── ícones (SVG, centrados na origem, ~200 px) ─────────────────────────────────
export const Pino: React.FC<{cor: string}> = ({cor}) => (
	<g>
		<path d="M0 0 C-8 -26 -40 -44 -40 -78 A40 40 0 1 1 40 -78 C40 -44 8 -26 0 0 Z" fill={cor} stroke="#15171A" strokeWidth={4} />
		<circle cx={0} cy={-78} r={15} fill="#15171A" />
	</g>
);

export const Soja: React.FC = () => (
	<g>
		<path d="M0 110 Q-6 20 4 -100" stroke="#5E8C3A" strokeWidth={10} fill="none" strokeLinecap="round" />
		{[-60, -10, 40].map((y, i) => (
			<g key={i} transform={`translate(${i % 2 ? 14 : -14} ${y}) rotate(${i % 2 ? 30 : -30})`}>
				<path d="M0 0 C30 -10 70 -6 92 8 C70 30 30 30 0 0 Z" transform={i % 2 ? '' : 'scale(-1 1)'} fill="#C9B24A" stroke="#8A7A2A" strokeWidth={3} />
				{[22, 46, 70].map((x) => <circle key={x} cx={i % 2 ? x : -x} cy={8} r={9} fill="#E6D27A" />)}
			</g>
		))}
	</g>
);

export const Algodao: React.FC = () => (
	<g>
		<path d="M0 120 L0 30" stroke="#5E4A32" strokeWidth={12} strokeLinecap="round" />
		<path d="M-60 40 Q0 70 60 40 L40 20 L-40 20 Z" fill="#6B5A3A" />
		{[[-38, -10], [38, -10], [0, -40], [-20, 20], [22, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={44} fill="#FFFFFF" stroke="#D5D8DC" strokeWidth={3} />)}
	</g>
);

export const Predio: React.FC<{h?: number}> = ({h = 220}) => (
	<g>
		<rect x={-60} y={-h} width={120} height={h} rx={6} fill="#4A5158" stroke="#2B3036" strokeWidth={4} />
		{Array.from({length: Math.floor((h - 30) / 40)}).map((_, r) => [-34, 0, 34].map((x) => <rect key={`${r}${x}`} x={x - 11} y={-h + 20 + r * 40} width={22} height={24} rx={3} fill={COR.marca} opacity={0.85} />))}
	</g>
);

export const Loja: React.FC<{cor?: string}> = ({cor = COR.marca}) => (
	<g>
		<rect x={-60} y={-70} width={120} height={90} rx={6} fill="#FFFFFF" />
		<path d="M-70 -70 L70 -70 L60 -100 L-60 -100 Z" fill={cor} />
		{[-50, -25, 0, 25, 50].map((x, i) => <path key={i} d={`M${x - 12.5} -70 Q${x} -50 ${x + 12.5} -70`} fill={i % 2 ? '#FFFFFF' : cor} />)}
		<rect x={-18} y={-30} width={36} height={50} rx={4} fill="#4A5158" />
	</g>
);

export const Gente: React.FC<{cor: string}> = ({cor}) => (
	<g>
		<circle cx={0} cy={-46} r={22} fill={cor} />
		<path d="M-34 20 Q-34 -18 0 -18 Q34 -18 34 20 Z" fill={cor} />
	</g>
);

export const Trofeu: React.FC = () => (
	<g>
		<path d="M-90 -150 L90 -150 Q90 -30 0 0 Q-90 -30 -90 -150 Z" fill={COR.marca} stroke="#B8901A" strokeWidth={6} />
		<path d="M-90 -130 Q-150 -130 -140 -80 Q-130 -40 -70 -40" fill="none" stroke={COR.marca} strokeWidth={16} />
		<path d="M90 -130 Q150 -130 140 -80 Q130 -40 70 -40" fill="none" stroke={COR.marca} strokeWidth={16} />
		<rect x={-18} y={0} width={36} height={60} fill="#D9B235" />
		<rect x={-80} y={60} width={160} height={40} rx={8} fill="#B8901A" />
		<text x={0} y={-60} textAnchor="middle" fontSize={84} fontWeight={800} fill="#15171A" fontFamily="inherit">1º</text>
	</g>
);

export const Escudo: React.FC<{cor?: string}> = ({cor = '#4A90D9'}) => (
	<g>
		<path d="M0 -110 L90 -76 Q90 40 0 100 Q-90 40 -90 -76 Z" fill={cor} stroke="#15171A" strokeWidth={5} />
		<path d="M0 -84 L64 -60 Q64 26 0 70 Z" fill="#FFFFFF" opacity={0.25} />
	</g>
);

export const Maleta: React.FC = () => (
	<g>
		<rect x={-100} y={-60} width={200} height={140} rx={16} fill="#8A5530" stroke="#15171A" strokeWidth={5} />
		<path d="M-36 -60 L-36 -90 Q-36 -100 -26 -100 L26 -100 Q36 -100 36 -90 L36 -60" fill="none" stroke="#15171A" strokeWidth={10} />
		<rect x={-100} y={-6} width={200} height={14} fill="#6E4A2E" />
		<rect x={-14} y={-14} width={28} height={30} rx={4} fill={COR.marca} />
	</g>
);

export const Livro: React.FC = () => (
	<g>
		<path d="M0 -70 Q-60 -100 -120 -80 L-120 80 Q-60 60 0 90 Z" fill="#FFFFFF" stroke="#15171A" strokeWidth={5} />
		<path d="M0 -70 Q60 -100 120 -80 L120 80 Q60 60 0 90 Z" fill="#F1F2F4" stroke="#15171A" strokeWidth={5} />
		{[-40, -10, 20].map((y) => <path key={y} d={`M-96 ${y} Q-50 ${y - 14} -20 ${y}`} stroke="#C9CDD2" strokeWidth={6} fill="none" />)}
		{[-40, -10, 20].map((y) => <path key={y} d={`M20 ${y} Q50 ${y - 14} 96 ${y}`} stroke="#C9CDD2" strokeWidth={6} fill="none" />)}
	</g>
);

/** despertador; `toca` 0..1 faz tremer e soltar as ondinhas */
export const Despertador: React.FC<{toca?: number; cor?: string; t?: number}> = ({toca = 0, cor = COR.marca, t = 0}) => {
	const r = toca * 7 * Math.sin(t * 60);
	return (
		<g transform={`rotate(${r})`}>
			<circle cx={-58} cy={-74} r={30} fill={cor} stroke="#15171A" strokeWidth={5} />
			<circle cx={58} cy={-74} r={30} fill={cor} stroke="#15171A" strokeWidth={5} />
			<path d="M-56 76 L-76 104 M56 76 L76 104" stroke="#15171A" strokeWidth={10} strokeLinecap="round" />
			<circle r={96} fill="#FFFFFF" stroke="#15171A" strokeWidth={8} />
			<circle r={80} fill="none" stroke={cor} strokeWidth={6} />
			<path d="M0 0 L0 -54 M0 0 L38 18" stroke="#15171A" strokeWidth={9} strokeLinecap="round" />
			<circle r={9} fill="#15171A" />
			{toca > 0 && [-1, 1].map((l) => (
				<g key={l} opacity={toca}>
					<path d={`M${l * 120} -60 Q${l * 140} -40 ${l * 128} -14`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" />
					<path d={`M${l * 146} -80 Q${l * 172} -40 ${l * 152} 4`} stroke="#FFFFFF" strokeWidth={8} fill="none" strokeLinecap="round" />
				</g>
			))}
		</g>
	);
};

export const Porta: React.FC<{abre: number; destranca: number}> = ({abre, destranca}) => (
	<g>
		{/* batente + interior escuro */}
		<rect x={-150} y={-300} width={300} height={560} rx={8} fill="#15171A" stroke="#5E4A32" strokeWidth={22} />
		{/* folha: gira no eixo da esquerda (perspectiva achatando X) */}
		<g transform={`translate(-150 0) scale(${(1 - 0.78 * abre).toFixed(3)} 1) translate(150 0)`}>
			<rect x={-150} y={-300} width={300} height={560} fill="#8A5530" />
			<rect x={-110} y={-260} width={220} height={210} rx={6} fill="#9E6A40" />
			<rect x={-110} y={-20} width={220} height={240} rx={6} fill="#9E6A40" />
			<circle cx={110} cy={0} r={14} fill={COR.marca} />
		</g>
		{/* cadeado que abre */}
		<g transform={`translate(${110 - 300 * 0.78 * abre} 60)`} opacity={1 - abre}>
			<path d={`M-26 0 L-26 ${-30 - 24 * destranca} Q-26 ${-60 - 24 * destranca} 0 ${-60 - 24 * destranca} Q26 ${-60 - 24 * destranca} 26 ${-30 - 24 * destranca} L26 ${-30 + 30 * destranca}`} fill="none" stroke="#C9CDD2" strokeWidth={12} />
			<rect x={-40} y={-4} width={80} height={64} rx={10} fill={COR.marca} stroke="#15171A" strokeWidth={4} />
		</g>
	</g>
);

export const Alerta = (tema: Tema) => par(ALERTA, tema);
