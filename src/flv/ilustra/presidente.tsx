// V3 · FLV-T-Tesoura · CENTRO, saindo de trás de uma tribuna · 00:01,900 → 00:05,700
// Pedido (15/10/2026): a referência dele (homem de terno, faixa presidencial e tesoura
// gigante) RECONSTRUÍDA EM ILUSTRAÇÃO. Depois ele mandou a arte final (imagem plana:
// tribuna com selo "?", microfones na frente das mãos, gravata listrada, broche da
// bandeira, brilho atrás) e pediu para ANIMAR ESSA IMAGEM — redesenhada aqui em vetor,
// nas mesmas proporções (coordenadas da arte 1024×1536, deslocadas para o quadro),
// para a tesoura poder abrir e fechar.
//   tribuna sobe e ele sai de trás .. 00:01,900
//   a tesoura fecha .................. 00:02,660 ("isso,") · 03,100 ("aquilo e") · 03,640 ("outro.")
//   sai antes do Gatorade ............ 00:05,700 (a cena do corte da FLV-A3 sai em 5,6)
// SEM SOM de propósito: a FLV-A3-Abertura já toca o obturador nesses três cortes —
// repetir aqui empilharia o mesmo som (CLAUDE.md §4.1.1).
// Figura genérica: terno, faixa, tesoura — é o boato, não o retrato. O selo "?" fica.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {type Tema} from '../../shared/design';
import {Cena} from '../comum';
import {entra} from './base';

export const TESOURA = {inicio: 1.9, fim: 5.7};
const CORTES = [2.66, 3.1, 3.64].map((t) => t - TESOURA.inicio);

// paleta tirada da arte dele
const TERNO = '#17244A';
const TERNO_SOMBRA = '#0F1934';
const PELE = '#E8B98E';
const PELE_SOMBRA = '#D29F74';
const CABELO = '#3A2A20';
const VERDE = '#127A3E';
const AMARELO = '#F5C72E';
const ACO = '#DCDFE3';
const ACO_LUZ = '#F4F5F7';
const ACO_ESC = '#9AA0A6';
const MADEIRA = '#8A5530';
const MADEIRA_LUZ = '#9E6A40';
const MADEIRA_ESC = '#6E4A2E';

// a arte é 1024×1536; no quadro ela entra deslocada assim
const DX = 28;
const DY = 190;
const PIVO = {x: 492, y: 578};
const TOPO_TRIBUNA = 765;

