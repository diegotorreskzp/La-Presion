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
        lugar: "Zona Oeste, CHN",
        flyerImg: "assets/img/flyer-proximo.jpg",
        linkEntradas: "https://www.passline.com/eventos/la-presion",
        linkMesasVIP: "https://wa.link/f1g89u"
    },
    fotos: [
        { src: "assets/fotos-fiesta/foto1.jpg", alt: "La Presión - Fiesta 1" },
        { src: "assets/fotos-fiesta/foto2.jpg", alt: "La Presión - Fiesta 2" },
        { src: "assets/fotos-fiesta/foto3.jpg", alt: "La Presión - Fiesta 3" }
    ],
    spotifyPlaylistId: "37i9dQZF1DXaXB8fQg7xif",
    textos: {
        heroTitle: "La Presión",
        heroTagline: "La Misa Menos Santa del País",
        entradaTitle: "Adquirí Tu Entrada a La Presión",
        entradaSub: "No te quedes afuera. Las entradas se agotan rápido."
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