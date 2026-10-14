// Números falados, um por vez, no mesmo lugar, com hodômetro. Cada item entra
// no onset do número na fala; o anterior sobe e some enquanto o novo sobe e
// assenta (troca no lugar, como o FN-B). Rótulo e fonte entram escalonados.
// Os tempos são relativos ao início da peça (o onset do primeiro número).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {COR, EXPO_OUT, f, limita, type Tema} from '../shared/design';
import {Cena, Odometro, sobe, sombra, tinta, tintaMeta} from './comum';

export type ItemNumero = {
	t: number; // s, relativo ao início da peça
	valor: string; // só a parte que rola: "500", "2,5", "1.400"
	antes?: string; // "R$"
	depois?: string; // "MIL", "MILHÕES", "%"
	rotulo: string; // literal da fala
};

export type NumerosProps = {tema: Tema; itens: ItemNumero[]};

const FONTE = 'Plano de governo · TSE';
const CENTRO_Y = 1180;
const PX = 230;

export const Numeros: React.FC<NumerosProps> = ({tema, itens}) => (
	<Cena tema={tema}>
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
	const px = item.valor.length + (item.antes?.length ?? 0) > 5 ? PX * 0.82 : PX;
	return (
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
				top: CENTRO_Y + 300,
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
		{t: 0, valor: '5', rotulo: 'presídios de segurança máxima'},
		{t: 32.42 - 29.9, valor: '500', depois: 'MIL', rotulo: 'vagas novas'},
		{t: 34.16 - 29.9, valor: '1', depois: 'MILHÃO', rotulo: 'de câmeras com reconhecimento facial'},
	] as ItemNumero[],
};

/** FLV-G-Casas · cap. 6 · 01:28,000 → 01:30,400 */
export const CASAS = {
	inicio: 88.0,
	fim: 90.4,
	itens: [{t: 0, valor: '2,5', depois: 'MILHÕES', rotulo: 'de casas'}] as ItemNumero[],
};

/** FLV-H-Cresce · cap. 7 · 01:40,300 → 01:46,880 */
export const CRESCE = {
	inicio: 100.3,
	fim: 106.88,
	itens: [
		{t: 0, valor: '900', antes: 'R$', depois: 'BILHÕES', rotulo: 'em estradas, portos e ferrovias em quatro anos'},
		{t: 105.0 - 100.3, valor: '4', depois: '%', rotulo: 'meta de crescer ao ano'},
	] as ItemNumero[],
};

/** FLV-J-Ministerios · cap. 9 · 02:12,600 → 02:15,140 */
export const MINISTERIOS = {
	inicio: 132.6,
	fim: 135.14,
	itens: [{t: 0, valor: '10', rotulo: 'ministérios a menos, no mínimo'}] as ItemNumero[],
};
