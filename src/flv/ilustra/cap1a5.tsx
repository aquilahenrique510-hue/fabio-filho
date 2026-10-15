// V2 — ILUSTRAÇÕES DAS PROPOSTAS, CAPÍTULOS 1 A 5.
// Cada peça: janela exata da fala no SRT, rótulo literal, página do plano.
// Todos os tempos estão em segundos NO SRT (a Peca converte).
import React from 'react';
import {interpolate} from 'remotion';
import {ALERTA, APOIO, COR, FAVOR, f, par, type Tema} from '../../shared/design';
import {Odometro} from '../comum';
import {whooshPara} from '../som';
import {Am, Casa, Celular, Moeda, PELE, Papel, Peca, Pessoa, Risco, Seta, entra, rel, vira} from './base';

type P = {tema: Tema};

// ── CAP. 1 · "Facção passa a ser tratada como terrorismo." 00:27,680 → 00:29,900 · pág. 13
export const FACCAO = {inicio: 27.68, fim: 29.9};
export const Faccao: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={FACCAO.inicio}
		fonte="Plano de governo · pág. 13"
		cues={[
			{t: 27.68, som: whooshPara(0.6), vol: 0.75},
			{t: 29.36, som: 'carimbo', vol: 0.9},
		]}
		desenho={({frame, cor}) => {
			const t = (s: number) => s - FACCAO.inicio;
			const carimbo = entra(frame, t(29.36), 0.12);
			return (
				<>
					{[-1, 0, 1].map((i) => {
						const e = entra(frame, 0.1 + (i + 1) * 0.12, 0.5);
						return (
							<g key={i} transform={`translate(${540 + i * 190} ${1150 + (1 - e) * 120})`} opacity={e}>
								<circle cx={0} cy={0} r={66} fill={APOIO} stroke={cor} strokeWidth={4} />
								{/* máscara: faixa nos olhos */}
								<rect x={-66} y={-18} width={132} height={30} rx={14} fill="#15171A" />
								<rect x={-80} y={76} width={160} height={230} rx={60} fill={APOIO} stroke={cor} strokeWidth={4} />
							</g>
						);
					})}
					<g transform={`translate(540 1250) rotate(-8) scale(${1.4 - 0.4 * carimbo})`} opacity={carimbo}>
						<rect x={-330} y={-70} width={660} height={140} rx={16} fill="none" stroke={par(ALERTA, tema)} strokeWidth={12} />
						<text x={0} y={36} textAnchor="middle" fontSize={98} fontWeight={800} fill={par(ALERTA, tema)} fontFamily="inherit">
							TERRORISMO
						</text>
					</g>
				</>
			);
		}}
	/>
);

