# Manual de la aplicación Terapia Rosa

_Guía de entrega y mantenimiento para la **Fundación Alma Rosa**._

> Este documento es la versión en línea del manual entregado a la Fundación. Explica qué es la aplicación, cómo se creó, cómo funciona y cómo mantenerla (agregar videos y otros contenidos). Sitio en vivo: <https://terapiarosa8.github.io/terapia-rosa/>

## Contenido

1. Qué es Terapia Rosa y para quién
2. Cómo está hecha (cómo se creó)
3. Recorrido por las pantallas
4. Alma, la guía conversacional
5. La marca Alma Rosa en la app
6. Cómo se publican los cambios (GitHub Pages)
7. Cómo agregar un video nuevo a Bienestar (Yoga & medita)
8. Cómo editar otros contenidos
9. Seguridad y buenas prácticas (qué cuidar)
10. Datos clave y contactos

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

## Alma, la guía conversacional

**Alma** es la acompañante con la que conversa la paciente en la pantalla de chat. No es solo "un chat que responde bonito": su trabajo principal es **escuchar cómo se siente la persona, validar esa emoción con palabras suaves y luego recomendarle un recurso del sitio** mediante botones grandes que la llevan directo a la pantalla indicada (respirar, colorear, escribir en el diario, leer el muro, jugar, etc.).

El código real de Alma vive en un solo archivo:

```
public/js/chat.js
```

### Lo más importante de entender: Alma funciona SIN internet inteligente y SIN servidor

Hoy Alma trabaja en lo que el código llama **"modo navegadora"** (en inglés, "demo"). Esto quiere decir que **todas sus respuestas ya están escritas dentro del mismo archivo** `chat.js` y se muestran directamente en el celular de la paciente. No hay ninguna **inteligencia artificial** externa pensando las respuestas, y no hay ningún **servidor** (computador remoto) procesando nada.

El propio archivo lo dice en sus primeras líneas:

> `// No usa IA externa — todas las respuestas están en respuestasDemo.`

Esto tiene una ventaja enorme para la fundación:

- Como todo ocurre **dentro del navegador del celular**, el sitio funciona perfecto publicado en **GitHub Pages** (que solo sabe mostrar páginas, no ejecutar programas).
- No hay costos, ni claves, ni nada que se pueda "caer" o vencerse.
- La conversación no sale del dispositivo de la paciente; cuando ella toca "borrar conversación", no queda rastro.

### ¿Cómo "entiende" Alma lo que le escriben?

Alma no entiende frases completas como lo haría una persona. Lo que hace es **buscar palabras clave** dentro de lo que la paciente escribe. Esas palabras y sus respuestas viven en un bloque del archivo llamado **`respuestasDemo`**.

Por ejemplo, si la paciente escribe *"hoy me siento muy ansiosa"*, Alma detecta la palabra **`ansiosa`** y responde el texto asociado, más dos botones: **Respiración guiada** y **Música suave + respiración**.

Cuando la paciente escribe algo que no contiene ninguna palabra reconocida, Alma no se queda muda: responde un mensaje amable invitándola a contar más, con ejemplos de qué puede escribir ("estoy ansiosa", "necesito distraerme", "no puedo dormir", etc.).

Hoy Alma reconoce más de **30 palabras y expresiones**, entre ellas: `ansiosa`, `ansiedad`, `no puedo dormir`, `insomnio`, `quiero llorar`, `triste`, `aburrida`, `tengo miedo`, `estresada`, `cansada`, `sola`, `comer`, `autocuidado`, `meditar`, `yoga`, `pintar`, `jugar`, `leer`, `escribir`, `diario`, `gracias` y `hola`.

### La estructura real de una respuesta (esto es lo que se edita)

Cada entrada dentro de `respuestasDemo` tiene exactamente dos partes:

1. **`texto`**: el mensaje cálido que dice Alma.
2. **`recursos`**: la lista de botones que aparecen debajo (las recomendaciones).

