# 🌸 Guía completa de Terapia Rosa
_Manual para la Fundación Alma Rosa: qué es, cómo se creó y cómo administrarla._

Esta guía reúne **todo sobre la aplicación Terapia Rosa**: qué es, cómo se creó, cómo funciona y cómo **administrarla** (cambiar su contenido) **sin saber programar**. Todo se hace desde GitHub en el navegador, sin instalar nada.

> 🌐 **Dónde vive el sitio:** se publica con **GitHub Pages** y está en vivo en **https://terapiarosa8.github.io/terapia-rosa/**. Cada vez que guardas un cambio en la rama `main`, GitHub lo publica solo (automáticamente, con "GitHub Actions").

---

## Qué es Terapia Rosa y para quién

**Terapia Rosa** es un micrositio web (un sitio pequeño, de pocas pantallas) de **acompañamiento durante la quimioterapia**. Es un espacio de la **Fundación Alma Rosa**, pensado para estar al lado de las mujeres en los momentos más largos del tratamiento.

**¿Para quién es?** Para mujeres que están en una **sesión de quimioterapia de 3 a 6 horas**, con el **celular en la mano**, muchas veces cansadas, con náuseas o con miedo. Por eso todo está diseñado para usarse sin esfuerzo: textos suaves, botones grandes y nada que distraiga o complique.

La pantalla de inicio (`public/index.html`) recibe con un **saludo según la hora del día**, una **frase del día** y la pregunta cálida *"¿Qué necesitas ahora?"*, seguida de seis tarjetas grandes para elegir con calma: **Habla con Alma** (una amiga que escucha), **Aprende**, **Yoga & medita**, **Respira**, **Colorear** y **Mi espacio** (diario, juegos, muro).

Su **filosofía** se resume en cuatro ideas:

1. **Suave y sin fricción** — todo es amable, lento y fácil de tocar.
2. **Anónima** — **sin login ni cuentas**; nadie tiene que registrarse ni dar datos.
3. **Privada** — lo que la persona escribe en el diario o en el muro se queda **solo en su propio celular** (en el almacenamiento del navegador), no se sube a ningún servidor.
4. **Pensada para celular** — diseño *mobile-first* (primero el teléfono), con un menú fijo abajo siempre visible.

Al pie de la página de inicio aparece la firma *"Un espacio de la Fundación Alma Rosa"* con su logo, porque más que una app, es un gesto de compañía de la fundación para que ninguna mujer sienta que atraviesa la quimioterapia sola.

---

## Cómo está hecha (cómo se creó)

Terapia Rosa se construyó con tres tecnologías básicas de la web, sin programas complicados de por medio:

- **HTML** — es el "esqueleto" de cada página: define qué textos, botones e imágenes aparecen.
- **CSS** — es el "vestido": define los colores, las letras y cómo se ve todo.
- **JavaScript** — es lo que hace que las cosas "respondan": que la flor de respiración se mueva, que los juegos funcionen, que el chat con Alma conteste.

Lo importante es que se usaron en su forma **"pura" o "vanilla"**, es decir, **sin frameworks como React, Vue ni similares**. Esto fue una decisión a propósito, y la razón está escrita en el propio proyecto:

> "**Por qué vanilla:** La fundación necesita poder mantener el sitio sin programadores. HTML+CSS+JS puro es lo más mantenible."

En palabras simples: un *framework* es una "caja de herramientas extra" que muchos sitios usan, pero que obliga a instalar programas, ejecutar pasos de compilación y aprender cosas técnicas. Al **no** usarlos, el sitio se mantiene sencillo y cualquier persona con conocimientos básicos puede abrir un archivo y hacer un cambio pequeño. La regla del proyecto incluso dice que **no se usan dependencias externas instaladas** en la parte visible: si se necesita una librería, se carga desde internet (CDN) o no se usa.

### Cada página es un archivo .html independiente

