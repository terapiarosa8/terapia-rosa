// ═══════════════════════════════════════════════════════════
// BIBLIOTECA — Videos de YouTube por categoría
// 3 categorías: Nutrición / Salud mental / Autocuidado
// El primer video de cada categoría sale como "Recomendado hoy".
//
// CÓMO AGREGAR UN VIDEO:
//   videoId : el código del video (lo que va después de youtu.be/)
//   title   : título corto que ven las pacientes
//   author  : quién lo grabó (formato: "Nombre · Ciudad")
//   duration: minutos en NÚMERO (sin comillas)
//   tag     : etiqueta corta (ej: 'Suave', 'Práctico', 'Tranquilo')
// ═══════════════════════════════════════════════════════════

const topics = [

  // ─── 🥗 NUTRICIÓN CONSCIENTE ──────────────────────────────
  {
    id: 'nutricion', icon: '🥗', title: 'Nutrición consciente',
    videos: [
      // Video 1 (sale como "Recomendado hoy" — el destacado)
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 1', author: 'Autor · Ciudad', duration: 10, tag: 'Suave' },

      // Video 2
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 2', author: 'Autor · Ciudad', duration: 8, tag: 'Práctico' },

      // Video 3
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 3', author: 'Autor · Ciudad', duration: 12, tag: 'Recetas' },

      // Para agregar más videos, copia una línea entera y pégala aquí.
      // No olvides la coma al final de cada video.
    ],
  },

  // ─── 💛 SALUD MENTAL ──────────────────────────────────────
  {
    id: 'mental', icon: '💛', title: 'Salud mental',
    videos: [
      // Video 1 (sale como "Recomendado hoy" — el destacado)
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 1', author: 'Autor · Ciudad', duration: 15, tag: 'Tranquilo' },

      // Video 2
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 2', author: 'Autor · Ciudad', duration: 10, tag: 'Reflexivo' },

      // Video 3
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 3', author: 'Autor · Ciudad', duration: 12, tag: 'Para días duros' },

      // Para agregar más videos, copia una línea entera y pégala aquí.
    ],
  },

  // ─── 🌿 AUTOCUIDADO ───────────────────────────────────────
  {
    id: 'autocuidado', icon: '🌿', title: 'Autocuidado',
    videos: [
      // Video 1 (sale como "Recomendado hoy" — el destacado)
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 1', author: 'Autor · Ciudad', duration: 12, tag: 'Suave' },

      // Video 2
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 2', author: 'Autor · Ciudad', duration: 8, tag: 'Rituales' },

      // Video 3
      { videoId: 'REEMPLAZAR_AQUI', title: 'Título del video 3', author: 'Autor · Ciudad', duration: 15, tag: 'Profundo' },

      // Para agregar más videos, copia una línea entera y pégala aquí.
    ],
  },

];

// ═══════════════════════════════════════════════════════════
// NO TOQUES NADA DE AQUÍ PARA ABAJO (es la lógica que renderiza)
// ═══════════════════════════════════════════════════════════

let activeTopicIdx = 0;

const tabsEl = document.getElementById('topicTabs');
const containerEl = document.getElementById('biblioContainer');

function renderTabs() {
  tabsEl.replaceChildren();
  topics.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-pill' + (i === activeTopicIdx ? ' active' : '');
    btn.dataset.idx = String(i);

    const labelText = document.createTextNode(`${t.icon} ${t.title} `);
    const count = document.createElement('span');
    count.className = 'count';
    count.textContent = `(${t.videos.length})`;

    btn.appendChild(labelText);
    btn.appendChild(count);
    btn.addEventListener('click', () => {
      activeTopicIdx = i;
      render();
    });
    tabsEl.appendChild(btn);
  });
}

function renderContent() {
  const t = topics[activeTopicIdx];

  if (!t.videos || t.videos.length === 0) {
    containerEl.innerHTML = `
      <div class="empty-state">
        Aquí van a aparecer videos de ${escapeHtml(t.title.toLowerCase())}.<br>
        Pronto la fundación va a agregar contenido nuevo. 🌸
      </div>
    `;
    return;
  }

  // Filtrar videos placeholder (no mostrarlos)
  const realVideos = t.videos.filter(v => v.videoId !== 'REEMPLAZAR_AQUI');

  if (realVideos.length === 0) {
    containerEl.innerHTML = `
      <div class="empty-state">
        Aquí van a aparecer videos de ${escapeHtml(t.title.toLowerCase())}.<br>
        La fundación pronto agregará videos de YouTube. 🌸
      </div>
    `;
    return;
  }

  const featured = realVideos[0];
  const rest = realVideos.slice(1);

  let html = `
    <div class="featured-card" data-video="${escapeHtml(featured.videoId)}" style="cursor:pointer;">
      <div class="featured-thumb" style="overflow:hidden;">
        <img src="https://i.ytimg.com/vi/${encodeURIComponent(featured.videoId)}/hqdefault.jpg"
             alt="${escapeHtml(featured.title)}"
             style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0.7;">
        <div class="play-icon" style="position:relative; z-index:2;">▶️</div>
        <div class="featured-duration">${featured.duration} min</div>
      </div>
      <div class="featured-meta">
        <div class="featured-tag">Recomendado hoy</div>
        <div class="featured-title">${escapeHtml(featured.title)}</div>
        <div class="featured-sub">${escapeHtml(featured.author)} · ${escapeHtml(featured.tag)}</div>
      </div>
    </div>

    <div class="video-frame-wrap" id="videoFrame"></div>
  `;

  if (rest.length > 0) {
    html += `
      <div class="list-section-title">
        <span><em>${escapeHtml(t.title.toLowerCase())}</em></span>
        <span class="right-label">A tu ritmo</span>
      </div>

      <div class="h-list">
        ${rest.map(v => `
          <div class="h-item" data-video="${escapeHtml(v.videoId)}">
            <div class="h-item-thumb green">▶️</div>
            <div class="h-item-meta">
              <div class="h-item-title">${escapeHtml(v.title)}</div>
              <div class="h-item-sub">${escapeHtml(v.author)} · ${escapeHtml(v.tag)}</div>
            </div>
            <div class="h-item-badge">${v.duration} min</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  containerEl.innerHTML = html;

  containerEl.querySelectorAll('[data-video]').forEach(el => {
    el.addEventListener('click', () => playVideo(el.dataset.video));
  });
}

function playVideo(videoId) {
  if (videoId === 'REEMPLAZAR_AQUI') {
    alert('Este es un placeholder. Reemplaza el videoId en biblioteca.js con uno real.');
    return;
  }
  const frame = document.getElementById('videoFrame');
  if (!frame) return;
  frame.innerHTML = `
    <div class="video-thumb-wrap">
      <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0"
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen></iframe>
    </div>
  `;
  frame.classList.add('active');
  setTimeout(() => frame.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function render() {
  const frame = document.getElementById('videoFrame');
  if (frame) {
    frame.classList.remove('active');
    frame.innerHTML = '';
  }
  renderTabs();
  renderContent();
}

render();
