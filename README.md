# Web Dr. Nicolás Genise - Especialización en Psicopedagogía Clínica

## 📁 Contenido del proyecto

```
nicolasgenise-web/
├── index.html          # Página principal completa
├── vercel.json         # Configuración para Vercel
├── images/
│   └── nicolas-genise.jpg   # Tu foto (AGREGAR)
└── README.md           # Este archivo
```

## 📸 PASO 1: Agregar tu foto

### Opción A: Usar la foto directamente
1. Renombrar tu foto `FOTO_PERSONAL_PRESENTACION.jpeg` a `nicolas-genise.jpg`
2. Copiarla a la carpeta `images/`

### Opción B: Optimizar la foto (recomendado)
1. Ir a [squoosh.app](https://squoosh.app) (gratis, de Google)
2. Subir tu foto
3. En el panel derecho elegir "MozJPEG"
4. Ajustar calidad a 80-85%
5. Descargar y guardar como `nicolas-genise.jpg` en la carpeta `images/`

## 🚀 PASO 2: Despliegue en Vercel (GRATIS)

### Paso 1: Crear cuenta en Vercel
1. Ir a [vercel.com](https://vercel.com)
2. Crear cuenta con tu email o GitHub

### Paso 2: Subir el proyecto
**Opción A: Desde GitHub (recomendado)**
1. Crear un repositorio en GitHub
2. Subir estos archivos
3. En Vercel, clic en "Import Project"
4. Seleccionar el repositorio
5. Deploy automático

**Opción B: Arrastrando archivos**
1. En Vercel, clic en "Add New" > "Project"
2. Arrastrar la carpeta completa
3. Deploy automático

### Paso 3: Conectar dominio
1. Comprar dominio en [Namecheap](https://namecheap.com) (~$10-12 USD/año)
   - Buscar: `nicolasgenise.com`
2. En Vercel, ir a Settings > Domains
3. Agregar el dominio comprado
4. Seguir instrucciones para configurar DNS

## ✏️ Personalización necesaria

Buscar y reemplazar en `index.html`:

| Buscar | Reemplazar con |
|--------|----------------|
| `[tu-email@ejemplo.com]` | Tu email real |
| `@[tu-usuario]` | Tu usuario de Instagram |

## 🔗 Conectar formularios a Brevo

### Configurar Brevo
1. Crear cuenta gratis en [brevo.com](https://brevo.com)
2. Ir a Contacts > Lists > Create a List
3. Crear lista "Leads Especialización"
4. Ir a Settings > API Keys
5. Crear una API key

### Modificar el formulario en index.html
Buscar `// TODO: Connect to Brevo API` y reemplazar con la integración real (te proporcionaré el código cuando tengas la API key).

## 📧 Integración con n8n

El formulario puede enviar datos a un webhook de n8n para:
- Guardar leads en Google Sheets
- Enviar email de bienvenida automático
- Activar secuencia de nurturing

Webhook URL a configurar: `[Tu URL de n8n webhook]`

## 🎨 Colores utilizados

```css
Primary 600: #1B4F72  /* Azul oscuro principal */
Primary 500: #2874A6  /* Azul medio */
Accent:      #5DADE2  /* Azul claro/celeste */
Text Dark:   #2C3E50  /* Gris oscuro */
Text Light:  #566573  /* Gris medio */
```

## 📱 Responsive

La web está optimizada para:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## ⚡ Performance

- Carga vía CDN de Tailwind (rápido)
- Fuentes de Google Fonts optimizadas
- Sin dependencias pesadas
- Imágenes: agregar en formato WebP para mejor rendimiento

---

**Tiempo estimado de configuración**: 30-60 minutos