Así se ve una entrada **real** del archivo (la de "ansiosa"):

```js
'ansiosa': {
  texto: 'La ansiedad es así: aprieta el pecho y acelera todo por dentro 🌿. Lo primero que te ayuda es bajar el ritmo de la respiración. Te dejo dos cosas que pueden servirte ahorita:',
  recursos: ['respira', 'musica']
},
```

Los nombres que van dentro de `recursos` (como `respira` y `musica`) **no son inventados**: tienen que ser uno de los recursos ya definidos arriba en el mismo archivo, en el bloque llamado **`RECURSOS`**. Las opciones disponibles hoy son exactamente estas:

```
respira, musica, colorear, diario, muro, sopa, memoria,
acertijos, yoga, nutricion, saludmental, autocuidado
```

Cada uno de esos recursos ya trae su ícono, su título y la pantalla a la que lleva el botón, así que al editar solo hay que **nombrarlos** en la lista. Si se escribe un nombre que no está en la lista de arriba, ese botón simplemente no aparecerá (no rompe nada, pero tampoco se muestra).

### Cómo agregar o editar una respuesta de Alma

1. Abre el archivo `public/js/chat.js`.
2. Busca el bloque que empieza con **`const respuestasDemo = {`** (cerca del comienzo del archivo).
3. Para **editar** una respuesta existente: cambia el texto entre comillas en la línea `texto:` de la palabra que quieras ajustar.
4. Para **agregar** una respuesta nueva: copia y pega una entrada completa (incluida la coma final) y modifícala. Por ejemplo, para que Alma reconozca la palabra **"agradecida"**:

```js
'agradecida': {
  texto: 'Qué lindo notar lo que sí está bien 💛. Si quieres dejar ese sentir en algún lado, el diario o el muro son perfectos para eso:',
  recursos: ['diario', 'muro']
},
```

Reglas simples para no equivocarse:

- La palabra clave (a la izquierda, `'agradecida'`) va siempre **en minúsculas**, porque Alma compara todo en minúsculas.
- Respeta las **comillas** y la **coma** al final de cada entrada, igual que en las demás.
- En `recursos` usa solo nombres de la lista permitida (`respira`, `musica`, `colorear`, …). Si no quieres mostrar ningún botón, déjalo vacío así: `recursos: []` (como en las entradas `hola` y `gracias`).
- Guarda el archivo y vuelve a publicar el sitio para ver el cambio.

Un detalle útil: cuando una frase contiene varias palabras reconocidas, Alma **prefiere la coincidencia más larga y específica**. Por ejemplo, "no puedo dormir" gana sobre una palabra suelta, para dar siempre la respuesta más precisa.

### ¿Y la "IA real"? Es una posibilidad futura, no algo que falte

En documentos antiguos del proyecto se menciona conectar a Alma con una **inteligencia artificial real (Gemini, de Google)** para que improvise respuestas en lugar de usar solo las pre-escritas. Eso sería una **mejora futura opcional**, no algo que el sitio necesite hoy. Activarla implicaría dos cosas que hoy no existen en esta publicación:

- **Hospedar un pequeño programa de servidor** (una "función") que hable con Google por detrás, porque GitHub Pages no puede hacerlo solo.
- **Conseguir y guardar de forma segura una llave de acceso (API key)** de Google.

Mientras tanto, el modo navegadora con respuestas curadas es totalmente funcional, gratuito y seguro: **Alma ya valida emociones y guía a la paciente al recurso correcto, sin depender de nada externo.**

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

## Cómo se publican los cambios (GitHub Pages)

El sitio en vivo de Terapia Rosa está en esta dirección:

```
https://terapiarosa8.github.io/terapia-rosa/
```

La buena noticia: **no necesitan programar ni instalar nada** para actualizarlo. Pueden editar los textos y archivos directamente desde la página web de GitHub, usando solo el navegador (Chrome, Safari, Edge, etc.).

### ¿Cómo funciona la publicación? (en palabras simples)

