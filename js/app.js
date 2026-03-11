/* ================================================
   app.js — Lógica principal de La Presión
   Soporta imágenes base64 (desde admin) y rutas locales
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initSocialLinks();
    initProximoEvento();
    initCarrusel();
    initSpotify();
    initHeader();
    initLightbox();
});

/* === REDES SOCIALES === */
function initSocialLinks() {
    const { redes } = SITE_DATA;
    setLink('link-instagram', redes.instagram);
    setLink('footer-instagram', redes.instagram);
}

function setLink(id, url) {
    const el = document.getElementById(id);
    if (el && url) el.href = url;
}

/* === PRÓXIMO EVENTO === */
function initProximoEvento() {
    const { proximoEvento } = SITE_DATA;

    const fechaEl = document.getElementById('proximo-evento-fecha');
    const lugarEl = document.getElementById('proximo-evento-lugar');
    const entradasLink = document.getElementById('link-passline');
    const vipLink = document.getElementById('link-mesas-vip');
    const flyerImg = document.querySelector('.entradas__card-img');

    if (fechaEl) fechaEl.textContent = proximoEvento.fecha;
    if (lugarEl) lugarEl.textContent = proximoEvento.lugar;
    if (entradasLink) entradasLink.href = proximoEvento.linkEntradas;
    if (vipLink) vipLink.href = proximoEvento.linkMesasVIP;
    if (flyerImg) flyerImg.src = proximoEvento.flyerImg; // Funciona con base64 o ruta
}

/* === CARRUSEL AUTO-SCROLL === */
function initCarrusel() {
    const track = document.getElementById('carrusel-track');
    if (!track) return;

    const { fotos } = SITE_DATA;

    if (!fotos || fotos.length === 0) {
        track.innerHTML = '<p style="color:#888; text-align:center; width:100%; padding:40px;">No hay fotos cargadas. Subí fotos desde el panel admin.</p>';
        return;
    }

    // Crear los items originales
    fotos.forEach((foto, index) => {
        const item = document.createElement('div');
        item.className = 'carrusel__item';
        item.dataset.index = index;
        item.innerHTML = `<img src="${foto.src}" alt="${foto.alt}" loading="lazy">`;
        track.appendChild(item);
    });

    // Duplicar las fotos para crear el efecto infinito
    // La animación CSS mueve -50%, entonces necesitamos el doble de contenido
    fotos.forEach((foto, index) => {
        const item = document.createElement('div');
        item.className = 'carrusel__item';
        item.dataset.index = index;
        item.innerHTML = `<img src="${foto.src}" alt="${foto.alt}" loading="lazy">`;
        track.appendChild(item);
    });

    // Ajustar velocidad según cantidad de fotos (más fotos = más lento)
    const speed = Math.max(15, fotos.length * 4);
    track.style.animationDuration = speed + 's';
}

/* === SPOTIFY === */
function initSpotify() {
    const container = document.getElementById('spotify-embed-container');
    if (!container) return;

    const { spotifyPlaylistId } = SITE_DATA;
    if (!spotifyPlaylistId) return;

    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/playlist/${spotifyPlaylistId}?utm_source=generator&theme=0`;
    iframe.width = '100%';
    iframe.height = '380';
    iframe.frameBorder = '0';
    iframe.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    iframe.loading = 'lazy';
    iframe.style.borderRadius = '12px';
    container.appendChild(iframe);
}

/* === HEADER === */
function initHeader() {
    const header = document.getElementById('header');
    const burgerBtn = document.getElementById('burger-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (burgerBtn) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.92)';
        }
    });
}

/* === LIGHTBOX === */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentIndex = 0;
    const { fotos } = SITE_DATA;

    if (!fotos || fotos.length === 0) return;

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = fotos[currentIndex].src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        currentIndex = (currentIndex + dir + fotos.length) % fotos.length;
        lightboxImg.src = fotos[currentIndex].src;
    }

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.carrusel__item');
        if (item) openLightbox(parseInt(item.dataset.index));
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => navigate(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });
}