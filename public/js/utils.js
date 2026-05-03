// ═══════════════════════════════════════════════════════════════
// TERAPIA ROSA — Utilidades compartidas (multipage)
// ═══════════════════════════════════════════════════════════════

// ─── Paleta ──────────────────────────────────────────────────
const ALMA = {
  rosaBase: '#E0C4B6', rosaMedio: '#D4AFA0', rosaFuerte: '#C9968A',
  rosaProfundo: '#8B5E4C', verdeAlma: '#A8AE93', verdeOscuro: '#878D75',
  crema: '#F2EBE0', cremaProfunda: '#E8DECE', papel: '#FAF4EA',
  textoOscuro: '#2E2420', textoSuave: '#7A6357',
};

// ─── Frases del día ───────────────────────────────────────────
const FRASES_DIA = [
  { texto: 'El cuerpo que te trajo hasta aquí también te llevará al otro lado.', autor: 'Una guerrera más' },
  { texto: 'No tienes que ser fuerte todos los días. Hay días para descansar.', autor: 'Una guerrera más' },
  { texto: 'Tu cuerpo está haciendo algo extraordinario. Sé suave con él.', autor: 'Una guerrera más' },
  { texto: 'Hoy basta con respirar. Mañana volverás a brillar.', autor: 'Una guerrera más' },
  { texto: 'Eres más que esta enfermedad. Eres todo lo que has sido y serás.', autor: 'Una guerrera más' },
  { texto: 'Florecer también duele. Estás floreciendo.', autor: 'Una guerrera más' },
  { texto: 'Cada día que sigues aquí es un acto de valentía.', autor: 'Una guerrera más' },
  { texto: 'Te mereces ternura. Empezando por la tuya propia.', autor: 'Una guerrera más' },
  { texto: 'No estás sola. Hay un círculo de mujeres sosteniéndote.', autor: 'Una guerrera más' },
  { texto: 'La esperanza no es ingenua. Es una forma de coraje.', autor: 'Una guerrera más' },
  { texto: 'Hoy puedes hacer una sola cosa bonita. Eso es suficiente.', autor: 'Una guerrera más' },
  { texto: 'Tu suavidad es tu fuerza, no tu debilidad.', autor: 'Una guerrera más' },
  { texto: 'Llorar también sana. No te lo niegues.', autor: 'Una guerrera más' },
  { texto: 'Hay luz al otro lado. Y tú vas a llegar.', autor: 'Una guerrera más' },
  { texto: 'Cada respiración cuenta. Cada una de ellas.', autor: 'Una guerrera más' },
];

function fraseDelDia() {
  return FRASES_DIA[new Date().getDate() % FRASES_DIA.length];
}

// ─── Helpers de tiempo ───────────────────────────────────────
function saludoHora() {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}
function diaSemana() {
  return ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'][new Date().getDay()];
}

// ─── localStorage helpers ─────────────────────────────────────
const Storage = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem('terapia-rosa.' + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem('terapia-rosa.' + key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem('terapia-rosa.' + key); } catch {}
  }
};

// ─── Sanitización XSS ────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = String(str || '');
  return div.innerHTML;
}

// ─── Navegación entre pantallas (multi-page) ────────────────
const SCREEN_URLS = {
  home: 'index.html',
  respira: 'respiracion.html',
  colorear: 'colorear.html',
  diario: 'diario.html',
  muro: 'muro.html',
  sopa: 'sopa.html',
  memoria: 'memoria.html',
  acertijos: 'acertijos.html',
  bienestar: 'bienestar.html',
  biblioteca: 'biblioteca.html',
  juegos: 'juegos.html',
  chat: 'chat.html',
  'mi-espacio': 'mi-espacio.html',
};

function showScreen(screen) {
  const url = SCREEN_URLS[screen];
  if (url) window.location.href = url;
}
