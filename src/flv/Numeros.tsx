// Números falados, um por vez, no mesmo lugar, com hodômetro. Cada item entra
// no onset do número na fala; o anterior sobe e some enquanto o novo sobe e
// assenta (troca no lugar, como o FN-B). Rótulo e fonte entram escalonados.
// Os tempos são relativos ao início da peça (o onset do primeiro número).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COR, EXPO_OUT, f, limita, type Tema} from '../shared/design';
import {Cena, Odometro, sobe, sombra, tinta, tintaMeta} from './comum';
import {Sons, type Cue} from './som';
import {DesCamera, DesCasas, DesCresce, DesMinisterios, DesObras, DesPresidio} from './ilustra/cap6a9';
import {ESCALA_ILUSTRA} from './ilustra/base';

/** V2: desenho da proposta que entra junto do número, na faixa de baixo. */
export type DesenhoNumero = React.FC<{e: number; cor: string; tema: Tema}>;

export type ItemNumero = {
	t: number; // s, relativo ao início da peça
	valor: string; // só a parte que rola: "500", "2,5", "1.400"
	antes?: string; // "R$"
	depois?: string; // "MIL", "MILHÕES", "%"
	rotulo: string; // literal da fala
	desenho?: DesenhoNumero; // V2
	tDesenho?: number; // V4: atraso do desenho em s (padrão 0,1)
	durDesenho?: number; // V4: duração do gesto do desenho em s (padrão 0,9)
};

export type NumerosProps = {tema: Tema; itens: ItemNumero[]};

const FONTE = 'Plano de governo · TSE';
const CENTRO_Y = 1180;
const PX = 230;

/** Som: o hodômetro rola (chain, cortado no tempo da rolagem) e o rótulo dá um tique. */
const cuesDe = (itens: ItemNumero[]): Cue[] =>
	itens.flatMap((it, i) => [
		{t: it.t, som: 'chain' as const, vol: 0.8},
		{t: it.t + 0.18, som: (i % 2 ? 'pop_2' : 'pop_1') as 'pop_1' | 'pop_2', vol: 0.6},
	]);

export const Numeros: React.FC<NumerosProps> = ({tema, itens}) => (
	<Cena tema={tema}>
		<Sons cues={cuesDe(itens)} />
		{itens.map((it, i) => (
			<Item key={i} tema={tema} item={it} proximo={itens[i + 1]?.t} />
		))}
		<Fonte tema={tema} inicio={f(itens[0].t + 0.35)} />
	</Cena>
);

