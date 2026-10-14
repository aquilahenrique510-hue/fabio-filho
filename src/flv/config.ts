// NIKOLAS_FUNDO_BRANCO_H264_6K_AUDIO_por.srt — "O Flávio real", 02:28,10.
// Plano "Para o Brasil Vencer o Atraso" (TSE, 13/08/2026), nove eixos.
// Todos os tempos são onsets de cue do SRT, em segundos. Quando um cue traz
// duas palavras ("Brasil sem"), as duas entram no onset do cue.

export type Palavra = {t: number; w: string};

export type Capitulo = {
	n: number;
	inicio: number; // onset do número falado ("Primeiro", "Dois"...)
	fim: number; // onset do número seguinte, ou da frase de fecho
	nome: Palavra[];
};

export const CAPITULOS: Capitulo[] = [
	{n: 1, inicio: 26.06, fim: 43.9, nome: [{t: 26.58, w: 'Brasil'}, {t: 26.58, w: 'sem'}, {t: 27.24, w: 'medo'}]},
	{n: 2, inicio: 43.9, fim: 55.8, nome: [{t: 44.66, w: 'Brasil'}, {t: 44.66, w: 'por'}, {t: 45.38, w: 'elas'}]},
	{n: 3, inicio: 55.8, fim: 65.14, nome: [{t: 56.26, w: 'Brasil'}, {t: 56.26, w: 'sem'}, {t: 56.9, w: 'fila'}]},
	{n: 4, inicio: 65.14, fim: 76.98, nome: [{t: 65.74, w: 'Brasil'}, {t: 66.24, w: 'mais'}, {t: 66.48, w: 'barato'}]},
	{n: 5, inicio: 76.98, fim: 86.62, nome: [{t: 77.3, w: 'Brasil'}, {t: 77.3, w: 'que'}, {t: 77.68, w: 'prepara'}]},
	{n: 6, inicio: 86.62, fim: 98.54, nome: [{t: 87.14, w: 'Brasil'}, {t: 87.14, w: 'que'}, {t: 87.54, w: 'prospera'}]},
	{n: 7, inicio: 98.54, fim: 118.72, nome: [{t: 99.02, w: 'Brasil'}, {t: 99.02, w: 'que'}, {t: 99.44, w: 'cresce'}]},
	{
		n: 8,
		inicio: 118.72,
		fim: 130.6,
		nome: [
			{t: 119.54, w: 'Brasil'},
			{t: 119.54, w: 'que'},
			{t: 120.08, w: 'cumpre'},
			{t: 120.08, w: 'a'},
			{t: 120.9, w: 'Constituição'},
		],
	},
	{
		n: 9,
		inicio: 130.6,
		fim: 141.02,
		nome: [
			{t: 131.3, w: 'Brasil'},
			{t: 131.3, w: 'que'},
			{t: 131.72, w: 'não'},
			{t: 131.72, w: 'volta'},
			{t: 132.1, w: 'atrás'},
		],
	},
];

export const TOTAL = CAPITULOS.length;
export const FONTE = 'Plano de governo · TSE';
