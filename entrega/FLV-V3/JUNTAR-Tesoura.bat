@echo off
rem Junta as partes da FLV-T-Tesoura num .mov so (alfa).
copy /b "FLV-T-Tesoura-alpha.mov.part01"+"FLV-T-Tesoura-alpha.mov.part02"+"FLV-T-Tesoura-alpha.mov.part03" "FLV-T-Tesoura-alpha.mov" >nul && echo OK FLV-T-Tesoura-alpha.mov
echo Pronto. Pode apagar os arquivos .partNN.
pause
