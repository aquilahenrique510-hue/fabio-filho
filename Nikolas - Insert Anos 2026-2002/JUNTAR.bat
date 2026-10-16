@echo off
chcp 65001 >nul
rem Junta o INSERT-Anos (passou de 100 MB e veio em 2 partes).
cd /d "%~dp0"
copy /b "INSERT-Anos-alpha.mov.part01"+"INSERT-Anos-alpha.mov.part02"+"INSERT-Anos-alpha.mov.part03" "INSERT-Anos-alpha.mov" >nul && echo OK INSERT-Anos-alpha.mov
echo.
echo Pronto. Pode apagar os arquivos .part.
pause
