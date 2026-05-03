// ──────────────────────────────────────────────────────────
// Bottom nav reutilizable — 5 ítems
// Inyecta el HTML del nav y marca como activo el ítem según la página
// Usar: agregar atributo data-active="inicio|aprende|alma|yoga|mi-espacio"
// al <body> de cada página, o se detecta por pathname automáticamente.
// ──────────────────────────────────────────────────────────

(function () {
  const items = [
    { id: 'inicio',     href: 'index.html',      label: 'Inicio',     icon: '🏠' },
    { id: 'aprende',    href: 'biblioteca.html', label: 'Aprende',    icon: '📚' },
    { id: 'alma',       href: 'chat.html',       label: 'Alma',       icon: '💬' },
    { id: 'yoga',       href: 'bienestar.html',  label: 'Yoga',       icon: '🧘' },
    { id: 'mi-espacio', href: 'mi-espacio.html', label: 'Mi espacio', icon: '📖' },
  ];

  // Detecta la página activa
  function detectActive() {
    const explicit = document.body.dataset.active;
    if (explicit) return explicit;
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    if (path === '' || path === 'index.html') return 'inicio';
    if (path === 'biblioteca.html') return 'aprende';
    if (path === 'chat.html') return 'alma';
    if (path === 'bienestar.html') return 'yoga';
    if (path === 'mi-espacio.html') return 'mi-espacio';
    // Páginas hijas: subrayan al hub correspondiente
    if (['diario.html', 'muro.html', 'juegos.html', 'colorear.html', 'sopa.html', 'memoria.html', 'acertijos.html'].includes(path)) {
      return 'mi-espacio';
    }
    if (path === 'respiracion.html') return null; // no marca ningún ítem
    return null;
  }

  const active = detectActive();
  const html = `
    <nav class="bottom-nav">
      <div class="bottom-nav-inner">
        ${items.map(it => `
          <a href="${it.href}" class="nav-item${it.id === active ? ' active' : ''}">
            <span class="nav-icon">${it.icon}</span>
            <span>${it.label}</span>
          </a>
        `).join('')}
      </div>
    </nav>
  `;

  // Si la página ya tiene un .bottom-nav, lo reemplaza; si no, lo agrega al .app
  function inject() {
    const existing = document.querySelector('.bottom-nav');
    if (existing) {
      existing.outerHTML = html;
      return;
    }
    const app = document.querySelector('.app');
    if (app) {
      app.insertAdjacentHTML('beforeend', html);
    } else {
      document.body.insertAdjacentHTML('beforeend', html);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
