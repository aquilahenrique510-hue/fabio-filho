// FLV · V2 ILUSTRADA — O VÍDEO INTEIRO NUMA COMPOSIÇÃO SÓ, COM SFX.
// Pedido do cliente (15/10/2026): "mandar tudo em um só vídeo com os SFX".
// Cada peça entra no seu timecode do SRT (NIKOLAS_FUNDO_BRANCO_..._por.srt);
// a ordem aqui é a ordem das camadas (a primeira fica embaixo).
import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {f, type Tema} from '../shared/design';
import {Boatos, BOATOS} from './Boatos';
import {Simbolos, MARCADORES} from './Simbolos';
import {DocumentoCapa, Pagina15, Pagina58, K, L, M} from './Documento';
import {Numeros, SEM_MEDO, CASAS, CRESCE, MINISTERIOS} from './Numeros';
import {Barras, IMPOSTO} from './Barras';
import {Trem, TREM} from './Trem';
import {Capitulo} from './Capitulo';
import {CAPITULOS} from './config';
import {PalavraPorPalavra, ESSA_NEM_EU, duracaoPalavras} from './PalavraPorPalavra';
import {Clarea, CLAREA, MenosImposto, MENOS_IMPOSTO, Chamas, CHAMAS} from './Ilustra';
import {Faccao, FACCAO, Creche, CRECHE, Escritura, ESCRITURA, Servicos, SERVICOS, Saude, SAUDE, Bet, BET, Reforco, REFORCO, Faculdade, FACULDADE, Remedio, REMEDIO} from './ilustra/cap1a5';
import {Fraude, FRAUDE, Emprego, EMPREGO, Reeleicao, REELEICAO, Monocratica, MONOCRATICA, Parente, PARENTE, Supersalario, SUPERSALARIO, Estatal, ESTATAL} from './ilustra/cap6a9';
import {LetteringModelo2} from '../lettering/Modelo2';
import {LetteringModelo1} from '../lettering/Modelo1';

export const V2_DURACAO = 148.1;

type J = {inicio: number; fim: number};
const Em: React.FC<{j: J; children: React.ReactNode}> = ({j, children}) => (
	<Sequence from={Math.round(f(j.inicio))} durationInFrames={Math.round(f(j.fim - j.inicio))} layout="none">
		<AbsoluteFill>{children}</AbsoluteFill>
	</Sequence>
);

export const V2: React.FC<{tema: Tema}> = ({tema}) => (
	<AbsoluteFill>
		{/* gancho */}
		<Em j={BOATOS}><Boatos tema={tema} /></Em>
		<Em j={{inicio: 8.84, fim: 10.94}}>
			<LetteringModelo2 pequena="contar o Flávio" destaque="REAL" duracao={2.1} />
		</Em>
		{/* o documento, com o campo de símbolos embaixo */}
		<Em j={MARCADORES}><Simbolos tema={tema} /></Em>
		<Em j={K}><DocumentoCapa tema={tema} /></Em>
		{/* cap. 1 */}
		<Em j={FACCAO}><Faccao tema={tema} /></Em>
		<Em j={SEM_MEDO}><Numeros tema={tema} itens={SEM_MEDO.itens} /></Em>
		<Em j={L}><Pagina15 tema={tema} /></Em>
		{/* cap. 2 */}
		<Em j={CRECHE}><Creche tema={tema} /></Em>
		<Em j={ESCRITURA}><Escritura tema={tema} /></Em>
		<Em j={CLAREA}><Clarea tema={tema} /></Em>
		{/* cap. 3 */}
		<Em j={SERVICOS}><Servicos tema={tema} /></Em>
		<Em j={SAUDE}><Saude tema={tema} /></Em>
		{/* cap. 4 */}
		<Em j={IMPOSTO}><Barras tema={tema} /></Em>
		<Em j={MENOS_IMPOSTO}><MenosImposto tema={tema} /></Em>
		<Em j={BET}><Bet tema={tema} /></Em>
		{/* cap. 5 */}
		<Em j={REFORCO}><Reforco tema={tema} /></Em>
		<Em j={FACULDADE}><Faculdade tema={tema} /></Em>
		<Em j={REMEDIO}><Remedio tema={tema} /></Em>
		{/* cap. 6 */}
		<Em j={CASAS}><Numeros tema={tema} itens={CASAS.itens} /></Em>
		<Em j={FRAUDE}><Fraude tema={tema} /></Em>
		<Em j={EMPREGO}><Emprego tema={tema} /></Em>
		{/* cap. 7 */}
		<Em j={CRESCE}><Numeros tema={tema} itens={CRESCE.itens} /></Em>
		<Em j={TREM}><Trem tema={tema} /></Em>
		<Em j={{inicio: 111.48, fim: 111.48 + duracaoPalavras(ESSA_NEM_EU)}}>
			<PalavraPorPalavra palavras={ESSA_NEM_EU} />
		</Em>
		<Em j={CHAMAS}><Chamas tema={tema} /></Em>
		<Em j={M}><Pagina58 tema={tema} /></Em>
		{/* cap. 8 */}
		<Em j={REELEICAO}><Reeleicao tema={tema} /></Em>
		<Em j={MONOCRATICA}><Monocratica tema={tema} /></Em>
		<Em j={PARENTE}><Parente tema={tema} /></Em>
		{/* cap. 9 */}
		<Em j={MINISTERIOS}><Numeros tema={tema} itens={MINISTERIOS.itens} /></Em>
		<Em j={SUPERSALARIO}><Supersalario tema={tema} /></Em>
		<Em j={ESTATAL}><Estatal tema={tema} /></Em>
		{/* fecho */}
		<Em j={{inicio: 143.58, fim: 148.08}}>
			<LetteringModelo1 linha1="mas pelo que" linha2="CONSEGUE" linha3="sustentar" duracao={4.5} />
		</Em>
		{/* cards de capítulo por cima de tudo */}
		{CAPITULOS.map((c) => (
			<Em key={c.n} j={c}><Capitulo n={c.n} tema={tema} /></Em>
		))}
	</AbsoluteFill>
);
