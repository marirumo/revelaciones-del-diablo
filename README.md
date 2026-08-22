# 🔥 Revelaciones del Diablo

Una app PWA diaria de revelaciones satíricas inspiradas en el Diccionario del Diablo de Ambrose Bierce.

## Características

- 📱 **PWA** — Funciona offline y se puede instalar como app
- 🎯 **Diarias** — Una revelación satírica cada día
- 🌍 **Bilingüe** — Español e Inglés
- ❤️ **Favoritas** — Guarda tus revelaciones preferidas
- 🎬 **GIFs** — Cada revelación incluye un GIF de Giphy
- 📤 **Compartible** — Comparte en redes sociales fácilmente
- 🎨 **Tema Infernal** — Diseño dark con colores mexicanos infernales

## Stack Técnico

- **Frontend:** React 19 + Vite
- **Estilos:** Tailwind CSS 4
- **Almacenamiento:** IndexedDB (client-side)
- **GIFs:** Giphy API
- **PWA:** Service Worker + Manifest

## Instalación

```bash
# Clone o descarga el proyecto
cd revelaciones-del-diablo

# Instala dependencias
npm install

# Crea archivo .env
cp .env.example .env
# Luego edita .env y agrega tu GIPHY_API_KEY

# Inicia desarrollo
npm run dev
```

Accede a `http://localhost:5173`

## Build para producción

```bash
npm run build
npm run preview
```

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── TopNav.jsx
│   ├── BottomNav.jsx
│   ├── RevelationCard.jsx
│   └── AppRouter.jsx
├── screens/            # Pantallas principales
│   ├── HomeScreen.jsx
│   ├── LibraryScreen.jsx
│   ├── CategoriesScreen.jsx
│   ├── FavoritesScreen.jsx
│   └── AboutScreen.jsx
├── lib/                # Utilities
│   ├── storage.js      # IndexedDB
│   └── giphy.js        # Giphy API
├── data/               # Data
│   └── revelations.js  # Banco de revelaciones
├── styles/
│   └── globals.css     # Tailwind + custom styles
├── App.jsx
└── main.jsx
```

## Variables de Entorno

```env
VITE_GIPHY_API_KEY=tu_api_key_de_giphy
```

Obtén una API key gratuita en: https://giphy.com/apps

## Pantallas

- **HOME** — Revelación del día con navegación
- **LIBRARY** — Busca y filtra todas las revelaciones
- **CATEGORÍAS** — Explora por tema
- **FAVORITAS** — Tus revelaciones guardadas
- **ABOUT** — Info y créditos

## Almacenamiento

Las favoritas se guardan localmente en IndexedDB. Funciona completamente offline.

## Compartir

Usa Web Share API para compartir en redes sociales. Fallback a clipboard si no está disponible.

## Deploy

Listo para deploya en:
- **Vercel** (recomendado, gratis)
- **Netlify**
- **GitHub Pages**

```bash
# Build estático
npm run build
```

## Licencia

MIT

## Créditos

- **Diccionario del Diablo:** Ambrose Bierce (1881)
- **GIFs:** Giphy
- **Design & Dev:** Con Claude (Anthropic)

---

**Hecho con 🔥 en la Ciudad de México**

# revelaciones-del-diablo
A daily app of satirical revelations inspired by Ambrose Bierce's Devil's Dictionary. Built to make you reflect on the uncomfortable nature of reality, with a smile.
