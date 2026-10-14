# MEMÓRIA DO PROJETO — Nikolas Ferreira · série "fundo branco"

> **Para o assistente que ler isto em outro chat:** este arquivo é a memória
> acumulada de um projeto longo. Leia INTEIRO antes de agir. As seções 2 e 3 são
> regras que o cliente pediu e que valem para sempre, em toda peça. Nada aqui é
> sugestão. Atualizado em 14/09/2026.

---

## 1. Quem, o quê, onde

- **Usuário:** Aquila, editor e motion designer. Faz as peças de grafismo dos
  vídeos verticais do **Dep. Federal Nikolas Ferreira (PL-MG)** e monta tudo no
  Premiere, por cima da gravação.
- **Jeito de pedir:** mensagens curtas e informais ("mano", "irmão", "kkk",
  "faça", "finaliza"). Muitas vezes **não assiste o render** antes de pedir
  mudança — a revisão visual é responsabilidade do assistente.
- **O que chega por vídeo:** um **SRT** palavra a palavra (é a régua de tempo) e
  um **dossiê em PDF** (pesquisa, manchetes, mapa de timecodes, direção de
  animação e *alertas de precisão*).
- **O que sai por vídeo:** uma pasta com as peças em `.mov`, prévias em `.mp4`,
  imagens com créditos e um `LEIA-ME.txt`.
- **Projeto local:** `E:\Clientes\Nikolas\0109\NIKOLAS FERREIRA - VIDEOS FUNDO BRANCO - 12\CLAUDE`
- **Disco E: é curto** (9,3 GB livres em 14/09/2026). Renderizar no C: e só
  copiar o master final para o E:.

---

## 2. Regras permanentes que ELE pediu (valem para TODAS as peças, sempre)

> "quero que sempre oq eu pedir vc faça em TODOS sempre, Guarde Tudo que eu te
> pedir, SEMPRE" — 04/09/2026

Todo pedido é **regra nova da série**, não conserto pontual. Ao receber um
pedido: listar todas as peças afetadas, aplicar em todas na mesma leva, dizer
qual ficou de fora e por quê. Exceção registrada: a regra de alfa/opaco (item 8)
vale só para peças novas — "pode deixar quieto os outros".

1. **Hodômetro em todo número.** "kd a animação dos números q c sempre faz? igual
   os contadores de moto la, q conta os km" (04/09). É a assinatura da série.
2. **Movimento fluido — nada aparece do nada.** "Deixe sempre fluido das
   animações" (04/09) e "pode deixar bem fluido viu" (08/09). Nada de curva que
   chega a 90% no primeiro terço e rasteja. Saída nunca menor que ~12 quadros.
   **Foto e card de notícia:** a chapa SOBE ~22 px e assenta em ~0,8 s com ~5% de
   zoom sobrando; legenda e crédito entram escalonados (0,1 s entre linhas)
   enquanto a chapa ainda assenta; foto nunca fica parada (push de 3–3,5% com a
   curva PAN, `overflow: hidden` na moldura).
3. **Documento tem de dar para LER.** "alguns documentos tão saindo rapidos e do
   nada tá dicil ler" (04/09). Câmera ancorada no BLOCO de texto medido no PDF,
   com a frase inteira em quadro, e segurando o close enquanto o marca-texto corre.
4. **Campo de símbolos em alfa em todo vídeo.** "Esqueceu daqueles negocios tipo
   os cadeados e os pontos de interrogação?" (04/09). Ver seção 3.8.
5. **Cobrir o vídeo inteiro**, não só os blocos que o dossiê lista.
6. **Conferir o render medindo, não olhando.** Ver seção 5.
7. **Três masters por peça: alfa, branco e escuro.** "Faz com fundo cinza agora um
   quase preto" (07/09). Escuro = `#15171A`, nunca preto puro.
8. **O assistente decide alfa ou opaco.** "Quando for assim sempre selecione
   oque vai ser alpha ou não, pode decidir" (07/09). O LEIA-ME abre com a tabela
   do que vai na timeline; as outras versões são alternativa, não pergunta.
9. **Notícia com foto leva a foto.** "Nas noticias se tiver foto você adiciona"
   (07/09). Licença fechada e foto DO FATO; legenda da própria matéria.
10. **Sem marcas de sobreposição.** "tenta não deixar essas marcas de
    sobreposição" (08/09). Formas opacas dentro de um grupo que carrega a
    opacidade — nunca transparência em cada forma.
11. **Nome da pasta de entrega:** `Nikolas - <arquivo base do SRT> - <tema>`.
    "Coloca o Nome do arquivo po, Nikolas - aquila 18 ai o nome do tema" (10/09).
    Ex.: `Nikolas - Aquila 18 - Imposto sobre Imposto`. As peças dentro mantêm o
    código curto (`PLP-B-Cascata-alpha.mov`).
12. **Liberar espaço apagando só o que é cópia comprovada.** "apaga os mais
    antigos pra liberar espaço" (10/09). Hash de início/meio/fim contra o arquivo
    entregue antes de apagar. O que não tem cópia: perguntar.
13. **A revisão é o vídeo MONTADO.** "tem alguma coisa errada, vc consegue fazer
    melhor que isso…" (10/09). Revisão = timeline inteira em camadas nos
    timecodes do SRT, nunca peças soltas em sequência.
