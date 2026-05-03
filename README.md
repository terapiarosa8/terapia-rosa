# Terapia Rosa — Micrositio

Micrositio web de acompañamiento durante quimioterapia para la **Fundación Alma Rosa** (Colombia).

## Stack

- **Frontend:** HTML + CSS + JavaScript vanilla (sin frameworks)
- **Backend:** Netlify Functions (Node.js) — solo para el proxy seguro de la API
- **IA:** Google Gemini API — modelo `gemini-2.0-flash` (plan gratuito)
- **Hosting:** Netlify (plan gratis)
- **Tipografías:** Google Fonts (Cormorant Garamond, Italiana, Jost)

## Estructura

```
terapia-rosa/
├── public/                      # Lo que se sirve al navegador
│   ├── index.html               # Home
│   ├── chat.html                # Chat con Alma
│   ├── respiracion.html         # Respiración guiada
│   ├── bienestar.html           # Yoga + meditaciones (YouTube)
│   ├── colorear.html            # Mandalas para colorear
│   ├── mi-espacio.html          # Hub: diario, juegos, muro, biblioteca
│   ├── diario.html              # Diario privado (localStorage)
│   ├── muro.html                # Muro de mensajes (curados + propios)
│   ├── juegos.html              # Sopa de palabras
│   ├── biblioteca.html          # Contenido educativo
│   ├── styles/
│   │   └── main.css             # Sistema de diseño
│   └── js/
│       ├── utils.js             # Helpers compartidos
│       └── chat.js              # Cliente del chat
├── netlify/
│   └── functions/
│       └── chat.js              # Proxy seguro a Gemini API
├── netlify.toml                 # Config + headers de seguridad
└── README_PUBLICAR.md           # Guía paso a paso para publicar
```

## Características

### Para las mujeres en quimioterapia
- 💬 Chat con "Alma" — IA empática que acompaña sin diagnosticar
- 🌬️ Respiración guiada (4-4-6, 5 ciclos)
- 🎨 Colorear digital (4 mandalas SVG, paleta de 12 colores)
- 🧘 Yoga y meditaciones (videos de YouTube)
- 📖 Diario privado (solo en el dispositivo)
- 💌 Muro de mensajes entre guerreras
- 🎮 Sopa de palabras para distracción suave
- 📚 Biblioteca educativa: nutrición, emociones, piel, familia, journaling

### Decisiones técnicas
- Mobile-first (max 480px)
- Sin login ni cuentas — anonimato total
- localStorage para diario y muro (no se sube nada a servidores)
- Detección de crisis con derivación a líneas de apoyo
- Rate limit: 25 mensajes/sesión
- CSP estricto, sin third-party tracking

## Seguridad

- ✅ API key vive **solo** en variables de entorno de Netlify
- ✅ Frontend nunca toca la API key directamente
- ✅ Sanitización de inputs (max 1000 chars por mensaje)
- ✅ Headers: X-Frame-Options, CSP, Referrer-Policy
- ✅ Rate limit en mensajes y conversaciones
- ✅ Detección de palabras clave de crisis

## Cómo desarrollar localmente

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# En la carpeta del proyecto
netlify dev
# → http://localhost:8888
```

Variable de entorno necesaria:
```bash
export GEMINI_API_KEY=tu-clave-de-google-aistudio
```

Conseguir clave gratis en: https://aistudio.google.com/apikey

## Cómo publicar

Ver [README_PUBLICAR.md](./README_PUBLICAR.md).

## Licencia

Hecho para la Fundación Alma Rosa. Todos los derechos reservados.
