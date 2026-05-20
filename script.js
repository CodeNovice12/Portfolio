const pages = [
  { chapter:"◆  Prólogo  ◆", title:"O Início da Jornada", content:"Toda jornada começa antes mesmo do herói entender o chamado. Foram anos aprendendo a linguagem dos dados, antes de perceber que a programação seria o mapa para o destino.", sideTitle:"Quem é Lucas", sideContent:"29 anos, analista em People Analytics na Stellantis. 6 anos como assistente administrativo moldaram o olhar para processos — a tecnologia veio transformar esse olhar em soluções reais.", num:"1" },
  { chapter:"◆  Capítulo I  ◆", title:"O Aprendiz dos Dados", content:"Antes das grandes criações, vieram planilhas, análises e indicadores. A arte de transformar números em decisões — Python, SQL e Power BI como primeiras armas desta jornada.", sideTitle:"Ferramentas & Tecnologias", sideContent:"Python · Pandas · Power BI · SQL · BigQuery · Streamlit · Automações em Excel · Análise de dados para RH e People Analytics na Stellantis.", num:"2" },
  { chapter:"◆  Capítulo II  ◆", title:"As Primeiras Ferramentas", content:"A forja do desenvolvedor web: HTML que estrutura mundos, CSS que os pinta, JavaScript que lhes dá vida. Vue e Laravel como aliados para batalhas de maior porte.", sideTitle:"Projetos Web", sideContent:"Portfólio-livro interativo · Org Chart com Dash/Plotly · Landing pages · Interfaces com Vue3 · Sistemas com Laravel · Componentes JavaScript puros.", num:"3" },
  { chapter:"◆  Epílogo  ◆", title:"O Caminho Adiante", content:"A jornada não termina — ela se expande. Data Engineering, Machine Learning, Generative AI e uma marca pessoal sendo construída uma linha de código por vez.", sideTitle:"Contato & Conexões", sideContent:"GitHub · LinkedIn · YouTube · Instagram\n\nConteúdo sobre a jornada em tech — aprendendo em público, errando e crescendo.", num:"4" }
];
 
/* --- Elementos --- */
const bookWrapper  = document.getElementById('bookWrapper');
const bookOpen     = document.getElementById('bookOpen');       // ← declarado corretamente
const openBtn      = document.getElementById('openBtn');
const pageFlipHost = document.getElementById('pageFlipBook');
const navInd       = document.getElementById('navInd');
const prevBtn      = document.getElementById('prevBtn');
const nextBtn      = document.getElementById('nextBtn');
const nav          = document.getElementById('nav');
 
let pageFlip    = null;
let currentPage = 0;
let isFlipping  = false;
let isOpen      = false;
 
/* =============================================
   POEIRA
   ============================================= */
function spawnDust() {
  const container = document.getElementById('dustContainer');
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 8 : 24;
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'dust';
    const size = Math.random() * 5 + 2;
    d.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()<.45?Math.random()*35:Math.random()*100}%;top:${Math.random()*60+100}%;animation-duration:${Math.random()*16+10}s;animation-delay:${Math.random()*14}s;`;
    container.appendChild(d);
  }
}
 
/* =============================================
   BOTÃO FECHAR
   ============================================= */
function createCloseButton() {
  if (document.getElementById('closeBtn')) return;
  const btn = document.createElement('button');
  btn.id = 'closeBtn';
  btn.className = 'nav-btn close-btn';
  btn.innerHTML = '✦ &nbsp;Fechar o Livro&nbsp; ✦';
  btn.addEventListener('click', closeBook);
  nav.appendChild(btn);
}
 
/* =============================================
   CAPA INTERNA DO PAGEFLIP
   ============================================= */
function createCoverPage() {
  const el = document.createElement('div');
  el.className = 'page-flip-sheet page-flip-sheet--cover';
  el.dataset.page = 'page';
  el.innerHTML = `
    <div class="page-inner cover-page-inner">
      <div class="cover-ornament">
        <div class="orn-line"></div>
        <span class="orn-sym">◆ ✦ ◆</span>
        <div class="orn-line"></div>
      </div>
      <p class="cover-subtitle">Portfólio de Jornada</p>
      <h1 class="cover-title-inner">Crônicas de um<br>Desenvolvedor</h1>
      <div class="cover-divider"></div>
      <p class="cover-author">Lucas Medeiros</p>
      <div class="cover-ornament bottom">
        <div class="orn-line"></div>
        <span class="orn-sym">◆ ✦ ◆</span>
        <div class="orn-line"></div>
      </div>
    </div>`;
  return el;
}
 
/* =============================================
   ABRIR LIVRO
   ============================================= */
function openBook() {
  if (isOpen) return;
  isOpen = true;
  bookWrapper.classList.add('is-open');
  document.querySelector('.scene')?.classList.add('is-reading');
 
  const styles = getComputedStyle(document.documentElement);
  const pageW  = parseInt(styles.getPropertyValue('--a4-w')) || 480;
  const pageH  = parseInt(styles.getPropertyValue('--a4-h')) || 679;
  pageFlipHost.style.width  = pageW + 'px';
  pageFlipHost.style.height = pageH + 'px';
 
  setTimeout(initPageFlip, 150);
}
 
/* =============================================
   FECHAR LIVRO — reset completo
   ============================================= */
function closeBook() {
  if (!isOpen) return;
  isOpen = false;
 
  // Destrói PageFlip
  if (pageFlip) {
    try { pageFlip.destroy(); } catch(e) {}
    pageFlip = null;
  }
 
  // Limpa host
  pageFlipHost.innerHTML = '';
  pageFlipHost.style.width  = '';
  pageFlipHost.style.height = '';
 
  // Remove style inline que o PageFlip injeta no .book-open
  bookOpen.style.opacity    = '0';
  bookOpen.style.visibility = 'hidden';
  bookOpen.style.pointerEvents = 'none';
 
  currentPage = 0;
  bookWrapper.classList.remove('is-open');
  document.querySelector('.scene')?.classList.remove('is-reading');
  updateNav();

  setTimeout(() => {
  bookOpen.removeAttribute('style');
  }, 500);
}
 
/* =============================================
   MONTAR PÁGINAS
   ============================================= */
function escapeHtml(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
 
function pageRuleHtml() {
  return `<div class="page-rule"><div class="rule-line"></div><span class="rule-sym">✦</span><div class="rule-line"></div></div>`;
}
 
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
       <span class="pg-num ${numClass}">${chapter.num} / ${pages.length}</span>`
    : `<h3 class="side-title">${escapeHtml(chapter.sideTitle)}</h3>
       ${pageRuleHtml()}
       <p class="page-body">${escapeHtml(chapter.sideContent).replace(/\n/g,'<br>')}</p>
       <span class="pg-num ${numClass}">${chapter.num} / ${pages.length}</span>`;
  el.innerHTML = `<div class="page-inner">${inner}</div>`;
  return el;
}
 
