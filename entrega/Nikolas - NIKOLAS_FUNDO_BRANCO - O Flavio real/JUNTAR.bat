@echo off
rem Remonta os masters que foram ao GitHub em pedacos de 95 MB.
rem Rode dentro desta pasta. Os .mov saem identicos (SHA-256 em SHA256.txt).

copy /b "FLV-A-Boatos-alpha.mov.part01"+"FLV-A-Boatos-alpha.mov.part02"+"FLV-A-Boatos-alpha.mov.part03" "FLV-A-Boatos-alpha.mov" >nul && echo OK FLV-A-Boatos-alpha.mov
copy /b "FLV-B-Capitulo-7-alpha.mov.part01"+"FLV-B-Capitulo-7-alpha.mov.part02" "FLV-B-Capitulo-7-alpha.mov" >nul && echo OK FLV-B-Capitulo-7-alpha.mov
copy /b "FLV-B-Capitulo-8-alpha.mov.part01"+"FLV-B-Capitulo-8-alpha.mov.part02" "FLV-B-Capitulo-8-alpha.mov" >nul && echo OK FLV-B-Capitulo-8-alpha.mov
copy /b "FLV-E-Trem-alpha.mov.part01"+"FLV-E-Trem-alpha.mov.part02" "FLV-E-Trem-alpha.mov" >nul && echo OK FLV-E-Trem-alpha.mov
copy /b "FLV-F-Marcadores-alpha.mov.part01"+"FLV-F-Marcadores-alpha.mov.part02"+"FLV-F-Marcadores-alpha.mov.part03"+"FLV-F-Marcadores-alpha.mov.part04" "FLV-F-Marcadores-alpha.mov" >nul && echo OK FLV-F-Marcadores-alpha.mov
copy /b "FLV-H-Cresce-alpha.mov.part01"+"FLV-H-Cresce-alpha.mov.part02" "FLV-H-Cresce-alpha.mov" >nul && echo OK FLV-H-Cresce-alpha.mov
copy /b "FLV-K-Documento-alpha.mov.part01"+"FLV-K-Documento-alpha.mov.part02"+"FLV-K-Documento-alpha.mov.part03"+"FLV-K-Documento-alpha.mov.part04"+"FLV-K-Documento-alpha.mov.part05"+"FLV-K-Documento-alpha.mov.part06"+"FLV-K-Documento-alpha.mov.part07"+"FLV-K-Documento-alpha.mov.part08"+"FLV-K-Documento-alpha.mov.part09"+"FLV-K-Documento-alpha.mov.part10"+"FLV-K-Documento-alpha.mov.part11"+"FLV-K-Documento-alpha.mov.part12"+"FLV-K-Documento-alpha.mov.part13"+"FLV-K-Documento-alpha.mov.part14"+"FLV-K-Documento-alpha.mov.part15"+"FLV-K-Documento-alpha.mov.part16"+"FLV-K-Documento-alpha.mov.part17" "FLV-K-Documento-alpha.mov" >nul && echo OK FLV-K-Documento-alpha.mov
copy /b "FLV-L-Pagina15-alpha.mov.part01"+"FLV-L-Pagina15-alpha.mov.part02"+"FLV-L-Pagina15-alpha.mov.part03"+"FLV-L-Pagina15-alpha.mov.part04"+"FLV-L-Pagina15-alpha.mov.part05" "FLV-L-Pagina15-alpha.mov" >nul && echo OK FLV-L-Pagina15-alpha.mov
copy /b "FLV-M-Pagina58-alpha.mov.part01"+"FLV-M-Pagina58-alpha.mov.part02"+"FLV-M-Pagina58-alpha.mov.part03"+"FLV-M-Pagina58-alpha.mov.part04" "FLV-M-Pagina58-alpha.mov" >nul && echo OK FLV-M-Pagina58-alpha.mov

echo.
echo Pronto. Pode apagar os arquivos .partNN.
pause
