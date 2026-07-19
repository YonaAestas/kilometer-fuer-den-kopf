const items = document.querySelectorAll('.galerie-grid img');
const images = Array.from(items).map(img => ({
    src: img.src,
    caption: img.alt
}));

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