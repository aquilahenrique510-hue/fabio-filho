// INSERT "2026 → 2002" (16/10/2026, pedido por print do roteirista):
// "aparece quando ele começa a falar · vai diminuindo até o fim · quando chegar
// 2002 já tem que tá antes um pouco do final". Vai por cima do trecho do Lula
// (discurso de presidente em 2026).
// v2 (16/10): "bem mais lento" → 14s11q. v3 (16/10): "algo mais cinemático,
// puxa até uns 16 segundos" + o texto "Lula, discurso de presidente em:".
//
// Ano é tempo correndo, não identificador: rola num hodômetro (cada ano vira
// em degrau e assenta inteiro, para dar para ler).
//
// O CINEMÁTICO, item por item:
//  · rótulo DIGITADO letra a letra com cursor (pedido dele), som de tecla;
//  · fonte Cinzel no rótulo e no ano;
//  · o ano em perspectiva (rotateX que vai assentando) e dolly lento do bloco
//    inteiro do primeiro ao último quadro — nada para;
//  · desfoque de movimento na roda enquanto vira;
//  · a chegada em 2002 tem acento: o número esquenta para o amarelo da série e
//    um traço se desenha embaixo;
//  · a saída desfoca junto com o desvanecer.
//
// FICA PRONTO PARA SÓ TROCAR A DURAÇÃO: tudo sai de `duracao` (s).
// O clipe dele é 23,976: `scripts/render_anos.sh <segundos> <saida>` renderiza
// a 60 e converte com a contagem exata de quadros (16 s = 384 q = 16.016 s).
// `segura` = quanto tempo antes do fim ele já está em 2002.
import React from 'react';
import {Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {COR, EXPO_OUT, INOUT, f, limita, type Tema} from '../shared/design';
import {Cena, sombra, tinta, tintaMeta} from '../flv/comum';
import {Sons, type Cue} from '../flv/som';
import {loadFont} from '@remotion/google-fonts/Cinzel';

// fonte de cinema (pedido dele, 16/10): Cinzel, a capitular de trailer.
// Só nesta peça — fonte de uma peça é identidade dela, não da série.
const {fontFamily: CINEMA} = loadFont('normal', {weights: ['500', '700', '800'], subsets: ['latin', 'latin-ext']});

export type AnosProps = {tema: Tema; duracao: number; de?: number; ate?: number; segura?: number; rotulo?: string};
export const ANOS_PADRAO: AnosProps = {
	tema: 'alfa',
	duracao: 16.016,
	de: 2026,
	ate: 2002,
	segura: 2.4,
	rotulo: 'Lula, discurso de presidente em:',
};

const VIRA_EM = 0.6; // fração do ano em que a roda começa a virar
const DIGITA = 0.2; // s — começa a digitar
const POR_LETRA = 0.06; // s — 0,06 > 0,101/2: o pop alternado não se empilha
const COMECA = 2.4; // s — rótulo digitado e 2026 respiram antes de rodar
const PX = 300;
const H = PX;
const L = PX * 0.7; // casa mais larga que o §3.3 (0,6): os dígitos da Cinzel são largos
// lento e quase constante; só amacia na saída do 2026 e na chegada do 2002
const CORRE = Easing.bezier(0.3, 0, 0.6, 1);

/** posição contínua (0–10) da roda `i` (0 = unidades) para o valor v */
const roda = (v: number, i: number) => {
	const p = 10 ** i;
	const base = Math.floor(v / p);
	const resto = v - base * p;
	const vira = i === 0 ? resto : limita(resto - (p - 1));
	return ((base % 10) + vira + 10) % 10;
};

/** quantos anos já viraram (com a virada em degrau) no quadro q */
const degrauEm = (q: number, ini: number, fim: number, n: number) => {
	const x = n * CORRE(limita((q - ini) / (fim - ini)));
	const k = Math.floor(x);
	return k + EXPO_OUT(limita((x - k - VIRA_EM) / (1 - VIRA_EM)));
};

/** quadros em que cada ano começa a virar (o tique do som cai neles) */
const viradas = (dur: number, ini: number, fim: number, n: number) => {
	const out: number[] = [];
	let antes = -1;
	for (let q = 0; q < dur; q++) {
		const k = Math.floor(n * CORRE(limita((q - ini) / (fim - ini))) - VIRA_EM + 1e-9);
		if (k > antes && k >= 0) out.push(q);
		antes = k;
	}
	return out;
};

const MASCARA_V = 'linear-gradient(transparent 0%, #000 16%, #000 84%, transparent 100%)';
const MASCARA_H = 'linear-gradient(90deg, transparent, #000 24%, #000 76%, transparent)';

export const Anos: React.FC<AnosProps> = (props) => {
	const {tema, de, ate, segura, rotulo} = {...ANOS_PADRAO, ...props};
	const frame = useCurrentFrame();
	const {durationInFrames: dur} = useVideoConfig();
	const n = Math.abs(ate! - de!);
	const sinal = Math.sign(ate! - de!);
	const ini = f(COMECA);
	const fim = dur - f(segura!);
	const p = CORRE(limita((frame - ini) / (fim - ini)));
	const ano = de! + (ate! - de!) * p; // contínuo (régua)
	const degrau = degrauEm(frame, ini, fim, n);
	const anoRoda = de! + sinal * degrau;
	const vel = Math.abs(degrau - degrauEm(frame - 1, ini, fim, n)); // anos/quadro
	const cor = tinta(tema);
	const digitos = String(Math.max(de!, ate!)).length;

	// chegada: o 2002 assenta → acento
	const chegou = INOUT(limita((frame - fim) / f(0.7)));
	const traco = EXPO_OUT(limita((frame - fim - f(0.15)) / f(0.9)));

	// câmera: dolly lento do começo ao fim + perspectiva que assenta
	const vida = frame / dur;
	const dolly = 0.93 + 0.11 * Easing.bezier(0.33, 0, 0.67, 1)(vida);
	const inclina = 16 * (1 - EXPO_OUT(limita(frame / f(1.6)))) + 5 * (1 - vida);
	const derivaX = Math.sin(vida * Math.PI) * 10;

	// saída: desfoque junto com o desvanecer da Cena
	const sai = limita((frame - (dur - f(0.75))) / f(0.6));
	const desfoqueSaida = 10 * INOUT(sai);

	// rótulo digitado
	const letras = Array.from(rotulo!);
	const tLetra = (k: number) => f(DIGITA + POR_LETRA * k);
	const digitadas = letras.filter((_, k) => frame >= tLetra(k)).length;
	const acabouDigitar = tLetra(letras.length);
	// cursor: pisca enquanto espera, fica aceso digitando, some depois do 2026 rodar
	const piscando = Math.floor(frame / f(0.5)) % 2 === 0;
	const cursorOp = (frame < acabouDigitar ? 1 : piscando ? 1 : 0) * (1 - limita((frame - f(COMECA + 0.6)) / f(0.3)));
	const tracking = 0.16 - 0.06 * EXPO_OUT(limita(frame / f(3)));

	// entrada do ano
	const eAno = EXPO_OUT(limita((frame - f(0.35)) / f(0.9)));

	// régua
	const passo = 40;
	const deslize = (de! - ano) * passo;
	const anosRegua = Array.from({length: n + 1}, (_, k) => de! + sinal * k);
	const eRegua = EXPO_OUT(limita((frame - f(0.7)) / f(0.9)));

	const cues: Cue[] = [
		...letras
			.map((c, k) => ({c, k}))
			.filter(({c}) => c !== ' ')
			.map(({k}, j): Cue => ({t: tLetra(k) / 60, som: j % 2 ? 'pop_2' : 'pop_1', vol: 0.3})),
		...viradas(dur, ini, fim, n).map((q, k, arr): Cue => ({
			t: q / 60,
			som: k % 2 ? 'pop_2' : 'pop_1',
			vol: k === arr.length - 1 ? 0.75 : 0.4,
		})),
		{t: fim / 60, som: 'flash', vol: 0.45},
	];

	const brilho =
		tema === 'claro'
			? 'none'
			: `drop-shadow(0 8px 26px rgba(0,0,0,.55)) drop-shadow(0 0 ${(30 + 30 * chegou).toFixed(0)}px rgba(255,${(255 - 39 * chegou).toFixed(0)},${(255 - 178 * chegou).toFixed(0)},${(0.16 + 0.14 * chegou).toFixed(2)}))`;
	// a tinta do ano esquenta para o amarelo da série na chegada (no claro, fica)
	const corAno =
		tema === 'claro'
			? cor
			: `rgb(255,${Math.round(255 - (255 - 216) * chegou)},${Math.round(255 - (255 - 77) * chegou)})`;

	return (
		<Cena tema={tema} derivaPx={-14}>
			<Sons cues={cues} />
			<div style={{position: 'absolute', inset: 0, filter: desfoqueSaida > 0.05 ? `blur(${desfoqueSaida.toFixed(2)}px)` : undefined}}>
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 560,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						transform: `translateX(${derivaX.toFixed(2)}px) scale(${dolly.toFixed(4)})`,
					}}
				>
					{/* rótulo digitado */}
					<div style={{display: 'flex', alignItems: 'center', fontFamily: CINEMA, fontSize: 48, fontWeight: 700, letterSpacing: `${tracking.toFixed(3)}em`, color: tintaMeta(tema), textShadow: sombra(tema), whiteSpace: 'pre'}}>
						{letras.map((c, k) => {
							const e = limita((frame - tLetra(k)) / 4); // 4 quadros de amaciamento por letra
							// as letras ainda não digitadas ocupam o lugar (opacidade 0): a linha
							// nasce já centrada na posição final e não escorrega enquanto digita
							return (
								<React.Fragment key={k}>
									<span style={{opacity: e, filter: e < 1 ? `blur(${(5 * (1 - e)).toFixed(2)}px)` : undefined}}>{c}</span>
									{k === Math.max(0, digitadas - 1) && (
										// cursor colado na última letra digitada, sem largura (não empurra nada)
										<span style={{position: 'relative', width: 0, height: 50}}>
											<span style={{position: 'absolute', left: 6, top: 0, width: 4, height: 50, background: COR.marca, opacity: cursorOp}} />
										</span>
									)}
								</React.Fragment>
							);
						})}
					</div>

					{/* o ano, em perspectiva */}
					<div style={{perspective: 1400, marginTop: 10}}>
						<div
							style={{
								display: 'flex',
								opacity: eAno,
								transform: `translateY(${((1 - eAno) * 50).toFixed(1)}px) rotateX(${inclina.toFixed(2)}deg)`,
								transformOrigin: '50% 60%',
								filter: brilho,
							}}
						>
							{Array.from({length: digitos}, (_, k) => {
								const i = digitos - 1 - k;
								const pos = roda(anoRoda, i);
								// só a roda que está virando borra; a das unidades vira todo ano
								const girando = i === 0 || Math.abs(pos - Math.round(pos)) > 0.01;
								const borrao = girando ? Math.min(7, vel * H * 0.05) : 0;
								return (
									<div key={k} style={{width: L, height: H, overflow: 'hidden', position: 'relative', maskImage: MASCARA_V, WebkitMaskImage: MASCARA_V}}>
										<div style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${(-pos * H).toFixed(2)}px)`, filter: borrao > 0.2 ? `blur(${borrao.toFixed(2)}px)` : undefined}}>
											{Array.from({length: 11}, (_, j) => (
												<div key={j} style={{height: H, width: L, textAlign: 'center', fontFamily: CINEMA, fontSize: PX, lineHeight: `${H}px`, fontWeight: 700, color: corAno, fontVariantNumeric: 'tabular-nums'}}>
													{j % 10}
												</div>
											))}
										</div>
									</div>
								);
							})}
						</div>
					</div>

					{/* traço da chegada */}
					<div style={{height: 10, width: 4 * L * 0.92, marginTop: 4, display: 'flex', justifyContent: 'center'}}>
						<div style={{height: 10, width: `${(traco * 100).toFixed(2)}%`, borderRadius: 5, background: COR.marca, boxShadow: tema === 'claro' ? 'none' : '0 0 18px rgba(255,216,77,.5)'}} />
					</div>

					{/* régua: ponteiro amarelo fixo, anos passando por baixo */}
					<div style={{position: 'relative', width: 860, height: 110, marginTop: 34, overflow: 'hidden', opacity: eRegua * (1 - 0.55 * chegou), maskImage: MASCARA_H, WebkitMaskImage: MASCARA_H}}>
						<div style={{position: 'absolute', left: 0, right: 0, top: 30, height: 2, background: tintaMeta(tema)}} />
						{anosRegua.map((a) => {
							const x = 430 - (de! - a) * passo + deslize;
							// rótulo nos múltiplos de 5; ponta (2026/2002) só se não colar num deles
							const ponta = (a === de || a === ate) && Math.min(a % 5, 5 - (a % 5)) >= 3;
							const cheio = a % 5 === 0 || ponta;
							return (
								<React.Fragment key={a}>
									<div style={{position: 'absolute', left: x - 1, top: cheio ? 8 : 18, width: 2, height: cheio ? 46 : 26, background: tintaMeta(tema)}} />
									{cheio && (
										<div style={{position: 'absolute', left: x - 60, width: 120, top: 62, textAlign: 'center', fontFamily: CINEMA, fontSize: 28, fontWeight: 500, letterSpacing: '0.08em', color: tintaMeta(tema), textShadow: sombra(tema)}}>{a}</div>
									)}
								</React.Fragment>
							);
						})}
						<div style={{position: 'absolute', left: 430 - 3, top: 0, width: 6, height: 58, borderRadius: 3, background: COR.marca, boxShadow: tema === 'claro' ? 'none' : '0 0 14px rgba(255,216,77,.55)'}} />
					</div>
				</div>
			</div>
		</Cena>
	);
};
