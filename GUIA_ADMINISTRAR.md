# 🌸 Guía para administrar Terapia Rosa

Esta guía te explica cómo cambiar el contenido del sitio **sin saber programar**. Todo se hace desde GitHub en el navegador, sin instalar nada.

---

## ¿Cómo funciona el flujo de cambios?

1. Tú editas un archivo directamente en GitHub (en el navegador, con un botón de lápiz)
2. Guardas el cambio (se llama "commit")
3. Netlify se da cuenta solo y republica el sitio en **30 a 60 segundos**
4. Tu cambio queda en vivo

**Sin terminal. Sin programar. Sin instalar nada.**

---

## Cómo editar un archivo en GitHub paso a paso

1. Entra al repositorio: `https://github.com/TU-USUARIO/terapia-rosa`
2. Navega a la carpeta donde está el archivo
3. Click en el archivo para abrirlo
4. Click en el icono de **✏️ lápiz** (arriba a la derecha)
5. Haz el cambio
6. Baja al final de la página
7. En "Commit changes", escribe una nota corta (ej: "Agregué frase nueva")
8. Click en **"Commit changes"** verde
9. Listo. En 30-60 segundos el sitio está actualizado.

**Si te equivocas:** vuelve al archivo, en la pestaña "History" puedes deshacer el cambio.

---

## 1. Cambiar las frases del día 🌸

**Archivo:** `public/js/utils.js`

**Qué buscar:** una lista llamada `FRASES_DIA` (cerca del inicio del archivo)

**Ejemplo de cómo se ve:**
```javascript
const FRASES_DIA = [
  { texto: 'Hoy también es un día.', autor: 'Anónimo' },
  { texto: 'Tu cuerpo está haciendo lo que puede.', autor: 'Alma Rosa' },
  // ... más frases
];
```

**Para agregar una frase nueva:**
- Copia una línea entera (con sus comas y comillas)
- Pégala antes del `];` final
- Cambia el texto y el autor

**Reglas:**
- ✅ Mantener las comillas simples `' '` rectas (NO las de Word `' '`)
- ✅ Mantener la coma al final de cada línea
- ✅ Mantener las llaves `{ }` que rodean cada frase

**Cómo aparece en el sitio:** una frase distinta cada día (rotando según el día del mes)

---

## 2. Agregar videos de YouTube a Yoga & medita 🧘

**Archivo:** `public/bienestar.html`

**Qué buscar:** una lista llamada `videos` con dos secciones, `yoga` y `medita`

**Cómo conseguir el videoId de un video de YouTube:**
- URL del video: `https://www.youtube.com/watch?v=XYZ123ABC`
- El videoId es: `XYZ123ABC` (lo que va después de `v=`)

**Ejemplo de cómo se ve:**
```javascript
const videos = {
  yoga: [
    { videoId: 'Yzm4VKyQjTM', title: 'Yoga suave para cáncer de mama', author: 'Carolina · Bogotá', duration: 15, tag: 'Suave' },
    // ... más videos
  ],
  medita: [
    { videoId: 'inpok4MKVLM', title: 'Meditación de 5 minutos', author: 'Marisol · Cali', duration: 5, tag: 'Principiante' },
    // ... más videos
  ]
};
```

**Qué significa cada campo:**
- `videoId` — el código del video de YouTube (sin espacios ni URL completa)
- `title` — título que verá la paciente (en cursiva en el sitio)
- `author` — quién lo grabó, separado con `·` (ej: `'Carolina · Bogotá'`)
- `duration` — minutos en NÚMERO, sin comillas (ej: `15`, no `'15 min'`)
- `tag` — etiqueta corta (ej: `'Suave'`, `'Muy suave'`, `'Principiante'`, `'Para dormir'`)

**Para agregar un video:**
- Copia una línea entera (la última, antes del `]`)
- Pégala dentro de `yoga` o `medita`
- Cambia los 5 valores

**Importante: el primer video de cada lista** sale como **"Recomendado hoy"** arriba con thumbnail grande y banda de "Recomendado hoy". Los demás videos van en la lista de abajo bajo "más movimiento". Si quieres que un video específico sea el destacado, ponlo primero.

**Reglas:**
- ✅ Cada bloque entre `{ }` termina con coma
- ✅ Las comillas rectas `'`, no las de Word `'`
- ✅ El videoId NO incluye espacios ni la URL completa, solo la parte de letras y números
- ✅ `duration` es número (sin comillas), no texto

