// V3 · FLV-A3-Abertura · gancho · 00:00,080 → 00:07,820
// Pedido (15/10/2026): "refaz só aquela do início, antes do Gatorade" — a abertura
// com posts cinza virou ILUSTRAÇÃO, como o resto da V2.
// "Você já deve ter visto alguém dizendo que o Flávio iria cortar isso, aquilo e
//  aquilo outro. Disseram até que o Gatorade ia virar mais Gatorade."
//   celular com o feed ............. 00:00,080 ("Você já")
//   balão de alguém "dizendo" ....... 00:01,000 ("alguém") / 01,220 ("dizendo")
//   a tesoura entra ................. 00:02,200 ("cortar")
//   corta a 1ª caixa ................ 00:02,660 ("isso,")
//   corta a 2ª ...................... 00:03,100 (meio de "aquilo e")
//   corta a 3ª ...................... 00:03,640 ("outro.")
//   o boato se espalha (balões) ..... 00:04,260 ("Disseram")
//   garrafa de isotônico ............ 00:05,840 ("Gatorade")
//   "mais": a garrafa vira duas ..... 00:06,980 ("mais")
// TOM: o vídeo NÃO afirma o que seria cortado — as caixas são "?", é boato.
// Garrafa genérica, SEM marca (a marca citada é registrada).
import React from 'react';
import {interpolate} from 'remotion';
import {ALERTA, COR, FAVOR, par, type Tema} from '../../shared/design';
import {Celular, Peca, entra, vira} from './base';

export const ABERTURA = {inicio: 0.08, fim: 7.82};
const r = (t: number) => t - ABERTURA.inicio;

const Tesoura: React.FC<{x: number; y: number; abre: number; cor: string}> = ({x, y, abre, cor}) => {
	const a = 8 + 22 * abre; // ângulo das lâminas
	return (
		<g transform={`translate(${x} ${y})`}>
			<g transform={`rotate(${-a})`}>
				<path d="M0 0 L190 -12 L190 12 Z" fill="#C9CDD2" stroke={cor} strokeWidth={3} />
				<circle cx={-60} cy={-34} r={30} fill="none" stroke={par(ALERTA, 'alfa')} strokeWidth={14} />
			</g>
			<g transform={`rotate(${a})`}>
				<path d="M0 0 L190 -12 L190 12 Z" fill="#E4E7EA" stroke={cor} strokeWidth={3} />
				<circle cx={-60} cy={34} r={30} fill="none" stroke={par(ALERTA, 'alfa')} strokeWidth={14} />
			</g>
			<circle r={10} fill={cor} />
		</g>
	);
};

const Caixa: React.FC<{x: number; y: number; corte: number; cor: string}> = ({x, y, corte, cor}) => {
	// cortada: as duas metades se afastam e caem
	const sep = corte * 40;
	const cai = corte * corte * 120;
	const meia = (lado: -1 | 1) => (
		<g transform={`translate(${lado * sep} ${cai}) rotate(${lado * corte * 14})`} opacity={1 - corte * 0.6}>
			<rect x={lado < 0 ? -60 : 0} y={-60} width={60} height={120} fill={COR.marca} />
		</g>
	);
	return (
		<g transform={`translate(${x} ${y})`}>
			{meia(-1)}
			{meia(1)}
			<text x={0} y={22} textAnchor="middle" fontSize={72} fontWeight={800} fill="#15171A" opacity={1 - corte} fontFamily="inherit">?</text>
			<rect x={-60} y={-60} width={120} height={120} fill="none" stroke={cor} strokeWidth={3} opacity={1 - corte} />
		</g>
	);
};

const Garrafa: React.FC<{x: number; y: number; s: number; op: number; cor: string; tema: Tema}> = ({x, y, s, op, cor, tema}) => (
	<g transform={`translate(${x} ${y}) scale(${s})`} opacity={op}>
		<rect x={-26} y={-150} width={52} height={36} rx={8} fill={par(FAVOR, tema)} />
		<path d="M-50 -110 Q-50 -130 -26 -130 L26 -130 Q50 -130 50 -110 L56 120 Q56 150 26 150 L-26 150 Q-56 150 -56 120 Z" fill="#7FB6E8" />
		<rect x={-56} y={-20} width={112} height={70} fill="#FFFFFF" opacity={0.9} />
		<path d="M-30 15 L30 15" stroke={cor} strokeWidth={8} opacity={0.6} />
	</g>
);

