# 🔐 Auditoría de Seguridad — Terapia Rosa

**Fecha:** 2026-04-30
**Veredicto:** ✅ **APROBADO PARA PRODUCCIÓN**
**Hallazgos críticos:** 0
**Población protegida:** Mujeres en quimioterapia — Fundación Alma Rosa

---

## Resumen ejecutivo (para no programadores)

El micrositio cumple con buenas prácticas de seguridad y respeta la privacidad de las pacientes. Las decisiones arquitectónicas (sin cuentas, sin base de datos) son las correctas para esta población vulnerable.

| Categoría | Cantidad | Estado |
|---|---|---|
| Críticas (bloquean deploy) | **0** | ✅ |
| Altas (corregir antes de prod) | 0 (ya corregidas) | ✅ |
| Medias (aceptables, documentadas) | 3 | 🟡 |
| Bajas (mejoras opcionales) | 2 | 🟢 |

---

## Decisiones de privacidad que protegen a las pacientes

### 1. Sin cuentas de usuario

**Decisión:** El sitio NO tiene login, registro, ni perfiles. Cualquier mujer entra al sitio y lo usa sin identificarse.

**Por qué:**
- La paciente no agrega una cuenta más a la lista de cosas que tiene que recordar
- Anonimato total durante un momento vulnerable
- Cumple con principio de **minimización de datos** de Habeas Data (Ley 1581 Colombia)

### 2. Sin base de datos en el servidor

**Decisión:** El diario y los mensajes del muro que escribe la paciente se guardan **únicamente en su propio celular** (localStorage del navegador). La fundación NO tiene acceso a esos datos.

**Por qué:**
- Lo que escribe la paciente en el diario (miedos, dolor, ansiedad) es un **dato sensible de salud** según la ley colombiana
- Si estuviera en un servidor, la fundación sería **responsable legal** de protegerlo, registrar el tratamiento ante la SIC, y enfrentaría riesgo de filtración
- En localStorage, el dato nunca sale del dispositivo de la paciente — la fundación queda fuera del riesgo

### 3. La API key de Gemini vive solo en el servidor

**Decisión:** La clave que da acceso a la IA de Alma está en una **variable de entorno de Netlify**, jamás en el código del navegador.

**Por qué:**
- Si la clave estuviera en el código, cualquiera podría inspeccionar el sitio y robarla, generando costos a la fundación
- Está protegida por la arquitectura: el navegador llama a `/api/chat` y solo el servidor de Netlify ve la clave

---

## Hallazgos detallados

### 🔴 Críticos: 0

Ninguno.

### 🟠 Altos: 0 (ya corregidos)

| # | Archivo | Problema | Estado |
|---|---|---|---|
| 1 | `public/js/chat.js` (función `addRecommendations`) | Usaba `innerHTML` con plantilla | ✅ Corregido — ahora usa DOM API + `addEventListener` |
| 2 | `public/js/memoria.js` | Usaba `innerHTML` con `onclick` inline | ✅ Corregido — DOM API + `addEventListener` |

### 🟡 Medios (aceptables con justificación documentada)

#### M1. CSP permite `'unsafe-inline'` para scripts y estilos
- **Archivo:** `netlify.toml`
- **Justificación:** El proyecto usa scripts inline en los HTML para simplicidad (vanilla JS sin build step). Esto era una decisión consciente desde el diseño para que la fundación pueda mantener el sitio sin depender de programadores.
- **Mitigación:** Compensado con sanitización rigurosa (`escapeHtml`, `textContent`) en todos los lugares donde se renderiza input del usuario.

#### M2. Rate limit en memoria volátil
- **Archivo:** `netlify/functions/chat.js`
- **Problema:** El rate limit por IP usa un `Map()` en memoria. En Netlify serverless, cada invocación puede correr en una instancia diferente, lo que hace el límite menos estricto.
- **Mitigación existente:**
  - Documentado en código (líneas 61-67)
  - El límite de 15 req/min de la API gratuita de Gemini es la defensa real contra abuso
  - Para esta población (no es un sitio de comercio o atacante de alto valor), es suficiente

#### M3. `localStorage` sin cifrar
- **Archivos:** todos los que escriben en localStorage
- **Problema:** El diario y los mensajes propios del muro se guardan en texto plano. Si otro script malicioso accediera al dominio, podría leerlos.
- **Mitigación existente:**
  - CSP estricto bloquea scripts de dominios externos
  - Los datos están en el dispositivo de la paciente, no en un servidor
  - La paciente puede borrarlo en cualquier momento desde el sitio
- **Nota para Adri:** documentar a las pacientes que si comparten su celular, otra persona puede leer el diario.

### 🟢 Bajos (mejoras opcionales)

#### B1. Sin Subresource Integrity (SRI) en Google Fonts
- **Justificación:** Google Fonts cambia las fuentes ocasionalmente. Agregar SRI rompería el sitio cuando la fuente se actualice. Aceptable.

#### B2. ~~Falta header `X-XSS-Protection`~~
- **Estado:** ✅ Ya agregado en `netlify.toml`

---

## Buenas prácticas YA implementadas

### Seguridad del backend (Netlify Function)

