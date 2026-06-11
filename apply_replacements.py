# Dieses Script lokal ausführen auf deinem PC:
# python apply_replacements.py
import os

replacements = [
    ('href="style.css"',                    'href="../css/style.css"'),
    ('href="bilder/favicon.png"',           'href="../data/bilder/favicon.png"'),
    ('src="bilder/Kilometer_für_den_Kopf01.png"', 'src="../data/bilder/Kilometer_für_den_Kopf01.png"'),
    ('src="bilder/ausruestung/',            'src="../data/bilder/ausruestung/'),
    ('href="index.html#',                   'href="../index.html#'),
    ('href="index.html" style',             'href="../index.html" style'),
    ('href="index.html"',                   'href="../index.html"'),
    ('href="ausruestung.html"',             'href="ausruestung.html"'),
]

files = [
    'ausruestung-erstehilfe.html',
    'ausruestung-koerperpflege.html',
]

for fname in files:
    if not os.path.exists(fname):
        print(f"NICHT GEFUNDEN: {fname}")
        continue
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    out = os.path.join('frontend', fname)
    os.makedirs('frontend', exist_ok=True)
    with open(out, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✓ {fname} → frontend/{fname}")

print("Fertig!")
