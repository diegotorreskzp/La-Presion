# La Presión — Guía Paso a Paso para VS Code

## 📁 Estructura de Carpetas

Creá esta estructura exacta en tu proyecto:

```
la-presion/
│
├── index.html              ← Página principal
├── css/
│   └── styles.css          ← Estilos (colores rojo/negro)
├── js/
│   ├── data.js             ← "Base de datos" local (lo que edita el admin)
│   └── app.js              ← Lógica: carrusel, spotify, links, lightbox
├── admin/
│   └── admin.html          ← Panel de administrador
├── assets/
│   ├── img/
│   │   ├── hero-bg.jpg     ← Foto grande del hero (encabezado)
│   │   └── flyer-proximo.jpg  ← Flyer del próximo evento
│   ├── logos/
│   │   └── logo.png        ← Logo de La Presión
│   └── fotos-fiesta/
│       ├── foto1.jpg       ← Fotos del carrusel
│       ├── foto2.jpg
│       ├── foto3.jpg
│       └── ... (las que quieras)
```

## 🚀 Paso a Paso en VS Code

### PASO 1 — Crear el proyecto
1. Abrí VS Code
2. File → Open Folder → Creá una carpeta llamada `la-presion`
3. Dentro de esa carpeta, creá las subcarpetas:
   - `css`
   - `js`
   - `admin`
   - `assets/img`
   - `assets/logos`
   - `assets/fotos-fiesta`

### PASO 2 — Crear los archivos
Creá estos archivos en el orden indicado (copiá el contenido de cada uno):

1. `index.html` → en la raíz del proyecto
2. `css/styles.css` → dentro de la carpeta css
3. `js/data.js` → dentro de la carpeta js
4. `js/app.js` → dentro de la carpeta js
5. `admin/admin.html` → dentro de la carpeta admin

### PASO 3 — Agregar tus recursos (imágenes)
1. **Logo**: Poné tu logo en `assets/logos/logo.png`
2. **Foto hero**: Una foto grande de la fiesta como `assets/img/hero-bg.jpg`
   - Recomendado: 1920x1080 mínimo
3. **Flyer**: El flyer del próximo evento como `assets/img/flyer-proximo.jpg`
4. **Fotos del carrusel**: Ponelas en `assets/fotos-fiesta/` nombradas como:
   - `foto1.jpg`, `foto2.jpg`, `foto3.jpg`, etc.
   - Recomendado: formato vertical (3:4), mínimo 600px de ancho

### PASO 4 — Configurar tus datos
Abrí `js/data.js` y cambiá:
- Los links de Instagram, WhatsApp y TikTok
- La fecha y lugar del próximo evento
- Los links de Passline (entradas y VIP)
- El ID de tu playlist de Spotify
- Los nombres de las fotos si los cambiaste

### PASO 5 — Probar en navegador
1. Instalá la extensión **Live Server** en VS Code
   - Buscala en Extensions (Ctrl+Shift+X)
   - Instalá la de Ritwick Dey
2. Click derecho en `index.html` → "Open with Live Server"
3. Se abre automáticamente en tu navegador

### PASO 6 — Usar el Panel Admin
1. Entrá a `admin/admin.html` (hay un link en el footer)
2. Modificá lo que necesites (fotos, links, evento, playlist)
3. Click en "Generar data.js"
4. Se descarga un archivo → reemplazá el que está en `js/data.js`
5. Recargá la página y listo

## 🎨 Personalización de Colores

Si querés ajustar los colores, editá las variables CSS en `css/styles.css`:

```css
:root {
    --color-bg: #0a0a0a;           /* Fondo principal */
    --color-red: #c41e1e;          /* Rojo principal */
    --color-red-dark: #8b0000;     /* Rojo oscuro */
    --color-red-light: #e63946;    /* Rojo claro (hover) */
}
```

## 🔧 Cómo obtener el ID de Spotify

1. Abrí Spotify (web o app)
2. Andá a la playlist que querés
3. Click en los 3 puntitos → Compartir → Copiar enlace
4. El link es algo como: `https://open.spotify.com/playlist/37i9dQZF1DXaXB8fQg7xif?si=abc123`
5. El ID es la parte entre `/playlist/` y `?`: **37i9dQZF1DXaXB8fQg7xif**

## 📱 Responsive

La página se adapta automáticamente a:
- Desktop (3 fotos por fila en el carrusel)
- Tablet (2 fotos por fila)
- Celular (1 foto por fila, menú hamburguesa)

## ⚡ Extensiones recomendadas para VS Code

- **Live Server** — Para ver cambios en tiempo real
- **Prettier** — Para formatear el código
- **Auto Rename Tag** — Para editar tags HTML más rápido
- **Image Preview** — Para ver thumbnails de tus imágenes
