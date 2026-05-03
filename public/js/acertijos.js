// Acertijos del alma
// ACERTIJOS DEL ALMA
// ═══════════════════════════════════════════════════════════
const acertijos = [
  {
    pregunta: 'Soy ese momento del día en que el cielo se viste de rosa y todo parece detenerse...',
    opciones: ['El amanecer', 'El atardecer', 'La medianoche', 'El mediodía'],
    correcta: 1,
    feliz: 'Y como tú, después de mí, siempre vuelve la luz. 🌅',
  },
  {
    pregunta: 'Sin manos abrazo, sin ojos veo, llego sin pedir permiso pero siempre eres bienvenida...',
    opciones: ['La música', 'El amor', 'El sueño', 'La lluvia'],
    correcta: 1,
    feliz: 'Y nunca te vas del todo, aún cuando duela. 💛',
  },
  {
    pregunta: 'Soy el regalo que te haces cuando paras un momento y te escuchas a ti misma...',
    opciones: ['El descanso', 'El silencio', 'La paz', 'Todas las anteriores'],
    correcta: 3,
    feliz: 'Las tres son ciertas. Te las mereces todas. 🌿',
  },
  {
    pregunta: 'Vuelo en silencio, transformo todo lo que toco, soy símbolo de cambio y belleza...',
    opciones: ['El viento', 'La mariposa', 'La nube', 'El pájaro'],
    correcta: 1,
    feliz: 'Tú también estás transformándote. Y será hermoso. 🦋',
  },
  {
    pregunta: 'Más fuerte que el dolor, más vieja que el tiempo, sostiene cuando todo parece soltar...',
    opciones: ['La fe', 'La esperanza', 'El amor', 'Las tres'],
    correcta: 3,
    feliz: 'Las tres viven en ti. Aunque a veces no las sientas, están ahí. 💛',
  },
  {
    pregunta: 'Con poco me alimento, en cualquier lugar crezco, soy símbolo de vida frágil pero terca...',
    opciones: ['El árbol', 'La flor', 'La hierba', 'El musgo'],
    correcta: 1,
    feliz: 'Como tú: floreciendo aunque el suelo sea difícil. 🌸',
  },
  {
    pregunta: 'Me das y recibo, recibo y devuelvo, no peso nada pero llena el pecho...',
    opciones: ['Una sonrisa', 'Un abrazo', 'Una mirada', 'Un beso'],
    correcta: 1,
    feliz: 'Y vale más que cualquier medicina, en los días difíciles. 🤗',
  },
  {
    pregunta: 'Me tomas en silencio, me devuelves al universo, soy el ritmo de tu vida sin que lo sepas...',
    opciones: ['El latido', 'La respiración', 'El pulso', 'El tiempo'],
    correcta: 1,
    feliz: 'Y mientras respires, sigues escribiendo tu historia. 🌬️',
  },
  {
    pregunta: 'Aparezco cuando el alma desborda, no soy debilidad sino limpieza...',
    opciones: ['El sudor', 'La risa', 'Las lágrimas', 'El suspiro'],
    correcta: 2,
    feliz: 'Llorar es un acto de valentía. Te limpia por dentro. 💧',
  },
  {
    pregunta: 'Estoy en cada nuevo día que abres los ojos, en cada paso que das aunque cueste...',
    opciones: ['La rutina', 'El milagro', 'El esfuerzo', 'El destino'],
    correcta: 1,
    feliz: 'Sí: tu vida hoy es eso. Un milagro que no terminamos de entender. ✨',
  },
];

let acertijosShown = [];

function newAcertijo() {
  // Pick one not recently shown
  let available = acertijos.map((_, i) => i).filter(i => !acertijosShown.includes(i));
  if (available.length === 0) {
    acertijosShown = [];
    available = acertijos.map((_, i) => i);
  }
  const idx = available[Math.floor(Math.random() * available.length)];
  acertijosShown.push(idx);

  const a = acertijos[idx];
  const letras = ['A', 'B', 'C', 'D'];

  document.getElementById('acertijosContainer').innerHTML = `
    <div class="acertijo-card">
      <div class="acertijo-pregunta">${a.pregunta}</div>
    </div>
    <div class="acertijo-opciones">
      ${a.opciones.map((op, i) => `
        <button class="opcion-btn" onclick="responderAcertijo(${idx}, ${i}, this)">
          <span class="opcion-letra">${letras[i]}</span>
          <span>${op}</span>
        </button>
      `).join('')}
    </div>
    <div class="actions" style="margin-top: 8px;">
      <button class="btn btn-soft" onclick="newAcertijo()">↻ Otro acertijo</button>
    </div>
  `;
}

function responderAcertijo(idx, opcion, btn) {
  const a = acertijos[idx];
  const allBtns = document.querySelectorAll('.opcion-btn');
  allBtns.forEach(b => b.disabled = true);

  if (opcion === a.correcta) {
    btn.classList.add('correcta');
    setTimeout(() => {
      const fb = document.createElement('div');
      fb.className = 'acertijo-feedback';
      fb.innerHTML = `🌸 ¡Sí! ${a.feliz}`;
      document.querySelector('.acertijo-opciones').insertAdjacentElement('afterend', fb);
    }, 400);
  } else {
    btn.classList.add('incorrecta');
    allBtns[a.correcta].classList.add('correcta');
    setTimeout(() => {
      const fb = document.createElement('div');
      fb.className = 'acertijo-feedback';
      fb.innerHTML = `Casi. La respuesta era <strong>${a.opciones[a.correcta]}</strong>. ${a.feliz}`;
      document.querySelector('.acertijo-opciones').insertAdjacentElement('afterend', fb);
    }, 400);
  }
}

// ═══════════════════════════════════════════════════════════
