/*  ================================================
    data.js — Sistema con localStorage + imágenes base64
    ================================================
    El admin sube imágenes que se guardan como base64
    en localStorage. Si no hay datos guardados, usa
    los valores por defecto (rutas a archivos locales).
    ================================================ */

const DEFAULT_DATA = {
    redes: {
        instagram: "https://www.instagram.com/lapresion.ar/"
    },
    proximoEvento: {
        fecha: "Sábado 22 de Marzo",
        lugar: "CLUB LËVEL",
        flyerImg: "assets/img/flyer-proximo.jpg",
        linkEntradas: "https://www.passline.com/eventos/la-presion",
        linkMesasVIP: "https://wa.link/f1g89u"
    },
    fotos: [
        { src: "assets/fotos-fiesta/foto1.jpg", alt: "La Presión - Fiesta 1" },
        { src: "assets/fotos-fiesta/foto2.jpg", alt: "La Presión - Fiesta 2" },
        { src: "assets/fotos-fiesta/foto3.jpg", alt: "La Presión - Fiesta 3" },
        { src: "assets/fotos-fiesta/foto4.jpg", alt: "La Presión - Fiesta 4" },
        { src: "assets/fotos-fiesta/foto5.jpg", alt: "La Presión - Fiesta 5" },
        { src: "assets/fotos-fiesta/foto6.jpg", alt: "La Presión - Fiesta 6" }
    ],
    spotifyPlaylistId: "6Y4sGJLKM3UE6CWpnrMCU1",
    textos: {
        heroTitle: "La Presión",
        heroTagline: "Reggaetón Na' Más",
        entradaTitle: "Adquirí Tu Entrada a La Presión",
        entradaSub: "No te quiero presionar, pero nosotros siempre estamos Sold Out."
    }
};

function loadSiteData() {
    try {
        const saved = localStorage.getItem('lapresion_data');
        if (saved) return JSON.parse(saved);
    } catch (e) {
        console.warn('Error leyendo localStorage:', e);
    }
    return DEFAULT_DATA;
}

const SITE_DATA = loadSiteData();