# Nikolas Ferreira · série "fundo branco" — instruções do projeto

Peças de motion graphics em **Remotion** para os vídeos verticais do Dep. Federal
**Nikolas Ferreira (PL-MG)**. Quem pede é o **Aquila** (editor e motion designer),
que monta tudo no Premiere por cima da gravação. Responder sempre em **português**,
direto, dizendo o que foi conferido e o que não se confirmou.

O histórico completo (cada vídeo, cada decisão, pendências) está em
`MEMORIA - Nikolas Ferreira - serie fundo branco.md`, na raiz. Ler antes de mexer
num vídeo já entregue.

---

## 1. Regras que ele pediu — valem para TODAS as peças, sempre

> "quero que sempre oq eu pedir vc faça em TODOS sempre, Guarde Tudo que eu te
> pedir, SEMPRE"

Todo pedido é regra nova da série, não conserto pontual: aplicar em todas as peças
afetadas na mesma leva e dizer qual ficou de fora e por quê. Guardar todo pedido
novo na memória e neste arquivo.

1. **Hodômetro em todo número QUE SEJA QUANTIDADE** — as rodas de contador são
   a assinatura da série. **Identificador não rola** (número de urna, processo,
   lei, artigo): entra dígito a dígito em corte seco com 4 quadros de
   amaciamento, no onset medido da fala. Rolar até 45.888 sugeriria uma
   contagem que não existe e mostraria dezenas de números errados no caminho —
   inclusive de outros candidatos (decidido em 20/09/2026).
2. **Movimento fluido, nada aparece do nada.** Saída nunca menor que ~12 quadros.
   Foto e card de notícia: a chapa sobe e assenta (~0,8 s), legenda e crédito
   escalonados, foto nunca parada (push de 3–3,5%).
3. **Documento tem de dar para LER:** câmera no bloco de texto medido no PDF,
   segurando o close enquanto o marca-texto corre.
4. **Campo de símbolos em alfa em todo vídeo** (ver §3.7).
5. **Cobrir o vídeo inteiro**, não só os blocos que o dossiê lista.
6. **Três masters por peça:** alfa, branco e escuro (`#15171A`, nunca preto puro).
7. **Eu decido alfa ou opaco** (peças novas). O LEIA-ME abre com a tabela do que
   vai na timeline; versões extras são alternativa, não pergunta.
8. **Notícia com foto leva a foto** — licença fechada, foto DO FATO, legenda da
   própria matéria.
9. **Sem marcas de sobreposição:** formas opacas dentro de um grupo com opacidade.
10. **Pasta de entrega:** `Nikolas - <arquivo base do SRT> - <tema>`
    (ex.: `Nikolas - Aquila 18 - Imposto sobre Imposto`). Peças dentro com código
    curto (`PLP-B-Cascata-alpha.mov`).
11. **Espaço em disco:** o E: é curto. Renderizar no C: (scratchpad) e só copiar o
    master final. Apagar só o que tem cópia comprovada por hash; o resto, perguntar.
12. **A revisão é o vídeo MONTADO em camadas** nos timecodes do SRT — nunca peças
    soltas em sequência.
13. **Pesquisar além do dossiê** (fotos, números, mapas), sempre dentro do §2.1.
14. **DOIS A TRÊS letterings de destaque por vídeo**, de modelos diferentes,
    espalhados nos trechos sem elemento — **eu escolho quantos, onde e quais, e o
    dossiê não manda nessa parte** (22/09/2026; ver §5.3).
15. **A legenda queimada e a exportação final são dele.** Eu entrego as peças e,
    quando não vier SRT, **a transcrição** — já com o que a tela precisa mostrar
    em algarismo. Queimar legenda e exportar 9x16 / 1x1 / versão de WhatsApp sai
    do vídeo montado, no Premiere dele; eu deixo os parâmetros no LEIA-ME
    (20/09/2026).
16. **Sem SRT, eu transcrevo:** texto pela **ElevenLabs** (crédito dele — avisar
    antes), tempos pelo **faster-whisper local** (já instalado, não custa nada),
    onsets de dígito medidos com `silencedetect`. O MCP da ElevenLabs **não
    devolve timecode**. Gravar o `.srt` com Write, nunca PowerShell (BOM).

## 2. A verdade na tela

1. **Nada em tela sem fonte primária verificada** (lei, diário oficial, ficha de
   tramitação, matéria original, API oficial). Agregador não conta. Texto em tela é
   literal e leva a fonte. Esta regra vence todas as outras.
2. **"Avisa que X" é pedido de aviso, não fato conferido.** Conferir; entregar a
   versão que se prova, como prop trocável.
3. **Número que não fecha → mostrar o documento**, com rótulo que descreve o
   documento e não a ação do locutor.
4. **Ler a conclusão do dossiê antes de vetar um bloco.**
5. **Opinião declarada ("na nossa avaliação") não ganha grafismo.** Não afirmar
   aprovação, derrota ou arquivamento que não houve.
6. **Não entregar munição ao outro lado** (ex.: arrecadação de IPVA por estado).
7. **Manchete e citação alheias não se melhoram** ("; acompanhe" e colchetes ficam).
8. **A tela não pode se contradizer** (carimbo vs. data impressa no documento).

## 3. Idioma técnico

### 3.1 Stack
Remotion 4.0.520 · React 19 · TypeScript strict · 1080×1920 @ 60 fps · fonte da série
**Archivo** (`@remotion/google-fonts`). Cada vídeo em `src/<código>/` com `config.ts`
(conteúdo, fontes, beat sheets comentados com timecodes do SRT) e um componente por
peça; tudo registrado em `src/Root.tsx`.

### 3.2 `src/shared/design.ts`
`COR` (fundo `#FFFFFF`, texto `#0F0F0F`, meta `#8A9099`, regua `#E4E7EA`, marca
`#FFD84D`, carimbo `#1F4B99`, escuro `#15171A`) · `MARGEM = 96` · `LARGURA = 888` ·
`f(s)` · `trava` · easings `EXPO_OUT`, `INOUT`, `TRACO`, `PAN` · `type Tema`,
`placa(tema)` (null = alfa), `placaClara(fundo)`.

