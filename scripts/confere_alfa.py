"""Conferência dos masters ALFA (CLAUDE.md §3.5, a parte que vale para o alfa).

Uso: python scripts/confere_alfa.py <pasta> [padrão do nome, ex.: "FLV-*-alpha.mov"]

Para cada arquivo: conta quadros de verdade (nb_read_frames), decodifica
inteiro, mede o canal alfa no primeiro, no do meio e no último quadro, e mede o
pico do áudio quando há trilha. Falha alto (sai com código 1) se:
  · o decode reclamar de qualquer coisa
  · o primeiro ou o último quadro tiver alfa > 8 (não fechou / nasceu do nada)
  · o quadro do meio estiver vazio (master sem conteúdo)
  · houver trilha de áudio com pico abaixo de -6 dB (som que não se ouve)
Não julga momento nem estética: a revisão montada continua obrigatória.
"""
import glob
import io
import os
import re
import subprocess
import sys

from PIL import Image


def roda(cmd):
    return subprocess.run(cmd, capture_output=True, text=False)


def quadros(arq):
    r = roda(["ffprobe", "-v", "error", "-count_frames", "-select_streams", "v:0",
              "-show_entries", "stream=nb_read_frames", "-of", "csv=p=0", arq])
    return int(r.stdout.decode().strip().strip(","))


def alfa_max(arq, n):
    r = roda(["ffmpeg", "-v", "error", "-i", arq, "-vf", f"select=eq(n\\,{n})", "-frames:v", "1",
              "-pix_fmt", "rgba", "-f", "image2pipe", "-vcodec", "png", "-"])
    im = Image.open(io.BytesIO(r.stdout))
    return im.split()[3].getextrema()[1]


def pico_audio(arq):
    tem = roda(["ffprobe", "-v", "error", "-select_streams", "a", "-show_entries", "stream=index",
                "-of", "csv=p=0", arq]).stdout.strip()
    if not tem:
        return None
    r = roda(["ffmpeg", "-hide_banner", "-i", arq, "-vn", "-af", "volumedetect", "-f", "null", "-"])
    m = re.search(r"max_volume: (-?[\d.]+) dB", r.stderr.decode())
    return float(m.group(1)) if m else None


def main(pasta, padrao="*-alpha.mov"):
    falhas = 0
    for arq in sorted(glob.glob(os.path.join(pasta, padrao))):
        nome = os.path.basename(arq)
        erros = []
        dec = roda(["ffmpeg", "-v", "error", "-i", arq, "-f", "null", "-"]).stderr.decode().strip()
        if dec:
            erros.append("decode: " + dec.splitlines()[0])
        n = quadros(arq)
        a0, am, a1 = alfa_max(arq, 0), alfa_max(arq, n // 2), alfa_max(arq, n - 1)
        if a0 > 8:
            erros.append(f"primeiro quadro com alfa {a0}")
        if a1 > 8:
            erros.append(f"último quadro com alfa {a1} (saída não fecha)")
        if am < 40:
            erros.append(f"miolo vazio (alfa {am})")
        pico = pico_audio(arq)
        if pico is not None and pico < -6:
            erros.append(f"som baixo demais: pico {pico} dB")
        som = "sem áudio" if pico is None else f"pico {pico} dB"
        print(f"{'FALHA' if erros else 'ok   '} {nome}: {n} quadros · alfa {a0}/{am}/{a1} · {som}"
              + ("".join(f"\n        - {e}" for e in erros)))
        falhas += bool(erros)
    if falhas:
        raise SystemExit(f"{falhas} master(s) reprovado(s)")


if __name__ == "__main__":
    main(*sys.argv[1:3])
