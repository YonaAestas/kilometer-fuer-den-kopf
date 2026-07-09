/* ============================================================
   ROUTE FORTSCHRITT
   
   Wenn eine Etappe geschafft ist:
   → DONE um 1 erhöhen und Datei neu hochladen.

   0 = noch nichts geschafft
   1 = Gmund am Tegernsee geschafft
   2 = + Lenggries
   3 = + Garmisch-Partenkirchen
   4 = + Ehrwald
   5 = + Imst
   6 = + St. Moritz
   7 = + Chiavenna
   8 = + Colico
   9 = + Varenna (Ziel erreicht!)
   ============================================================ */

const DONE = 3; // <-- diese Zahl ändern & Datei hochladen

(function () {
    const TOTAL = 9;

    function applyState() {
        const cards = document.querySelectorAll('#etappen-grid .etappe-card');
        cards.forEach(function (card) {
            const idx = parseInt(card.dataset.index, 10);
            card.classList.remove('done', 'next', 'future');
            if (idx < DONE) {
                card.classList.add('done');
            } else if (idx === DONE && DONE < TOTAL) {
                card.classList.add('next');
            } else {
                card.classList.add('future');
            }
        });
        updateStatus();
    }

    function updateStatus() {
        const el = document.getElementById('route-status');
        if (!el) return;
        if (DONE === 0) {
            el.textContent = 'Status: Vorbereitung abgeschlossen · Startdatum folgt';
            el.style.color = '';
        } else if (DONE >= TOTAL) {
            el.textContent = '🏁 Alle Etappen geschafft – Comer See erreicht!';
            el.style.color = '#3ecf6b';
        } else {
            el.textContent = 'Unterwegs · ' + DONE + ' von ' + TOTAL + ' Etappen geschafft';
            el.style.color = '#3ecf6b';
        }
    }

    document.addEventListener('DOMContentLoaded', applyState);
})();
