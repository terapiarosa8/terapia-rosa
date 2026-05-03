// ═══════════════════════════════════════════════════════════════
// ANALYTICS ANÓNIMOS — opcional, privacy-first
// ═══════════════════════════════════════════════════════════════
// Por defecto, este archivo NO hace nada (analytics desactivados).
//
// Para activarlos, escoge UN proveedor abajo y descomenta su línea.
// Solo se rastrea: cuántas visitas, qué páginas, dispositivo (no quién).
// NO se usan cookies. NO se rastrea PII. NO se vende información.
//
// Cumple con Habeas Data (Colombia), GDPR (UE) y CCPA (California).
// ═══════════════════════════════════════════════════════════════

(function () {
  // ═══════════════════════════════════════════════════════════
  // CONFIGURACIÓN — déjalo vacío para mantener desactivado
  // ═══════════════════════════════════════════════════════════
  const PLAUSIBLE_DOMAIN = '';      // Ej: 'terapia-rosa.netlify.app' (recomendado)
  const GOATCOUNTER_CODE = '';      // Ej: 'terapia-rosa' (alternativa gratis)
  const CLOUDFLARE_TOKEN = '';      // Token de Cloudflare Web Analytics

  // ═══════════════════════════════════════════════════════════
  // No edites debajo de esta línea
  // ═══════════════════════════════════════════════════════════

  // No correr en localhost / desarrollo
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') return;

  // ─── Plausible (recomendado: privacy-first, sin cookies) ───
  if (PLAUSIBLE_DOMAIN) {
    const s = document.createElement('script');
    s.defer = true;
    s.dataset.domain = PLAUSIBLE_DOMAIN;
    s.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(s);
    // Helper global para eventos custom (opcional)
    window.plausible = window.plausible || function () {
      (window.plausible.q = window.plausible.q || []).push(arguments);
    };
  }

  // ─── GoatCounter (alternativa gratis para fundaciones) ───
  if (GOATCOUNTER_CODE) {
    const s = document.createElement('script');
    s.async = true;
    s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
    s.src = '//gc.zgo.at/count.js';
    document.head.appendChild(s);
  }

  // ─── Cloudflare Web Analytics (gratis, requiere Cloudflare) ───
  if (CLOUDFLARE_TOKEN) {
    const s = document.createElement('script');
    s.defer = true;
    s.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    s.dataset.cfBeacon = JSON.stringify({ token: CLOUDFLARE_TOKEN });
    document.head.appendChild(s);
  }

  // ─── Helper para tracking de eventos opcionales ───
  // Uso desde otros scripts: trackEvent('Respiracion completa')
  // Solo registra si hay analytics activos y respeta privacidad.
  window.trackEvent = function (eventName) {
    if (typeof eventName !== 'string' || eventName.length > 60) return;
    try {
      if (window.plausible && PLAUSIBLE_DOMAIN) {
        window.plausible(eventName);
      }
      if (window.goatcounter && GOATCOUNTER_CODE) {
        window.goatcounter.count({ path: 'event-' + eventName, event: true });
      }
    } catch (e) { /* fallar silencioso */ }
  };
})();
