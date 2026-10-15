@echo off
chcp 65001 >nul
rem Junta as peças que vieram em partes (arquivo > 100 MB no GitHub).
copy /b "BAH-B-LEM-Votos-alpha.mov.part01"+"BAH-B-LEM-Votos-alpha.mov.part02"+"BAH-B-LEM-Votos-alpha.mov.part03" "BAH-B-LEM-Votos-alpha.mov" >nul && echo OK BAH-B-LEM-Votos-alpha.mov
copy /b "BAH-C-LEM-Numeros-alpha.mov.part01"+"BAH-C-LEM-Numeros-alpha.mov.part02" "BAH-C-LEM-Numeros-alpha.mov" >nul && echo OK BAH-C-LEM-Numeros-alpha.mov
copy /b "BAH-J-Renda-alpha.mov.part01"+"BAH-J-Renda-alpha.mov.part02" "BAH-J-Renda-alpha.mov" >nul && echo OK BAH-J-Renda-alpha.mov
copy /b "BAH-L-Educacao-alpha.mov.part01"+"BAH-L-Educacao-alpha.mov.part02" "BAH-L-Educacao-alpha.mov" >nul && echo OK BAH-L-Educacao-alpha.mov
copy /b "BAH-N-Campo-alpha.mov.part01"+"BAH-N-Campo-alpha.mov.part02" "BAH-N-Campo-alpha.mov" >nul && echo OK BAH-N-Campo-alpha.mov
echo.
echo Pronto. Pode apagar os arquivos .partNN.
pause
