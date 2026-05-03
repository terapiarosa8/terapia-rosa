// ═══════════════════════════════════════════════════════════
// BIBLIOTECA — Aprende a tu ritmo
// 3 categorías: Nutrición consciente / Salud mental / Autocuidado
// Cada categoría se divide en sub-items (uno por <h3>) con play button
// y duración estimada. Tapping un item abre un panel con el contenido
// y los 3 formatos: Leer / Escuchar / Ver
// ═══════════════════════════════════════════════════════════

const topics = [
  {
    id: 'nutricion', icon: '🥗', title: 'Nutrición consciente',
    sub: 'Comer para nutrirte y disfrutar',
    accent: '#C9968A',
    bgFrom: '#E0C4B6', bgTo: '#C9968A',
    items: [
      { title: 'Lo que tu cuerpo agradece', sub: 'Comer despacio · sin pantallas', minutes: 4,
        body: `<p>Comer despacio, sin pantallas, masticando bien. Tu cuerpo trabaja mejor cuando lo respetas en cada bocado.</p>` },
      { title: 'Alimentos que dan energía calma', sub: 'Granos · frutas · verdes · grasas buenas', minutes: 5,
        body: `<ul><li>Frutas frescas de colores variados</li>
        <li>Granos enteros: avena, quinoa, arroz integral</li>
        <li>Verduras verdes: espinaca, brócoli, kale</li>
        <li>Grasas buenas: aguacate, almendras, aceite de oliva</li>
        <li>Mucha agua a lo largo del día</li></ul>` },
      { title: 'Pequeños rituales', sub: 'Agua tibia, infusión, agradecer el bocado', minutes: 3,
        body: `<ul><li>Tomar agua tibia con limón al despertar</li>
        <li>Una infusión de jengibre o manzanilla en la tarde</li>
        <li>Comer en plato bonito, aunque sea sola</li>
        <li>Agradecer en silencio antes del primer bocado</li></ul>` },
      { title: 'Cuando te apetece dulce', sub: 'Frutas, dátiles, chocolate negro', minutes: 3,
        body: `<p>Frutas con yogur natural, dátiles con almendra, chocolate negro 70% en cuadritos pequeños. Disfrutar también es nutrirse.</p>` },
    ],
  },
  {
    id: 'mental', icon: '💛', title: 'Salud mental',
    sub: 'Cuidar lo que sientes',
    accent: '#A8AE93',
    bgFrom: '#D4D7C2', bgTo: '#A8AE93',
    items: [
      { title: 'Lo que sientes importa', sub: 'Las emociones son mensajeras', minutes: 4,
        body: `<p>No tienes que estar bien todos los días. Tus emociones son mensajeras, no enemigas. Escucharlas es el primer paso para cuidarte.</p>` },
      { title: 'Hábitos que sostienen el ánimo', sub: 'Sueño · movimiento · luz · vínculo', minutes: 5,
        body: `<ul><li>Dormir entre 7 y 8 horas, con horarios estables</li>
        <li>Mover el cuerpo cada día, aunque sean 10 minutos</li>
        <li>Recibir luz natural en las primeras horas de la mañana</li>
        <li>Reducir noticias y redes cuando te sobrecarguen</li>
        <li>Conversar con alguien de confianza una vez por semana</li></ul>` },
      { title: 'Para días difíciles', sub: 'Llorar, escribir, caminar, abrazar', minutes: 4,
        body: `<ul><li>Permítete llorar sin justificarlo</li>
        <li>Escribe lo que sientes, no para resolverlo, solo para soltarlo</li>
        <li>Camina al aire libre 20 minutos</li>
        <li>Haz una sola cosa pequeña que te dé calma: bañarte, abrazar, respirar</li></ul>` },
      { title: 'Cuándo buscar ayuda profesional', sub: 'La terapia no es solo para crisis', minutes: 3,
        body: `<p>Si la tristeza dura semanas, si nada te motiva, si la ansiedad te paraliza, si pierdes el sueño constantemente. La terapia psicológica no es solo para crisis: es un espacio de cuidado preventivo.</p>` },
    ],
  },
  {
    id: 'autocuidado', icon: '🌿', title: 'Autocuidado',
    sub: 'Pequeños rituales para ti',
    accent: '#8B5E4C',
    bgFrom: '#D8C0B0', bgTo: '#8B5E4C',
    items: [
      { title: 'Autocuidado no es lujo, es base', sub: 'Cuidarte te permite seguir presente', minutes: 3,
        body: `<p>Cuidarte no es egoísmo: es lo que te permite seguir presente para los demás y para ti misma. No tiene que ser caro ni largo.</p>` },
      { title: 'Rituales de mañana', sub: 'Estirar · respirar · agua · intención', minutes: 4,
        body: `<ul><li>Estirar 5 minutos antes de levantarte</li>
        <li>Respirar profundo 3 veces frente a la ventana</li>
        <li>Una intención del día: "hoy quiero..."</li>
        <li>Beber un vaso de agua antes que cualquier otra cosa</li></ul>` },
      { title: 'Rituales de noche', sub: 'Apagar pantallas · agradecer · escribir', minutes: 4,
        body: `<ul><li>Apagar pantallas 30 minutos antes de dormir</li>
        <li>Aplicarte crema mientras agradeces tres cosas del día</li>
        <li>Escribir una línea en el diario, lo que sea</li>
        <li>Respiración guiada para soltar el día</li></ul>` },
      { title: 'Pequeños placeres terapéuticos', sub: 'Ducha larga · velas · sol · decir no', minutes: 5,
        body: `<ul><li>Una ducha más larga de lo necesario</li>
        <li>Velas, música suave, luz tenue</li>
        <li>Caminar descalza unos minutos</li>
        <li>Sentarte al sol sin hacer nada</li>
        <li>Decir "no" sin culpa cuando algo no te suma</li></ul>` },
    ],
  },
];

