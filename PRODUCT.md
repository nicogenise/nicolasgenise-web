# nicolasgenise.org — Producto

## Qué es

Sitio personal/profesional del **Dr. Nicolás Genise** (psicólogo clínico, doctor en psicología, director académico). Cumple dos funciones simultáneas:

1. **Captar estudiantes** para la **Especialización en Psicopedagogía Clínica** (Universidad de Flores — UFLO), cohorte Abril 2026, 30 cupos. Posgrado de 408 horas, 12 meses, 100% virtual, acreditación CONEAU.
2. **Construir autoridad profesional** del Dr. Genise como referente clínico-académico, vía blog editorial, charlas y material descargable.

## Register

**Brand.** Cada decisión visual ES la identidad — no sirve a una funcionalidad de producto. Es revista, no app.

## Users

### Persona primaria — "Lic. Vanesa, 32"

Psicopedagoga argentina o latinoamericana con título de grado, 3-7 años de práctica clínica. Trabaja en consultorio privado, gabinete escolar o equipo interdisciplinario. Quiere especializarse para diferenciarse, cobrar mejor, tener autoridad en informes y diagnósticos. Investiga ofertas de posgrado online entre dos cafés. Le importan: **acreditación CONEAU**, **flexibilidad horaria**, **prácticas reales**, **título con validez nacional**, **pertenencia a una comunidad profesional**.

Lo que NO le importa: gamificación, badges, "transforma tu vida", cursos rápidos.

### Persona secundaria — "Dr./Lic. consultor"

Profesional clínico (psicólogo, médico, fonoaudiólogo) que busca al Dr. Genise para supervisión, derivaciones o colaboración en investigación. Llega al sitio buscando credenciales y contacto. Le importa: trayectoria académica concreta, publicaciones, instituciones (Ackerman, Gandara Center, UFLO), forma de contacto profesional.

### Persona terciaria — "Familia que busca evaluación"

Padre/madre que busca evaluación neuropsicológica para hijo/a. Llega vía Google, comparte el sitio con pareja, deriva al WhatsApp/email. Le importa: confianza, claridad sobre qué se evalúa, cuánto cuesta, dónde, con quién.

## Anti-references

Lo que el sitio **NO debe parecerse a**:

- **Coursera / Domestika / Crehana** — gamificación, descuentos llamativos, badges, "estudiantes felices". Nuestro tono es más cercano a una facultad seria, no a un marketplace educativo.
- **Sitios de gurúes de productividad / coaching** — fondos negros con neón, frases motivacionales, "transforma tu carrera en 90 días". Anti-pattern total.
- **SaaS dashboards** — Inter + cards densas + gradientes púrpura. Nuestro registro es editorial, no producto.
- **Sitios de IA genéricos** — "AI-cool dark UI" con colored glows, icon-tiles encima de headings, fondos morados-rosas, Inter/Poppins.

## Strategic principles

1. **Autoridad sin solemnidad.** Académico pero accesible. El Dr. Genise tiene credenciales (Ackerman NYC, Gandara Boston, doctorado, dirección académica) — el sitio las muestra sin pomposidad. Tono profesional con calidez humana.
2. **Confianza por sustancia, no por adornos.** Datos concretos: 408 horas, CONEAU, 12 meses, prácticas supervisadas, claustro real con CV en vivo. Cero buzzwords.
3. **Lectura larga como diferencial.** El blog es académico-editorial — artículos de 1500-3000 palabras con citas, referencias, casos. Gente que lee acá, lee en serio. La tipografía Playfair refuerza esa expectativa.
4. **Conversión sin urgencia falsa.** Sin countdown timers, sin "solo 3 cupos", sin pop-ups agresivos. CTA primarios claros (`#FF9900`), pero la decisión se invita, no se presiona.
5. **Accesibilidad ética y técnica.** WCAG AA mínimo. Audiencia incluye profesionales clínicos que pueden tener pacientes con baja visión — exclusión visual del propio sitio sería contradicción ética.

## Voice & Tone

- **Voz**: serena, precisa, primera persona del plural ("trabajamos con", "evaluamos") cuando habla del trabajo clínico; primera persona singular ("dirijo", "investigo") cuando habla el Dr. Genise.
- **Vocabulario**: clínico-académico estándar (formulación, supervisión, evaluación neuropsicológica, dificultades del aprendizaje). Spanish del Río de la Plata, formal pero no acartonado.
- **Length**: oraciones medias-largas, párrafos respirables. La lectura tiene ritmo editorial, no SaaS.
- **Pronombre con el lector**: "vos" (Argentina/Uruguay) en blog y CTAs informales; "usted" en formularios oficiales y contacto institucional.

## Constraints técnicas que afectan diseño

- **Stack**: HTML estático + Tailwind CSS v3.4 + Vercel. Sin framework JS. Builds compilan Tailwind a `dist/styles.css`.
- **Sin dev server** — preview local con `npx serve` o abrir HTML directo.
- **SEO crítico**: Schema.org JSON-LD obligatorio en cada page (Course, Person, Article).
- **Open Graph + Twitter Cards** obligatorios — el sitio se comparte por WhatsApp/LinkedIn/Twitter, las preview cards son la primera impresión.
- **Imágenes**: WebP en todos los thumbs nuevos; lazy-load por defecto.
