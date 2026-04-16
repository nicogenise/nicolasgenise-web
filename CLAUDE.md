# nicolasgenise.org — Design Context

Sitio personal/profesional del Dr. Nicolás Genise (psicólogo clínico). HTML estático + Tailwind CSS v3 + deploy Vercel. Repo en GitHub `nicogenise/nicolasgenise-web`.

## Frontend Theme (LOCKED — no improvisar)

<always_use_clinical_editorial_theme>
Este sitio SIEMPRE usa estética **Clinical Editorial** — profesional, serena, con peso editorial académico. NUNCA aplicar estilos genéricos "AI slop" (Inter + gradient púrpura + cards redondeadas). NUNCA cambiar paleta ni tipografías sin aprobación explícita.

**Paleta (fija)**
- Azul profundo primario: `#071B28` `#0B1929` `#112240` `#1B4F72`
- Azul medio: `#1a5a80` `#1d6a94` `#2874A6` `#3d8ab8`
- Azul claro / accent: `#5DADE2`
- Verde clínico: `#10B981` (usos puntuales — CTAs, badges de éxito)
- Textos claros sobre oscuro: `#E0E7EF` `#f8fafc` `#ffffff`
- Grises neutros: `#5A6B7F` `#8892A4`
- Accent naranja cálido: `#FF9900` `#FFB84D` (hero highlights, solo detalles)
- Alertas: `#EF4444`

**Tipografías (fijas, via Google Fonts)**
- Headlines/titulos: **Playfair Display** (serif, weights 400-700 + 400 italic)
- Cuerpo/UI: **Source Sans 3** (sans-serif, weights 300-700)
- NUNCA usar Inter, Poppins, Roboto, Lato u otros defaults

**Principios**
- Jerarquía editorial: titular serif grande + subtítulo sans + cuerpo generoso (line-height 1.6-1.75)
- Layouts con aire — márgenes amplios, no densidad de SaaS
- Imágenes con tratamiento cálido (ver blog thumbnails existentes)
- Sobriedad clínica: nada de gradientes llamativos, neon, glitch, brutalismo
- Tono: profesional pero humano, académico pero accesible
- Dark sections = navbar + hero + footer (fondo #071B28-#112240); contenido principal = fondo claro
</always_use_clinical_editorial_theme>

## Referencias visuales canon del sitio

Antes de diseñar cualquier página, componente o thumbnail nuevo, SIEMPRE revisar:

- `blog/tdah-inatento-ninas-diagnostico-tardio.html` — estructura canónica de artículo de blog
- `blog/images/tdah-adultos-thumbnail.webp` — estilo visual de thumbnails (ilustración cálida + texto overlay)
- `blog/images/funciones-ejecutivas-thumbnail.webp` — variante de thumbnail
- `index.html` — header/footer/hero/cards canónicos

Los thumbnails del blog siguen un patrón: ilustración con paleta cálida, texto overlay en tipografía Playfair, ratio 16:9 (1200×675 o 800×450).

## Stack de diseño disponible (Claude Code)

Cuando trabajes en este repo tenés estas skills automáticamente activas (ver `~/.claude/CLAUDE.md` para inventario completo):

**Frontend / diseño**
- `frontend-design` (oficial Anthropic) — fuerza decisión estética antes de código
- `distinctive-frontend` (Koomook) — evita AI slop
- `design:design-critique` / `design:design-system` / `design:ux-copy` / `design:accessibility-review` (plugin design)
- `brand-guidelines` / `theme-factory` — aplicación de tokens

**Generación de imágenes**
- `image-generation` skill + MCP `media-pipeline` — genera thumbnails/hero images con Google Gemini. Usar para todo thumbnail nuevo del blog.

**Calidad web**
- `wq-web-quality-audit` / `wq-performance` / `wq-accessibility` / `wq-seo` / `wq-core-web-vitals` / `wq-best-practices` (Addy Osmani — Lighthouse + Core Web Vitals)
- MCP `chrome-devtools` — inspección de consola, red, performance, CLS en vivo
- MCP `context7` — docs live de Tailwind, shadcn, etc.

**Contenido clínico**
- `psychopedagogy-content-creator` — plantilla de artículos de blog
- `apa7-citations` — citas académicas

## Workflow estándar para un artículo nuevo de blog

1. Redactar `.md` en la convención de tono (leer 2-3 artículos existentes primero)
2. Invocar `frontend-design` + leer `tdah-inatento-ninas-diagnostico-tardio.html` como plantilla
3. Generar thumbnail con `media-pipeline` MCP (aspect ratio 16:9, paleta cálida, estilo ilustración editorial)
4. Convertir thumbnail `.png` → `.webp` (consistencia con los otros)
5. Crear `.html` del artículo usando la estructura canónica
6. Agregar meta tags OG + Schema.org (ver artículos existentes)
7. Actualizar `blog/index.html` (tarjeta del artículo)
8. Actualizar `sitemap.xml`
9. Correr `wq-web-quality-audit` sobre el artículo antes de commit
10. Commit con mensaje descriptivo, push → Vercel deploy auto

## Reglas críticas

- NUNCA `git add -A` — usar paths específicos
- NUNCA cambiar paleta o tipografías del sitio sin aprobación
- NUNCA usar Canva MCP directo (Cloudflare lo bloquea) — usar `media-pipeline` para imágenes
- SIEMPRE revisar los thumbnails existentes antes de generar uno nuevo
- SIEMPRE ejecutar `wq-web-quality-audit` antes de pushear

## Deploy

Push a `main` → Vercel auto-deploy. No hay dev server — vista previa local abriendo `.html` en navegador o con `npx serve`.

## Documentación completa del proyecto

Ver `C:/Users/ngeni/Desktop/ULISES ASISTAND/proyectos/NICOLASGENISE_WEB_GUIA.md`