14. **Pesquisar além do dossiê:** fotos, números, mapas ("procure fotos nomeros,
    pode fazer mapa realista se quiser também e por ai vai" — 10/09) — sempre
    dentro da regra 3.1.

---

## 3. Regras editoriais — a verdade na tela

### 3.1 A regra mais antiga, que vence todas as outras
**Nada em tela sem fonte verificada.** Fonte primária (lei, diário oficial,
ficha de tramitação, matéria original, API oficial). Agregador não conta: na
pesquisa de alíquotas de IPVA, dois sites deram 1,5% e 2,5% para o mesmo estado.
Texto em tela é **literal** da fonte e leva a fonte em tela.

### 3.2 "Avisa que X" é pedido de aviso, não fato conferido
Conferir antes. Entregar a versão que se prova, como PROP trocável. Se ele volta
com o motivo (ex.: "tirado do ar por direitos autorais"), a linha entra — apontada
para a versão que não se desmente — e o LEIA-ME pede o print.

### 3.3 Número que não fecha: mostrar o documento
Trocar o sujeito da tela do locutor para o documento. Ex.: "mais de 32 reuniões"
virou a AGENDA da CPMI (32 reuniões existem; presença dele em 22). O rótulo
descreve o documento, nunca a ação do locutor, e o contador é amarrado ao desenho.

### 3.4 Ler a conclusão do dossiê antes de vetar
O topo do dossiê traz o veredito; o corpo traz o histórico. Vetar o que já está
provado é erro igual ao inverso.

### 3.5 O dossiê não cobre o vídeo inteiro
Fazer a tabela de timecode do vídeo todo: peça / proibido pelo dossiê / livre.
Cada trecho livre ganha peça ou justificativa escrita.

### 3.6 Opinião declarada não ganha grafismo
"Na nossa avaliação…" → nenhum número, selo, seta ou palavra que converta opinião
em fato. Não afirmar derrota, aprovação ou arquivamento que não houve. Manter a
delimitação da própria fala ("naquele momento").

### 3.7 Não entregar munição ao outro lado
Ex.: no IPVA, o mapa de **arrecadação** por estado (R$ 90 bi em 2025) é o
argumento do governador contra o projeto. O mapa certo foi o de alíquotas.

### 3.8 Campo de símbolos
- O símbolo é o **substantivo** da frase e executa o **gesto** dela (cadeado
  fecha, pálpebra abre, aspa se escreve).
- **Nunca contável:** duas camadas com paralaxe, peças sobrepostas, sangrando pela
  borda.
- **Teste de tom:** não afirmar o que a fala não afirma (no PL 2630, aspas
  inteiras — nunca amordaçadas, porque censura consumada não houve). Olhos de
  traço que não encaram a lente.
- Contorno do vazio **torto**, nunca um anel/óvalo em volta do centro.
- **Não encostar em conteúdo:** conferir por geometria contra os retângulos de
  todas as peças que ficam por cima.
- Símbolos já usados (não repetir): cadeados (Pix), interrogações (Evidências),
  balões e pegadas (Dosimetria), chevrons (PL 1904), sinais de mais (Fayad),
  aparelhos (PL 2666), olhos (Messias), folhas (CPMI), grades (saidinha),
  camadas (PLP), aspas (PL 2630).

### 3.9 Manchete e citação alheias não se melhoram
"; acompanhe" no título fica (menor, cinza). Colchetes da agência na citação
ficam. Legenda da foto é a da matéria em que a foto saiu.

### 3.10 A tela não pode se contradizer
Ex.: carimbo "2023" sobre documento que traz "Apresentação 03/07/2020" na margem
— o carimbo virou "02/05/2023 · pautado para votação".

---

## 4. Idioma visual e técnico da série

### 4.1 Stack
Remotion 4.0.520 · React 19 · TypeScript 5.6.3 strict · fonte **Archivo**
(`@remotion/google-fonts/Archivo`, pesos 500/700/800) · **1080×1920 @ 60 fps**.
Cada vídeo mora em `src/<código>/` com `config.ts` (conteúdo, fontes, beat sheets
com timecodes do SRT) e um componente por peça; tudo registrado em `src/Root.tsx`.

### 4.2 `src/shared/design.ts`
- `COR`: fundo `#FFFFFF` · texto `#0F0F0F` · meta `#8A9099` · regua `#E4E7EA` ·
  marca `#FFD84D` (marca-texto) · carimbo `#1F4B99` · escuro `#15171A`.
- `MARGEM = 96`, `LARGURA = 888`, `FPS = 60`, `f(s)` segundos→quadros, `trava`
  (clamp).
- Easings: `EXPO_OUT`, `EXPO_IN`, `INOUT`, `SAIDA`, `TRACO` (caneta), `PAN`
  (travelling). Em `Papel3D.tsx`: `ENTRADA`, `DESLIZE`.
- `type Tema = 'claro' | 'alfa' | 'escuro'`, `placa(tema)` (null = alfa),
  `placaClara(fundo)` (a tinta segue a luminância da placa).

### 4.3 Componentes compartilhados
- **`Cena`** — a placa vive FORA do grupo que esmaece. `fundo={null}` = alfa.
- **`Papel3D`** — documento real (PDF rasterizado a 200 dpi) em 3D, com chaves de
  câmera, traços de marca-texto nas caixas medidas com **PyMuPDF**
  (`page.search_for`), desfoque de entrada e whip de saída.
- **`Odometro`** (`src/pix`) — hodômetro. Cada casa mede `px × 0,6`.
- **`Marca` / `TextoMarcado`** — marca-texto em `multiply` (só funciona sobre fundo
  claro — por isso cards de notícia são brancos nos três masters).
- **`TINTA`, `SOMBRA`, `Caixa`** (`src/pix/Subidas`) — o idioma do alfa: tinta
  branca, brilho pesado, caixa translúcida atrás de texto pequeno.
- **`Troca`** (`src/fn`) — substituição de palavra no mesmo lugar, 0,26 s, as duas
  palavras se cruzando, sempre subindo.
- **`Cartao`** (`src/fn`) — card de notícia branco: foto com push, legenda e
  crédito, órgão + data/hora, manchete com marca-texto no trecho que é a fala.

### 4.4 Formatos
- **Alfa:** ProRes 4444 `--pixel-format=yuva444p10le` (ffprobe mostra 12le).
- **Branco e escuro:** ProRes 422 HQ.
- **Plano de cobertura** (foto real): opaco, **um** arquivo, sem fade nas pontas,
  push de 7%, véu em três partes, crédito queimado.
- Exceções deliberadas e documentadas: corte seco no fim do FN-D (o silêncio antes
  do "Não havia" é o efeito); PLP-A corta direto no bloco seguinte.

### 4.5 Comandos
```bash
# alfa
npx remotion render <ID> saida-alpha.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --props=p_alfa.json
# branco / escuro
npx remotion render <ID> saida.mov        --codec=prores --prores-profile=hq --props=p_claro.json
npx remotion render <ID> saida-escuro.mov --codec=prores --prores-profile=hq --props=p_escuro.json
# p_alfa.json {"tema":"alfa"} · p_claro.json {"tema":"claro"} · p_escuro.json {"tema":"escuro"}
# campos de símbolo: {"camada":"A"} · {"camada":"A","fundo":"#FFFFFF"} · {"camada":"A","fundo":"#15171A"}
```

---

## 5. Conferência técnica — todo master, sempre

1. **Contar quadros de verdade:** `ffprobe -count_frames -show_entries stream=nb_read_frames`
   (`nb_frames` mente). Os três masters da peça têm de bater.
2. **Decodificar inteiro:** `ffmpeg -v error -i X.mov -f null -` — saída vazia é
   o único "passou" (já pegou `ac tex damaged`).
3. **Saída:** último quadro — alfa `YMAX=256` (vazio), branco `940`.
4. **Miolo:** `YMAX` do alfa no quadro do meio — prova que o conteúdo existe (pegou
   masters escuros vazios).
5. **Identidade escuro = alfa sobre `#15171A`:** PSNR. Gráfico ~55 dB, com foto
   45–52 dB. Abaixo de 40 dB é defeito (pegou placa esmaecendo junto com o papel:
   26 dB).
6. **Canal alfa existe:** extremos do canal A.
7. **`defaultProps`:** conferir o tema antes de renderizar sem `--props`.
8. **Revisão montada:** timeline inteira em camadas (ffmpeg `-itsoffset` por
   entrada, `gblur=sigma=16` na camada B, `overlay=eof_action=pass`), placa "sem
   grafismo" nos trechos vazios (marcada como só-revisão). Olhar 1 quadro por
   segundo e AMPLIAR o primeiro e o último quadro de cada peça.
9. **Campo de símbolos:** geometria contra os retângulos de conteúdo, com balanço
   lateral e desfoque.

---

## 6. Armadilhas técnicas já pagas

- **Heredoc no bash quebra com aspas** em TSX/Python grandes → escrever o script em
  arquivo e rodar.
- **`filter` achata o 3D** dos descendentes → desfoque num invólucro FORA da
  perspectiva.
- **Placa dentro do grupo que esmaece** → fundo escurece ou some. Placa sempre fora.
- **`undefined` dispara o default** em JS → sentinela de "sem fundo" é `null`.
- **`fundo ? tinta escura : branca`** quebrou com o tema escuro → `placaClara`.
- **Transparência por forma** → marcas de sobreposição → opacidade no grupo.
- **Numeral que segue um ponto** → travar entre as margens (nascia cortado na borda).
- **EBUSY ao renomear no E:** e disco cheio → renderizar no C:, copiar o final.
- **Chrome "Timed out … connect to the browser"** → só repetir (script com 3 tentativas).
- **267 vs 268 quadros / `ac tex damaged`** → re-renderizar e reconferir.
- **NASA:** `assets.science.nasa.gov` devolve no máximo 1280 px; a imagem cheia
  (21600×10800) está em `eoimages.gsfc.nasa.gov/images/imagerecords/73000/73776/`.
- **IBGE (API de malhas)** responde em gzip.
- **PIL: recorte fora da imagem sai preto sem erro** → conferir extremos RGB.
- **Período eleitoral de 2026:** Sefaz, Agência Brasil e agências estaduais com
  páginas suspensas ou bloqueadas → ir à lei no site da assembleia.
- **WebSearch tem limite por sessão** → não disparar dezenas de buscas de uma vez.

---

## 7. Licenças conferidas na fonte

| Fonte | Condição (literal ou resumida) |
|---|---|
| Banco de Imagens da Câmara | CC BY — crédito "Nome do Fotógrafo/Câmara dos Deputados" |
| Agência Câmara Notícias | reprodução autorizada com a assinatura "Agência Câmara Notícias" |
| TV Câmara (audiovisual) | CC BY-NC-ND — **proibido corte ou reutilização parcial** → não usar trecho de vídeo |
| Agência Senado / Senado Notícias | "A reprodução de matérias e fotografias é livre, desde que não haja descaracterização de conteúdo e mediante a citação da Agência Senado e do autor" |
| Agência Brasil | CC BY, mas páginas "desativadas por questões eleitorais" em 2026 |
| NASA Blue Marble NG | crédito "NASA Earth Observatory" |
| IBGE (malhas) | dado público |
| Wikimedia Commons | por arquivo — ex.: "Nikolas Ferreira na tribuna… 2023.jpg" é CC BY 3.0 (Pablo Valadares/Câmara); **não** usar "Deputado Nikolas Ferreira.jpg" (CC BY-SA 4.0) |

---

## 8. Os vídeos e as entregas (estado em 14/09/2026)

| Código | Tema | SRT base | Pasta | Peças | Campo |
|---|---|---|---|---|---|
| PIX | PL 4387/2025 — gratuidade do Pix | — | só renders em `out/pix` | PIX-A…D | cadeados |
| EVI | PL 3649/2025 — políticas baseadas em evidências | — | só renders em `out/evi` | EVI-A…E | interrogações |
| IOF / BPC / abertura / IG | IOF-Pix "fator Nikolas", BPC no Pé-de-Meia, abertura BPC (Decreto 12.534/2025), simulação de post | — | só em `out/` | — | — |
| DOS | Dosimetria e 8 de Janeiro | — | `ENTREGA - DOSIMETRIA` | DOS-A…G | balões, pegadas |
| PL | PL 1904/2024 — aborto após 22 semanas | — | `ENTREGA - PL 1904` | PL-A…E | chevrons |
| FAY | Fayad / Salinhas | `C8784.srt` | `ENTREGA - FAYAD SALINHAS` | FAY-A…F | sinais de mais |
| PL2666 | PL 2666/2021 — equipamentos apreendidos para escolas | — | `ENTREGA - PL 2666` | PL2666-A…D | aparelhos |
| MSF | Rejeição de Jorge Messias ao STF | `NK_03_KLAY.srt` (nunca chegou) | `ENTREGA - MESSIAS STF` | MSF-A…I | olhos |
| CPMI | CPMI do 8 de Janeiro — balanço | `EL_sequencia_1788709077559.srt` | `ENTREGA - CPMI 8 DE JANEIRO` | CPMI-A…G | folhas |
| SAI | Saidinha — derrubada do veto | `EL_sequencia_1788760022716.srt` | `ENTREGA - SAIDINHA VETO` | SAI-A…G | grades |
| PLP | Imposto sobre imposto — PLP 24/2026 | `Aquila 18.srt` | `Nikolas - Aquila 18 - Imposto sobre Imposto` | PLP-A…G | camadas |
| FN | PL 2630 — a votação que não aconteceu | `klay_05_nk.srt` | `ENTREGA - PL 2630 FAKE NEWS` | FN-A…H | aspas |

### Notas por vídeo (o que importa lembrar)

**CPMI** — CPMI-E: os 9 episódios do documentário (thumbs do YouTube, diagramação
2D; a versão 3D foi arquivada em `_variante-3d`) e o aviso de que o **décimo**
episódio saiu do ar por direitos autorais (os 9 enviados estavam no ar, conferidos
de 4 formas). CPMI-F: a **agenda** da comissão (32 reuniões), não a presença dele
(22 de 32 — variante em `_variante-presenca`). CPMI-G: 159,9 horas somadas das
notas taquigráficas.

**SAI** — SAI-C (placar da derrubada, 314 e 52) ganhou a foto da própria matéria
(Jefferson Rudy/Agência Senado), com entrada fluida refeita. SAI-E (grades)
corrigido: marcas de sobreposição e master escuro que saía vazio. SAI-F e SAI-G
são planos de cobertura com foto real.

**MSF** — o MSF-I (olhos) tem duração estimada de 3,2 s porque o SRT nunca chegou;
é um número só (`I_OLHOS.duracao`). MSF-H (views) aguarda o print das métricas.

**PLP (Aquila 18)** — O segundo projeto da fala é o **PLP 86/2026** (ITCMD, imóveis
urbanos edificados), achado filtrando as 97 proposições dele de 2026 por ementa;
há também a PEC 3/2026 (alíquota máxima e base exclusiva do IPVA), que não entrou.
PLP 24/2026 tem uma única tramitação: "Aguardando Despacho do Presidente da
Câmara (Chancela)" desde 12/02/2026. A curva tem 3 pontos do IBPT (1970: 76,
1986: 82, 2026: 150 dias). **PLP-G-Mapa** (novo): satélite real da NASA recortado
nas divisas do IBGE, vai **embaixo** da cascata; os 27 estados acendem em "Bem
vindo ao Brasil!"; só **SP, MG e RJ 4%** levam número, os três lidos na lei
(Lei 13.296/2008 art. 9º III; Lei 14.937/2003 art. 10 I; Lei 2.877/1997 art. 10
II). Em 10/09 foram corrigidos: numeral da curva (nascia cortado e cruzava o "82"),
torres das camadas (encostavam no conteúdo) e a revisão (virou montagem em camadas).