export const Abertura: React.FC<{tema: Tema}> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={ABERTURA.inicio}
		cues={[
			{t: 0.08, som: 'whoosh_rapido', vol: 0.75},
			{t: 1.0, som: 'pop_1', vol: 0.7},
			{t: 2.2, som: 'whoosh_rapido', vol: 0.75},
			{t: 2.66, som: 'obturador', vol: 0.85},
			{t: 3.1, som: 'obturador', vol: 0.85},
			{t: 3.64, som: 'obturador', vol: 0.85},
			{t: 4.26, som: 'pop_2', vol: 0.7},
			{t: 5.84, som: 'whoosh_rapido', vol: 0.75},
			{t: 6.98, som: 'pop_1', vol: 0.75},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const eCel = entra(frame, 0, 0.5);
			const balao = entra(frame, r(1.0), 0.35);
			const tes = entra(frame, r(2.2), 0.4);
			const cortes = [2.66, 3.1, 3.64].map((t) => vira(frame, r(t), 0.45));
			// a tesoura fecha em cada corte (abre → fecha em 0,15 s)
			const fecha = Math.max(...[2.66, 3.1, 3.64].map((t) => {
				const d = frame / 60 - r(t);
				return d > -0.12 && d < 0.18 ? 1 - Math.abs(d - 0.03) / 0.15 : 0;
			}));
			const alvo = [2.66, 3.1, 3.64].filter((t) => frame / 60 >= r(t) - 0.25).length;
			const xTes = 230 + Math.max(0, alvo - 1) * 210;
			const espalha = entra(frame, r(4.26), 0.6);
			const g1 = entra(frame, r(5.84), 0.4);
			const g2 = entra(frame, r(6.98), 0.4);
			// a cena do corte sai quando entra a garrafa
			const saiCorte = vira(frame, r(5.6), 0.35);
			return (
				// esta cena pedia mais tamanho que a escala padrão (celular, caixas e tesoura ficavam miúdos)
				<g transform="translate(540 1200) scale(1.35) translate(-540 -1200)">
					{/* celular com o feed */}
					<g opacity={eCel * (1 - saiCorte)} transform={`translate(0 ${(1 - eCel) * 80})`}>
						<Celular x={220} y={1000} s={1.15} cor={cor} tela="#2A2E33" />
						{[0, 1, 2].map((i) => <rect key={i} x={170} y={930 + i * 46} width={100 - i * 18} height={22} rx={11} fill="#C9CDD2" />)}
						{/* balão de "alguém dizendo" */}
						<g transform={`translate(380 830) scale(${balao})`} opacity={balao}>
							<rect x={-80} y={-55} width={200} height={100} rx={28} fill="#FFFFFF" />
							<path d="M-60 40 L-90 80 L-20 40 Z" fill="#FFFFFF" />
							<text x={20} y={22} textAnchor="middle" fontSize={64} fontWeight={800} fill={par(ALERTA, tm)} fontFamily="inherit">!!</text>
						</g>
					</g>
					{/* três caixas "?" cortadas */}
					<g opacity={1 - saiCorte}>
						{[0, 1, 2].map((i) => <Caixa key={i} x={430 + i * 210} y={1300} corte={cortes[i]} cor={cor} />)}
						<g opacity={tes}>
							<Tesoura x={xTes} y={1300} abre={1 - fecha} cor={cor} />
						</g>
					</g>
					{/* o boato se espalha: balões pequenos saindo */}
					<g opacity={espalha * (1 - saiCorte)}>
						{[[760, 900], [880, 1010], [700, 1060]].map(([x, y], i) => {
							const e = Math.max(0, Math.min(1, espalha * 3 - i));
							return (
								<g key={i} transform={`translate(${x} ${y}) scale(${e * 0.7})`}>
									<rect x={-70} y={-40} width={140} height={80} rx={24} fill={i % 2 ? COR.marca : '#FFFFFF'} />
									<text x={0} y={18} textAnchor="middle" fontSize={50} fontWeight={800} fill="#15171A" fontFamily="inherit">?</text>
								</g>
							);
						})}
					</g>
					{/* "Gatorade ia virar mais Gatorade": a garrafa vira duas */}
					<Garrafa x={interpolate(g2, [0, 1], [540, 450])} y={1220 + (1 - g1) * 120} s={1.1} op={g1} cor={cor} tema={tm} />
					<Garrafa x={630} y={1220 + (1 - g2) * 120} s={1.1} op={g2} cor={cor} tema={tm} />
					<text x={540} y={1460} textAnchor="middle" fontSize={110} fontWeight={800} fill={COR.marca} opacity={g2} fontFamily="inherit">+</text>
				</g>
			);
		}}
	/>
);
