// V3 · FLV-T-Tesoura · CENTRO, saindo de trás de uma tribuna · 00:01,900 → 00:05,700
// Pedido (15/10/2026): a referência dele (homem de terno, faixa presidencial e tesoura
// gigante) em ILUSTRAÇÃO. Ele mandou a ARTE FINAL e pediu para animar ESSA IMAGEM —
// o redesenho em vetor "não tá fiel à arte". Então a peça usa a própria arte, em duas
// camadas tiradas dela (scripts: recorte rembg do boneco + chave sobre o preto na
// tribuna, ver public/flv/tesoura_*.png):
//   tribuna sobe e ele sai de trás .. 00:01,900
//   a tesoura "corta" ................ 00:02,660 ("isso,") · 03,100 ("aquilo e") · 03,640 ("outro.")
//     (a tesoura é parte do desenho e não abre: cada corte é um tranco + brilho correndo
//      pelas lâminas + estrela nas pontas)
//   sai antes do Gatorade ............ 00:05,700 (a cena do corte da FLV-A3 sai em 5,6)
// SEM SOM de propósito: a FLV-A3-Abertura já toca o obturador nesses três cortes —
// repetir aqui empilharia o mesmo som (CLAUDE.md §4.1.1).
import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import {type Tema} from '../../shared/design';
import {Cena} from '../comum';
import {entra, rel} from './base';

export const TESOURA = {inicio: 1.9, fim: 5.7};
const CORTES = [2.66, 3.1, 3.64].map((t) => t - TESOURA.inicio);

// a arte é 1024×1536; no quadro ela entra deslocada assim
const DX = 28;
const DY = 190;
const TOPO_TRIBUNA = 762; // medido na arte
const PIVO = {x: 492, y: 578}; // pino da tesoura, medido na arte
const PONTAS = [{x: 262, y: 236}, {x: 731, y: 232}];

// estrela de brilho (4 pontas)
const Estrela: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) =>
	s <= 0 ? null : (
		<g transform={`translate(${x} ${y}) scale(${s}) rotate(${s * 40})`}>
			<path d="M0 -46 L9 -9 L46 0 L9 9 L0 46 L-9 9 L-46 0 L-9 -9 Z" fill="#FFFFFF" />
			<circle r={10} fill="#FFFFFF" />
		</g>
	);

export const Tesoura: React.FC<{tema: Tema}> = ({tema}) => {
	const frame = useCurrentFrame();
	const t = frame / 60;
	// golpe em cada corte: sobe rápido, volta em ~0,2 s
	const golpe = Math.max(...CORTES.map((c) => {
		const d = t - c;
		return d < -0.06 || d > 0.24 ? 0 : d < 0 ? 1 + d / 0.06 : 1 - d / 0.24;
	}));
	const respira = Math.sin(t * 3.2);
	const eTrib = entra(frame, 0, 0.55);
	const eBon = entra(frame, 0.2, 0.8);
	const eGlow = entra(frame, 0.4, 0.8);
	return (
		<Cena tema={tema} derivaPx={-10}>
			<div style={{position: 'absolute', left: DX, top: DY + (1 - eTrib) * 560, width: 1024, height: 1536}}>
				{/* brilho atrás dele, como na arte (a arte tem o halo no fundo; aqui ele é nosso) */}
				<div
					style={{
						position: 'absolute', left: 500 - 430, top: 330 - 360, width: 860, height: 720, borderRadius: '50%',
						background: 'radial-gradient(closest-side, rgba(255,236,205,0.55), rgba(255,236,205,0.18) 55%, rgba(255,236,205,0) 100%)',
						opacity: eGlow * (0.85 + 0.15 * Math.sin(t * 2.4) + 0.3 * golpe),
					}}
				/>
				{/* ele: só aparece acima do tampo — sobe de trás da tribuna */}
				<div style={{position: 'absolute', left: 0, top: 0, width: 1024, height: TOPO_TRIBUNA + 8, overflow: 'hidden'}}>
					<div
						style={{
							position: 'absolute', inset: 0, height: 1536,
							transformOrigin: `${PIVO.x}px ${PIVO.y}px`,
							transform: `translateY(${((1 - eBon) * 700 + golpe * 10).toFixed(2)}px) rotate(${(0.8 * Math.sin(t * 1.3)).toFixed(3)}deg) scale(${(1 + 0.025 * golpe).toFixed(4)}, ${(1 + 0.025 * golpe + 0.005 * respira).toFixed(4)})`,
						}}
					>
						<Img src={staticFile('flv/tesoura_boneco.png')} style={{position: 'absolute', left: 0, top: 0, width: 1024, height: 1536}} />
						{/* brilho correndo pelas lâminas + estrelas nas pontas, a cada corte */}
						<svg width={1024} height={1536} style={{position: 'absolute', left: 0, top: 0}}>
							<defs>
								<filter id="tes-blur" x="-20%" y="-20%" width="140%" height="140%">
									<feGaussianBlur stdDeviation={6} />
								</filter>
							</defs>
							{CORTES.map((c, i) => {
								const p = rel(frame, c - 0.02, 0.28);
								if (p <= 0 || p >= 1) return null;
								return PONTAS.map((pt, j) => {
									const len = Math.hypot(pt.x - PIVO.x, pt.y - PIVO.y);
									const d = `M${PIVO.x} ${PIVO.y} L${pt.x} ${pt.y}`;
									return (
										<g key={`${i}-${j}`}>
											<path d={d} stroke="#FFFFFF" strokeWidth={22} strokeLinecap="round" fill="none" filter="url(#tes-blur)"
												strokeDasharray={`110 ${len + 200}`} strokeDashoffset={-(len + 110) * p + 110} opacity={0.9} />
											<path d={d} stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" fill="none"
												strokeDasharray={`70 ${len + 200}`} strokeDashoffset={-(len + 70) * p + 70} />
										</g>
									);
								});
							})}
							{CORTES.map((c, i) => {
								const p = rel(frame, c + 0.12, 0.3);
								const s = p <= 0 || p >= 1 ? 0 : Math.sin(p * Math.PI);
								return (
									<g key={i}>
										<Estrela x={PONTAS[0].x} y={PONTAS[0].y} s={s * 0.9} />
										<Estrela x={PONTAS[1].x} y={PONTAS[1].y} s={s * 0.9} />
									</g>
								);
							})}
						</svg>
					</div>
				</div>
				<Img src={staticFile('flv/tesoura_tribuna.png')} style={{position: 'absolute', left: 0, top: 0, width: 1024, height: 1536}} />
			</div>
		</Cena>
	);
};