El sitio se publica **únicamente con GitHub Pages**, que es el servicio gratuito de GitHub para mostrar páginas web. Funciona con un **flujo automático** (una especie de robot que GitHub ejecuta solo, llamado **GitHub Actions**).

Ese robot está configurado en un archivo llamado `.github/workflows/pages.yml`. Cada vez que alguien **guarda un cambio en la rama `main`** (la versión principal del proyecto), el robot se activa solo y hace lo siguiente:

1. Toma todo lo que hay dentro de la carpeta `public/`.
2. Lo sube a GitHub Pages.
3. Deja el sitio actualizado en `https://terapiarosa8.github.io/terapia-rosa/`.

Es decir: **ustedes solo guardan el cambio, y el resto pasa automáticamente.** No hay que tocar ningún botón de "publicar".

> Nota: La carpeta que se publica es `public/`. Todo lo que el público ve (las páginas como `index.html`, `chat.html`, `respiracion.html`, etc.) vive ahí dentro. Si editan algo fuera de `public/`, no se reflejará en el sitio.

### Pasos para editar y publicar desde el navegador

1. **Entren al repositorio** del proyecto en GitHub:

   ```
   https://github.com/terapiarosa8/terapia-rosa
   ```

   (Un "repositorio" es simplemente la carpeta del proyecto guardada en GitHub. Deben iniciar sesión con la cuenta que tiene acceso.)

2. **Abran la carpeta `public/`** haciendo clic sobre su nombre en la lista de archivos. Dentro encontrarán las páginas del sitio. Hagan clic en el archivo que quieren editar, por ejemplo `index.html` (la página de inicio).

3. **Hagan clic en el ícono del lápiz** (✏️) que aparece arriba a la derecha del contenido del archivo. Al pasar el cursor por encima dice **"Edit this file"** (Editar este archivo). Eso abre el archivo en modo edición.

4. **Hagan el cambio** que necesiten directamente en el texto (por ejemplo, corregir una palabra o actualizar una frase).

5. **Hagan clic en el botón verde "Commit changes"** (Guardar cambios), que aparece arriba a la derecha. Se abrirá una ventanita; pueden escribir una breve nota de qué cambiaron (opcional) y confirmar dejando seleccionada la opción de guardar **directamente en la rama `main`**. Al confirmar, el cambio queda guardado.

   > "Commit" es la palabra que usa GitHub para decir "guardar este cambio de forma definitiva".

6. **Esperen entre 1 y 2 minutos.** Apenas guardan en `main`, el robot de GitHub Actions empieza a trabajar solo y publica la nueva versión. No tienen que hacer nada más.

### Después de publicar: revisen el sitio

- Pasados **1 a 2 minutos**, abran el sitio en vivo y verifiquen que el cambio se ve bien:

  ```
  https://terapiarosa8.github.io/terapia-rosa/
  ```

- Si todavía ven la **versión vieja**, casi siempre es por la **caché** del navegador (una copia guardada de la página anterior). Para forzar que cargue la versión más reciente, recarguen la página con:
  - **Windows:** `Ctrl + Shift + R`
  - **Mac:** `Cmd + Shift + R`

### Cuidado al editar (muy importante)

Los archivos del sitio contienen, además del texto visible, **código** que hace que todo funcione. Por eso, al editar tengan cuidado con dos cosas:

- **Las comas (`,`) y las comillas (`'` `"`)**: si se borra o se agrega una por error, una página puede dejar de funcionar.
- **Cambien solo el texto** que se ve (por ejemplo, lo que está entre comillas o entre etiquetas como `<p>...</p>`), y eviten tocar los símbolos que lo rodean.

Si algo se ve raro después de un cambio, lo más seguro es volver al mismo archivo en GitHub y revisar que las comas y comillas hayan quedado igual que antes. Ante la duda, mejor pidan ayuda antes de guardar.

---

## Cómo agregar un video nuevo a Bienestar (Yoga & medita)