const gira = (x: number, y: number, ang: number) => {
	const a = (ang * Math.PI) / 180;
	return [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
};

// uma lâmina: aponta para cima a partir do pivô, a argola fica do outro lado
const Lamina: React.FC<{ang: number; frente?: boolean}> = ({ang, frente}) => (
	<g transform={`rotate(${ang})`}>
		<path d="M-24 6 L-3 -410 L5 -410 L24 6 Z" fill={frente ? ACO : '#CDD1D5'} stroke={ACO_ESC} strokeWidth={3} />
		<path d="M5 -20 L3 -380" stroke={ACO_LUZ} strokeWidth={6} strokeLinecap="round" opacity={0.9} />
		<path d="M-10 0 L-9 115 M10 0 L9 115" stroke={ACO_ESC} strokeWidth={9} />
		<rect x={-12} y={0} width={24} height={115} fill={ACO} />
		<circle cx={0} cy={150} r={36} fill="none" stroke={ACO} strokeWidth={16} />
		<circle cx={0} cy={150} r={36} fill="none" stroke={ACO_ESC} strokeWidth={2.5} />
	</g>
);

const Gravata: React.FC = () => (
	<g>
		<defs>
			<clipPath id="tes-gravata">
				<path d="M486 382 L514 382 L520 400 L530 515 L506 540 L482 515 L490 400 Z" />
			</clipPath>
		</defs>
		<path d="M486 382 L514 382 L520 400 L530 515 L506 540 L482 515 L490 400 Z" fill={VERDE} />
		<g clipPath="url(#tes-gravata)">
			{[0, 1, 2, 3, 4, 5].map((i) => (
				<path key={i} d={`M470 ${392 + i * 30} L540 ${352 + i * 30} L540 ${366 + i * 30} L470 ${406 + i * 30} Z`} fill={AMARELO} />
			))}
		</g>
		<path d="M484 372 L516 372 L512 392 L488 392 Z" fill={VERDE} />
	</g>
);

const Boneco: React.FC<{abre: number; respira: number; pisca: number; brilho: number}> = ({abre, respira, pisca, brilho}) => {
	const a = 12 + 22 * abre; // 34° aberta, como na arte
	// argolas: a lâmina que aponta p/ cima-esquerda (−a) tem a argola embaixo-direita
	const [hdX, hdY] = gira(0, 150, -a);
	const [heX, heY] = gira(0, 150, a);
	const maoE = {x: PIVO.x + heX - 6, y: PIVO.y + heY + 8};
	const maoD = {x: PIVO.x + hdX + 6, y: PIVO.y + hdY + 8};
	return (
		<g transform={`translate(500 760) scale(${1 + respira * 0.008}) translate(-500 -760)`}>
			{/* terno */}
			<path d="M140 790 L178 480 Q196 412 290 388 L425 340 L575 340 L710 388 Q804 412 822 480 L870 790 Z" fill={TERNO} />
			<path d="M178 480 Q190 600 240 690 L210 790 L140 790 Z" fill={TERNO_SOMBRA} opacity={0.6} />
			<path d="M822 480 Q810 600 760 690 L790 790 L870 790 Z" fill={TERNO_SOMBRA} opacity={0.6} />
			{/* camisa, colarinho e gravata */}
			<path d="M430 338 L500 410 L570 338 L565 520 L435 520 Z" fill="#FFFFFF" />
			<Gravata />
			<path d="M430 338 L470 372 L500 410 L462 418 Z" fill="#F1F2F4" />
			<path d="M570 338 L530 372 L500 410 L538 418 Z" fill="#F1F2F4" />
			{/* lapelas */}
			<path d="M425 340 L330 400 L362 462 L330 500 L470 700 L486 545 Z" fill={TERNO} stroke={TERNO_SOMBRA} strokeWidth={5} strokeLinejoin="round" />
			<path d="M575 340 L670 400 L638 462 L670 500 L530 700 L514 545 Z" fill={TERNO} stroke={TERNO_SOMBRA} strokeWidth={5} strokeLinejoin="round" />
			{/* broche da bandeira */}
			<g transform="translate(648 434)">
				<rect x={-15} y={-10} width={30} height={20} rx={2} fill={VERDE} />
				<path d="M0 -7 L12 0 L0 7 L-12 0 Z" fill={AMARELO} />
				<circle r={4} fill="#1F4B99" />
			</g>
			{/* faixa presidencial: ombro esquerdo → quadril direito */}
			<path d="M282 388 L346 352 L660 690 L604 730 Z" fill={VERDE} />
			<path d="M330 362 L348 354 L652 694 L634 706 Z" fill={AMARELO} />
			{/* pescoço e cabeça */}
			<path d="M450 280 L550 280 L548 350 Q500 372 452 350 Z" fill={PELE_SOMBRA} />
			<ellipse cx={393} cy={215} rx={17} ry={30} fill={PELE} />
			<ellipse cx={607} cy={215} rx={17} ry={30} fill={PELE} />
			<path d="M396 140 Q396 78 500 72 Q604 78 604 140 L600 240 Q590 302 500 314 Q410 302 400 240 Z" fill={PELE} />
			<path d="M392 210 Q378 84 468 62 Q560 48 602 96 Q618 132 608 210 Q604 150 572 128 Q520 140 462 126 Q430 122 410 150 Q400 172 392 210 Z" fill={CABELO} />
			{/* sobrancelhas fechadas, olhos (piscam uma vez), nariz, boca firme */}
			<path d="M428 178 L478 194" stroke={CABELO} strokeWidth={11} strokeLinecap="round" />
			<path d="M572 178 L522 194" stroke={CABELO} strokeWidth={11} strokeLinecap="round" />
			<ellipse cx={457} cy={214} rx={8} ry={8 * (1 - pisca * 0.9)} fill="#151515" />
			<ellipse cx={541} cy={214} rx={8} ry={8 * (1 - pisca * 0.9)} fill="#151515" />
			<path d="M502 214 L488 258 L507 260" stroke="#B98560" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
			<path d="M468 284 Q500 280 532 284" stroke="#8B5A44" strokeWidth={6} fill="none" strokeLinecap="round" />
			{/* tesoura: brilho atrás, as duas lâminas cruzadas no peito */}
			<g transform={`translate(${PIVO.x} ${PIVO.y})`}>
				<g filter="url(#tes-brilho)" opacity={0.55 + 0.45 * brilho}>
					<g transform={`rotate(${-a})`}><path d="M-30 0 L0 -420 L30 0 Z" fill="#FFFFFF" /></g>
					<g transform={`rotate(${a})`}><path d="M-30 0 L0 -420 L30 0 Z" fill="#FFFFFF" /></g>
				</g>
				<Lamina ang={a} />
				<Lamina ang={-a} frente />
				<circle r={17} fill={ACO_ESC} />
				<circle r={10} fill={ACO_LUZ} />
			</g>
			{/* braços: mangas até as argolas, punho branco, mãos fechadas */}
			{[
				{de: 'M205 500 Q215 650 ', m: maoE, lado: -1},
				{de: 'M795 500 Q785 650 ', m: maoD, lado: 1},
			].map(({de, m, lado}) => (
				<g key={lado}>
					<path d={`${de}${m.x + lado * 70} ${m.y + 10} L${m.x + lado * 30} ${m.y + 6}`} stroke={TERNO_SOMBRA} strokeWidth={112} fill="none" strokeLinecap="round" />
					<path d={`${de}${m.x + lado * 70} ${m.y + 10} L${m.x + lado * 30} ${m.y + 6}`} stroke={TERNO} strokeWidth={98} fill="none" strokeLinecap="round" />
					<rect x={m.x + lado * 38 - 14} y={m.y - 34} width={28} height={74} rx={8} fill="#FFFFFF" />
					<path d={`M${m.x - 42} ${m.y - 26} Q${m.x} ${m.y - 46} ${m.x + 42} ${m.y - 26} L${m.x + 44} ${m.y + 22} Q${m.x} ${m.y + 44} ${m.x - 44} ${m.y + 22} Z`} fill={PELE} />
					<path d={`M${m.x - 30} ${m.y - 6} L${m.x + 30} ${m.y - 6} M${m.x - 28} ${m.y + 12} L${m.x + 28} ${m.y + 12}`} stroke={PELE_SOMBRA} strokeWidth={4} strokeLinecap="round" />
				</g>
			))}
		</g>
	);
};

const Microfones: React.FC = () => (
	<g>
		{[
			{base: [372, TOPO_TRIBUNA], cab: [410, 652]},
			{base: [622, TOPO_TRIBUNA], cab: [580, 652]},
		].map(({base, cab}, i) => {
			const ang = (Math.atan2(cab[0] - base[0], base[1] - cab[1]) * 180) / Math.PI;
			return (
				<g key={i}>
					<path d={`M${base[0]} ${base[1]} L${cab[0]} ${cab[1] + 26}`} stroke="#141414" strokeWidth={7} strokeLinecap="round" />
					<g transform={`translate(${cab[0]} ${cab[1]}) rotate(${ang})`}>
						<ellipse rx={22} ry={32} fill="#2B2B2B" />
						<ellipse cx={-6} cy={-10} rx={6} ry={12} fill="#FFFFFF" opacity={0.12} />
					</g>
				</g>
			);
		})}
	</g>
);

const Tribuna: React.FC<{t: number}> = ({t}) => (
	<g>
		<rect x={75} y={TOPO_TRIBUNA} width={875} height={50} rx={8} fill={MADEIRA_ESC} />
		<path d="M105 815 L918 815 L896 1440 L186 1440 Z" fill={MADEIRA} />
		<path d="M105 815 L172 815 L222 1440 L186 1440 Z" fill={MADEIRA_LUZ} />
		<rect x={155} y={1440} width={705} height={42} rx={6} fill={MADEIRA_ESC} />
		{/* selo "?": é o boato, não um discurso de verdade */}
		<g transform={`translate(510 1048) rotate(${2.5 * Math.sin(t * 2)})`}>
			<circle r={142} fill={AMARELO} stroke="#C9971A" strokeWidth={10} />
			<text x={0} y={66} textAnchor="middle" fontSize={200} fontWeight={800} fill="#111111" fontFamily="inherit">?</text>
		</g>
	</g>
);

export const Tesoura: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const t = frame / 60;
	// fecha em cada corte: abre → fecha em ~0,15 s e reabre
	const fecha = Math.max(...CORTES.map((c) => {
		const d = t - c;
		return d > -0.12 && d < 0.2 ? 1 - Math.min(1, Math.abs(d - 0.02) / 0.14) : 0;
	}));
	const tranco = fecha * 12; // o corpo acompanha o golpe
	const respira = Math.sin(t * 3.2);
	const pisca = Math.max(0, 1 - Math.abs(t - 1.45) / 0.06); // uma piscada no meio
	// a tribuna sobe primeiro; ele sobe de trás dela logo depois
	const eTrib = entra(frame, 0, 0.55);
	const eBon = entra(frame, 0.2, 0.8);
	const eGlow = entra(frame, 0.35, 0.8);
	return (
		<Cena tema={tema} derivaPx={-10}>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<defs>
					<filter id="tes-brilho" x="-60%" y="-30%" width="220%" height="160%">
						<feGaussianBlur stdDeviation={18} />
					</filter>
					<radialGradient id="tes-halo" cx="0.5" cy="0.5" r="0.5">
						<stop offset="0" stopColor="#FFE9C7" stopOpacity={0.5} />
						<stop offset="0.55" stopColor="#FFE9C7" stopOpacity={0.16} />
						<stop offset="1" stopColor="#FFE9C7" stopOpacity={0} />
					</radialGradient>
					<radialGradient id="tes-halo-trib" cx="0.5" cy="0.5" r="0.5">
						<stop offset="0" stopColor="#E7A160" stopOpacity={0.28} />
						<stop offset="1" stopColor="#E7A160" stopOpacity={0} />
					</radialGradient>
					<clipPath id="tes-atras">
						<rect x={0} y={0} width={1024} height={TOPO_TRIBUNA + 10} />
					</clipPath>
				</defs>
				<g transform={`translate(${DX} ${DY + (1 - eTrib) * 560})`}>
					{/* brilho atrás dele, como na arte */}
					<ellipse cx={500} cy={330} rx={420 + 15 * Math.sin(t * 2.4)} ry={360} fill="url(#tes-halo)" opacity={eGlow} />
					<ellipse cx={512} cy={1120} rx={560} ry={460} fill="url(#tes-halo-trib)" opacity={eTrib} />
					{/* ele sai de trás da tribuna: tudo abaixo do tampo fica escondido */}
					<g clipPath="url(#tes-atras)">
						<g transform={`translate(0 ${(1 - eBon) * 640 + tranco}) rotate(${1.2 * Math.sin(t * 1.3)} 500 760)`}>
							<Boneco abre={1 - fecha} respira={respira} pisca={pisca} brilho={fecha} />
						</g>
					</g>
					{/* microfones presos na tribuna, na frente das mãos */}
					<Microfones />
					<Tribuna t={t} />
				</g>
			</svg>
		</Cena>
	);
};
