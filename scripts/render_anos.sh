#!/usr/bin/env bash
# INSERT-Anos (2026 → 2002) na duração do clipe dele, em 23,976 e alfa.
# uso: scripts/render_anos.sh <segundos> <saida-alpha.mov> [segura] [tema]
#  ex.: 18 s a 23,976 = 432 q = 18.018 s · 16 s = 16.016 s · 14s11q = (14*24+11)/23.976 = 14.473 s
set -eu
D=$1; OUT=$2; SEG=${3:-3.2}; TEMA=${4:-alfa}
H=$(ls /opt/pw-browsers/chromium_headless_shell-1194/*/headless_shell 2>/dev/null || echo "")
TMP="${OUT%.mov}_60.mov"
BR=${H:+--browser-executable=$H}
if [ "$TEMA" = alfa ]; then FMT="--prores-profile=4444 --pixel-format=yuva444p10le --image-format=png"; PF=yuva444p10le; PR=4444; else FMT="--prores-profile=hq"; PF=yuv422p10le; PR=hq; fi
for k in 1 2 3; do
  npx remotion render INSERT-Anos "$TMP" --codec=prores $FMT --props="{\"tema\":\"$TEMA\",\"duracao\":$D,\"segura\":$SEG}" \
    --concurrency=2 $BR --ignore-certificate-errors --log=error && break
done
N=$(python3 -c "print(round($D*24000/1001))")
ffmpeg -nostdin -v error -y -i "$TMP" -vf fps=24000/1001 -frames:v $N -c:v prores_ks -profile:v $PR -pix_fmt $PF -qscale:v 8 -vendor apl0 -c:a pcm_s16le -t $D "$OUT"
rm -f "$TMP"
echo "ok $OUT: $(ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_read_frames,r_frame_rate -of csv=p=0 "$OUT") (esperado $N)"
