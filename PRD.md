# PRD — Revelaciones del Diablo

**Versión:** 2.0  
**Fecha:** 29 de agosto de 2026  
**Estado:** Product Direction / MVP Redesign  
**Producto:** Revelaciones del Diablo

---

## 1. Resumen ejecutivo

**Revelaciones del Diablo** es un ritual editorial digital: una nueva revelación satírica cada día, inspirada en el espíritu del *Diccionario del Diablo* de Ambrose Bierce.

No es una app de frases, un producto de horror ni un dashboard de estadísticas. Es una **publicación digital interactiva con mecánicas de producto**.

La experiencia debe hacer que el usuario piense:

> **“¿Qué tiene el Diablo para mí hoy?”**

La estrategia de producto se apoya en cuatro momentos fundamentales:

1. **The First Revelation** — descubrir que el producto es diferente.
2. **The Save / This One Stung** — convertir una frase en parte de una colección personal.
3. **The Mirror** — descubrir qué dice la colección sobre el usuario.
4. **The Share / Publish This Truth** — convertir una revelación en un objeto editorial que vale la pena compartir.

---

## 2. Product vision

### Visión

Convertir una colección de 365 revelaciones satíricas en un **ritual diario de observación, cinismo y descubrimiento personal**.

### Posicionamiento

**One uncomfortable truth. Every day.**

Posibles líneas editoriales:

- *For people who find optimism suspicious.*
- *A daily dose of uncomfortable truths.*
- *365 observations humanity would rather not hear.*

### Qué NO es

- No es una app de horror.
- No es una app de memes.
- No es un dashboard SaaS.
- No es una simple biblioteca de citas.
- No es un chatbot disfrazado de personaje.
- No depende de gamificación agresiva para generar retención.

### Personalidad

El Diablo es un **profesor desencantado, culto, sarcástico y ligeramente superior**, que observa la conducta humana con humor.

Su presencia debe sentirse más como una voz editorial que como un avatar.

---

# 3. Objetivos de producto

## Objetivos principales

1. Crear un ritual diario claro y memorable.
2. Conseguir que la primera sesión entregue valor inmediatamente.
3. Hacer que guardar una revelación tenga significado emocional.
4. Convertir la colección personal en una experiencia de identidad.
5. Crear artefactos sociales atractivos y reconocibles.
6. Hacer que explorar las 365 revelaciones sea entretenido.
7. Mantener una experiencia editorial premium en EN + ES-LatAm.
8. Permitir uso offline mediante PWA + almacenamiento local.

## Objetivos secundarios

- Fomentar descubrimiento mediante Surprise Me.
- Introducir interacción con el Devil's Advocate.
- Crear progresión sin caer en gamificación infantil.
- Preparar la arquitectura para nuevos años/editoriales.

---

# 4. Target users

## Primary — The Intelligent Cynics

18–45 años, interesados en:

- sátira
- cultura
- literatura
- humor inteligente
- observación social
- contenido compartible
- productos digitales con personalidad

## Secondary

- lectores de Ambrose Bierce
- amantes de diccionarios, aforismos y ensayos breves
- usuarios de publicaciones culturales
- personas que disfrutan compartir frases con contexto

---

# 5. Product principles

## 5.1 Give value before asking for interaction

No ocultar la revelación completa detrás de un blur obligatorio.

La revelación debe ser visible inmediatamente.

La sensación de “unveil” se puede conservar mediante **motion editorial**, no mediante contenido bloqueado.

> Never hide the value proposition to create engagement.

## 5.2 Editorial first

Cada pantalla debe sentirse como una publicación contemporánea, no como software empresarial.

## 5.3 The Devil is a voice, not a chatbot

El personaje aparece en microcopys, transiciones y respuestas contextuales.

No debe convertirse en un asistente conversacional genérico.

## 5.4 Red is an event

El rojo `#E11D48` debe utilizarse con moderación para representar acciones significativas:

- guardar
- sting
- descubrir
- momentos de énfasis

No debe convertirse en el color dominante de todos los controles.

## 5.5 No unnecessary friction

No exigir registro para leer, explorar, guardar localmente o compartir.

