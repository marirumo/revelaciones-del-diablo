# 🔥 Revelaciones del Diablo

> **One uncomfortable truth. Every day.**
>
> *For people who find optimism suspicious.*

**Revelaciones del Diablo** es una publicación digital interactiva de revelaciones satíricas inspirada en el espíritu del *Diccionario del Diablo* de Ambrose Bierce.

No es una app de horror ni una simple colección de frases. Es un **ritual editorial diario**: leer una verdad incómoda, guardarla, discutir con el Diablo, descubrir qué dice nuestra colección sobre nosotros y compartir una pieza editorial.

## ✦ Concepto

**365 revelaciones. Una nueva edición cada día.**

La experiencia gira alrededor de:

- **Today** — la revelación del día
- **Surprise Me** — consulta al Diablo y descubre algo inesperado
- **The Index of Defeats** — explora las 365 revelaciones
- **Subjects** — descubre de qué nos gusta ser cínicos
- **My Cynicism** — tu colección personal de verdades incómodas
- **Mirror** — una lectura satírica de tu colección
- **Devil's Advocate** — discute con el Diablo
- **Publish This Truth** — convierte una revelación en un artefacto social

## ✦ Filosofía de diseño

El producto se plantea como una **publicación digital con mecánicas de producto**, no como un dashboard.

### Editorial Brutalist

- Tipografía protagonista
- Composición asimétrica
- Blanco, negro y un único rojo de énfasis
- Mucho espacio negativo
- Números y reglas editoriales
- Motion sutil en lugar de decoración excesiva

El rojo `#E11D48` representa eventos importantes: guardar, descubrir, “sting” y otros momentos de interacción.

### El Diablo

El Diablo no es un monstruo ni un avatar de terror.

Es un **profesor desencantado, culto, sarcástico y ligeramente superior**.

Su personalidad aparece mediante microcopy y pequeñas intervenciones editoriales.

> *The Devil remembers.*

> *Apparently, optimism has not been working for you.*

### Sin fricción innecesaria

No necesitas una cuenta para:

- leer
- explorar
- guardar localmente
- compartir

La cuenta tiene sentido cuando quieres que **el Diablo recuerde tu colección entre dispositivos**.

## ✦ Experiencia principal

```text
READ
  ↓
FEEL
  ↓
SAVE / ARGUE / SHARE
  ↓
DISCOVER YOURSELF
  ↓
RETURN TOMORROW
```

El objetivo no es obligar al usuario a volver mediante trucos de engagement.

Queremos que piense:

> **“I wonder what the Devil has to say today.”**

## ✦ Características

- 📖 **Daily Ritual** — una revelación editorial cada día
- 🎲 **Surprise Me** — revelación aleatoria sin repetición inmediata
- 📚 **Index of Defeats** — archivo completo de 365 entradas
- 🏷️ **Subjects** — explora por tema
- 🩸 **This One Stung** — guarda tus revelaciones
- 🪞 **Mirror** — descubre qué dice tu colección sobre ti
- 😈 **Devil's Advocate** — discute con el Diablo
- 📤 **Publish This Truth** — genera tarjetas sociales
- 🌍 **Bilingüe** — English + Español LatAm
- 📱 **PWA** — instalable y con soporte offline
- 💾 **Local-first** — tu colección funciona sin conexión

## ✦ Idiomas

### English

US Neutral English.

### Español

Español neutral LatAm.

Se evita terminología específica de España como:

- vale
- tío
- guay
- ordenador
- coger, cuando significa “take”
- vosotros

Se prioriza:

- tú (nunca usted, nunca vos)
- computadora
- tomar
- ustedes

La traducción debe conservar el **humor, ritmo y personalidad**, no limitarse a una traducción literal.

## ✦ Stack técnico

