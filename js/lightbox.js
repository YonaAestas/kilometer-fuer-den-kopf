const images = [
    { src: "../data/bilder/Gmund_Tegernsee.jpg",                                caption: "Gmund am Tegernsee" },
    { src: "../data/bilder/Sonnenuntergang_Sylvensteinsee.jpg",                 caption: "Sonnenuntergang am Sylvensteinsee" },
    { src: "../data/bilder/Lüftlmalerei.jpg",                                   caption: "Lüftlmalerei" },
    { src: "../data/bilder/Mariahilfzeile-Bunte-Haeuser-Innsbruck-scaled.jpg", caption: "Innsbruck" },
    { src: "../data/bilder/Mautstraße_Wallgau_Vorderriß.jpg",                  caption: "Mautstraße Wallgau" },
    { src: "../data/bilder/Kurz_vor_Bad_Tölz.jpg",                             caption: "Kurz vor Bad Tölz" },
    { src: "../data/bilder/Oesterreich_Telfs.png",                              caption: "Österreich – Telfs" }
];

let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    document.getElementById('lb-img').src = images[index].src;
    document.getElementById('lb-caption').textContent = images[index].caption;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

function changeImage(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    document.getElementById('lb-img').src = images[currentIndex].src;
    document.getElementById('lb-caption').textContent = images[currentIndex].caption;
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') changeImage(1);
    if (e.key === 'ArrowLeft')  changeImage(-1);
});