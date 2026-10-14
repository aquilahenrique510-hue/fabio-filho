/**
 * O MÍNIMO DO `design.ts` QUE O LETTERING PRECISA.
 *
 * No projeto de origem este arquivo é muito maior (temas, placas, medidas de
 * todas as peças da série). Aqui está só o que os 19 arquivos de
 * `src/lettering/` realmente importam — conferido por grep, não de memória:
 *
 *   `f`      segundos → quadros
 *   `trava`  o clamp que todo `interpolate` da série usa
 *   `PAN`    a curva de câmera, usada pelos seis `Exemplo*.tsx`
 *   `COR`    só `COR.marca` é lido (o amarelo do modelo 4)
 *
 * SE O PROJETO DE DESTINO JÁ TIVER UM `design.ts`, use o dele e apague este —
 * mas confira que os quatro nomes existem lá com o mesmo sentido.
 */
import {Easing, interpolate} from 'remotion';

/**
 * 60 É O FRAME RATE DA SÉRIE. Se o projeto de destino roda em outro, MUDE AQUI
 * — e saiba que todas as molas e durações do lettering foram ajustadas a 60.
 * Em 30 fps elas continuam funcionando (são em quadros via `f`), mas o
 * `CameraMotionBlur` fica com metade das amostras.
 */
export const FPS = 60;

/** segundos → quadros */
export const f = (s: number) => s * FPS;

/** o clamp padrão de todo `interpolate` da série */
export const trava = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/** a curva de câmera — usada pelos `Exemplo*.tsx` no pan do fundo */
export const PAN = Easing.bezier(0.36, 0.06, 0.64, 0.94);

/**
 * A paleta da série. O lettering só lê `marca` (o amarelo dos destaques do
 * modelo 4); o resto vai junto porque são as cores da identidade e separá-las
 * é como a série acabou com a mesma cor sob quatro nomes diferentes.
 */
export const COR = {
  fundo: '#FFFFFF',
  texto: '#0F0F0F',
  meta: '#8A9099',
  regua: '#E4E7EA',
  /** o amarelo do marca-texto e dos destaques do modelo 4 */
  marca: '#FFD84D',
  carimbo: '#1F4B99',
  /** cinza quase preto — NUNCA preto puro, que lê como buraco de render */
  escuro: '#15171A',
} as const;

// ─── acrescentado nesta sessão (14/10/2026) ──────────────────────────────────

/**
 * DERIVA — RECONSTRUÍDA. O `base.tsx` do kit reexporta `deriva` daqui, mas o
 * `design.ts` que veio no kit não a tinha, e o kit não compilava. Esta versão
 * é linear: anda `px` pixels do primeiro ao último quadro. A original mora no
 * design.ts da máquina do Aquila — quando ele chegar, substitui esta.
 */
export const deriva = (frame: number, duracao: number, px: number) =>
  interpolate(frame, [0, Math.max(1, duracao)], [0, px], trava);

/** clamp numérico simples (o `trava` acima é o objeto de opções do interpolate) */
export const limita = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const LARG = 1080;
export const ALT = 1920;
export const MARGEM = 96;
export const LARGURA = 888;

export const EXPO_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const INOUT = Easing.bezier(0.65, 0, 0.35, 1);

export type Tema = 'alfa' | 'claro' | 'escuro';

/** null = alfa (sem placa) */
export const placa = (tema: Tema): string | null =>
  tema === 'alfa' ? null : tema === 'escuro' ? COR.escuro : COR.fundo;
