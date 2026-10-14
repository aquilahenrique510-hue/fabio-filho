# KIT · LETTERING DE DESTAQUE (6 modelos)

Os letterings da série "fundo branco" do Nikolas Ferreira, feitos em Remotion.
Seis modelos, cada um tirado de uma referência em **vídeo** que o Aquila mandou
e extraída quadro a quadro.

Este kit é autocontido: dá para plugar num projeto Remotion novo.

---

## O QUE VEM AQUI

```
src/lettering/       19 arquivos — base.tsx, Modelo1..6, Lettering1..6, Exemplo1..6
src/shared/design.ts o mínimo que o lettering importa (f, trava, PAN, COR)
public/fonts/        Coolvetica_Rg.otf   ← NÃO tem no Google Fonts, é arquivo
public/sfx/lettering/ pop_1.wav, pop_2.wav  ← o som de digitação
public/lettering/    fundo_exemplo.png   ← o fundo dos seis Exemplo*.tsx
REGISTRO no Root.tsx.txt   as 12 <Composition> prontas para colar
```

**Dependências npm** (as mesmas versões do projeto de origem):

```
remotion                4.0.525
@remotion/motion-blur   4.0.525
@remotion/layout-utils  4.0.525
@remotion/google-fonts  4.0.525
react                   19.0.0
```

---

## INSTALAÇÃO, EM QUATRO PASSOS

1. Copie `src/lettering/` e `src/shared/design.ts` para o projeto.
   **Se já existir um `design.ts` lá**, use o de lá e apague este — mas confira
   que ele exporta `f`, `trava`, `PAN` e `COR.marca`.
2. Copie `public/fonts/`, `public/sfx/lettering/` e `public/lettering/` para o
   `public/` do projeto. **Os três** — cada `staticFile()` do kit aponta para um
   deles, e arquivo que falta em `public/` não dá erro de compilação: o Remotion
   só serve 404 e a peça renderiza sem a fonte, sem o som ou sem o fundo.
3. Cole o conteúdo de `REGISTRO no Root.tsx.txt` no seu `Root.tsx` (imports no
   topo, `<Composition>` dentro do fragmento que já existe).
4. `npx tsc --noEmit` e depois `npx remotion studio`.

Render de um lettering:

```bash
npx remotion render LETTER-Modelo1 saida.mov \
  --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
  --props='{"linha1":"parar de criar","linha2":"IMPOSTO","linha3":"em cima de imposto"}'
```

Sai em **alfa** — é feito para entrar por cima do vídeo, não sobre fundo.

---

## OS DOIS TIPOS DE COMPOSIÇÃO — e para que serve cada um

Cada modelo vem em **duas** composições, e confundir as duas custa tempo:

| id | o que é | quando usar |
|---|---|---|
| `LETTER-Exemplo`…`Exemplo6` | **a vitrine.** O lettering montado sobre `fundo_exemplo.png`, com pan de câmera. Fundo OPACO. | para ver o modelo funcionando, ajustar e aprovar |
| `LETTER-Modelo1`…`Modelo6` | **a ferramenta.** Fundo TRANSPARENTE, texto e tempos por `--props`, duração calculada do texto. | é esta que se renderiza e entra na timeline |

Os `Exemplo*` existem para você olhar; os `Modelo*` para você usar. Renderizar
um `Exemplo*` e levar para a edição entrega um lettering com fundo chapado por
cima do vídeo.

## OS SEIS MODELOS

| modelo | desenho | limite de palavras |
|---|---|---|
| **1** | três linhas brancas; a do meio entra embaçada e **reparte na diagonal** | 3 · **1** · 4 |
| **2** | 3–4 palavras numa linha só em cima + UMA palavra grande embaixo; tudo sobe **palavra a palavra** (digitação) | 4 · **1** |
| **3** | pequena à esquerda + PALAVRA GRANDE que **sangra pela borda direita** + pequena embaixo; falso itálico, bloco girado −1,2° | 3 · **1** · 4 |
| **4** | escada descendo à direita, **duas palavras AMARELAS** (`COR.marca`) | 3 · **1** · 3 · **1** |
| **5** | PALAVRA LARANJA `#FF6700` que acende **embaralhada e piscando** entre duas linhas que a invadem; a de cima **digita** | 2 · **1** · 2 |
| **6** | mesmo esqueleto do 5, mas a palavra grande é **CROMADA** (degradê dentro das letras) e nada pisca — tudo chega desfocado e ganha nitidez | 2 · **1** · 2 |

**O destaque é SEMPRE uma palavra só.** Os limites estão em `LIMITES`, dentro
de `base.tsx`, e cada número saiu contando palavra por palavra a referência
daquele modelo.

---

## AS REGRAS QUE NÃO SÃO GOSTO

Estas foram todas pagas com retrabalho. Se a outra sessão mudar alguma, que
mude sabendo o que está trocando.