**COR DE IDENTIDADE NOVA ENTRA AQUI, com o par claro/alfa junto.** Hoje não entra, e o
preço está medido (22/09/2026): `#A8443C` é **a mesma cor com quatro nomes** —
`sai/ALERTA`, `plp/CARGA`, `dpu/CONTRA`, `msf/CONTRA`; o par claro dela, `#E8837A`, é
string crua em **10 arquivos**; `#4A5158` (cinza de apoio) em **9**. A prova de que é
redigitação e não importação: `dpu/FAVOR = '#3E7F57'` e `sai/MANTIDO = '#3F7D58'` —
dois verdes que deviam ser um só, diferindo em **1, 2 e 1**. Ninguém escolhe isso; sai
de recriar a cor de olho. O mesmo com o escuro: além do `#15171A` oficial andam por aí
`#14181C`, `#0A0C0E` e `#0B0D0F`.
**O par claro/escuro é REGRA, não cor:** no alfa vai o tom claro (vai sobre o vídeo), no
claro vai o escuro — e isso está reimplementado à mão 10 vezes como
`alfa ? '#E8837A' : CONTRA`. Centralizar **não muda um pixel** (os valores seguem os
mesmos); impede a próxima divergência.

### 3.3 Componentes compartilhados
- `Cena` — a placa vive FORA do grupo que esmaece.
- `Papel3D` — PDF real rasterizado a 200 dpi, câmera por chaves, marca-texto nas
  caixas medidas com PyMuPDF.
- `Odometro` (`src/pix`) — cada casa mede `px × 0,6`.
- `Marca` / `TextoMarcado` — marca-texto em multiply (só sobre fundo claro; por
  isso card de notícia é branco nos três masters).
- `TINTA`, `SOMBRA`, `Caixa` (`src/pix/Subidas`) — o idioma do alfa.
- `Troca`, `Cartao` (`src/fn`) — substituição de palavra; card de notícia com foto.
- `Lettering` (`src/lettering`) — ver §5.

### 3.4 Formatos e comandos
```bash
npx remotion render <ID> x-alpha.mov  --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --props='{"tema":"alfa"}'
npx remotion render <ID> x.mov        --codec=prores --prores-profile=hq   --props='{"tema":"claro"}'
npx remotion render <ID> x-escuro.mov --codec=prores --prores-profile=hq   --props='{"tema":"escuro"}'
# campos de símbolo: {"camada":"A"} · {"camada":"A","fundo":"#FFFFFF"} · {"camada":"A","fundo":"#15171A"}
```
Plano de cobertura (foto real): opaco, um arquivo, sem fade, push 7%, véu em três
partes, crédito queimado.

### 3.5 Conferência obrigatória de todo master

**RODAR `python scripts/confere_entrega.py "<pasta de entrega>"` ANTES DE MANDAR
QUALQUER COISA.** Ele faz de uma vez tudo que está listado abaixo, e falha alto:
contagem igual nos três masters · decode limpo · último quadro zerado · miolo com
conteúdo · PSNR · **lettering mudo** · **som audível (pico ≥ −6 dB)** · **duração de
peça já entregue** · BOM em props.json. `--letterings` varre os letterings do projeto
inteiro; `--tudo` varre todas as entregas.

Exceções legítimas vão num `.confere.json` na pasta (`ultimo_quadro_cheio`,
`duracoes` para travar a contagem de peça entregue).

Existe porque ele cobrou em 22/09/2026 — "você nunca faz igual… fazer com a mesma
perfeição". Os erros da semana não foram de falta de informação: a regra estava
escrita nos três arquivos e eu não rodei a conferência. **O que depender da minha
memória vira código.** O script NÃO julga momento nem estética: a revisão montada
(§1.12) continua obrigatória.
1. Contar quadros: `ffprobe -count_frames -show_entries stream=nb_read_frames` (os três masters batem).
2. Decodificar inteiro: `ffmpeg -v error -i X.mov -f null -` — saída vazia = passou.
3. Saída no último quadro (alfa `YMAX=256`; branco `940`), salvo corte seco deliberado.
4. Miolo: `YMAX` do alfa no quadro do meio (conteúdo existe).
5. Escuro = alfa sobre `#15171A`: PSNR (gráfico ~55 dB, foto 45–52; < 40 = defeito).
6. `defaultProps` da composição antes de renderizar sem `--props`.
7. Revisão montada em camadas; olhar 1 quadro/s e ampliar 1º e último quadro de cada peça.
8. Campo de símbolos: geometria contra os retângulos de todo conteúdo por cima.

### 3.6 Armadilhas já pagas
- Heredoc no bash quebra com aspas em TSX/Python grande → escrever script em arquivo.
- `filter` achata o 3D → desfoque num invólucro fora da perspectiva.
- Default de parâmetro dispara com `undefined` → sentinela de "sem fundo" é `null`.
- `fundo ? escura : branca` quebrou com o tema escuro → `placaClara`.
- Numeral que segue um ponto → travar entre as margens.
- Chrome "Timed out … connect to the browser" → só repetir (3 tentativas).
- NASA: CDN novo entrega ≤ 1280 px; imagem cheia em `eoimages.gsfc.nasa.gov`.
- IBGE (API de malhas) responde gzip. PIL: recorte fora da imagem sai preto sem erro.
- `public/Sequência aninhada 05.mp4` tem textos de outros planos gravados — não serve de fundo.
- **Saída que termina na duração exata não chega a zero**: o último quadro é duração − 1,
  e fica com ~12% de opacidade (Aquila 20: YMAX 571 no alfa; papel do 3D pan cobrindo 19%
  da tela). A saída tem de fechar **3–4 quadros antes do fim**. A conferência do último
  quadro (§3.5.3) é o que pega isso.
- Master que sai com **um quadro a menos** que os irmãos (DPU-D escuro: 121 × 122) é
  glitch de render, não de código: re-renderizar e recontar antes de entregar.