Esta es probablemente la tarea que más harán: sumar videos de yoga suave o de meditación a la página **Yoga & medita**. La buena noticia es que se hace en **un solo lugar** y no requiere saber programar. Solo hay que copiar una línea, cambiar unos textos y guardar.

### 1. Dónde se edita

El archivo es:

```
public/bienestar.html
```

Dentro de ese archivo busca el texto **`const videos`** (puedes usar Buscar / Ctrl+F o Cmd+F). Vas a encontrar una lista con dos grupos: **`yoga`** y **`medita`**. Cada video es una línea que empieza con `{ videoId:` y termina con `},`. Así se ve hoy:

```js
const videos = {
  yoga: [
    { videoId: '734879097', title: 'Conceptos básicos', author: 'Ana Isabel · Yogalama', duration: 53, tag: 'Suave' },
    { videoId: '20W-fPS0O2o', title: 'Yoga para pacientes en tratamiento oncológico', author: 'Brenda Medina', duration: 22, tag: 'Suave' },
    ...
  ],
  medita: [
    { videoId: 'fcWgB_rHamw', title: 'Meditación guiada para mujeres con cáncer de mama', author: 'Luisa Pedrero', duration: 18, tag: 'Sanación' },
    ...
  ],
};
```

### 2. Qué significa cada parte de un video

Cada video es un **objeto** (eso es lo que va entre llaves `{ }`) con cinco datos. Hay que llenarlos todos:

- **`videoId`** — el identificador del video (de YouTube o Vimeo). Va entre comillas `' '`. Más abajo te explico cómo sacarlo.
- **`title`** — el título que verá la paciente. Va entre comillas. Ej: `'Yoga suave en cama'`.
- **`author`** — quién hizo el video (canal o persona). Va entre comillas. Ej: `'Brenda Medina'`.
- **`duration`** — la duración **en minutos, como número** (sin comillas, sin la palabra "min"). Ej: `18`. La página le agrega sola la palabra "min".
- **`tag`** — una etiqueta corta de tono. Va entre comillas. Ej: `'Suave'`, `'Principiante'`, `'Sanación'`, `'Tranquilo'`.

### 3. Cómo sacar el `videoId`

**Si es un video de YouTube:** abre el video y mira la dirección (URL) en la barra del navegador. Es lo que viene **después de `v=`**. Por ejemplo:

```
https://www.youtube.com/watch?v=ABC123  →  el videoId es 'ABC123'
```

Copia solo esa parte (`ABC123`), sin el `https://...` ni el `v=`.

**Si es un video de Vimeo:** el `videoId` son **solo números**. Por ejemplo, en `https://vimeo.com/734879097` el videoId es `'734879097'`. No tienes que indicar nada más: la página detecta sola que, **si el id son puros números, es un video de Vimeo**, y si tiene letras, es de YouTube. Así que solo pega el id correcto y listo.

### 4. En cuál grupo lo pones: `yoga` o `medita`

- Si es una clase de **movimiento o estiramiento**, va dentro de los corchetes de **`yoga`**.
- Si es una **meditación o relajación guiada**, va dentro de los corchetes de **`medita`**.

El **primer video de cada grupo** es el que aparece destacado arriba ("Recomendado hoy" / "Para hoy"). Si quieres que tu nuevo video sea el destacado, ponlo de primero en la lista; si no, ponlo más abajo.

### 5. Reglas importantes para no romper la página

Estas son las dos cosas que más fácil fallan. Revísalas siempre:

1. **La coma al final.** Cada video termina con una coma `,` después de la llave de cierre `}`. Si vas a pegar tu video después de otro, asegúrate de que **el video anterior tenga su coma** al final.
2. **Las comillas.** Los textos (`videoId`, `title`, `author`, `tag`) van **entre comillas simples** `' '`. El único que NO lleva comillas es `duration`, porque es un número. **Ojo:** si dentro de un título usas un apóstrofo (por ejemplo "qué"), no hay problema porque usamos tildes normales; pero evita escribir comillas simples dentro del texto.

