# 🌸 Terapia Rosa — Cómo publicar el micrositio

Esta guía es para publicar el micrositio en internet de forma **gratuita** usando Netlify. No requiere saber programar, solo seguir los pasos.

**Tiempo estimado: 30 minutos.**

---

## 📋 Lo que necesitas antes de empezar

1. ✅ Esta carpeta completa con todos los archivos
2. ✅ Una cuenta de **Google** (la que ya usas para Gmail sirve)
3. ✅ Una cuenta de **GitHub** (gratis): https://github.com/signup
4. ✅ Una cuenta de **Netlify** (gratis): https://netlify.com/signup

**No se necesita tarjeta de crédito ni pagar nada.** Todo es gratis.

---

## PASO 1: Conseguir la API key de Gemini (donde "vive" Alma)

Esto es lo que hace que el chat con Alma funcione con inteligencia artificial real. **Gemini es gratis.**

1. Entra a https://aistudio.google.com/apikey
2. Inicia sesión con tu cuenta de Google
3. Si te pide aceptar los términos, acepta
4. Click en **"Create API key"** (Crear clave de API)
5. Selecciona un proyecto existente o crea uno nuevo (ej: "Terapia Rosa")
6. Copia la clave que aparece (es una cadena larga de letras y números)
7. **Guárdala en un lugar seguro** — solo se muestra completa una vez

⚠️ **NUNCA compartas esta clave con nadie ni la escribas en el código del sitio.**

**Costo:** $0. El plan gratuito de Gemini permite 15 mensajes por minuto y un millón de tokens por día — más que suficiente para la fundación.

---

## PASO 2: Subir los archivos a GitHub

GitHub es donde se guarda el código. Netlify lo lee desde ahí.

1. Entra a https://github.com e inicia sesión
2. Click en el botón verde **"New"** (nuevo repositorio)
3. Nombre del repositorio: `terapia-rosa`
4. Marca como **Public** o **Private** (cualquiera funciona)
5. **NO** marques "Add a README" — ya tenemos archivos
6. Click en **"Create repository"**

7. En tu computador, abre la carpeta `terapia-rosa` que te dio Adriana
8. Sigue las instrucciones que GitHub muestra en pantalla bajo **"…or push an existing repository from the command line"**:

```bash
cd terapia-rosa
git init
git add .
git commit -m "Primera versión del micrositio"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/terapia-rosa.git
git push -u origin main
```

(Reemplaza `TU-USUARIO` por tu nombre de usuario de GitHub)

---

## PASO 3: Conectar Netlify con GitHub

1. Entra a https://app.netlify.com
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona **"Deploy with GitHub"**
4. Autoriza el acceso a tu cuenta de GitHub
5. Busca y selecciona el repositorio `terapia-rosa`
6. En la pantalla de configuración:
   - **Branch to deploy:** `main`
   - **Publish directory:** `public`
   - **Build command:** (déjalo vacío)
7. Click en **"Deploy site"**

Netlify va a publicar el sitio en una URL temporal tipo `nombre-aleatorio.netlify.app`. **Aún falta un paso para que el chat funcione.**

---

## PASO 4: Configurar la API key en Netlify (CRÍTICO)

Esto es lo que conecta el chat con Alma.

1. En Netlify, dentro de tu sitio, ve a **Site settings** (arriba a la derecha)
2. En el menú izquierdo: **Environment variables**
3. Click en **"Add a variable"**
4. Configúralo así:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** (pega la clave que copiaste en el Paso 1)
   - **Scopes:** marca solo "Functions"
5. Click en **"Create variable"**

6. Vuelve a **Deploys** (en el menú izquierdo)
7. Click en **"Trigger deploy"** → **"Deploy site"** para que el sitio se reconstruya con la clave

---

## PASO 5: Cambiar el nombre del sitio (opcional pero recomendado)

1. **Site settings** → **Change site name**
2. Pon algo como `terapia-rosa-alma-rosa` o `terapia-rosa-fundacion`
3. La URL queda como `terapia-rosa-alma-rosa.netlify.app`

---

## PASO 6: Probar que todo funciona

Abre la URL del sitio en tu celular o computador y prueba:

1. ✅ La página de inicio carga con la frase del día
2. ✅ Tocar **"Habla con Alma"** abre el chat
3. ✅ Escribir "hola" — Alma debe responder en menos de 10 segundos
4. ✅ Tocar **"Respira"** muestra el círculo que se infla y desinfla
5. ✅ Tocar **"Colorear"** permite pintar las figuras
6. ✅ El **diario** guarda lo que escribes (cierra y vuelve a abrir, debe seguir ahí)

Si el chat NO responde:
- Revisa que la variable `GEMINI_API_KEY` esté bien escrita en Netlify
- Revisa que la clave de Gemini esté activa en https://aistudio.google.com/apikey
- Vuelve a hacer "Trigger deploy" después de configurar la variable

---

## PASO 7: Conectar al sitio principal de la fundación (opcional)

Pueden agregar un botón en el WordPress de https://fundacionalmarosa.org que diga **"Acompañamiento durante quimio"** y que enlace a la URL del micrositio.

---

## 💰 Costos mensuales esperados

| Servicio | Costo |
|----------|-------|
| Netlify (hosting) | **$0** (plan gratis cubre esto sin problema) |
| GitHub | **$0** |
| Gemini API (chat de Alma) | **$0** (plan gratuito: 15 msg/min, 1M tokens/día) |

**Total: $0 al mes.** Si en algún momento la fundación supera el plan gratuito de Gemini (sería con muchísimas usuarias simultáneas), Google avisa antes de cobrar.

---

## 🆘 Si algo falla

1. **El chat no responde:** Revisa que `GEMINI_API_KEY` esté configurada en Netlify
2. **Las páginas no cargan:** Revisa que el "Publish directory" sea `public`
3. **Cambios no se ven:** En Netlify, **Trigger deploy** después de cada cambio en GitHub

Para soporte técnico, contactar al equipo que entrega el sitio.

---

## 📞 Datos importantes que están en el sitio

El chat de Alma deriva a estas líneas cuando detecta crisis:

- **Fundación Alma Rosa:** +57 310 415 6261
- **Línea 106 Bogotá** (atención psicológica)
- **Línea 123 opción 4** (otras ciudades)

Si estos números cambian, hay que actualizarlos en el archivo `netlify/functions/chat.js`.

---

🌸 **Hecho con cariño para acompañar a las guerreras de la Fundación Alma Rosa.**