### 1. O LIMITE NÃO É O DESENHO

`garanteQueCabe()` em `base.tsx` **PARA o render** se o destaque cair abaixo de
85 px ou se algo passar da margem. Isso é o freio, não o alvo.

> "cuidado com o tanto de palavras" — cobrado duas vezes

O desenho é **2–3** por linha pequena, não o limite. Encostar no limite cobra na
conta de largura: "a minha vida com" deu destaque de 65 px onde a frase aprovada
dá 93. **Menos palavras é sempre o lado seguro** — a frase inteira vai na
legenda queimada, que é outro componente.

**Encolher até caber não é cuidar, é esconder o problema.**

### 2. REGRA DE COMPORTAMENTO MORA EM `base.tsx`

O zoom é `ZOOM_DE` (entrada) e `ZOOM_EXTRA` (a descida que não trava), **os
dois em `base.tsx`**. Já estiveram repetidos em dez arquivos — `1.1` nos cinco
`Modelo*.tsx` e `0.03` nos cinco `Lettering*.tsx` — e "mudar o zoom de todos"
dependia de alguém lembrar de dez lugares.

Vale para folga, desvanecer, área, molas: **se a regra vale para todos, mora
onde todos leem.** Fonte, não: fonte de um modelo é identidade dele.

### 3. O ZOOM NÃO TRAVA, E A SAÍDA É POR CIMA DO MOVIMENTO

O bloco segue descendo `ZOOM_EXTRA` até o último quadro, e os **0,75 s finais**
desvanecem por cima desse movimento. Peça que congela antes de sair morre na
timeline.

### 4. AS MOLAS SÃO MOLES

`damping 30 / stiffness 38 / mass 1.7` (destaque: `34 / 40 / 2`). Damping 200
travava a chegada e lia como duro. Ao afrouxar mola, conferir folga **medindo**,
nunca no olho.

### 5. TUDO SE ADAPTA AO TEXTO

`ritmo` / `ritmoDaFrase` dão o intervalo pelo tamanho da frase; `duracaoDe`
fecha a peça. **Testar com frases curtas E longas**, nunca só com a do exemplo —
piso alto mascara a adaptação nas curtas.

### 6. O POP É O SOM DELE, E TEM DE TOCAR

Um pop por entrada (no modelo 2, por palavra = digitação), os dois arquivos
alternando, destaque no mesmo som mais alto, **fora do `CameraMotionBlur`**.

Armadilha real: os `cuesSfx*` existiam desde o começo e **ninguém os consumia** —
o lettering saiu mudo por dias sem ninguém notar. "Tem trilha de áudio" e "se
ouve" são conferências diferentes; a segunda é a que importa. Medir o **pico do
arquivo**, não só conferir que a trilha existe.

### 7. O TEXTO TEM DE SER UM TRECHO CONTÍNUO DA FALA

Encurtar a fala é legítimo — o lettering quase sempre é um RECORTE dela. O que
não pode é **pular palavra no meio**.

Custou caro uma vez: o lettering dizia "como se fosse **CAIXA** / do /
**GOVERNO**" onde a fala era "como se fosse um **caixa eletrônico** do governo".
Faltava uma palavra no meio e **não era cosmético** — caixa do governo é cofre,
fundo público. A tela passou a afirmar o que a fala não diz.

Quando a expressão não cabe num destaque, quem resolve é a escada do modelo:
"como se fosse **CAIXA** / eletrônico do / **GOVERNO**" lê inteiro de cima para
baixo.

---

## DUAS ARMADILHAS DE CÓDIGO

**Piso de corpo causa estouro.** Piso e "caber" se contradizem: com piso de
70 px, uma frase que pedia 51 px era empurrada para fora do quadro (medido:
x 0 → 1077 de 1080). **A conta manda, não o piso.**

**Quebra de linha na pequena não dispara falha nenhuma** e só aparece no still.
"Vamos juntos multiplicar essa" (4 palavras) quebrou a pequena do modelo 2 em
DUAS linhas e passou. Conte as **faixas de texto**: pequena + destaque = 2 faixas
no modelo 2; 3 faixas quer dizer que quebrou.

---

## O QUE NÃO VEIO, DE PROPÓSITO

- **A Coolvetica Light.** Não existe na máquina de origem, só a Regular. O
  `PEQUENA` do modelo 3 usa Montserrat 300 no lugar.
- **`scripts/checa_folga.py` e `confere_lettering.py`.** São do projeto de
  origem e dependem da estrutura dele. Se a outra sessão precisar de
  conferência automática, vale reescrever — mas aí **teste o conferidor com o
  erro plantado**: a primeira versão do `confere_lettering.py` lia o arquivo
  pela metade e dava OK em texto que não tinha lido. Conferidor que lê pela
  metade é pior que nenhum, porque dá falsa paz.
- **A legenda queimada.** É outro componente, outro kit.
