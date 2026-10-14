// FLV-L2-EssaNemEu — "E essa nem eu esperava", 01:51,480 → 01:53,460.
// Pedido dele (14/10/2026): "pode ser palavra por palavra". Cada palavra entra
// no onset dela na fala; as três primeiras formam a linha pequena (Coolvetica)
// e ESPERAVA é o destaque (Montserrat Black). Herda tudo da base do lettering:
// mola macia, dynamic zoom que não trava, deriva, desvanecer de 0,75 s,
// CameraMotionBlur e o pop dele por palavra.
//
// Tempos (relativos a 01:51,480, onset do cue "essa nem"):
//   essa ....... 0,000  cue 224
//   nem ........ 0,170  mesmo cue de "essa": o SRT não separa as duas palavras;
//                       0,17 s é o ritmo('essa') da base, não um onset medido
//   eu ......... 0,940  cue 225 (01:52,420)
//   ESPERAVA ... 1,040  cue 226 (01:52,520)
import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {fitText, measureText} from '@remotion/layout-utils';
import {
	COOLVETICA,
	MONTSERRAT,
	LARG_ALVO,
	MOLA_MACIA,
	MOLA_DESTAQUE,
	SOMBRA_SUAVE,
	ZOOM_DE,
	ZOOM_EXTRA,
	Pops,
	comDestaqueForte,
	deriva,
	duracaoDe,
	folgaAcento,
	mola,
	useFontesProntas,
} from '../lettering/base';
import {f, trava} from '../shared/design';

export type Palavra = {w: string; t: number; destaque?: boolean};

export const ESSA_NEM_EU: Palavra[] = [
	{w: 'essa', t: 0},
	{w: 'nem', t: 0.17},
	{w: 'eu', t: 0.94},
	{w: 'ESPERAVA', t: 1.04, destaque: true},
];

export const duracaoPalavras = (p: Palavra[]) => duracaoDe(p[p.length - 1].t + 0.5);

const CENTRO_Y = 1180;

const Bloco: React.FC<{palavras: Palavra[]}> = ({palavras}) => {
	const frame = useCurrentFrame();
	const {durationInFrames: dur} = useVideoConfig();
	const pronto = useFontesProntas();

	const pequenas = palavras.filter((p) => !p.destaque);
	const destaque = palavras.find((p) => p.destaque)!;

	const medidas = React.useMemo(() => {
		if (!pronto) return null;
		const sD = Math.min(
			260,
			fitText({text: destaque.w, withinWidth: LARG_ALVO, fontFamily: MONTSERRAT, fontWeight: 900, letterSpacing: '-0.02em'})
				.fontSize,
		);
		// a linha pequena casa com a largura do destaque (96%), como no modelo 2
		const largD = measureText({text: destaque.w, fontFamily: MONTSERRAT, fontWeight: 900, fontSize: sD, letterSpacing: '-0.02em'})
			.width;
		const frase = pequenas.map((p) => p.w).join(' ');
		const sP = Math.min(
			sD * 0.62,
			fitText({text: frase, withinWidth: largD * 0.96, fontFamily: COOLVETICA}).fontSize,
		);
		return {sD, sP};
	}, [pronto, destaque.w, pequenas]);

	if (!medidas) return null;
	const {sD, sP} = medidas;

	const z = interpolate(frame, [0, dur], [ZOOM_DE, 1 - ZOOM_EXTRA], {...trava, easing: Easing.bezier(0.3, 0.2, 0.25, 1)});
	const desvanece = interpolate(frame, [dur - f(0.75), dur - 1], [1, 0], {...trava, easing: Easing.bezier(0.4, 0, 0.7, 1)});

	// montagem vertical pela métrica das fontes (mesma conta do modelo 2)
	const topoD = CENTRO_Y - (0.957 * sD - 0.953 * sP) / 2;
	const topoCaps = topoD + 0.1585 * sD - folgaAcento(destaque.w) * sD;
	const topoPequena = topoCaps - 0.06 * sD - 1.1 * sP;

	const kD = mola(frame, destaque.t, MOLA_DESTAQUE);
	const opD = interpolate(frame, [f(destaque.t), f(destaque.t + 0.4)], [0, 1], trava);

	return (
		<AbsoluteFill
			style={{
				opacity: desvanece,
				transform: `translateY(${deriva(frame, dur, -14).toFixed(2)}px) scale(${z.toFixed(5)})`,
				transformOrigin: `540px ${CENTRO_Y}px`,
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: topoPequena,
					display: 'flex',
					justifyContent: 'center',
					gap: sP * 0.26,
				}}
			>
				{pequenas.map((p, i) => {
					const k = mola(frame, p.t, MOLA_MACIA);
					const op = interpolate(frame, [f(p.t), f(p.t + 0.3)], [0, 1], trava);
					return (
						<span
							key={i}
							style={{
								fontFamily: COOLVETICA,
								fontSize: sP,
								lineHeight: 1,
								color: '#FFFFFF',
								textShadow: SOMBRA_SUAVE,
								opacity: op,
								transform: `translateY(${((1 - k) * sP * 0.9).toFixed(2)}px)`,
								filter: `blur(${((1 - k) * 9).toFixed(2)}px)`,
								display: 'inline-block',
							}}
						>
							{p.w}
						</span>
					);
				})}
			</div>
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: topoD,
					textAlign: 'center',
					fontFamily: MONTSERRAT,
					fontWeight: 900,
					fontSize: sD,
					lineHeight: 1,
					letterSpacing: '-0.02em',
					color: '#FFFFFF',
					textShadow: SOMBRA_SUAVE,
					opacity: opD,
					transform: `translateY(${((1 - kD) * sD * 0.55).toFixed(2)}px)`,
					filter: `blur(${((1 - kD) * 12).toFixed(2)}px)`,
				}}
			>
				{destaque.w}
			</div>
		</AbsoluteFill>
	);
};

export const PalavraPorPalavra: React.FC<{palavras?: Palavra[]}> = ({palavras = ESSA_NEM_EU}) => (
	<AbsoluteFill>
		<Pops cues={comDestaqueForte(palavras.map((p) => ({t: p.t})))} />
		<CameraMotionBlur shutterAngle={180} samples={8}>
			<Bloco palavras={palavras} />
		</CameraMotionBlur>
	</AbsoluteFill>
);
