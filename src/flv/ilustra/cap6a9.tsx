// V2 — ILUSTRAÇÕES DAS PROPOSTAS, CAPÍTULOS 6 A 9 + desenhos que entram junto
// dos números (presídio, câmera, casas, obras, crescimento, ministérios).
import React from 'react';
import {interpolate} from 'remotion';
import {ALERTA, APOIO, COR, FAVOR, par, type Tema} from '../../shared/design';
import {whooshPara} from '../som';
import {Am, Casa, Papel, Peca, Pessoa, Risco, entra, vira} from './base';

type P = {tema: Tema};

// ── CAP. 6 · "Os programas sociais ficam, com combate à fraude." 01:30,400 → 01:33,720 · pág. 42
export const FRAUDE = {inicio: 90.4, fim: 93.72};
export const Fraude: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={FRAUDE.inicio}
		rotulo={<>Os programas sociais ficam, <Am>com combate à fraude</Am></>}
		tRotulo={90.5}
		fonte="Plano de governo · pág. 42"
		cues={[
			{t: 90.4, som: whooshPara(0.5), vol: 0.75},
			{t: 92.38, som: whooshPara(0.8), vol: 0.7},
			{t: 93.18, som: 'carimbo', vol: 0.85},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - FRAUDE.inicio;
			const e = entra(frame, 0, 0.5);
			const lupa = vira(frame, t(92.38), 0.8);
			const x = entra(frame, t(93.18), 0.25);
			return (
				<g opacity={e}>
					{/* a família que continua recebendo */}
					<Pessoa x={250} y={1140} s={0.75} roupa={par(FAVOR, tm)} cabelo="longo" />
					<Pessoa x={380} y={1180} s={0.6} roupa={COR.marca} />
					{/* os cadastros: o do meio é o falso */}
					{[0, 1, 2].map((i) => <Papel key={i} x={620 + i * 130} y={1240} s={0.62} op={i === 1 ? 1 - x * 0.5 : 1} />)}
					<Risco x={750} y={1240} r={70} p={x} cor={par(ALERTA, tm)} />
					{/* a lupa passa pelos cadastros */}
					<g transform={`translate(${interpolate(lupa, [0, 1], [560, 760])} 1150)`} opacity={lupa > 0 ? 1 - x : 0}>
						<circle r={60} fill="none" stroke={cor} strokeWidth={14} />
						<line x1={42} y1={42} x2={100} y2={100} stroke={cor} strokeWidth={18} strokeLinecap="round" />
					</g>
				</g>
			);
		}}
	/>
);

// ── CAP. 6 · "Contrato mais barato pro primeiro emprego e pra quem tem 50 anos ou mais."
// 01:33,720 → 01:38,540 · pág. 44
export const EMPREGO = {inicio: 93.72, fim: 98.54};
const Carteira: React.FC<{x: number; y: number; p: number}> = ({x, y, p}) => (
	<g transform={`translate(${x} ${y + (1 - p) * 40}) rotate(-8)`} opacity={p}>
		<rect x={-46} y={-62} width={92} height={124} rx={10} fill="#1F4B99" />
		<rect x={-30} y={-40} width={60} height={10} rx={5} fill="#FFFFFF" opacity={0.8} />
		<circle cx={0} cy={10} r={20} fill={COR.marca} />
	</g>
);
export const Emprego: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={EMPREGO.inicio}
		rotulo={<>Contrato mais barato pro <Am>primeiro emprego</Am> e pra quem tem <Am>50 anos ou mais</Am></>}
		tRotulo={93.85}
		fonte="Plano de governo · pág. 44"
		cues={[
			{t: 93.72, som: whooshPara(0.5), vol: 0.75},
			{t: 95.4, som: 'pop_1', vol: 0.75},
			{t: 96.52, som: 'pop_2', vol: 0.75},
		]}
		desenho={({frame, tema: tm}) => {
			const t = (s: number) => s - EMPREGO.inicio;
			const j = entra(frame, t(94.2), 0.5);
			const v = entra(frame, t(96.0), 0.5);
			return (
				<>
					<g opacity={j}><Pessoa x={330} y={1130} s={0.9} roupa={COR.marca} humor={0.4 + 0.6 * entra(frame, t(95.4), 0.4)} /></g>
					<Carteira x={450} y={1330} p={entra(frame, t(95.4), 0.4)} />
					<g opacity={v}><Pessoa x={740} y={1130} s={0.9} roupa={par(FAVOR, tm)} cabelo="grisalho" humor={0.4 + 0.6 * entra(frame, t(96.52), 0.4)} /></g>
					<Carteira x={860} y={1330} p={entra(frame, t(96.52), 0.4)} />
				</>
			);
		}}
	/>
);

