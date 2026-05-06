// ═══════════════════════════════════════════════════════════════
// CHAT — Alma como navegadora del sitio (modo demo)
// Reconoce 30+ palabras clave y recomienda recursos del sitio.
// No usa IA externa — todas las respuestas están en respuestasDemo.
// ═══════════════════════════════════════════════════════════════

const RECURSOS = {
  respira: { icon: '🌬️', titulo: 'Respiración guiada', sub: '5 minutos · calma el sistema nervioso', screen: 'respira' },
  musica: { icon: '🎵', titulo: 'Música suave + respiración', sub: 'Sonido ambiente terapéutico', screen: 'respira' },
  colorear: { icon: '🎨', titulo: 'Colorear mandalas', sub: 'Pon la mente en pausa pintando', screen: 'colorear' },
  diario: { icon: '📔', titulo: 'Diario privado', sub: 'Escribe lo que sientes, solo para ti', screen: 'diario' },
  muro: { icon: '💌', titulo: 'Muro de mensajes', sub: 'Lee lo que otras dejaron para ti', screen: 'muro' },
  sopa: { icon: '🔤', titulo: 'Sopa de palabras', sub: 'Distraerte sin pensar mucho', screen: 'sopa' },
  memoria: { icon: '🧠', titulo: 'Memoria', sub: 'Encontrar parejas, ideal cuando hay ansiedad', screen: 'memoria' },
  acertijos: { icon: '💭', titulo: 'Acertijos del alma', sub: 'Adivinanzas dulces para distraerte', screen: 'acertijos' },
  yoga: { icon: '🧘', titulo: 'Yoga & meditaciones', sub: 'Videos suaves de movimiento', screen: 'bienestar' },
  nutricion: { icon: '🥗', titulo: 'Aprende: Nutrición consciente', sub: 'Comer para nutrirte y disfrutar', screen: 'biblioteca' },
  saludmental: { icon: '💛', titulo: 'Aprende: Salud mental', sub: 'Cuidar lo que sientes', screen: 'biblioteca' },
  autocuidado: { icon: '🌿', titulo: 'Aprende: Autocuidado', sub: 'Pequeños rituales para ti', screen: 'biblioteca' },
};

