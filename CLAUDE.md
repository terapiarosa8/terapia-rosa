# CLAUDE.md — Terapia Rosa
## Instrucciones para Claude Code

---

## ¿Qué es este proyecto?

**Terapia Rosa** es un micrositio web de acompañamiento durante quimioterapia, creado como proyecto de colegio en alianza con la **Fundación Alma Rosa** (Medellín, Colombia). La fundación apoya a mujeres con cáncer de mama.

**Usuario final:** Mujeres en sesiones de quimioterapia (3-6 horas) con celular en mano, cansadas, con náuseas o miedo. Todo debe ser accesible, suave y sin fricción.

---

## Stack técnico — NUNCA cambies esto sin pedir permiso

```
Frontend:    HTML + CSS + JavaScript VANILLA (sin React, sin Vue, sin frameworks)
Backend:     Netlify Functions (Node.js) — SOLO para el proxy de la API de Gemini
Hosting:     Netlify (plan gratis)
IA:          Google Gemini API → modelo gemini-2.0-flash (plan gratuito)
Tipografías: Google Fonts — Cormorant Garamond + Italiana + Jost (cargadas en cada HTML)
```

**Por qué vanilla:** La fundación necesita poder mantener el sitio sin programadores. HTML+CSS+JS puro es lo más mantenible.

**Por qué NO React:** Evitar build steps, node_modules, y complejidad operativa. Cada página es un archivo `.html` independiente.

---

## Estructura del proyecto

```
terapia-rosa/
├── public/
│   ├── index.html          ← Home: saludo, frase del día, grid 6 tarjetas
│   ├── chat.html           ← Chat con Alma (IA navegadora)
│   ├── respiracion.html    ← Flor SVG animada + música Web Audio
│   ├── mi-espacio.html     ← Hub: 6 secciones
│   ├── colorear.html       ← 4 mandalas SVG coloreables
│   ├── bienestar.html      ← Videos YouTube (yoga + meditación)
│   ├── diario.html         ← Diario privado en localStorage
│   ├── muro.html           ← Muro de post-its (mensajes curados + propios)
│   ├── juegos.html         ← Hub de 3 juegos
│   ├── sopa.html           ← Sopa de palabras (touch + mouse)
│   ├── memoria.html        ← Memoria (6 parejas)
│   ├── acertijos.html      ← Acertijos poéticos (10 en rotación)
│   ├── biblioteca.html     ← 3 temas con tabs Leer/Escuchar/Ver
│   ├── styles/
│   │   └── main.css        ← Sistema de diseño COMPLETO (paleta, tipografía, componentes)
│   └── js/
│       ├── utils.js        ← Helpers compartidos: FRASES_DIA, Storage, escapeHtml
│       ├── chat.js         ← Lógica de Alma: RECURSOS, respuestas, recomendaciones
│       ├── respiracion.js  ← Flor animada + Web Audio API
│       ├── sopa.js         ← Sopa de palabras
│       ├── memoria.js      ← Juego de memoria
│       ├── acertijos.js    ← Acertijos del alma
│       └── biblioteca.js   ← Topics + SpeechSynthesis + format tabs
├── netlify/
│   └── functions/
│       └── chat.js         ← Proxy seguro a la API de Google Gemini
├── netlify.toml            ← Config: publish dir, headers CSP, redirect /api/chat
├── .gitignore              ← Excluye .env, node_modules
├── README.md               ← Documentación técnica
└── README_PUBLICAR.md      ← Guía paso a paso para la fundación (sin programación)
```

---

## Paleta de colores — Identidad Alma Rosa (NUNCA cambies estos valores sin pedir permiso)

Alineada al **Manual de Marca de la Fundación Alma Rosa**: Rosa claro **Pantone 708C** + Rosa fuerte **Pantone 191C**. Toda la paleta se define una sola vez en `:root` de `public/styles/main.css` y se propaga a las 13 páginas vía variables CSS.

```css
--rosa-base:     #FAD9DE   /* fondo de tarjetas suaves (rosa muy claro) */
--rosa-medio:    #F2A0AE   /* hover, elementos secundarios */
--rosa-fuerte:   #E95178   /* botones primarios, cards activas, marca — Pantone 191C */
--rosa-profundo: #C0335B   /* texto de acento, botones CTA, contraste AA */
--verde-alma:    #D84E7A   /* (nombre histórico) rosa berry — estado "éxito/encontrado/correcto" */
--verde-oscuro:  #A82C54   /* (nombre histórico) rosa profundo — texto sobre estado de éxito */
--crema:         #FDF2F4   /* fondo global (blanco rosado) */
--crema-profunda:#FBE6EA   /* variante crema */
--papel:         #FFFFFF   /* fondo de cards y áreas de escritura (blanco limpio) */
--texto-oscuro:  #2E2328   /* texto principal */
--texto-suave:   #83646C   /* texto secundario, labels (≥4.5:1 AA) */
```

