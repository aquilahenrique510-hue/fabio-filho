// NK na Bahia (srt/NK_na_Bahia.srt, 01:49) — as peças, em ordem de fala.
// Tempos = onsets de cue do SRT, em segundos. Apuração em srt/NK_na_Bahia_APURACAO.md.
// Decisões dele (15/10/2026): "5 das 10" no lugar de "seis"; só soja e algodão;
// pobreza como "IBGE 2021" (é extrema pobreza); "+20 mil empresas" SEM fonte.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Cena, sombra, tinta, tintaMeta} from '../flv/comum';
import {Sons, whooshPara, type Cue} from '../flv/som';
import {BAHIA, CAIXA_BA, LEM, UFS} from './mapa';
import {
	ALERTA, Algodao, Barra, COR, Despertador, Eixo, Escudo, Fonte, Gente, INOUT, Livro, Loja, Maleta,
	Numero, Pino, Porta, Predio, Soja, Texto, Trofeu, entra, f, par, rel, vira, type Tema,
} from './kit';

type Janela = {inicio: number; fim: number};
const cues = (j: Janela, l: Cue[]) => l.map((c) => ({...c, t: c.t - j.inicio}));
const BRANCO = (tema: Tema) => (tema === 'claro' ? '#15171A' : '#FFFFFF');