// ── CAP. 2 · "Vale creche na rede particular quando faltar vaga pública." 00:46,000 → 00:49,420 · pág. 21
export const CRECHE = {inicio: 46.0, fim: 49.42};
export const Creche: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={CRECHE.inicio}
		rotulo={<>Vale <Am>creche</Am> na rede particular</>}
		tRotulo={46.96} // o card 2/9 vai para o canto em ~46,9
		fonte="Plano de governo · pág. 21"
		cues={[
			{t: 46.0, som: whooshPara(0.5), vol: 0.75},
			{t: 46.96, som: 'pop_1', vol: 0.7},
			{t: 47.9, som: whooshPara(1.0), vol: 0.7},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - CRECHE.inicio;
			const e = entra(frame, 0, 0.5);
			const anda = vira(frame, t(47.9), 1.2); // a criança caminha até a porta
			const porta = entra(frame, t(46.96), 0.4);
			return (
				<g opacity={e}>
					{/* a creche */}
					<g transform="translate(720 1130)">
						<rect x={-170} y={0} width={340} height={260} rx={14} fill={COR.marca} />
						<path d="M-200 0 L0 -120 L200 0 Z" fill={par(FAVOR, tm)} />
						<circle cx={-90} cy={80} r={30} fill="#FFFFFF" />
						<circle cx={90} cy={80} r={30} fill="#FFFFFF" />
						<rect x={-44} y={140 - 0} width={88} height={120} rx={8} fill={cor} opacity={0.35} />
						<rect x={-44} y={140} width={88 * (1 - porta * 0.85)} height={120} rx={8} fill={APOIO} />
					</g>
					{/* mãe e criança indo para a porta */}
					<g transform={`translate(${interpolate(anda, [0, 1], [0, 300])} 0)`}>
						<Pessoa x={260} y={1150} s={0.85} roupa={par(ALERTA, tm)} cabelo="longo" />
						<g transform="translate(380 1280) scale(0.55)">
							<circle cx={0} cy={0} r={66} fill={PELE} />
							<path d="M-66 -8 Q-62 -78 0 -80 Q62 -78 66 -8 Q40 -44 0 -44 Q-40 -44 -66 -8 Z" fill="#3B2A22" />
							<circle cx={-22} cy={2} r={7} fill="#1A1A1A" />
							<circle cx={22} cy={2} r={7} fill="#1A1A1A" />
							<path d="M-20 28 Q0 44 20 28" stroke="#7A2E2E" strokeWidth={6} fill="none" strokeLinecap="round" />
							<rect x={-70} y={76} width={140} height={190} rx={56} fill="#7FB6E8" />
						</g>
					</g>
				</g>
			);
		}}
	/>
);

// ── CAP. 2 · "Escritura da casa no nome da mulher." 00:49,420 → 00:51,740 · pág. 20
export const ESCRITURA = {inicio: 49.42, fim: 51.74};
export const Escritura: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={ESCRITURA.inicio}
		rotulo={<>Escritura da casa <Am>no nome da mulher</Am></>}
		tRotulo={49.6}
		fonte="Plano de governo · pág. 20"
		cues={[
			{t: 49.42, som: whooshPara(0.5), vol: 0.75},
			{t: 50.5, som: whooshPara(0.6), vol: 0.7},
			{t: 51.24, som: 'carimbo', vol: 0.8},
		]}
		desenho={({frame, tema: tm}) => {
			const t = (s: number) => s - ESCRITURA.inicio;
			const e = entra(frame, 0, 0.5);
			const vai = vira(frame, t(50.5), 0.6); // o papel vai até a mão dela
			const selo = entra(frame, t(51.24), 0.15);
			return (
				<g opacity={e}>
					<Casa x={330} y={1180} s={1.1} cor={COR.marca} telhado={par(ALERTA, tm)} />
					<Pessoa x={790} y={1120} s={0.95} roupa={par(FAVOR, tm)} cabelo="longo" />
					<g transform={`translate(${interpolate(vai, [0, 1], [340, 640])} ${interpolate(vai, [0, 1], [1080, 1270])})`}>
						<Papel x={0} y={0} s={0.8} rot={-6} marca />
						{/* selo com a mulher no papel */}
						<g transform={`translate(30 40) scale(${1.4 - 0.4 * selo})`} opacity={selo}>
							<circle r={34} fill={par(FAVOR, tm)} />
							<circle cy={-8} r={12} fill="#FFFFFF" />
							<path d="M-18 22 Q0 0 18 22 Z" fill="#FFFFFF" />
						</g>
					</g>
				</g>
			);
		}}
	/>
);