### 6. Ejemplo completo: agregar un video al grupo `yoga`

Supongamos que quieres agregar un video de YouTube cuya dirección es `https://www.youtube.com/watch?v=Jb8jp0i9NgY`, una clase de yoga en silla de 15 minutos. Quedaría así (la línea nueva es la última, en **negrita** mentalmente):

```js
  yoga: [
    { videoId: '734879097', title: 'Conceptos básicos', author: 'Ana Isabel · Yogalama', duration: 53, tag: 'Suave' },
    { videoId: '20W-fPS0O2o', title: 'Yoga para pacientes en tratamiento oncológico', author: 'Brenda Medina', duration: 22, tag: 'Suave' },
    { videoId: 'HpyZ_cRrgHI', title: 'Clase De Yoga Para Estirar El Cuerpo Y Sentirte Bien', author: 'Move With Nicole En Español', duration: 20, tag: 'Suave' },
    { videoId: '5JR8GoLSn8k', title: 'Clase de yoga suave para principinates', author: 'Brenda Medina', duration: 18, tag: 'Principiante' },
    { videoId: '2jqyPWn99E4', title: 'Yoga Restaurativo', author: 'Anabel Otero', duration: 32, tag: 'Suave' },
    { videoId: 'Jb8jp0i9NgY', title: 'Yoga suave en silla', author: 'Nombre del canal', duration: 15, tag: 'Suave' },
  ],
```

Fíjate en tres detalles del ejemplo: la línea de **arriba** (la de "Yoga Restaurativo") **termina con coma**, tu nueva línea también **termina con coma**, y `duration` es **el número `15` sin comillas**.

### 7. Guardar y ver el resultado

Después de guardar el cambio (al hacer **commit en la rama `main`** del proyecto en GitHub), el video aparece **solo** en la página, sin tener que hacer nada más. El sitio se actualiza por sí mismo en aproximadamente **1 a 2 minutos**. Solo refresca la página **Yoga & medita** en el celular y allí estará tu video nuevo, con su imagen de portada y su duración. Al tocarlo, se abre y empieza a reproducirse dentro de la misma página.

---

## Cómo editar otros contenidos

Aquí tienes recetas paso a paso para cambiar los textos que se repiten en el sitio: la **frase del día**, los **acertijos**, las **palabras de la sopa**, los **mensajes del muro** y los **videos de la biblioteca**.

Antes de empezar, tres reglas de oro que evitan que algo se rompa:

1. **Edita solo el texto que está entre comillas** (`'...'`). No borres las comillas, ni las llaves `{ }`, ni los corchetes `[ ]`.
2. **Cada elemento de una lista termina en coma** (`,`). Si copias uno para crear otro, no olvides la coma al final.
3. Si tu texto **lleva un apóstrofo** (por ejemplo `D'Alma`), usa comillas dobles por fuera: `texto: "Soy D'Alma"`. Así no se confunde con las comillas del código.

> **Término técnico:** un **arreglo** (o *array*) es simplemente una **lista** de elementos separados por comas, encerrada entre corchetes `[ ]`. Cada elemento suele ser un **objeto**: un grupo de datos encerrado en llaves `{ }`, donde cada dato tiene un nombre (por ejemplo `texto`) y un valor (lo que va después de los dos puntos).

---

### Frase del día

- **Archivo:** `public/js/utils.js`
- **Qué buscar:** el arreglo `const FRASES_DIA = [`
- **Cómo funciona:** el sitio muestra una frase distinta cada día del mes, rotando automáticamente por la lista. No tienes que hacer nada para que cambie de día.

Cada frase es un objeto con dos campos: `texto` (la frase) y `autor` (la firma). Así se ven en el archivo:

```js
const FRASES_DIA = [
  { texto: 'El cuerpo que te trajo hasta aquí también te llevará al otro lado.', autor: 'Una guerrera más' },
  { texto: 'No tienes que ser fuerte todos los días. Hay días para descansar.', autor: 'Una guerrera más' },
  ...
];
```