---

## 3. Agregar acertijos al juego 💭

**Archivo:** `public/js/acertijos.js`

**Qué buscar:** una lista llamada `acertijos`

**Ejemplo:**
```javascript
const acertijos = [
  {
    pregunta: '¿Qué cae sin hacerse daño?',
    opciones: ['La lluvia', 'Una hoja', 'La tarde', 'Un sueño'],
    correcta: 0,
    feliz: 'La lluvia cae con la sabiduría de saberse necesaria 🌧️',
  },
  // ... más acertijos
];
```

**Cómo funciona `correcta`:**
- 0 = la primera opción es correcta
- 1 = la segunda
- 2 = la tercera
- 3 = la cuarta

**Tono de los acertijos:**
- Poéticos, dulces, suaves
- Para mujeres en quimioterapia — no chistes negros, no muerte, no medicina
- Inspirados en metáforas de la naturaleza, sentimientos, autoaceptación

---

## 4. Agregar palabras a la sopa de letras 🔤

**Archivo:** `public/js/sopa.js`

**Qué buscar:** la lista `POOL` (en la línea 2)

**Ejemplo:**
```javascript
const POOL = ['FUERZA', 'VIDA', 'AMOR', 'ALMA', 'LUZ', 'PAZ', 'BELLA', 'SANAR', 'CALMA', 'FE'];
```

**Reglas:**
- ✅ Todo en MAYÚSCULAS
- ✅ Máximo 8 letras por palabra (porque la grilla es 10x10)
- ✅ Sin tildes ni ñ (para que se vean bien en la grilla)
- ✅ Cada palabra entre comillas simples
- ✅ Separadas por coma

**Cuántas palabras tener:** entre 12 y 20 da buena variedad. Cada partida elige 8 al azar.

---

## 5. Cambiar mensajes curados del Muro 💌

**Archivo:** `public/muro.html`

**Qué buscar:** una lista llamada `mensajesBase`

**Ejemplo:**
```javascript
const mensajesBase = [
  { texto: 'Hoy estás sobreviviendo, y eso es enorme.', autor: 'Carolina' },
  { texto: 'Tu pelo va a volver. Tu fuerza nunca se fue.', autor: 'Marta' },
  // ... más mensajes
];
```

**Tono:**
- Mensajes de mujeres que pasaron quimio para mujeres que están pasándola
- Cálidos, reales, no acartonados
- No religiosos (a menos que la fundación lo apruebe)
- No frases hechas vacías ("¡tú puedes!", "todo va a estar bien")

**Estos mensajes son fijos** — los ven todas las usuarias. Los mensajes que las propias usuarias escriben en el sitio quedan solo en su celular (no se suben al servidor).

---

## 6. Editar el contenido de Aprende (Biblioteca) 📚

**Archivo:** `public/js/biblioteca.js`

**Qué buscar:** una lista llamada `topics` con 3 categorías. Cada categoría tiene una lista `items`.

**Estructura:**
```javascript
const topics = [
  {
    id: 'nutricion',
    icon: '🥗',
    title: 'Nutrición consciente',
    sub: 'Comer para nutrirte y disfrutar',
    accent: '#C9968A',
    bgFrom: '#E0C4B6', bgTo: '#C9968A',
    items: [
      { title: 'Lo que tu cuerpo agradece',
        sub: 'Comer despacio · sin pantallas',
        minutes: 4,
        body: `<p>Texto del artículo...</p>` },
      // ... más items
    ],
  },
  // ... salud mental, autocuidado
];
```

**Qué significa cada campo del item:**
- `title` — título del artículo (en cursiva en el sitio)
- `sub` — subtítulo corto (qué tematiza, separado con `·`)
- `minutes` — duración estimada de lectura (número, sin comillas)
- `body` — el contenido HTML del artículo (puede tener `<p>`, `<h3>`, `<ul>`, `<li>`)

**El primer item de cada categoría** sale como **"Recomendado hoy"** arriba. Los demás aparecen en la lista. Si quieres que un item específico sea el destacado, ponlo primero.

**Para agregar un item nuevo a una categoría:**
- Copia un bloque `{ title: ..., sub: ..., minutes: ..., body: \`...\` }`
- Pégalo dentro de `items` de la categoría correspondiente
- Cambia los 4 valores