El sitio **no es una sola página gigante**, sino **13 páginas separadas**, y cada una vive en su propio archivo `.html`. Esto hace que tocar una página no afecte a las demás. Las páginas son:

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Inicio: saludo, frase del día y las tarjetas principales |
| `chat.html` | Chat con **Alma**, que orienta a la paciente |
| `respiracion.html` | Flor animada para respirar + música suave |
| `mi-espacio.html` | Menú con las 6 secciones de "Mi espacio" |
| `colorear.html` | Mandalas para colorear |
| `bienestar.html` | Videos de yoga y meditación |
| `diario.html` | Diario privado |
| `muro.html` | Muro de mensajes (post-its) |
| `juegos.html` | Menú de los 3 juegos |
| `sopa.html` | Sopa de palabras |
| `memoria.html` | Juego de memoria |
| `acertijos.html` | Acertijos del alma |
| `biblioteca.html` | Biblioteca con 3 temas |

### El diseño vive en un solo lugar

Los colores, las letras y la apariencia de **todas** las páginas se definen **una sola vez** en el archivo:

```
public/styles/main.css
```

Ahí, en una sección llamada `:root`, están guardados los colores de la marca como "variables" (apodos reutilizables). Estos son los valores **reales** de la paleta Alma Rosa que están hoy en el archivo:

```css
:root {
  --rosa-base: #FAD9DE;
  --rosa-medio: #F2A0AE;
  --rosa-fuerte: #E95178;
  --rosa-profundo: #C0335B;
  --verde-alma: #D84E7A;
  --verde-oscuro: #A82C54;
  --crema: #FDF2F4;
  --crema-profunda: #FBE6EA;
  --papel: #FFFFFF;
  --texto-oscuro: #2E2328;
  --texto-suave: #83646C;
}
```

La gran ventaja: si algún día se quiere ajustar un color, **se cambia una sola vez aquí** y el cambio se ve automáticamente en las 13 páginas. (Un detalle curioso: las variables `--verde-alma` y `--verde-oscuro` conservan ese nombre por historia, pero hoy **ya no son verdes** — son tonos de rosa que marcan "acierto" o "éxito" en los juegos.)

### Las tipografías (letras)

El sitio usa tres tipos de letra, que se cargan gratis desde **Google Fonts** y se definen también en `main.css`:

- **Cormorant Garamond** (`--serif`) — para los textos largos, frases y títulos emotivos.
- **Italiana** (`--display`) — para la marca "TERAPIA rosa".
- **Jost** (`--sans`) — para la parte funcional: botones, menús y etiquetas.

La regla de estilo es sencilla: **todo lo emotivo va en letra serif en cursiva; todo lo funcional va en Jost.**

### Cómo están organizadas las carpetas

Todo lo que ve la paciente vive dentro de una carpeta llamada **`public/`**, organizada así:

- **`public/`** → los **archivos `.html`** (las páginas) y las imágenes del logo de la Fundación (por ejemplo `isotipo-almarosa.png`, `logo-almarosa.png`).
- **`public/styles/`** → contiene **`main.css`**, el único archivo de diseño.
- **`public/js/`** → la **lógica** (el JavaScript) repartida en archivos por tema:
  - `utils.js` — ayudas compartidas, como las **frases del día**.
  - `chat.js` — el cerebro de **Alma** (qué entiende y a qué recurso lleva).
  - `respiracion.js` — la flor animada y la música.
  - `sopa.js`, `memoria.js`, `acertijos.js` — los tres juegos.
  - `biblioteca.js` — los temas de la biblioteca y la lectura en voz alta.

En resumen: una **idea por archivo**. Si se quiere cambiar una frase, se busca `utils.js`; si se quiere ajustar un color, se busca `main.css`; si se quiere editar una página, se abre su `.html`. Esa simplicidad es justamente lo que permite que la Fundación pueda cuidar el sitio sin depender de un programador.

---

## Recorrido por las pantallas

