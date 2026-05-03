// Memoria — encuentra parejas
// MEMORIA (encuentra parejas)
// ═══════════════════════════════════════════════════════════
const memSymbols = ['🌸', '🦋', '🌿', '💛', '🌺', '🍃'];
let memCards = [];
let memFlipped = [];
let memMatched = 0;
let memMoves = 0;
let memLock = false;

function newMemoria() {
  memMatched = 0;
  memMoves = 0;
  memFlipped = [];
  memLock = false;

  const pairs = [...memSymbols, ...memSymbols];
  // Shuffle
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  memCards = pairs;

  const grid = document.getElementById('memoriaGrid');
  grid.replaceChildren();
  memCards.forEach((sym, i) => {
    const card = document.createElement('div');
    card.className = 'mem-card';
    card.dataset.idx = String(i);
    card.addEventListener('click', () => flipMem(i));

    const inner = document.createElement('div');
    inner.className = 'mem-card-inner';

    const back = document.createElement('div');
    back.className = 'mem-back';
    back.textContent = '🌸';

    const front = document.createElement('div');
    front.className = 'mem-front';
    front.textContent = sym;

    inner.appendChild(back);
    inner.appendChild(front);
    card.appendChild(inner);
    grid.appendChild(card);
  });

  document.getElementById('memMoves').textContent = '0';
  document.getElementById('memFound').textContent = '0';
  document.getElementById('memTotal').textContent = '6';
}

function flipMem(idx) {
  if (memLock) return;
  const card = document.querySelector(`.mem-card[data-idx="${idx}"]`);
  if (!card || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  memFlipped.push(idx);

  if (memFlipped.length === 2) {
    memMoves++;
    document.getElementById('memMoves').textContent = memMoves;
    memLock = true;

    const [a, b] = memFlipped;
    if (memCards[a] === memCards[b]) {
      // Match!
      setTimeout(() => {
        document.querySelector(`.mem-card[data-idx="${a}"]`).classList.add('matched');
        document.querySelector(`.mem-card[data-idx="${b}"]`).classList.add('matched');
        memMatched++;
        document.getElementById('memFound').textContent = memMatched;
        memFlipped = [];
        memLock = false;
        if (memMatched === 6) {
          setTimeout(showMemVictory, 600);
        }
      }, 400);
    } else {
      // No match
      setTimeout(() => {
        document.querySelector(`.mem-card[data-idx="${a}"]`).classList.remove('flipped');
        document.querySelector(`.mem-card[data-idx="${b}"]`).classList.remove('flipped');
        memFlipped = [];
        memLock = false;
      }, 900);
    }
  }
}

function showMemVictory() {
  const c = document.querySelector('.memoria-container');
  c.replaceChildren();

  const wrap = document.createElement('div');
  wrap.className = 'mem-victory';

  const emoji = document.createElement('div');
  emoji.className = 'emoji';
  emoji.textContent = '🌸';

  const h2 = document.createElement('h2');
  h2.textContent = '¡Lo lograste!';

  const p = document.createElement('p');
  p.appendChild(document.createTextNode(`Encontraste las 6 parejas en ${memMoves} movimientos.`));
  p.appendChild(document.createElement('br'));
  p.appendChild(document.createTextNode('Tu mente está descansando.'));

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.style.maxWidth = '300px';
  actions.style.margin = '0 auto';

  const back = document.createElement('button');
  back.className = 'btn btn-soft';
  back.textContent = 'Volver';
  back.addEventListener('click', () => showScreen('juegos'));

  const again = document.createElement('button');
  again.className = 'btn btn-primary';
  again.textContent = 'Otra vez';
  again.addEventListener('click', () => newMemoriaReset());

  actions.appendChild(back);
  actions.appendChild(again);

  wrap.appendChild(emoji);
  wrap.appendChild(h2);
  wrap.appendChild(p);
  wrap.appendChild(actions);
  c.appendChild(wrap);
}

function newMemoriaReset() {
  const c = document.querySelector('.memoria-container');
  c.replaceChildren();

  // stats
  const stats = document.createElement('div');
  stats.className = 'memoria-stats';
  stats.innerHTML = ''; // will be filled with safe DOM below

  const stat1 = document.createElement('div');
  const label1 = document.createElement('span');
  label1.className = 'label';
  label1.textContent = 'Movimientos';
  const value1 = document.createElement('span');
  value1.className = 'value';
  value1.id = 'memMoves';
  value1.textContent = '0';
  stat1.appendChild(label1);
  stat1.appendChild(value1);

  const stat2 = document.createElement('div');
  const label2 = document.createElement('span');
  label2.className = 'label';
  label2.textContent = 'Parejas';
  const value2 = document.createElement('span');
  value2.className = 'value';
  const found = document.createElement('span');
  found.id = 'memFound';
  found.textContent = '0';
  const total = document.createElement('span');
  total.id = 'memTotal';
  total.textContent = '6';
  value2.appendChild(found);
  value2.appendChild(document.createTextNode(' de '));
  value2.appendChild(total);
  stat2.appendChild(label2);
  stat2.appendChild(value2);

  stats.appendChild(stat1);
  stats.appendChild(stat2);

  const grid = document.createElement('div');
  grid.className = 'memoria-grid';
  grid.id = 'memoriaGrid';

  const actions = document.createElement('div');
  actions.className = 'actions';
  const newBtn = document.createElement('button');
  newBtn.className = 'btn btn-soft';
  newBtn.textContent = '↻ Nuevo juego';
  newBtn.addEventListener('click', () => newMemoria());
  actions.appendChild(newBtn);

  c.appendChild(stats);
  c.appendChild(grid);
  c.appendChild(actions);

  newMemoria();
}

// ═══════════════════════════════════════════════════════════