El registro aparece cuando aporta valor:

> **Want the Devil to remember you tomorrow?**

## 5.6 Sophisticated, not spooky

Nada de gore, jumpscares, sonidos demoníacos o estética de horror.

---

# 6. Core product loop

```text
                         TODAY
                    Daily Revelation
                           |
             +-------------+-------------+
             |             |             |
            SAVE          ARGUE         SHARE
             |             |             |
             v             v             v
       MY CYNICISM    DEVIL'S ADVOCATE  SOCIAL
             |
             v
           MIRROR
             |
             v
         DISCOVERY
             |
             v
     ARCHIVE / SUBJECTS
             |
             v
           TODAY
```

El loop central no es “abrir → leer → salir”.

Es:

**Read → Feel → Save / Argue / Share → Discover yourself → Return tomorrow.**

---

# 7. Information architecture

## Primary experiences

1. **Today** — Daily Ritual
2. **Surprise Me** — Serendipity
3. **Index of Defeats** — Archive
4. **Subjects** — Exploration
5. **My Cynicism** — Personal Collection
6. **Mirror** — Personal Interpretation
7. **Publish This Truth** — Social Artifact
8. **Devil's Advocate** — Contextual interaction

La navegación debe ser ligera y editorial.

Evitar:

- sidebar SaaS
- dashboard
- card grid genérico
- navegación excesivamente persistente

---

# 8. Experience 01 — Today

## Objetivo

Que el usuario sienta que acaba de abrir una nueva edición de una publicación.

## Estructura

```text
EDITION 048
AUGUST 29, 2026

AMBITION

n.

The desire to become important,
usually by becoming unbearable.

[ commentary ]

There are people who climb
the ladder of success only to
discover that everyone below
them is happier.

THIS ONE STUNG
```

## Requisitos

- Revelación completa visible sin bloqueo.
- Número de edición.
- Fecha.
- Word.
- Part of speech.
- Definition.
- Commentary.
- Acción de guardar.
- Compartir.
- Navegación a yesterday/tomorrow.
- Surprise Me.
- Estado de lectura.

## Future content

La arquitectura debe permitir:

- 365 entradas por año.
- múltiples ediciones/años.
- contenido editorial especial.

---

# 9. Experience 02 — Surprise Me

No debe sentirse como un simple randomizer.

Opciones de naming:

- Surprise Me
- Consult the Devil
- Roll the Dice
- I'm Feeling Unfortunate

### Interacción

```text
THE DEVIL IS LOOKING
FOR SOMETHING APPROPRIATE...
```

Después aparece una revelación aleatoria.

Requisitos:

- no repetir inmediatamente la anterior
- guardar desde el resultado
- compartir desde el resultado
- volver a Today
- animación breve y editorial

---

# 10. Experience 03 — The Index of Defeats

El Archive debe sentirse como un índice literario, no como un CMS.

Ejemplo:

```text
THE INDEX OF DEFEATS

001  AMBITION
002  ANXIETY
003  AUTHORITY
004  BEAUTY
005  BUSINESS
...
047  LOVE
...
365  YOUTH
```

## Funcionalidad

- búsqueda instantánea
- debounce ~300 ms
- filtros por subject
- orden alfabético
- orden por fecha/edición
- indicador de progreso `N / 365`
- acceso directo a cualquier revelación

## Dirección visual

Números grandes, reglas tipográficas, espacios generosos y composición asimétrica.

---

# 11. Experience 04 — Subjects

Los subjects son taxonomía interna, pero deben presentarse como categorías editoriales.

### Subjects MVP

- Success
- Love
- Money
- Power
- Relationships
- Philosophy
- Politics
- Society

Ejemplo:

```text
LOVE

Promises, desire, marriage,
loneliness and other
recurring mistakes.
```

Cada subject muestra:

- descripción editorial
- cantidad de revelaciones
- entradas
- porcentaje de la colección del usuario, cuando corresponda

---

# 12. Experience 05 — My Cynicism

Sustituye conceptualmente a “Favorites”.

No debe ser una simple lista de bookmarks.

