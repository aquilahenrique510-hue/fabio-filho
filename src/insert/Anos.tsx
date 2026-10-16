// INSERT "2026 → 2002" (16/10/2026, pedido por print do roteirista):
// "aparece quando ele começa a falar · vai diminuindo até o fim · quando chegar
// 2002 já tem que tá antes um pouco do final". Vai por cima do trecho do Lula
// (discurso de presidente em 2026).
//
// Ano é tempo correndo, não identificador: rola num hodômetro MECÂNICO de
// verdade — a casa das unidades gira sem parar e as outras só viram quando a de
// baixo passa do 0 para o 9 (como contador de fita voltando).
//
// FICA PRONTO PARA SÓ TROCAR A DURAÇÃO: tudo sai de `duracao` (s).
//   npx remotion render INSERT-Anos x-alpha.mov --codec=prores --prores-profile=4444 \
//     --pixel-format=yuva444p10le --props='{"tema":"alfa","duracao":7.4}'
// `segura` = quanto tempo antes do fim ele já está em 2002 (padrão 1,5 s).
// O clipe dele é 23,976: `scripts/render_anos.sh <segundos> <saida>` renderiza
// a 60 e converte para 23,976 com a contagem exata de quadros.
import React from 'react';
import {Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {COR, EXPO_OUT, f, limita, type Tema} from '../shared/design';
import {Cena, sombra, tinta, tintaMeta} from '../flv/comum';
import {Sons} from '../flv/som';

export type AnosProps = {tema: Tema; duracao: number; de?: number; ate?: number; segura?: number};
export const ANOS_PADRAO: AnosProps = {tema: 'alfa', duracao: 14.473, de: 2026, ate: 2002, segura: 1.5};

const VIRA_EM = 0.6; // fração do ano em que a roda começa a virar
const COMECA = 0.25; // s — o 2026 aparece parado um instante antes de rodar
const PX = 250;
const H = PX; // altura de uma casa
const L = PX * 0.6; // §3.3: cada casa mede px × 0,6
// LENTO e quase constante (16/10: "é para ser algo bem mais lento"): cada ano
// fica tempo de ser lido; só amacia na saída do 2026 e na chegada do 2002
const CORRE = Easing.bezier(0.3, 0, 0.6, 1);

/** posição contínua (0–10) da roda `i` (0 = unidades) para o valor v */
const roda = (v: number, i: number) => {
	const p = 10 ** i;
	const base = Math.floor(v / p);
	const resto = v - base * p; // 0..p
	// a roda só vira no último 1 da casa de baixo (9→0), como num contador
	const vira = i === 0 ? resto : limita(resto - (p - 1));
	return ((base % 10) + vira + 10) % 10;
};

/** quadros em que cada ano vira (o tique do som cai neles) */
const viradas = (dur: number, ini: number, fim: number, de: number, ate: number) => {
	const out: number[] = [];
	let antes = -1;
	for (let q = 0; q < dur; q++) {
		const k = Math.floor(Math.abs(ate - de) * CORRE(limita((q - ini) / (fim - ini))) - VIRA_EM + 1e-9);
		if (k > antes) out.push(q);
		antes = k;
	}
	return out;
};

export const Anos: React.FC<AnosProps> = (props) => {
	const {tema, de, ate, segura} = {...ANOS_PADRAO, ...props};
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const ini = f(COMECA);
	const fim = durationInFrames - f(segura!);
	const p = CORRE(limita((frame - ini) / (fim - ini)));
	const ano = de! + (ate! - de!) * p; // contínuo (régua)
	// as rodas andam em DEGRAU: cada ano vira rápido e assenta inteiro, para dar
	// para ler — rolagem contínua deixava a casa das unidades sempre pela metade
	const q = Math.abs(ano - de!);
	const k = Math.floor(q);
	// a virada ocupa os 40% FINAIS de cada ano: o 2002 assenta exatamente em
	// `fim` (virando no começo, ele chegava 3,4 s antes e ficava parado)
	const degrau = k + EXPO_OUT(limita((q - k - VIRA_EM) / (1 - VIRA_EM)));
	const anoRoda = de! + Math.sign(ate! - de!) * degrau;
	// velocidade (anos por quadro) → desfoque vertical das rodas que giram
	const pa = CORRE(limita((frame - 1 - ini) / (fim - ini)));
	const vel = Math.abs((ate! - de!) * (p - pa));
	const cor = tinta(tema);
	const digitos = String(Math.max(de!, ate!)).length;

	// régua de anos correndo para a direita (voltando no tempo)
	const passo = 46; // px por ano
	const deslize = (de! - ano) * passo;
	// só os anos do percurso: nada depois de 2026 (futuro) nem antes de 2002
	const anosRegua = Array.from({length: Math.abs(de! - ate!) + 1}, (_, k) => de! - k);

	// entrada: sobe e assenta
	const e = EXPO_OUT(limita(frame / f(0.5)));
	return (
		<Cena tema={tema} derivaPx={-10}>
			{/* um tique por ano que vira — rótulo leva tique (§4.1); nenhum
			    whoosh cobre um gesto de 12 s, e empilhar seria sujeira */}
			<Sons cues={viradas(durationInFrames, ini, fim, de!, ate!).map((q, n) => ({t: q / 60, som: n % 2 ? 'pop_2' : 'pop_1', vol: 0.45}))} />
			<div style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: e, transform: `translateY(${((1 - e) * 40).toFixed(1)}px) scale(${(0.94 + 0.06 * e + 0.03 * p).toFixed(4)})`}}>
				{/* o ano */}
				<div style={{display: 'flex', filter: tema === 'claro' ? 'none' : 'drop-shadow(0 6px 20px rgba(0,0,0,.5))'}}>
					{Array.from({length: digitos}, (_, k) => {
						const i = digitos - 1 - k;
						const pos = roda(anoRoda, i);
						const borrao = Math.min(14, vel * (i === 0 ? 1 : 0.1 ** i) * H * 0.18);
						return (
							<div key={k} style={{width: L, height: H, overflow: 'hidden', position: 'relative', maskImage: 'linear-gradient(transparent 0%, #000 14%, #000 86%, transparent 100%)', WebkitMaskImage: 'linear-gradient(transparent 0%, #000 14%, #000 86%, transparent 100%)'}}>
								<div style={{position: 'absolute', left: 0, top: 0, transform: `translateY(${(-pos * H).toFixed(2)}px)`}}>
									{Array.from({length: 11}, (_, j) => (
										<div key={j} style={{height: H, width: L, textAlign: 'center', fontSize: PX, lineHeight: `${H}px`, fontWeight: 800, color: cor, fontVariantNumeric: 'tabular-nums', textShadow: borrao > 0.3 ? `0 ${borrao.toFixed(1)}px ${(borrao * 0.8).toFixed(1)}px ${cor}66, 0 -${borrao.toFixed(1)}px ${(borrao * 0.8).toFixed(1)}px ${cor}66` : undefined}}>
											{j % 10}
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>

				{/* régua: ponteiro amarelo fixo, anos passando por baixo */}
				<div style={{position: 'relative', width: 820, height: 120, marginTop: 18, overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent)', WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 22%, #000 78%, transparent)'}}>
					<div style={{position: 'absolute', left: 0, right: 0, top: 30, height: 3, background: tintaMeta(tema)}} />
					{anosRegua.map((a) => {
						const x = 410 - (de! - a) * passo + deslize;
						const cheio = a % 5 === 0;
						return (
							<React.Fragment key={a}>
								<div style={{position: 'absolute', left: x - 1.5, top: cheio ? 6 : 16, width: 3, height: cheio ? 50 : 30, background: tintaMeta(tema)}} />
								{cheio && (
									<div style={{position: 'absolute', left: x - 60, width: 120, top: 66, textAlign: 'center', fontSize: 30, fontWeight: 700, color: tintaMeta(tema), textShadow: sombra(tema)}}>{a}</div>
								)}
							</React.Fragment>
						);
					})}
					<div style={{position: 'absolute', left: 410 - 4, top: 0, width: 8, height: 62, borderRadius: 4, background: COR.marca, boxShadow: tema === 'claro' ? 'none' : '0 0 14px rgba(255,216,77,.55)'}} />
				</div>
			</div>
		</Cena>
	);
};