> **Nota:** las variables `--verde-alma` / `--verde-oscuro` conservan su nombre por compatibilidad, pero ya **no son verdes**: el Manual de Alma Rosa es solo rosa + grises, así que el estado semántico de "éxito" (palabra encontrada, pareja, respuesta correcta) usa un rosa berry profundo.

### Logo y marca (Alma Rosa)
- `public/isotipo-almarosa.png` — isotipo (flor) a color, va en el header del home junto a "TERAPIA rosa".
- `public/isotipo-almarosa-blanco.png` — isotipo blanco, para fondos de color.
- `public/logo-almarosa.png` — logo completo (flor + "AlmaRosa"), va como crédito "Un espacio de la Fundación" al pie del home.
- `favicon-32.png`, `apple-touch-icon.png`, `icon-192/512/1024.png` — flor blanca sobre fondo rosa #E95178 (uso "sobre fondo de color" aprobado en el manual).
- Fuentes originales del manual en la carpeta `KV ALMAROSA/` (Poppins + Catalish Huntera). El sitio **conserva** sus tipografías actuales (Cormorant Garamond / Italiana / Jost) por decisión de diseño.

---

## Tipografías — orden importa

```css
--serif:   'Cormorant Garamond'  /* textos largos, frases, títulos de sección */
--display: 'Italiana'            /* marca TERAPIA rosa */
--sans:    'Jost'                /* UI, labels, botones, navegación */
```

Regla: todo lo emotivo va en `serif italic`. Todo lo funcional va en `sans`.

---

## Componentes principales (ya construidos)

### Flor de respiración (`respiracion.html` + `js/respiracion.js`)
SVG con 5 pétalos translúcidos + esfera central con gradiente radial.
- **Inhala (4s):** pétalos se expanden, color rosa fuerte
- **Sostén (4s):** pétalos rotan lento, color verde sage
- **Exhala (6s):** pétalos se contraen, color rosa base
- Música generada con Web Audio API (acordes ~432Hz)
- Toggle "🎵 Música suave" que el usuario puede apagar

### Alma como navegadora (`js/chat.js`)
Alma NO es solo un chatbot empático. Su función principal es **entender lo que necesita la paciente y llevarla al recurso correcto** con botones grandes.

Flujo:
1. Usuaria escribe (ej: "estoy ansiosa")
2. Alma valida emocionalmente (texto corto, 1-2 párrafos)
3. Alma muestra **tarjetas de recomendación** con botón → que lleva directo a la pantalla

**Catálogo de recursos** (en `RECURSOS` object en chat.js):
`respira, musica, colorear, diario, muro, sopa, memoria, acertijos, yoga, nutricion, saludmental, autocuidado`

En producción (Netlify), el chat llama a `/.netlify/functions/chat` (IA real).
En desarrollo local, usa `respuestasDemo` pre-grabadas.

### Biblioteca (`biblioteca.html` + `js/biblioteca.js`)
3 temas únicamente — sin contenido oncológico:
- 🥗 Nutrición consciente
- 💛 Salud mental
- 🌿 Autocuidado

Cada tema tiene 3 formatos:
- 📖 Leer (texto)
- 🎙️ Escuchar (SpeechSynthesis del navegador en preview → podcast real en producción)
- 🎬 Ver (placeholder → video real de la fundación)

---

## Reglas de seguridad — OBLIGATORIAS

Auditado con skill `secure-ai-coding`. Ver `AUDITORIA_SEGURIDAD.md` para detalle.

1. **La API key de Gemini NUNCA va en el frontend.** Siempre en variables de entorno de Netlify.
2. **El frontend NUNCA llama directo a generativelanguage.googleapis.com.** Siempre a través de `/.netlify/functions/chat`.
3. **Sanitizar siempre el texto del usuario** antes de mostrarlo en HTML (usar `escapeHtml()` o `textContent`).
4. **No usar `innerHTML` con texto del usuario sin sanitizar.**
5. **La Netlify Function** ya tiene: rate limit por IP (8/min, 50/día), detección de prompt injection, sanitización de inputs, manejo seguro de errores.
6. **No hardcodear credenciales, URLs de APIs pagas, ni datos sensibles en ningún archivo del `public/` folder.**

---

## Decisiones de diseño que NO se cambian sin pedir permiso

- **Sin login ni cuentas.** Anonimato total para las pacientes.
- **Sin backend propio de datos.** El diario y el muro viven en `localStorage` del dispositivo.
- **Mobile-first, max-width 480px.** El sitio se usa en celular.
- **Sin dependencias npm en el frontend.** Si necesitas una librería, cárgala desde CDN o no la uses.
- **Bottom nav siempre fija:** Inicio, Alma, Respira, Mi espacio — 4 ítems, siempre visibles.
- **Flor en respiración, NO círculo.** La esfera con pétalos translúcidos es el diseño aprobado.

---

## Tareas frecuentes para Claude Code

