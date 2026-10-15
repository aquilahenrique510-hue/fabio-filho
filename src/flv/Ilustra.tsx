// ILUSTRAÇÕES DAS PROPOSTAS — V2 (pedido do cliente, 15/10/2026, áudio do Aquila):
// "não é pra ilustrar os títulos, é pra ilustrar todas as propostas que derem
// pra ser ilustradas" · "em vetor mesmo, não coloca imagem real" · a
// ilustração conta a MUDANÇA (mulher assustada → relaxada; gráfico vermelho
// descendo → verde; chamas sendo abafadas).
// Três peças de teste para aprovar o estilo antes das outras ~23.
// Desenho chapado em SVG, a tinta segue o tema (par claro/escuro do design.ts).
import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {ALERTA, APOIO, COR, EXPO_OUT, FAVOR, INOUT, f, limita, par, type Tema} from '../shared/design';
import {Cena, sobe, sombra, tinta, tintaMeta} from './comum';
import {Sons, whooshPara, type Cue} from './som';

const rel = (frame: number, t: number, dur: number) => limita((frame / 60 - t) / dur);

/**
 * TAMANHO DOS ELEMENTOS (pedido dele, 15/10/2026: "cuidado com o tamanho dos
 * elementos"). Todo desenho de proposta passa por esta escala única, em volta
 * do centro do peito — mudar o tamanho de todos é mudar um número só.
 */
export const ESCALA_ILUSTRA = 0.8;
const CENTRO_DESENHO = {x: 540, y: 1250};
const Escala: React.FC<{children: React.ReactNode}> = ({children}) => (
	<g transform={`translate(${CENTRO_DESENHO.x} ${CENTRO_DESENHO.y}) scale(${ESCALA_ILUSTRA}) translate(${-CENTRO_DESENHO.x} ${-CENTRO_DESENHO.y})`}>
		{children}
	</g>
);

/** Legenda curta, literal da fala, que entra depois do desenho (escalonada). */
const Rotulo: React.FC<{tema: Tema; t: number; top: number; children: React.ReactNode}> = ({tema, t, top, children}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, f(t), f(0.45));
	return (
		<div
			style={{
				position: 'absolute', left: 96, right: 96, top, textAlign: 'center',
				fontSize: 50, fontWeight: 800, lineHeight: 1.12, color: tinta(tema), textShadow: sombra(tema),
				opacity: e, transform: `translateY(${((1 - e) * 26).toFixed(1)}px)`,
			}}
		>
			{children}
		</div>
	);
};