Así está organizado el sitio, pantalla por pantalla. Cada una es un archivo independiente dentro de la carpeta `public/`, así que cualquiera de ustedes puede entender qué hace sin necesidad de saber programar.

- **Inicio** (`index.html`) — La pantalla de bienvenida. Muestra un saludo según la hora del día, la **Frase del día** y un grupo de tarjetas grandes ("Qué necesitas ahora?") que llevan a: Habla con Alma, Aprende, Yoga & medita, Respira, Colorear y Mi espacio. Abajo aparece el crédito de la **Fundación Alma Rosa**.

- **Alma / Chat** (`chat.html`) — La conversación con **Alma**, una acompañante que escucha y, sobre todo, orienta. La paciente escribe cómo se siente (o toca botones rápidos como *"Tengo náuseas"*, *"Tengo miedo"*, *"No puedo dormir"*, *"Estoy ansiosa"*) y Alma le responde con calma y le sugiere el recurso del sitio que mejor le sirve en ese momento. Tiene un botón de escoba (🧹) para borrar la conversación por privacidad.

- **Respira** (`respiracion.html`) — Una **flor animada** (una esfera con pétalos translúcidos) que guía la respiración: inhalar, sostener y exhalar. Incluye un interruptor **"🎵 Música suave"** que la paciente puede apagar cuando quiera. Es la pausa de 5 minutos para serenarse.

- **Mi espacio** (`mi-espacio.html`) — El centro personal de la paciente. Es un menú con seis accesos: **Diario**, **Juegos suaves**, **Colorear**, **Muro de guerreras**, **Biblioteca** y **Yoga & medita**.

- **Colorear** (`colorear.html`) — Un lienzo para pintar sin pensar. Ofrece cuatro diseños: **Mandala, Flor, Mariposa y Corazón**, que se colorean tocando las distintas zonas con una paleta de colores suaves.

- **Yoga & medita** (en el sitio aparece como Yoga & medita / *"Mueve poquito, siente mucho"*) (`bienestar.html`) — Videos de YouTube organizados en dos pestañas: **Yoga suave** y **Meditaciones** (por ejemplo *"Yoga para pacientes en tratamiento oncológico"* y *"Meditación guiada para mujeres con cáncer de mama"*). Sin presión, a su propio ritmo.

- **Diario** (`diario.html`) — Un cuaderno privado para escribir lo que se siente ese día. Todo se guarda **solo en el celular de la paciente** (no se sube a internet), de modo que es completamente privado.

- **Muro de guerreras** (`muro.html`) — Un muro de mensajes anónimos entre mujeres que viven el mismo camino. Se pueden leer mensajes y dejar uno propio. *"No estás sola."*

- **Juegos** (`juegos.html`) — El menú de los tres juegos suaves, *sin puntajes, sin presión, sin perder*. Muestra un mensaje cariñoso de constancia ("Llevas X días viviendo") y lleva a los tres juegos:
  - **Sopa de palabras** (`sopa.html`) — Buscar palabras que abrazan, tocando o arrastrando con el dedo. *Sin presión, a tu ritmo.*
  - **Memoria** (`memoria.html`, "Encuentra las parejas") — El clásico juego de encontrar parejas con cartas suaves.
  - **Acertijos del alma** (`acertijos.html`) — Adivinanzas dulces y sin trampas, *para descansar la mente*.

- **Biblioteca / Aprende** (`biblioteca.html`) — Contenido para aprender a su propio ritmo, *"sin tecnicismos, sin alarma"*. Está organizado en tres temas: **Nutrición consciente** (🥗), **Salud mental** (💛) y **Autocuidado** (🌿), cada uno con videos cortos y cercanos. (Nota: algunos videos todavía dicen `REEMPLAZAR_AQUI`, es decir, falta colocar el video real de la fundación.)

### La barra de navegación inferior (siempre visible)

En la parte de abajo de la pantalla hay una **barra fija** que acompaña a la paciente en todo momento, para que nunca se pierda. La genera automáticamente el archivo `js/nav.js` y tiene **cinco botones**:

