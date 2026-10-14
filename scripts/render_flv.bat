@echo off
rem ============================================================================
rem  Renderiza os masters ALFA do FLV ("O Flavio real") na maquina do Aquila.
rem  Uso, dentro da pasta do projeto:   scripts\render_flv.bat
rem  Saida em C:\render\FLV (renderizar no C:, copiar so o final para o E:).
rem  Depois:  python scripts\confere_alfa.py C:\render\FLV
rem ============================================================================
setlocal
set OUT=C:\render\FLV
if not exist "%OUT%" mkdir "%OUT%"
set ALFA=--codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png

call npx remotion bundle src/index.ts --out-dir="%OUT%\_build" || goto :erro
set B=%OUT%\_build

for %%P in (FLV-A-Boatos FLV-K-Documento FLV-F-Marcadores FLV-C-SemMedo FLV-L-Pagina15 FLV-D-Imposto FLV-G-Casas FLV-H-Cresce FLV-E-Trem FLV-M-Pagina58 FLV-J-Ministerios) do (
  call npx remotion render "%B%" %%P "%OUT%\%%P-alpha.mov" %ALFA% --props="{\"tema\":\"alfa\"}" || goto :erro
)
for %%N in (1 2 3 4 5 6 7 8 9) do (
  call npx remotion render "%B%" FLV-B-Capitulo-%%N "%OUT%\FLV-B-Capitulo-%%N-alpha.mov" %ALFA% --props="{\"n\":%%N,\"tema\":\"alfa\"}" || goto :erro
)
call npx remotion render "%B%" FLV-L2-EssaNemEu "%OUT%\FLV-L2-EssaNemEu-alpha.mov" %ALFA% || goto :erro
call npx remotion render "%B%" LETTER-Modelo2 "%OUT%\FLV-L1-Real-alpha.mov" %ALFA% --props="{\"pequena\":\"contar o Flávio\",\"destaque\":\"REAL\",\"duracao\":2.1}" || goto :erro
call npx remotion render "%B%" LETTER-Modelo1 "%OUT%\FLV-L3-Consegue-alpha.mov" %ALFA% --props="{\"linha1\":\"mas pelo que\",\"linha2\":\"CONSEGUE\",\"linha3\":\"sustentar\",\"duracao\":4.5}" || goto :erro

echo.
echo FIM - masters em %OUT%
goto :eof

:erro
echo.
echo FALHOU - veja a mensagem acima. Erro "Timed out ... connect to the browser": so repetir.
exit /b 1
