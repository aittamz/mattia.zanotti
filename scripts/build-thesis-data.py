"""Genera le tabelle pubbliche dal clone dell'archivio indicato come argomento."""

import csv
import json
import sys
from collections import Counter
from pathlib import Path

source = Path(sys.argv[1])
target = Path(__file__).resolve().parents[1] / "content" / "thesis-tables.json"


def rows(path, delimiter=","):
    with (source / path).open(encoding="utf-8-sig", newline="") as file:
        return list(csv.DictReader(file, delimiter=delimiter))


def select(path, columns, delimiter=","):
    return [[row[key].strip() for key in columns] for row in rows(path, delimiter)]


italo = "CAPITOLO_5/IMS_ITALO_DISCO/"
trap = "CAPITOLO_5/IMS_TRAP/Dataset_trap_tiktok.csv"
sanremo = "CAPITOLO_6/SANREMO_24/"
altz = "CONCLUSIONI/"
with (source / (italo + "ITALO DISCO_Spotify_Italodisco.net.csv")).open(
    encoding="utf-8-sig", newline=""
) as file:
    comparison = list(csv.reader(file))[2:]

# Le colonne laterali del CSV sono due liste indipendenti. La quarta
# colonna indica se il nome Spotify compare anche su italodisco.net.
both = sum(row[3].strip() == "PRESENTE" for row in comparison)
tables = {
    "italo": [[row[2].strip(), row[3].strip()] for row in comparison if row[2].strip()],
    "italo-source": [[row[0].strip()] for row in comparison if row[0].strip()],
}

# Conteggia ogni co-hashtag una volta per post. Esporta solo i totali.
tags = Counter()
for row in rows(trap):
    names = {tag["name"].strip().casefold() for tag in json.loads(row["hashtags"] or "[]")}
    if "trap" in names:
        tags.update(names - {"trap", ""})
tables["trap"] = [[f"#{tag}", count] for tag, count in sorted(
    tags.items(), key=lambda item: (-item[1], item[0])
)]

# I brani in gara sono i nodi con metriche valorizzate nel foglio SIAE.
tables["festival"] = [
    [label, streams, views]
    for label, streams, views in select(
        sanremo + "SANREMO_generale/Dati_Sanremo24__SIAE_STREAMING_Spotify_yt.csv",
        ("LABEL", "Streaming", "youtube off"),
    )
    if streams or views
]
for phase in ("PRE", "POST"):
    tables[f"sanremo-{phase.lower()}"] = select(
        sanremo + f"SANREMO_Spotify/Playlist_{phase}_Sanremo/Sanremo 2024.csv",
        ("title", "artists", "genres"),
    )

for key, filename, delimiter in (
    ("altz-intro", "Intro to Alt Z_SPOTIFY_playlist.csv", ";"),
    ("altz-sound", "The Sound of Alt Z_SPOTIFY_playlist.csv", ","),
):
    tables[key] = select(altz + filename, ("title", "artists", "genres"), delimiter)

assert both == 36, both
assert all(tables.values())
target.write_text(json.dumps(tables, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
print({name: len(table) for name, table in tables.items()})