### Agregar un video a Bienestar
1. Abrir `public/bienestar.html`
2. Buscar el array `videos` en el script inline
3. Agregar un objeto `{ videoId: 'ID_DE_YOUTUBE', title: '...', duration: '...', level: '...' }` al array `yoga` o `medita`
4. El `videoId` es lo que va después de `?v=` en la URL de YouTube

### Agregar un tema a Biblioteca
1. Abrir `public/js/biblioteca.js`
2. Agregar un objeto al array `topics`:
```js
{
  icon: '🌿',
  title: 'Nombre del tema',
  sub: 'Descripción corta',
  content: `<h3>Subtítulo</h3><p>...</p><ul><li>...</li></ul>`
}
```

### Cambiar una frase del día
1. Abrir `public/js/utils.js`
2. Modificar el array `FRASES_DIA`

### Agregar un acertijo
1. Abrir `public/js/acertijos.js`
2. Agregar al array `acertijos`:
```js
{
  pregunta: '...',
  opciones: ['A', 'B', 'C', 'D'],
  correcta: 0,  // índice (0-3)
  feliz: 'Mensaje motivador cuando aciertan 🌸',
}
```

### Agregar palabras a la sopa
1. Abrir `public/js/sopa.js`
2. Agregar palabras al array `POOL` (en MAYÚSCULAS, máximo 8 letras)

### Actualizar el system prompt de Alma
1. Abrir `netlify/functions/chat.js`
2. Modificar `SYSTEM_PROMPT`
3. Las primeras líneas de "INSTRUCCIONES PERMANENTES" son defensa contra prompt injection — no eliminarlas

---

## Variables de entorno necesarias

Solo una, configurada en Netlify (nunca en código):

```
GEMINI_API_KEY=tu-clave-de-google-aistudio
```

Para obtener la clave: https://aistudio.google.com/apikey (gratis con cuenta de Google)

Para desarrollo local con `netlify dev`:
```bash
# En la raíz del proyecto, crear .env (ya está en .gitignore):
GEMINI_API_KEY=tu-clave-de-gemini-aqui
```

---

## Cómo correr localmente

```bash
# Prerequisito: Node.js + Netlify CLI
npm install -g netlify-cli

# En la carpeta del proyecto:
netlify dev
# Abre: http://localhost:8888
```

Sin `netlify dev`, el chat no funciona (la función no se ejecuta). Las demás páginas sí funcionan abriendo los HTML directamente.

---

## Cómo publicar a Netlify

Ver `README_PUBLICAR.md` — guía paso a paso sin programación para la fundación.

Resumen:
1. Subir a GitHub
2. Conectar Netlify → GitHub
3. Configurar variable `GEMINI_API_KEY` en Netlify Environment Variables
4. Deploy

---

## Contacto del proyecto

- **Coordinadora:** Adriana (La Soberana SAS) — apoya a su hija con este proyecto de colegio
- **Fundación:** Alma Rosa — https://fundacionalmarosa.org
- **Línea de apoyo:** +57 310 415 6261

---

## Estado del proyecto (2026-06-17)

### ✅ Completado
- 13 páginas HTML funcionales
- Sistema de diseño completo (paleta, tipografía, componentes)
- **Identidad visual Alma Rosa aplicada** (paleta Pantone 708C/191C + logo de la Fundación), conservando el nombre "Terapia Rosa" y las tipografías (Cormorant Garamond / Italiana / Jost)
- Alma como navegadora inteligente (30+ frases reconocidas → recomendaciones con botones)
- Flor SVG animada en Respiración (esfera + pétalos + música Web Audio)
- 3 juegos: sopa de palabras, memoria, acertijos del alma
- Biblioteca con 3 temas y 3 formatos (Leer/Escuchar/Ver)
- Diario privado con prompts y descarga .txt
- Muro de post-its (curados + propios)
- **Videos reales de yoga y meditación cargados en Bienestar** ✅ (ya no es pendiente)
- Netlify Function con seguridad completa (rate limit, prompt injection, sanitización)
- Auditoría de seguridad (AUDITORIA_SEGURIDAD.md)
- **Publicado en vivo → https://terapiarosa8.github.io/terapia-rosa/** (GitHub Pages, deploy automático con GitHub Actions desde `main` sirviendo `public/`)
- Nombre confirmado: "Terapia Rosa"

### 🔲 Pendiente para producción
- Grabar podcasts reales para el tab "Escuchar" en Biblioteca
- **Chat de Alma con IA real:** el sitio está en **GitHub Pages** (estático, sin funciones serverless), pero el frontend llama a `/.netlify/functions/chat`. Para que la IA real funcione en producción hay que hospedar esa función (Netlify u otro proveedor) y apuntar el chat allí; mientras tanto, el chat depende de las respuestas demo.
- Dominio personalizado (opcional)

> **Nota de hosting:** este repo se publica con **GitHub Pages** (no Netlify). Varias secciones de abajo todavía mencionan Netlify como hosting — aplican solo si en algún momento se migra el sitio o se hospeda la función del chat en Netlify.