Debe sentirse como **el archivo personal de la visión del mundo del usuario**.

Header sugerido:

```text
MY CYNICISM

47 revelations saved.

Apparently, optimism
has not been working for you.
```

## Save interaction

En lugar de “Save”:

**THIS ONE STUNG**

ES:

**ESTA ME LLEGÓ**

Feedback:

- sello editorial / tinta roja
- microanimación
- feedback instantáneo
- posibilidad de undo

## Funciones

- guardar/quitar
- ordenar por fecha
- ordenar por subject
- ordenar alfabéticamente
- búsqueda
- offline-first
- sincronización futura/cloud

---

# 13. Experience 06 — Mirror

Mirror no debe ser un dashboard.

Su objetivo es convertir datos en **interpretaciones**.

Ejemplo:

```text
YOUR MIRROR

You have saved 43 revelations.

Apparently, optimism has not
been working for you.

YOUR WORLDVIEW

LOVE       ██████████
MONEY      ███████
POWER      █████
SUCCESS    ███

THE DEVIL'S CONCLUSION

You distrust success
but remain strangely
optimistic about love.

Curious.
```

## Datos

- total saved
- dominant subject
- subject distribution
- streak/return behavior
- last saved revelation
- favorite subjects
- collection milestones

## Regla

Nunca mostrar solamente métricas.

Cada métrica importante debe traducirse en una observación editorial.

---

# 14. Identity layer

Después de suficiente interacción, Mirror puede generar una identidad editorial.

Ejemplos:

- The Skeptical Romantic
- The Professional Cynic
- The Reluctant Optimist
- The Capitalist Survivor
- The Humanist, Unfortunately

Formato:

```text
YOUR DEVIL

Based on your collection...

THE SKEPTICAL ROMANTIC

You distrust money, authority
and basically everyone except
the people you love.

Diagnosis:

Contradictory.
Therefore human.
```

Esta capa debe ser determinística en MVP; no requiere IA.

---

# 15. Experience 07 — Devil's Advocate

La interacción ocurre **después de guardar**, pero no mediante un modal obligatorio.

Ejemplo:

```text
THIS ONE STUNG

The Devil has a question.

Did he get this one wrong?

[ Tell him why ]
```

El usuario puede escribir una opinión.

El sistema devuelve una respuesta pre-curada.

## MVP

- 10–20 tipos de argumentos
- respuestas por subject
- respuestas en EN y ES-LatAm
- clasificación básica del tipo de argumento
- fallback universal

## Principio

Debe sentirse como una segunda capa de lectura, no como un chatbot.

Ejemplo:

Usuario:

> Marriage can be beautiful.

Devil:

> Of course. So can tax refunds.

---

# 16. Experience 08 — Publish This Truth

El objetivo no es simplemente “share”.

El objetivo es crear un **social artifact**.

## Card base

```text
LOVE

n.

The temporary insanity
responsible for
most marriages.

— REVELACIONES
  DEL DIABLO

047 / 365
```

## Variantes futuras

- The Devil's Card
- The Dictionary Card
- The Red Card
- The Index Card

## Canales

- WhatsApp
- Instagram
- X
- Web Share API
- Clipboard fallback

Cada artefacto debe incluir un enlace profundo a la revelación original.

---

# 17. First-session UX

El usuario debe obtener valor sin registrarse.

## 0–5 sec

```text
REVELACIONES
DEL DIABLO

365 observations humanity
would rather not hear.
```

## 5–15 sec

Primera revelación completa.

## 15–30 sec

Usuario puede guardar:

**THIS ONE STUNG**

## 30–40 sec

Feedback:

> Saved.

> The Devil approves.

## 40–60 sec

Descubrimiento:

> You seem to like this kind of thing.

LOVE · MONEY · POWER · SUCCESS

El registro debe aparecer solamente cuando existe una razón clara.

---

# 18. Retention strategy

No construir la retención principalmente alrededor de:

- blur
- streaks agresivos
- badges infantiles
- notificaciones constantes

El principal mecanismo de retorno debe ser el contenido.

Mensaje mental:

> **“I wonder what the Devil has to say today.”**

