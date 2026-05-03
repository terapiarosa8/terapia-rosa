// Sopa de palabras
const POOL = ['FUERZA','VIDA','AMOR','ALMA','LUZ','PAZ','BELLA','SANAR','ABRAZO','HOY','CALMA','FE'];
const ALFABETO = 'ABCDEFGHIJLMNOPQRSTUVZ';

function buildSopa(palabras) {
  const G = 10;
  const grid = Array(G).fill(null).map(() => Array(G).fill(null));
  const placed = [];
  const dirs = [[0,1],[1,0],[1,1]];

  for (const palabra of palabras) {
    let ok = false;
    for (let attempt = 0; attempt < 100 && !ok; attempt++) {
      const [dr, dc] = dirs[Math.floor(Math.random() * dirs.length)];
      const maxR = G - palabra.length * Math.abs(dr);
      const maxC = G - palabra.length * Math.abs(dc);
      if (maxR <= 0 || maxC <= 0) continue;
      const r = Math.floor(Math.random() * maxR);
      const c = Math.floor(Math.random() * maxC);
      let fits = true;
      for (let i = 0; i < palabra.length; i++) {
        const cell = grid[r + i*dr][c + i*dc];
        if (cell !== null && cell !== palabra[i]) { fits = false; break; }
      }
      if (fits) {
        const cells = [];
        for (let i = 0; i < palabra.length; i++) {
          grid[r + i*dr][c + i*dc] = palabra[i];
          cells.push([r + i*dr, c + i*dc]);
        }
        placed.push({ palabra, cells });
        ok = true;
      }
    }
  }
  for (let r = 0; r < G; r++) for (let c = 0; c < G; c++) {
    if (grid[r][c] === null) grid[r][c] = ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
  }
  return { grid, placed };
}

let sopaState = null;
let foundWords = new Set();
let isSelecting = false;
let selectionStart = null;
let selectedCells = [];

function newSopa() {
  const palabras = [...POOL].sort(() => Math.random() - 0.5).slice(0, 8);
  sopaState = buildSopa(palabras);
  foundWords = new Set();

  const g = document.getElementById('sopaGrid');
  g.innerHTML = sopaState.grid.flatMap((row, r) =>
    row.map((l, c) => `<div class="sopa-cell" data-r="${r}" data-c="${c}">${l}</div>`)
  ).join('');

  document.getElementById('wordList').innerHTML =
    sopaState.placed.map(w => `<div class="word-chip" data-word="${w.palabra}">${w.palabra}</div>`).join('');
  document.getElementById('foundCount').textContent = '0';
  document.getElementById('totalCount').textContent = sopaState.placed.length;

  setupSopaEvents();
}

function getCell(r, c) {
  return document.getElementById('sopaGrid').querySelector(`[data-r="${r}"][data-c="${c}"]`);
}
function clearSelection() {
  selectedCells.forEach(([r,c]) => {
    const c2 = getCell(r,c);
    if (c2 && !c2.classList.contains('found')) c2.classList.remove('selecting');
  });
  selectedCells = [];
}
function getCellsBetween(s, e) {
  const [r1,c1] = s, [r2,c2] = e;
  const dr = Math.sign(r2-r1), dc = Math.sign(c2-c1);
  const lr = Math.abs(r2-r1), lc = Math.abs(c2-c1);
  if (lr !== 0 && lc !== 0 && lr !== lc) return [s];
  const len = Math.max(lr, lc);
  const cells = [];
  for (let i = 0; i <= len; i++) cells.push([r1 + i*dr, c1 + i*dc]);
  return cells;
}
function highlightCells(cells) {
  clearSelection();
  cells.forEach(([r,c]) => {
    const cl = getCell(r,c);
    if (cl && !cl.classList.contains('found')) cl.classList.add('selecting');
  });
  selectedCells = cells;
}
function checkWord() {
  if (selectedCells.length < 2) { clearSelection(); return; }
  const f = selectedCells.map(([r,c]) => sopaState.grid[r][c]).join('');
  const b = f.split('').reverse().join('');
  const m = sopaState.placed.find(w => (w.palabra === f || w.palabra === b) && !foundWords.has(w.palabra));
  if (m) {
    foundWords.add(m.palabra);
    selectedCells.forEach(([r,c]) => {
      const cl = getCell(r,c);
      if (cl) { cl.classList.add('found'); cl.classList.remove('selecting'); }
    });
    document.querySelector(`[data-word="${m.palabra}"]`).classList.add('found');
    document.getElementById('foundCount').textContent = foundWords.size;
    if (foundWords.size === sopaState.placed.length) {
      setTimeout(() => alert('¡Lo lograste! 🌸 Encontraste todas las palabras.'), 400);
    }
  } else {
    clearSelection();
  }
}

function getCellAt(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el || !el.classList.contains('sopa-cell')) return null;
  return [parseInt(el.dataset.r), parseInt(el.dataset.c)];
}

function setupSopaEvents() {
  const sopaGrid = document.getElementById('sopaGrid');
  sopaGrid.onmousedown = e => {
    e.preventDefault();
    const c = getCellAt(e.clientX, e.clientY);
    if (c) { isSelecting = true; selectionStart = c; highlightCells([c]); }
  };
  sopaGrid.onmousemove = e => {
    if (!isSelecting) return;
    const c = getCellAt(e.clientX, e.clientY);
    if (c) highlightCells(getCellsBetween(selectionStart, c));
  };
  document.addEventListener('mouseup', () => {
    if (isSelecting) { isSelecting = false; checkWord(); }
  });
  sopaGrid.ontouchstart = e => {
    e.preventDefault();
    const t = e.touches[0];
    const c = getCellAt(t.clientX, t.clientY);
    if (c) { isSelecting = true; selectionStart = c; highlightCells([c]); }
  };
  sopaGrid.ontouchmove = e => {
    e.preventDefault();
    const t = e.touches[0];
    const c = getCellAt(t.clientX, t.clientY);
    if (c) highlightCells(getCellsBetween(selectionStart, c));
  };
  sopaGrid.ontouchend = () => {
    if (isSelecting) { isSelecting = false; checkWord(); }
  };
}
newSopa();