**Para agregar una frase nueva**, copia una línea completa y pégala dentro de los corchetes, antes del `];` final:

```js
{ texto: 'Tu paso de hoy, aunque sea pequeño, también es avanzar.', autor: 'Una guerrera más' },
```

---

### Acertijo

- **Archivo:** `public/js/acertijos.js`
- **Qué buscar:** el arreglo `const acertijos = [`
- **Cómo funciona:** el juego elige un acertijo al azar y va rotando sin repetir hasta agotarlos.

Cada acertijo es un objeto con **cuatro campos** (estos son los nombres exactos del archivo):

- `pregunta` — el texto del acertijo.
- `opciones` — una lista de **cuatro** respuestas posibles (van entre corchetes, separadas por comas).
- `correcta` — el **número de la opción correcta**. Importante: se cuenta empezando desde **0**. Es decir, la primera opción es `0`, la segunda es `1`, la tercera es `2` y la cuarta es `3`.
- `feliz` — el mensaje cariñoso que aparece cuando la persona acierta.

Ejemplo real del archivo:

```js
{
  pregunta: 'Soy ese momento del día en que el cielo se viste de rosa y todo parece detenerse...',
  opciones: ['El amanecer', 'El atardecer', 'La medianoche', 'El mediodía'],
  correcta: 1,
  feliz: 'Y como tú, después de mí, siempre vuelve la luz. 🌅',
},
```

En este ejemplo `correcta: 1` significa que la respuesta correcta es **El atardecer** (la segunda opción).

**Para agregar un acertijo nuevo**, copia un bloque completo (desde `{` hasta `},`) y pégalo dentro de los corchetes. Cambia los textos y ajusta `correcta` para que apunte a la opción buena (recuerda: 0, 1, 2 o 3):

```js
{
  pregunta: 'Soy lo que queda cuando todo lo demás se calla, y me encuentras dentro de ti...',
  opciones: ['El ruido', 'La calma', 'La prisa', 'El miedo'],
  correcta: 1,
  feliz: 'Vive en ti aunque a veces la olvides. Vuelve a ella cuando quieras. 🌿',
},
```

---

### Palabras de la sopa

- **Archivo:** `public/js/sopa.js`
- **Qué buscar:** el arreglo `const POOL = [` (está casi al inicio del archivo, en la línea 2)
- **Cómo funciona:** de toda la lista, el juego toma **8 palabras al azar** cada vez que se juega.

A diferencia de las otras listas, aquí **no hay objetos**: es simplemente una lista de palabras sueltas entre comillas. Así se ve:

```js
const POOL = ['FUERZA','VIDA','AMOR','ALMA','LUZ','PAZ','BELLA','SANAR','ABRAZO','HOY','CALMA','FE'];
```

Dos reglas para que las palabras encajen en el tablero:

1. **Todo en MAYÚSCULAS.**
2. **Máximo 8 letras.**
3. **Sin tildes ni la letra Ñ** (el tablero solo usa las letras del alfabeto sin acentos). Por ejemplo, usa `CORAZON`, no `CORAZÓN`.

**Para agregar una palabra**, escríbela entre comillas y agrégala a la lista, separada por coma:

```js
const POOL = ['FUERZA','VIDA','AMOR','ALMA','LUZ','PAZ','BELLA','SANAR','ABRAZO','HOY','CALMA','FE','CORAZON','CALOR'];
```

---

### Mensaje del muro

- **Archivo:** `public/muro.html`
- **Qué buscar:** el arreglo `const mensajesBase = [` (está dentro de la sección `<script>`, cerca del final del archivo)
- **Cómo funciona:** son los mensajes que la fundación deja escritos de antemano. Aparecen siempre, mezclados con los que las pacientes escriben desde su propio celular.

> **Ojo:** este es el único de estos contenidos que **no** está en la carpeta `public/js/`. Vive dentro del propio archivo `muro.html`. Búscalo por el comentario `// ─── Mensajes iniciales (curados por la fundación) ────`.