## Streak

Puede existir, pero con lenguaje propio:

- `7 consecutive consultations`
- `You have survived 7 editions.`
- `The Devil remembers: 7 days.`

Evitar el típico 🔥 streak.

---

# 19. Progression

365 debe representar un viaje.

Ejemplo:

```text
10 revelations   CURIOUS
25 revelations   SUSPICIOUS
50 revelations   CYNIC
100 revelations  PROFESSIONAL
250 revelations  BEYOND SAVING
365 revelations  DEVIL'S ASSOCIATE
```

La progresión debe mantener un tono editorial, no infantil.

---

# 20. Visual design system

## Direction

**Editorial Brutalist / Contemporary Literary Publication**

Referencias conceptuales:

- literatura
- diccionario
- periódico
- revista cultural
- diseño editorial experimental

## Rules

### Typography

La tipografía es el principal elemento visual.

- word extremadamente grande
- jerarquía fuerte
- italic editorial
- números grandes
- reglas horizontales
- espacios blancos generosos

### Color

Base:

- Black
- White
- Sting Red `#E11D48`

El rojo aparece principalmente durante eventos o acciones significativas.

### Composition

- asimetría
- grid editorial
- offsets
- números
- líneas
- whitespace

### Prohibido

- glassmorphism
- gradients como recurso principal
- UI SaaS
- exceso de cards
- horror/gore
- demonios genéricos
- exceso de iconografía
- GIFs como elemento obligatorio

---

# 21. GIF strategy

Los GIFs dejan de ser un requisito core.

Problemas que se evitan:

- inconsistencia visual
- sensación de meme
- copyright/contexto
- carga de contenido externo
- ruido visual

La alternativa principal es **micro-motion editorial**.

Ejemplos:

- word entra fuera de eje
- línea roja se dibuja
- definición aparece por capas
- número de edición cambia
- sello “THIS ONE STUNG”

Giphy puede mantenerse como experimento opcional, no como dependencia de la experiencia principal.

---

# 22. Localization

## Languages

- English — US Neutral
- Spanish — Neutral LatAm

Detección inicial mediante `navigator.language`.

Toggle EN / ES.

## Spanish rules

Evitar España-specific wording:

- vale
- tío
- guay
- ordenador
- coger (cuando significa take)
- vosotros

Preferir:

- tú (nunca usted, nunca vos)
- computadora
- tomar
- ustedes

La traducción debe preservar la personalidad satírica, no ser literal.

---

# 23. Accessibility

Requisitos MVP:

- WCAG AA como objetivo
- contraste adecuado
- keyboard navigation
- focus states
- reduced motion
- semantic headings
- alt text para contenido visual
- no depender exclusivamente del color
- textos legibles en mobile

La estética brutalista nunca debe comprometer legibilidad.

---

# 24. Responsive / PWA

Mobile-first.

La experiencia debe funcionar especialmente bien en:

- mobile
- desktop
- standalone PWA

Offline:

- 365 revelations disponibles localmente
- collection local
- navegación principal
- sharing cuando el sistema lo permita
- sincronización cuando vuelva la conexión

---

# 25. Authentication

No obligatoria para consumo.

### Anonymous/local-first

Permitir:

- leer
- explorar
- guardar localmente
- compartir

### Account

Introducir cuando el usuario quiera:

- sincronización
- recuperación de colección
- continuidad entre dispositivos

Copy sugerido:

> **Want the Devil to remember you tomorrow?**

---

# 26. Technical architecture

## Frontend

- React 19
- Vite
- Tailwind CSS 4

## Storage

- IndexedDB
- local-first data model

## PWA

- Service Worker
- Web App Manifest
- offline caching

## Backend

Firebase puede incorporarse para:

- Auth
- Firestore
- sync

Debe ser opcional para el core local-first.

## Social

- Web Share API
- Clipboard fallback
- OG/deep links

## External media

Giphy es opcional y no debe ser una dependencia crítica.

---

# 27. Data model conceptual

### Revelation

```text
id
edition
date
word
partOfSpeech
definition
commentary
subject
language
shareSlug
```

### SavedRevelation

