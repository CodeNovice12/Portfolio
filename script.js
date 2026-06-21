/* =============================================
   DELAYS NOMEADOS — sem números mágicos
   ============================================= */
const DELAY = {
  WRAPPER_EXPAND: 150, // aguarda CSS transition do wrapper
  PAGEFLIP_TURN:   80, // aguarda loadFromHTML processar
};

/* =============================================
   ESTADO
   ============================================= */
const state = {
  isOpen:      false,
  isFlipping:  false,
  currentPage: 0,
  pageFlip:    null,
  initTimer:   null,
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
  const container  = document.getElementById('dustContainer');
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

function clearBookTimers() {
  if (state.initTimer) {
    clearTimeout(state.initTimer);
    state.initTimer = null;
  }
}

function syncPageFlipSize() {
  const styles = getComputedStyle(document.documentElement);
  const pageW  = parseInt(styles.getPropertyValue('--a4-w')) || 410;
  const pageH  = parseInt(styles.getPropertyValue('--a4-h')) || 580;
  els.pageFlipHost.style.width  = `${pageW}px`;
  els.pageFlipHost.style.height = `${pageH}px`;
  return { pageW, pageH };
}

function restartOpenAnimation() {
  els.bookOpen.style.animation = 'none';
  void els.bookOpen.offsetWidth;
  els.bookOpen.style.animation = '';
}

function refreshPageFlip() {
  if (!state.pageFlip || !state.isOpen) return;

  syncPageFlipSize();
  state.pageFlip.turnToPage(0);
  state.currentPage = 0;
  state.pageFlip.update();
}

/* =============================================
   ABRIR LIVRO
   ============================================= */
function openBook() {
  if (state.isOpen) return;
  state.isOpen = true;

  clearBookTimers();
  els.bookOpen.removeAttribute('style');
  restartOpenAnimation();

  els.bookWrapper.classList.add('is-open');
  document.querySelector('.scene')?.classList.add('is-reading');

  syncPageFlipSize();

  if (state.pageFlip) {
    state.initTimer = setTimeout(() => {
      state.initTimer = null;
      refreshPageFlip();
      // PageFlip só recalcula layout com o livro visível
      setTimeout(refreshPageFlip, 900);
    }, DELAY.WRAPPER_EXPAND);
    return;
  }

  state.initTimer = setTimeout(() => {
    state.initTimer = null;
    initPageFlip();
  }, DELAY.WRAPPER_EXPAND);
}

/* =============================================
   FECHAR LIVRO
   ============================================= */
function closeBook() {
  if (!state.isOpen) return;
  state.isOpen      = false;
  state.currentPage = 0;

  clearBookTimers();

  els.bookWrapper.classList.remove('is-open');
  document.querySelector('.scene')?.classList.remove('is-reading');
}

/* =============================================
   UTILITÁRIOS
   ============================================= */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pageRuleHtml() {
  return `<div class="page-rule">
    <div class="rule-line"></div>
    <span class="rule-sym">✦</span>
    <div class="rule-line"></div>
  </div>`;
}

/* =============================================
   MONTAGEM DAS PÁGINAS
   ============================================= */
function createPageElement(chapter, side) {
  const el = document.createElement('div');
  el.className = `page-flip-sheet page-flip-sheet--${side}`;
  el.dataset.page = 'page';

  const numClass = side === 'left' ? 'left-n' : 'right-n';
  const inner = side === 'left'
    ? `<span class="chapter-tag">${escapeHtml(chapter.chapter)}</span>
       <h2 class="page-title">${escapeHtml(chapter.title)}</h2>
       ${pageRuleHtml()}
       <p class="page-body">${escapeHtml(chapter.content)}</p>
       <span class="pg-num ${numClass}">${chapter.num} / ${PAGES_DATA.length}</span>`
    : `<h3 class="side-title">${escapeHtml(chapter.sideTitle)}</h3>
       ${pageRuleHtml()}
       <p class="page-body">${escapeHtml(chapter.sideContent).replace(/\n/g, '<br>')}</p>
       <span class="pg-num ${numClass}">${chapter.num} / ${PAGES_DATA.length}</span>`;

  el.innerHTML = `<div class="page-inner">${inner}</div>`;
  return el;
}

function buildPageFlipDOM() {
  els.pageFlipHost.innerHTML = '';
  PAGES_DATA.forEach(chapter => {
    els.pageFlipHost.appendChild(createPageElement(chapter, 'left'));
    els.pageFlipHost.appendChild(createPageElement(chapter, 'right'));
  });
}

/* =============================================
   INICIALIZAR PAGEFLIP
   ============================================= */
function initPageFlip() {
  if (!state.isOpen || state.pageFlip) return;

  if (typeof St === 'undefined' || !St.PageFlip) {
    console.error('St.PageFlip não carregou.');
    return;
  }

  buildPageFlipDOM();

  const { pageW, pageH } = syncPageFlipSize();

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

  setTimeout(() => {
    if (state.pageFlip && state.isOpen) {
      state.pageFlip.turnToPage(0);
      state.currentPage = 0;
      state.pageFlip.update();
    }
  }, DELAY.PAGEFLIP_TURN);

  state.pageFlip.on('flip', (e) => {
    state.currentPage = Math.floor(e.data / 2);
  });

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