"""Estrae le figure dal PDF della tesi e prepara due indici Spotify dai GDF.

Uso: python3 scripts/build-thesis-networks.py TESI.pdf CLONE_ARCHIVIO
Dipendenze: PyMuPDF e Pillow. Usare il PDF di 276 pagine usato per la pagina web.
"""

import csv
import json
import re
import sys
from pathlib import Path

import fitz
from PIL import Image

pdf, archive = map(Path, sys.argv[1:])
root = Path(__file__).resolve().parents[1]
out = root / "assets" / "thesis-figures"
out.mkdir(exist_ok=True)

# Numero di pagina nel PDF (1-based), non la numerazione stampata.
# Gli indici sono quelli delle immagini nell'ordine di lettura sulla pagina.
# La Fig. 6.1 include anche la legenda separata, sotto il grafo.
figures = {
    "5.1": (161, (0,)),
    "5.2": (162, (0,)), "5.3": (163, (0,)),
    "5.13": (178, (0,)), "5.14": (179, (0,)),
    "5.15": (179, (1,)), "5.16": (180, (0,)),
    "6.1": (188, (0, 1)), "6.2": (189, (0,)),
    "6.3": (192, (0,)), "6.4": (193, (0,)),
    "6.5": (195, (0,)), "6.6": (197, (0,)),
    "6.25": (229, (0,)), "6.30": (234, (0,)), "6.34": (239, (0,)),
    "7.4": (247, (0,)), "7.7": (249, (0,)),
}
for number, page in enumerate(range(203, 226, 2), start=12):
    figures[f"6.{number}"] = (page, (0,))

with fitz.open(pdf) as doc:
    for figure, (number, indices) in figures.items():
        page = doc[number - 1]
        # Controlla la didascalia prima di ritagliare: un PDF diverso può
        # mantenere il numero totale di pagine cambiando l'impaginazione.
        if not re.search(rf"Figur[ae] {re.escape(figure)}\s*[-–]", " ".join(page.get_text().split())):
            raise ValueError(f"Didascalia della figura {figure} assente alla pagina PDF {number}")
        images = sorted(page.get_image_info(), key=lambda image: image["bbox"][1])
        clip = fitz.Rect(images[indices[0]]["bbox"])
        for index in indices[1:]:
            clip |= fitz.Rect(images[index]["bbox"])
        # Conserva impaginazione, colori e legenda dalla figura discussa nella tesi.
        pixmap = page.get_pixmap(clip=clip, alpha=False)
        Image.frombytes("RGB", (pixmap.width, pixmap.height), pixmap.samples).save(
            out / f"{figure}.webp", quality=92, method=6
        )


def spotify_network(path):
    # GDF contiene due tabelle CSV: fino a edgedef sono artisti, poi coppie di ID.
    # Conserviamo l'orientamento del file, inclusi i legami reciproci.
    lines = path.read_text(encoding="utf-8-sig").splitlines()
    divider = next(i for i, line in enumerate(lines) if line.startswith("edgedef>"))
    artists = list(csv.reader(lines[1:divider]))
    indices = {artist[0]: index for index, artist in enumerate(artists)}
    if len(indices) != len(artists):
        raise ValueError(f"ID artista ripetuti in {path}")
    links = [
        [indices[source], indices[target]]
        for source, target, *_ in csv.reader(lines[divider + 1:])
    ]
    # In pagina servono etichetta e tag. Gli ID originali rimangono nei GDF.
    return {"artists": [[artist[1], artist[4]] for artist in artists], "links": links}


networks = {
    "sfera": spotify_network(archive / "CAPITOLO_5/IMS_TRAP/Sfera_ebbasta_SAN.gdf"),
    "nessa": spotify_network(archive / "CONCLUSIONI/Nessa_Barrett_SAN.gdf"),
}
(root / "content" / "thesis-networks.json").write_text(
    json.dumps(networks, ensure_ascii=False, separators=(",", ":")) + "\n",
    encoding="utf-8",
)
print(f"{len(figures)} figure; reti Spotify: " + ", ".join(
    f"{key}: {len(value['artists'])} nodi, {len(value['links'])} archi"
    for key, value in networks.items()
))
