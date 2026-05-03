// ═══════════════════════════════════════════════════════════
// RESPIRACIÓN — Flor animada + música Web Audio
// ═══════════════════════════════════════════════════════════

let breathRunning = false;
let breathTimeouts = [];

function setPhase(phase, message, subtext, duration) {
  const flower = document.getElementById('breathFlower');
  flower.classList.remove('inhale', 'hold', 'exhale');
  flower.classList.add(phase);
  document.getElementById('breathText').textContent = message;
  document.getElementById('breathSubtext').textContent = subtext;
  return new Promise(res => {
    const id = setTimeout(res, duration);
    breathTimeouts.push(id);
  });
}

async function runCycle(n) {
  if (!breathRunning) return;
  document.getElementById('cycleNum').textContent = n;
  await setPhase('inhale', 'Inhala', 'recibe la calma', 4000);
  if (!breathRunning) return;
  await setPhase('hold', 'Sostén', 'siente el momento', 4000);
  if (!breathRunning) return;
  await setPhase('exhale', 'Exhala', 'deja ir lo que pesa', 6000);
  if (!breathRunning) return;
  if (n < 5) runCycle(n + 1);
  else finishBreath();
}

function startBreathing() {
  breathRunning = true;
  // Iniciar música si toggle está activo
  const musicOn = document.getElementById('musicToggle');
  if (musicOn && musicOn.checked) startMusic();
  document.getElementById('breathControls').innerHTML =
    '<button class="btn btn-ghost" onclick="stopBreathing()">Detener</button>';
  runCycle(1);
}

function stopBreathing() {
  breathRunning = false;
  breathTimeouts.forEach(t => clearTimeout(t));
  breathTimeouts = [];
  stopMusic();
  const flower = document.getElementById('breathFlower');
  flower.classList.remove('inhale', 'hold', 'exhale');
  document.getElementById('breathText').textContent = 'Pausa';
  document.getElementById('breathSubtext').textContent = 'cuando quieras volver';
  document.getElementById('cycleNum').textContent = '0';
  document.getElementById('breathControls').innerHTML =
    '<button class="btn btn-primary" onclick="startBreathing()">Volver a comenzar</button>';
}

function finishBreath() {
  breathRunning = false;
  setTimeout(() => stopMusic(), 3000);
  const flower = document.getElementById('breathFlower');
  flower.classList.remove('inhale', 'hold', 'exhale');
  flower.classList.add('hold');
  document.getElementById('breathText').textContent = 'Hermoso';
  document.getElementById('breathSubtext').textContent = '5 ciclos completos 🌸';
  document.getElementById('breathControls').innerHTML =
    '<button class="btn btn-soft" onclick="startBreathing()">Otros 5 ciclos</button>' +
    '<button class="btn btn-primary" onclick="showScreen(\'home\')">Listo</button>';
}

// Toggle de música en vivo: si la apaga durante respiración, se detiene
document.addEventListener('DOMContentLoaded', () => {
  const t = document.getElementById('musicToggle');
  if (t) t.addEventListener('change', e => {
    if (!e.target.checked) stopMusic();
    else if (breathRunning) startMusic();
  });