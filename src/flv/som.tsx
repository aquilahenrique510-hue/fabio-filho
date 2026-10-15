// O SOM DA SÉRIE (CLAUDE.md §4.1) — os arquivos são PRODUÇÃO PRÓPRIA dele
// (pasta "SFX - LETTERING"), normalizados para -1 dBFS em public/sfx/serie/.
// Regras: um gesto contínuo leva UM som do tamanho do gesto; rótulo leva tique
// (pop); o whoosh varia pela duração da animação; quando o arquivo é mais longo
// que o gesto, `dura` fecha com fade de 0,25 s.
import React from 'react';
import {Audio, Sequence, interpolate, staticFile} from 'remotion';
import {f} from '../shared/design';

export type Som =
	| 'pop_1' | 'pop_2' | 'carimbo' | 'chain' | 'chain_mais_long' | 'flash' | 'obturador'
	| 'woosh_rapido' | 'whoosh_rapido' | 'whoosh_02' | 'woosh_longo';

const DURA: Record<Som, number> = {
	pop_1: 0.101, pop_2: 0.101, carimbo: 0.509, chain: 0.509, chain_mais_long: 1.805, flash: 0.557,
	obturador: 0.293, woosh_rapido: 0.293, whoosh_rapido: 0.389, whoosh_02: 1.445, woosh_longo: 4.373,
};

/** A escada do whoosh pela duração do gesto (tabela do §4.1). */
export const whooshPara = (gesto: number): Som =>
	gesto <= 0.45 ? 'woosh_rapido' : gesto <= 0.8 ? 'whoosh_rapido' : gesto <= 2 ? 'whoosh_02' : 'woosh_longo';

export type Cue = {t: number; som: Som; vol?: number; dura?: number};

export const Sons: React.FC<{cues: Cue[]}> = ({cues}) => (
	<>
		{cues.map((c, i) => {
			const dura = Math.min(c.dura ?? DURA[c.som], DURA[c.som]);
			const v = c.vol ?? 0.8;
			const quadros = Math.max(2, Math.round(f(dura)));
			return (
				<Sequence key={i} from={Math.max(0, Math.round(f(c.t)))} durationInFrames={quadros} layout="none">
					<Audio
						src={staticFile(`sfx/serie/${c.som}.wav`)}
						volume={(q) => (c.dura ? v * interpolate(q, [quadros - f(0.25), quadros], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : v)}
					/>
				</Sequence>
			);
		})}
	</>
);