// ─── Respuestas demo (texto + recomendaciones) ────────────────────────
const respuestasDemo = {
  'ansiosa': {
    texto: 'La ansiedad es así: aprieta el pecho y acelera todo por dentro 🌿. Lo primero que te ayuda es bajar el ritmo de la respiración. Te dejo dos cosas que pueden servirte ahorita:',
    recursos: ['respira', 'musica']
  },
  'ansiedad': {
    texto: 'Te entiendo. Cuando la ansiedad llega, todo parece urgente. Lo más rápido para suavizarla es la respiración guiada o un juego que ocupe la mente sin presión 💛',
    recursos: ['respira', 'memoria']
  },
  'no puedo dormir': {
    texto: 'Las noches difíciles son agotadoras. Te recomiendo respirar suave con música un rato — calma el sistema nervioso. Si la mente sigue acelerada, escribir lo que la ronda ayuda mucho a soltarla 🌙',
    recursos: ['respira', 'diario']
  },
  'insomnio': {
    texto: 'Cuando el sueño no llega, forzarlo lo aleja más. Mejor calmar el cuerpo primero con respiración, y si la mente sigue inquieta, soltarla en el diario 🌙',
    recursos: ['respira', 'diario']
  },
  'quiero llorar': {
    texto: 'Llora todo lo que necesites 💧. Llorar limpia, no es debilidad. Cuando estés lista para soltar más, escribir suele ayudar mucho. Y si quieres sentirte acompañada, el muro tiene mensajes de otras mujeres que también han llorado y lo están logrando.',
    recursos: ['diario', 'muro']
  },
  'triste': {
    texto: 'Estar triste no es estar mal — es estar sintiendo algo importante 💛. Quédate con eso un rato si lo necesitas. Si quieres, podemos hacer algo suave juntas: leer mensajes lindos del muro o pintar sin pensar.',
    recursos: ['muro', 'colorear']
  },
  'tristeza': {
    texto: 'La tristeza pesa, pero no se queda. Mientras pasa, te recomiendo cosas suaves que no te exijan nada 💛',
    recursos: ['muro', 'colorear']
  },
  'distraer': {
    texto: '¡Tengo cosas perfectas para eso! Para distraerse sin agotarse, lo mejor son los juegos suaves o colorear. ¿Cuál te llama más?',
    recursos: ['memoria', 'acertijos', 'colorear']
  },
  'aburrida': {
    texto: 'Aburrirse también es una invitación a hacer algo distinto 🌸. Te dejo tres cosas que pueden cambiarte el rato:',
    recursos: ['acertijos', 'colorear', 'memoria']
  },
  'aburrido': {
    texto: 'Estar aburrida también está bien. Si quieres mover algo, prueba con esto:',
    recursos: ['acertijos', 'colorear']
  },
  'tengo miedo': {
    texto: 'El miedo es válido, no eres débil por sentirlo 🌿. Mientras pasa la ola, podemos calmarlo con la respiración o leer mensajes que otras dejaron justo para días así.',
    recursos: ['respira', 'muro']
  },
  'miedo': {
    texto: 'El miedo aprieta. Lo que mejor le funciona es respirar despacio y sentirse acompañada. Te dejo las dos cosas que pueden ayudarte ya:',
    recursos: ['respira', 'muro']
  },
  'estresada': {
    texto: 'El estrés se acumula en el cuerpo. Estos dos recursos lo bajan rapidito:',
    recursos: ['respira', 'yoga']
  },
  'estrés': {
    texto: 'Vamos a soltar ese estrés. La respiración es lo más rápido, y si tienes más rato, una meditación corta hace maravillas 🌿',
    recursos: ['respira', 'yoga']
  },
  'estres': {
    texto: 'Vamos a soltar ese estrés. La respiración es lo más rápido, y si tienes más rato, una meditación corta hace maravillas 🌿',
    recursos: ['respira', 'yoga']
  },
  'cansada': {
    texto: 'Estar cansada es información: tu cuerpo te está pidiendo pausa 🌿. No tienes que rendir nada hoy. Una respiración suave o leer despacio puede ser todo lo que necesitas.',
    recursos: ['respira', 'autocuidado']
  },
  'cansancio': {
    texto: 'Cuando el cansancio aprieta, lo mejor es no luchar. Suaviza el cuerpo y deja que se recargue 🌿',
    recursos: ['respira', 'yoga']
  },
  'sola': {
    texto: 'No estás sola, aunque ahorita lo sientas así 💛. En el muro hay mensajes de muchas mujeres que pasaron o están pasando lo mismo, dejados para ti. Ve a leerlos.',
    recursos: ['muro']
  },
  'soledad': {
    texto: 'La soledad duele, lo sé. Te recomiendo el muro: ahí hay voces de mujeres que han caminado contigo aunque no las conozcas 💛',
    recursos: ['muro']
  },
  'comer': {
    texto: 'Lo que comes influye más en el ánimo de lo que crees. Te dejo el tema de Nutrición consciente, está lleno de pequeños rituales que pueden cambiarte el día 🥗',
    recursos: ['nutricion']
  },
  'nutrición': {
    texto: 'Te dejo el módulo de Nutrición consciente. Tiene ideas concretas para nutrirte sin obsesionarte 🥗',
    recursos: ['nutricion']
  },
  'comida': {
    texto: 'En el módulo de Nutrición consciente vas a encontrar ideas suaves para alimentarte mejor sin presiones 🥗',
    recursos: ['nutricion']
  },
  'autocuidado': {
    texto: 'El autocuidado no es lujo, es base 🌿. Te dejo el módulo lleno de pequeños rituales que sí caben en tu día.',
    recursos: ['autocuidado']
  },
  'cuidarme': {
    texto: 'Cuidarte no es egoísmo. Es lo que te permite seguir presente. Te dejo dos espacios que te pueden inspirar:',
    recursos: ['autocuidado', 'saludmental']
  },
  'meditar': {
    texto: 'La meditación cambia el día cuando se vuelve hábito. Aquí tienes videos suaves para empezar 🧘',
    recursos: ['yoga']
  },
  'yoga': {
    texto: '¡Perfecto! Tenemos meditaciones y yoga suave en video. También puedes empezar con respiración si es tu primera vez:',
    recursos: ['yoga', 'respira']
  },
  'respirar': {
    texto: 'Respirar consciente es el atajo más rápido a la calma. Te llevo:',
    recursos: ['respira']
  },
  'pintar': {
    texto: 'Pintar es un acto de presencia. Te dejo las mandalas:',
    recursos: ['colorear']
  },
  'jugar': {
    texto: 'Tenemos tres juegos suaves, sin presión, sin puntajes:',
    recursos: ['memoria', 'sopa', 'acertijos']
  },
  'juego': {
    texto: 'Tres opciones suaves, escoge la que te llame:',
    recursos: ['memoria', 'sopa', 'acertijos']
  },
  'leer': {
    texto: 'Tenemos tres temas para leer despacio. ¿Por dónde empezamos?',
    recursos: ['nutricion', 'saludmental', 'autocuidado']
  },
  'escribir': {
    texto: 'Escribir suelta lo que la mente carga 📔. El diario es solo tuyo, nadie más lo lee.',
    recursos: ['diario']
  },
  'diario': {
    texto: 'Te llevo al diario. Solo tuyo, sin que nadie más lo vea 📔',
    recursos: ['diario']
  },
  'mensaje': {
    texto: 'En el muro hay mensajes lindos que otras dejaron para ti, y puedes dejar el tuyo también 💌',
    recursos: ['muro']
  },
  'gracias': {
    texto: 'A ti por confiar en este espacio 💛 ¿Quieres que te recomiende algo más?',
    recursos: []
  },
  'hola': {
    texto: '¡Hola! 🌸 Cuéntame cómo te sientes o qué necesitas y te recomiendo lo que mejor te puede servir hoy.',
    recursos: []
  },
};