// ── CAP. 8 · "Fim da reeleição para presidente." 02:01,680 → 02:03,560 · pág. 66
export const REELEICAO = {inicio: 121.68, fim: 123.56};
const Faixa: React.FC<{x: number; op?: number}> = ({x, op = 1}) => (
	<g transform={`translate(${x} 1240)`} opacity={op}>
		<path d="M-110 -150 L-50 -150 L110 150 L50 150 Z" fill="#2E8B57" />
		<path d="M-80 -150 L-60 -150 L100 150 L80 150 Z" fill={COR.marca} />
		<circle cx={0} cy={0} r={34} fill={COR.marca} stroke="#1F4B99" strokeWidth={8} />
	</g>
);
export const Reeleicao: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={REELEICAO.inicio}
		rotulo={<>Fim da <Am>reeleição</Am> para presidente</>}
		tRotulo={122.4} // o card 8/9 vai para o canto em ~122,4
		fonte="Plano de governo · pág. 66"
		cues={[
			{t: 121.68, som: whooshPara(0.5), vol: 0.75},
			{t: 122.22, som: 'carimbo', vol: 0.85},
		]}
		desenho={({frame, tema: tm}) => {
			const t = (s: number) => s - REELEICAO.inicio;
			const e1 = entra(frame, 0, 0.5);
			const e2 = entra(frame, 0.15, 0.5);
			const x = entra(frame, t(122.22), 0.3);
			return (
				<>
					<Faixa x={380} op={e1} />
					<text x={380} y={1460} textAnchor="middle" fontSize={64} fontWeight={800} fill={COR.marca} opacity={e1} fontFamily="inherit">1º</text>
					<Faixa x={700} op={e2 * (1 - 0.6 * x)} />
					<text x={700} y={1460} textAnchor="middle" fontSize={64} fontWeight={800} fill={par(ALERTA, tm)} opacity={e2} fontFamily="inherit">2º</text>
					<Risco x={700} y={1240} r={150} p={x} cor={par(ALERTA, tm)} />
				</>
			);
		}}
	/>
);

// ── CAP. 8 · "Limite para a decisão de um ministro só no STF." 02:03,560 → 02:06,980 · pág. 65
// Sem rosto de ministro nenhum: é a regra, não uma pessoa.
export const MONOCRATICA = {inicio: 123.56, fim: 126.98};
export const Monocratica: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={MONOCRATICA.inicio}
		rotulo={<>Limite para a decisão de <Am>um ministro só</Am></>}
		tRotulo={123.7}
		fonte="Plano de governo · pág. 65"
		cues={[
			{t: 123.56, som: whooshPara(0.6), vol: 0.75},
			{t: 125.34, som: whooshPara(0.7), vol: 0.75},
			{t: 126.0, som: 'carimbo', vol: 0.7},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - MONOCRATICA.inicio;
			const e = entra(frame, 0, 0.5);
			const ergue = vira(frame, 0.3, 0.8); // o martelo sobe sozinho
			const maos = entra(frame, t(125.34), 0.6); // o colegiado segura
			const ang = -40 * ergue * (1 - maos * 0.2);
			return (
				<g opacity={e}>
					{/* base */}
					<rect x={380} y={1360} width={320} height={40} rx={10} fill={APOIO} stroke={cor} strokeWidth={3} />
					{/* martelo */}
					<g transform={`translate(540 1330) rotate(${ang})`}>
						<rect x={-14} y={-260} width={28} height={250} rx={12} fill="#7A5235" />
						<rect x={-90} y={-320} width={180} height={80} rx={16} fill="#5A3B26" stroke={cor} strokeWidth={3} />
					</g>
					{/* várias mãos seguram o cabo (decisão colegiada) */}
					{[-2, -1, 0, 1, 2].map((i) => (
						<g key={i} transform={`translate(${540 + i * 110} ${1100 + Math.abs(i) * 30 + (1 - maos) * 260})`} opacity={maos}>
							<rect x={-26} y={0} width={52} height={200} rx={22} fill={i % 2 ? par(FAVOR, tm) : COR.marca} />
							<circle cx={0} cy={0} r={34} fill="#F2C8A0" />
						</g>
					))}
				</g>
			);
		}}
	/>
);

