/* =============================================
   CONTEÚDO DAS PÁGINAS
   ============================================= */
const pages = [
  {
    chapter: "◆  Prólogo  ◆",
    title: "O Início da Jornada",
    content: "Toda jornada começa antes mesmo do herói entender o chamado. Foram anos aprendendo a linguagem dos dados, antes de perceber que a programação seria o mapa para o destino.",
    sideTitle: "Quem é Lucas",
    sideContent: "29 anos, analista em People Analytics na Stellantis. 6 anos como assistente administrativo moldaram o olhar para processos — a tecnologia veio transformar esse olhar em soluções reais.",
    num: "— I —"
  },
  {
    chapter: "◆  Capítulo I  ◆",
    title: "O Aprendiz dos Dados",
    content: "Antes das grandes criações, vieram planilhas, análises e indicadores. A arte de transformar números em decisões — Python, SQL e Power BI como primeiras armas desta jornada.",
    sideTitle: "Ferramentas & Tecnologias",
    sideContent: "Python · Pandas · Power BI · SQL · BigQuery · Streamlit · Automações em Excel · Análise de dados para RH e People Analytics na Stellantis.",
    num: "— II —"
  },
  {
    chapter: "◆  Capítulo II  ◆",
    title: "As Primeiras Ferramentas",
    content: "A forja do desenvolvedor web: HTML que estrutura mundos, CSS que os pinta, JavaScript que lhes dá vida. Vue e Laravel como aliados para batalhas de maior porte.",
    sideTitle: "Projetos Web",
    sideContent: "Portfólio-livro interativo · Org Chart com Dash/Plotly · Landing pages · Interfaces com Vue3 · Sistemas com Laravel · Componentes JavaScript puros.",
    num: "— III —"
  },
  {
    chapter: "◆  Epílogo  ◆",
    title: "O Caminho Adiante",
    content: "A jornada não termina — ela se expande. Data Engineering, Machine Learning, Generative AI e uma marca pessoal sendo construída uma linha de código por vez.",
    sideTitle: "Contato & Conexões",
    sideContent: "GitHub · LinkedIn · YouTube · Instagram\n\nConteúdo sobre a jornada em tech — aprendendo em público, errando e crescendo.",
    num: "— IV —"
  }
];

/* =============================================
   ELEMENTOS
   ============================================= */
const bookWrapper = document.getElementById('bookWrapper');
const openBtn     = document.getElementById('openBtn');
const nav         = document.getElementById('nav');

const chapterLabel = document.getElementById('chapterLabel');
const pageTitle    = document.getElementById('pageTitle');
const pageContent  = document.getElementById('pageContent');
const sideTitle    = document.getElementById('sideTitle');
const sideContent  = document.getElementById('sideContent');
const pgLeft       = document.getElementById('pgLeft');
const pgRight      = document.getElementById('pgRight');
const navInd       = document.getElementById('navInd');

const prevBtn  = document.getElementById('prevBtn');
const nextBtn  = document.getElementById('nextBtn');

const flipWrap = document.getElementById('flipWrap');
const flip     = document.getElementById('flip');
const flipFront = document.getElementById('flipFront');
const flipBack  = document.getElementById('flipBack');

const leftPage  = document.getElementById('leftPage');
const rightPage = document.getElementById('rightPage');

/* =============================================
   ESTADO
   ============================================= */
let currentPage = 0;
let isAnimating = false;
let isOpen      = false;

const roman = ['I', 'II', 'III', 'IV'];

/* =============================================
   PARTÍCULAS DE POEIRA
   ============================================= */