// ─────────────────────────────────────────────────────────────────────────────
// BAH-A · "Muitos falam da Bahia querendo comparar com o resto do Brasil, mas
// hoje não, hoje eu quero comparar a Bahia com a própria Bahia."
//   Brasil desenha e a Bahia acende ...... 00:00,480 ("da Bahia")
//   o resto do Brasil pulsa .............. 00:02,200 ("resto do")
//   o resto apaga ........................ 00:03,000 ("hoje não")
//   a Bahia vem ao centro ................ 00:04,100 ("a Bahia")
//   vira DUAS Bahias, frente a frente .... 00:04,680 ("própria Bahia")
// ─────────────────────────────────────────────────────────────────────────────
export const ABERTURA: Janela = {inicio: 0.28, fim: 6.0};
export const Abertura: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - ABERTURA.inicio;
	const eMapa = entra(frame, 0, 0.6);
	const eBa = entra(frame, r(0.48), 0.4);
	const pulsa = Math.max(0, Math.sin(Math.PI * rel(frame, r(2.2), 0.6)));
	const apaga = vira(frame, r(3.0), 0.5);
	const centro = vira(frame, r(4.1), 0.55);
	const duas = vira(frame, r(4.68), 0.55);
	const s0 = 1.45;
	const s1 = 3.4;
	const cx = (CAIXA_BA.x0 + CAIXA_BA.x1) / 2;
	const cy = (CAIXA_BA.y0 + CAIXA_BA.y1) / 2;
	const brX = 540 - 306.5 * s0;
	const brY = 1000 - 319.5 * s0;
	// Bahia: posição no mapa → centro do quadro, e depois duas cópias
	const s = s0 + (s1 - s0) * centro - 1.1 * duas;
	const px = brX + cx * s0 + (540 - (brX + cx * s0)) * centro;
	const py = brY + cy * s0 + (1000 - (brY + cy * s0)) * centro;
	const amarelo = COR.marca;
	const cinza = tema === 'claro' ? '#C9CDD2' : 'rgba(255,255,255,0.32)';
	const bahia = (dx: number, op: number, rot = 0) => (
		<g transform={`translate(${px + dx} ${py}) rotate(${rot}) scale(${s}) translate(${-cx} ${-cy})`} opacity={op}>
			<path d={BAHIA} fill={amarelo} stroke="#15171A" strokeWidth={1.2 / s * 2} />
		</g>
	);
	return (
		<Cena tema={tema}>
			<Sons cues={cues(ABERTURA, [
				{t: 0.28, som: whooshPara(0.6), vol: 0.7},
				{t: 0.48, som: 'pop_1', vol: 0.8},
				{t: 3.0, som: 'whoosh_rapido', vol: 0.7},
				{t: 4.1, som: whooshPara(0.55), vol: 0.75},
				{t: 4.68, som: 'pop_2', vol: 0.85},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(${brX} ${brY + (1 - eMapa) * 60}) scale(${s0})`} opacity={eMapa * (1 - apaga)}>
					{UFS.filter((u) => u.id !== 'ba').map((u) => (
						<path key={u.id} d={u.path} fill={cinza} stroke={tema === 'claro' ? '#FFFFFF' : 'rgba(0,0,0,0.35)'} strokeWidth={0.8} opacity={0.8 + 0.2 * pulsa}
							transform={pulsa ? `translate(0 ${(-4 * pulsa).toFixed(2)})` : undefined} />
					))}
				</g>
				<g opacity={eBa}>
					{bahia(-230 * duas, 1, -4 * duas)}
					{duas > 0 && bahia(230 * duas, duas, 4 * duas)}
				</g>
				{/* "×" entre as duas */}
				<text x={540} y={1030} textAnchor="middle" fontSize={130} fontWeight={800} fill={BRANCO(tema)} opacity={duas}
					style={{filter: tema === 'claro' ? 'none' : 'drop-shadow(0 4px 12px rgba(0,0,0,.5))'}} fontFamily="inherit">×</text>
			</svg>
			<Texto tema={tema} t={r(0.48)} top={420} size={64}>
				<span style={{color: amarelo}}>BAHIA</span>
			</Texto>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-B · "Hoje eu estou em Luiz Eduardo Magalhães, o oeste da Bahia. Aqui é a
// cidade onde o Flávio teve a sua maior votação na Bahia. E adivinha o Lula a
// menor? E não, isso não é uma coincidência."
//   mapa da Bahia + pino ................. 00:08,040 ("Luiz Eduardo")
//   o oeste acende ....................... 00:09,700 ("oeste da")
//   mapa sobe, barras entram ............. 00:11,280 ("a cidade")
//   Flávio 62,03% ........................ 00:12,760 ("maior votação")
//   Lula 32,51% .......................... 00:15,880 ("a menor?")
// Números: 1º turno 2026, % dos votos válidos em LEM (TSE, via imprensa — CONFERIR).
// ─────────────────────────────────────────────────────────────────────────────
export const LEM_VOTOS: Janela = {inicio: 7.44, fim: 18.9};
export const LemVotos: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - LEM_VOTOS.inicio;
	const eMapa = entra(frame, 0, 0.6);
	const ePino = entra(frame, r(8.04), 0.5);
	const oeste = entra(frame, r(9.7), 0.6);
	const sobeMapa = vira(frame, r(11.28), 0.7);
	const S = 4.4 - 2.2 * sobeMapa;
	const cx = (CAIXA_BA.x0 + CAIXA_BA.x1) / 2;
	const cy = (CAIXA_BA.y0 + CAIXA_BA.y1) / 2;
	const mx = 540;
	const my = 1050 - 420 * sobeMapa;
	const pinoX = mx + (LEM.x - cx) * S;
	const pinoY = my + (LEM.y - cy) * S;
	const drift = Math.sin(frame / 60 * 1.2) * 3;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(LEM_VOTOS, [
				{t: 7.44, som: whooshPara(0.6), vol: 0.7},
				{t: 8.04, som: 'pop_1', vol: 0.85},
				{t: 11.28, som: whooshPara(0.7), vol: 0.75},
				{t: 12.76, som: 'whoosh_02', vol: 0.75, dura: 0.9},
				{t: 15.88, som: 'whoosh_02', vol: 0.75, dura: 0.9},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(${mx} ${my + (1 - eMapa) * 80 + drift}) scale(${S}) translate(${-cx} ${-cy})`} opacity={eMapa}>
					<path d={BAHIA} fill={tema === 'claro' ? '#E4E7EA' : 'rgba(255,255,255,0.22)'} stroke={tema === 'claro' ? '#8A9099' : 'rgba(255,255,255,0.75)'} strokeWidth={0.6} />
					{/* o oeste: halo em volta de LEM */}
					<circle cx={LEM.x} cy={LEM.y} r={8 + 22 * oeste} fill={COR.marca} opacity={0.28 * oeste} />
				</g>
				<g transform={`translate(${pinoX} ${pinoY + (1 - ePino) * -120}) scale(${0.9 + 0.1 * ePino - 0.25 * sobeMapa})`} opacity={ePino}>
					<Pino cor={COR.marca} />
				</g>
			</svg>
			<div style={{position: 'absolute', left: 60, right: 60, top: 470 - 230 * sobeMapa, textAlign: 'center', color: tinta(tema), textShadow: sombra(tema), opacity: ePino, transform: `translateY(${((1 - ePino) * 20).toFixed(1)}px)`}}>
				<div style={{fontSize: 56, fontWeight: 800, lineHeight: 1.05}}>LUÍS EDUARDO MAGALHÃES</div>
				<div style={{fontSize: 36, fontWeight: 600, color: tintaMeta(tema), marginTop: 6, opacity: oeste}}>oeste da Bahia</div>
			</div>
			<Texto tema={tema} t={r(11.5)} top={930} size={34} peso={600} cor={tintaMeta(tema)}>1º TURNO 2026 · % DOS VOTOS VÁLIDOS EM LEM</Texto>
			<Barra tema={tema} t={r(12.76)} top={1010} pct={62.03} max={70} nome="Flávio" valor="62,03" cor={COR.marca} sub="a maior votação dele na Bahia" />
			<Barra tema={tema} t={r(15.88)} top={1230} pct={32.51} max={70} nome="Lula" valor="32,51" cor={par(ALERTA, tema)} sub="a menor votação dele na Bahia" />
			<Fonte tema={tema} t={r(13.2)} top={1480}>TSE · resultado do 1º turno, 04/10/2026</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-C · "Com apenas 26 anos de existência, Luiz Eduardo Magalhães tem mais de
// 100 mil habitantes e é uma das maiores potências do agro do Brasil."
//   26 ANOS ............................... 00:19,460 ("26 anos")
//   +100 MIL habitantes ................... 00:22,700 ("100 mil")
//   potência do agro ...................... 00:24,780 ("potências do")
// ─────────────────────────────────────────────────────────────────────────────
export const LEM_NUMEROS: Janela = {inicio: 19.08, fim: 26.5};
export const LemNumeros: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - LEM_NUMEROS.inicio;
	const eAgro = entra(frame, r(24.78), 0.5);
	const balanca = Math.sin(frame / 60 * 2.2) * 3;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(LEM_NUMEROS, [
				{t: 19.46, som: 'chain', vol: 0.7},
				{t: 22.7, som: 'chain', vol: 0.7},
				{t: 24.78, som: 'pop_2', vol: 0.8},
			])} />
			<Numero tema={tema} t={r(19.46)} top={560} valor="26" px={190} depois="anos" />
			<Texto tema={tema} t={r(20.24)} top={770} size={40} peso={600} cor={tintaMeta(tema)}>de existência</Texto>
			<Numero tema={tema} t={r(22.7)} top={880} valor="100" px={170} antes="+" depois="mil" cor={COR.marca} />
			<Texto tema={tema} t={r(23.04)} top={1070} size={40} peso={600} cor={tintaMeta(tema)}>habitantes</Texto>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(400 ${1300 + (1 - eAgro) * 80}) rotate(${balanca}) scale(${0.8 * eAgro})`} opacity={eAgro}><Soja /></g>
				<g transform={`translate(680 ${1300 + (1 - eAgro) * 80}) rotate(${-balanca}) scale(${0.8 * eAgro})`} opacity={eAgro}><Algodao /></g>
			</svg>
			<Texto tema={tema} t={r(24.9)} top={1430} size={44}>potência do <span style={{color: COR.marca}}>agro</span></Texto>
			<Fonte tema={tema} t={r(20.0)}>Lei estadual 7.619/2000 · IBGE, Censo 2022</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-D · "Soja, milho e algodão lideram as exportações agrícolas da Bahia."
// Decisão: só SOJA e ALGODÃO (o milho não está entre os principais — Agrostat 2024).
//   soja .................................. 00:26,600 ("Soja,")
//   algodão ............................... 00:27,340 ("e algodão")
//   "exportações agrícolas da Bahia" ...... 00:28,720
// ─────────────────────────────────────────────────────────────────────────────
export const AGRO: Janela = {inicio: 26.5, fim: 30.4};
export const Agro: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - AGRO.inicio;
	const eS = entra(frame, r(26.6), 0.5);
	const eA = entra(frame, r(27.34), 0.5);
	const t = frame / 60;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(AGRO, [
				{t: 26.6, som: 'pop_1', vol: 0.85},
				{t: 27.34, som: 'pop_2', vol: 0.85},
				{t: 28.72, som: whooshPara(0.45), vol: 0.65},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(330 ${1000 + (1 - eS) * 120}) rotate(${Math.sin(t * 2) * 4}) scale(${1.4 * eS})`} opacity={eS}><Soja /></g>
				<g transform={`translate(750 ${1000 + (1 - eA) * 120}) rotate(${-Math.sin(t * 2) * 4}) scale(${1.4 * eA})`} opacity={eA}><Algodao /></g>
			</svg>
			<Texto tema={tema} t={r(26.6)} top={1210} size={58}><span style={{position: 'relative', left: -210}}>SOJA</span></Texto>
			<Texto tema={tema} t={r(27.34)} top={1210} size={58}><span style={{position: 'relative', left: 210}}>ALGODÃO</span></Texto>
			<Texto tema={tema} t={r(28.72)} top={600} size={50}>lideram as <span style={{color: COR.marca}}>exportações</span><br /><span style={{color: COR.marca}}>agrícolas</span> da Bahia</Texto>
			<Fonte tema={tema} t={r(28.0)}>Agrostat/MAPA, via Seagri-BA · 2024</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-E · "Grandes empresas investindo bilhões aqui, mais de 20 mil empresas
// abertas, quase todas de pequenos empreendedores, milhares de empregos gerados."
// Decisão dele: o número entra SEM linha de fonte (só agregador achou 20.858).
//   prédios sobem ......................... 00:30,440 ("Grandes empresas")
//   gráfico sobe de 0 a +20 mil ........... 00:32,420 ("de 20")
//   lojinhas (pequenos empreendedores) .... 00:34,940
//   gente (empregos) ...................... 00:36,060
// ─────────────────────────────────────────────────────────────────────────────
export const EMPRESAS: Janela = {inicio: 30.44, fim: 37.4};
export const Empresas: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - EMPRESAS.inicio;
	const ePr = [0, 0.15, 0.3].map((d) => entra(frame, d, 0.6));
	const g = INOUT(rel(frame, r(32.42), 1.4));
	const eLoja = entra(frame, r(34.94), 0.5);
	const eGente = entra(frame, r(36.06), 0.45);
	// curva subindo (área) de 0 até o topo
	const pts = Array.from({length: 13}).map((_, i) => {
		const x = 160 + i * 63;
		const v = Math.pow(i / 12, 1.6);
		return [x, 1380 - 420 * v * Math.min(1, g * 1.05)] as [number, number];
	});
	const vis = Math.max(1, Math.round(g * 12));
	const linha = pts.slice(0, vis + 1).map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
	const area = `${linha} L${pts[vis][0]} 1380 L160 1380 Z`;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(EMPRESAS, [
				{t: 30.44, som: whooshPara(0.7), vol: 0.7},
				{t: 32.42, som: 'whoosh_02', vol: 0.75},
				{t: 34.94, som: 'pop_1', vol: 0.8},
				{t: 36.06, som: 'pop_2', vol: 0.8},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{/* prédios das grandes empresas, no fundo */}
				{[[250, 200], [380, 280], [830, 240]].map(([x, h], i) => (
					<g key={i} transform={`translate(${x} ${1380 + (1 - ePr[i]) * 200})`} opacity={ePr[i] * (1 - 0.55 * g)}><Predio h={h} /></g>
				))}
				<path d={area} fill={COR.marca} opacity={0.22 * Math.min(1, g * 3)} />
				<path d={linha} stroke={COR.marca} strokeWidth={12} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={Math.min(1, g * 4)} />
				<line x1={140} y1={1380} x2={940} y2={1380} stroke={tinta(tema)} strokeWidth={4} opacity={0.5} />
				{/* lojinhas e gente embaixo */}
				{[200, 340, 480, 620, 760, 900].map((x, i) => {
					const e = Math.max(0, Math.min(1, eLoja * 6 - i * 0.9));
					return <g key={i} transform={`translate(${x} ${1530}) scale(${0.62 * e})`} opacity={e}><Loja /></g>;
				})}
				{Array.from({length: 9}).map((_, i) => {
					const e = Math.max(0, Math.min(1, eGente * 9 - i * 0.8));
					return <g key={i} transform={`translate(${160 + i * 95} ${1660}) scale(${0.8 * e})`} opacity={e}><Gente cor={tinta(tema)} /></g>;
				})}
			</svg>
			<Numero tema={tema} t={r(32.42)} top={560} valor="20" px={190} antes="+" depois="mil" cor={COR.marca} dur={1.4} />
			<Texto tema={tema} t={r(33.08)} top={770} size={50}>empresas abertas</Texto>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-F · "E sabe qual é o resultado? Esse ano foi eleita a melhor cidade média do
// Nordeste." — "As Melhores Cidades do Brasil 2026" (Austin Rating/Veja): 1º no
// Nordeste entre 50 e 200 mil habitantes (imprensa — CONFERIR na Veja/Austin).
//   troféu ................................ 00:38,200 ("Esse ano")
//   "melhor cidade média do Nordeste" ..... 00:39,040 ("a melhor")
// ─────────────────────────────────────────────────────────────────────────────
export const MELHOR: Janela = {inicio: 37.9, fim: 41.9};
export const Melhor: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - MELHOR.inicio;
	const e = entra(frame, r(38.2), 0.6);
	const t = frame / 60;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(MELHOR, [
				{t: 38.2, som: whooshPara(0.6), vol: 0.7},
				{t: 39.04, som: 'flash', vol: 0.7},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{/* raios girando atrás */}
				<g transform={`translate(540 860) rotate(${t * 20})`} opacity={0.35 * e}>
					{Array.from({length: 12}).map((_, i) => <path key={i} d="M-14 -120 L14 -120 L40 -330 L-40 -330 Z" fill={COR.marca} transform={`rotate(${i * 30})`} />)}
				</g>
				<g transform={`translate(540 ${960 + (1 - e) * 200}) scale(${1.3 * e}) rotate(${Math.sin(t * 2) * 2})`} opacity={e}><Trofeu /></g>
			</svg>
			<Texto tema={tema} t={r(39.04)} top={1150} size={62}>MELHOR CIDADE MÉDIA</Texto>
			<Texto tema={tema} t={r(40.7)} top={1230} size={62}><span style={{color: COR.marca}}>DO NORDESTE</span></Texto>
			<Fonte tema={tema} t={r(39.4)} top={1330}>As Melhores Cidades do Brasil 2026 · Austin Rating/Veja</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-G · SEGURANÇA, em três peças (cada frase com o seu documento)
// G1 "Na segurança é o estado com mais mortes violentas do Brasil."
//    5.473 MVI em 2025, 1º em NÚMERO ABSOLUTO (em taxa é 2º, atrás do Amapá).
// ─────────────────────────────────────────────────────────────────────────────
export const MORTES: Janela = {inicio: 44.22, fim: 47.4};
export const Mortes: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - MORTES.inicio;
	const e = entra(frame, 0.1, 0.5);
	return (
		<Cena tema={tema}>
			<Sons cues={cues(MORTES, [
				{t: 44.22, som: 'pop_1', vol: 0.8},
				{t: 45.68, som: 'chain', vol: 0.7},
			])} />
			<Eixo tema={tema} t={0} top={600} cor={par(ALERTA, 'alfa')}>Segurança</Eixo>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(540 ${860 + (1 - e) * 60}) scale(${0.85 * e})`} opacity={e}><Escudo cor={par(ALERTA, tema)} /></g>
			</svg>
			<Numero tema={tema} t={r(45.68)} top={1010} valor="5.473" px={160} />
			<Texto tema={tema} t={r(46.0)} top={1190} size={46}>mortes violentas em 2025</Texto>
			<Texto tema={tema} t={r(46.4)} top={1260} size={40} cor={COR.marca}>1º do Brasil em números absolutos</Texto>
			<Fonte tema={tema} t={r(45.3)}>Anuário Brasileiro de Segurança Pública 2026 · FBSP</Fonte>
		</Cena>
	);
};

// G2 "Seis das dez cidades mais violentas do país estão aqui." — DECISÃO: 5 das 10
// (Anuário 2026, dados de 2025; "seis" era o Anuário 2024). As 10 por taxa de MVI,
// municípios > 100 mil hab.
export const DEZ: Janela = {inicio: 47.44, fim: 50.42};
const CIDADES: [string, string][] = [
	['Maranguape', 'CE'], ['Eunápolis', 'BA'], ['Maracanaú', 'CE'], ['Porto Seguro', 'BA'], ['Simões Filho', 'BA'],
	['Jequié', 'BA'], ['Caucaia', 'CE'], ['Cabo de Sto. Agostinho', 'PE'], ['Santa Rita', 'PB'], ['Juazeiro', 'BA'],
];
export const Dez: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - DEZ.inicio;
	const acende = rel(frame, r(49.62), 0.5); // "estão aqui"
	return (
		<Cena tema={tema}>
			<Sons cues={cues(DEZ, [
				{t: 47.44, som: whooshPara(0.9), vol: 0.7},
				{t: 49.62, som: 'carimbo', vol: 0.75},
			])} />
			<Texto tema={tema} t={0} top={470} size={44}>as 10 cidades mais violentas do país</Texto>
			{CIDADES.map(([c, uf], i) => {
				const e = entra(frame, 0.15 + i * 0.09, 0.4);
				const ba = uf === 'BA';
				const luz = ba ? acende : 0;
				return (
					<div key={c} style={{position: 'absolute', left: 170, width: 740, top: 590 + i * 92, height: 76, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', borderRadius: 14,
						background: ba ? `rgba(232,131,122,${(0.12 + 0.75 * luz).toFixed(3)})` : (tema === 'claro' ? '#F1F2F4' : 'rgba(255,255,255,0.10)'),
						opacity: e, transform: `translateX(${((1 - e) * 60).toFixed(1)}px) scale(${(1 + 0.03 * luz).toFixed(3)})`}}>
						<span style={{width: 50, fontSize: 36, fontWeight: 800, color: tintaMeta(tema)}}>{i + 1}º</span>
						<span style={{flex: 1, fontSize: 40, fontWeight: 800, color: tinta(tema), textShadow: sombra(tema)}}>{c}</span>
						<span style={{fontSize: 36, fontWeight: 800, color: ba ? (luz > 0.5 ? '#15171A' : tinta(tema)) : tintaMeta(tema)}}>{uf}</span>
					</div>
				);
			})}
			<Texto tema={tema} t={r(49.62)} top={1520} size={56}><span style={{color: COR.marca}}>5 das 10</span> na Bahia</Texto>
			<Fonte tema={tema} t={r(48.0)} top={1610}>Anuário FBSP 2026 · taxa de MVI, municípios com +100 mil hab.</Fonte>
		</Cena>
	);
};

// G3 "E é também o estado com mais facções criminosas." — 17 (levantamento O Globo,
// ago/2025, com dados das secretarias e MPs dos estados).
export const FACCOES: Janela = {inicio: 50.48, fim: 53.05};
export const Faccoes: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - FACCOES.inicio;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(FACCOES, [{t: 51.44, som: 'chain', vol: 0.7}])} />
			<Numero tema={tema} t={r(51.44)} top={720} valor="17" px={230} cor={par(ALERTA, tema)} />
			<Texto tema={tema} t={r(51.6)} top={980} size={56}>facções criminosas</Texto>
			<Texto tema={tema} t={r(51.9)} top={1060} size={40} cor={COR.marca}>o estado com mais facções</Texto>
			<Fonte tema={tema} t={r(51.0)} top={1180}>Levantamento O Globo, ago/2025</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-H · "Em Salvador tem facção que obriga morador a deixar a porta aberta,
// destrancada, para bandido entrar e se esconder." (reportagem do Correio, ago/2025)
//   SALVADOR .............................. 00:53,080
//   cadeado abre .......................... 00:55,520 ("porta aberta")
//   porta abre ............................ 00:56,080 ("destrancada")
// ─────────────────────────────────────────────────────────────────────────────
export const PORTA: Janela = {inicio: 53.08, fim: 58.7};
export const PortaAberta: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - PORTA.inicio;
	const e = entra(frame, 0.1, 0.6);
	const destranca = vira(frame, r(55.52), 0.35);
	const abre = vira(frame, r(56.08), 0.9);
	return (
		<Cena tema={tema}>
			<Sons cues={cues(PORTA, [
				{t: 53.08, som: 'pop_1', vol: 0.8},
				{t: 55.52, som: 'obturador', vol: 0.8},
				{t: 56.08, som: 'whoosh_02', vol: 0.75, dura: 0.9},
			])} />
			<Eixo tema={tema} t={0} top={520}>Salvador</Eixo>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(540 ${1020 + (1 - e) * 80}) scale(${1.05 * (0.9 + 0.1 * e)})`} opacity={e}>
					<Porta abre={abre} destranca={destranca} />
				</g>
			</svg>
			<Texto tema={tema} t={r(55.52)} top={1360} size={54}>porta aberta, <span style={{color: COR.marca}}>destrancada</span></Texto>
			<Fonte tema={tema} t={r(54.2)} top={1450}>Reportagem: Correio, ago/2025</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-I · "No emprego, nenhuma capital do Brasil tem mais desemprego que Salvador."
// IBGE PNAD Contínua, 2º tri 2026: Salvador 11,4% (1ª entre as capitais), Brasil 5,4%.
// ─────────────────────────────────────────────────────────────────────────────
export const EMPREGO: Janela = {inicio: 58.7, fim: 62.1};
export const Emprego: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - EMPREGO.inicio;
	const e = entra(frame, 0, 0.5);
	return (
		<Cena tema={tema}>
			<Sons cues={cues(EMPREGO, [
				{t: 58.7, som: 'pop_1', vol: 0.8},
				{t: 60.2, som: 'whoosh_02', vol: 0.7, dura: 0.9},
			])} />
			<Eixo tema={tema} t={0} top={560}>Emprego</Eixo>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(540 ${800 + (1 - e) * 50}) scale(${0.75 * e})`} opacity={e}><Maleta /></g>
			</svg>
			<Barra tema={tema} t={r(60.2)} top={960} pct={11.4} max={12} nome="Salvador" valor="11,4" cor={par(ALERTA, tema)} sub="maior desemprego entre as capitais" />
			<Barra tema={tema} t={r(60.72)} top={1180} pct={5.4} max={12} nome="Brasil" valor="5,4" cor={tema === 'claro' ? '#8A9099' : 'rgba(255,255,255,0.55)'} />
			<Fonte tema={tema} t={r(59.6)} top={1400}>IBGE, PNAD Contínua · 2º trimestre de 2026</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-J · "Na renda, 11 em cada 100 moradores de Salvador vivem abaixo da linha da
// pobreza." DECISÃO: "IBGE 2021" — o 11,2% é EXTREMA pobreza, por isso a tela diz isso.
//   100 bonequinhos ...................... 00:62,620 ("11 em")
//   11 acendem ........................... 00:63,040 ("cada 100")
// ─────────────────────────────────────────────────────────────────────────────
export const RENDA: Janela = {inicio: 62.14, fim: 66.5};
export const Renda: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - RENDA.inicio;
	const cor = tinta(tema);
	return (
		<Cena tema={tema}>
			<Sons cues={cues(RENDA, [
				{t: 62.14, som: 'pop_1', vol: 0.8},
				{t: 63.04, som: 'chain', vol: 0.65},
			])} />
			<Eixo tema={tema} t={0} top={470}>Renda</Eixo>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{Array.from({length: 100}).map((_, i) => {
					const c = i % 10;
					const l = Math.floor(i / 10);
					const e = entra(frame, r(62.62) + (c + l) * 0.02, 0.35);
					const ordem = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].indexOf(i);
					const luz = ordem >= 0 ? vira(frame, r(63.04) + ordem * 0.06, 0.25) : 0;
					return (
						<g key={i} transform={`translate(${222 + c * 70} ${660 + l * 74}) scale(${0.62 * e * (1 + 0.15 * luz)})`} opacity={e * (0.45 + 0.55 * Math.max(luz, ordem >= 0 ? 0 : 0.3))}>
							<Gente cor={luz > 0.5 ? COR.marca : cor} />
						</g>
					);
				})}
			</svg>
			<Numero tema={tema} t={r(63.04)} top={1420} valor="11" px={120} depois="em cada 100" cor={COR.marca} />
			<Texto tema={tema} t={r(65.18)} top={1560} size={38}>abaixo da linha da extrema pobreza</Texto>
			<Fonte tema={tema} t={r(63.6)} top={1640}>IBGE · Salvador, 2021</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-K · "Na desnutrição infantil é a pior capital do país."
// SISVAN/Min. da Saúde, 2021 (Mapa da Desigualdade 2024): Salvador 4,03% das crianças
// < 5 anos; 2ª Belém 2,19%.
// ─────────────────────────────────────────────────────────────────────────────
export const DESNUTRICAO: Janela = {inicio: 66.54, fim: 69.55};
export const Desnutricao: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - DESNUTRICAO.inicio;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(DESNUTRICAO, [
				{t: 66.54, som: 'pop_1', vol: 0.8},
				{t: 67.94, som: 'whoosh_02', vol: 0.7, dura: 0.9},
			])} />
			<Eixo tema={tema} t={0} top={600}>Desnutrição infantil</Eixo>
			<Barra tema={tema} t={r(67.94)} top={780} pct={4.03} max={4.5} nome="Salvador" valor="4,03" cor={par(ALERTA, tema)} sub="a pior capital do país" />
			<Barra tema={tema} t={r(68.3)} top={1000} pct={2.19} max={4.5} nome="Belém (2ª)" valor="2,19" cor={tema === 'claro' ? '#8A9099' : 'rgba(255,255,255,0.55)'} />
			<Texto tema={tema} t={r(68.1)} top={1200} size={32} peso={600} cor={tintaMeta(tema)}>% das crianças com menos de 5 anos</Texto>
			<Fonte tema={tema} t={r(67.6)} top={1270}>SISVAN/Ministério da Saúde, 2021 · Mapa da Desigualdade 2024</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-L · "Na educação, nenhum estado tem tanta gente que não sabe ler nem escrever.
// São mais de um milhão e quatrocentos mil baianos, o maior número do Brasil."
// IBGE Censo 2022: 1.420.947 (15 anos ou mais), maior número ABSOLUTO (taxa: 9º).
//   livro ................................. 00:69,600 ("Na educação")
//   hodômetro ............................. 00:73,300 ("São mais")
//   "o maior número do Brasil" ............ 00:76,920
// ─────────────────────────────────────────────────────────────────────────────
export const EDUCACAO: Janela = {inicio: 69.6, fim: 78.3};
export const Educacao: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - EDUCACAO.inicio;
	const e = entra(frame, 0.1, 0.6);
	const risco = vira(frame, r(72.2), 0.5); // "ler nem escrever"
	const t = frame / 60;
	return (
		<Cena tema={tema}>
			<Sons cues={cues(EDUCACAO, [
				{t: 69.6, som: 'pop_1', vol: 0.8},
				{t: 72.2, som: 'whoosh_rapido', vol: 0.65},
				{t: 73.3, som: 'chain_mais_long', vol: 0.7},
				{t: 76.92, som: 'pop_2', vol: 0.8},
			])} />
			<Eixo tema={tema} t={0} top={520}>Educação</Eixo>
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(540 ${820 + (1 - e) * 60}) rotate(${Math.sin(t * 1.5) * 2}) scale(${1.0 * e})`} opacity={e}>
					<Livro />
					<path d={`M-130 -100 L${-130 + 260 * risco} ${-100 + 200 * risco}`} stroke={par(ALERTA, tema)} strokeWidth={18} strokeLinecap="round" />
				</g>
			</svg>
			<Texto tema={tema} t={r(71.86)} top={1000} size={44}>não sabem ler nem escrever</Texto>
			<Numero tema={tema} t={r(73.3)} top={1110} valor="1.420.947" px={130} dur={2.2} cor={COR.marca} />
			<Texto tema={tema} t={r(75.4)} top={1260} size={46}>baianos</Texto>
			<Texto tema={tema} t={r(76.92)} top={1340} size={50}>o <span style={{color: COR.marca}}>maior número</span> do Brasil</Texto>
			<Fonte tema={tema} t={r(73.8)} top={1450}>IBGE, Censo 2022 · 15 anos ou mais</Fonte>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-M · "Segurança, emprego, educação, tudo isso é responsabilidade de quem
// governa o país." — os três ícones dos eixos, um por palavra.
// ─────────────────────────────────────────────────────────────────────────────
export const TRES: Janela = {inicio: 78.38, fim: 82.45};
export const Tres: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - TRES.inicio;
	const ts = [78.38, 78.9, 79.34];
	const t = frame / 60;
	const nomes = ['SEGURANÇA', 'EMPREGO', 'EDUCAÇÃO'];
	return (
		<Cena tema={tema}>
			<Sons cues={cues(TRES, ts.map((x, i) => ({t: x, som: i % 2 ? 'pop_2' : 'pop_1', vol: 0.8})))} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{ts.map((x, i) => {
					const e = entra(frame, r(x), 0.45);
					const X = [250, 540, 830][i];
					return (
						<g key={i} transform={`translate(${X} ${960 + (1 - e) * 80 + Math.sin(t * 2 + i) * 6}) scale(${0.85 * e})`} opacity={e}>
							{i === 0 ? <Escudo /> : i === 1 ? <Maleta /> : <Livro />}
						</g>
					);
				})}
			</svg>
			{nomes.map((n, i) => {
				const e = entra(frame, r(ts[i]) + 0.1, 0.4);
				return <div key={n} style={{position: 'absolute', left: [250, 540, 830][i] - 160, width: 320, top: 1110, textAlign: 'center', fontSize: 38, fontWeight: 800, color: tinta(tema), textShadow: sombra(tema), opacity: e}}>{n}</div>;
			})}
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-N · CAMPO DE SÍMBOLOS — "E quem paga essa conta é o baiano que trabalha, que
// rala o dia inteiro, que acorda cedo e tem que voltar para casa com medo."
// Símbolo do tema: DESPERTADOR (o "acorda cedo", e ecoa o "Acorda, Bahia" do fecho).
// Duas camadas com paralaxe, tamanhos muito diferentes, sangrando, vazio central torto.
// Tocam em "acorda cedo" (85,40).
// ─────────────────────────────────────────────────────────────────────────────
export const CAMPO: Janela = {inicio: 82.48, fim: 89.3};
const CAMPO_A = [[80, 300, 0.9], [960, 380, 1.1], [120, 1580, 1.2], [990, 1480, 0.8], [60, 900, 0.7], [1040, 980, 1.0], [300, 1820, 0.9], [820, 1840, 1.1]];
const CAMPO_B = [[300, 200, 0.45], [700, 260, 0.5], [230, 620, 0.38], [880, 700, 0.42], [180, 1250, 0.5], [900, 1260, 0.4], [560, 1700, 0.45], [420, 1500, 0.35], [690, 1560, 0.33]];
export const Campo: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - CAMPO.inicio;
	const t = frame / 60;
	const toca = Math.max(0, Math.min(1, rel(frame, r(85.4), 0.15) * 1.0)) * (1 - rel(frame, r(86.6), 0.4));
	const camada = (lista: number[][], prof: number, op: number, cor: string) =>
		lista.map(([x, y, s], i) => {
			const e = entra(frame, 0.05 * i + (prof < 1 ? 0.2 : 0), 0.7);
			const dy = -t * 26 * prof;
			return (
				<g key={i} transform={`translate(${x} ${y + dy + (1 - e) * 120}) rotate(${(i % 2 ? 1 : -1) * 12 + Math.sin(t + i) * 5}) scale(${s * e})`} opacity={op * e}>
					<Despertador toca={toca} cor={cor} t={t + i} />
				</g>
			);
		});
	return (
		<Cena tema={tema}>
			<Sons cues={cues(CAMPO, [
				{t: 82.48, som: whooshPara(1.0), vol: 0.6},
				{t: 85.4, som: 'chain_mais_long', vol: 0.55},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				{camada(CAMPO_B, 0.5, 0.55, '#8A9099')}
				{camada(CAMPO_A, 1, 0.95, COR.marca)}
			</svg>
		</Cena>
	);
};

// ─────────────────────────────────────────────────────────────────────────────
// BAH-O · FECHO — "Acorda, Bahia." (01:48,740) — o despertador toca e o texto entra.
// ─────────────────────────────────────────────────────────────────────────────
export const FECHO: Janela = {inicio: 108.6, fim: 111.4};
export const Fecho: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const r = (t: number) => t - FECHO.inicio;
	const e = entra(frame, 0, 0.5);
	const t = frame / 60;
	const toca = rel(frame, r(108.74), 0.1) * (1 - rel(frame, r(110.2), 0.4));
	return (
		<Cena tema={tema}>
			<Sons cues={cues(FECHO, [
				{t: 108.6, som: whooshPara(0.5), vol: 0.7},
				{t: 108.74, som: 'chain', vol: 0.7},
			])} />
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
				<g transform={`translate(540 ${820 + (1 - e) * 120}) scale(${1.3 * e})`} opacity={e}><Despertador toca={toca} t={t} /></g>
			</svg>
			<Texto tema={tema} t={r(108.74)} top={1080} size={110}>ACORDA,</Texto>
			<Texto tema={tema} t={r(109.0)} top={1210} size={130}><span style={{color: COR.marca}}>BAHIA.</span></Texto>
		</Cena>
	);
};

export const PECAS_BAH: {id: string; c: React.FC<{tema: Tema}>; j: Janela}[] = [
	{id: 'BAH-A-Abertura', c: Abertura, j: ABERTURA},
	{id: 'BAH-B-LEM-Votos', c: LemVotos, j: LEM_VOTOS},
	{id: 'BAH-C-LEM-Numeros', c: LemNumeros, j: LEM_NUMEROS},
	{id: 'BAH-D-Agro', c: Agro, j: AGRO},
	{id: 'BAH-E-Empresas', c: Empresas, j: EMPRESAS},
	{id: 'BAH-F-MelhorCidade', c: Melhor, j: MELHOR},
	{id: 'BAH-G1-Mortes', c: Mortes, j: MORTES},
	{id: 'BAH-G2-DezCidades', c: Dez, j: DEZ},
	{id: 'BAH-G3-Faccoes', c: Faccoes, j: FACCOES},
	{id: 'BAH-H-Porta', c: PortaAberta, j: PORTA},
	{id: 'BAH-I-Emprego', c: Emprego, j: EMPREGO},
	{id: 'BAH-J-Renda', c: Renda, j: RENDA},
	{id: 'BAH-K-Desnutricao', c: Desnutricao, j: DESNUTRICAO},
	{id: 'BAH-L-Educacao', c: Educacao, j: EDUCACAO},
	{id: 'BAH-M-Tres', c: Tres, j: TRES},
	{id: 'BAH-N-Campo', c: Campo, j: CAMPO},
	{id: 'BAH-O-Fecho', c: Fecho, j: FECHO},
];

// letterings (kit) — trechos contínuos da fala
export const LETTERINGS_BAH = [
	{id: 'BAH-L1-Trabalho', modelo: 2, inicio: 41.64, props: {pequena: 'o segredo é simples,', destaque: 'TRABALHO'}},
	{id: 'BAH-L2-Acredite', modelo: 3, inicio: 92.3, props: {antes: 'Acredite na', destaque: 'BAHIA', depois: 'acredite no baiano'}},
	{id: 'BAH-L3-Aqui', modelo: 6, inicio: 107.02, props: {cima: 'ela está', destaque: 'AQUI', baixo: 'na Bahia'}},
];