// ── CAP. 8 · "Parente de juiz não advoga no tribunal dele." 02:06,980 → 02:10,600 · pág. 66
// A regra do plano é para ministros do STF (parentes até 3º grau).
export const PARENTE = {inicio: 126.98, fim: 130.6};
export const Parente: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={PARENTE.inicio}
		rotulo={<>Parente de juiz <Am>não advoga</Am> no tribunal dele</>}
		tRotulo={127.1}
		fonte="Plano de governo · pág. 66 · ministros do STF"
		cues={[
			{t: 126.98, som: whooshPara(0.6), vol: 0.75},
			{t: 128.68, som: whooshPara(0.5), vol: 0.75},
			{t: 129.1, som: 'carimbo', vol: 0.85},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - PARENTE.inicio;
			const e = entra(frame, 0, 0.5);
			const anda = vira(frame, 0.2, 1.3);
			const fecha = vira(frame, t(128.68), 0.45);
			const x = entra(frame, t(129.1), 0.25);
			return (
				<g opacity={e}>
					{/* o tribunal */}
					<g transform="translate(720 1160)">
						<path d="M-200 -60 L0 -160 L200 -60 Z" fill={cor} />
						{[-150, -75, 0, 75, 150].map((xx) => <rect key={xx} x={xx - 16} y={-50} width={32} height={260} fill={cor} opacity={0.85} />)}
						<rect x={-210} y={210} width={420} height={30} fill={cor} />
						{/* a porta que fecha */}
						<rect x={-60} y={60} width={120 * fecha} height={150} fill={par(ALERTA, tm)} />
					</g>
					{/* o parente com a pasta */}
					<g transform={`translate(${interpolate(anda, [0, 1], [180, 440]) - x * 40} 0)`}>
						<Pessoa x={0} y={1150} s={0.8} roupa={APOIO} humor={1 - x} />
						<rect x={50} y={1360} width={80} height={60} rx={8} fill="#5A3B26" />
					</g>
				</g>
			);
		}}
	/>
);

// ── CAP. 9 · "Fim de supersalário e penduricalho." 02:15,140 → 02:17,480 · pág. 69
export const SUPERSALARIO = {inicio: 135.14, fim: 137.48};
export const Supersalario: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={SUPERSALARIO.inicio}
		rotulo={<>Fim de <Am>supersalário</Am> e <Am>penduricalho</Am></>}
		tRotulo={135.25}
		fonte="Plano de governo · pág. 69"
		cues={[
			{t: 135.14, som: whooshPara(0.5), vol: 0.75},
			{t: 136.82, som: 'chain', vol: 0.8},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - SUPERSALARIO.inicio;
			const e = entra(frame, 0, 0.5);
			const cai = vira(frame, t(136.82), 0.5);
			return (
				<g opacity={e}>
					{/* contracheque */}
					<g transform="translate(540 1130)">
						<rect x={-200} y={-150} width={400} height={300} rx={16} fill="#FFFFFF" stroke={cor} strokeWidth={4} />
						<rect x={-170} y={-120} width={180} height={22} rx={11} fill={par(ALERTA, tm)} />
						{[-70, -30, 10].map((yy) => <rect key={yy} x={-170} y={yy} width={300} height={16} rx={8} fill="#C9CDD2" />)}
						<text x={120} y={110} textAnchor="middle" fontSize={64} fontWeight={800} fill={par(ALERTA, tm)} fontFamily="inherit">$$$</text>
					</g>
					{/* penduricalhos: etiquetas penduradas que caem */}
					{[-140, -40, 60, 160].map((xx, i) => {
						const y = 1300 + cai * (300 + i * 40);
						return (
							<g key={xx} opacity={1 - cai}>
								<line x1={540 + xx} y1={1280} x2={540 + xx} y2={y} stroke={cor} strokeWidth={4} />
								<g transform={`translate(${540 + xx} ${y}) rotate(${Math.sin(frame / 8 + i) * 8 + cai * 40})`}>
									<rect x={-34} y={0} width={68} height={50} rx={8} fill={COR.marca} />
									<text x={0} y={36} textAnchor="middle" fontSize={34} fontWeight={800} fill="#7A5A00" fontFamily="inherit">+</text>
								</g>
							</g>
						);
					})}
				</g>
			);
		}}
	/>
);

