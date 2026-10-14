// FLV-E-Trem · cap. 7 · 01:46,880 → 01:51,480
// "Um trem ligando sete capitais no Nordeste, 1400 quilômetros de trilhos."
// As sete capitais na ordem do plano (Salvador → Fortaleza), posicionadas pela
// latitude/longitude real em projeção equirretangular. A linha entre elas é
// ESQUEMÁTICA (reta de capital a capital) e a peça diz isso na tela: o plano
// não publica traçado.
//   linha começa em "trem" ......... 01:46,880 (cue "Um trem")
//   "7 CAPITAIS" em "sete" ......... 01:47,760
//   "1.400 KM" em "1400" ........... 01:49,520
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COR, EXPO_OUT, INOUT, f, limita, type Tema} from '../shared/design';
import {Cena, Odometro, sobe, sombra, tinta, tintaMeta} from './comum';

export const TREM = {inicio: 106.88, fim: 111.48};

// lat, lon (graus)
const CAPITAIS: {nome: string; lat: number; lon: number}[] = [
	{nome: 'Salvador', lat: -12.97, lon: -38.5},
	{nome: 'Aracaju', lat: -10.91, lon: -37.07},
	{nome: 'Maceió', lat: -9.67, lon: -35.74},
	{nome: 'Recife', lat: -8.05, lon: -34.88},
	{nome: 'João Pessoa', lat: -7.12, lon: -34.86},
	{nome: 'Natal', lat: -5.79, lon: -35.21},
	{nome: 'Fortaleza', lat: -3.73, lon: -38.53},
];

// projeção: 1° = ESC px; centro do conjunto no quadro
const ESC = 100;
const LAT0 = -8.35;
const LON0 = -36.7;
const CX = 600;
const CY = 1180;
const COS = Math.cos((8.35 * Math.PI) / 180);
const proj = (lat: number, lon: number) => ({x: CX + (lon - LON0) * ESC * COS, y: CY - (lat - LAT0) * ESC});

const PONTOS = CAPITAIS.map((c) => ({...c, ...proj(c.lat, c.lon)}));
const SEGS = PONTOS.slice(1).map((p, i) => Math.hypot(p.x - PONTOS[i].x, p.y - PONTOS[i].y));
const TOTAL_PX = SEGS.reduce((a, b) => a + b, 0);

const T_SETE = 107.76 - TREM.inicio;
const T_KM = 109.52 - TREM.inicio;

export const Trem: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const cor = tinta(tema);
	// a linha desenha de 0,1 s a 2,6 s
	const pLinha = INOUT(limita((frame - f(0.1)) / f(2.5)));
	const desenhado = pLinha * TOTAL_PX;

	// quando a linha chega em cada capital
	let acum = 0;
	const chegada = PONTOS.map((_, i) => {
		if (i > 0) acum += SEGS[i - 1];
		return acum;
	});

	const d = PONTOS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
	const eS = sobe(frame, f(T_SETE), f(0.5));
	const eK = sobe(frame, f(T_KM), f(0.5));
	const eNota = sobe(frame, f(0.6), f(0.5));

	return (
		<Cena tema={tema}>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
				{/* trilho: a linha cheia com dormentes */}
				<path
					d={d}
					fill="none"
					stroke={COR.marca}
					strokeWidth={10}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeDasharray={TOTAL_PX}
					strokeDashoffset={TOTAL_PX - desenhado}
				/>
				{PONTOS.map((p, i) => {
					const e = EXPO_OUT(limita((desenhado - chegada[i] + 20) / 60));
					const r = 16 * e;
					return (
						<g key={i} opacity={e}>
							<circle cx={p.x} cy={p.y} r={r + 7} fill={tema === 'claro' ? '#FFFFFF' : '#15171A'} />
							<circle cx={p.x} cy={p.y} r={r} fill={COR.marca} />
						</g>
					);
				})}
			</svg>
			{PONTOS.map((p, i) => {
				const e = EXPO_OUT(limita((desenhado - chegada[i] + 40) / 70));
				// rótulo à esquerda (o litoral fica à direita)
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: p.x - 440,
							width: 400,
							top: p.y - 26,
							textAlign: 'right',
							fontSize: 44,
							fontWeight: 700,
							color: cor,
							textShadow: sombra(tema),
							opacity: e,
							transform: `translateX(${((1 - e) * 20).toFixed(2)}px)`,
						}}
					>
						{p.nome}
					</div>
				);
			})}
			{/* 7 CAPITAIS e 1.400 KM, no alto à direita (fundo livre, longe das capitais) */}
			<div style={{position: 'absolute', left: 720, top: 300, color: cor, textShadow: sombra(tema)}}>
				<div style={{display: 'flex', flexDirection: 'column', opacity: eS, transform: `translateY(${((1 - eS) * 30).toFixed(2)}px)`}}>
					<Odometro valor="7" px={110} cor={cor} inicio={f(T_SETE)} dur={f(0.8)} sombraTexto={sombra(tema)} />
					<span style={{fontSize: 40, fontWeight: 800, textTransform: 'uppercase', marginTop: 4}}>capitais</span>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						marginTop: 18,
						opacity: eK,
						transform: `translateY(${((1 - eK) * 30).toFixed(2)}px)`,
					}}
				>
					<Odometro valor="1.400" px={110} cor={cor} inicio={f(T_KM)} dur={f(1.0)} sombraTexto={sombra(tema)} />
					<span style={{fontSize: 40, fontWeight: 800, textTransform: 'uppercase', marginTop: 4}}>km de trilhos</span>
				</div>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 1700,
					textAlign: 'center',
					fontSize: 30,
					fontWeight: 500,
					letterSpacing: '0.08em',
					textTransform: 'uppercase',
					color: tintaMeta(tema),
					opacity: eNota,
				}}
			>
				Traçado esquemático · Plano de governo · TSE
			</div>
		</Cena>
	);
};