const Item: React.FC<{tema: Tema; item: ItemNumero; proximo?: number}> = ({tema, item, proximo}) => {
	const frame = useCurrentFrame();
	const ini = f(item.t);
	const e = sobe(frame, ini, f(0.55));
	// troca no lugar: sai subindo em 0,26 s quando o próximo entra
	const s = proximo === undefined ? 0 : EXPO_OUT(limita((frame - f(proximo)) / f(0.26)));
	if (frame < ini - 1 || s >= 1) return null;
	const cor = tinta(tema);
	const eR = sobe(frame, ini + f(0.18), f(0.5));
	const temSuf = Boolean(item.depois);
	// gesto longo (durDesenho) corre em ritmo constante — sequência de 10 não pode ser expo
	const eD = item.durDesenho
		? limita((frame - ini - f(item.tDesenho ?? 0.1)) / f(item.durDesenho))
		: sobe(frame, ini + f(item.tDesenho ?? 0.1), f(0.9));
	const Des = item.desenho;
	const px = item.valor.length + (item.antes?.length ?? 0) > 5 ? PX * 0.82 : PX;
	return (
		<>
		{Des && (
			<svg width={1080} height={1920} style={{position: 'absolute', inset: 0, opacity: e * (1 - s), overflow: 'visible'}}>
				<g transform={`translate(540 1560) scale(${(0.9 * ESCALA_ILUSTRA).toFixed(3)})`}>
					<Des e={eD} cor={cor} tema={tema} />
				</g>
			</svg>
		)}
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				top: CENTRO_Y - px * 0.62,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				opacity: e * (1 - s),
				transform: `translateY(${((1 - e) * 60 - s * 70).toFixed(2)}px)`,
				filter: `blur(${((1 - e) * 10 + s * 8).toFixed(2)}px)`,
			}}
		>
			<div style={{display: 'flex', alignItems: 'baseline', gap: item.depois === '%' ? px * 0.02 : px * 0.12, color: cor, textShadow: sombra(tema)}}>
				{item.antes && <span style={{fontSize: px * 0.42, fontWeight: 800}}>{item.antes}</span>}
				<Odometro valor={item.valor} px={px} cor={cor} inicio={ini} sombraTexto={sombra(tema)} />
				{temSuf && (
					<span
						style={{
							fontSize: item.depois === '%' ? px * 0.62 : px * 0.42,
							fontWeight: 800,
							backgroundColor: item.depois === '%' ? 'transparent' : COR.marca,
							color: item.depois === '%' ? cor : COR.texto,
							textShadow: item.depois === '%' ? sombra(tema) : 'none',
							padding: item.depois === '%' ? 0 : '4px 14px 8px',
							borderRadius: 8,
							alignSelf: 'center',
						}}
					>
						{item.depois}
					</span>
				)}
			</div>
			<div
				style={{
					marginTop: 18,
					fontSize: 52,
					fontWeight: 700,
					color: cor,
					textShadow: sombra(tema),
					opacity: eR,
					transform: `translateY(${((1 - eR) * 24).toFixed(2)}px)`,
					maxWidth: 888,
					textAlign: 'center',
					lineHeight: 1.15,
				}}
			>
				{item.rotulo}
			</div>
		</div>
		</>
	);
};

const Fonte: React.FC<{tema: Tema; inicio: number}> = ({tema, inicio}) => {
	const frame = useCurrentFrame();
	const e = sobe(frame, inicio, f(0.5));
	return (
		<div
			style={{
				position: 'absolute',
				left: 0,
				right: 0,
				top: 1720,
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
			{FONTE}
		</div>
	);
};

// ── os itens, tirados do SRT ─────────────────────────────────────────────────

/** FLV-C-SemMedo · cap. 1 · 00:29,900 → 00:36,940 */
export const SEM_MEDO = {
	inicio: 29.9,
	fim: 36.94,
	itens: [
		{t: 0, valor: '5', rotulo: 'presídios de segurança máxima', desenho: DesPresidio},
		{t: 32.42 - 29.9, valor: '500', depois: 'MIL', rotulo: 'vagas novas', desenho: DesPresidio},
		{t: 34.16 - 29.9, valor: '1', depois: 'MILHÃO', rotulo: 'de câmeras com reconhecimento facial', desenho: DesCamera},
	] as ItemNumero[],
};

/** FLV-G-Casas · cap. 6 · 01:28,000 → 01:30,400 */
export const CASAS = {
	inicio: 88.0,
	fim: 90.4,
	itens: [{t: 0, valor: '2,5', depois: 'MILHÕES', rotulo: 'de casas', desenho: DesCasas}] as ItemNumero[],
};

/** FLV-H-Cresce · cap. 7 · 01:40,300 → 01:46,880 */
export const CRESCE = {
	inicio: 100.3,
	fim: 106.88,
	itens: [
		{t: 0, valor: '900', antes: 'R$', depois: 'BILHÕES', rotulo: 'em estradas, portos e ferrovias em quatro anos', desenho: DesObras},
		{t: 105.0 - 100.3, valor: '4', depois: '%', rotulo: 'meta de crescer ao ano', desenho: DesCresce},
	] as ItemNumero[],
};

/** FLV-J-Ministerios · cap. 9 · 02:12,600 → 02:15,140 */
export const MINISTERIOS = {
	inicio: 132.6,
	fim: 135.14,
	itens: [{t: 0, valor: '10', rotulo: 'ministérios a menos, no mínimo', desenho: DesMinisterios, tDesenho: 0.45, durDesenho: 1.9}] as ItemNumero[],
};