1. **🏠 Inicio** → lleva a la pantalla de bienvenida (`index.html`)
2. **📚 Aprende** → lleva a la Biblioteca (`biblioteca.html`)
3. **💬 Alma** → lleva al chat con Alma (`chat.html`)
4. **🧘 Yoga** → lleva a Yoga & medita (`bienestar.html`)
5. **📖 Mi espacio** → lleva al centro personal (`mi-espacio.html`)

El botón en el que la paciente se encuentra aparece **resaltado** para que sepa siempre dónde está. Cuando entra a una pantalla "hija" (por ejemplo Diario, Muro, Juegos o Colorear), la barra resalta **Mi espacio**, porque esas pantallas viven dentro de ese apartado. En la pantalla de **Respira** no se resalta ningún botón, para no distraer durante el ejercicio.

---

## La marca Alma Rosa en la app

La identidad visual de la Fundación está integrada en toda la aplicación: los colores, las tipografías (los tipos de letra) y los logos. Esta sección explica de dónde sale cada cosa, para qué sirve y qué conviene **no** tocar para que la app siga viéndose como Alma Rosa.

### Los colores oficiales

La Fundación tiene dos colores de marca, definidos con el sistema **Pantone** (un estándar internacional que asegura que un color se vea igual en pantalla y en imprenta):

- **Rosa claro — Pantone 708C**: el rosa suave, para fondos y elementos delicados.
- **Rosa fuerte — Pantone 191C**: el rosa intenso, para botones, acentos y textos destacados.

En la web, los colores no se escriben con nombres Pantone sino con un código llamado **HEX** (un código de 6 caracteres que empieza con `#`, por ejemplo `#E95178`). Todos los colores de la app están reunidos en un solo lugar: la parte superior del archivo `public/styles/main.css`, dentro de un bloque llamado `:root`. Estos son los valores reales que usa la app hoy:

```css
:root {
  --rosa-base: #FAD9DE;       /* rosa claro — fondos suaves */
  --rosa-medio: #F2A0AE;      /* rosa medio — hover, elementos secundarios */
  --rosa-fuerte: #E95178;     /* rosa fuerte — botones primarios */
  --rosa-profundo: #C0335B;   /* rosa profundo — acentos y CTA */
  --verde-alma: #D84E7A;      /* tono de acento */
  --verde-oscuro: #A82C54;    /* texto sobre acento */
  --crema: #FDF2F4;           /* fondo global */
  --crema-profunda: #FBE6EA;  /* variante de fondo */
  --papel: #FFFFFF;           /* fondo de tarjetas y áreas de escritura */
  --texto-oscuro: #2E2328;    /* texto principal */
  --texto-suave: #83646C;     /* texto secundario, etiquetas */
}
```

**Cómo funciona esto en la práctica:** cada nombre que empieza con `--` (por ejemplo `--rosa-fuerte`) es una **variable de color**, es decir, una especie de "etiqueta" guardada en un solo lugar. Todas las páginas de la app (`index.html`, `chat.html`, `respiracion.html`, etc.) usan esas etiquetas en vez de repetir el código del color. La gran ventaja: si algún día se quisiera ajustar un tono, **se cambia una sola línea en `public/styles/main.css` y el cambio se aplica a toda la app de golpe**, sin tener que editar página por página.

### Las tipografías (tipos de letra)

La app usa tres tipografías gratuitas de Google Fonts, también declaradas en el bloque `:root` de `public/styles/main.css` y cargadas en cada página HTML:

- **`Cormorant Garamond`** (variable `--serif`): es la letra elegante con remates. Se usa para lo **emotivo** — frases, textos largos y títulos de sección, generalmente en *cursiva*.
- **`Italiana`** (variable `--display`): es la letra de la **marca**, la que escribe el nombre "TERAPIA rosa" en el encabezado.
- **`Jost`** (variable `--sans`): es la letra limpia y sin remates para lo **funcional** — botones, etiquetas, navegación y textos de interfaz.