let activeTopicIdx = 0;

const tabsEl = document.getElementById('topicTabs');
const containerEl = document.getElementById('biblioContainer');

function renderTabs() {
  tabsEl.innerHTML = topics.map((t, i) => `
    <button class="tab-pill ${i === activeTopicIdx ? 'active' : ''}" data-idx="${i}">
      ${t.title} <span class="count">(${t.items.length})</span>
    </button>
  `).join('');
  tabsEl.querySelectorAll('.tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTopicIdx = parseInt(btn.dataset.idx, 10);
      stopAllSpeech();
      render();
    });
  });
}

function renderContent() {
  const t = topics[activeTopicIdx];
  const featured = t.items[0];
  const rest = t.items.slice(1);

  containerEl.innerHTML = `
    <div class="featured-card" data-item="0" style="cursor:pointer;">
      <div class="featured-thumb" style="background: linear-gradient(135deg, ${t.bgFrom}, ${t.bgTo});">
        <div class="play-icon">▶</div>
        <div class="featured-duration">${featured.minutes} min</div>
      </div>
      <div class="featured-meta">
        <div class="featured-tag">Recomendado hoy</div>
        <div class="featured-title">${featured.title}</div>
        <div class="featured-sub">${featured.sub}</div>
      </div>
    </div>

    <div class="list-section-title">
      <span><em>${t.title.toLowerCase()}</em></span>
      <span class="right-label">A tu ritmo</span>
    </div>

    <div class="h-list">
      ${rest.map((it, i) => `
        <div class="h-item" data-item="${i + 1}">
          <div class="h-item-thumb">▶</div>
          <div class="h-item-meta">
            <div class="h-item-title">${it.title}</div>
            <div class="h-item-sub">${it.sub}</div>
          </div>
          <div class="h-item-badge">${it.minutes} min</div>
        </div>
      `).join('')}
    </div>

    <div id="readerPanel"></div>
  `;

  containerEl.querySelectorAll('[data-item]').forEach(el => {
    el.addEventListener('click', () => openReader(parseInt(el.dataset.item, 10)));
  });
}