// ── CAP. 3 · "Cem por cento serviços federais no celular." 00:57,820 → 01:00,280 · pág. 25
// A pág. 25 diz "100% dos serviços públicos do Governo Federal PASSÍVEIS DE
// DIGITALIZAÇÃO" — a ressalva vai na linha de fonte (dossiê, alerta).
export const SERVICOS = {inicio: 57.82, fim: 60.28};
export const Servicos: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={SERVICOS.inicio}
		rotulo={
			<>
				<span style={{display: 'inline-flex', alignItems: 'baseline', color: COR.marca}}>
					<Odometro valor="100" px={110} cor={COR.marca} inicio={f(0.6)} dur={f(1.0)} />
					<span style={{fontSize: 80, fontWeight: 800}}>%</span>
				</span>
				<br />
				serviços federais no celular
			</>
		}
		tRotulo={58.4} // o card 3/9 vai para o canto em ~58,4
		fonte="pág. 25 · serviços passíveis de digitalização"
		cues={[
			{t: 57.82, som: 'chain', vol: 0.7},
			{t: 58.8, som: whooshPara(1.0), vol: 0.7},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - SERVICOS.inicio;
			const some = vira(frame, t(58.8), 1.0); // a fila encolhe e entra no celular
			const cel = entra(frame, t(58.6), 0.5);
			return (
				<>
					{[0, 1, 2, 3, 4].map((i) => {
						const x = interpolate(some, [0, 1], [180 + i * 120, 760]);
						const s = interpolate(some, [0, 1], [0.6, 0.1]);
						return <Pessoa key={i} x={x} y={1150} s={s} roupa={i % 2 ? par(ALERTA, tm) : APOIO} humor={0} op={1 - some * 0.9} />;
					})}
					<g opacity={cel} transform={`translate(0 ${(1 - cel) * 60})`}>
						<Celular x={780} y={1220} s={1.3} cor={cor} />
						<path d="M740 1215 L770 1245 L825 1180" stroke={par(FAVOR, tm)} strokeWidth={16} fill="none" strokeLinecap="round" strokeLinejoin="round"
							strokeDasharray={140} strokeDashoffset={140 * (1 - some)} />
					</g>
				</>
			);
		}}
	/>
);

// ── CAP. 3 · "Seu histórico de saúde no CPF. Se o governo já tem informação, não vai pedir de novo."
// 01:00,280 → 01:05,140 · págs. 25 e 26
export const SAUDE = {inicio: 60.28, fim: 65.14};
export const Saude: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={SAUDE.inicio}
		rotulo={<>Histórico de <Am>saúde no CPF</Am></>}
		tRotulo={60.4}
		fonte="Plano de governo · págs. 25 e 26"
		cues={[
			{t: 60.28, som: whooshPara(0.5), vol: 0.75},
			{t: 61.34, som: 'pop_1', vol: 0.7},
			{t: 63.42, som: whooshPara(0.8), vol: 0.7},
			{t: 64.26, som: 'carimbo', vol: 0.8},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - SAUDE.inicio;
			const e = entra(frame, 0, 0.5);
			const cor2 = entra(frame, t(61.34), 0.4);
			const pilha = entra(frame, t(62.2), 0.5);
			const voa = vira(frame, t(63.42), 0.8);
			const x = entra(frame, t(64.26), 0.3);
			return (
				<g opacity={e}>
					{/* cartão CPF com coração */}
					<g transform="translate(330 1230)">
						<rect x={-170} y={-110} width={340} height={220} rx={22} fill="#FFFFFF" stroke={cor} strokeWidth={4} />
						<rect x={-140} y={-80} width={110} height={24} rx={12} fill={par(FAVOR, tm)} />
						<rect x={-140} y={-36} width={170} height={16} rx={8} fill="#C9CDD2" />
						<rect x={-140} y={-6} width={130} height={16} rx={8} fill="#C9CDD2" />
						<g transform={`translate(95 30) scale(${cor2})`}>
							<path d="M0 30 C-60 -10 -40 -60 0 -30 C40 -60 60 -10 0 30 Z" fill={par(ALERTA, tm)} />
						</g>
					</g>
					{/* a pilha de papéis que não precisa mais */}
					<g opacity={pilha * (1 - voa)} transform={`translate(${voa * 260} ${-voa * 300})`}>
						{[0, 1, 2].map((i) => <Papel key={i} x={760 + i * 8} y={1240 - i * 18} s={0.75} rot={-8 + i * 7} />)}
					</g>
					<Risco x={780} y={1220} r={120} p={x} cor={par(ALERTA, tm)} />
				</g>
			);
		}}
	/>
);