function buildPageFlipDOM() {
  pageFlipHost.innerHTML = '';
  pageFlipHost.appendChild(createCoverPage());
  pages.forEach(ch => {
    pageFlipHost.appendChild(createPageElement(ch, 'left'));
    pageFlipHost.appendChild(createPageElement(ch, 'right'));
  });
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
  const pageW  = parseInt(styles.getPropertyValue('--a4-w')) || 480;
  const pageH  = parseInt(styles.getPropertyValue('--a4-h')) || 679;
 
  pageFlip = new St.PageFlip(pageFlipHost, {
    width:               pageW,
    height:              pageH,
    size:                'fixed',
    minWidth:            280,
    maxWidth:            520,
    minHeight:           400,
    maxHeight:           800,
    drawShadow:          true,
    maxShadowOpacity:    0.55,
    flippingTime:        1000,
    usePortrait:         false,
    showCover:           true,
    mobileScrollSupport: true,
    autoSize:            false,
  });
 
  pageFlip.loadFromHTML(pageFlipHost.querySelectorAll('[data-page="page"]'));
 
  // Vai para folha 1 — mostra capa + primeira página abertas
  setTimeout(() => {
    if (pageFlip) {
      pageFlip.turnToPage(1);
      currentPage = 0;
      updateNav();
    }
  }, 80);
 
  pageFlip.on('flip', (e) => {
    currentPage = Math.floor(e.data / 2);
    updateNav();
  });
 
  pageFlip.on('changeState', (e) => {
    isFlipping = e.data === 'flipping';
    updateNav();
  });
}
 
/* =============================================
   NAVEGAÇÃO
   ============================================= */
function updateNav() {
  navInd.textContent = `${currentPage + 1} / ${pages.length}`;
  if (!pageFlip) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }
  const leaf  = pageFlip.getCurrentPageIndex();
  const total = pageFlip.getPageCount();
  prevBtn.disabled = isFlipping || leaf <= 1;
  nextBtn.disabled = isFlipping || leaf >= total - 2;
}
 
function turnPage(dir) {
  if (!pageFlip || isFlipping) return;
  dir === 'next' ? pageFlip.flipNext() : pageFlip.flipPrev();
}
 
/* =============================================
   EVENTOS
   ============================================= */
openBtn.addEventListener('click', openBook);
prevBtn.addEventListener('click', () => turnPage('prev'));
nextBtn.addEventListener('click', () => turnPage('next'));
 
document.addEventListener('keydown', e => {
  if (!isOpen) return;
  if (e.key === 'ArrowRight') turnPage('next');
  if (e.key === 'ArrowLeft')  turnPage('prev');
  if (e.key === 'Escape')     closeBook();
});
 
window.addEventListener('resize', () => {
  if (pageFlip && isOpen) pageFlip.update();
});
 
/* =============================================
   INIT
   ============================================= */
spawnDust();
createCloseButton();