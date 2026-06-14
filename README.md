# Kilometer für den Kopf

Dokumentationswebseite einer mehrtägigen Fahrradreise durch die Alpen –  
von Gmund am Tegernsee bis Varenna am Comer See.

🌐 **[kilometer-fuer-den-kopf.de](https://kilometer-fuer-den-kopf.de)**

---

## Projektstruktur

```
.
├── index.html          ← Hauptseite (muss im Root bleiben!)
├── CNAME               ← Custom Domain für GitHub Pages (nicht verschieben!)
├── robots.txt          ← Google muss das im Root finden (nicht verschieben!)
├── sitemap.xml         ← Google muss das im Root finden (nicht verschieben!)
│
├── css/
│   └── style.css       ← Globales Styling
│
├── js/
│   ├── route.js        ← Etappen-Fortschritt (DONE-Variable hier ändern)
│   ├── karte.js        ← Leaflet-Karte mit GPX-Route
│   ├── route_data.js   ← GPX-Koordinaten (automatisch generiert)
│   └── lightbox.js     ← Galerie-Lightbox
│
├── frontend/
│   ├── ausruestung.html
│   ├── ausruestung-fahrrad.html
│   ├── ausruestung-camping.html
│   ├── ausruestung-kleidung.html
│   ├── ausruestung-technik.html
│   ├── ausruestung-werkzeug.html
│   ├── ausruestung-verpflegung.html
│   ├── ausruestung-erstehilfe.html
│   ├── ausruestung-koerperpflege.html
│   └── journal.html
│
├── data/
│   ├── bilder/         ← Alle Bilder (Etappen, Galerie, Wappen, Ausrüstung)
│   └── pdf/
│       └── sponsoring.pdf
│
└── font/
    └── CreatoDisplay-Thin.otf
```

---

## Etappenfortschritt aktualisieren

Wenn eine Etappe geschafft ist, in `js/route.js` die Zahl ändern:

```js
const DONE = 0; // 0 = noch nichts, 9 = alle Etappen geschafft
```

Datei speichern und pushen – Timeline und Karte aktualisieren sich automatisch.

---

## Wichtige Hinweise

- `CNAME`, `robots.txt` und `sitemap.xml` **müssen im Root bleiben** – GitHub Pages und Google suchen diese Dateien nur dort.
- Pfade in `css/style.css` verwenden `../` um aus dem `css/` Ordner heraus auf andere Dateien zu zeigen.
- Pfade in `frontend/*.html` verwenden `../` um aus dem `frontend/` Ordner heraus zu navigieren.