// ── CAP. 9 · "Estatal não é palanque, nem cabide de apadrinhado." 02:17,480 → 02:21,020 · pág. 70 (literal)
export const ESTATAL = {inicio: 137.48, fim: 141.02};
export const Estatal: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={ESTATAL.inicio}
		rotulo={<>Estatal não é <Am>palanque</Am>, nem <Am>cabide</Am> de apadrinhado</>}
		tRotulo={137.6}
		fonte="Plano de governo · pág. 70"
		cues={[
			{t: 137.48, som: whooshPara(0.5), vol: 0.75},
			{t: 138.9, som: 'carimbo', vol: 0.85},
			{t: 140.0, som: 'carimbo', vol: 0.85},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - ESTATAL.inicio;
			const p1 = entra(frame, 0.1, 0.5);
			const p2 = entra(frame, t(139.5), 0.5);
			const x1 = entra(frame, t(138.9), 0.3);
			const x2 = entra(frame, t(140.0), 0.3);
			return (
				<>
					{/* palanque com microfone */}
					<g transform="translate(330 1250)" opacity={p1}>
						<path d="M-120 -40 L120 -40 L90 160 L-90 160 Z" fill={COR.marca} />
						<rect x={-140} y={-70} width={280} height={36} rx={8} fill={cor} />
						<line x1={0} y1={-70} x2={0} y2={-170} stroke={cor} strokeWidth={10} />
						<rect x={-18} y={-210} width={36} height={56} rx={18} fill={APOIO} stroke={cor} strokeWidth={4} />
					</g>
					<Risco x={330} y={1220} r={150} p={x1} cor={par(ALERTA, tm)} />
					{/* cabide */}
					<g transform="translate(750 1240)" opacity={p2}>
						<path d="M0 -110 Q0 -150 30 -150 Q60 -150 60 -120 Q60 -95 0 -80 L-170 20 L170 20 Z" fill="none" stroke={cor} strokeWidth={12} strokeLinejoin="round" />
						<rect x={-170} y={20} width={340} height={12} rx={6} fill={cor} />
					</g>
					<Risco x={750} y={1220} r={150} p={x2} cor={par(ALERTA, tm)} />
				</>
			);
		}}
	/>
);

// ── DESENHOS QUE ENTRAM JUNTO DOS NÚMEROS (faixa de baixo do quadro) ─────────
// Desenhados em volta de (0,0); a peça de números posiciona e anima pela `e`.

export const DesPresidio: React.FC<{e: number; cor: string; tema: Tema}> = ({e, cor}) => (
	<g>
		<rect x={-200} y={-90} width={400} height={180} rx={10} fill={APOIO} stroke={cor} strokeWidth={4} />
		<path d="M-220 -90 L0 -160 L220 -90 Z" fill={cor} />
		{[-150, -90, -30, 30, 90, 150].map((xx) => (
			<rect key={xx} x={xx - 6} y={-90} width={12} height={180 * e} fill={cor} />
		))}
	</g>
);