Cada mensaje es un objeto con dos campos: `texto` (el mensaje) y `autor` (la firma, que puede ser un nombre o "Anónima"). Ejemplo real:

```js
const mensajesBase = [
  { texto: 'Tú puedes. Yo ya pude. Y muchas más vienen detrás.', autor: 'María, sobreviviente' },
  { texto: 'En los días grises también florecen flores.', autor: 'Carmen' },
  ...
];
```

**Para agregar un mensaje**, copia una línea y pégala dentro de los corchetes, separada por coma:

```js
{ texto: 'Cada día que despiertas es una pequeña victoria.', autor: 'Anónima' },
```

---

### Tema de Biblioteca

- **Archivo:** `public/js/biblioteca.js`
- **Qué buscar:** el arreglo `const topics = [`
- **Cómo funciona:** la biblioteca está organizada en **temas** (Nutrición, Salud mental, Autocuidado), y cada tema contiene una lista de **videos de YouTube**. El **primer video** de cada tema aparece destacado como "Recomendado hoy".

> **Importante:** en este archivo cada tema NO contiene textos de lectura, sino **videos**. Los campos reales son los de abajo (no existen campos como `accent`, `bgFrom` ni `body`).

Cada **tema** es un objeto con estos campos:

- `id` — un identificador corto, sin espacios ni tildes (ej: `'nutricion'`). Sirve solo por dentro.
- `icon` — el emoji que aparece junto al nombre (ej: `'🥗'`).
- `title` — el nombre del tema que ven las pacientes.
- `videos` — la lista de videos del tema.

Y cada **video** dentro de `videos` tiene estos campos:

- `videoId` — el código del video de YouTube (lo que va después de `youtu.be/` en la dirección). Si dice `'REEMPLAZAR_AQUI'`, es un espacio en blanco que aún no tiene video y no se muestra hasta que pongas uno real.
- `title` — el título corto que ven las pacientes.
- `author` — quién lo grabó, en formato `'Nombre · Ciudad'`.
- `duration` — la duración **en minutos, como número** (sin comillas: `17`, no `'17'`).
- `tag` — una etiqueta corta (ej: `'Alimentación'`, `'Práctico'`).

Ejemplo real de un video dentro del tema de Nutrición:

```js
{ videoId: 'uF23xVEy2k8', title: 'Aprende con Pilar Restrepo - médica funcional', author: 'Pilar Restrepo · Medellin', duration: 17, tag: 'Alimentación' },
```

**Para agregar un video a un tema existente**, busca su lista `videos:` y agrega una línea como esta (recuerda la coma al final). Para sacar el `videoId`, abre el video en YouTube y copia lo que aparece después de `youtu.be/` o de `?v=` en la dirección:

```js
{ videoId: 'AbC123xyz', title: 'Meditación suave para días de quimio', author: 'Laura Gómez · Medellin', duration: 9, tag: 'Tranquilo' },
```

**Para crear un tema nuevo**, copia un bloque de tema completo (desde `{ id:` hasta su `},`) y pégalo dentro de los corchetes de `topics`. Cambia el `id`, el `icon`, el `title` y la lista de `videos`:

```js
{
  id: 'movimiento', icon: '🤸', title: 'Movimiento suave',
  videos: [
    { videoId: 'AbC123xyz', title: 'Estiramientos para empezar el día', author: 'Laura Gómez · Medellin', duration: 8, tag: 'Suave' },
  ],
},
```

> Si un tema tiene todos sus videos en `'REEMPLAZAR_AQUI'`, las pacientes verán un mensaje amable de "Pronto la fundación va a agregar contenido nuevo" en lugar de videos vacíos.

---

## Seguridad y buenas prácticas (qué cuidar)

Buenas noticias: el sitio fue auditado y **aprobado para producción, con cero hallazgos críticos** (ver `AUDITORIA_SEGURIDAD.md`). Está diseñado para proteger a las pacientes. Solo hay que respetar unas reglas simples para que siga siendo seguro.

