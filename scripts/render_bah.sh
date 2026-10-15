#!/usr/bin/env bash
# Renderiza as peças do NK na Bahia em alfa (ProRes 4444, alfa 16 bits) e recomprime.
# uso: scripts/render_bah.sh <bundle> <saida> [ids...]
set -u
B=$1; OUT=$2; shift 2
H=$(ls /opt/pw-browsers/chromium_headless_shell-1194/*/headless_shell)
IDS=${@:-$(grep -o "id: 'BAH-[^']*'" src/bah/pecas.tsx | cut -d"'" -f2)}
mkdir -p "$OUT"
for id in $IDS; do
  [ -f "$OUT/$id-alpha.mov" ] && { echo "já existe $id"; continue; }
  props='{"tema":"alfa"}'
  comp=$id
  case $id in
    BAH-L1-Trabalho) comp=LETTER-Modelo2; props='{"pequena":"o segredo é simples,","destaque":"TRABALHO"}';;
    BAH-L2-Acredite) comp=LETTER-Modelo3; props='{"antes":"Acredite na","destaque":"BAHIA","depois":"acredite no baiano"}';;
    BAH-L3-Aqui) comp=LETTER-Modelo6; props='{"cima":"ela está","destaque":"AQUI","baixo":"na Bahia"}';;
  esac
  ok=0
  for k in 1 2 3; do
    npx remotion render "$B" $comp "$OUT/_raw.mov" --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le \
      --image-format=png --props="$props" --concurrency=3 --browser-executable=$H --ignore-certificate-errors --log=error && { ok=1; break; }
  done
  [ $ok = 1 ] || { echo "FALHOU $id"; continue; }
  ffmpeg -nostdin -v error -y -i "$OUT/_raw.mov" -map 0 -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le -qscale:v 8 -vendor apl0 -c:a copy "$OUT/$id-alpha.mov" && rm -f "$OUT/_raw.mov"
  echo "ok $id $(du -h "$OUT/$id-alpha.mov" | cut -f1)"
done