**Para HTML dentro de `body`:**
- Usa `<p>parrafo</p>` para texto suelto
- Usa `<h3>Subtítulo</h3>` para títulos dentro del artículo
- Usa `<ul><li>punto 1</li><li>punto 2</li></ul>` para listas
- Las **comillas tipo "back-tick" (\`) son obligatorias** alrededor del body porque permite saltos de línea

**Audio (Escuchar):** la voz que se oye al darle play viene del navegador (Speech Synthesis). Cuando la fundación grabe podcasts profesionales, te aviso cómo cambiarla.

---

## 7. Actualizar las respuestas demo de Alma 💬

**Archivo:** `public/js/chat.js`

**Qué son las respuestas demo:** lo que Alma responde cuando alguien abre el sitio sin internet, o cuando la IA falla.

**Qué buscar:** una lista llamada `respuestasDemo`

**Ejemplo:**
```javascript
'ansiosa': {
  texto: 'La ansiedad aprieta el pecho 🌿. Te dejo dos cosas que pueden ayudarte:',
  recursos: ['respira', 'musica']
},
```

**Recursos disponibles** (puedes usar cualquiera de estos en la lista `recursos`):
- `respira` — Respiración guiada
- `musica` — Música suave + respiración
- `colorear` — Mandalas
- `diario` — Diario privado
- `muro` — Muro de mensajes
- `sopa` — Sopa de palabras
- `memoria` — Juego de memoria
- `acertijos` — Acertijos del alma
- `yoga` — Yoga & meditaciones
- `nutricion` — Tema de nutrición en biblioteca
- `saludmental` — Tema de salud mental en biblioteca
- `autocuidado` — Tema de autocuidado en biblioteca

**Para agregar un nuevo trigger:**
- Copia un bloque entero
- Pégalo antes del último `};`
- La palabra clave (ej: `'ansiosa'`) debe estar en minúsculas
- Alma busca esa palabra dentro del mensaje completo

---

## 8. Cambiar la personalidad y tono de Alma (la IA)

**Archivo:** `netlify/functions/chat.js`

**Qué buscar:** una variable enorme llamada `SYSTEM_PROMPT` (al inicio del archivo)

**Lo que SÍ puedes editar:**
- La sección **CONTEXTO**: descripción de a quién está ayudando Alma
- La sección **TU ROL ESPECÍFICO**: qué cosas debe hacer Alma
- La sección **TONO**: cómo debe hablar
- La sección **NO HAGAS**: qué cosas no debe hacer
- Los recursos que recomienda (lista en TU ROL ESPECÍFICO)

**Lo que NO debes editar (es protección de seguridad):**
- ❌ La sección **INSTRUCCIONES PERMANENTES** (líneas 15-18 dentro del prompt)
- ❌ La sección **LÍMITES MÉDICOS** (no recomendar tratamientos)
- Estas dos secciones protegen a las usuarias de respuestas peligrosas

**Después de cambiar el prompt, Netlify republica solo en 30-60 segundos.**

---

## 9. Cambiar los números de líneas de crisis

**Archivo:** `netlify/functions/chat.js`

**Qué buscar:** dentro del `SYSTEM_PROMPT`, la sección **DERIVACIÓN A CRISIS**

**Ejemplo actual:**
```
- Fundación Alma Rosa: +57 310 415 6261
- Línea 106 (Bogotá) o Línea 123 opción 4 (otras ciudades de Colombia)
```

**Si la fundación cambia su número** o si quieren agregar más líneas, edita aquí. Alma comparte estos números cuando detecta una crisis emocional.

---

## 10. Activar analytics anónimos (saber cuántas usan el sitio)

**Archivo:** `public/js/analytics.js`

**¿Qué hace?** Permite a la fundación saber **cuántas pacientes** entran al sitio, **qué páginas** ven más, y desde **qué tipo de dispositivo** (celular/computador) — sin saber QUIÉNES son.

**Lo que NO hace:**
- ❌ NO usa cookies
- ❌ NO recoge nombres, emails, ni datos personales
- ❌ NO sabe qué escribe la usuaria en el diario
- ❌ NO comparte datos con terceros (más allá del proveedor de analytics elegido)

**Cómo lo activas (opción recomendada: Plausible)**

1. Entra a https://plausible.io y crea cuenta (30 días gratis, después ~$9/mes con descuento para fundaciones)
2. Agrega el dominio del sitio (ej: `terapia-rosa.netlify.app`)
3. En GitHub, abre `public/js/analytics.js`
4. Busca esta línea:
   ```javascript
   const PLAUSIBLE_DOMAIN = '';
   ```
5. Cámbiala por:
   ```javascript
   const PLAUSIBLE_DOMAIN = 'terapia-rosa.netlify.app';
   ```
6. Commit. En 60 segundos ya está midiendo.

**Alternativa 100% gratis: GoatCounter**

1. Entra a https://www.goatcounter.com/signup
2. Elige un código (ej: `terapia-rosa`)
3. En `analytics.js` cambia:
   ```javascript
   const GOATCOUNTER_CODE = 'terapia-rosa';
   ```
4. Commit. Listo.

**Para desactivar:** vuelve a poner las variables en blanco (`''`) y commit.

**Solo se activan en producción.** Si abres el sitio en `localhost`, no se cuenta.

---

## 11. Cambiar el modelo de Gemini (avanzado, opcional)

**Archivo:** `netlify/functions/chat.js`

**Qué buscar:** la línea con `const GEMINI_MODEL = 'gemini-2.0-flash';`

**Modelos disponibles (todos gratuitos):**
- `gemini-2.0-flash` — **recomendado.** Rápido, calidad alta, español nativo
- `gemini-1.5-flash` — versión anterior, también rápida
- `gemini-1.5-pro` — más reflexivo, pero más lento (puede sentirse lento en chat)

**No cambies esto a menos que la fundación pida más calidad o más rapidez.**

---

## ⚠️ Si algo se rompe (y cómo arreglarlo)

### Problema: el sitio se queda en blanco

**Causa más común:** un error de sintaxis (una coma faltante, una comilla mal cerrada).

**Cómo arreglarlo:**
1. Entra a Netlify → **Deploys**
2. Mira el último deploy
3. Si dice **"Failed"**, click para ver el error
4. Si dice **"Published"** pero el sitio sale en blanco:
   - Abre el sitio en el celular
   - Toca rápido 5 veces el logo (en computador: aprieta F12)
   - Mira los mensajes en rojo
   - El error te dice qué línea de qué archivo está mal
5. Vuelve a GitHub, edita el archivo, arregla el error, commit

### Errores comunes:

| Síntoma | Causa | Solución |
|---|---|---|
| Sitio en blanco | Falta una coma `,` | Buscar la línea que indica el error |
| Sitio en blanco | Comilla curva `'` en vez de recta `'` | Reemplazar todas las curvas por rectas |
| Sitio en blanco | Falta `}` o `]` | Contar las llaves: cada `{` debe tener su `}` |
| Chat dice "no configurado" | Falta `GEMINI_API_KEY` en Netlify | Site settings → Environment variables → agregarla |
| Chat dice "intenta de nuevo" | Clave de Gemini inválida | Generar una nueva en aistudio.google.com/apikey |

### Cómo deshacer un cambio en GitHub

1. Ve al repo en GitHub
2. Click en la pestaña **"Commits"** (arriba)
3. Encuentra el commit que rompió el sitio
4. Click en los tres puntitos `...` al lado
5. **"Revert"** (revertir) — crea un nuevo commit que deshace el anterior
6. Netlify republica solo

---

## 🔐 Seguridad — lo que NUNCA se debe hacer

- ❌ NUNCA pegar la clave de Gemini en un archivo del sitio
- ❌ NUNCA compartir la clave por WhatsApp ni por correo
- ❌ NUNCA hacer público el repo si la clave alguna vez estuvo ahí
- ❌ NUNCA borrar la sección **INSTRUCCIONES PERMANENTES** del system prompt
- ❌ NUNCA borrar la sección **LÍMITES MÉDICOS** del system prompt

Si por accidente la clave queda expuesta:
1. Entra a https://aistudio.google.com/apikey
2. Borra esa clave
3. Crea una nueva
4. Actualiza Netlify con la nueva

---

## 📱 Datos de contacto del proyecto

- **Coordinadora del proyecto:** Adriana (La Soberana SAS)
- **Fundación:** Alma Rosa (https://fundacionalmarosa.org)
- **Línea de apoyo de la fundación:** +57 310 415 6261

---

🌸 **Hecho con cariño para acompañar a las guerreras de la Fundación Alma Rosa.**