// ── CAP. 4 · "Dinheiro de programa social não vai pra bet." 01:14,200 → 01:16,980 · pág. 33
export const BET = {inicio: 74.2, fim: 76.98};
export const Bet: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={BET.inicio}
		rotulo={<>Dinheiro de programa social <Am>não vai pra bet</Am></>}
		tRotulo={75.18}
		fonte="Plano de governo · pág. 33"
		cues={[
			{t: 74.2, som: whooshPara(0.9), vol: 0.75},
			{t: 75.6, som: 'carimbo', vol: 0.9},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - BET.inicio;
			const e = entra(frame, 0, 0.5);
			const vai = vira(frame, 0.2, 1.2);
			const tranca = entra(frame, t(75.6), 0.2);
			const volta = vira(frame, t(75.7), 0.6);
			return (
				<g opacity={e}>
					{/* o celular da aposta: dados na tela */}
					<g>
						<Celular x={800} y={1230} s={1.2} cor={cor} tela="#2A2E33" />
						<rect x={760} y={1150} width={46} height={46} rx={8} fill={par(ALERTA, tm)} />
						<rect x={812} y={1210} width={46} height={46} rx={8} fill={par(ALERTA, tm)} />
						<circle cx={783} cy={1173} r={6} fill="#FFFFFF" />
						<circle cx={835} cy={1233} r={6} fill="#FFFFFF" />
					</g>
					{/* as moedas vão e batem na tranca */}
					{[0, 1, 2].map((i) => {
						const p = Math.min(vai, 0.62) - volta * 0.5;
						return <Moeda key={i} x={240 + p * 520 - i * 50} y={1240 - i * 30} r={34} />;
					})}
					{/* cadeado */}
					<g transform={`translate(640 1240) scale(${1.4 - 0.4 * tranca})`} opacity={tranca}>
						<path d="M-40 -20 V-60 A40 40 0 0 1 40 -60 V-20" stroke={cor} strokeWidth={14} fill="none" />
						<rect x={-62} y={-24} width={124} height={100} rx={16} fill={par(FAVOR, tm)} />
					</g>
				</g>
			);
		}}
	/>
);

// ── CAP. 5 · "Aluno com nota boa recebe pra dar reforço aos colegas." 01:18,580 → 01:21,900 · pág. 35
export const REFORCO = {inicio: 78.58, fim: 81.9};
export const Reforco: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={REFORCO.inicio}
		rotulo={<>Aluno com nota boa <Am>recebe</Am> pra dar reforço aos colegas</>}
		tRotulo={79.2} // o card 5/9 vai para o canto em ~79,2
		fonte="Plano de governo · pág. 35"
		cues={[
			{t: 78.58, som: whooshPara(0.5), vol: 0.75},
			{t: 79.0, som: 'pop_1', vol: 0.7},
			{t: 79.46, som: 'pop_2', vol: 0.7},
			{t: 80.36, som: whooshPara(0.6), vol: 0.7},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - REFORCO.inicio;
			const e = entra(frame, 0, 0.5);
			const nota = entra(frame, t(79.0), 0.3);
			const moeda = entra(frame, t(79.46), 0.4);
			const balao = entra(frame, t(80.36), 0.4);
			return (
				<g opacity={e}>
					<Pessoa x={330} y={1130} s={0.85} roupa={COR.marca} />
					<Pessoa x={760} y={1150} s={0.8} roupa={APOIO} humor={0.3 + 0.7 * balao} />
					{/* estrela da nota boa */}
					<g transform={`translate(330 960) scale(${nota})`}>
						<path d="M0 -44 L13 -14 L44 -12 L20 8 L28 40 L0 22 L-28 40 L-20 8 L-44 -12 L-13 -14 Z" fill={COR.marca} stroke={cor} strokeWidth={3} />
					</g>
					<Moeda x={440} y={1120 - moeda * 40} r={30} op={moeda} />
					{/* balão de explicação para o colega */}
					<g transform={`translate(540 1010) scale(${balao})`} opacity={balao}>
						<rect x={-90} y={-60} width={180} height={110} rx={24} fill="#FFFFFF" />
						<path d="M-50 50 L-70 90 L-20 50 Z" fill="#FFFFFF" />
						<text x={0} y={18} textAnchor="middle" fontSize={56} fontWeight={800} fill="#15171A" fontFamily="inherit">a+b</text>
					</g>
				</g>
			);
		}}
	/>
);

