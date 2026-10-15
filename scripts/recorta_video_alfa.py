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
    # bolsões de fundo FECHADOS (entre braço, corpo e tribuna): o preenchimento de buracos
    # os engolia. Se o fundo é chapado, o que o modelo marcou como fundo E tem a cor do
    # fundo sai — a faixa verde fica porque o modelo a marca como corpo.
    cantos = np.concatenate([rgb[:30, :30].reshape(-1, 3), rgb[:30, -30:].reshape(-1, 3)])
    if cantos.std(0).max() < 12:
        perto_fundo = np.abs(rgb - np.median(cantos, 0)).sum(2) < 60
        # verde legítimo (faixa, gravata, broche) encosta no AMARELO; bolsão de fundo não.
        # 1) o fundo "de fora" (ligado à borda do quadro) é separado primeiro, sem
        #    atravessar a faixa — onde o modelo diz corpo (a >= 0.5) ele não passa;
        # 2) cada mancha verde que sobra DENTRO do recorte fica só se a maior parte dela
        #    está colada ao amarelo; o resto é fundo preso entre braço, corpo e tribuna.
        amarelo = (r > 190) & (g > 140) & (b < 110) & (r - b > 90)
        perto_am = ndimage.distance_transform_edt(~amarelo) < 34
        lab, k = ndimage.label(perto_fundo & ~(a >= 0.5))
        borda_ids = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))
        de_fora = np.isin(lab, borda_ids[borda_ids > 0])
        dentro = perto_fundo & ~de_fora
        lab, k = ndimage.label(dentro)
        bolsao = np.zeros_like(dentro)
        if k:
            idx = np.arange(1, k + 1)
            tam = ndimage.sum(np.ones(lab.shape), lab, idx)
            cola = ndimage.sum(perto_am, lab, idx)
            bolsao = np.isin(lab, idx[(cola / np.maximum(tam, 1)) < 0.5])
        bolsao |= de_fora
        bolsao = ndimage.binary_dilation(bolsao, iterations=2) & ndimage.binary_dilation(perto_fundo, iterations=1)
        corpo &= ~bolsao
        trib &= ~bolsao
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
    # TODO pixel não-sólido (inclusive os 100% transparentes) leva a cor do boneco mais
    # próximo: nada da cor do fundo fica guardado por baixo do alfa. Se o programa ler o
    # alfa mal (Premiere com alfa de 8 bits mostrou o verde LISTRADO), não aparece fundo.
    borda = ~miolo
    rgb = np.where(borda[..., None], rgb[iy, ix], rgb)
    Image.fromarray(np.dstack([rgb, alfa * 255]).astype(np.uint8), 'RGBA').save(f'{dst}/{n}')
print('ok', len(nomes))
