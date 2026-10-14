"""Mede no PDF as caixas de uma frase, linha a linha, para o marca-texto.

Uso: python scripts/caixas_pdf.py <pdf> <pagina> "<frase>" [dpi]
Saída: JSON com a largura/altura da página em px e uma caixa por linha que a
frase ocupa, em px no dpi pedido (padrão 200, o mesmo do Papel3D).

Substitui o PyMuPDF (`page.search_for`) quando ele não está instalado: lê as
palavras com `pdftotext -bbox-layout`, acha a sequência de palavras da frase
(ignorando caixa e pontuação colada) e agrupa por linha.
"""
import json
import re
import subprocess
import sys
import xml.etree.ElementTree as ET


def norm(p: str) -> str:
    return re.sub(r"[^\wÀ-ÿ%]", "", p.lower())


def caixas(pdf: str, pagina: int, frase: str, dpi: int = 200):
    xml = subprocess.run(
        ["pdftotext", "-bbox-layout", "-f", str(pagina), "-l", str(pagina), pdf, "-"],
        capture_output=True, text=True, check=True,
    ).stdout
    xml = re.sub(r"<!DOCTYPE[^>]*>", "", xml)
    xml = xml.replace('xmlns="http://www.w3.org/1999/xhtml"', "")
    raiz = ET.fromstring(xml)
    pag = raiz.find(".//page")
    k = dpi / 72
    W, H = float(pag.get("width")) * k, float(pag.get("height")) * k
    palavras = []
    for li, linha in enumerate(pag.iter("line")):
        for w in linha.iter("word"):
            palavras.append({
                "t": norm(w.text or ""), "linha": li,
                "x0": float(w.get("xMin")) * k, "y0": float(w.get("yMin")) * k,
                "x1": float(w.get("xMax")) * k, "y1": float(w.get("yMax")) * k,
            })
    alvo = [norm(p) for p in frase.split() if norm(p)]
    for i in range(len(palavras) - len(alvo) + 1):
        if all(palavras[i + j]["t"] == alvo[j] for j in range(len(alvo))):
            achadas = palavras[i:i + len(alvo)]
            break
    else:
        raise SystemExit(f"frase não encontrada na página {pagina}: {frase!r}")
    linhas = {}
    for p in achadas:
        c = linhas.setdefault(p["linha"], [p["x0"], p["y0"], p["x1"], p["y1"]])
        c[0], c[1] = min(c[0], p["x0"]), min(c[1], p["y0"])
        c[2], c[3] = max(c[2], p["x1"]), max(c[3], p["y1"])
    return {
        "pagina": pagina, "dpi": dpi, "largura": round(W), "altura": round(H),
        "frase": frase,
        "caixas": [[round(v, 1) for v in c] for _, c in sorted(linhas.items())],
    }


if __name__ == "__main__":
    pdf, pagina, frase = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    dpi = int(sys.argv[4]) if len(sys.argv) > 4 else 200
    print(json.dumps(caixas(pdf, pagina, frase, dpi), ensure_ascii=False))
