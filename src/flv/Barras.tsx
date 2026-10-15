// FLV-D-Imposto · cap. 4 · 01:07,080 → 01:12,800
// "Baixar o imposto do consumo, hoje projetado em 30%. A média dos países ricos é 19."
// Duas barras lado a lado. A do Brasil leva o rótulo "projeção" (obrigatório:
// é a estimativa do próprio plano; o Comitê Gestor do IBS fala em 27,91%).
//   título entra em "Baixar o" ......... 01:07,080
//   Brasil sobe em "em 30%" ............ 01:09,460
//   OCDE sobe em "média dos" ........... 01:10,420
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COR, EXPO_OUT, f, limita, type Tema} from '../shared/design';
import {Cena, Odometro, sobe, sombra, tinta, tintaMeta} from './comum';
import {Sons} from './som';

export const IMPOSTO = {inicio: 67.08, fim: 72.8};

const T_BRASIL = 69.46 - IMPOSTO.inicio; // onset do cue "em 30%. A"
const T_OCDE = 70.42 - IMPOSTO.inicio; // onset do cue "média dos"
const BASE_Y = 1560;
const ALTURA_100 = 1800; // px que 100% ocuparia (30% → 540 px)

export const Barras: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const cor = tinta(tema);
	// o título espera o card 4/9 sair do centro (~68,0)
	const eT = sobe(frame, f(1.0), f(0.55));
	return (
		<Cena tema={tema}>
			<Sons
				cues={[
					{t: 0, som: 'whoosh_rapido', vol: 0.7},
					{t: T_BRASIL, som: 'whoosh_02', vol: 0.75, dura: 1.0},
					{t: T_OCDE, som: 'whoosh_02', vol: 0.75, dura: 1.0},
				]}
			/>
			<div
				style={{
					position: 'absolute',
					left: 96,
					right: 96,
					top: 760,
					textAlign: 'center',
					fontSize: 58,
					fontWeight: 800,
					color: cor,
					textShadow: sombra(tema),
					opacity: eT,
					transform: `translateY(${((1 - eT) * 30).toFixed(2)}px)`,
					textTransform: 'uppercase',
				}}
			>
				Imposto do consumo
			</div>
			<Barra tema={tema} x={230} t={T_BRASIL} pct={30} cor={COR.marca} nome="Brasil" sub="projeção" />
			<Barra tema={tema} x={600} t={T_OCDE} pct={19} cor={tema === 'claro' ? '#C9CDD2' : 'rgba(255,255,255,0.55)'} nome="Países ricos" sub="média OCDE" />
			<div
				style={{
					position: 'absolute',
					left: 150,
					width: 780,
					top: BASE_Y,
					height: 4,
					backgroundColor: cor,
					opacity: 0.5 * eT,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: BASE_Y + 170,
					textAlign: 'center',
					fontSize: 30,
					fontWeight: 500,
					letterSpacing: '0.08em',
					textTransform: 'uppercase',
					color: tintaMeta(tema),
					opacity: sobe(frame, f(0.4), f(0.5)),
				}}
			>
				Plano de governo · TSE
			</div>
		</Cena>
	);
};

const Barra: React.FC<{tema: Tema; x: number; t: number; pct: number; cor: string; nome: string; sub: string}> = ({
	tema,
	x,
	t,
	pct,
	cor,
	nome,
	sub,
}) => {
	const frame = useCurrentFrame();
	const ini = f(t);
	const p = EXPO_OUT(limita((frame - ini) / f(1.0)));
	const altura = (ALTURA_100 * pct) / 100;
	const eN = sobe(frame, ini - f(0.25), f(0.45));
	const larg = 250;
	return (
		<>
			{/* coluna */}
			<div
				style={{
					position: 'absolute',
					left: x,
					width: larg,
					top: BASE_Y - altura * p,
					height: altura * p,
					backgroundColor: cor,
					borderRadius: '12px 12px 0 0',
				}}
			/>
			{/* número em cima da coluna, rodando no hodômetro */}
			<div
				style={{
					position: 'absolute',
					left: x - 40,
					width: larg + 80,
					top: BASE_Y - altura * p - 150,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'baseline',
					color: tinta(tema),
					textShadow: sombra(tema),
					opacity: eN,
				}}
			>
				<Odometro valor={String(pct)} px={128} cor={tinta(tema)} inicio={ini} dur={f(1.0)} sombraTexto={sombra(tema)} />
				<span style={{fontSize: 80, fontWeight: 800}}>%</span>
			</div>
			{/* nome embaixo */}
			<div
				style={{
					position: 'absolute',
					left: x - 60,
					width: larg + 120,
					top: BASE_Y + 22,
					textAlign: 'center',
					color: tinta(tema),
					textShadow: sombra(tema),
					opacity: eN,
					transform: `translateY(${((1 - eN) * 20).toFixed(2)}px)`,
				}}
			>
				<div style={{fontSize: 46, fontWeight: 800, textTransform: 'uppercase', lineHeight: 1.05}}>{nome}</div>
				<div style={{fontSize: 34, fontWeight: 500, color: tintaMeta(tema), marginTop: 6}}>{sub}</div>
			</div>
		</>
	);
};