const Fonte: React.FC<{tema: Tema; t: number; top: number; texto: string}> = ({tema, t, top, texto}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, f(t), f(0.5));
	return (
		<div style={{position: 'absolute', left: 0, right: 0, top, textAlign: 'center', fontSize: 30, fontWeight: 500,
			letterSpacing: '0.08em', textTransform: 'uppercase', color: tintaMeta(tema), opacity: e}}>
			{texto}
		</div>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// 1) FLV-I-Clarea · cap. 2 · 00:51,740 → 00:55,800
// "Uma assistente virtual, a ClarIA, para pedir medida protetiva pelo celular."
//   mulher e vulto entram, ela treme ........ 00:51,740 ("Uma")
//   celular acende com a ClarIA ............. 00:52,720 ("a ClarIA,")
//   escudo abre ............................. 00:54,120 ("medida") → 00:55,100
//   ela relaxa, vulto recua ................. 00:55,100 ("protetiva" fim / "pelo")
// Fonte: plano, pág. 19 ("Pelo chat da ClarIA será possível [...] pedir medida protetiva").
// ─────────────────────────────────────────────────────────────────────────────
export const CLAREA = {inicio: 51.74, fim: 55.8};

export const Clarea: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - CLAREA.inicio;
	const cor = tinta(tema);
	const eIn = EXPO_OUT(rel(frame, 0, 0.5));
	const tCel = r(52.72);
	const tEsc = r(54.12);
	const tRel = r(55.1);
	const cel = EXPO_OUT(rel(frame, tCel, 0.45));
	const esc = EXPO_OUT(rel(frame, tEsc, 0.8));
	const alivio = INOUT(rel(frame, tRel, 0.5));
	const medo = 1 - alivio;
	// tremor de medo, que some quando o escudo abre
	const treme = Math.sin(frame * 1.9) * 5 * medo * (1 - esc * 0.7);
	// o vulto chega e depois recua para fora
	const vultoX = interpolate(frame, [0, f(0.6)], [-260, 0], {extrapolateRight: 'clamp', easing: EXPO_OUT}) - 340 * EXPO_OUT(rel(frame, tEsc + 0.2, 0.7));
	const pele = '#F2C8A0';
	const roupa = COR.marca;
	const cues: Cue[] = [
		{t: 0, som: whooshPara(0.5), vol: 0.8},
		{t: tCel, som: 'pop_1', vol: 0.9},
		{t: tEsc, som: 'flash', vol: 0.9},
		{t: tRel, som: 'pop_2', vol: 0.8},
	];
	return (
		<Cena tema={tema}>
			<Sons cues={cues} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: eIn}}>
				<Escala>
				{/* vulto do agressor: silhueta, sem rosto */}
				<g transform={`translate(${200 + vultoX} 1060)`} opacity={1 - EXPO_OUT(rel(frame, tEsc + 0.3, 0.6)) * 0.85}>
					<circle cx={0} cy={0} r={62} fill={APOIO} stroke={cor} strokeWidth={4} />
					<path d="M-62 -10 Q0 -95 62 -10 Z" fill={APOIO} stroke={cor} strokeWidth={4} />
					<rect x={-80} y={70} width={160} height={260} rx={60} fill={APOIO} stroke={cor} strokeWidth={4} />
				</g>
				{/* escudo da ClarIA */}
				<g transform={`translate(600 1150) scale(${esc})`} opacity={esc}>
					<path d="M0 -300 L240 -210 Q240 120 0 300 Q-240 120 -240 -210 Z" fill={par(FAVOR, tema)} opacity={0.22} />
					<path d="M0 -300 L240 -210 Q240 120 0 300 Q-240 120 -240 -210 Z" fill="none" stroke={par(FAVOR, tema)} strokeWidth={10} />
				</g>
				{/* a mulher */}
				<g transform={`translate(${620 + treme} 980)`}>
					{/* cabelo */}
					<path d="M-78 -10 Q-90 -120 0 -128 Q90 -120 78 -10 L84 90 L-84 90 Z" fill="#3B2A22" />
					<circle cx={0} cy={0} r={70} fill={pele} />
					{/* olhos: arregalados (medo) → semicerrados (alívio) */}
					<ellipse cx={-24} cy={-6} rx={9} ry={9 * medo + 3 * alivio} fill="#1A1A1A" />
					<ellipse cx={24} cy={-6} rx={9} ry={9 * medo + 3 * alivio} fill="#1A1A1A" />
					{/* boca: "o" de susto → sorriso */}
					{medo > 0.5 ? (
						<ellipse cx={0} cy={32} rx={11} ry={14} fill="#7A2E2E" />
					) : (
						<path d={`M-24 26 Q0 ${26 + 22 * alivio} 24 26`} stroke="#7A2E2E" strokeWidth={6} fill="none" strokeLinecap="round" />
					)}
					{/* corpo */}
					<rect x={-82} y={80} width={164} height={250} rx={64} fill={roupa} />
					{/* braço com o celular */}
					<g transform={`rotate(${-35 + 25 * cel} 70 130)`}>
						<rect x={60} y={120} width={150} height={34} rx={17} fill={pele} />
						<g transform="translate(190 60)">
							<rect x={0} y={0} width={86} height={150} rx={16} fill="#15171A" stroke={cor} strokeWidth={4} />
							<rect x={9} y={14} width={68} height={118} rx={8} fill={cel > 0 ? '#FFFFFF' : '#2A2E33'} opacity={0.3 + 0.7 * cel} />
							{/* balão de chat da ClarIA */}
							<rect x={16} y={34 + (1 - cel) * 20} width={54} height={30} rx={10} fill={COR.marca} opacity={cel} />
							<rect x={16} y={74 + (1 - cel) * 20} width={40} height={22} rx={10} fill={par(FAVOR, tema)} opacity={cel} />
						</g>
					</g>
				</g>
				</Escala>
			</svg>
			<Rotulo tema={tema} t={tCel + 0.15} top={520}>
				Assistente virtual <span style={{color: COR.marca}}>ClarIA</span>
				<br />
				<span style={{fontSize: 40, fontWeight: 700}}>medida protetiva pelo celular</span>
			</Rotulo>
			<Fonte tema={tema} t={tCel + 0.4} top={1560} texto="Plano de governo · pág. 19" />
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// 2) FLV-N-MenosImposto · cap. 4 · 01:12,020 → 01:14,200
// "...é 19. Menos imposto na luz e no combustível."
//   linha vermelha subindo já em tela ........ 01:12,020 ("19. Menos")
//   vira e DESCE, mudando de vermelho p/ verde 01:12,800 ("imposto na")
//   lâmpada e bomba com seta para baixo ...... 01:13,300 ("luz e no") / 01:13,720 ("combustível")
// Sem número: o plano não diz quanto baixa (pág. 30: "menos imposto [...]").
// ─────────────────────────────────────────────────────────────────────────────
export const MENOS_IMPOSTO = {inicio: 72.02, fim: 74.6};

