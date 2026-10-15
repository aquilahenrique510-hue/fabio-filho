@echo off
chcp 65001 >nul
rem Junta a peca B, que passou de 100 MB e veio em 2 partes.
cd /d "%~dp0"
copy /b "BAH-B-LEM-Votos-alpha.mov.part01"+"BAH-B-LEM-Votos-alpha.mov.part02" "BAH-B-LEM-Votos-alpha.mov" >nul && echo OK BAH-B-LEM-Votos-alpha.mov
echo.
echo Pronto. Pode apagar os dois arquivos .part.
pause
