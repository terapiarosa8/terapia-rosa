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
  const musicOn = document.getElementById('musicToggle');
  if (musicOn && musicOn.checked) startMusic();
  const controls = document.getElementById('breathControls');
  controls.replaceChildren();
  const stopBtn = document.createElement('button');
  stopBtn.className = 'btn btn-ghost';
  stopBtn.textContent = 'Detener';
  stopBtn.addEventListener('click', stopBreathing);
  controls.appendChild(stopBtn);
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
  const controls = document.getElementById('breathControls');
  controls.replaceChildren();
  const restartBtn = document.createElement('button');
  restartBtn.className = 'btn btn-primary';
  restartBtn.textContent = 'Volver a comenzar';
  restartBtn.addEventListener('click', startBreathing);
  controls.appendChild(restartBtn);
}

function finishBreath() {
  breathRunning = false;
  setTimeout(() => stopMusic(), 3000);
  const flower = document.getElementById('breathFlower');
  flower.classList.remove('inhale', 'hold', 'exhale');
  flower.classList.add('hold');
  document.getElementById('breathText').textContent = 'Hermoso';
  document.getElementById('breathSubtext').textContent = '5 ciclos completos 🌸';
  const controls = document.getElementById('breathControls');
  controls.replaceChildren();

  const againBtn = document.createElement('button');
  againBtn.className = 'btn btn-soft';
  againBtn.textContent = 'Otros 5 ciclos';
  againBtn.addEventListener('click', startBreathing);

  const doneBtn = document.createElement('button');
  doneBtn.className = 'btn btn-primary';
  doneBtn.textContent = 'Listo';
  doneBtn.addEventListener('click', () => showScreen('home'));

  controls.appendChild(againBtn);
  controls.appendChild(doneBtn);
}

let audioCtx = null;
let musicNodes = null;

function startMusic() {
  if (musicNodes) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 2);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.5;

    masterGain.connect(filter);
    filter.connect(audioCtx.destination);

    const notes = [216, 270, 324, 405];
    const oscillators = [];

    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const noteGain = audioCtx.createGain();
      noteGain.gain.value = 0;
      noteGain.gain.linearRampToValueAtTime(0.25 / notes.length, audioCtx.currentTime + 1 + i * 0.5);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      const lfo = audioCtx.createOscillator();
      lfo.frequency.value = 0.08 + i * 0.03;
      const lfoGain = audioCtx.createGain();
      lfoGain.gain.value = freq * 0.003;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      lfo.start();
      osc.start();
      oscillators.push(osc, lfo);
    });

    const padOsc = audioCtx.createOscillator();
    padOsc.type = 'triangle';
    padOsc.frequency.value = 432;
    const padGain = audioCtx.createGain();
    padGain.gain.value = 0;
    padGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 4);
    padOsc.connect(padGain);
    padGain.connect(masterGain);
    padOsc.start();
    oscillators.push(padOsc);

    musicNodes = { masterGain, oscillators };
  } catch (e) {
    console.error('Audio no disponible:', e);
  }
}

function stopMusic() {
  if (!musicNodes) return;
  try {
    const t = audioCtx.currentTime;
    musicNodes.masterGain.gain.linearRampToValueAtTime(0, t + 1.5);
    setTimeout(() => {
      if (musicNodes) {
        musicNodes.oscillators.forEach(o => { try { o.stop(); } catch (_) {} });
        musicNodes = null;
      }
    }, 1700);
  } catch (e) {
    musicNodes = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) startBtn.addEventListener('click', startBreathing);

  const t = document.getElementById('musicToggle');
  if (t) t.addEventListener('change', e => {
    if (!e.target.checked) stopMusic();
    else if (breathRunning) startMusic();
  });
});