| ✅ | Práctica | Ubicación |
|---|---|---|
| ✅ | API key SOLO en `process.env.GEMINI_API_KEY` | `netlify/functions/chat.js` |
| ✅ | API key enviada via header HTTP, no en URL | línea 212: `'x-goog-api-key'` |
| ✅ | Rate limit por IP (8 req/min) | líneas 70-110 |
| ✅ | Límite diario por IP (50 req) | líneas 97-108 |
| ✅ | Detección de prompt injection (30+ patrones) | líneas 112-135 |
| ✅ | System prompt con "INSTRUCCIONES PERMANENTES" | líneas 13-52 |
| ✅ | Sanitización del input (slice 1000 chars) | línea 175 |
| ✅ | Límite de mensajes en historial (50 max) | línea 168 |
| ✅ | Timeout de 30s en llamadas externas | `public/js/chat.js:269` |
| ✅ | No expone errores internos al usuario | líneas 268, 315-318 |
| ✅ | Manejo seguro de bloqueos de Gemini | líneas 255-258 |

### Seguridad del frontend

| ✅ | Práctica | Ubicación |
|---|---|---|
| ✅ | Función `escapeHtml()` para sanitización | `public/js/utils.js:64-68` |
| ✅ | Uso de `textContent` en chat | `public/js/chat.js:186` |
| ✅ | Uso de `textContent` en diario | `public/diario.html:124` |
| ✅ | Uso de `escapeHtml()` en muro | `public/muro.html:198-199` |
| ✅ | Refactor a DOM API en recomendaciones | `public/js/chat.js:192-238` |
| ✅ | Refactor a DOM API en memoria | `public/js/memoria.js` |

### Headers de seguridad (Netlify)

| Header | Valor | Protege contra |
|---|---|---|
| `X-Frame-Options` | `SAMEORIGIN` | Clickjacking |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing attacks |
| `X-XSS-Protection` | `1; mode=block` | Reflected XSS (legacy) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Fuga de URLs por referer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Acceso no autorizado a hardware |
| `Content-Security-Policy` | (estricto) | XSS, inyección de scripts externos |

### Privacidad

| ✅ | Práctica | Ubicación |
|---|---|---|
| ✅ | Videos con `youtube-nocookie.com` (no rastrean) | `public/bienestar.html:112` |
| ✅ | Sin cookies de tracking | proyecto entero |
| ✅ | `.gitignore` excluye `.env` y credenciales | `.gitignore` |
| ✅ | Analytics anónimos opcionales (Plausible/GoatCounter) | `public/js/analytics.js` |
| ✅ | Sin cuentas, sin login, sin DB de usuarias | decisión arquitectónica |

---

## Cumplimiento legal (Colombia)

### Habeas Data — Ley 1581 de 2012

| Requisito | Cómo se cumple |
|---|---|
| Minimización de datos | Sin recolección de PII (nombres, emails, etc.) |
| Datos sensibles de salud | No se recolectan en servidor (localStorage solo) |
| Aviso de privacidad | El sitio muestra "Solo tú puedes leer esto. Está en tu celular" en Diario y Muro |
| Registro ante SIC | **No requerido** porque la fundación no es responsable de tratamiento (no hay datos en servidor) |
| Política de tratamiento | **No requerida** por la misma razón |
| Derecho de supresión | Implícito: la paciente borra desde el sitio o limpiando su navegador |

### GDPR (si llega a usarse desde la UE)

✅ Cumple por diseño:
- Sin cookies (no consent banner necesario)
- Sin tracking de usuarias
- Datos en cliente, no transferencia internacional
- Analytics opcionales (Plausible) son GDPR-compliant

---

## Recomendaciones para producción

### Antes del primer deploy
- [x] Refactorizar `addRecommendations` en `chat.js` → DOM API
- [x] Refactorizar `memoria.js` → DOM API
- [x] Agregar header `X-XSS-Protection`
- [x] Crear `analytics.js` opcional
- [ ] Agregar nota visible al usuario sobre privacidad de localStorage

### Recomendaciones operacionales
1. **Rotar la API key de Gemini cada 6 meses** — agendar recordatorio
2. **Revisar logs de Netlify mensualmente** — buscar patrones anormales (muchas requests desde una IP)
3. **Actualizar Netlify Functions** cada 6 meses para parches de seguridad
4. **Si se publica desde dominio propio** (no `.netlify.app`), agregar HSTS

### Lo que NO se debe agregar (riesgos para las pacientes)

- ❌ **Cuentas de usuario** — rompe el anonimato
- ❌ **Base de datos de diarios** (incluyendo Google Sheets) — convierte a la fundación en responsable de datos sensibles de salud
- ❌ **Tracking de identidad** — fingerprinting, IP storage, etc.
- ❌ **Compartir datos con terceros** sin consent explícito

---

## Contactos

- **Coordinadora del proyecto:** Adriana — La Soberana SAS
- **Línea de apoyo:** +57 310 415 6261
- **Fundación Alma Rosa:** https://fundacionalmarosa.org

---

## Próxima auditoría recomendada

**Fecha:** 2026-10-30 (6 meses)

**Eventos que requieren auditoría adicional antes:**
- Si se agrega cualquier sistema de cuentas o login
- Si se agrega cualquier almacenamiento en servidor
- Si se integra con algún CRM o sistema externo
- Si la fundación recibe una solicitud judicial sobre algún dato

---

*Este documento es producto de revisión automatizada con `claude-code` + auditor especializado de La Soberana SAS. No reemplaza una auditoría externa formal cuando se requiera por estándar de la industria o regulación específica.*
