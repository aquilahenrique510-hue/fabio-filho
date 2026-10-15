// FLV-B-Capitulo — o card de capítulo que se repete nove vezes.
// A peça começa no onset do número falado ("Primeiro", "Dois"...) e dura até o
// próximo número. Entra no centro, o nome do eixo sobe palavra por palavra no
// tempo da fala, e o card encolhe para o canto como rótulo enquanto o capítulo
// dura, sempre derivando — nada fica parado.
// SEM barra de progresso: ele pediu para tirar em 14/10/2026 ("pode tirar").
//
// Tinta: tudo em chapa amarela com texto escuro, para ler igual sobre o fundo
// branco do bruto, sobre a camisa preta e no master escuro.
import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Archivo';
import {COR, EXPO_OUT, INOUT, MARGEM, LARGURA, f, placa, limita as trava, type Tema} from '../shared/design';
import {CAPITULOS, TOTAL} from './config';
import {Sons} from './som';

const {fontFamily} = loadFont('normal', {weights: ['700', '800'], subsets: ['latin', 'latin-ext']});

export type CapituloProps = {n: number; tema: Tema};

const CENTRO_Y = 600; // centro do card na entrada (terço superior)
const CANTO = {x: MARGEM, y: 140, escala: 0.36};
const SAIDA = 21; // quadros de saída
const FOLGA_FIM = 4; // a saída fecha 4 quadros antes do fim

const sobe = (frame: number, inicio: number, dur: number) =>
	EXPO_OUT(trava((frame - inicio) / dur));

export const Capitulo: React.FC<CapituloProps> = ({n, tema}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const cap = CAPITULOS[n - 1];
	const rel = (t: number) => f(t - cap.inicio);

	// entrada do número
	const eNum = sobe(frame, 0, f(0.5));

	// vai para o canto depois que o nome assentou
	const ultima = rel(cap.nome[cap.nome.length - 1].t);
	const vaiCanto = Math.max(ultima + f(0.9), f(1.8));
	const pCanto = INOUT(trava((frame - vaiCanto) / f(0.6)));

	// saída
	const fimSaida = durationInFrames - FOLGA_FIM;
	const pSaida = trava((frame - (fimSaida - SAIDA)) / SAIDA);
	const opSaida = 1 - INOUT(pSaida);

	// deriva: nunca para depois de assentar
	const deriva = interpolate(frame, [0, durationInFrames], [0, -14]);

	// pose do card: centro -> canto (o card é desenhado com origem no topo-esquerdo)
	const larguraCard = LARGURA;
	const xCentro = MARGEM;
	const yCentro = CENTRO_Y - 180;
	const x = interpolate(pCanto, [0, 1], [xCentro, CANTO.x]);
	const y = interpolate(pCanto, [0, 1], [yCentro, CANTO.y]) + deriva;
	const escala = interpolate(pCanto, [0, 1], [1, CANTO.escala]);

	const fundo = placa(tema);

	// nome numa linha só quando tem até 3 palavras: o corpo encolhe pelo número
	// de letras (80 px cabe até 15 — "BRASIL QUE PROSPERA", com 17, estourava a
	// borda direita na revisão montada). Com mais palavras, quebra em linhas.
	const letras = cap.nome.reduce((s, p) => s + p.w.length, 0);
	const corpoNome = cap.nome.length <= 3 ? Math.min(80, (80 * 15) / letras) : 80;

	return (
		<AbsoluteFill style={{backgroundColor: fundo ?? 'transparent'}}>
			<Sons
				cues={[
					{t: 0, som: 'whoosh_rapido', vol: 0.75},
					...cap.nome.map((p, i) => ({t: p.t - cap.inicio, som: (i % 2 ? 'pop_2' : 'pop_1') as 'pop_1' | 'pop_2', vol: 0.55})),
					{t: vaiCanto / 60, som: 'woosh_rapido', vol: 0.6},
				]}
			/>
			<AbsoluteFill style={{opacity: opSaida, fontFamily}}>
				<div
					style={{
						position: 'absolute',
						left: x,
						top: y,
						width: larguraCard,
						transformOrigin: '0 0',
						transform: `scale(${escala})`,
					}}
				>
					{/* número */}
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'baseline',
							gap: 10,
							backgroundColor: COR.marca,
							color: COR.texto,
							padding: '6px 34px 14px',
							borderRadius: 14,
							opacity: eNum,
							transform: `translateY(${(1 - eNum) * 70}px) scale(${0.88 + 0.12 * eNum})`,
							transformOrigin: '0 100%',
							filter: `blur(${(1 - eNum) * 12}px)`,
						}}
					>
						<span style={{fontSize: 260, fontWeight: 800, lineHeight: 1, letterSpacing: -8, fontVariantNumeric: 'tabular-nums'}}>
							{n}
						</span>
						<span style={{fontSize: 84, fontWeight: 700, lineHeight: 1, opacity: 0.55}}>/{TOTAL}</span>
					</div>

					{/* nome do eixo, palavra por palavra */}
					<div style={{display: 'flex', flexWrap: cap.nome.length <= 3 ? 'nowrap' : 'wrap', gap: 14, marginTop: 22, width: larguraCard}}>
						{cap.nome.map((p, i) => {
							// palavras do mesmo cue entram com 3 quadros de escalonamento
							const mesmoCue = cap.nome.slice(0, i).filter((q) => q.t === p.t).length;
							const e = sobe(frame, rel(p.t) + mesmoCue * 3, f(0.42));
							return (
								<span
									key={i}
									style={{
										backgroundColor: COR.marca,
										color: COR.texto,
										fontSize: corpoNome,
										fontWeight: 800,
										lineHeight: 1,
										textTransform: 'uppercase',
										padding: '12px 20px 14px',
										borderRadius: 10,
										opacity: e,
										transform: `translateY(${(1 - e) * 48}px)`,
										filter: `blur(${(1 - e) * 10}px)`,
									}}
								>
									{p.w}
								</span>
							);
						})}
					</div>
				</div>

			</AbsoluteFill>
		</AbsoluteFill>
	);
};