export const MenosImposto: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - MENOS_IMPOSTO.inicio;
	const cor = tinta(tema);
	const p = INOUT(rel(frame, r(72.8), 1.1)); // a virada
	const sobeLinha = EXPO_OUT(rel(frame, 0, 0.7));
	// pontos: sobe até o pico e depois desce
	const pts: [number, number][] = [
		[160, 1380], [300, 1250], [420, 1160], [540, 1080], // subida (vermelho)
		[660, 1180], [780, 1300], [900, 1420], // descida (verde)
	];
	const subida = pts.slice(0, 4);
	const descida = pts.slice(3);
	const caminho = (ps: [number, number][]) => ps.map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ');
	const comp = (ps: [number, number][]) => ps.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - ps[i][0], q[1] - ps[i][1]), 0) + 2;
	const lenSub = comp(subida);
	const lenDes = comp(descida);
	const vermelho = par(ALERTA, tema);
	const verde = par(FAVOR, tema);
	// a subida também vai esverdeando conforme a linha desce
	const corSub = p > 0.5 ? verde : vermelho;
	const eL = EXPO_OUT(rel(frame, r(73.3), 0.4));
	const eC = EXPO_OUT(rel(frame, r(73.72), 0.4));
	const ponta = descida[Math.min(3, Math.floor(p * 3.999))];
	const cues: Cue[] = [
		{t: 0, som: 'whoosh_rapido', vol: 0.8},
		{t: r(72.8), som: whooshPara(1.1), vol: 0.85},
		{t: r(73.3), som: 'pop_1', vol: 0.85},
		{t: r(73.72), som: 'pop_2', vol: 0.85},
	];
	return (
		<Cena tema={tema}>
			<Sons cues={cues} />
			{/* só o que a fala diz: "Menos imposto" — entra na virada, já verde */}
			<Rotulo tema={tema} t={r(72.8)} top={760}>
				<span style={{color: verde}}>MENOS</span> IMPOSTO
			</Rotulo>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<Escala>
				<path d={caminho(subida)} fill="none" stroke={corSub} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
					strokeDasharray={lenSub} strokeDashoffset={lenSub * (1 - sobeLinha)} />
				<path d={caminho(descida)} fill="none" stroke={verde} strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
					strokeDasharray={lenDes} strokeDashoffset={lenDes * (1 - p)} />
				{/* seta na ponta da descida */}
				<g transform={`translate(${ponta[0]} ${ponta[1]})`} opacity={p}>
					<path d="M-26 -10 L0 28 L26 -10 Z" fill={verde} />
				</g>
				<line x1={140} y1={1460} x2={940} y2={1460} stroke={cor} strokeWidth={4} opacity={0.4 * sobeLinha} />
				{/* lâmpada */}
				<g transform={`translate(330 1590) scale(${eL})`} opacity={eL}>
					<circle cx={0} cy={-20} r={46} fill={COR.marca} />
					<rect x={-22} y={20} width={44} height={34} rx={6} fill={cor} />
					<path d="M60 -40 L60 30 M44 14 L60 34 L76 14" stroke={verde} strokeWidth={9} fill="none" strokeLinecap="round" />
				</g>
				{/* bomba de combustível */}
				<g transform={`translate(700 1590) scale(${eC})`} opacity={eC}>
					<rect x={-42} y={-70} width={84} height={130} rx={10} fill={cor} />
					<rect x={-28} y={-54} width={56} height={34} rx={4} fill={COR.marca} />
					<path d="M42 -40 Q80 -40 80 0 L80 40" stroke={cor} strokeWidth={9} fill="none" />
					<path d="M110 -40 L110 30 M94 14 L110 34 L126 14" stroke={verde} strokeWidth={9} fill="none" strokeLinecap="round" />
				</g>
				</Escala>
			</svg>
			<Fonte tema={tema} t={0.4} top={1710} texto="Plano de governo · TSE" />
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// 3) FLV-O-Chamas · cap. 7 · 01:53,460 → 01:56,520
// "O plano tem meta de zerar o desmatamento ilegal até..."
//   chamas sobre o tronco ................... 01:53,460 ("O plano")
//   algo vem e ABAFA as chamas .............. 01:54,320 ("de zerar o") → 01:55,380
//   copa volta a crescer, verde ............. 01:55,380 ("ilegal")
// Depois desta peça entra a pág. 58 (FLV-M), que fica com "até 2029. Está na página 58".
// "Ilegal" fica escrito: a meta é do desmatamento ILEGAL (pág. 58), não de todo.
// ─────────────────────────────────────────────────────────────────────────────
export const CHAMAS = {inicio: 113.46, fim: 116.52};

const Chama: React.FC<{x: number; y: number; s: number; fase: number; vivo: number}> = ({x, y, s, fase, vivo}) => {
	const frame = useCurrentFrame();
	const balanca = Math.sin(frame / 5 + fase) * 0.08;
	const sy = s * vivo * (1 + balanca);
	return (
		<g transform={`translate(${x} ${y}) scale(${s * vivo} ${sy})`}>
			<path d="M0 -120 Q60 -50 46 10 Q36 60 0 60 Q-36 60 -46 10 Q-60 -50 0 -120 Z" fill="#F0703A" />
			<path d="M0 -60 Q30 -20 22 16 Q16 42 0 42 Q-16 42 -22 16 Q-30 -20 0 -60 Z" fill={COR.marca} />
		</g>
	);
};

export const Chamas: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - CHAMAS.inicio;
	const cor = tinta(tema);
	const eIn = EXPO_OUT(rel(frame, 0, 0.5));
	const abafa = INOUT(rel(frame, r(114.32), 1.0)); // a tampa desce
	const apaga = INOUT(rel(frame, r(114.62), 0.75));
	const cresce = EXPO_OUT(rel(frame, r(115.38), 0.9));
	const levanta = INOUT(rel(frame, r(115.4), 0.5));
	const tampaY = interpolate(abafa, [0, 1], [900, 1130]) - 260 * levanta;
	const verde = par(FAVOR, tema);
	const cues: Cue[] = [
		{t: 0, som: whooshPara(0.5), vol: 0.75},
		{t: r(114.32), som: whooshPara(1.0), vol: 0.9},
		{t: r(115.0), som: 'carimbo', vol: 0.75},
		{t: r(115.38), som: whooshPara(0.9), vol: 0.75, dura: 0.9},
	];
	return (
		<Cena tema={tema}>
			<Sons cues={cues} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: eIn}}>
				<Escala>
				{/* chão */}
				<rect x={180} y={1420} width={720} height={14} rx={7} fill={cor} opacity={0.5} />
				{/* árvore: tronco + copa que volta a crescer */}
				<rect x={515} y={1150} width={50} height={275} rx={12} fill="#7A5235" />
				<g transform={`translate(540 1120) scale(${0.25 + 0.75 * cresce})`} opacity={cresce}>
					<circle cx={-90} cy={10} r={110} fill={verde} />
					<circle cx={90} cy={10} r={110} fill={verde} />
					<circle cx={0} cy={-80} r={130} fill={verde} />
				</g>
				{/* fumaça ao apagar */}
				<g opacity={apaga * (1 - cresce)}>
					{[0, 1, 2].map((i) => (
						<circle key={i} cx={470 + i * 70} cy={1140 - apaga * 160 - i * 30} r={40 + apaga * 30} fill={APOIO} opacity={0.6} />
					))}
				</g>
				{/* chamas */}
				<Chama x={470} y={1300} s={1.1} fase={0} vivo={1 - apaga} />
				<Chama x={560} y={1260} s={1.45} fase={2} vivo={1 - apaga} />
				<Chama x={650} y={1310} s={1.0} fase={4} vivo={1 - apaga} />
				{/* a tampa que abafa (vem de cima e sai) */}
				<g transform={`translate(540 ${tampaY})`} opacity={Math.min(1, abafa * 4) * (1 - levanta)}>
					<path d="M-260 0 Q0 -140 260 0 Z" fill={cor} />
					<rect x={-20} y={-160} width={40} height={60} rx={10} fill={cor} />
				</g>
				</Escala>
			</svg>
			<Rotulo tema={tema} t={0.1} top={560}>
				Zerar o desmatamento <span style={{color: verde}}>ilegal</span>
			</Rotulo>
			<Fonte tema={tema} t={0.4} top={1500} texto="Plano de governo · pág. 58" />
		</Cena>
	);
};