- **`staticFile()` NÃO É IMPORT, e conferidor de import não o vê.** 30/09/2026, ao
  empacotar o `KIT - LETTERING` para outra máquina, conferi que "nenhum import sai
  do kit" por parse dos `import` — e o kit foi sem `public/lettering/fundo_exemplo.png`,
  que os **seis** `Exemplo*.tsx` carregam por `staticFile()`. A conferência deu OK
  num pacote furado. **Asset que falta em `public/` não quebra o build**: o Remotion
  serve 404 e a peça renderiza sem a fonte, sem o som ou sem o fundo, em silêncio.
  Ao empacotar ou mover qualquer coisa, resolver **cada `staticFile()` contra o
  arquivo em disco** — inclusive os indexados por variável (o mapa `POP` do
  `base.tsx`), que uma varredura de string literal também perde.

#### 3.6.1 Elemento POR CIMA do rosto e das mãos é o estilo, não defeito
22/09/2026. Montando o Aquila 18 sobre o bruto, chamei de defeito grave o
calendário cobrir o rosto e a curva atravessar as mãos, e propus refazer três
peças. Ele cortou: *"Pode deixar por cima tbm chefe vc não ta seguindo a
referencia?"* — e estava certo. Medido no Aquila 12: a lista de incisos vai de
y 960 a **1700**, por cima das duas mãos; o lettering atravessa o **queixo**; o
cromado fica **sobre as mãos**. **A camisa preta é a placa e o corpo é fundo,
não obstáculo.**
O erro foi esticar o "não encostar em conteúdo" do §3.7 — que é sobre campo de
símbolos versus os outros grafismos — para grafismo versus o corpo dele.
**Quando ele manda seguir uma referência, a referência é a regra**, não as
minhas regras aplicadas a ela. Antes de chamar de defeito uma peça que já foi ao
ar, medir na referência se aquilo é defeito ou é assinatura.

## 3.7 Campo de símbolos
Substantivo da frase + o gesto dela · nunca contável (duas camadas, paralaxe,
sangrando) · teste de tom (não afirmar o que a fala não afirma) · vazio central
torto, nunca anel · não encostar em conteúdo. Já usados: cadeados, interrogações,
balões, pegadas, chevrons, sinais de mais, aparelhos, olhos, folhas, grades,
camadas, aspas.

## 4. Licenças conferidas
- Banco de Imagens da Câmara: CC BY — "Nome do Fotógrafo/Câmara dos Deputados".
- Agência Câmara Notícias: reprodução com a assinatura "Agência Câmara Notícias".
- TV Câmara (vídeo): CC BY-NC-ND — **proibido corte**; não usar trecho.
- Agência Senado: livre, sem descaracterizar e citando Agência Senado e o autor.
- NASA Blue Marble: crédito "NASA Earth Observatory". IBGE: público.
- Wikimedia: conferir por arquivo.

**SFX e música de banco em vídeo político (conferido em 15/09/2026):**
- **Pixabay: PROIBIDO** — termos completos, seção 5: vedado "in a political context
  (such as the promotion, advertisement or endorsement of any party, candidate, or
  elected official…)". O resumo da licença não fala disso.
- **Epidemic Sound: só com autorização por escrito** ("sensitive subjects" incluem
  conteúdo político).
- **Seguros:** Kenney (CC0 — baixados em `public/sfx/kenney/`), Freesound CC0 ou CC BY
  (nunca NC), Sonniss GameAudioGDC. Mixkit: sem cláusula política na página oficial
  (texto integral não lido).
- Não verificados (site bloqueou): Uppbeat, Zapsplat, Envato Elements, **Motion Array**
  (por busca: comercial ok, proíbe difamação e desinformação eleitoral; texto integral
  não lido — ele confere logado).
- **SFX do lettering: gerar na ElevenLabs dele** (conta conectada; gasta crédito dele,
  avisar antes). Em `public/sfx/eleven/`: whoosh_curto, whoosh_hit, swish, riser, click,
  pop e **pop_tecla_01..03** — o "pop" que ele quer é **som de digitação**, não bolha.
- Pack sintetizado (`scripts/sfx_motion.py` → `public/sfx/motion/`) ficou ruim no ouvido
  dele; serve só de reserva sem custo.
