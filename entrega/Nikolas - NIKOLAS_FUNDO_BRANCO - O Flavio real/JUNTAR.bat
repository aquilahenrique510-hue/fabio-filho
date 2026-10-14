@echo off
chcp 65001 >nul
rem ===========================================================================
rem  JUNTA TUDO NUMA PASTA SO: MASTERS
rem  - os .mov inteiros sao MOVIDOS para MASTERS
rem  - os .mov que vieram em pedacos sao REMONTADOS dentro de MASTERS
rem  Inclui os 2 que ja foram pelo chat (FLV-L1-Real e FLV-J-Ministerios).
rem  Rode dentro desta pasta (dois cliques).
rem ===========================================================================
if not exist "MASTERS" mkdir "MASTERS"

if exist "FLV-B-Capitulo-1-alpha.mov" move /y "FLV-B-Capitulo-1-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-1-alpha.mov
if exist "FLV-B-Capitulo-2-alpha.mov" move /y "FLV-B-Capitulo-2-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-2-alpha.mov
if exist "FLV-B-Capitulo-3-alpha.mov" move /y "FLV-B-Capitulo-3-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-3-alpha.mov
if exist "FLV-B-Capitulo-4-alpha.mov" move /y "FLV-B-Capitulo-4-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-4-alpha.mov
if exist "FLV-B-Capitulo-5-alpha.mov" move /y "FLV-B-Capitulo-5-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-5-alpha.mov
if exist "FLV-B-Capitulo-6-alpha.mov" move /y "FLV-B-Capitulo-6-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-6-alpha.mov
if exist "FLV-B-Capitulo-9-alpha.mov" move /y "FLV-B-Capitulo-9-alpha.mov" "MASTERS\" >nul && echo OK FLV-B-Capitulo-9-alpha.mov
if exist "FLV-C-SemMedo-alpha.mov" move /y "FLV-C-SemMedo-alpha.mov" "MASTERS\" >nul && echo OK FLV-C-SemMedo-alpha.mov
if exist "FLV-D-Imposto-alpha.mov" move /y "FLV-D-Imposto-alpha.mov" "MASTERS\" >nul && echo OK FLV-D-Imposto-alpha.mov
if exist "FLV-G-Casas-alpha.mov" move /y "FLV-G-Casas-alpha.mov" "MASTERS\" >nul && echo OK FLV-G-Casas-alpha.mov
if exist "FLV-J-Ministerios-alpha.mov" move /y "FLV-J-Ministerios-alpha.mov" "MASTERS\" >nul && echo OK FLV-J-Ministerios-alpha.mov
if exist "FLV-L1-Real-alpha.mov" move /y "FLV-L1-Real-alpha.mov" "MASTERS\" >nul && echo OK FLV-L1-Real-alpha.mov
if exist "FLV-L2-EssaNemEu-alpha.mov" move /y "FLV-L2-EssaNemEu-alpha.mov" "MASTERS\" >nul && echo OK FLV-L2-EssaNemEu-alpha.mov
if exist "FLV-L3-Consegue-alpha.mov" move /y "FLV-L3-Consegue-alpha.mov" "MASTERS\" >nul && echo OK FLV-L3-Consegue-alpha.mov

copy /b "FLV-A-Boatos-alpha.mov.part01"+"FLV-A-Boatos-alpha.mov.part02"+"FLV-A-Boatos-alpha.mov.part03" "MASTERS\FLV-A-Boatos-alpha.mov" >nul && echo OK FLV-A-Boatos-alpha.mov
copy /b "FLV-B-Capitulo-7-alpha.mov.part01"+"FLV-B-Capitulo-7-alpha.mov.part02" "MASTERS\FLV-B-Capitulo-7-alpha.mov" >nul && echo OK FLV-B-Capitulo-7-alpha.mov
copy /b "FLV-B-Capitulo-8-alpha.mov.part01"+"FLV-B-Capitulo-8-alpha.mov.part02" "MASTERS\FLV-B-Capitulo-8-alpha.mov" >nul && echo OK FLV-B-Capitulo-8-alpha.mov
copy /b "FLV-E-Trem-alpha.mov.part01"+"FLV-E-Trem-alpha.mov.part02" "MASTERS\FLV-E-Trem-alpha.mov" >nul && echo OK FLV-E-Trem-alpha.mov
copy /b "FLV-F-Marcadores-alpha.mov.part01"+"FLV-F-Marcadores-alpha.mov.part02"+"FLV-F-Marcadores-alpha.mov.part03"+"FLV-F-Marcadores-alpha.mov.part04" "MASTERS\FLV-F-Marcadores-alpha.mov" >nul && echo OK FLV-F-Marcadores-alpha.mov
copy /b "FLV-H-Cresce-alpha.mov.part01"+"FLV-H-Cresce-alpha.mov.part02" "MASTERS\FLV-H-Cresce-alpha.mov" >nul && echo OK FLV-H-Cresce-alpha.mov
copy /b "FLV-K-Documento-alpha.mov.part01"+"FLV-K-Documento-alpha.mov.part02"+"FLV-K-Documento-alpha.mov.part03"+"FLV-K-Documento-alpha.mov.part04"+"FLV-K-Documento-alpha.mov.part05"+"FLV-K-Documento-alpha.mov.part06"+"FLV-K-Documento-alpha.mov.part07"+"FLV-K-Documento-alpha.mov.part08"+"FLV-K-Documento-alpha.mov.part09"+"FLV-K-Documento-alpha.mov.part10"+"FLV-K-Documento-alpha.mov.part11"+"FLV-K-Documento-alpha.mov.part12"+"FLV-K-Documento-alpha.mov.part13"+"FLV-K-Documento-alpha.mov.part14"+"FLV-K-Documento-alpha.mov.part15"+"FLV-K-Documento-alpha.mov.part16"+"FLV-K-Documento-alpha.mov.part17" "MASTERS\FLV-K-Documento-alpha.mov" >nul && echo OK FLV-K-Documento-alpha.mov
copy /b "FLV-L-Pagina15-alpha.mov.part01"+"FLV-L-Pagina15-alpha.mov.part02"+"FLV-L-Pagina15-alpha.mov.part03"+"FLV-L-Pagina15-alpha.mov.part04"+"FLV-L-Pagina15-alpha.mov.part05" "MASTERS\FLV-L-Pagina15-alpha.mov" >nul && echo OK FLV-L-Pagina15-alpha.mov
copy /b "FLV-M-Pagina58-alpha.mov.part01"+"FLV-M-Pagina58-alpha.mov.part02"+"FLV-M-Pagina58-alpha.mov.part03"+"FLV-M-Pagina58-alpha.mov.part04" "MASTERS\FLV-M-Pagina58-alpha.mov" >nul && echo OK FLV-M-Pagina58-alpha.mov

if exist "FLV_REVISAO_montada.mp4" move /y "FLV_REVISAO_montada.mp4" "MASTERS\" >nul

echo.
echo Pronto: 23 masters em MASTERS.
echo Confira com SHA256.txt se quiser. Os arquivos .partNN podem ser apagados.
pause