export const DesCamera: React.FC<{e: number; cor: string; tema: Tema}> = ({e, cor, tema}) => (
	<g>
		<g transform={`rotate(${-12 + 24 * e})`}>
			<rect x={-150} y={-50} width={220} height={100} rx={20} fill="#FFFFFF" stroke={cor} strokeWidth={4} />
			<circle cx={70} cy={0} r={36} fill="#15171A" />
			<circle cx={70} cy={0} r={14} fill={par(ALERTA, tema)} />
		</g>
		{/* quadro de reconhecimento */}
		<g transform="translate(260 0)" opacity={e}>
			<path d="M-60 -70 h30 M-60 -70 v30 M60 -70 h-30 M60 -70 v30 M-60 70 h30 M-60 70 v-30 M60 70 h-30 M60 70 v-30" stroke={par(FAVOR, tema)} strokeWidth={8} />
			<circle cx={0} cy={-6} r={34} fill={cor} opacity={0.5} />
		</g>
	</g>
);

export const DesCasas: React.FC<{e: number; cor: string; tema: Tema}> = ({e, tema}) => (
	<g>
		{[-260, -130, 0, 130, 260].map((xx, i) => {
			const s = Math.max(0, Math.min(1, e * 5 - i));
			return <Casa key={xx} x={xx} y={0} s={0.55 * s} cor={COR.marca} telhado={par(FAVOR, tema)} op={s} />;
		})}
	</g>
);

export const DesObras: React.FC<{e: number; cor: string; tema: Tema}> = ({e, cor}) => {
	const a = Math.min(1, e * 3);
	const b = Math.max(0, Math.min(1, e * 3 - 1));
	const c = Math.max(0, Math.min(1, e * 3 - 2));
	return (
		<g>
			{/* estrada */}
			<g transform="translate(-230 0)" opacity={a}>
				<path d="M-70 80 L-20 -80 L20 -80 L70 80 Z" fill={APOIO} />
				{[0, 1, 2].map((i) => <rect key={i} x={-4} y={-60 + i * 50} width={8} height={26} fill={COR.marca} />)}
			</g>
			{/* navio (porto) */}
			<g opacity={b}>
				<path d="M-90 10 L90 10 L60 70 L-60 70 Z" fill={cor} />
				<rect x={-50} y={-40} width={70} height={50} fill={COR.marca} />
				<rect x={30} y={-20} width={40} height={30} fill={COR.marca} />
			</g>
			{/* trem (ferrovia) */}
			<g transform="translate(230 0)" opacity={c}>
				<rect x={-80} y={-50} width={160} height={100} rx={20} fill={COR.marca} />
				<rect x={-60} y={-30} width={50} height={36} rx={6} fill="#FFFFFF" />
				<rect x={10} y={-30} width={50} height={36} rx={6} fill="#FFFFFF" />
				<line x1={-100} y1={70} x2={100} y2={70} stroke={cor} strokeWidth={8} />
			</g>
		</g>
	);
};

export const DesCresce: React.FC<{e: number; cor: string; tema: Tema}> = ({e, cor, tema}) => {
	const pts = [[-260, 70], [-130, 40], [0, 0], [130, -40], [260, -90]];
	const d = pts.map((q, i) => `${i ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ');
	return (
		<g>
			<line x1={-280} y1={90} x2={280} y2={90} stroke={cor} strokeWidth={4} opacity={0.5} />
			<path d={d} fill="none" stroke={par(FAVOR, tema)} strokeWidth={14} strokeLinecap="round" strokeDasharray={600} strokeDashoffset={600 * (1 - e)} />
		</g>
	);
};

export const DesMinisterios: React.FC<{e: number; cor: string; tema: Tema}> = ({e, cor}) => (
	<g>
		{Array.from({length: 10}, (_, i) => {
			const sai = Math.max(0, Math.min(1, e * 10 - i));
			const x = -270 + i * 60;
			return (
				<g key={i} transform={`translate(${x} ${sai * 60})`} opacity={1 - sai}>
					<rect x={-22} y={-90} width={44} height={150} fill={cor} opacity={0.85} />
					<path d="M-28 -90 L0 -110 L28 -90 Z" fill={cor} />
				</g>
			);
		})}
	</g>
);