// ── CAP. 5 · "Faculdade que só se paga depois do emprego." 01:21,900 → 01:24,480 · pág. 37
export const FACULDADE = {inicio: 81.9, fim: 84.48};
export const Faculdade: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={FACULDADE.inicio}
		rotulo={<>Faculdade que só se paga <Am>depois do emprego</Am></>}
		tRotulo={82.0}
		fonte="Plano de governo · pág. 37"
		cues={[
			{t: 81.9, som: whooshPara(0.5), vol: 0.75},
			{t: 83.2, som: 'pop_1', vol: 0.7},
			{t: 83.75, som: 'pop_2', vol: 0.7},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const t = (s: number) => s - FACULDADE.inicio;
			const e = entra(frame, 0, 0.5);
			const cracha = entra(frame, t(83.2), 0.4);
			const paga = entra(frame, t(83.75), 0.4);
			return (
				<g opacity={e}>
					<Pessoa x={540} y={1120} s={0.95} roupa={par(FAVOR, tm)} />
					{/* capelo */}
					<g transform="translate(540 1040)">
						<path d="M-110 0 L0 -50 L110 0 L0 50 Z" fill="#15171A" stroke={cor} strokeWidth={3} />
						<line x1={90} y1={8} x2={100} y2={70} stroke={COR.marca} strokeWidth={8} />
					</g>
					{/* crachá do emprego */}
					<g transform={`translate(540 ${1300 + (1 - cracha) * 40})`} opacity={cracha}>
						<rect x={-60} y={-40} width={120} height={84} rx={12} fill="#FFFFFF" stroke={cor} strokeWidth={4} />
						<circle cx={-28} cy={0} r={18} fill={PELE} />
						<rect x={0} y={-12} width={44} height={10} rx={5} fill="#C9CDD2" />
						<rect x={0} y={8} width={34} height={10} rx={5} fill="#C9CDD2" />
					</g>
					{/* só então a parcela */}
					<Seta x1={660} y1={1300} x2={820} y2={1300} cor={cor} p={paga} />
					<Moeda x={860} y={1300} r={34} op={paga} />
				</g>
			);
		}}
	/>
);

// ── CAP. 5 · "Remédio entregue em casa." 01:24,480 → 01:26,620 · pág. 38
export const REMEDIO = {inicio: 84.48, fim: 86.62};
export const Remedio: React.FC<P> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={REMEDIO.inicio}
		rotulo={<>Remédio <Am>entregue em casa</Am></>}
		tRotulo={84.6}
		fonte="Plano de governo · pág. 38"
		cues={[
			{t: 84.48, som: whooshPara(1.0), vol: 0.75},
			{t: 85.9, som: 'pop_1', vol: 0.75},
		]}
		desenho={({frame, tema: tm}) => {
			const t = (s: number) => s - REMEDIO.inicio;
			const e = entra(frame, 0, 0.4);
			const viaja = vira(frame, 0.1, 1.3);
			const chega = entra(frame, t(85.9), 0.3);
			return (
				<g opacity={e}>
					<Casa x={760} y={1170} s={1.1} cor={COR.marca} telhado={par(FAVOR, tm)} />
					<g transform={`translate(${interpolate(viaja, [0, 1], [180, 640])} ${1310 - Math.sin(viaja * Math.PI) * 120}) scale(${1 + 0.1 * chega})`}>
						<rect x={-60} y={-46} width={120} height={92} rx={12} fill="#FFFFFF" />
						<rect x={-12} y={-32} width={24} height={64} fill={par(ALERTA, tm)} />
						<rect x={-32} y={-12} width={64} height={24} fill={par(ALERTA, tm)} />
					</g>
				</g>
			);
		}}
	/>
);
