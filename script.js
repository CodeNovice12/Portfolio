/* =============================================
   DELAYS NOMEADOS
   ============================================= */
const DELAY = {
  WRAPPER_EXPAND: 150,
  PAGEFLIP_TURN:   80,
  STYLE_CLEANUP:  500,
};

/* =============================================
   ESTADO
   ============================================= */
const state = {
  isOpen:     false,
  isFlipping: false,
  pageFlip:   null,
};

/* =============================================
   ELEMENTOS DO DOM
   ============================================= */
const els = {
  bookWrapper:  document.getElementById('bookWrapper'),
  bookOpen:     document.getElementById('bookOpen'),
  openBtn:      document.getElementById('openBtn'),
  closeBtn:     document.getElementById('closeBtn'),
  pageFlipHost: document.getElementById('pageFlipBook'),
};

/* =============================================
   POEIRA
   ============================================= */
function spawnDust() {
  const container = document.getElementById('dustContainer');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = reduceMotion ? 8 : 24;

  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'dust';
    const size = Math.random() * 5 + 2;
    const left = Math.random() < 0.45 ? Math.random() * 35 : Math.random() * 100;
    d.style.cssText = [
      `width:${size}px`,
      `height:${size}px`,
      `left:${left}%`,
      `top:${Math.random() * 60 + 100}%`,
      `animation-duration:${Math.random() * 16 + 10}s`,
      `animation-delay:${Math.random() * 14}s`,
    ].join(';');
    container.appendChild(d);
  }
}

/* =============================================
   UTILITÁRIOS
   ============================================= */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* =============================================
   RENDERIZADOR DE BLOCOS
   Cada tipo de bloco vira um pedaço de HTML.
   Para adicionar um novo tipo: criar função aqui
   e registrar no BLOCK_RENDERERS.
   ============================================= */
const BLOCK_RENDERERS = {

  p(block) {
    return `<p class="page-body">${escapeHtml(block.text)}</p>`;
  },

  list(block) {
    const items = block.items.map(i => `<li>${escapeHtml(i)}</li>`).join('');
    return `
      <div class="block-list">
        <h4 class="block-list-title">${escapeHtml(block.title)}</h4>
        <ul class="block-list-items">${items}</ul>
      </div>`;
  },

  mission(block) {
    const meta = (block.meta || [])
      .map(([k, v]) => `<span class="meta-row"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</span>`)
      .join('');
    return `
      <div class="block-mission">
        <h4 class="mission-title">${escapeHtml(block.title)}</h4>
        ${meta ? `<div class="mission-meta">${meta}</div>` : ''}
        <p class="mission-text">${escapeHtml(block.text)}</p>
      </div>`;
  },

  quote(block) {
    return `
      <blockquote class="block-quote">
        <p>&ldquo;${escapeHtml(block.text)}&rdquo;</p>
        ${block.author ? `<cite>— ${escapeHtml(block.author)}</cite>` : ''}
      </blockquote>`;
  },

  center(block) {
    return `
      <div class="block-center">
        <h3 class="center-title">${escapeHtml(block.title)}</h3>
        ${block.sub ? `<p class="center-sub">${escapeHtml(block.sub)}</p>` : ''}
      </div>`;
  },

};

function renderBlocks(blocks) {
  return blocks
    .map(block => {
      const renderer = BLOCK_RENDERERS[block.type];
      if (!renderer) {
        console.warn(`Tipo de bloco desconhecido: ${block.type}`);
        return '';
      }
      return renderer(block);
    })
    .join('');
}

/* =============================================
   MONTAGEM DAS PÁGINAS
   ============================================= */
function pageRuleHtml() {
  return `<div class="page-rule">
    <div class="rule-line"></div>
    <span class="rule-sym">✦</span>
    <div class="rule-line"></div>
  </div>`;
}

function createPageElement(page, index) {
  const isLeft = index % 2 === 0;
  const el = document.createElement('div');
  el.className = `page-flip-sheet page-flip-sheet--${isLeft ? 'left' : 'right'}`;
  el.dataset.page = 'page';

  const numClass = isLeft ? 'left-n' : 'right-n';
  const header = [
    page.tag   ? `<span class="chapter-tag">${escapeHtml(page.tag)}</span>` : '',
    page.title ? `<h2 class="page-title">${escapeHtml(page.title)}</h2>${pageRuleHtml()}` : '',
  ].join('');

  el.innerHTML = `
    <div class="page-inner">
      ${header}
      ${renderBlocks(page.blocks)}
      <span class="pg-num ${numClass}">${index + 1} / ${PAGES_DATA.length}</span>
    </div>`;

  return el;
}

