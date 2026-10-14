"""REVISÃO MONTADA do FLV — todas as peças em camadas, nos timecodes do SRT.

Uso: python scripts/revisao_flv.py <pasta dos masters alfa> <fundo.png|bruto.mp4> <saída.mp4>

A revisão é o vídeo MONTADO (CLAUDE.md §1.12), nunca peças soltas em sequência.
Sem o bruto, o fundo é um quadro parado (public/lettering/fundo_exemplo.png) e a
revisão serve para ritmo e colisão entre peças, não para conferir rosto/mãos.
Sai em 540×960 a 30 fps para render rápido: é revisão, não master.
"""
import os
import subprocess
import sys

DURACAO = 148.10

# (início no SRT, arquivo) — na ordem em que empilham: o primeiro fica embaixo
CAMADAS = [
    (0.08, "FLV-A-Boatos-alpha.mov"),
    (8.84, "FLV-L1-Real-alpha.mov"),
    (10.94, "FLV-F-Marcadores-alpha.mov"),
    (10.94, "FLV-K-Documento-alpha.mov"),
    (29.90, "FLV-C-SemMedo-alpha.mov"),
    (36.94, "FLV-L-Pagina15-alpha.mov"),
    (67.08, "FLV-D-Imposto-alpha.mov"),
    (88.00, "FLV-G-Casas-alpha.mov"),
    (100.30, "FLV-H-Cresce-alpha.mov"),
    (106.88, "FLV-E-Trem-alpha.mov"),
    (111.48, "FLV-L2-EssaNemEu-alpha.mov"),
    (113.46, "FLV-M-Pagina58-alpha.mov"),
    (132.60, "FLV-J-Ministerios-alpha.mov"),
    (143.58, "FLV-L3-Consegue-alpha.mov"),
    # cards de capítulo por cima de tudo (rótulo no canto)
    (26.06, "FLV-B-Capitulo-1-alpha.mov"),
    (43.90, "FLV-B-Capitulo-2-alpha.mov"),
    (55.80, "FLV-B-Capitulo-3-alpha.mov"),
    (65.14, "FLV-B-Capitulo-4-alpha.mov"),
    (76.98, "FLV-B-Capitulo-5-alpha.mov"),
    (86.62, "FLV-B-Capitulo-6-alpha.mov"),
    (98.54, "FLV-B-Capitulo-7-alpha.mov"),
    (118.72, "FLV-B-Capitulo-8-alpha.mov"),
    (130.60, "FLV-B-Capitulo-9-alpha.mov"),
]


def main(pasta: str, fundo: str, saida: str) -> None:
    faltam = [a for _, a in CAMADAS if not os.path.exists(os.path.join(pasta, a))]
    if faltam:
        raise SystemExit("faltam masters: " + ", ".join(faltam))
    cmd = ["ffmpeg", "-v", "error", "-y"]
    if fundo.lower().endswith(".png"):
        cmd += ["-loop", "1", "-framerate", "30", "-t", str(DURACAO), "-i", fundo]
    else:
        cmd += ["-t", str(DURACAO), "-i", fundo]
    for _, arq in CAMADAS:
        cmd += ["-i", os.path.join(pasta, arq)]
    filtros = ["[0:v]scale=540:960,fps=30,format=yuv420p[b0]"]
    ultimo = "b0"
    for i, (t, _) in enumerate(CAMADAS, start=1):
        filtros.append(f"[{i}:v]scale=540:960,fps=30,format=yuva420p,setpts=PTS-STARTPTS+{t}/TB[v{i}]")
        filtros.append(f"[{ultimo}][v{i}]overlay=eof_action=pass:format=auto[b{i}]")
        ultimo = f"b{i}"
    cmd += ["-filter_complex", ";".join(filtros), "-map", f"[{ultimo}]",
            "-t", str(DURACAO), "-c:v", "libx264", "-crf", "22", "-preset", "veryfast", saida]
    subprocess.run(cmd, check=True)
    print("OK", saida)


if __name__ == "__main__":
    main(*sys.argv[1:4])