**FN (klay_05_nk)** — O melhor achado: a Agência Câmara publicou às 17:56 de
02/05/2023 a manchete "Lira diz que PL das Fake News só será votado hoje se houver
votos para aprovar" — é a própria locução, em fonte pública; não há card comercial
na entrega. Citação literal com colchetes da agência. Bloco 6 ("conseguimos
impedir…") **sem grafismo**: o PL votou contra a retirada de pauta. Bloco 3 (Gayer)
sem card de imprensa: mostra o relator Orlando Silva (PCdoB-SP) pela ficha de
tramitação. Registro de Plenário de 25/04/2023 (Diário da Câmara de 26/04, págs.
47 e 133) virou a fonte do bloco 2. Plano do protesto (FN-H) tem um cartaz legível
"PL 2630 CENSURA NÃO" — decisão editorial dele.

---

### Aquila 20 — Rejeição de Igor Roque na DPU (17/09/2026)
Código `DPU`, `src/dpu/`. Bruto 1088×1904 a 29,97 fps em `public/aquila20/`.
- **Quatro divergências com o dossiê, todas no documento oficial:** data da Mensagem
  nº 227 é 16/05/2023 (o dossiê dizia 19/05, que é a data da imprensa); CCJ foi 20 a 1
  **com 1 abstenção**; crédito da foto é **Waldemir Barreto**/Agência Senado (não Pedro
  França — está no atributo `credito` do HTML); a linha dos 41 não atravessa o 38.
- **Placar sem hodômetro e régua do mínimo só na coluna dos favoráveis** — precedente
  aprovado do MSF-A. No plano eu tinha escrito "hodômetro vence" e voltei atrás ao ler
  o MSF-A: exceção aprovada é parte da regra.
- **Primeiro vídeo com dois letterings** (regra nova de 17/09): modelo 3 no fecho
  ("é fiscalizar, / ARTICULAR / e trabalhar") e modelo 2 no gancho ("acontece na frente
  das / CÂMERAS", janela de 1,6 s, tempos na mão).
- Bloco de bastidores (07,8–13,5) sem peça: afirmação sem registro público.
- "2º na lista tríplice" conferido mas fora da tela: a fala não diz.
- O `LETTER-Exemplo2` só repassa o texto; tempo customizado só vale no `LETTER-Modelo2`.

### FAYAD · LISTA DE TRANSMISSÃO — pedido de voto 45.888 (20/09/2026)

Segundo vídeo do Fayad. **`src/fay/` já era o das salinhas** (ids `FAY-*`), então
este é **`src/faylt/`**, ids `FAYLT-*`. Entrega em
`Fayad - LISTA_DE_TRANSMISSAO - Pedido de Voto 45888`.

**Não veio SRT nem bruto** — só o MP3 (87,005 s). Transcrevi com autorização dele:
texto da **ElevenLabs** (crédito dele), tempos do **faster-whisper local**, onsets
dos dígitos medidos com `silencedetect`. SRT em `public/faylt/`.

**Três coisas do dossiê que o áudio desmente:**
1. O alerta 8.2 do artigo faltando **não existe** — ele diz "nós temos **uma**
   opção preparada". As duas transcrições ouvem igual.
2. O "foi" duplicado existe e fica (fidelidade à fala).
3. O gancho é "Se você **tá** vendo", não "está" — ele confere de ouvido.

**Duas decisões dele, que viraram regra:** hodômetro curto no 42 das salas;
**nada de hodômetro no 45.888** (identificador não rola). A legenda queimada e a
exportação (9x16, 1x1, WhatsApp <16 MB) são dele.

**O 42 vem de `src/fay/config.ts`** — já conferido em 04–05/09. Um número, uma
verdade, um lugar. O rótulo nunca diz "em Goiás" (Distrito 4770 = MG, GO e MT).

**Dois erros que a conferência pegou, e que valem para a próxima peça:**
- O GC das salas e a assinatura ocupavam a mesma faixa (y 1620 x 1555). Subi o GC.
- O **modelo 4 com os tempos padrão adianta o destaque**: a peça assentava 4,5 s
  antes de ele falar "palavra". Os `tempos` do modelo são prop — quando o lettering
  pontua uma fala com pausas marcadas, **as entradas saem da locução**, não do padrão.
  Isso também é o que faz a duração bater com a janela (7,00 s x 2,52 s).
- Com "compromisso, responsabilidade e" o modelo 4 fica com **1 px** entre as
  letras. Virou "compromisso e" (a saída do dossiê), com folga 21/11 px.

**Pendente:** a **revisão montada** — falta o vídeo bruto. Sem ele não dá para
conferir colisão com rosto/mãos nem escolher o primeiro quadro (thumbnail).

---

## 9. Pendências abertas

1. **Apagar ~2,5 GB de `out/` sem cópia em nenhuma entrega?** (evi, pix, iof,
   abertura, bpc, libras, ig e versões antigas de sai/fay/plp/dos) — aguardando.
2. **Renomear as outras 8 pastas `ENTREGA - …`** para `Nikolas - <SRT> - <tema>`? —
   aguardando. SRT só está registrado no código para CPMI, SAI, FAY, FN e PLP.
3. **MSF:** `NK_03_KLAY.srt` para fechar a duração do MSF-I; print de métricas do MSF-H.
4. **CPMI:** print da notificação de remoção do décimo episódio (para o LEIA-ME).
5. **FN:** decidir o cartaz "CENSURA NÃO" (manter / reenquadrar / trocar foto);
   registro de conversa com Gayer; requerimento de obstrução assinado por ele no PL 2630.
6. **FAYAD LISTA:** falta o **vídeo bruto** para a revisão montada e para escolher
   o primeiro quadro (thumbnail do WhatsApp).
7. **PLP:** PR 1,9% e AM 1,5–2% não confirmados em lei (páginas fora do ar); foto
   própria do dia do protocolo, se o gabinete tiver.

---

## 10. Roteiro para um vídeo novo

1. Ler o dossiê inteiro (a conclusão no topo primeiro) e o SRT; conferir se os
   timecodes batem cue a cue.
2. Tabela do vídeo inteiro: peça / proibido pelo dossiê / livre.
3. **Conferir cada fato na fonte primária** e as licenças de cada imagem. Procurar
   o que o dossiê não achou (APIs de dados abertos da Câmara, fichas de tramitação,
   fotos das próprias matérias).
4. Escolher o campo de símbolos (substantivo + gesto + tom + não contável).
5. `config.ts` com conteúdo, fontes e beat sheets comentados; componentes; Root.
6. `tsc --noEmit`; quadros de teste compostos em camadas; corrigir.
7. Render dos três masters no C:, conferência da seção 5, copiar para a pasta
   `Nikolas - <SRT> - <tema>`.
8. Prévias por peça + **REVISAO = montagem em camadas**; olhar 1 quadro por segundo
   e ampliar o primeiro e o último quadro de cada peça.
9. `LEIA-ME.txt` abrindo com a tabela do que vai na timeline (arquivo apontado),
   depois achados, discordâncias com o dossiê, alertas e pendências.
10. Mandar a prévia/revisão e responder em português, direto, dizendo o que foi
    conferido e o que não se confirmou.

---

## 11. Lettering de destaque (novo em 15/09/2026)

Pedido: "em alguns momentos chaves em que não tiver elementos pra colocar você
vai destacar com esse Lettering" — é algo a mais que entra NA EDIÇÃO. Ele vai
mandar outros modelos; cada um vira uma variante.

**Modelo 1** (print de referência: "Porque a / INCLUSÃO / só dentro da escola"):
- Três linhas brancas, empilhadas e apertadas — pode invadir a caixa da linha
  vizinha ("não tem problema invadir as caixas de texto").
- Linhas 1 e 3: **Coolvetica** e família (`public/fonts/Coolvetica_Rg.otf`).
  Linha 2 (destaque gigante, caixa alta, ~87% da largura): **Montserrat Black**.
- Linha 2 tem um **corte na DIAGONAL** no meio das maiúsculas: metade de cima
  escorrega para um lado, a de baixo para o outro, com **sombra dura e grande**
  da metade de cima sobre a de baixo.

**Animação (literal):**
1. Linha 1 sobe de baixo para cima, fluida, a linha inteira de uma vez.
2. Linha 2 entra COMPLETA, sem corte, embaçada → fica nítida → só então se
   reparte no meio, suave.
3. Linha 3 entra palavra por palavra, de baixo para cima, com blur de movimento.

**Código:** `src/lettering/Lettering.tsx` (reutilizável) e
`src/lettering/Exemplo.tsx` (composição `LETTER-Exemplo`, frase literal do fecho
do Aquila 18: "parar de criar / IMPOSTO / em cima de imposto").
Atenção: `public/Sequência aninhada 05.mp4` tem textos gravados de outros
planos — não serve de fundo; só o quadro de 0,5 s é limpo.

**Ajustes do modelo 1 (15/09/2026):** corte bem inclinado ("mais um pouco ainda na
transversal, bem Motion mesmo"), com as metades deslizando ao longo da diagonal e
passando um pouco do ponto; sombra dura e grande no corte; sombra SUAVE nas outras
linhas; e as letras das linhas 1 e 3 nunca encostam na linha 2 ("não deixar algumas
partes do texto de cima colar") — as caixas podem invadir, as letras não.

**Versão 4 do modelo 1 (15/09/2026):**
- **Dynamic zoom:** o bloco inteiro nasce ampliado (110%) e encolhe devagar até
  100% durante toda a peça — escala única no grupo, para as folgas não mudarem.
  Palavra do meio em repouso a ~84% da largura (a 87% com zoom de 112% ela
  encostou na borda durante o corte).
- **Entradas sobrepostas:** cada gesto começa antes de o anterior acabar
  ("uma animação começar junto com a outra"); não precisa terminar junto com a fala.
- **Molas (`spring`)** no lugar de curvas fixas: superamortecida nas linhas 1 e 3
  (não passam do ponto, então não encostam na linha 2); subamortecida no corte
  (passa ~6% e volta). O desfoque de movimento da linha 3 sai da velocidade da mola.
- **Motion blur de câmera real:** `CameraMotionBlur` (`@remotion/motion-blur`),
  8 amostras, obturador 180°, só no lettering.
- **SFX:** ele vai mandar Whoosh, Wind e clicks de motion graphics. Os pontos de
  batida saem do código (`cuesSfx(tempos)`) e estão em
  `_lettering/CUES-SFX-exemplo.txt`: whoosh na linha 1, wind longo na linha 2
  desembaçando, click + whoosh curto no corte, um click por palavra da linha 3.

**Versão 5 do modelo 1:** largura medida de verdade (`@remotion/layout-utils`), ritmo
das palavras pelo tamanho da palavra, composição transparente `LETTER-Modelo1` com
texto por props.

**Modelo 2 (15/09/2026):** "na mesma pegada, só que as letras menores ficam em cima e
a palavra destaque fica embaixo, e só, animação de baixo pra cima com o mesmo zoom
dinâmico".
- **3–4 PALAVRAS EM CIMA, 1 EMBAIXO.** O 1º exemplo levou a frase inteira em cima
  e ele cortou: "não precisa desse tanto de palavras, coloca tipo umas 3 ou 4
  palavras em cima e só uma embaixo, e toda vindo de baixo pra cima".
- Texto pequeno Coolvetica em cima (uma linha, 96% da largura do destaque);
  destaque Montserrat Black caixa alta embaixo. Sem corte, sem desembaçar, sem
  terceira linha. As palavras de cima sobem uma a uma (0,05 s entre elas).
- Tudo sobe de baixo para cima (mola sem overshoot, blur que some ao assentar),
  destaque começa antes de o texto pequeno terminar, dynamic zoom 110%→100%,
  motion blur de câmera.
- Texto pequeno em 1 linha só se ela tiver ≥50% do corpo do destaque; senão 2 linhas
  BALANCEADAS a até 82% da largura do destaque.
- **Acento em maiúscula** (Ô, Ã, É) sobe ~0,13 em acima das capitulares — o "m" de
  "um" quase encostou no circunflexo de ELETRÔNICO. `folgaAcento()` nos dois modelos.
- Código: `src/lettering/base.tsx` (base de todo modelo novo), `Lettering2.tsx`,
  `Modelo2.tsx` (`LETTER-Modelo2`, alfa), `Exemplo2.tsx` (`LETTER-Exemplo2`, frase
  literal do Aquila 18 aos 27 s: "chega de tratar o contribuinte como se fosse um /
  CAIXA ELETRÔNICO").

**Modelo 3 (print "transformar ALCANCE em impressã", 15/09/2026):** linha pequena à
esquerda + PALAVRA GRANDE começando depois dela e sangrando pela borda direita +
linha pequena embaixo, deslocada à direita e também sangrando. Falso itálico
(skewX -9°) em tudo, bloco girado -1,2° e corte horizontal com a MECÂNICA DO MODELO 1:
a palavra entra inteira e só depois reparte. Ele cobrou duas vezes ("não tá com a mesma
animação do modelo 1 na hora que a palavra parte no meio, nem a sombra" e depois "viu
que tem sombra no corte, dando aquele efeito 3D e tal"), e o que faltava era isto:
o **efeito 3D não é a sombra projetada**, é um **degradê cinza pintado DENTRO das letras**
da metade de baixo, da linha do corte até 10% do corpo abaixo (`background-clip: text`,
cinza = 255 − 78·reparte) — é ele que lê como espessura; a **sombra dura fica num WRAPPER**
em volta da metade de cima (no elemento cortado desenha a silhueta inteira); a metade de
cima sobe 1,2% do corpo abrindo a fresta; há **dois tempos** (curva para sombra/degradê,
mola subamortecida para o deslize); e a metade de baixo vem antes no DOM.
Quando um modelo novo cita um gesto de outro, herdar a ANIMAÇÃO INTEIRA — ler o código
do original antes de recriar de memória. O corpo sai de uma conta: margem + pequena + folga +
grande = 112% da largura do quadro. `Lettering3.tsx` / `Modelo3.tsx` / `Exemplo3.tsx`.

**Modelo 4 (print "para dar VIDA / em nossos / VÍDEOS", 15/09/2026):** o primeiro com
DUAS palavras de destaque e com cor. Linha A: pequena branca + 1ª palavra AMARELA na
mesma base; linha B: pequena branca recuada 0,35 do corpo; linha C: 2ª palavra AMARELA
recuada 1,15 — escada descendo para a direita, linhas apertadas, falso itálico. Amarelo
= `COR.marca`. Fontes padrão (Coolvetica + Montserrat Black): "não precisa ser light,
usa as padrões". `Lettering4.tsx` / `Modelo4.tsx` / `Exemplo4.tsx`.

**ÁREA E PESO — padrão dos três modelos (15/09/2026):** "pode diminuir a área que ele
toma, e pode também pegar uma versão da fonte light... mantém o padrão sempre".
Largura alvo 85% → **78%** (modelos 1, 2 e 4) e 106% → 94% → **88%** no modelo 3 (o
último passo foi "pode pôr aquele texto um pouco mais pra dentro": não atravessa mais
a borda) — a área menor vale para todos. O **peso leve é SÓ DO MODELO 3** (Montserrat 300): troquei nos três
e ele corrigiu — "a light é só naquela mano, o resto mantém". A Coolvetica Light não
existe na máquina dele (só a Regular, conferido em Downloads, Desktop, Documentos,
fontes do Windows e envios); se ele mandar o arquivo, apontar `PEQUENA` em `base.tsx`
para ela. Regra de comportamento entra nos três na mesma leva; fonte de um modelo é
identidade dele.

**ATUALIZADO EM 17/09/2026 — ATÉ DOIS POR VÍDEO, MODELOS DIFERENTES:** "pode ser dois
Lettrins por vídeo tá? mas não repetidos". Substitui a regra abaixo. E "deixa como está
nos vídeos SRT": fato verificado que a fala não diz não entra na tela.

**(substituída) UM POR VÍDEO, SÓ UM (15/09/2026):** "esses lettrings devem aparecer uma vez em cada
vídeo e só". Eu analiso e escolho o momento — sempre num trecho SEM elemento gráfico —
e justifico no LEIA-ME.

**NÚMERO DE PALAVRAS — REGRA DURA EM TODOS OS MODELOS (15/09/2026):** "em todos que
você for fazer, cuidado com o número de palavras. Tá horrível." Eu tinha encolhido o
texto até caber E MANDADO o vídeo feio para ele. Encolher até caber não é cuidar: é
esconder o problema. Agora `garanteQueCabe()` (`base.tsx`) PARA o render, com mensagem
dizendo o que cortar, se o destaque cair abaixo de 85 px ou se alguma parte passar do
limite de palavras (modelo 2: 6 / 2; modelo 3: 5, 1, 5; modelo 4: 4, 1, 4, 1). O piso e
os limites foram calibrados pelos casos que ELE aprovou (o exemplo padrão do modelo 4
tem destaque de 116 px; o CELULARES do modelo 3, 92 px; o caso que ele reprovou tinha
51 px) — primeiro chutei 120 px e a regra reprovou o que já estava aprovado.
**E nunca mandar para ele um render que eu mesmo acho ruim.**

**MODELO 4 — QUANTIDADE DE PALAVRAS (aviso dele, 15/09/2026):** é o modelo mais frágil,
com quatro partes. Duas lições: (1) as TRÊS linhas têm de entrar na conta de largura — a
do meio tinha ficado de fora e atravessava a tela; (2) **piso de corpo causa estouro** —
piso e "caber" são contraditórios: com piso de 70 px, uma frase que pedia 51 px era
forçada para fora do quadro (medido: x 0 → 1077 de 1080). Sem piso, a conta manda e o
código avisa no console quando o destaque fica abaixo de 110 px. O desenho é para 2–3
palavras em cada linha pequena e UMA palavra em cada destaque; frase maior, outro modelo.

**ADAPTAR AO TEXTO — vale para TODOS os modelos (15/09/2026):** "você sabe que tem que
adaptar sempre dependendo das palavras né?". As medidas já se adaptavam; os TEMPOS e a
DURAÇÃO eram fixos. Agora cada gesto espera conforme o tamanho do que entrou
(`ritmo`/`ritmoDaFrase`) e a peça termina pelo último gesto + cauda (`duracaoDe`).
Armadilha: piso de duração alto (eu pus 2,6 s) faz frases diferentes darem a MESMA
duração — quem manda vira o piso, não o texto; piso agora é 1,9 s. Posições que podem
estourar com frase longa (recuo da linha de baixo do modelo 3) usam o menor entre o
desejado e o que cabe na margem. Testado com frases literais de outros SRTs: "o Brasil
gasta BILHÕES" e "isso realmente FUNCIONA?" (NK 01 KLAY), "todo ano, milhares de
CELULARES..." (Aquila 8), "colocava em risco a LIBERDADE de EXPRESSÃO" (klay_05).

**FLUIDEZ — vale para TODOS os modelos (15/09/2026):** ele disse "por algum motivo tô
achando essas animações meio duras". O motivo tinha nome: **damping 200** nas molas
(superamortecido) — cada parte chegava e travava. Agora: molas moles e pesadas
(`damping 30 / stiffness 38 / mass 1.7`; destaque `34 / 40 / 2`), entradas mais longas
e de mais longe, desfoque mais forte, e **`deriva()`** — depois de assentar o bloco
continua escorregando 8–14 px até o fim (zoom sozinho não dá isso: escala não é
translação). Ao afrouxar mola, conferir folga entre as linhas com
`scripts/checa_folga.py` (mede as faixas de texto branco E amarelo no quadro), nunca
no olho: o fundo é o vídeo dele e o branco se confunde com pele e camiseta. Medido
depois da mudança: modelo 1 com 7 e 6 px, modelo 2 com 7 px, modelos 3 e 4 com 15/11 px
— nenhuma letra encostou.

**SAÍDA — vale para TODOS os modelos (15/09/2026):** "pode deixar o movimento de
zoom até ele sumir desvanecendo, bem fluido". A escala nunca trava: segue descendo
mais 3% até o último quadro e os 0,75 s finais esmaecem o bloco inteiro por cima
desse movimento. Nada de terminar parado e nítido.

**O "pop" é SOM DE DIGITAÇÃO** ("é tipo aquele que digita"): tecla de teclado,
seco e curto — não bolha. `public/sfx/eleven/pop_tecla_01..03.wav`, um por palavra.

**SFX "bem motion" (15/09/2026):** Kenney soa game/UI. Pack próprio sintetizado em
`scripts/sfx_motion.py` → `public/sfx/motion/` (19 sons, 48 kHz/24 bit), zero risco
de licença. Motion Array: licença não legível (403) — ele confere logado.

---

## 12. Lembretes que ele pediu (15/09/2026)

"eu quero meio que te treinar ao máximo, mas de vez em quando me lembre dessas
coisas tá, principalmente a parte de planejar"

De vez em quando — nunca em toda mensagem, no máximo uma linha no fim e só quando o
momento pedir — lembrá-lo de:
- **Planejar primeiro** (o principal): em estilo novo, peça complexa ou mudança
  grande, sugerir começar pelo plano (Shift+Tab no Claude Code).
- **Mandar o áudio junto com o SRT.**
- **Referência em vídeo** para movimento; print só para visual.
- **Dizer quando está bom:** duração, onde entra, o que não pode faltar.
- **Aprovar por etapas:** quadros → movimento → som.
- **Uma tarefa grande por sessão** e o modelo mais forte no `/model`.

---

## 13. O lettering ganhou som — e a lição das palavras (21/09/2026)

**"Mano vou repetir cuidado com o tanto de palavras no lettering"** — segunda vez
que ele cobra. Estava certo, e o erro era maior do que eu tinha visto:

- **O limite não é o desenho.** `garanteQueCabe` só PARA em 4 palavras por linha
  pequena; o desenho do modelo 4 é **2–3**, e o do modelo 2 é 3–4 **numa linha só**.
  Medido: "a minha vida com" (4) → destaque de 65 px; "vida com" (2) → 80 px; a
  frase que ele aprovou quando o modelo nasceu → 93 px.
- **Quebra de linha na pequena não dispara falha nenhuma.** "Vamos juntos
  multiplicar essa" (4) quebrou a pequena do modelo 2 em DUAS linhas e eu não vi —
  ainda escrevi no LEIA-ME que estava "exatamente no desenho". Como se pega:
  contar as FAIXAS do `checa_folga.py` (modelo 2 certo = 2 faixas).

**"Lembra dessa pasta?"** — `SFX - LETTERING/` com os pops dele, deixados em 20/09.
Os quatro modelos exportavam `cuesSfx*` desde que nasceram e **nada consumia esses
cues**: eram comentários. Os letterings saíam mudos e eu escrevi num LEIA-ME que
"nenhum SFX foi usado", como se fosse escolha. Sintoma de que ninguém tocava: o cue
do modelo 2 dizia 0,08 s entre palavras enquanto o texto sobe a 0,05 s.

Agora em `Pops` / `comDestaqueForte` (`base.tsx`), nos QUATRO modelos: um pop por
entrada (no modelo 2, por PALAVRA = digitação), os dois arquivos alternando,
destaque no mesmo som mais alto (0,9 × 0,55), **fora do `CameraMotionBlur`**.
**Compensar o ataque do arquivo:** pop_1 só ataca aos 69,7 ms e pop_2 aos 53,6 ms
(de 101 ms totais) — sem descontar isso o som entra 4 quadros depois do gesto.
Medido depois: pops em 2,487 e 5,903 para cues em 2,48 e 5,90.

**O ambiente sumiu da máquina dele** entre 20 e 21/09: Node, ffmpeg e Python não
existiam mais e o PATH do usuário estava com três entradas. Ele mandou eu instalar:
`winget install OpenJS.NodeJS.LTS` (v24.19), `Gyan.FFmpeg` (9.0.1) e
`Python.Python.3.13` + numpy/pillow, todos `--scope user`. Se sumir de novo, é isso.

---

## 14. Lettering: dois a três por vídeo, e quem escolhe sou eu (22/09/2026)

> "independentemente do SRT ou do PDF que eu te mandar, você vai sempre escolher de
> dois a três modelos de Lettering, e espalhar pelo vídeo em momentos que geralmente
> não tem elementos. Na parte do Lettering não precisa seguir a recomendação do PDF."

**Substitui** o "um só" (15/09) e o "até dois" (17/09). Dois no mínimo, três quando
houver vão; modelos sempre diferentes; espalhados, nunca colados. **O dossiê não manda
nesta parte** — no resto (fatos, números, licenças) continua valendo, com a conferência
do §2. Mapear os vãos ANTES de escolher e justificar cada ponto no LEIA-ME.

**Modelos disponíveis: seis.** 1 (três linhas com corte na diagonal) · 2 (pequena em
cima, destaque embaixo) · 3 (sangra pela direita, fonte light) · 4 (escada com duas
amarelas) · 5 (laranja #FF6700, letras acendendo embaralhadas) · 6 (cromado com brilho
varrendo, entrada por desfoque).

**Limites de palavras por modelo** em `LIMITES` (`base.tsx`), cada número tirado da
referência dele — e o destaque é **sempre uma palavra só**.

---

## 15. FLV — "O Flávio real", plano de governo em 9 capítulos (14/10/2026)

Sessão na nuvem (claude.ai/code), repositório `aquilahenrique510-hue/fabio-filho`,
branch `claude/nice-sagan-l5a4w3`. SRT `NIKOLAS_FUNDO_BRANCO_H264_6K_AUDIO_por.srt`
(02:28,10). Código `FLV`, `src/flv/`.

- **Erro de legenda no SRT:** "a Clarear" (cue 111, 00:52,72) é **ClarIA**, a
  assistente do plano. Corrigir na legenda queimada.
- **Card de capítulo** (`FLV-B-Capitulo-1..9`): número 1/9 → 9/9 e nome do eixo
  em chapas amarelas, nas chaves do SRT; vai para o canto como rótulo; barra de
  nove segmentos que enche ao longo do capítulo. Estilo NOVO — mandado em quadros
  para aprovação antes dos masters.
- **"E essa nem eu esperava" PALAVRA POR PALAVRA** — pedido dele: "pode ser
  palavra por palavra". `FLV-L2-EssaNemEu` (`src/flv/PalavraPorPalavra.tsx`),
  herda tudo da `base.tsx` do kit (mola, zoom, deriva, desvanecer, motion blur,
  pop por palavra). "essa nem" é um cue só: o 0,17 s do "nem" é `ritmo`, não onset.
- Letterings sugeridos: modelo 2 "contar o Flávio / REAL" (00:08,84) e modelo 1
  "mas pelo que / CONSEGUE / sustentar" (02:23,58), mais o palavra por palavra.
- **Dossiê em PDF:** o arquivo "LETTERING — o que fazer ANTES de gerar" pediu que o
  checklist de lettering entre no PDF também. Entrou como seção 5.5.

### O KIT DE LETTERING VEIO FURADO
`base.tsx` reexporta `deriva` de `shared/design.ts`, e o `design.ts` do kit **não
tem `deriva`** — o kit não compila. É a mesma armadilha do §3.6 do CLAUDE.md (o
"conferido por grep" que não pegou). Reconstruída linear em `design.ts`, marcada;
trocar pela original quando o design.ts da máquina dele vier.

### Render na nuvem (Linux)
- Navegador: `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell`
  (o Chromium normal não roda o headless antigo).
- `--ignore-certificate-errors`: o proxy da sessão quebra o TLS das Google Fonts.
- Alfa precisa de `--image-format=png` junto com `--pixel-format=yuva444p10le`.
- **Card de capítulo SEM barra de progresso** (14/10/2026, ele circulou a barra
  e pediu "pode tirar"). Saiu dos nove cards e do dossiê; o contador 1/9 → 9/9
  segue sendo quem mostra quanto falta.