- **Frontend:** React 19 + Vite
- **Estilos:** Tailwind CSS 4
- **Storage:** IndexedDB
- **PWA:** Service Worker + Manifest
- **Sharing:** Web Share API + Clipboard fallback
- **Backend / Sync:** Firebase Auth + Firestore, cuando esté habilitado
- **External media:** Giphy opcional; no es dependencia del core experience

## ✦ Instalación

```bash
# Clona o descarga el proyecto
cd revelaciones-del-diablo

# Instala dependencias
npm install

# Crea el archivo .env
cp .env.example .env

# Si utilizas Giphy, agrega tu API key
# VITE_GIPHY_API_KEY=tu_api_key_de_giphy

# Inicia desarrollo
npm run dev
```

Accede a:

`http://localhost:5173`

## ✦ Build para producción

```bash
npm run build
npm run preview
```

## ✦ Estructura del proyecto

```text
src/
├── components/
│   ├── TopNav.jsx
│   ├── BottomNav.jsx
│   ├── RevelationCard.jsx
│   └── AppRouter.jsx
├── screens/
│   ├── HomeScreen.jsx
│   ├── RevelationScreen.jsx
│   ├── ArchiveScreen.jsx
│   ├── SubjectsScreen.jsx
│   ├── MyCynicismScreen.jsx
│   ├── MirrorScreen.jsx
│   └── AboutScreen.jsx
├── lib/
│   ├── storage.js
│   ├── sharing.js
│   └── giphy.js
├── data/
│   └── revelations.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

> La estructura puede evolucionar durante la implementación. Los nombres anteriores representan la arquitectura de producto objetivo, no una obligación de mantener exactamente cada archivo.

## ✦ Almacenamiento

La experiencia es **local-first**.

Las revelaciones y la colección personal pueden funcionar offline mediante IndexedDB.

Firebase puede añadirse para:

- autenticación
- sincronización entre dispositivos
- recuperación de colección

## ✦ Compartir

Las revelaciones pueden convertirse en **social artifacts** diseñados específicamente para compartir.

Canales objetivo:

- WhatsApp
- Instagram
- X
- Web Share API

Si Web Share no está disponible, se utiliza Clipboard como fallback.

Cada artefacto debe enlazar de vuelta a la revelación original.

## ✦ Giphy

Giphy ya no es un requisito de cada revelación.

La dirección visual prioriza **tipografía + motion editorial** para evitar que el producto se convierta en una colección de memes.

Si se utiliza Giphy, debe considerarse contenido complementario y opcional.

## ✦ Deploy

Compatible con despliegues estáticos como:

- Vercel
- Netlify
- GitHub Pages

```bash
npm run build
```

## ✦ Roadmap

### P0 — Core ritual

- Today
- Revelation detail
- This One Stung
- Sharing
- Yesterday / Tomorrow
- 365 revelations
- EN / ES
- IndexedDB
- PWA responsive

### P1 — Differentiation

- Surprise Me
- Index of Defeats
- Subjects
- Mirror
- Devil's Advocate
- Social artifacts

### P2 — Retention & expansion

- Cloud sync
- Identity profiles
- Milestones
- Notifications
- Advanced personalization
- Annual editions

## ✦ Métricas de producto

El producto se medirá principalmente por comportamiento:

- **Activation:** lectura completa de la primera revelación
- **First value:** primer save o share
- **Ritual:** D1 / D7 return rate
- **Exploration:** uso de Archive / Subjects
- **Collection:** revelaciones guardadas por usuario activo
- **Expression:** uso de Devil's Advocate
- **Virality:** shares por usuario activo
- **Identity:** apertura de Mirror
- **Content depth:** revelaciones vistas por sesión

No se asumen benchmarks de retención antes de disponer de datos reales de cohortes.

## ✦ Créditos

- **Inspiración:** Ambrose Bierce, *The Devil's Dictionary*
- **GIF / media:** Giphy, cuando se utilice
- **Design & Development:** proyecto asistido con Claude (Anthropic)

## ✦ Licencia

MIT

---

**Made with 🔥 — one uncomfortable truth at a time.**