function spawnDust() {
  const container = document.getElementById('dustContainer');
  for (let i = 0; i < 20; i++) {
    const d = document.createElement('div');
    d.className = 'dust';
    const size = Math.random() * 5 + 2;
    d.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      top:${Math.random() * 60 + 100}%;
      animation-duration:${Math.random() * 16 + 10}s;
      animation-delay:${Math.random() * 14}s;
    `;
    container.appendChild(d);
  }
}

/* =============================================
   ABRIR LIVRO
   ============================================= */
openBtn.addEventListener('click', () => {
  if (isOpen) return;
  isOpen = true;

  // 1. Expande o wrapper + vira a capa (via CSS .is-open)
  bookWrapper.classList.add('is-open');

  // 2. Renderiza a primeira página
  renderPage(false);

  // 3. Navagação aparece via CSS seletor ~ depois do wrapper
});

/* =============================================
   RENDERIZAR PÁGINA
   ============================================= */
function renderPage(animate = true) {
  const p = pages[currentPage];

  chapterLabel.textContent = p.chapter;
  pageTitle.textContent    = p.title;
  pageContent.textContent  = p.content;
  sideTitle.textContent    = p.sideTitle;
  sideContent.textContent  = p.sideContent;
  pgLeft.textContent       = p.num;
  pgRight.textContent      = p.num;

  navInd.textContent = `${roman[currentPage]} / ${roman[pages.length - 1]}`;

  prevBtn.disabled = currentPage === 0 || isAnimating;
  nextBtn.disabled = currentPage === pages.length - 1 || isAnimating;

  if (animate) {
    leftPage.classList.add('reveal');
    rightPage.classList.add('reveal');
    setTimeout(() => {
      leftPage.classList.remove('reveal');
      rightPage.classList.remove('reveal');
    }, 900);
  }
}

/* =============================================
   CLONE DE CONTEÚDO PARA O FLIP
   ============================================= */
function buildPageHTML(index, side) {
  const p = pages[index];
  if (!p) return '';

  const isLeft = side === 'left';
  const bg = isLeft
    ? 'linear-gradient(90deg, rgba(60,28,8,0.15) 0%, transparent 7%), #e8d5a0'
    : 'linear-gradient(270deg, rgba(60,28,8,0.16) 0%, transparent 7%), #e8d5a0';

  const contentHTML = isLeft
    ? `<span style="display:block;font-family:'Cinzel',serif;font-size:0.68rem;letter-spacing:3px;text-transform:uppercase;color:#7a4a20;margin-bottom:16px;padding-bottom:8px;border-bottom:1px solid rgba(120,75,30,0.3);">${p.chapter}</span>
       <h2 style="font-family:'Cinzel Decorative',serif;font-size:1.55rem;color:#2a1408;line-height:1.2;margin-bottom:14px;">${p.title}</h2>
       <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;width:65%;">
         <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(120,75,30,0.5),transparent);"></div>
         <span style="font-size:0.58rem;color:#c9933a;">✦</span>
       </div>
       <p style="font-size:1rem;line-height:1.92;color:#3f2010;font-style:italic;font-family:'IM Fell English',Georgia,serif;">${p.content}</p>
       <span style="position:absolute;bottom:26px;left:44px;font-family:'Cinzel',serif;font-size:0.7rem;color:#7a4a20;opacity:0.55;letter-spacing:2px;">${p.num}</span>`
    : `<h3 style="font-family:'Cinzel',serif;font-size:1.35rem;color:#2a1408;line-height:1.3;margin-bottom:14px;">${p.sideTitle}</h3>
       <div style="display:flex;align-items:center;gap:8px;margin-bottom:20px;width:65%;">
         <div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(120,75,30,0.5),transparent);"></div>
         <span style="font-size:0.58rem;color:#c9933a;">✦</span>
       </div>
       <p style="font-size:1rem;line-height:1.92;color:#3f2010;font-style:italic;font-family:'IM Fell English',Georgia,serif;">${p.sideContent}</p>
       <span style="position:absolute;bottom:26px;right:44px;font-family:'Cinzel',serif;font-size:0.7rem;color:#7a4a20;opacity:0.55;letter-spacing:2px;">${p.num}</span>`;

  return `<div style="padding:52px 44px 44px;height:100%;position:relative;overflow:hidden;background:${bg};">${contentHTML}</div>`;
}

/* =============================================
   VIRAR PÁGINA
   ============================================= */
function turnPage(dir) {
  if (isAnimating) return;

  const isNext  = dir === 'next';
  const nextIdx = isNext ? currentPage + 1 : currentPage - 1;
  if (nextIdx < 0 || nextIdx >= pages.length) return;

  isAnimating = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  // Posiciona o flip-wrap
  if (isNext) {
    flipWrap.style.left   = '';
    flipWrap.style.right  = '0';
    flipWrap.style.width  = '50%';
    flip.style.transformOrigin = 'left center';
    flipFront.innerHTML = buildPageHTML(currentPage, 'right');
    flipBack.innerHTML  = buildPageHTML(nextIdx,     'left');
  } else {
    flipWrap.style.left   = '0';
    flipWrap.style.right  = '';
    flipWrap.style.width  = '50%';
    flip.style.transformOrigin = 'right center';
    flipFront.innerHTML = buildPageHTML(currentPage, 'left');
    flipBack.innerHTML  = buildPageHTML(nextIdx,     'right');
  }

  // Estado inicial do flip
  flip.style.animation  = 'none';
  flip.style.transform  = isNext ? 'rotateY(0deg)' : 'rotateY(-180deg)';
  flipWrap.classList.remove('to-left', 'to-right');
  void flip.offsetWidth; // reflow

  // Inicia animação
  flipWrap.classList.add(isNext ? 'to-left' : 'to-right');

  const dur = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--flip-dur')
  ) || 850;

  // Na metade: troca conteúdo de fundo
  setTimeout(() => {
    currentPage = nextIdx;
    renderPage(false);
  }, dur * 0.48);

  // No fim: limpa
  setTimeout(() => {
    flipWrap.classList.remove('to-left', 'to-right');
    flipFront.innerHTML = '';
    flipBack.innerHTML  = '';
    flip.style.transform = '';
    flip.style.animation = '';
    isAnimating = false;
    renderPage(true);
  }, dur + 80);
}

/* =============================================
   EVENTOS
   ============================================= */
prevBtn.addEventListener('click', () => turnPage('prev'));
nextBtn.addEventListener('click', () => turnPage('next'));

document.addEventListener('keydown', e => {
  if (!isOpen) return;
  if (e.key === 'ArrowRight') turnPage('next');
  if (e.key === 'ArrowLeft')  turnPage('prev');
});

/* =============================================
   INIT
   ============================================= */
spawnDust();
