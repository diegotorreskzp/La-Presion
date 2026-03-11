/* ================================================
   app.js — Lee datos desde Firebase Firestore
   ================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc }
    from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBpwRWK4S_nPz6vaFmi1uJhWTOt7_1BII8",
    authDomain: "la-presion.firebaseapp.com",
    projectId: "la-presion",
    storageBucket: "la-presion.firebasestorage.app",
    messagingSenderId: "43703374307",
    appId: "1:43703374307:web:72fb55aed83a0596d5d0d6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Datos por defecto (si Firebase no tiene datos aún)
const DEFAULT_DATA = {
    redes: { instagram: "https://www.instagram.com/lapresion.ar/" },
    proximoEvento: {
        fechaTexto: "Sábado 22 de Marzo",
        lugar: "Zona Oeste, CHN",
        flyerUrl: "assets/img/flyer-proximo.jpg",
        linkEntradas: "https://www.passline.com/eventos/la-presion",
        linkMesasVIP: "https://wa.link/f1g89u"
    },
    fotos: [
        { src: "assets/fotos-fiesta/foto1.jpg", alt: "La Presión - Fiesta 1" },
        { src: "assets/fotos-fiesta/foto2.jpg", alt: "La Presión - Fiesta 2" },
        { src: "assets/fotos-fiesta/foto3.jpg", alt: "La Presión - Fiesta 3" },
        { src: "assets/fotos-fiesta/foto4.jpg", alt: "La Presión - Fiesta 4" },
        { src: "assets/fotos-fiesta/foto5.jpg", alt: "La Presión - Fiesta 5" }
    ],
    spotifyPlaylistId: "37i9dQZF1DXaXB8fQg7xif"
};

async function loadSiteData() {
    try {
        const docRef = doc(db, 'sitedata', 'config');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            const d = snap.data();
            return {
                redes: {
                    instagram: d.linkInstagram || DEFAULT_DATA.redes.instagram
                },
                proximoEvento: {
                    fechaTexto: d.eventoFechaTexto || DEFAULT_DATA.proximoEvento.fechaTexto,
                    lugar: d.eventoLugar || DEFAULT_DATA.proximoEvento.lugar,
                    flyerUrl: d.flyerUrl || DEFAULT_DATA.proximoEvento.flyerUrl,
                    linkEntradas: d.linkPassline || DEFAULT_DATA.proximoEvento.linkEntradas,
                    linkMesasVIP: d.linkWhatsapp || DEFAULT_DATA.proximoEvento.linkMesasVIP
                },
                fotos: d.fotos && d.fotos.length > 0 ? d.fotos : DEFAULT_DATA.fotos,
                spotifyPlaylistId: d.spotifyId || DEFAULT_DATA.spotifyPlaylistId
            };
        }
    } catch(e) {
        console.warn('Error leyendo Firebase, usando datos por defecto:', e);
    }
    return DEFAULT_DATA;
}

async function initApp() {
    const SITE_DATA = await loadSiteData();
    initSocialLinks(SITE_DATA);
    initProximoEvento(SITE_DATA);
    initCarrusel(SITE_DATA);
    initSpotify(SITE_DATA);
    initHeader();
    initLightbox(SITE_DATA);
}

/* === REDES SOCIALES === */
function initSocialLinks(data) {
    const { redes } = data;
    setLink('link-instagram', redes.instagram);
    setLink('footer-instagram', redes.instagram);
}

function setLink(id, url) {
    const el = document.getElementById(id);
    if (el && url) el.href = url;
}

/* === PRÓXIMO EVENTO === */
function initProximoEvento(data) {
    const { proximoEvento } = data;
    const fechaEl = document.getElementById('proximo-evento-fecha');
    const lugarEl = document.getElementById('proximo-evento-lugar');
    const entradasLink = document.getElementById('link-passline');
    const vipLink = document.getElementById('link-mesas-vip');
    const flyerImg = document.querySelector('.entradas__card-img');

    if (fechaEl) fechaEl.textContent = proximoEvento.fechaTexto;
    if (lugarEl) lugarEl.textContent = proximoEvento.lugar;
    if (entradasLink) entradasLink.href = proximoEvento.linkEntradas;
    if (vipLink) vipLink.href = proximoEvento.linkMesasVIP;
    if (flyerImg) flyerImg.src = proximoEvento.flyerUrl;
}

/* === CARRUSEL AUTO-SCROLL === */
function initCarrusel(data) {
    const track = document.getElementById('carrusel-track');
    if (!track) return;

    const { fotos } = data;

    if (!fotos || fotos.length === 0) {
        track.innerHTML = '<p style="color:#888; text-align:center; width:100%; padding:40px;">No hay fotos cargadas.</p>';
        return;
    }

    [...fotos, ...fotos].forEach((foto, index) => {
        const item = document.createElement('div');
        item.className = 'carrusel__item';
        item.dataset.index = index % fotos.length;
        item.innerHTML = `<img src="${foto.src}" alt="${foto.alt}">`;
        track.appendChild(item);
    });

    let position = 0;
    let isPaused = false;
    const speed = 0.5;
    let totalWidth = 0;

    const imgs = track.querySelectorAll('img');
    let loaded = 0;

    function startAnimation() {
        totalWidth = track.scrollWidth / 2;
        function animate() {
            if (!isPaused) {
                position += speed;
                if (position >= totalWidth) position = 0;
                track.style.transform = `translateX(-${position}px)`;
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    imgs.forEach(img => {
        if (img.complete) {
            loaded++;
            if (loaded === imgs.length) startAnimation();
        } else {
            img.addEventListener('load', () => {
                loaded++;
                if (loaded === imgs.length) startAnimation();
            });
            img.addEventListener('error', () => {
                loaded++;
                if (loaded === imgs.length) startAnimation();
            });
        }
    });

    track.parentElement.addEventListener('mouseenter', () => isPaused = true);
    track.parentElement.addEventListener('mouseleave', () => isPaused = false);
}

/* === SPOTIFY === */
function initSpotify(data) {
    const container = document.getElementById('spotify-embed-container');
    if (!container) return;
    const { spotifyPlaylistId } = data;
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
function initLightbox(data) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    let currentIndex = 0;
    const { fotos } = data;
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

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);