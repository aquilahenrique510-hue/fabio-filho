// V4 · FLV-S-Plano · depois do cap. 9 · 02:21,020 → 02:23,580
// "Um plano de governo não vale pelo que promete," — pedido (15/10/2026): "faz
// depois do nove mais alguma coisa, mas sem mexer no lettering". O lettering de
// fecho ("mas pelo que CONSEGUE sustentar", 02:23,580) fica intocado; esta peça
// sai exatamente quando ele entra.
//   capa REAL do plano aparece ............ 02:21,020 ("Um plano")
//   balões de promessa sobem e vão embora .. 02:21,940 ("não vale")
//   três colunas sobem e a capa assenta .... 02:22,680 ("promete,") → 02:23,200 (prepara o "sustentar")
// TOM: os balões não estouram e não viram nada — só sobem. O vídeo não diz que o
// plano promete à toa; diz que o que vale é o que se sustenta. Sem rótulo: a frase
// é a tese dele e o lettering dá conta dela.
import React from 'react';
import {Img, staticFile} from 'remotion';
import {COR, FAVOR, par, type Tema} from '../../shared/design';
import {Peca, entra, vira} from './base';
import {whooshPara} from '../som';

export const PLANO = {inicio: 141.02, fim: 143.58};
const r = (t: number) => t - PLANO.inicio;

export const Plano: React.FC<{tema: Tema}> = ({tema}) => (
	<Peca
		tema={tema}
		inicio={PLANO.inicio}
		fonte="Para o Brasil vencer o atraso · plano de governo"
		cues={[
			{t: 141.02, som: whooshPara(0.6), vol: 0.75},
			{t: 141.94, som: 'whoosh_rapido', vol: 0.7},
			{t: 142.68, som: 'chain', vol: 0.75},
		]}
		desenho={({frame, tema: tm, cor}) => {
			const e = entra(frame, 0, 0.6);
			const balao = vira(frame, r(141.94), 0.9);
			const colunas = entra(frame, r(142.68), 0.5);
			const verde = par(FAVOR, tm);
			// a capa desce um pouco quando as colunas chegam embaixo dela
			const yCapa = 1040 + (1 - e) * 80 + colunas * 20;
			return (
				<>
					{/* balões de promessa: sobem e saem */}
					{[-170, -50, 80, 190].map((xx, i) => (
						<g key={i} transform={`translate(${540 + xx * 1.3} ${800 - balao * (420 + i * 60)})`} opacity={e * (1 - balao)}>
							<line x1={0} y1={66} x2={0} y2={170} stroke={cor} strokeWidth={4} />
							<ellipse cx={0} cy={0} rx={56} ry={68} fill={i % 2 ? COR.marca : '#FFFFFF'} />
						</g>
					))}
					{/* colunas que sustentam */}
					{[-170, 0, 170].map((xx, i) => {
						const h = 260 * Math.max(0, Math.min(1, colunas * 1.4 - i * 0.2));
						return (
							<g key={xx}>
								<rect x={540 + xx - 34} y={1560 - h} width={68} height={h} fill={verde} />
								<rect x={540 + xx - 46} y={1560 - h} width={92} height={Math.min(h, 18)} fill={verde} />
							</g>
						);
					})}
					<rect x={300} y={1560} width={480} height={20} rx={6} fill={cor} opacity={colunas} />
					{/* a capa real do plano (pág. 1 do PDF, 200 dpi) */}
					<g transform={`translate(540 ${yCapa})`} opacity={e}>
						<foreignObject x={-190} y={-269} width={380} height={538}>
							<Img src={staticFile('flv/plano_p01.png')} style={{width: 380, height: 538, display: 'block', boxShadow: '0 20px 50px rgba(0,0,0,.5)'}} />
						</foreignObject>
					</g>
				</>
			);
		}}
	/>
);
