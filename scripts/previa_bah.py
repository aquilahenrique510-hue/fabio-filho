"""Prévia montada do NK na Bahia: todas as peças alfa nos timecodes do SRT, sobre um
fundo neutro, com o SFX de cada uma. Uso: python scripts/previa_bah.py <pasta-dos-mov> <saida.mp4>"""
import subprocess
import sys

PASTA, SAIDA = sys.argv[1], sys.argv[2]
FUNDO = 'public/lettering/fundo_exemplo.png'
DUR = 111.6
PECAS = [
    ('BAH-A-Abertura', 0.28), ('BAH-B-LEM-Votos', 7.44), ('BAH-C-LEM-Numeros', 19.08), ('BAH-D-Agro', 26.5),
    ('BAH-E-Empresas', 30.44), ('BAH-F-MelhorCidade', 37.9), ('BAH-L1-Trabalho', 41.64), ('BAH-G1-Mortes', 44.22),
    ('BAH-G2-DezCidades', 47.44), ('BAH-G3-Faccoes', 50.48), ('BAH-H-Porta', 53.08), ('BAH-I-Emprego', 58.7),
    ('BAH-J-Renda', 62.14), ('BAH-K-Desnutricao', 66.54), ('BAH-L-Educacao', 69.6), ('BAH-M-Tres', 78.38),
    ('BAH-N-Campo', 82.48), ('BAH-L2-Acredite', 92.3), ('BAH-L3-Aqui', 107.02), ('BAH-O-Fecho', 108.6),
]
cmd = ['ffmpeg', '-nostdin', '-v', 'error', '-y', '-loop', '1', '-framerate', '30', '-t', str(DUR), '-i', FUNDO]
for nome, t in PECAS:
    cmd += ['-itsoffset', str(t), '-i', f'{PASTA}/{nome}-alpha.mov']
fc = ['[0:v]scale=1080:1920,format=yuva420p[b0]']
ultimo = 'b0'
for i, (nome, t) in enumerate(PECAS, start=1):
    fc.append(f'[{ultimo}][{i}:v]overlay=eof_action=pass:format=auto[b{i}]')
    ultimo = f'b{i}'
fc.append(f'[{ultimo}]scale=540:960,format=yuv420p[v]')
fc.append(''.join(f'[{i}:a]' for i in range(1, len(PECAS) + 1)) + f'amix=inputs={len(PECAS)}:normalize=0:dropout_transition=0[a]')
cmd += ['-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]', '-t', str(DUR), '-r', '30',
        '-c:v', 'libx264', '-crf', '24', '-preset', 'veryfast', '-c:a', 'aac', '-b:a', '160k', SAIDA]
r = subprocess.run(cmd)
sys.exit(r.returncode)
