# Arquitectura del Portfolio — freedomappload.es

## 1. Identidad de marca

| Campo | Valor |
|---|---|
| Dominio | freedomappload.es |
| Nombre de marca | **freedomappload** |
| Nombre del desarrollador | **Antonio Palomo** |
| Tagline | Código limpio, productos memorables |
| Idioma principal | Español |

---

## 2. Sitemap funcional

```
/ (Home)
├── /apps/
│   ├── /apps/dgtest/
│   └── /apps/connectall/
├── /projects/
│   └── /projects/maestro-cocinero/
├── /blog/
└── /about/
```

Páginas auxiliares (fuera del hub principal):
- `/privacy-policy-connectall.html`
- `/privacy-policy-dgtest.html`
- `/app-ads.txt`

---

## 3. Estructura de URLs limpias

| Página | URL | Descripción |
|---|---|---|
| Home | `/` | Hero carousel + about snippet + CTA |
| Listado apps | `/apps/` | Catálogo de aplicaciones móviles publicadas |
| Detalle app | `/apps/{slug-app}/` | Ficha individual de cada app |
| Listado proyectos | `/projects/` | Catálogo de proyectos web y otros |
| Detalle proyecto | `/projects/{slug-proyecto}/` | Ficha individual de cada proyecto |
| Blog | `/blog/` | Artículos y notas técnicas |
| Sobre mí | `/about/` | Biografía, stack, contacto |

### Slugs actuales

| Nombre | Tipo | Slug |
|---|---|---|
| DGTest Autoescuela | App | `dgtest` |
| ConnectAll | App | `connectall` |
| Maestro Cocinero | Proyecto web | `maestro-cocinero` |

---

## 4. Navegación principal

```
[freedomappload]   Apps   Proyectos   Blog   Sobre mí
```

- Logo/nombre a la izquierda → enlaza a `/`
- Ítems de navegación a la derecha: Apps (`/apps/`), Proyectos (`/projects/`), Blog (`/blog/`), Sobre mí (`/about/`)
- En móvil: menú hamburguesa colapsable

---

## 5. Footer

```
© {año} Antonio Palomo · freedomappload
Apps | Proyectos | Blog | Sobre mí | LinkedIn | GitHub
Código limpio, productos memorables.
```

---

## 6. Criterios SEO por sección

| Sección | `<title>` | Meta description |
|---|---|---|
| `/` | `Antonio Palomo · freedomappload` | Desarrollador móvil y web. Apps y proyectos que generan tracción real. |
| `/apps/` | `Apps · freedomappload` | Aplicaciones móviles Android publicadas en Google Play. |
| `/apps/dgtest/` | `DGTest Autoescuela · Apps · freedomappload` | Simulacros oficiales de examen de conducir con analítica de progreso. |
| `/apps/connectall/` | `ConnectAll · Apps · freedomappload` | Juego de puzzle para móvil. Conecta todos los puntos sin cruzar trazos. |
| `/projects/` | `Proyectos · freedomappload` | Proyectos web y de producto desarrollados por Antonio Palomo. |
| `/projects/maestro-cocinero/` | `Maestro Cocinero · Proyectos · freedomappload` | Portal de recetas personalizadas con buscador por ingredientes. |
| `/blog/` | `Blog · freedomappload` | Artículos sobre desarrollo móvil, web y producto. |
| `/about/` | `Sobre mí · freedomappload` | Desarrollador móvil y web. Stack, proceso de trabajo y contacto. |

---

## 7. Decisiones técnicas

- Sitio estático alojado en **GitHub Pages** con dominio personalizado `freedomappload.es`
- Sin framework de build: HTML + CSS + JS vanilla
- Cada sección es una carpeta con su propio `index.html` → URLs limpias sin `.html`
- Estilos y scripts inline en cada página (sin CDN de CSS externo salvo Google Fonts)
- Fuente: **Space Grotesk** (Google Fonts)
- Paleta: fondo `#070707`, texto `#f1f1f1`, acento `#6ef3a5` (dark) / `#16c37b` (light)
