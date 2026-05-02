---
version: alpha
name: Clinical Editorial
description: Estética profesional, serena y con peso editorial académico para nicolasgenise.org. Sobriedad clínica, jerarquía editorial, sin AI slop.
register: brand
colors:
  primary: "#1B4F72"
  primary-dark: "#0E2F44"
  primary-darker: "#0B1929"
  primary-darkest: "#071B28"
  primary-mid: "#2874A6"
  primary-mid-warm: "#1d6a94"
  primary-mid-cool: "#1a5a80"
  primary-mid-light: "#3d8ab8"
  accent: "#5DADE2"
  highlight: "#FF9900"
  highlight-soft: "#FFB84D"
  success: "#10B981"
  alert: "#EF4444"
  decorative-line: "#48C9B0"
  dark-bg: "#0B1929"
  dark-card: "#112240"
  dark-text: "#E0E7EF"
  text-on-light: "#0E2F44"
  text-muted: "#5A6B7F"
  text-subtle: "#8892A4"
  surface-light: "#FFFFFF"
  surface-soft: "#F8FAFC"
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 4rem
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.02em
  h1:
    fontFamily: Playfair Display
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.01em
  h2:
    fontFamily: Playfair Display
    fontSize: 2.25rem
    fontWeight: 600
    lineHeight: 1.2
  h3:
    fontFamily: Playfair Display
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  body-lg:
    fontFamily: Source Sans 3
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: Source Sans 3
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Source Sans 3
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
  label-caps:
    fontFamily: Source Sans 3
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.1em
  ui-base:
    fontFamily: Source Sans 3
    fontSize: 1rem
    fontWeight: 500
    lineHeight: 1.4
rounded:
  none: 0
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
components:
  nav:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.primary}"
    height: 64px
    padding: "{spacing.md}"
  hero-gradient:
    backgroundColor: "linear-gradient(135deg, {colors.primary} 0%, {colors.primary-mid} 50%, {colors.accent} 100%)"
    textColor: "{colors.surface-light}"
    padding: "{spacing.4xl}"
  cta-primary:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.surface-light}"
    typography: "{typography.ui-base}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  cta-primary-hover:
    backgroundColor: "{colors.highlight-soft}"
  card-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-on-light}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  card-dark:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  section-label:
    typography: "{typography.label-caps}"
    textColor: "{colors.highlight}"
  decorative-rule:
    backgroundColor: "{colors.highlight}"
    height: 3px
    width: 60px
---

## Overview

**Clinical Editorial.** El sitio comunica un programa de posgrado universitario (Especialización en Psicopedagogía Clínica, UFLO) dirigido por el Dr. Nicolás Genise. La estética combina **minimalismo arquitectónico** con **gravitas editorial** — pensar en una revista académica seria de papel mate, no en un SaaS de Silicon Valley.

El sitio es **brand**, no product: cada decisión visual es identidad, no funcionalidad.

## Colors

Paleta dominada por azules profundos (autoridad clínica, confianza académica) con un naranja cálido `#FF9900` como único driver de interacción. La estrategia es **Restrained**: tinted neutrals + un accent ≤10% de la superficie. Los azules medios y el celeste `#5DADE2` actúan como puentes tonales.

- **Primary `#1B4F72`** — azul institucional, navbars, headers, texto sobre claro.
- **Primary-darkest `#071B28`** — fondos oscuros (dark sections: navbar transparente, hero, footer).
- **Primary-mid `#2874A6`** — gradientes, fondos secundarios.
- **Accent `#5DADE2`** — enlaces, hover states, acentos.
- **Highlight `#FF9900`** — CTAs, badges "NUEVO", líneas decorativas bajo H2. **Único color que dispara acción.**
- **Decorative-line `#48C9B0`** — líneas turquesa puntuales bajo títulos H2 (60px × 3px).
- **Success `#10B981`** — verde clínico para badges de éxito (uso muy puntual).

**Anti-uso**: nada de gradientes púrpura ni neón. Nada de "AI cool dark" con glows de colores saturados.

## Typography

**Playfair Display** (serif, Google Fonts) carga toda la jerarquía editorial: titulares, subtítulos, contadores. Italic disponible para énfasis editorial.

