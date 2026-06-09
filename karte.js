/* ============================================================
   KARTE – neue Datei "karte.js" ins Repo-Root
   Leaflet.js wird direkt von CDN geladen, kein npm nötig.

   In index.html im <head> hinzufügen:
   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

   Vor </body> einbinden (nach route_data.js):
   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
   <script src="route_data.js"></script>
   <script src="karte.js"></script>
   ============================================================ */

(function () {

    // Etappen-Stops mit Koordinaten
    var STOPS = [
        { name: "Gmund am Tegernsee", sub: "Start", lat: 47.7507, lon: 11.7392 },
        { name: "Lenggries",           sub: "Bayern, DE",  lat: 47.6833, lon: 11.5833 },
        { name: "Garmisch-Partenkirchen", sub: "Bayern, DE", lat: 47.4912, lon: 11.0957 },
        { name: "Ehrwald",             sub: "Tirol, AT",   lat: 47.4042, lon: 10.9072 },
        { name: "Imst",                sub: "Tirol, AT",   lat: 47.2450, lon: 10.7397 },
        { name: "St. Moritz",          sub: "Graubünden, CH", lat: 46.4980, lon: 9.8373 },
        { name: "Chiavenna",           sub: "Lombardei, IT", lat: 46.3236, lon: 9.3966 },
        { name: "Colico",              sub: "Lombardei, IT", lat: 46.1297, lon: 9.3664 },
        { name: "Varenna, Comer See",  sub: "Ziel 🏁",    lat: 46.0100, lon: 9.2832 },
    ];

    document.addEventListener('DOMContentLoaded', function () {
        var mapEl = document.getElementById('route-map');
        if (!mapEl || typeof L === 'undefined' || typeof ROUTE_COORDS === 'undefined') return;

        // Karte initialisieren
        var map = L.map('route-map', {
            zoomControl: true,
            scrollWheelZoom: false  // kein versehentliches Zoomen beim Scrollen
        });

        // OpenStreetMap Tiles (kostenlos)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 18
        }).addTo(map);

        // Route als grüne Linie
        var polyline = L.polyline(ROUTE_COORDS, {
            color: '#3ecf6b',
            weight: 3,
            opacity: 0.85
        }).addTo(map);

        // Karte auf Route zoomen
        map.fitBounds(polyline.getBounds(), { padding: [30, 30] });

        // Start- und Ziel-Marker
        var greenIcon = L.divIcon({
            className: '',
            html: '<div style="width:14px;height:14px;background:#3ecf6b;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 3px rgba(62,207,107,0.3);"></div>',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        var flagIcon = L.divIcon({
            className: '',
            html: '<div style="width:14px;height:14px;background:#e6a817;border:2px solid #fff;border-radius:50%;box-shadow:0 0 0 3px rgba(230,168,23,0.3);"></div>',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        // Alle Stops als Marker
        STOPS.forEach(function (stop, i) {
            var icon = (i === STOPS.length - 1) ? flagIcon : greenIcon;
            L.marker([stop.lat, stop.lon], { icon: icon })
                .addTo(map)
                .bindPopup('<strong>' + stop.name + '</strong>' + stop.sub);
        });
    });

})();
