// O DOCUMENTO REAL — páginas do plano "Para o Brasil vencer o atraso"
// rasterizadas a 200 dpi do PDF que ele mandou (76 páginas), em papel 3D, com
// câmera por chaves e marca-texto nas caixas MEDIDAS no PDF
// (scripts/caixas_pdf.py — o equivalente do page.search_for do PyMuPDF).
// Reconstruído pelo CLAUDE.md (§3.3 Papel3D); quando o Papel3D da máquina
// dele vier, estas peças passam a usá-lo.
//
// Regras que mandam aqui: o documento tem de dar para LER (câmera no bloco
// medido, segurando o close enquanto o marca-texto corre); documento NUNCA
// para (a câmera anda do primeiro ao último quadro); o papel é branco nos três
// masters, porque o marca-texto é multiply.
import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {COR, EXPO_OUT, INOUT, deriva, f, limita, placa, type Tema} from '../shared/design';
import {ARCHIVO, FOLGA_FIM, Odometro, SAIDA, sobe, sombra, tinta, tintaMeta} from './comum';
import {Sons, type Cue} from './som';

const PW = 1654; // página A4 a 200 dpi
const PH = 2339;
const CX = 540;
const CY = 900;

type Chave = {t: number; fx: number; fy: number; esc: number};
type Marca = {caixas: number[][]; t0: number; t1: number};

const camera = (chaves: Chave[], s: number) => {
	if (s <= chaves[0].t) return chaves[0];
	for (let i = 0; i < chaves.length - 1; i++) {
		const a = chaves[i];
		const b = chaves[i + 1];
		if (s <= b.t) {
			const p = INOUT(limita((s - a.t) / (b.t - a.t)));
			return {t: s, fx: a.fx + (b.fx - a.fx) * p, fy: a.fy + (b.fy - a.fy) * p, esc: a.esc + (b.esc - a.esc) * p};
		}
	}
	return chaves[chaves.length - 1];
};

const MarcaTexto: React.FC<{m: Marca}> = ({m}) => {
	const frame = useCurrentFrame();
	const s = frame / 60;
	// o traço nunca corre em velocidade constante: rápido e desacelerando
	const p = EXPO_OUT(limita((s - m.t0) / (m.t1 - m.t0)));
	const larguras = m.caixas.map((c) => c[2] - c[0]);
	const total = larguras.reduce((a, b) => a + b, 0);
	let resto = p * total;
	return (
		<>
			{m.caixas.map((c, i) => {
				const w = Math.max(0, Math.min(larguras[i], resto));
				resto -= larguras[i];
				const pad = 6;
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: c[0] - pad,
							top: c[1] - pad * 0.6,
							width: w + pad * 2 * (w > 0 ? 1 : 0),
							height: c[3] - c[1] + pad * 1.2,
							backgroundColor: COR.marca,
							mixBlendMode: 'multiply',
							opacity: 0.85,
							borderRadius: 4,
						}}
					/>
				);
			})}
		</>
	);
};