function buildPageFlipDOM() {
  els.pageFlipHost.innerHTML = '';
  PAGES_DATA.forEach((page, index) => {
    els.pageFlipHost.appendChild(createPageElement(page, index));
  });
}

/* =============================================
   ABRIR LIVRO
   ============================================= */
function openBook() {
  if (state.isOpen) return;
  state.isOpen = true;

  els.bookWrapper.classList.add('is-open');
  document.querySelector('.scene')?.classList.add('is-reading');

  const styles = getComputedStyle(document.documentElement);
  const pageW  = parseInt(styles.getPropertyValue('--a4-w')) || 410;
  const pageH  = parseInt(styles.getPropertyValue('--a4-h')) || 580;
  els.pageFlipHost.style.width  = `${pageW}px`;
  els.pageFlipHost.style.height = `${pageH}px`;

  setTimeout(initPageFlip, DELAY.WRAPPER_EXPAND);
}

/* =============================================
   FECHAR LIVRO
   ============================================= */
function closeBook() {
  if (!state.isOpen) return;
  state.isOpen = false;

  if (state.pageFlip) {
    try { state.pageFlip.destroy(); } catch (e) {}
    state.pageFlip = null;
  }

  // O destroy() da St.PageFlip remove o host do DOM.
  // Solução: remove qualquer resíduo e recria o host do zero.
  const oldHost = document.getElementById('pageFlipBook');
  if (oldHost) oldHost.remove();
  els.bookOpen.querySelectorAll('.stf__parent').forEach(n => n.remove());

  const newHost = document.createElement('div');
  newHost.id = 'pageFlipBook';
  newHost.className = 'page-flip-book';
  newHost.setAttribute('aria-label', 'Páginas do livro');
  els.bookOpen.prepend(newHost);
  els.pageFlipHost = newHost; // atualiza a referência para o elemento novo

  els.bookOpen.style.opacity       = '0';
  els.bookOpen.style.visibility    = 'hidden';
  els.bookOpen.style.pointerEvents = 'none';

  els.bookWrapper.classList.remove('is-open');
  document.querySelector('.scene')?.classList.remove('is-reading');

  setTimeout(() => els.bookOpen.removeAttribute('style'), DELAY.STYLE_CLEANUP);
}

/* =============================================
   INICIALIZAR PAGEFLIP
   ============================================= */
function initPageFlip() {
  if (typeof St === 'undefined' || !St.PageFlip) {
    console.error('St.PageFlip não carregou.');
    return;
  }

  buildPageFlipDOM();

  const styles = getComputedStyle(document.documentElement);
  const pageW  = parseInt(styles.getPropertyValue('--a4-w')) || 410;
  const pageH  = parseInt(styles.getPropertyValue('--a4-h')) || 580;

  state.pageFlip = new St.PageFlip(els.pageFlipHost, {
    width:               pageW,
    height:              pageH,
    size:                'fixed',
    minWidth:            260,
    maxWidth:            480,
    minHeight:           360,
    maxHeight:           700,
    drawShadow:          true,
    maxShadowOpacity:    0.55,
    flippingTime:        1000,
    usePortrait:         false,
    showCover:           false,
    mobileScrollSupport: true,
    autoSize:            false,
    startPage:           0,
  });

  state.pageFlip.loadFromHTML(els.pageFlipHost.querySelectorAll('[data-page="page"]'));

  // Guarda referência local — se closeBook rodar antes do timeout,
  // a comparação detecta e não executa em cima de instância morta
  const instance = state.pageFlip;

  setTimeout(() => {
    if (state.pageFlip === instance && state.isOpen) {
      instance.turnToPage(0);
      instance.update();
    }
  }, DELAY.PAGEFLIP_TURN);

  state.pageFlip.on('changeState', (e) => {
    state.isFlipping = e.data === 'flipping';
  });
}

/* =============================================
   EVENTOS
   ============================================= */
els.openBtn.addEventListener('click', openBook);
els.closeBtn.addEventListener('click', closeBook);

document.addEventListener('keydown', e => {
  if (!state.isOpen) return;
  if (e.key === 'Escape') closeBook();
});

window.addEventListener('resize', () => {
  if (state.pageFlip && state.isOpen) state.pageFlip.update();
});

/* =============================================
   INICIALIZAÇÃO
   ============================================= */
spawnDust();
