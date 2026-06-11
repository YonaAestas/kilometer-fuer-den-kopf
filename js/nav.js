window.addEventListener('scroll', function () {
    const nav = document.querySelector('.clean-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});