La regla de la marca es simple: **todo lo emotivo va en la letra serif en cursiva; todo lo funcional va en la letra sans**.

### Para qué sirve cada archivo de logo

En la carpeta `public/` están todos los archivos de imagen de la marca. Comprobé que **los ocho existen**. Cada uno cumple una función distinta:

1. **`isotipo-almarosa.png`** — el **isotipo** (el símbolo de la marca, sin el texto). Aparece en el **encabezado** de la pantalla de inicio, al lado del nombre "TERAPIA rosa" (referenciado en `index.html`).
2. **`isotipo-almarosa-blanco.png`** — la **versión en blanco** del mismo isotipo, pensada para colocarse sobre fondos oscuros o de color, donde la versión normal no se vería bien.
3. **`logo-almarosa.png`** — el **logo completo** de la Fundación (símbolo + nombre). Se muestra más abajo en la pantalla de inicio como **crédito y reconocimiento a la Fundación Alma Rosa** (referenciado en `index.html`).
4. **`favicon-32.png`** — el **favicon**: el iconito pequeño que el navegador muestra en la pestaña y en los marcadores. Está enlazado en todas las páginas.
5. **`apple-touch-icon.png`** — el ícono que usa el **iPhone/iPad** cuando alguien guarda la app en la pantalla de inicio del celular. También enlazado en todas las páginas.
6. **`icon-192.png`** — ícono mediano para Android y para cuando se "instala" la app en el celular (definido en `manifest.json`).
7. **`icon-512.png`** — ícono grande, en alta resolución, para la pantalla de inicio del celular y la pantalla de carga (definido en `manifest.json`).

> Nota: también existe el archivo `icon-1024.png` en la carpeta (un ícono extra grande de respaldo), aunque las páginas no lo usan directamente. No hace falta borrarlo.

En resumen: el **isotipo** va arriba en el encabezado, el **logo completo** va como crédito de la Fundación, y los **favicons e íconos** son las versiones pequeñas que ven el navegador y la pantalla de inicio del celular.

### Recomendación importante

**No cambien la paleta de colores ni las tipografías.** Estos tonos rosados (basados en los Pantone **708C** y **191C** de la Fundación) y los tipos de letra son la identidad de Alma Rosa. Mantenerlos hace que la app se sienta parte de la Fundación y transmita calma y cuidado. Si en algún momento se necesita un ajuste de color, debe hacerse **únicamente en el bloque `:root` de `public/styles/main.css`** y de común acuerdo con la Fundación, nunca cambiando colores sueltos en páginas individuales.

---

## ¿Cómo funciona el flujo de cambios?

1. Tú editas un archivo directamente en GitHub (en el navegador, con un botón de lápiz)
2. Guardas el cambio (se llama "commit")
3. **GitHub Pages** publica el sitio solo, de forma automática, en **1 a 2 minutos**
4. Tu cambio queda en vivo

**Sin terminal. Sin programar. Sin instalar nada.**

---

## Cómo editar un archivo en GitHub paso a paso

1. Entra al repositorio: `https://github.com/terapiarosa8/terapia-rosa`
2. Navega a la carpeta donde está el archivo
3. Click en el archivo para abrirlo
4. Click en el icono de **✏️ lápiz** (arriba a la derecha)
5. Haz el cambio
6. Baja al final de la página
7. En "Commit changes", escribe una nota corta (ej: "Agregué frase nueva")
8. Click en **"Commit changes"** verde
9. Listo. En 1 a 2 minutos el sitio está actualizado.

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
    accent: '#E95178',
    bgFrom: '#FAD9DE', bgTo: '#E95178',
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

