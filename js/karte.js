/* ============================================================
   KARTE – karte.js
   Liest DONE aus route.js und färbt Marker entsprechend:
   - Geschafft     → grün
   - Nächste Stadt → grün blinkend
   - Noch nicht    → grau
   ============================================================ */

(function () {

    var STOPS = [
        { name: "Gmund am Tegernsee",     sub: "Start",          lat: 47.7507, lon: 11.7392 },
        { name: "Lenggries",              sub: "Bayern, DE",     lat: 47.6833, lon: 11.5833 },
        { name: "Garmisch-Partenkirchen", sub: "Bayern, DE",     lat: 47.4912, lon: 11.0957 },
        { name: "Ehrwald",                sub: "Tirol, AT",      lat: 47.4042, lon: 10.9072 },
        { name: "Imst",                   sub: "Tirol, AT",      lat: 47.2450, lon: 10.7397 },
        { name: "St. Moritz",             sub: "Graubünden, CH", lat: 46.4980, lon:  9.8373 },
        { name: "Chiavenna",              sub: "Lombardei, IT",  lat: 46.3236, lon:  9.3966 },
        { name: "Colico",                 sub: "Lombardei, IT",  lat: 46.1297, lon:  9.3664 },
        { name: "Varenna, Comer See",     sub: "Ziel 🏁",        lat: 46.0100, lon:  9.2832 },
    ];

    function makeIcon(type) {
        var styles = {
            done: {
                bg: '#3ecf6b',
                shadow: 'rgba(62,207,107,0.35)',
                size: 14,
                pulse: false
            },
            next: {
                bg: '#3ecf6b',
                shadow: 'rgba(62,207,107,0.5)',
                size: 16,
                pulse: true
            },
            future: {
                bg: '#555',
                shadow: 'rgba(0,0,0,0.2)',
                size: 12,
                pulse: false
            },
            goal: {
                bg: '#e6a817',
                shadow: 'rgba(230,168,23,0.35)',
                size: 14,
                pulse: false
            },
            goaldone: {
                bg: '#e6a817',
                shadow: 'rgba(230,168,23,0.5)',
                size: 18,
                pulse: true
            }
        };

        var s = styles[type] || styles.future;
        var pulseStyle = s.pulse
            ? 'animation:karte-pulse 1.4s ease-in-out infinite;'
            : '';
        var html = '<div style="'
            + 'width:' + s.size + 'px;'
            + 'height:' + s.size + 'px;'
            + 'background:' + s.bg + ';'
            + 'border:2px solid #fff;'
            + 'border-radius:50%;'
            + 'box-shadow:0 0 0 3px ' + s.shadow + ';'
            + pulseStyle
            + '"></div>';

        return L.divIcon({
            className: '',
            html: html,
            iconSize: [s.size, s.size],
            iconAnchor: [s.size / 2, s.size / 2]
        });
    }

    // Puls-Animation einmalig ins DOM injizieren
    function injectPulseCSS() {
        if (document.getElementById('karte-pulse-style')) return;
        var style = document.createElement('style');
        style.id = 'karte-pulse-style';
        style.textContent = '@keyframes karte-pulse {'
            + '0%,100%{box-shadow:0 0 0 3px rgba(62,207,107,0.5);}'
            + '50%{box-shadow:0 0 0 7px rgba(62,207,107,0.1);}'
            + '}';
        document.head.appendChild(style);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var mapEl = document.getElementById('route-map');
        if (!mapEl || typeof L === 'undefined' || typeof ROUTE_COORDS === 'undefined') return;

        // DONE aus route.js lesen (dort als globale Variable deklariert)
        var done = (typeof DONE !== 'undefined') ? DONE : 0;
        var total = STOPS.length;

        injectPulseCSS();

        var map = L.map('route-map', {
            zoomControl: true,
            scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(map);

        // Route als Linie
        var polyline = L.polyline(ROUTE_COORDS, {
            color: '#3ecf6b',
            weight: 3,
            opacity: 0.85
        }).addTo(map);

        map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

        // Marker mit Status-Farben
        STOPS.forEach(function (stop, i) {
            var isLast = (i === total - 1);
            var iconType;

            if (i < done) {
                iconType = isLast ? 'goaldone' : 'done';
            } else if (i === done && done < total) {
                iconType = 'next';
            } else {
                iconType = isLast ? 'goal' : 'future';
            }

            var statusText = i < done ? ' ✓' : (i === done && done < total ? ' ← Nächste Station' : '');
            var popup = '<strong>' + stop.name + statusText + '</strong>' + stop.sub;

            L.marker([stop.lat, stop.lon], { icon: makeIcon(iconType) })
                .addTo(map)
                .bindPopup(popup);
        });
    });

})();