**Source Sans 3** (sans-serif, Google Fonts) lleva cuerpo, navegación y UI. Pesos 300-700.

- Body line-length objetivo: **65-75ch** (control con `max-w-prose` o `max-w-3xl`).
- Body line-height: **1.65-1.75** (generoso, lectura larga).
- Ratio entre pasos tipográficos: **≥1.25** (jerarquía clara, no flat scale).
- Labels uppercase con `letter-spacing: 0.1em` para overline tags y section labels.

**Anti-uso**: Inter, Roboto, Lato, Poppins, system defaults. Si Google Fonts no carga, fallback a `Georgia, serif` (titulares) y `system-ui, sans-serif` (cuerpo) — aceptado, pero degradado.

## Layout

Container principal: `max-w-6xl` (1152px). Breakpoint principal: `md: 768px`.

- **Aire generoso**: márgenes verticales entre secciones de 64-96px. Densidad de SaaS prohibida.
- **Ritmo asimétrico**: el spacing varía por sección (hero amplio, contenido medio, footer compacto). Misma padding everywhere = monotonía.
- **Grid editorial**: en blog, una sola columna centrada con max-width 65ch. Sidebars solo cuando aportan navegación real.

## Elevation & Depth

Sombras suaves, no glows. Cards con `box-shadow: 0 1px 3px rgba(7, 27, 40, 0.08)` en estado base; hover `translateY(-4px)` + sombra mayor. **Nunca** colored glow sobre dark backgrounds.

## Shapes

Bordes redondeados moderados: `rounded.md (8px)` para cards y CTAs, `rounded.full` solo para botón "Back to top" y avatares. Bordes rectos (rounded.none) en líneas decorativas y separadores.

## Components

| Componente | Uso |
|---|---|
| **Nav fija** | Blanca translúcida con backdrop-blur, dark mode invierte a primary-darkest. |
| **Hero gradient** | 135deg primary → primary-mid → accent. Solo en home. Partículas radiales sutiles permitidas. |
| **Section header** | Línea decorativa 60×3px highlight + label uppercase + título Playfair. **Patrón canónico** del sitio. |
| **Card hover** | `translateY(-4px)` + box-shadow. Nunca scale, nunca rotate. |
| **Stat cards (glass)** | `rgba(255,255,255,0.12)` + backdrop-blur. Solo en hero/dark sections. |
| **CTA primary** | Naranja `#FF9900`, texto blanco, `rounded.md`. Único color que dispara acción. |
| **Newsletter form** | Input + botón naranja, validación con shake animation suave. |
| **Footer** | primary-darkest, 4 columnas (brand, enlaces, contacto, LinkedIn). |
| **Back to top** | Circular fijo, aparece después de 600px scroll. |
| **Scroll progress bar** | 1px top, gradiente naranja-celeste. |
| **Scroll reveal** | IntersectionObserver, `translateY(30px)` fade-in suave. |

## Do's and Don'ts

### Do

- Usar Playfair para todo lo que tenga peso narrativo o académico.
- Aire entre secciones (mínimo 64px de margen vertical).
- Color naranja `#FF9900` exclusivamente para acciones; protege su poder semántico.
- Imágenes con tratamiento cálido (ver `blog/images/*-thumbnail.webp` como canon).
- Tono profesional pero humano: académico sin esnobismo.

### Don't

- ❌ Cambiar paleta o tipografías sin aprobación explícita del Dr. Genise.
- ❌ Cards anidadas dentro de cards (cards-in-cards = AI slop).
- ❌ Inter, Poppins, Roboto u otros defaults de IA.
- ❌ Gradientes púrpura-rosa (paleta de IA genérica).
- ❌ Bounce/elastic easing en animaciones (feels dated).
- ❌ Iconos cuadrados 48×48 apilados encima de h3 (`icon-tile-stack` — patrón AI feature-card).
- ❌ Texto blanco sobre celeste `#5DADE2` (no pasa WCAG AA).
- ❌ Naranja `#FF9900` sobre blanco `#FFFFFF` para texto (no pasa WCAG AA, contrast 2.1:1).
- ❌ All-caps en cuerpo de párrafo (reservar para labels cortos).
- ❌ Animaciones sobre `width`, `height`, `padding`, `margin` (layout thrash).
