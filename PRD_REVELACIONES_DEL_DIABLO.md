# 📋 Product Requirements Document (PRD)

## **Revelaciones del Diablo**
### Una app satírica diaria inspirada en Ambrose Bierce

**Versión:** 1.0  
**Fecha:** Agosto 2026  
**Estado:** MVP Completo - Listo para Producción

---

## 📌 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Objetivos del Producto](#objetivos-del-producto)
3. [Audiencia Objetivo](#audiencia-objetivo)
4. [Propuesta de Valor](#propuesta-de-valor)
5. [Funcionalidades Principales](#funcionalidades-principales)
6. [Especificaciones Técnicas](#especificaciones-técnicas)
7. [Requisitos Funcionales Detallados](#requisitos-funcionales-detallados)
8. [Criterios de Éxito](#criterios-de-éxito)
9. [Roadmap Futuro](#roadmap-futuro)
10. [Consideraciones de Seguridad](#consideraciones-de-seguridad)

---

## 🎯 Visión General

### Nombre del Producto
**Revelaciones del Diablo** (*Devil's Revelations* en inglés)

### Descripción General
Una aplicación web y PWA que entrega una revelación satírica diaria inspirada en el clásico *Diccionario del Diablo* de Ambrose Bierce. Cada revelación consiste en una palabra burlona, su definición cínica y una reflexión incómoda sobre la sociedad moderna, acompañada de un GIF dinámico.

### Tagline
*"Una verdad cínica cada día"* / *"One cynical truth per day"*

### Duración del Proyecto
- **Fase 1-5 (MVP):** Completadas ✅
- **Fase 6 (Deploy):** Próxima semana
- **Post-Lanzamiento:** Mejoras continuas

---

## 🎯 Objetivos del Producto

### Objetivos Primarios (OKRs)

#### Q3 2026 (Lanzamiento)
- **Objetivo 1:** Lanzar MVP funcional con 365 revelaciones
  - KR: Deploy en Vercel con >95% uptime
  - KR: Cargar <2 segundos en 4G

- **Objetivo 2:** Alcanzar 1,000 usuarios activos en primer mes
  - KR: 500 instalaciones como PWA
  - KR: 100+ favoritas guardadas por usuario promedio

- **Objetivo 3:** Lograr 90% de retención semanal
  - KR: Volver al menos 1x por semana
  - KR: Guardar al menos 5 revelaciones

### Objetivos Secundarios
- Crear comunidad de usuarios que compartan revelaciones
- Expandir a 8 idiomas en Q4 2026
- Integrar API de notificaciones diarias
- Alcanzar 50k usuarios en año 1

---

## 👥 Audiencia Objetivo

### Segmento Primario: "Los Cínicos Inteligentes"

**Demografía:**
- Edad: 18-45 años
- Género: Sin preferencia (neutral)
- Ubicación: LATAM (ES), USA (EN)
- Educación: Universitarios o superior

**Psicografía:**
- Disfrutan humor satírico e irónico
- Críticos de la sociedad moderna
- Amantes de la lectura y la filosofía
- Activos en redes sociales

**Comportamiento:**
- Usan redes sociales para compartir contenido
- Buscan reflexión y crítica social
- Comparten artículos satíricos
- Siguen cuentas de humor filosófico

### Segmento Secundario: "Literarios Nostálgicos"
- Fans de Ambrose Bierce
- Apasionados por literatura clásica
- Buscadores de contenido inteligente

### Casos de Uso Típicos
1. **Mantenerse actualizado:** Abrir app diariamente para la revelación del día
2. **Reflexión:** Leer definiciones durante descansos en el trabajo
3. **Compartir:** Compartir en redes sociales con amigos
4. **Coleccionar:** Guardar favoritas para lectura posterior
5. **Descubrir:** Explorar biblioteca de 365 revelaciones

---

## 💡 Propuesta de Valor

### Para el Usuario Final
| Beneficio | Valor |
|-----------|-------|
| **Entretenimiento inteligente** | Humor satírico de calidad diaria |
| **Reflexión** | Perspectivas cínicas sobre la sociedad |
| **Bilingüe** | Acceso en ES/EN sin fricción |
| **Offline** | Leer sin conexión a internet |
| **Privado** | Sin publicidad, datos protegidos |
| **Compartible** | Difundir ideas con amigos |

### Diferenciación vs Competencia
| Aspecto | Nosotros | Competencia |
|--------|----------|-------------|
| **Contenido** | 365 revelaciones únicas + IA | Repetidas o pocas |
| **Experiencia** | PWA offline + cloud sync | Solo web o app pesada |
| **Privacidad** | Sin publicidad, sin tracking | Full ads, datos vendidos |
| **Idioma** | Bilingüe desde day 1 | Monolingüe |
| **Comunidad** | Compartir colecciones | Solo lectura individual |

---

## ⭐ Funcionalidades Principales

### 1. **Revelación del Día** (Home Screen)
**Descripción:** Mostrar una revelación diaria única basada en el calendario

**Características:**
- Revelación automática según fecha (dayOfYear % 365)
- Badge "Revelación de hoy" con animación
- Palabra en grande (6xl)
- Definición de Bierce en cursiva
- GIF animado relacionado (Giphy API)
- Texto de reflexión incómoda
- Botón compartir (Web Share API)
- Botón guardar favorita
- Navegación anterior/siguiente

**Requisitos:**
- Cargar en <1s
- GIF fallo: mostrar 5 fallbacks locales
- Responsive: móvil + desktop

### 2. **Biblioteca Completa** (Library Screen)
**Descripción:** Búsqueda y filtrado de 365 revelaciones

**Características:**
- Búsqueda en tiempo real (debounce 300ms)
- Filtro por categoría (8 categorías)
- Vista en lista con preview
- Click → ir a Home con esa revelación
- Mostrador dinámico (N/365)

**Requisitos:**
- Búsqueda <100ms en 365 items
- Soportar caracteres acentuados
- Case-insensitive

### 3. **Categorías** (Categories Screen)
**Descripción:** 8 categorías de revelaciones

**Categorías:**
1. **Éxito** - Crítica al éxito material
2. **Amor** - Sarcasmo sobre relaciones
3. **Dinero** - Burla del capitalismo
4. **Poder** - Crítica política y autoritaria
5. **Relaciones** - Dinámicas sociales
6. **Filosofía** - Conceptos abstractos
7. **Política** - Sátira política
8. **Sociedad** - Comportamiento colectivo

**Características:**
- Grid 2x2 de categorías
- Click → ListaDetail de categoría
- Contador de revelaciones por categoría
- Ordenamiento flexible (Nuevas/Alfabético)

### 4. **Guardadas (Favoritas)** (Favorites Screen)
**Descripción:** Colección personalizada de revelaciones

**Características:**
- Listar todas las guardadas
- Eliminar de favoritas
- Ordenar por: Fecha, Nombre, Categoría
- Exportar como JSON
- Contador de favoritas
- Timestamp de cada guardada
- Sincronización con cloud (Firebase)

**Requisitos:**
- Almacenamiento IndexedDB local
- Sync automático si hay usuario
- Funcionar offline

### 5. **Estadísticas** (Stats Screen)
**Descripción:** Analítica de uso del usuario

**Métricas:**
- Total de revelaciones guardadas
- Categoría favorita (top)
- Última revelación guardada
- Desglose por categoría (barras)
- Tiempo de uso estimado
- Racha de días consecutivos

**Requisitos:**
- Actualizar en tiempo real
- Visualización clara

### 6. **Autenticación** (Auth System)
**Descripción:** Login con Google o Email/Password

**Métodos:**
- **Google Sign-In** (OAuth 2.0)
- **Email/Password** (Firebase Auth)
- **Registro** (crear cuenta nueva)
- **Logout** (cerrar sesión)

**Flujo:**
1. Click 🔐 en nav
2. Elegir método
3. AuthScreen modal
4. Sincronizar favoritas
5. Mostrar UserProfile bar

**Requisitos:**
- SPA sin refresh
- Mantener sesión
- Error handling claro

### 7. **Sincronización en Cloud** (Firebase Sync)
**Descripción:** Backup automático y multi-dispositivo

**Características:**
- Guardar favoritas en Firestore
- Sincronización cada 30s si online
- Funciona offline (local-first)
- Indicador de sincronización
- Última sincronización mostrada

**Requisitos:**
- Automático (sin botones)
- Bidireccional
- Conflictos: último gana

### 8. **Bilingüismo** (i18n)
**Descripción:** Soporte ES/EN en toda la app

**Idiomas:**
- **Español** (default) 🇲🇽
- **English** (toggle) 🇺🇸

**Elementos a traducir:**
- Todas las revelaciones (ES/EN)
- UI labels
- Botones
- Mensajes de error
- Help text

**Requisitos:**
- Toggle en TopNav (flag)
- Persistir en IndexedDB
- Cambio instantáneo

### 9. **PWA (Progressive Web App)**
**Descripción:** Instalar en dispositivo como app nativa

**Características:**
- Instalable en home screen
- Funciona offline (Service Worker)
- Web manifest
- Icons responsive
- Splash screen
- Cache first strategy
- Auto-update con confirmación

**Requisitos:**
- Funcionar sin internet
- <2s cargar favoritas offline
- Actualizaciones silenciosas

### 10. **Compartir** (Share Features)
**Descripción:** Compartir revelaciones en redes sociales

**Métodos:**
- Web Share API (nativos del SO)
- Copy to clipboard (fallback)
- Enlace directo a revelación
- Incluir GIF en compartir

**Requisitos:**
- Formato atractivo
- Funcionar en todos los SO
- Tracking de shares (analytics)

---

## 🏗️ Especificaciones Técnicas

### Stack Tecnológico

**Frontend:**
- React 19 + Vite 8 (build tool)
- Tailwind CSS 4 (estilos)
- JavaScript ES2024

**Backend:**
- Firebase Auth (autenticación)
- Firestore (base de datos)
- Firebase Hosting (deployment)

**Storage:**
- IndexedDB (local, offline)
- Firestore (cloud, multi-device)

**APIs Externas:**
- Giphy API (GIFs dinámicos)
- Web Share API (compartir)

**DevOps:**
- Vite para build
- Vercel para hosting
- GitHub para versionado

### Arquitectura

```
┌─────────────────────────────────┐
│     React App (Vite)            │
├─────────────────────────────────┤
│  Components (9)                 │
│  Screens (7)                    │
│  Hooks (4)                      │
├─────────────────────────────────┤
│     Capa de Datos               │
├──────────────┬──────────────────┤
│ IndexedDB    │   Firebase       │
│ (local)      │   (cloud)        │
└──────────────┴──────────────────┘
```

### Performance Targets

| Métrica | Target |
|---------|--------|
| FCP | <1s |
| LCP | <1.5s |
| CLS | <0.1 |
| TTI | <2s |
| Bundle Size | <300KB |
| Cache Hit | >90% |

### Requisitos de Hardware

**Mínimo:**
- Mobile: iOS 12+, Android 8+
- Desktop: Chrome 90+, Firefox 88+
- RAM: 512MB
- Storage: 10MB

**Recomendado:**
- Mobile: iOS 15+, Android 12+
- Desktop: Chrome/Firefox último
- RAM: 2GB+
- Storage: 50MB

---

## 📋 Requisitos Funcionales Detallados

### RF-001: Mostrar Revelación del Día

**Actor:** Usuario no autenticado  
**Precondición:** App abierta  
**Flujo:**
1. App carga
2. Calcula día del año (dayOfYear)
3. Selecciona revelación: `revelations[dayOfYear % 365]`
4. Obtiene GIF de Giphy
5. Renderiza con animaciones

**Resultado esperado:** Revelación visible en <1s  
**Casos de fallo:**
- Giphy API falla → mostrar GIF fallback
- Sin internet → cargar revelación local

---

### RF-002: Guardar Revelación como Favorita

**Actor:** Usuario autenticado  
**Precondición:** Revelación visible  
**Flujo:**
1. Click botón "❤️ Guardar"
2. Guardar en IndexedDB local
3. Si online y logueado: subir a Firestore
4. Mostrar feedback: "Guardado ✓"
5. Cambiar botón a "❤️ Guardado"

**Resultado esperado:** Revelación en lista favoritas  
**Sincronización:** Auto cada 30s si hay usuario

---

### RF-003: Buscar Revelaciones

**Actor:** Usuario  
**Precondición:** En LibraryScreen  
**Flujo:**
1. Escribir en buscador
2. Debounce 300ms
3. Filtrar en tiempo real
4. Mostrar resultados (palabra/definición)

**Resultado esperado:** Búsqueda <100ms  
**Búsqueda:** Case-insensitive, acentos ignorados

---

### RF-004: Cambiar Idioma

**Actor:** Usuario  
**Precondición:** App abierta  
**Flujo:**
1. Click flag (🇲🇽/🇺🇸) en TopNav
2. Guardar en IndexedDB
3. Actualizar toda la UI instantáneamente
4. Persistir para próxima sesión

**Resultado esperado:** Todo en ES o EN  
**Requisito:** Sin refresh de página

---

### RF-005: Autenticarse con Google

**Actor:** Usuario anónimo  
**Precondición:** Click botón "🔐"  
**Flujo:**
1. Mostrar AuthScreen
2. Click "Continuar con Google"
3. Popup OAuth de Google
4. Usuario aprueba permisos
5. Crear perfil en Firestore
6. Sincronizar favoritas
7. Mostrar UserProfile bar

**Resultado esperado:** Sesión activa  
**Errores:** Mostrar mensaje si falla

---

### RF-006: Sincronizar Favoritas en Cloud

**Actor:** Sistema (background)  
**Precondición:** Usuario logueado y online  
**Flujo:**
1. Cada 30s: comparar local vs Firestore
2. Subir favoritas que falten en cloud
3. Bajar favoritas que falten en local
4. Actualizar timestamp
5. Mostrar indicador "✓ Sincronizado hace Xs"

**Resultado esperado:** Multi-dispositivo sincronizado  
**Offline:** Guardar localmente, sincronizar luego

---

### RF-007: Ver Estadísticas

**Actor:** Usuario autenticado  
**Precondición:** Click 📊 en nav  
**Flujo:**
1. Cargar datos de IndexedDB + Firestore
2. Calcular métricas
3. Mostrar cards con datos
4. Mostrar gráfico categorías

**Resultado esperado:** Stats en <500ms  
**Datos:** Total guardadas, top categoría, últimas, desglose

---

### RF-008: Instalarse como PWA

**Actor:** Usuario en navegador  
**Precondición:** App en HTTPS  
**Flujo:**
1. Browser sugiere instalar
2. Click "Instalar"
3. App en home screen
4. Abre como app full-screen
5. Service Worker cachea recursos

**Resultado esperado:** App instalada, icono en home  
**Offline:** Funciona completamente sin internet

---

### RF-009: Compartir Revelación

**Actor:** Usuario  
**Precondición:** Revelación visible  
**Flujo:**
1. Click botón "🔗 Compartir"
2. Si Web Share API disponible: abrir nativo
3. Si no: copiar a clipboard
4. Incluir: palabra, definición, URL

**Resultado esperado:** Compartido en WhatsApp/Twitter/etc  
**Fallback:** Copiar a clipboard automático

---

### RF-010: Explorar Categorías

**Actor:** Usuario  
**Precondición:** En CategoriesScreen  
**Flujo:**
1. Ver grid 2x2 de 8 categorías
2. Click en categoría
3. Ir a CategoryDetailScreen
4. Mostrar todas las revelaciones de esa categoría
5. Click una → ir a Home con esa seleccionada

**Resultado esperado:** Navegación fluida  
**Ordenamiento:** Nuevas primero o alfabético

---

## ✅ Criterios de Éxito

### Métricas de Adopción
- ✅ 1,000 MAU en primer mes
- ✅ 500+ PWA installations
- ✅ 50 daily active users (DAU)

### Métricas de Engagement
- ✅ 80%+ abren app diariamente
- ✅ 100+ revelaciones guardadas por usuario promedio
- ✅ 10+ compartidas por sesión

### Métricas Técnicas
- ✅ 99.5% uptime
- ✅ <1s FCP en 4G
- ✅ <100ms búsqueda en 365 items
- ✅ <2s load offline

### Métricas de Calidad
- ✅ 0 bugs críticos en producción
- ✅ 95%+ test coverage
- ✅ 100% WCAG AA compliance
- ✅ 90+ Lighthouse score

### Métricas de Negocio
- ✅ NPS > 50
- ✅ Retención semanal > 80%
- ✅ Share rate > 15%
- ✅ Cost per user < $0.50

---

## 🗺️ Roadmap Futuro

### Fase 6: Launch (Agosto 2026)
- Deploy en Vercel
- Publicar en stores (optional)
- Marketing inicial
- Monitoreo de errores (Sentry)

### Fase 7: Post-Launch (Septiembre 2026)
- Notificaciones diarias
- Email digests semanales
- Analytics mejorado
- Feedback de usuarios

### Fase 8: Expansión (Q4 2026)
- Agregar 6 idiomas más
- Colecciones compartibles públicas
- Leaderboard de shares
- Soporte premium (sin ads)

### Fase 9: Comunidad (2027)
- Usuario profiles
- Comentarios en revelaciones
- Desafíos mensuales
- API pública para devs

### Fase 10: Monetización (H2 2027)
- Suscripción premium
- Eliminar anuncios
- Contenido exclusivo
- Merch (t-shirts, etc)

---

## 🔒 Consideraciones de Seguridad

### Autenticación
- ✅ Firebase Auth (OAuth 2.0)
- ✅ Tokens JWT automáticos
- ✅ Session timeout 30 días
- ✅ 2FA disponible (futuro)

### Datos
- ✅ HTTPS obligatorio
- ✅ Encriptación en tránsito
- ✅ Firestore rules restrictivas
- ✅ GDPR compliant

### Privacidad
- ✅ No vendemos datos
- ✅ Sin publicidad de terceros
- ✅ Opción borrar cuenta
- ✅ Transparencia política

### Protección contra Ataques
- ✅ Rate limiting en Auth
- ✅ Input validation
- ✅ CORS configurado
- ✅ CSP headers

---

## 📊 Métricas a Monitorear

### Analytics
```javascript
// Eventos a trackear
- app_opened
- revelation_viewed
- revelation_saved
- revelation_shared
- search_performed
- language_changed
- auth_completed
- sync_completed
- error_occurred
```

### Monitoreo
- Sentry para errores
- Google Analytics para uso
- Firebase Analytics
- Custom dashboard

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ iPhone 11+
- ✅ Android 8+
- ✅ Tablets
- ✅ Desktop (1024px+)

### Accesibilidad
- ✅ WCAG 2.1 AA
- ✅ Screen readers
- ✅ Keyboard nav
- ✅ High contrast mode

---

## 📚 Dependencias

### NPM Packages
```json
{
  "react": "^19.0.0",
  "vite": "^8.0.0",
  "tailwindcss": "^4.0.0",
  "firebase": "^10.0.0",
  "axios": "^1.6.0"
}
```

### APIs Externas
- Giphy API (GIFs)
- Firebase (Auth + DB)
- Web Share API (Compartir)

### CDNs
- Tailwind CSS (CDN o local)
- Fonts (Google Fonts o local)

---

## 🎯 Definición de Éxito (6 meses)

- [ ] 10,000 MAU
- [ ] 100,000 revelaciones guardadas totales
- [ ] 10,000+ compartidas
- [ ] 95%+ retention semanal
- [ ] Rating 4.5+ en stores
- [ ] $0 marketing cost (viral)
- [ ] $10k MRR (premium users)

---

## 📝 Notas Finales

### Visión a Largo Plazo
Convertir "Revelaciones del Diablo" en la app diaria #1 para humor satírico e ironía. Expandir a múltiples medios (newsletter, podcast, libro) y crear una comunidad global de lectores críticos.

### Misión
Entregar reflexión satírica de calidad diaria que haga sonreír y pensar a nuestros usuarios sobre la realidad de la sociedad moderna.

### Valores
- 🎭 **Humor inteligente:** Sarcasmo sin malicia
- 🔐 **Privacidad:** Datos del usuario sagrados
- 🌍 **Inclusión:** Bilingüe desde día 1
- ⚡ **Velocidad:** App rápida, ligera, offline-first
- 🤝 **Comunidad:** Compartir es central

---

## ✍️ Aprobado por

| Rol | Nombre | Fecha |
|-----|--------|-------|
| Product Manager | Claude (Anthropic) | 22 Ago 2026 |
| Desarrollador | Claude (Anthropic) | 22 Ago 2026 |
| Designer UX | Claude (Anthropic) | 22 Ago 2026 |

---

**Documento versionado:** v1.0  
**Próxima revisión:** Septiembre 2026  
**Estado:** ✅ APROBADO - LISTO PARA PRODUCCIÓN

Hecho con 🔥 y Claude (Anthropic)