function openReader(itemIdx) {
  const t = topics[activeTopicIdx];
  const item = t.items[itemIdx];
  const panel = document.getElementById('readerPanel');
  panel.innerHTML = `
    <div class="topic-card open" style="margin: 16px 22px 0;">
      <div class="topic-content" style="max-height: 4000px; margin-top: 0;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <div>
            <div class="featured-tag" style="margin-bottom:4px;">Lectura</div>
            <div style="font-family: var(--serif); font-style: italic; font-size: 22px; font-weight: 500;">${item.title}</div>
          </div>
          <button class="icon-btn" id="closeReader" aria-label="Cerrar">×</button>
        </div>

        <div class="format-tabs">
          <button class="format-tab active" data-fmt="read">📖 Leer <span class="duration">${item.minutes} min</span></button>
          <button class="format-tab" data-fmt="listen">🎙️ Escuchar</button>
          <button class="format-tab" data-fmt="watch">🎬 Ver</button>
        </div>

        <div class="format-panel active" data-format="read">${item.body}</div>

        <div class="format-panel" data-format="listen">
          <div class="audio-player">
            <div class="ap-info">
              <div class="ap-icon">🎙️</div>
              <div class="ap-meta">
                <div class="ap-title">${item.title}</div>
                <div class="ap-sub">PODCAST · Voz cálida</div>
              </div>
            </div>
            <div class="ap-controls">
              <button class="ap-play" id="readerPlay">▶</button>
              <div class="ap-progress"><div class="ap-bar" id="readerBar"></div></div>
            </div>
            <div class="ap-status" id="readerStatus">Toca play para escuchar</div>
            <div class="ap-note">
              <strong>Vista previa:</strong> el navegador está leyendo el texto en voz alta. En la versión publicada, la fundación grabará podcasts profesionales para cada tema.
            </div>
          </div>
        </div>

        <div class="format-panel" data-format="watch">
          <div class="video-placeholder">
            <div class="vp-icon">🎬</div>
            <div class="vp-title">Próximamente</div>
            <div class="vp-sub">La fundación grabará videos cortos para cada tema</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Close
  document.getElementById('closeReader').addEventListener('click', () => {
    stopAllSpeech();
    panel.innerHTML = '';
  });

  // Format switching
  panel.querySelectorAll('.format-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      panel.querySelectorAll('.format-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const fmt = tab.dataset.fmt;
      panel.querySelectorAll('.format-panel').forEach(p => {
        p.classList.toggle('active', p.dataset.format === fmt);
      });
      if (fmt !== 'listen') stopAllSpeech();
    });
  });

  // Play button
  document.getElementById('readerPlay').addEventListener('click', () => toggleSpeech(item));

  // Scroll to it
  setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function render() {
  renderTabs();
  renderContent();
}

// ─── Speech Synthesis ────────────────────────────────────
let currentUtterance = null;

function plainText(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent.replace(/\s+/g, ' ').trim();
}

function toggleSpeech(item) {
  if (currentUtterance && speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    document.getElementById('readerPlay').textContent = '▶';
    document.getElementById('readerStatus').textContent = 'Pausado';
    return;
  }
  if (currentUtterance && speechSynthesis.paused) {
    speechSynthesis.resume();
    document.getElementById('readerPlay').textContent = '⏸';
    document.getElementById('readerStatus').textContent = 'Reproduciendo...';
    return;
  }
  speechSynthesis.cancel();
  const text = item.title + '. ' + plainText(item.body);
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES'; u.rate = 0.92; u.pitch = 1.0;
  const voices = speechSynthesis.getVoices();
  const esVoice = voices.find(v => v.lang.startsWith('es') && /female|mujer|paula|monica|laura/i.test(v.name))
                || voices.find(v => v.lang.startsWith('es'));
  if (esVoice) u.voice = esVoice;
  u.onstart = () => {
    document.getElementById('readerPlay').textContent = '⏸';
    document.getElementById('readerStatus').textContent = 'Reproduciendo...';
    animateBar(item);
  };
  u.onend = () => {
    if (document.getElementById('readerPlay')) {
      document.getElementById('readerPlay').textContent = '▶';
      document.getElementById('readerStatus').textContent = 'Terminado 🌸';
      const bar = document.getElementById('readerBar');
      if (bar) bar.style.width = '100%';
    }
    currentUtterance = null;
  };
  u.onerror = () => {
    if (document.getElementById('readerPlay')) {
      document.getElementById('readerPlay').textContent = '▶';
      document.getElementById('readerStatus').textContent = 'No pudo reproducirse';
    }
  };
  currentUtterance = u;
  speechSynthesis.speak(u);
}

function stopAllSpeech() {
  if (currentUtterance) {
    speechSynthesis.cancel();
    currentUtterance = null;
  }
}

function animateBar(item) {
  const bar = document.getElementById('readerBar');
  if (!bar) return;
  const text = item.title + '. ' + plainText(item.body);
  const wordsCount = text.split(/\s+/).length;
  const totalSec = wordsCount / 2.5;
  const startTime = Date.now();
  const tick = () => {
    if (!currentUtterance) return;
    const elapsed = (Date.now() - startTime) / 1000;
    const pct = Math.min(99, (elapsed / totalSec) * 100);
    if (bar) bar.style.width = pct + '%';
    if (pct < 99) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

if (typeof speechSynthesis !== 'undefined') {
  speechSynthesis.onvoiceschanged = () => {};
}

render();