**Qué son las respuestas demo:** son las respuestas de Alma escritas dentro del sitio, que se activan por palabras clave. **Hoy el sitio funciona SOLO con estas respuestas** (modo "navegadora"), sin inteligencia artificial externa — por eso Alma contesta al instante y sin necesidad de servidor. Esta es la sección que usarás para editar a Alma. (El proyecto incluye además, **sin usar**, el código de una versión opcional con IA real; activarla requeriría la ayuda de un desarrollador y **no es necesaria** para el sitio actual.)

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

## 8. Activar analytics anónimos (saber cuántas usan el sitio)

**Archivo:** `public/js/analytics.js`

**¿Qué hace?** Permite a la fundación saber **cuántas pacientes** entran al sitio, **qué páginas** ven más, y desde **qué tipo de dispositivo** (celular/computador) — sin saber QUIÉNES son.

**Lo que NO hace:**
- ❌ NO usa cookies
- ❌ NO recoge nombres, emails, ni datos personales
- ❌ NO sabe qué escribe la usuaria en el diario
- ❌ NO comparte datos con terceros (más allá del proveedor de analytics elegido)

**Cómo lo activas (opción recomendada: Plausible)**

1. Entra a https://plausible.io y crea cuenta (30 días gratis, después ~$9/mes con descuento para fundaciones)
2. Agrega el dominio del sitio: `terapiarosa8.github.io`
3. En GitHub, abre `public/js/analytics.js`
4. Busca esta línea:
   ```javascript
   const PLAUSIBLE_DOMAIN = '';
   ```
5. Cámbiala por:
   ```javascript
   const PLAUSIBLE_DOMAIN = 'terapiarosa8.github.io';
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

## ⚠️ Si algo se rompe (y cómo arreglarlo)

### Problema: el sitio se queda en blanco

**Causa más común:** un error de sintaxis (una coma faltante, una comilla mal cerrada).

**Cómo arreglarlo:**
1. En GitHub, entra a la pestaña **"Actions"** (arriba en el repositorio)
2. Mira el último flujo **"Deploy to GitHub Pages"**
3. Si tiene una **✗ roja** (falló), haz click para ver el error
4. Si tiene **✓ verde** (publicado) pero el sitio sale en blanco:
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

### Cómo deshacer un cambio en GitHub

1. Ve al repo en GitHub
2. Click en la pestaña **"Commits"** (arriba)
3. Encuentra el commit que rompió el sitio
4. Click en los tres puntitos `...` al lado
5. **"Revert"** (revertir) — crea un nuevo commit que deshace el anterior
6. GitHub Pages republica el sitio solo en 1-2 minutos

---

## 🔐 Seguridad — buenas prácticas

- ✅ El sitio **no guarda datos personales**: no hay cuentas ni login, y lo que cada persona escribe en el diario o el muro queda **solo en su propio celular** (no se sube a ningún servidor).
- ❌ **NUNCA** pongas contraseñas, llaves de API ni datos sensibles dentro de los archivos del sitio: la carpeta `public/` y el repositorio son **públicos** (cualquiera puede verlos).
- ❌ **NUNCA** compartas claves o accesos por WhatsApp ni por correo.

> Si algún día se activa la versión con IA real (Gemini), hay reglas adicionales para cuidar la llave de la API — pídele a un desarrollador que las aplique.

---

## 📱 Datos clave y contactos

**Datos técnicos del proyecto**

- **Sitio en vivo:** https://terapiarosa8.github.io/terapia-rosa/
- **Repositorio (código):** https://github.com/terapiarosa8/terapia-rosa
- **Cómo se publica:** GitHub Pages (automático al guardar en la rama `main`)
- **Cuenta de GitHub del proyecto:** terapiarosa8

**Personas y apoyo**

- **Coordinadora del proyecto:** Adriana (La Soberana SAS)
- **Fundación:** Alma Rosa (https://fundacionalmarosa.org)
- **Línea de apoyo de la fundación:** +57 310 415 6261

---

🌸 **Hecho con cariño para acompañar a las guerreras de la Fundación Alma Rosa.**