function findResponse(text) {
  const lower = text.toLowerCase().trim();
  // Try to match keywords (longest first for more specific matches)
  const keys = Object.keys(respuestasDemo).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (lower.includes(key)) return respuestasDemo[key];
  }
  return {
    texto: 'Cuéntame un poquito más, para encontrarte el mejor recurso 🌸\n\nPuedes decirme cosas como: "estoy ansiosa", "necesito distraerme", "no puedo dormir", "quiero llorar", "estoy aburrida", "tengo miedo"...',
    recursos: []
  };
}

function addChatMessage(role, text) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  messagesArea.appendChild(div);
  setTimeout(() => { messagesArea.scrollTop = messagesArea.scrollHeight; }, 50);
  return div;
}

function addRecommendations(recursos) {
  if (!recursos || recursos.length === 0) return;
  const wrap = document.createElement('div');
  wrap.className = 'alma-recommendations';

  const label = document.createElement('div');
  label.className = 'alma-rec-label';
  label.textContent = 'Te puede servir';
  wrap.appendChild(label);

  recursos.forEach(key => {
    const r = RECURSOS[key];
    if (!r) return;

    const btn = document.createElement('button');
    btn.className = 'alma-rec-btn';
    btn.addEventListener('click', () => showScreen(r.screen));

    const icon = document.createElement('div');
    icon.className = 'rec-icon';
    icon.textContent = r.icon;

    const text = document.createElement('div');
    text.className = 'rec-text';
    const title = document.createElement('div');
    title.className = 'rec-title';
    title.textContent = r.titulo;
    const sub = document.createElement('div');
    sub.className = 'rec-sub';
    sub.textContent = r.sub;
    text.appendChild(title);
    text.appendChild(sub);

    const arrow = document.createElement('div');
    arrow.className = 'rec-arrow';
    arrow.textContent = '→';

    btn.appendChild(icon);
    btn.appendChild(text);
    btn.appendChild(arrow);
    wrap.appendChild(btn);
  });

  messagesArea.appendChild(wrap);
  setTimeout(() => { messagesArea.scrollTop = messagesArea.scrollHeight; }, 50);
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'message-typing';
  div.id = 'typingIndicator';
  div.innerHTML = '<span class="dot"></span><span class="dot"></span><span class="dot"></span>';
  messagesArea.appendChild(div);
  setTimeout(() => { messagesArea.scrollTop = messagesArea.scrollHeight; }, 50);
}
function hideTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendDemoMessage(text, skipUserMessage = false) {
  if (!skipUserMessage) addChatMessage('user', text);
  if (!skipUserMessage) showTyping();
  setTimeout(() => {
    if (!skipUserMessage) hideTyping();
    const resp = findResponse(text);
    addChatMessage('alma', resp.texto);
    if (resp.recursos && resp.recursos.length > 0) {
      setTimeout(() => addRecommendations(resp.recursos), 250);
    }
  }, skipUserMessage ? 0 : (900 + Math.random() * 500));
}

function sendUserMessage() {
  const text = inputText.value.trim();
  if (!text) return;
  inputText.value = '';
  sendDemoMessage(text);
}

// ─── Limpiar conversación (privacidad en dispositivos compartidos) ────
function clearChatConversation() {
  if (!confirm('¿Borrar esta conversación? No quedará rastro en este dispositivo.')) return;
  messagesArea.innerHTML = `
    <div class="message alma">
      Hola 🌸 Soy Alma. Cuéntame cómo te sientes o qué necesitas, y te ayudo a encontrar lo que mejor te pueda servir aquí mismo.
    </div>
    <div class="message alma">
      Puedo recomendarte respiración guiada, música, juegos suaves, lectura, espacio para escribir... lo que tu momento pida 💛
    </div>
  `;
}

inputText.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendUserMessage();
  }
});

sendBtn.addEventListener('click', sendUserMessage);
clearBtn.addEventListener('click', clearChatConversation);

document.querySelectorAll('.quick-reply').forEach(btn => {
  btn.addEventListener('click', () => {
    const msg = btn.dataset.msg;
    if (msg) {
      inputText.value = msg;
      sendUserMessage();
    }
  });
});