```text
revelationId
savedAt
source
```

### UserProfile

```text
userId
language
createdAt
```

### Interaction

```text
revelationId
type
createdAt
```

Tipos:

- viewed
- saved
- shared
- argued
- explored

---

# 28. MVP scope

## P0 — Core ritual

- Today
- revelation detail
- Save / This One Stung
- share
- yesterday/tomorrow
- 365 revelations
- EN / ES
- local persistence
- responsive PWA

## P1 — Differentiation

- Surprise Me
- Index of Defeats
- Subjects
- Mirror
- Devil's Advocate
- social cards

## P2 — Retention & expansion

- cloud sync
- identity profiles
- milestones
- notifications
- advanced personalization
- yearly editions
- richer archive interactions

---

# 29. Success metrics

## Activation

**% of first-time users who read a complete revelation**

## First value

**% who save or share their first revelation**

## Ritual

**D1 / D7 return rate**

## Exploration

**% who visit Archive or Subjects**

## Collection

**Average revelations saved per active user**

## Expression

**% who use Devil's Advocate**

## Virality

**Shares per active user**

## Identity

**% who open Mirror**

## Content depth

**Revelations viewed per session**

La meta inicial debe validarse con datos reales. No asumir `>80% weekly retention` como benchmark antes de tener cohortes.

---

# 30. Analytics events

Eventos mínimos:

```text
revelation_viewed
revelation_saved
revelation_unsaved
revelation_shared
surprise_me_used
subject_opened
archive_searched
mirror_opened
devils_advocate_opened
devils_advocate_submitted
social_card_generated
language_changed
install_prompt_shown
pwa_installed
```

---

# 31. Product risks

## Risk 1 — Parece una quote app

Mitigación:

- editorial identity
- Mirror
- collection
- Devil persona
- progression

## Risk 2 — Parece una meme app

Mitigación:

- eliminar dependencia de GIFs
- typography-first
- social artifacts cuidadosamente diseñados

## Risk 3 — Friction inicial

Mitigación:

- no login obligatorio
- no blur obligatorio
- revelation visible inmediatamente

## Risk 4 — Devil demasiado gimmicky

Mitigación:

- personaje sutil
- microcopy
- respuestas cortas
- evitar chatbot permanente

## Risk 5 — Brutalism reduce usability

Mitigación:

- WCAG AA
- strong hierarchy
- responsive layouts
- reduced motion
- usability testing

---

# 32. Design priorities

Diseñar primero, en este orden:

### 1. First Revelation

¿Se entiende el producto en segundos?

### 2. Save

¿Se siente especial guardar una revelación?

### 3. Share Artifact

¿La gente realmente querría publicar esto?

### 4. Mirror

¿El usuario siente que el producto aprendió algo sobre él?

### 5. Archive

¿Explorar 365 entradas resulta atractivo?

### 6. Devil's Advocate

¿La interacción añade personalidad sin interrumpir?

---

# 33. North Star experience

El éxito del producto se produce cuando un usuario:

1. llega
2. lee
3. sonríe o se incomoda
4. guarda una revelación
5. explora otra
6. descubre algo sobre sí mismo
7. comparte una
8. vuelve mañana

El producto debe convertir:

**content → ritual → collection → identity → sharing → return**

---

# 34. Long-term vision

El corpus de 365 revelaciones no debe ser el final del producto.

Puede convertirse en una publicación anual:

- Devil's Almanac 2026
- Devil's Almanac 2027
- Devil's Almanac 2028

Cada año puede introducir:

- nuevas revelaciones
- nuevas colecciones
- nuevas identidades
- nuevos artefactos editoriales

La arquitectura debe permitir múltiples años sin rehacer el producto.

---

# 35. Final product statement

**Revelaciones del Diablo is a digital publication with product mechanics.**

The content should feel like an editorial.

The navigation should feel like a book.

The collection should feel like a personal archive.

The Mirror should feel like a critique of the reader.

The Devil's Advocate should feel like correspondence with a cynical editor.

The share card should feel like a designed cultural artifact.

And Today should feel like:

> **the new edition has arrived.**