1. **Las llaves o contraseñas (la "API key") NUNCA van en los archivos de la carpeta `public/`.** Todo lo que vive en `public/` es **público**: cualquiera que visite el sitio puede verlo. Si el día de mañana activan la IA real de **Alma**, la clave de **Gemini** debe ir solo como variable de entorno con el nombre `GEMINI_API_KEY`, jamás escrita dentro de un archivo `.html` o `.js`.

2. **Nunca peguen datos sensibles en el código** (nombres de pacientes, teléfonos, correos, diagnósticos, contraseñas). El código está pensado para no guardar información personal de nadie.

3. **El sitio no guarda datos personales en ningún servidor.** Lo que cada persona escribe en el **Diario** (`diario.html`) y en el **Muro** (`muro.html`) se queda **solo en su propio celular** (en el navegador). La Fundación no tiene acceso a eso y, por ley (**Habeas Data, Ley 1581**), eso las protege: al no haber datos en un servidor, la Fundación no queda como responsable legal de cuidarlos.

4. **No hay cuentas ni login.** Cualquier mujer entra y usa el sitio de forma anónima. Esto es intencional y **no se debe cambiar**: protege a una persona en un momento vulnerable.

5. **Lo que NO se debe agregar** (rompería la protección): cuentas de usuario, una base de datos de diarios (ni siquiera en Google Sheets), seguimiento de identidad, o compartir datos con terceros.

6. **Recordatorio amable para las pacientes:** como el diario vive en el celular, conviene avisarles que, si prestan su teléfono, otra persona podría leerlo.

7. **Si más adelante activan la IA, agenden** rotar (renovar) la clave de Gemini cada 6 meses y revisar de vez en cuando que todo siga en orden. La próxima revisión de seguridad sugerida es el **2026-10-30**.

---

## Datos clave y contactos

Esta es la **lista de referencia rápida** del proyecto Terapia Rosa. Guarda esta página a la mano: aquí están todos los enlaces y datos importantes en un solo lugar.

| Dato | Enlace / Valor | ¿Para qué sirve? |
|---|---|---|
| **Sitio en vivo** | https://terapiarosa8.github.io/terapia-rosa/ | La página web tal como la ven las pacientes. Ábrela para revisar cómo se ve el sitio publicado. |
| **Repositorio (código)** | https://github.com/terapiarosa8/terapia-rosa | El lugar donde vive todo el código del sitio. Desde aquí se edita y se guarda. |
| **Cómo se publica** | **GitHub Pages** (automático) | Cada vez que se guarda un cambio en la rama **main**, el sitio se actualiza solo en unos minutos. No hay que hacer nada manual. |
| **Cuenta de GitHub del proyecto** | **terapiarosa8** | El usuario dueño del código en GitHub. Con esta cuenta se inicia sesión para hacer cambios. |
| **Fundación Alma Rosa** | https://fundacionalmarosa.org | Sitio oficial de la Fundación, aliada del proyecto. |
| **Línea de apoyo** | **+57 310 415 6261** | Teléfono de contacto y acompañamiento de la Fundación. |

### Algunos términos en palabras simples

- **Repositorio:** es como una carpeta en internet donde se guarda todo el código del sitio. En este proyecto está en GitHub, bajo la cuenta **terapiarosa8**.
- **Rama main:** es la versión "oficial" del sitio. Lo que esté en **main** es lo que el público ve.
- **GitHub Pages:** es el servicio (gratuito) que toma el código de la carpeta `public/` y lo convierte en la página web en vivo. La publicación es **automática**: al guardar un cambio en **main**, GitHub Pages republica el sitio sin pasos adicionales.

> **Nota importante:** Aunque en algunos archivos antiguos del proyecto se menciona "Netlify", el sitio **hoy se publica con GitHub Pages**. El enlace en vivo correcto es **https://terapiarosa8.github.io/terapia-rosa/**.

---
