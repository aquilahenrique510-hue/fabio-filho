#!/usr/bin/env bash
# Renderiza os masters ALFA de todas as peças do FLV (Linux/nuvem).
# Uso: scripts/render_flv.sh <pasta de saída> [tema]
# tema: alfa (padrão) | claro | escuro
set -euo pipefail
OUT="${1:?pasta de saída}"
TEMA="${2:-alfa}"
mkdir -p "$OUT"
BUILD="$OUT/_build"
H=$(ls /opt/pw-browsers/chromium_headless_shell-1194/*/headless_shell)
COMUM=(--browser-executable="$H" --ignore-certificate-errors --log=error)

npx remotion bundle src/index.ts --out-dir="$BUILD" --log=error

render() { # id arquivo props
	local id="$1" arq="$2" props="$3"
	if [ "$TEMA" = alfa ]; then
		npx remotion render "$BUILD" "$id" "$OUT/$arq-alpha.mov" --codec=prores --prores-profile=4444 \
			--pixel-format=yuva444p10le --image-format=png --props="$props" "${COMUM[@]}"
	else
		npx remotion render "$BUILD" "$id" "$OUT/$arq-$TEMA.mov" --codec=prores --prores-profile=hq \
			--props="$props" "${COMUM[@]}"
	fi
	echo "OK $arq"
}

for id in FLV-A-Boatos FLV-K-Documento FLV-F-Marcadores FLV-C-SemMedo FLV-L-Pagina15 FLV-D-Imposto \
	FLV-G-Casas FLV-H-Cresce FLV-E-Trem FLV-M-Pagina58 FLV-J-Ministerios; do
	render "$id" "$id" "{\"tema\":\"$TEMA\"}"
done
for n in 1 2 3 4 5 6 7 8 9; do
	render "FLV-B-Capitulo-$n" "FLV-B-Capitulo-$n" "{\"n\":$n,\"tema\":\"$TEMA\"}"
done
if [ "$TEMA" = alfa ]; then
	render FLV-L2-EssaNemEu FLV-L2-EssaNemEu '{}'
	render LETTER-Modelo2 FLV-L1-Real '{"pequena":"contar o Flávio","destaque":"REAL"}'
	render LETTER-Modelo1 FLV-L3-Consegue '{"linha1":"mas pelo que","linha2":"CONSEGUE","linha3":"sustentar"}'
fi
echo FIM
