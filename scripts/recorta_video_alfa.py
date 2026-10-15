# Recorta o boneco + tribuna de cada quadro e limpa as bordas.
import sys, os, numpy as np
from PIL import Image
from scipy import ndimage
from rembg import new_session, remove
src, dst = sys.argv[1], sys.argv[2]
nomes = sys.argv[3:] or sorted(os.listdir(src))
ses = new_session(os.environ.get('MODELO', 'isnet-general-use'))

def maior(m):
    lab, k = ndimage.label(m)
    if not k: return m
    tam = ndimage.sum(np.ones(m.shape), lab, range(1, k + 1))
    return lab == (1 + int(np.argmax(tam)))

for n in nomes:
    im = Image.open(f'{src}/{n}').convert('RGB')
    rgb = np.asarray(im).astype(np.float32)
    H, W, _ = rgb.shape
    a = np.asarray(remove(im, session=ses, only_mask=True)).astype(np.float32) / 255
    # --- tampo da tribuna: a linha onde o marrom ocupa a largura toda
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    mx, mn = rgb.max(2), rgb.min(2)
    sat = (mx - mn) / np.maximum(mx, 1)
    marrom = (r > g) & (g > b) & (sat > 0.3) & (mx > 60)
    linhas = marrom.mean(1)
    topo = int(np.argmax(linhas > 0.45)) if (linhas > 0.45).any() else H
    # --- embaixo do tampo: a tribuna pela cor (marrom, selo amarelo, "?" preto lá dentro)
    trib = (sat > 0.28) & (mx > 50) & (r >= g)  # r >= g: não pega fundo verde
    trib[:topo - 2] = False
    trib = ndimage.binary_opening(trib, iterations=3)
    trib = maior(trib)
    trib = ndimage.binary_fill_holes(trib)
    # --- em cima: o recorte do modelo, sem pontes finas, só o bloco dele
    cima = a > 0.5
    cima[topo + 6:] = False
    # pele longe do centro = mão de fotógrafo (rosto e mãos dele ficam no meio)
    pele = (r > 140) & (r > g) & (g > b) & (r - b > 40) & (sat > 0.15) & (sat < 0.65)
    xs = np.abs(np.arange(W)[None, :] - W / 2) > 0.27 * W
    cima &= ~ndimage.binary_dilation(pele & xs, iterations=6)
    cima = ndimage.binary_opening(cima, iterations=4)
    cima = maior(cima | trib)
    corpo = ndimage.binary_fill_holes(cima) & ~(np.arange(H)[:, None] >= topo + 6)
    dur = corpo | trib
    # alfa: duro no miolo, a borda suave vem do modelo em cima e de um desfoque leve
    alfa = np.where(corpo, np.maximum(a, ndimage.binary_erosion(corpo, iterations=2)), 0).astype(np.float32)
    alfa = np.maximum(alfa, trib.astype(np.float32))
    alfa = np.where(ndimage.binary_dilation(dur, iterations=2), alfa, 0)
    alfa = ndimage.grey_erosion(alfa, size=(3, 3))
    alfa = ndimage.gaussian_filter(alfa, 0.9)
    alfa = np.clip((alfa - 0.1) / 0.8, 0, 1)
    # cor da borda puxada do miolo (sem halo do fundo)
    miolo = alfa > 0.97
    _, (iy, ix) = ndimage.distance_transform_edt(~miolo, return_indices=True)
    borda = (alfa > 0) & ~miolo
    rgb = np.where(borda[..., None], rgb[iy, ix], rgb)
    Image.fromarray(np.dstack([rgb, alfa * 255]).astype(np.uint8), 'RGBA').save(f'{dst}/{n}')
print('ok', len(nomes))