- **A pasta `SFX - LETTERING` é PRODUÇÃO PRÓPRIA DELE** (confirmado por ele em
  23/09/2026, quando eu listei a origem como pendência do Aquila 18: *"uai mano, eu
  mesmo produzi"*). Os 11 arquivos — flash, carimbo, chain, woosh, obturador, pops —
  **não têm restrição de banco**: a vedação de vídeo político do Pixabay e a
  autorização escrita da Epidemic não se aplicam. Usar à vontade e registrar no
  LEIA-ME como produção própria.
  **A lição não é sobre esses arquivos, é sobre a pergunta:** eu podia ter perguntado
  a origem no dia em que ele mandou a pasta, em vez de levar a dúvida até a entrega
  fechada e devolvê-la como pendência dele. Material que ele manda pode ser dele —
  **perguntar a origem na hora em que chega**, não na hora de publicar.
- Registrar origem e licença de todo SFX no LEIA-ME.

### 4.1 O DESENHO DE SOM — a duração do som é a duração do gesto
23/09/2026, ouvindo a primeira montagem sonorizada do Aquila 18. Ele gostou do
conjunto (*"top demais"*) e deu três notas que são uma regra só, e que agora
valem para toda peça com som. **`python scripts/confere_sfx.py` roda junto com o
`confere_entrega.py`.**

1. **SOM NÃO SE EMPILHA.** *"Você colocou muito em cima um do outro … não joga um
   em cima do outro, coloca só um mesmo, que já vai servir para os dois."*
   A grade do calendário levava **cinco** `chain` de 0,504 s espaçados 0,18 s —
   cada um entrava com o anterior ainda tocando a 64% do corpo. A curva levava
   **seis** em 1,04 s. Isso não lê como ritmo, lê como sujeira.
   **Um gesto contínuo leva UM som contínuo**, do tamanho do gesto: a grade
   inteira virou um `chain_mais_long` (1,8 s), a curva virou um só cortado em
   1,102 s. A conta que reprova é objetiva — se o intervalo entre dois cues do
   MESMO arquivo for menor que a duração dele, eles se sobrepõem.
2. **NEM TODO ELEMENTO PEDE O MESMO PESO DE SOM.** *"O primeiro barulhozinho de
   corrente ficou bom. Só que depois, quando apareceu o IPVA, ICMS, PIS, não
   precisava disso. Podia ser só um POPzinho."* A primeira divisão da cascata é
   o gesto; as outras três são rótulos entrando. **Gesto leva som de gesto,
   rótulo leva tique** (pop de 0,096 s).
3. **VARIAR O WHOOSH PELA DURAÇÃO DA ANIMAÇÃO.** *"Você só usou um tipo de
   whoosh. Se a animação for mais demorada, use o mais longo. Se for mais curta,
   use o mais curto. Seja variável, faça algo bem feito."* Eu tinha usado
   `woosh_rapido` (0,288 s) nos **cinco** gestos, inclusive numa folha que leva
   1,2 s entrando. A escada medida:

   | arquivo | dura | para gesto de |
   |---|---|---|
   | `woosh_rapido` | 0,288 s | até ~0,45 s |
   | `whoosh_rapido` | 0,384 s | ~0,45 a ~0,8 s |
   | `whoosh_02` | 1,440 s | ~0,8 a ~2 s |
   | `woosh_longo` | 4,368 s | 2 s para cima (ataque de 0,499 s) |

   **E O GESTO LONGO QUE FICOU MUDO ERA O PIOR CASO.** *"Na hora que veio o
   marca-texto, você não colocou aquele whoosh mais longo."* Os dois traços
   correm por **3,103 s** e **2,829 s** e eu os tinha deixado sem som, com uma
   justificativa escrita no código: "não existe som de risco de caneta na
   pasta". Era verdade e era desculpa — **o gesto de um marcador correndo por 3 s
   pede um som LONGO, não um som de caneta.** Quando o arquivo certo é mais
   longo que o gesto, `dura` (em `CueSfx`) fecha com fade de 0,25 s em vez de
   deixar a cauda invadir o cue seguinte.

**A MÉTRICA DEPENDE DO TIPO DE SOM** — confundir isso me custou duas voltas:
- **transiente** (flash, carimbo, obturador, pop, chain): medir por **PICO**. Por
  RMS eles sempre parecem inaudíveis e a conta manda pôr volume acima de 1;
- **sustentado** (whoosh médio e longo, chain longo): medir por **RMS**. Por pico
  eles sempre parecem no nível da voz, porque o pico da voz numa janela de 3 s é
  uma sílaba forte qualquer.

**Para medir o SFX de verdade, isolar por subtração:** master − locução. No
Aquila 18 o resíduo numa janela sem cue deu **−95,4 dB**, o que prova que a
locução entra sem processamento e a diferença É a trilha de efeitos. Medidos
assim, `whoosh_02` estava 10,3 dB abaixo da voz e `woosh_longo` 4 a 5 — todos
subiram para a faixa de −1 a −3 dB: presentes sem competir.

## 5. Lettering de destaque (modelo 1)
Três linhas brancas empilhadas; as caixas podem invadir, **as letras não encostam**.
- Linhas 1 e 3: **Coolvetica** (`public/fonts/Coolvetica_Rg.otf`). Linha 2: **Montserrat
  Black**, caixa alta, ~84% da largura em repouso.
- Linha 1 sobe inteira; linha 2 entra inteira e embaçada, fica nítida e **reparte na
  diagonal** com sombra dura; linha 3 palavra por palavra com desfoque de movimento.
- **Dynamic zoom** do bloco inteiro; entradas **sobrepostas**;
  molas (`spring`) e `CameraMotionBlur`; sombra suave nas linhas 1 e 3.
- **Saída (vale para todos os modelos):** o zoom não trava — segue descendo mais
  `ZOOM_EXTRA` até o último quadro e os **0,75 s finais desvanecem** por cima desse
  movimento.
- **O zoom mora em `base.tsx`: `ZOOM_DE` (entrada) e `ZOOM_EXTRA` (a descida que não
  trava).** Estava repetido em dez arquivos — `1.1` nos cinco `Modelo*.tsx` e `0.03`
  nos cinco `Lettering*.tsx` — e "mudar o zoom de todos" dependia de eu lembrar de dez
  lugares. **Regra de comportamento mora onde todos leem.** Em 22/09/2026, a pedido
  dele ("um pouco mais aquele zoom"), foram para **1,18** e **4%**.
- **Número de palavras (todos os modelos):** `garanteQueCabe()` em `base.tsx` **PARA o
  render** se o destaque ficar abaixo de 85 px ou se alguma parte passar do limite.
  **Encolher até caber não é cuidar — é esconder o problema.** E nunca mandar para ele
  um render que eu mesmo acho ruim.
- **A TABELA DE LIMITES É `LIMITES` EM `base.tsx`** (22/09/2026: "coloque como regra um
  número específico de palavras de acordo com cada referência. Não quero linhas enormes
  de texto, quero algo bem bonito e estético"). Cada número sai da **referência que ele
  mandou** para aquele modelo, contada palavra por palavra:

  | modelo | limites | a referência dele |
  |---|---|---|
  | 1 | 3 · **1** · 4 | "parar de criar" · IMPOSTO · "em cima de imposto" |
  | 2 | 4 · **1** | a regra ditada por ele: "3 ou 4 em cima e SÓ UMA embaixo" |
  | 3 | 3 · **1** · 4 | "parar de criar" · IMPOSTO · "em cima de imposto" |
  | 4 | 3 · **1** · 3 · **1** | "para dar" · VIDA · "em nossos" · VÍDEOS |
  | 5 | 2 · **1** · 2 | "Comente" · TEXT · "para receber" |
  | 6 | 2 · **1** · 2 | "Crie letterings" · ATRATIVOS · "sem esforço" |

  **O destaque é SEMPRE uma palavra só** — era 2 no modelo 2 e 5 no modelo 3, sobra de
  quando os limites eram chute. **Nenhum limite passa da referência.** É TETO, não alvo:
  o bonito costuma estar um abaixo. O **modelo 1 não tinha freio nenhum** até aqui (é o
  mais antigo e ficou de fora quando `garanteQueCabe` nasceu) — agora tem.
- **O LIMITE NÃO É O DESENHO** (bronca dele em 21/09/2026: "cuidado com o tanto de
  palavras", repetida). `garanteQueCabe` PARA quando fica ilegível; ficar dentro do
  desenho é comigo. Modelo 4: **2–3** por linha pequena (limite 4). Modelo 2: **3–4**
  numa linha **só**. Encostar no limite cobra na conta de largura — "a minha vida com"
  deu destaque de 65 px onde a frase aprovada dá 93; com "vida com", 80 px.
  **Menos palavras é sempre o lado seguro** — a frase inteira vai na legenda queimada.
- **Quebra de linha na pequena não dispara falha nenhuma** e só aparece no still:
  "Vamos juntos multiplicar essa" (4) quebrou a pequena do modelo 2 em DUAS linhas e
  eu não vi — ainda escrevi no LEIA-ME que estava no desenho. **Contar as faixas de
  texto do `checa_folga.py`**: pequena + destaque = 2 faixas no modelo 2; 3 faixas
  quer dizer que quebrou.
- **Ligar som (ou qualquer comportamento novo) obriga a REFAZER os letterings já
  entregues** — §1: pedido novo vale para TODAS as peças. Liguei o pop e refiz só
  os do vídeo da vez; os do Aquila 20 ficaram mudos na pasta de entrega e ele
  perguntou "kd eles nos letrins?". Varrer com
  `find . -iname "*LETTER*" -iname "*.mov"` e conferir a trilha de áudio de cada um.
- **Ao re-renderizar peça JÁ ENTREGUE, travar a duração original com `duracao`.**
  O código evoluiu desde a entrega (molas, `ritmo`, piso de 2,6 → 1,9 s): o
  "CÂMERAS" do Aquila 20 voltou com **149 quadros** onde o master entregue tinha
  **114**, e isso quebraria a timeline que ele já montou. Contar os quadros do
  arquivo antigo ANTES de sobrescrever, e re-render com `duracao` até bater.
- **Nível de SFX: medir o pico do ARQUIVO, não só conferir que existe trilha.**
  Os MP3 dele vinham com pico de -11,8 dB; a -0,55 de volume o pop saía a -17 dB
  e o vídeo inteiro a -12,7 dB. "Tem áudio" e "se ouve" são conferências
  diferentes — a segunda é a que importa. Normalizados para -1,0 dBFS em WAV
  (`public/sfx/lettering/pop_*.wav`), master do lettering sai a -1,9 dB.
- **O SFX do lettering é o POP DELE** (`SFX - LETTERING/` → `public/sfx/lettering/`),
  ligado em `Pops` / `comDestaqueForte` (`base.tsx`) nos QUATRO modelos: um pop por
  entrada (no modelo 2, por palavra = digitação), os dois arquivos alternando,
  destaque no mesmo som mais alto (0,9 × 0,55), **fora do `CameraMotionBlur`**.
  Os `cuesSfx*` existiam desde o começo e **ninguém os consumia** — lettering saiu
  mudo por dias. Cue que nada toca não se desmente: o do modelo 2 dizia 0,08 s onde
  o texto sobe a 0,05 s.
- **Adaptar ao texto (todos os modelos):** medidas E tempos saem da frase. `ritmo` /
  `ritmoDaFrase` dão o intervalo pelo tamanho do que entrou; `duracaoDe` fecha a peça
  (piso de 1,9 s — piso alto mascara a adaptação nas frases curtas); posições que podem
  estourar (recuo da linha de baixo do modelo 3) usam o menor entre o desejado e o que
  cabe na margem. **Testar sempre com frases curtas e longas**, não só com a do exemplo.
- **Fluidez (todos os modelos):** molas moles (`damping 30 / stiffness 38 / mass 1.7`;
  destaque `34 / 40 / 2`) — damping 200 travava a chegada e lia como duro. Entradas mais
  longas e distantes, e **`deriva()`**: nada fica parado depois de assentar. Ao afrouxar
  mola, conferir folga com **`scripts/checa_folga.py`** (mede as faixas de texto branco e
  amarelo no quadro), nunca no olho.
- SFX (whoosh, wind, clicks) sincronizados pelos pontos de `cuesSfx(tempos)`.
- Código: `src/lettering/Lettering.tsx` e `Exemplo.tsx` (`LETTER-Exemplo`).
- Ele vai mandar outros modelos: cada um vira uma variante **partindo de
  `src/lettering/base.tsx`** (fontes, molas, sombra, `folgaAcento`).

### 5.0.1 O LETTERING TEM DE SER UM TRECHO CONTÍNUO DA FALA
`python scripts/confere_lettering.py` — **rodar junto com o `confere_entrega.py`**.

22/09/2026. O lettering do fecho do Aquila 18 dizia "como se fosse **CAIXA** / do /
**GOVERNO**". A fala é "como se fosse um **caixa eletrônico** do governo". Faltava uma
palavra no meio, e não era cosmético: **caixa do governo é cofre, fundo público**. A
tela passou a afirmar o que a fala não diz e a imagem que o vídeo inteiro constrói — o
contribuinte como máquina de sacar dinheiro — sumiu. O dossiê já avisava na 6.5 ("as
palavras CAIXA ELETRÔNICO"), e **ele pegou vendo o vídeo; eu não peguei escrevendo, nem
relendo, nem no still.**

**A regra conferível:** encurtar a fala é legítimo — o lettering quase sempre é um
RECORTE dela. O que não pode é **pular palavra no meio**; aí deixa de ser recorte e vira
outra frase. O texto do lettering, lido na ordem em que as partes aparecem em quadro,
tem de ser uma sequência **contígua** de palavras da fala daquela janela. Artigos e
preposições que o português deixa cair ("um", "o", "de") são exceção declarada.

Quando a expressão não cabe num destaque (o destaque é sempre UMA palavra, §5), quem
resolve é a escada do modelo: "como se fosse **CAIXA** / eletrônico do / **GOVERNO**" lê
inteiro de cima para baixo.

**O conferidor também mentiu uma vez:** a primeira versão lia um pedaço de tamanho fixo
do `edicao.ts` e o comentário que eu tinha acabado de escrever empurrou o `destaque2`
para fora da janela — deu OK num texto que não tinha lido inteiro. **Conferidor que lê o
arquivo pela metade é pior que nenhum, porque dá falsa paz.** Testar todo script novo
com o erro plantado, como se fez com o `confere_entrega.py`.

### 5.1 Modelo 2
**3–4 palavras em cima, numa linha só, e UMA palavra de destaque embaixo** — frase
inteira não ("não precisa desse tanto de palavras"). Texto pequeno Coolvetica em cima,
a 96% da largura da palavra destaque; destaque Montserrat Black embaixo, e só. Tudo sobe
de baixo para cima — as palavras de cima **uma a uma** (0,05 s entre elas) — com mola sem
overshoot + blur que some, entradas sobrepostas, mesmo dynamic zoom.
`Lettering2.tsx`, `Modelo2.tsx` (`LETTER-Modelo2`, alfa, props `pequena`/`destaque`),
`Exemplo2.tsx`. **Acento em maiúscula** sobe ~0,13 em: `folgaAcento()` nos dois modelos.

### 5.2 Modelo 3
Linha pequena à esquerda + **PALAVRA GRANDE** que começa depois dela e **sangra pela
borda direita** + linha pequena embaixo, deslocada à direita e também sangrando. Falso
itálico (skewX -9°) em tudo, bloco girado -1,2° e **o corte do modelo 1 inteiro, também
na transversal** (66% → 36% da caixa, deslize ao longo da diagonal): a palavra entra inteira e só depois reparte. **O 3D não é a sombra
projetada** — é um **degradê cinza pintado dentro das letras** da metade de baixo, da
linha do corte até 10% do corpo abaixo (`background-clip: text`, cinza = 255 − 78·reparte),
que lê como espessura. Some a isso: **sombra dura num wrapper** em volta da metade de cima
(no elemento cortado ela desenha a silhueta e não serve), a metade de cima subindo 1,2% do
corpo para abrir a fresta, **dois tempos** (`reparte` em curva para sombra/degradê/fresta e
`MOLA_CORTE` para o deslize, que passa do ponto e volta) e a metade de baixo antes no DOM. O corpo sai de
uma conta: margem + linha pequena + folga + palavra grande = **112% da largura do quadro**
(é o que faz a pequena caber inteira e a grande sangrar). `Lettering3.tsx`, `Modelo3.tsx`
(`LETTER-Modelo3`, alfa, props `antes`/`destaque`/`depois`), `Exemplo3.tsx`.

### 5.2.2 Modelo 4
**Cuidado com a quantidade de palavras** (aviso dele): são quatro partes, e as TRÊS
linhas têm de entrar na conta de largura — a do meio ficou de fora e atravessava a tela.
**Piso de corpo causa estouro**: piso e "caber" se contradizem; com piso de 70 px uma
frase que pedia 51 px era empurrada para fora do quadro (medido: x 0 → 1077 de 1080).
A conta manda; o código avisa no console quando o destaque cai abaixo de 110 px.
O desenho é para **2–3 palavras em cada linha pequena e UMA palavra em cada destaque**.
Pequena branca + **1ª palavra AMARELA** na mesma linha; pequena branca recuada 0,35 do
corpo; **2ª palavra AMARELA** recuada 1,15 — escada descendo para a direita, linhas bem
apertadas, falso itálico. Amarelo = `COR.marca`. Fontes **padrão** (Coolvetica +
Montserrat Black), não o light. `Lettering4.tsx`, `Modelo4.tsx` (`LETTER-Modelo4`, alfa,
props `pequena1`/`destaque1`/`pequena2`/`destaque2`), `Exemplo4.tsx`.

### 5.2.3 Modelo 5
Referência dele em 21/09/2026 — print **e vídeo** (movimento não se tira de print).
Uma **PALAVRA GRANDE em caixa alta, laranja `#FF6700`** (medido no arquivo dele: 82 mil
pixels nessa cor exata, não o `#FFD84D` da série) entre **duas linhas pequenas em
itálico branco que a invadem** em cima e embaixo — as caixas se sobrepõem, as letras
não. Fontes **as nossas**, por pedido literal ("mantenha as fontes que a gente usa"):
Coolvetica nas pequenas, Montserrat Black na grande; a do print fica de fora.

**O movimento, tirado do vídeo quadro a quadro:**
- a **linha de cima DIGITA** em ordem (C · Co · Com · Come…), cada letra com um
  fantasma embaçado que some;
- a **palavra grande NÃO entra em ordem** — acende **embaralhada e piscando** até
  fixar. Extraído dos quadros: `XT` → `T_T` → `TE_T` → `T_XT` → `TEX` → `TEXT`.
  A permutação é **determinística** (`ordemEmbaralhada`): `Math.random()` aqui faria
  a peça piscar diferente em cada quadro do render, porque cada frame é execução nova.
  O pisca é fixo em quadros: acende 2 · apaga 3 · acende 3 · apaga 2 · fica;
- a **linha de baixo** chega esmaecida e vai ficando branca.

Limite: **3 palavras** em cada linha pequena e **UMA** na grande — e vale o de sempre,
o limite é onde o render para, o desenho é 2 e 2. Um **pop de tecla por letra** que
entra. `Lettering5.tsx`, `Modelo5.tsx` (`LETTER-Modelo5`, alfa, props
`cima`/`destaque`/`baixo`), `Exemplo5.tsx`.

### 5.2.4 Modelo 6
Referência dele em 22/09/2026 (print + vídeo). **Mesmo esqueleto do 5** — pequena ·
GRANDE · pequena, com invasão — e separado dele no que importa:
- a palavra grande é **CROMADA**: degradê vertical pintado dentro das letras
  (`background-clip: text`), com a **parada dupla no meio** (0,50 escuro / 0,52 claro)
  que é a linha do horizonte do metal, mais um **brilho que varre** da esquerda para a
  direita. Medido no print: os tons vão de **56 a 254 dentro dos mesmos glifos** — é
  contraste de metal, não de cor chapada;
- **nada digita e nada pisca**: as três linhas chegam **desfocadas** (14 px) e ganham
  nitidez, que é o que os primeiros quadros do vídeo mostram;
- a pequena de cima alinha à **esquerda** (recuada 0,22 do corpo) e a de baixo à
  **direita**.

`Lettering6.tsx`, `Modelo6.tsx` (`LETTER-Modelo6`, alfa, props `cima`/`destaque`/`baixo`),
`Exemplo6.tsx`. Limites em `LIMITES.modelo6`: 2 · 1 · 2.

### 5.2.1 Área e peso (padrão dos três modelos)
- Largura alvo **78%** do quadro (modelos 1, 2 e 4) e **88%** no modelo 3 — ele pediu
  menos área e depois o texto "um pouco mais pra dentro". `LARG_ALVO` em `base.tsx`.
- Peso leve **só no modelo 3**: `PEQUENA`/`PESO_PEQUENA` (Montserrat 300) em `base.tsx`.
  Modelos 1 e 2 seguem na **Coolvetica**. A Coolvetica Light não existe na máquina dele —
  só a Regular; se ele mandar o arquivo, apontar `PEQUENA` para ela.
- **Regra de comportamento** (folga, desvanecer, área, fluidez) entra nos três na mesma
  leva ("mantém o padrão sempre"). **Fonte de um modelo é identidade dele** — não espalhar.

### 5.3 Quantas vezes — e quem escolhe
**DOIS A TRÊS letterings por vídeo, de modelos DIFERENTES** (22/09/2026 — substitui o
"só um" de 15/09 e o "até dois" de 17/09):

> "independentemente do SRT ou do PDF que eu te mandar, você vai sempre escolher de dois
> a três modelos de Lettering, e espalhar pelo vídeo em momentos que geralmente não tem
> elementos. Na parte do Lettering não precisa seguir a recomendação do PDF."

- **Não é "se couber": é o padrão de toda peça.** Dois no mínimo, três quando houver vão.
- **Modelos diferentes** em cada um; nunca repetir o mesmo modelo no mesmo vídeo.
- **Espalhados** pelos trechos em que a tela ficaria vazia — nunca dois colados.
- **O DOSSIÊ NÃO MANDA NESTA PARTE.** Se o PDF disser "um só", ou indicar ponto e modelo,
  é sugestão. Quem decide quantos, onde e qual modelo sou eu, lendo o SRT e mapeando os
  vãos sem elemento. (No resto — fatos, números, licenças — o dossiê continua valendo,
  com a conferência do §2.)
- Mapear os vãos **antes** de escolher, e justificar cada escolha no LEIA-ME.

**Na tela, só o que está no SRT** ("deixa como está nos vídeos SRT"): fato verificado
que a fala não diz (ex.: "2º lugar na lista tríplice", no Aquila 20) não entra na tela;
no máximo vira sugestão no LEIA-ME.

## 6. Entrega de um vídeo novo

### 6.0 A RÉGUA: o padrão da PL 1904 / PL 2666 / PL 2630
22/09/2026, ele: *"naquelas pastas das PL você fez uns vídeos muito massa, queria que
você sempre mantivesse aquele padrão"*. Fui ler o que aquelas entregas têm — e o padrão
é este, item por item. **Toda peça nova se mede por aqui.**

1. **CINCO A OITO PEÇAS, cobrindo o vídeo inteiro.** PL-A…E, PL2666-A…D, FN-A…H. Cada
   uma com letra sequencial e código curto (`FN-C-Relator`). Não é "os blocos que o
   dossiê lista" — é o vídeo todo.
2. **UM DOCUMENTO REAL**, com câmera no bloco de texto e marca-texto medido
   (`PL-B-Texto`, `PL2666-B-Parecer`, `FN-A-Documento`). É o que dá autoridade: o papel
   diz, não eu.
3. **UM NÚMERO COM HODÔMETRO** (`PL-D-Votos-Hodometro`) — quantidade, nunca
   identificador.
4. **UM CAMPO DE SÍMBOLOS EM DUAS CAMADAS**, com símbolo **próprio daquele tema**:
   chevrons na PL 1904, aparelhos na PL 2666, aspas na FN, camadas na PLP, grades na
   saidinha. Nunca reaproveitar o símbolo de outro vídeo.
5. **UM FECHO** (`FN-F-Fecho`).
6. **DOIS A TRÊS LETTERINGS** de modelos diferentes, nos vãos (§5.3 — isto é novo e
   entra no padrão daqui para a frente).
7. **TRÊS MASTERS por peça**, e as versões extras marcadas como **ALTERNATIVA**.
8. **O LEIA-ME DECIDE, não pergunta.** A abertura da PL 1904 é o modelo:
   *"Você não precisa escolher entre os arquivos de cada peça. A coluna do meio é a
   minha decisão. As outras versões ficam na pasta como ALTERNATIVA, não como
   pergunta."* Tabela peça a peça, dizendo qual arquivo vai na timeline e como entra.
9. **AS DIVERGÊNCIAS COM O DOSSIÊ VÊM NO COMEÇO**, não no rodapé — a PL 1904 abre com
   "ANTES DE TUDO: O DOSSIÊ ERRA O PRÓPRIO ACHADO PRINCIPAL". Se a apuração desmente o
   PDF, isso é a primeira coisa que ele precisa ler.
10. **`python scripts/confere_entrega.py` antes de mandar** (§3.5), e a revisão montada.

### 6.1 A RÉGUA DE UMA PEÇA — o ofício, item por item
22/09/2026. Depois de eu entregar uma auditoria inteira feita só de número, ele
perguntou: *"Vc analisou design movimento tudo?"* — e não tinha. Mandou: *"analisa os
arquivos de vídeo nessas pastas q vc mesmo fez"* · *"Cada frame"*. Abri as folhas de
contato (1 quadro a cada 4, alfa achatado sobre cinza médio) e medi as 85 peças. Depois
confirmou — *"Mas vc entendeu o padrão né?"* — e mandou gravar. §6.0 é a régua de uma
ENTREGA; esta é a de UMA PEÇA.

1. **Nada aparece do nada.** Todo elemento entra com movimento — sobe, gira em
   perspectiva, rola no hodômetro, acende. Aparição em corte seco é defeito, não estilo.
2. **Nada para depois de assentar.** Câmera descendo o documento, push na foto, deriva
   no campo de símbolos. Peça que congela morreu na timeline.
2.1. **E ISSO VALE PARA O QUE EU ACABEI DE ESCREVER TAMBÉM.** 22/09/2026, montando o
   Aquila 18, ele repetiu: *"Tenta manter sempre os elementos em movimento, não quero a
   sensação de parado."* Naquele momento eu já tinha: a regra escrita aqui no item 2, a
   `deriva()` construída para ela, a `viva` na `Cena` e as 85 peças medidas com
   `freezedetect` — **e mesmo assim tinha acabado de criar um invólucro novo (`Alfa`, em
   `plp/Montagem.tsx`) que era um transform estático.** Ter a ferramenta não é usá-la.
   Ao criar QUALQUER invólucro, wrapper ou composição nova, a pergunta é: *isto se
   move?* Os três buracos daquele dia: o `Alfa` travado, o `PLP-A-Calendario` que nunca
   recebeu `viva`, e o `PLP-C-Projetos`, cujas chaves de câmera acabavam em `entra+1,2`
   e deixavam **2,1 s de imagem imóvel** antes do carimbo (59% de tela parada, medido).
   Documento na referência NUNCA para: a câmera desce e aproxima do primeiro ao último
   quadro.
3. **Toda peça fecha de verdade:** saída de 12+ quadros, terminando 3–4 quadros antes
   do fim (§3.6).
4. **Entrada escalonada:** o elemento, depois o rótulo, depois a fonte. Nunca tudo junto.
5. **A fonte fica tempo de ser lida.** `CPMI-G-Horas` deixa a linha de fonte **0,77 s**
   na tela — virou decoração. `FN-B-Verbos` deixa 3 s, e está certo.
6. **O documento é quem tem autoridade:** câmera no bloco medido, marca-texto correndo.
7. **Quantidade rola, identificador não** (§1.1).
8. **Campo de símbolos próprio do tema**, duas camadas com paralaxe DE VERDADE, não
   contável, tamanhos muito diferentes, sangrando pela borda (§3.7).
9. **Três masters**; escuro `#15171A`, **nunca preto puro**.
10. **O LEIA-ME decide**, e as divergências com o dossiê abrem o arquivo.

**PEÇAS-MODELO, para consultar como CÓDIGO e não como lembrança:** `PL-B-Texto`,
`FN-A-Documento`, `DPU-A-Mensagem` (documento) · `PL-E-Avanco` (campo de símbolos) ·
`FN-B-Verbos` (termos que se sucedem) · `CPMI-G-Horas` (hodômetro).

**O QUE A MEDIÇÃO MOSTROU — tela parada por entrega** (`ffmpeg -vf
freezedetect=n=0.001:d=0.4`, média das peças):

```
12,9% PL 1904   16,2% DOSIMETRIA   22,0% PL 2666   24,8% CPMI   28,9% Aquila 20
32,1% PL 2630   33,2% SAIDINHA     33,3% FAYAD     48,6% MESSIAS STF
51,1% Aquila 18        63,9% Fayad LISTA DE TRANSMISSÃO
```

**A PL 1904 — a entrega que ele aponta como referência — é objetivamente a que menos
congela do projeto**, e a queda é cronológica. O padrão que ele reconhece é medível; não
era saudade. Exceção legítima: peça feita para entrar e FICAR (`FAYLT-B-Numero`,
`FAYLT-D-Assinatura`), que vai declarada no `.confere.json`.

**As piores, para não repetir:** `CPMI-D-Triade` (três frases aparecem do nada, 87%
parada) · `MSF-G-Video` (4,2 s de 4,8 s congelados, card sobre um VÍDEO sem imagem
nenhuma) · `FN-F-Fecho` (86% parada; a terceira linha entra no quadro 256 de 275 e
ninguém lê) · `PLP-F-Camadas` e `FAYLT-S-Repasse` (campo de símbolos sem paralaxe,
contável, tamanho uniforme, 82–91% parado; 6,7–6,8% de cobertura de tela contra 17,9%
do `PL-E-Avanco`).

**A CAUSA NÃO É ATENÇÃO, É ARQUITETURA.** Onde a regra mora em código compartilhado, a
peça sai boa; onde eu redigito de memória, ela decai. Três provas:
- a série tem **quatro implementações independentes** de "termos que se sucedem" —
  `CPMI-D` (corte seco), `MSF-C` (fade curto), `FAY-B` (fade + marca-texto), `FN-B`
  (troca no lugar, a melhor). Nenhuma compartilha uma linha;
- **cor de identidade fora do `design.ts`** (ver §3.2);
- **nenhuma trava para tela parada** — por isso ela foi de 12,9% a 63,9% sem ninguém ver.

É a mesma doença que o `ZOOM_DE` curou no lettering. **Conferência de contêiner
(contagem, PSNR, decode) NÃO é análise de peça** — antes de dizer que analisei, abrir os
quadros.


1. Ler o dossiê (conclusão no topo primeiro) e o SRT; tabela do vídeo inteiro.
2. Conferir cada fato e cada licença na fonte primária.
3. `config.ts` + componentes + `Root.tsx`; `npx tsc --noEmit`.
4. Quadros de teste compostos em camadas; para estilo novo, mandar quadros para
   aprovação antes do vídeo.
5. Três masters no C:, conferência do §3.5, cópia para `Nikolas - <SRT> - <tema>`.
6. Prévias + REVISAO montada; `LEIA-ME.txt` abrindo com a tabela da timeline.

## 7. Lembretes para ele (pedido em 15/09/2026)
"eu quero meio que te treinar ao máximo, mas de vez em quando me lembre dessas
coisas, principalmente a parte de planejar". **De vez em quando** — nunca em toda
mensagem; no máximo uma linha no fim, e só quando o momento pedir:
- **Planejar primeiro** (o principal): pedido de estilo novo, peça complexa ou
  mudança grande → sugerir começar pelo plano (Shift+Tab no Claude Code).
- Vídeo sem áudio → pedir o áudio junto com o SRT.
- Movimento só em print → pedir referência em vídeo.
- Pedido aberto → perguntar quando está bom (duração, onde entra, o que não pode faltar).
- Estilo novo → aprovar por etapas (quadros → movimento → som).
- Sessão muito longa → uma tarefa grande por sessão, modelo mais forte no `/model`.

## 8. Git
Repositório iniciado em 15/09/2026. Versiona código, fontes, SRTs, imagens e
documentos pequenos; **não** versiona `node_modules`, `out/`, pastas de entrega nem
vídeos renderizados (ver `.gitignore`). Antes de mexer em peça já entregue ou
atualizar dependências, conferir `git status`. Commits quando ele pedir ou ao fechar
uma entrega combinada com ele.