export const Papel: React.FC<{
	tema: Tema;
	src: string;
	chaves: Chave[];
	marcas?: Marca[];
	folhas?: {src: string; t: number}[];
	folhasSaem?: number;
	cues?: Cue[]; // sons próprios da peça (s, relativos)
	children?: React.ReactNode; // HUD por cima, em coordenadas de tela
}> = ({tema, src, chaves, marcas = [], folhas = [], folhasSaem, cues = [], children}) => {
	const frame = useCurrentFrame();
	const {durationInFrames: dur} = useVideoConfig();
	const s = frame / 60;
	const cam = camera(chaves, s);

	// entrada: o papel vem do fundo, girado, desfocado, e assenta (0,9 s)
	const e = EXPO_OUT(limita(frame / f(0.9)));
	// saída: whip para a esquerda, fechando FOLGA_FIM quadros antes do fim
	const fim = dur - FOLGA_FIM;
	const w = INOUT(limita((frame - (fim - SAIDA)) / SAIDA));

	const rotY = -38 * (1 - e) - 7 + Math.sin(frame / 90) * 1.2;
	const rotX = 22 * (1 - e) + 9;
	const sobeY = (1 - e) * 700;
	const escalaEntrada = 0.55 + 0.45 * e;
	const tx = CX - cam.fx * cam.esc;
	const ty = CY - cam.fy * cam.esc;
	const fundo = placa(tema);

	return (
		<AbsoluteFill style={{backgroundColor: fundo ?? 'transparent'}}>
			<Sons
				cues={[
					// o papel entra (0,9 s) e sai em whip
					{t: 0, som: 'whoosh_02', vol: 0.7, dura: 0.9},
					{t: (dur - FOLGA_FIM - SAIDA) / 60, som: 'woosh_rapido', vol: 0.6},
					// marca-texto: o traço longo pede som LONGO, do tamanho do traço (§4.1);
					// marca curta (o número da página) leva tique
					...marcas.map((m): Cue =>
						m.t1 - m.t0 < 0.6
							? {t: m.t0, som: 'pop_1', vol: 0.7}
							: {t: m.t0, som: 'woosh_longo', vol: 0.75, dura: m.t1 - m.t0},
					),
					...cues,
				]}
			/>
			{/* nasce do zero (nada aparece do nada) e a saída zera de verdade */}
			<AbsoluteFill style={{opacity: limita(frame / f(0.3)) * (1 - w), fontFamily: ARCHIVO}}>
				{/* o desfoque mora FORA da perspectiva (filter achata o 3D) */}
				<AbsoluteFill style={{filter: `blur(${((1 - e) * 14 + w * 18).toFixed(2)}px)`}}>
					<AbsoluteFill
						style={{
							perspective: 2400,
							perspectiveOrigin: `${CX}px ${CY}px`,
							transform: `translateX(${(-w * 1300).toFixed(1)}px) translateY(${(sobeY + deriva(frame, dur, -10)).toFixed(1)}px)`,
						}}
					>
						<div
							style={{
								position: 'absolute',
								left: 0,
								top: 0,
								width: 1080,
								height: 1920,
								transformStyle: 'preserve-3d',
								transformOrigin: `${CX}px ${CY}px`,
								transform: `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${escalaEntrada.toFixed(4)})`,
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: 0,
									top: 0,
									width: PW,
									height: PH,
									transformOrigin: '0 0',
									transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) scale(${cam.esc.toFixed(5)})`,
									backgroundColor: '#FFFFFF',
									boxShadow: '0 60px 160px rgba(0,0,0,.45), 0 8px 24px rgba(0,0,0,.25)',
								}}
							>
								<Img src={staticFile(src)} style={{width: PW, height: PH, display: 'block'}} />
								{marcas.map((m, i) => (
									<MarcaTexto key={i} m={m} />
								))}
								{folhas.map((fo, i) => {
									const ini = f(fo.t);
									if (frame < ini) return null;
									const p = EXPO_OUT(limita((frame - ini) / 7));
									const sai = folhasSaem === undefined ? 0 : INOUT(limita((frame - f(folhasSaem) - i * 0.6) / f(0.5)));
									return (
										<Img
											key={i}
											src={staticFile(fo.src)}
											style={{
												position: 'absolute',
												left: 0,
												top: 0,
												width: PW,
												height: PH,
												transformOrigin: '0 50%',
												transform: `translateX(${(sai * 1900).toFixed(1)}px) rotateY(${((1 - p) * -70).toFixed(2)}deg)`,
												boxShadow: '-10px 0 30px rgba(0,0,0,.18)',
												opacity: 1 - sai,
											}}
										/>
									);
								})}
							</div>
						</div>
					</AbsoluteFill>
				</AbsoluteFill>
				{children}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

// ── HUD ──────────────────────────────────────────────────────────────────────

const Rotulo: React.FC<{tema: Tema; inicio: number; top: number; children: React.ReactNode}> = ({tema, inicio, top, children}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, inicio, f(0.5));
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				top,
				textAlign: 'center',
				fontSize: 30,
				fontWeight: 500,
				letterSpacing: '0.08em',
				textTransform: 'uppercase',
				color: tintaMeta(tema),
				opacity: e,
				transform: `translateY(${((1 - e) * 16).toFixed(2)}px)`,
			}}
		>
			{children}
		</div>
	);
};

const Contador: React.FC<{tema: Tema; inicio: number; valor: string; unidade: string; top: number; dur?: number; sai?: number}> = ({
	tema,
	inicio,
	valor,
	unidade,
	top,
	dur = f(1.2),
	sai,
}) => {
	const frame = useCurrentFrame();
	const s = sai === undefined ? 0 : INOUT(limita((frame - sai) / SAIDA));
	const e = sobe(frame, inicio, f(0.45)) * (1 - s);
	const cor = tinta(tema);
	return (
		<div
			style={{
				position: 'absolute',
				left: 96,
				top,
				display: 'flex',
				alignItems: 'baseline',
				gap: 16,
				color: cor,
				textShadow: sombra(tema),
				opacity: e,
				transform: `translateY(${((1 - e) * 30 - s * 40).toFixed(2)}px)`,
			}}
		>
			<Odometro valor={valor} px={120} cor={cor} inicio={inicio} dur={dur} sombraTexto={sombra(tema)} />
			<span style={{fontSize: 48, fontWeight: 800, textTransform: 'uppercase'}}>{unidade}</span>
		</div>
	);
};

const Carimbo: React.FC<{inicio: number}> = ({inicio}) => {
	const frame = useCurrentFrame();
	if (frame < inicio) return null;
	// bate e assenta: 1,3 → 1,0 em 6 quadros, girado -4°
	const p = EXPO_OUT(limita((frame - inicio) / 6));
	return (
		<div
			style={{
				position: 'absolute',
				left: 190,
				top: 1330,
				transform: `rotate(-4deg) scale(${(1.3 - 0.3 * p).toFixed(4)})`,
				opacity: limita((frame - inicio) / 3),
				border: `8px solid ${COR.carimbo}`,
				color: COR.carimbo,
				backgroundColor: 'rgba(255,255,255,0.92)',
				borderRadius: 14,
				padding: '14px 30px 16px',
				fontSize: 58,
				fontWeight: 800,
				letterSpacing: '0.04em',
				lineHeight: 1,
				whiteSpace: 'nowrap',
			}}
		>
			REGISTRADO NO TSE
		</div>
	);
};

// ── as três peças ────────────────────────────────────────────────────────────

const CENTRO = {fx: PW / 2, fy: PH / 2};

/**
 * FLV-K-Documento · 00:10,940 → 00:26,060
 * "Eu li as 76 páginas do plano de governo do Flávio. São nove capítulos [...]
 *  O documento chama 'Para o Brasil Vencer o Atraso'. Está registrado no TSE"
 *   capa entra ................ 00:10,940 ("real. Eu")
 *   folheia + 76 rolando ...... 00:11,820 ("páginas do") → 00:13,660
 *   9 capítulos ............... 00:13,660 ("São nove")
 *   folhas saem ............... 00:14,820
 *   câmera no título .......... 00:18,880 ("documento")
 *   carimbo ................... 00:22,140 ("registrado")
 * Sem data no carimbo: a data do registro saiu da imprensa, não de fonte primária.
 */
export const K = {inicio: 10.94, fim: 26.06};
const FOLHAS = [3, 7, 11, 14, 19, 23, 26, 30, 35, 38, 44, 47, 51, 55, 60, 66, 70, 76];

export const DocumentoCapa: React.FC<{tema: Tema}> = ({tema}) => {
	const r = (t: number) => t - K.inicio;
	return (
		<Papel
			tema={tema}
			src="flv/plano_p01.png"
			chaves={[
				{t: 0, ...CENTRO, esc: 0.46},
				{t: r(18.88), ...CENTRO, esc: 0.5},
				{t: r(20.4), fx: 760, fy: 1060, esc: 0.72},
				{t: r(26.06), fx: 760, fy: 1100, esc: 0.78},
			]}
			folhas={FOLHAS.map((n, i) => ({src: `flv/folha_p${String(n).padStart(2, '0')}.jpg`, t: r(11.82) + (i * (13.66 - 11.82)) / FOLHAS.length}))}
			folhasSaem={r(14.82)}
			cues={[
				{t: r(11.82), som: 'whoosh_02', vol: 0.7, dura: 1.84}, // folhear: um gesto, um som
				{t: r(11.82), som: 'chain', vol: 0.7}, // 76 rolando
				{t: r(13.66), som: 'chain', vol: 0.7}, // 9 rolando
				{t: r(14.82), som: 'whoosh_rapido', vol: 0.6}, // folhas saem
				{t: r(18.88), som: 'whoosh_02', vol: 0.6, dura: 1.5}, // câmera no título
				{t: r(22.14), som: 'carimbo', vol: 0.95},
			]}
		>
			<Contador tema={tema} inicio={f(r(11.82))} valor="76" unidade="páginas" top={150} dur={f(1.84)} sai={f(r(18.3))} />
			<Contador tema={tema} inicio={f(r(13.66))} valor="9" unidade="capítulos" top={290} dur={f(0.9)} sai={f(r(18.3)) + 4} />
			<Carimbo inicio={f(r(22.14))} />
			<Rotulo tema={tema} inicio={f(0.6)} top={1720}>
				Para o Brasil vencer o atraso · Plano de governo
			</Rotulo>
		</Papel>
	);
};

/**
 * FLV-L-Pagina15 · 00:36,940 → 00:43,900
 * "E aquilo que quase ninguém leu. O dinheiro hoje pago à família do preso
 *  passa a ir para a família da vítima. Está na página 15."
 *   página entra .............. 00:36,940 ("E aquilo")
 *   marca-texto corre ......... 00:39,360 ("O dinheiro") → 00:42,300 ("família da")
 *   câmera no "15" impresso ... 00:42,880 ("Está na página 15")
 * Trecho marcado, literal da pág. 15: "Os recursos hoje direcionados às famílias
 * de detentos serão redirecionados às famílias das vítimas".
 */
export const L = {inicio: 36.94, fim: 43.9};
const BLOCO_15 = [
	[1255.3, 1525.4, 1455.1, 1564.9],
	[198.9, 1574.7, 1455.1, 1614.1],
	[198.9, 1623.9, 399.9, 1663.4],
];
const NUM_15 = [[1425.1, 2073.6, 1455.1, 2113.1]];

export const Pagina15: React.FC<{tema: Tema}> = ({tema}) => {
	const r = (t: number) => t - L.inicio;
	return (
		<Papel
			tema={tema}
			src="flv/plano_p15.png"
			chaves={[
				{t: 0, ...CENTRO, esc: 0.52},
				{t: r(38.4), fx: 827, fy: 1595, esc: 0.8},
				{t: r(42.3), fx: 830, fy: 1600, esc: 0.84},
				{t: r(42.88) + 0.35, fx: 1300, fy: 2020, esc: 1.1},
				{t: r(43.9), fx: 1320, fy: 2040, esc: 1.16},
			]}
			marcas={[
				{caixas: BLOCO_15, t0: r(39.36), t1: r(42.3)},
				{caixas: NUM_15, t0: r(42.88) + 0.2, t1: r(42.88) + 0.5},
			]}
		>
			<Rotulo tema={tema} inicio={f(0.6)} top={1720}>
				Plano de governo · TSE
			</Rotulo>
		</Papel>
	);
};

/**
 * FLV-M-Pagina58 · 01:56,520 → 01:58,720  (V2: entra depois das chamas, FLV-O)
 * "O plano tem meta de zerar o desmatamento ilegal até 2029. Está na página 58."
 *   página entra .............. 01:53,460 ("O plano")
 *   marca-texto corre ......... 01:54,320 ("de zerar o") → 01:57,500 (fim de "2029.")
 *   câmera no "58" impresso ... 01:57,840 ("página 58.")
 * Trecho marcado, literal da pág. 58: "zerar o desmatamento ilegal até 2029".
 */
export const M = {inicio: 116.52, fim: 118.72};
const BLOCO_58 = [
	[958.3, 729.7, 1455.1, 769.2],
	[198.9, 779.0, 353.2, 818.5],
];
const NUM_58 = [[198.9, 2073.6, 237.9, 2113.1]];

export const Pagina58: React.FC<{tema: Tema}> = ({tema}) => {
	const r = (t: number) => t - M.inicio;
	return (
		<Papel
			tema={tema}
			src="flv/plano_p58.png"
			chaves={[
				{t: 0, fx: 827, fy: 775, esc: 0.7},
				{t: 0.45, fx: 827, fy: 775, esc: 0.8},
				{t: r(117.5), fx: 820, fy: 780, esc: 0.84},
				{t: r(117.84) + 0.35, fx: 360, fy: 2020, esc: 1.1},
				{t: r(118.72), fx: 340, fy: 2040, esc: 1.16},
			]}
			marcas={[
				{caixas: BLOCO_58, t0: 0.4, t1: r(117.45)},
				{caixas: NUM_58, t0: r(117.84) + 0.2, t1: r(117.84) + 0.5},
			]}
		>
			<Rotulo tema={tema} inicio={f(0.6)} top={1720}>
				Plano de governo · TSE
			</Rotulo>
		</Papel>
	);
};
