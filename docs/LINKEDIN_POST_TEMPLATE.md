# LinkedIn Post Template — nicolasgenise.org

Guía y plantilla para cross-postear artículos del blog a LinkedIn como posts nativos.

## Decisión de diseño (2026-04-17)

Optamos por **publicación manual con plantilla** en lugar de automatización (n8n / GitHub Action / Buffer / Zapier). Razones:

1. **Volumen bajo** (~1-2 artículos/mes): el ROI de montar infra de automatización es negativo.
2. **Algoritmo LinkedIn penaliza outbound links**: posts con link en el cuerpo alcanzan 5-10× menos que posts nativos con el link en el primer comentario. Una automatización que postea con link embebido te sabotea el alcance.
3. **El valor está en reescribir el hook**, no en enviar. Un post de LinkedIn no es el mismo texto que el artículo — necesita gancho inicial + insight específico + CTA. La parte humana es la que genera engagement.
4. **Upgrade path claro**: si el ritmo sube a 4+ posts/mes en 6 meses, migrar a GitHub Action + LinkedIn API es una tarde de trabajo. No estamos cerrando puertas.

## Checklist de publicación (5 pasos)

Cuando un artículo nuevo se publica en `nicolasgenise.org/blog/...`:

1. **Abrir el artículo en el navegador** y copiar 2-3 datos concretos que puedan funcionar de hook (estadística, instrumento, rango de edad, insight clínico).
2. **Redactar el post en LinkedIn** siguiendo la estructura de abajo. Escribirlo directo en el composer de LinkedIn web (no en móvil — el editor es peor).
3. **NO pegar el link en el cuerpo del post**. Dejar espacio al final con algo como "Link al artículo completo en el primer comentario".
4. **Publicar el post**. Inmediatamente después, agregar **primer comentario propio con el link** a `https://nicolasgenise.org/blog/...`.
5. **Registrar en bitácora de ULISES**: fecha del post + URL del artículo + URL del post de LinkedIn. Sirve para medir tracción cruzada con GSC.

## Estructura del post

```
[HOOK · 1 línea que detenga el scroll — pregunta incómoda, dato contraintuitivo, o afirmación contra el sentido común]

[CONTEXTO · 1-2 líneas que sitúan por qué el hook importa clínicamente]

[INSIGHT · 3-5 líneas con lo que el artículo aporta que otros no. Datos concretos (instrumentos, rangos etarios, % de evidencia). Sin jerga vacía.]

[CTA · 1 línea invitando a leer el artículo completo. "Link al artículo en el primer comentario."]

#hashtag1 #hashtag2 #hashtag3
```

## Reglas de formato

- **Largo ideal**: 1.200–1.500 caracteres (LinkedIn corta en ~200 chars sin "ver más"; el gancho tiene que estar antes).
- **Sin emojis decorativos**. Máximo uno para separar secciones si es necesario.
- **Espacios en blanco son tus amigos**: separar por bloques de 1-2 líneas. Párrafos densos pierden lectores.
- **Hashtags al final**, 3-5 máx. Específicos del dominio (ej. `#Psicopedagogía #NeurocienciasEducativas #TDAH`), no genéricos (`#Educación`).
- **Nada de "En este artículo hablo de..."**. Dar el insight, no anunciarlo.

## Hashtags recomendados por tema

| Tema del artículo | Hashtags |
|---|---|
| Funciones ejecutivas / TDAH | `#Psicopedagogía #FuncionesEjecutivas #TDAH #Neuroeducación` |
| Evaluación psicopedagógica | `#EvaluaciónPsicopedagógica #PsicopedagogíaClínica #Diagnóstico` |
| Fenómeno impostor / universitarios | `#PsicologíaUniversitaria #SaludMental #Aprendizaje` |
| IA y educación | `#IAEducación #FuturoDeLaEducación #Aprendizaje` |
| General UFLO / Especialización | `#UFLO #Posgrado #PsicopedagogíaClínica` |

## Plantilla con ejemplos (uno por artículo)

Ver `LINKEDIN_POSTS_CATALOGO.md` para posts redactados por cada uno de los 6 artículos del blog.

## Métricas a seguir (mensual)

- Impresiones del post LinkedIn → comparar con impresiones GSC del artículo.
- Clicks al link del primer comentario → trackear en GA4 con `utm_source=linkedin&utm_medium=social`.
- Nuevos seguidores de LinkedIn tras publicar.

## Migración a automatización (cuándo)

Reevaluar cuando:
- El ritmo pase a 4+ posts/mes sostenido.
- Haya señal clara de que LinkedIn es canal principal (>30% del tráfico a nicolasgenise.org).
- Surja necesidad de cross-postear a otras redes simultáneamente.

Opciones a evaluar en ese momento, en orden de preferencia:
1. **GitHub Action + LinkedIn API** (free, controlado desde el repo).
2. **n8n self-hosted** (si ya está corriendo para otros workflows del stack).
3. **Buffer** (paid, pero zero-code si el ancho de banda técnico está saturado).
