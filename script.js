/* =============================================
   DADOS DAS PÁGINAS
   ============================================= */
const pages = [
  {
    chapter: "Prólogo",
    title: "O Início da Jornada",
    content: "Toda jornada começa antes mesmo do herói entender o chamado. Foram anos aprendendo a linguagem dos dados, antes de perceber que a programação seria o mapa para o destino.",
    sideTitle: "Quem é Lucas",
    sideContent: "29 anos, analista em People Analytics na Stellantis. 6 anos como assistente administrativo moldaram o olhar para processos — a tecnologia veio transformar esse olhar em soluções.",
    pageNum: "I"
  },
  {
    chapter: "Capítulo I",
    title: "O Aprendiz dos Dados",
    content: "Antes das grandes criações, vieram planilhas, análises e indicadores. A arte de transformar números em decisões — Python, SQL e Power BI como primeiras armas nesta jornada.",
    sideTitle: "Ferramentas & Tecnologias",
    sideContent: "Python · Pandas · Power BI · SQL · BigQuery · Streamlit · Automações em Excel · Análise de dados para RH e People Analytics.",
    pageNum: "II"
  },
  {
    chapter: "Capítulo II",
    title: "As Primeiras Ferramentas",
    content: "A forja do desenvolvedor web: HTML que estrutura mundos, CSS que os pinta, JavaScript que lhes dá vida. Vue e Laravel como aliados para batalhas de maior porte.",
    sideTitle: "Projetos Web",
    sideContent: "Portfólio-livro interativo · Org Chart com Dash/Plotly · Landing pages · Interfaces com Vue3 · Sistemas com Laravel · Componentes JavaScript puros.",
    pageNum: "III"
  },
  {
    chapter: "Epílogo",
    title: "O Caminho Adiante",
    content: "A jornada não termina — ela se expande. Data Engineering, Machine Learning, Generative AI e uma marca pessoal sendo construída uma linha de código por vez.",
    sideTitle: "Contato & Conexões",
    sideContent: "GitHub · LinkedIn · YouTube · Instagram\n\nEm construção: conteúdo sobre a jornada em tech — aprendendo em público, errando e crescendo.",
    pageNum: "IV"
  }
];

/* =============================================
   ELEMENTOS DO DOM
   ============================================= */
const bookCover    = document.getElementById('bookCover');
const bookPages    = document.getElementById('bookPages');
const openBookBtn  = document.getElementById('openBookButton');

const chapterLabel = document.getElementById('chapterLabel');
const pageTitle    = document.getElementById('pageTitle');
const pageContent  = document.getElementById('pageContent');
const sideTitle    = document.getElementById('sideTitle');
const sideContent  = document.getElementById('sideContent');
const pageNumLeft  = document.getElementById('pageNumLeft');
const pageNumRight = document.getElementById('pageNumRight');

const prevBtn      = document.getElementById('prevButton');
const nextBtn      = document.getElementById('nextButton');
const pageIndicator = document.getElementById('pageIndicator');

const flipWrapper  = document.getElementById('flipWrapper');
const flipPage     = document.getElementById('flipPage');
const flipFront    = document.getElementById('flipFront');
const flipBack     = document.getElementById('flipBack');

const leftPage     = document.getElementById('leftPage');
const rightPage    = document.getElementById('rightPage');

/* =============================================
   ESTADO
   ============================================= */
let currentPage = 0;
let isAnimating = false;

/* =============================================
   PARTÍCULAS DE POEIRA
   ============================================= */
function createDust() {
  const container = document.getElementById('dustContainer');
  const count = 18;

  for (let i = 0; i < count; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';

    const size = Math.random() * 5 + 2;
    dust.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100 + 100}%;
      animation-duration: ${Math.random() * 18 + 10}s;
      animation-delay: ${Math.random() * 12}s;
    `;

    container.appendChild(dust);
  }
}

/* =============================================
   ABRIR LIVRO
   ============================================= */
function openBook() {
  bookCover.classList.add('opened');
  bookPages.classList.add('visible');
  renderPage();
}

/* =============================================
   RENDERIZAR PÁGINA
   ============================================= */
function renderPage(animate = false) {
  const page = pages[currentPage];

  if (animate) {
    leftPage.classList.add('fading-in');
    rightPage.classList.add('fading-in');
    setTimeout(() => {
      leftPage.classList.remove('fading-in');
      rightPage.classList.remove('fading-in');
    }, 900);
  }

  chapterLabel.textContent = page.chapter;
  pageTitle.textContent    = page.title;
  pageContent.textContent  = page.content;
  sideTitle.textContent    = page.sideTitle;
  sideContent.textContent  = page.sideContent;
  pageNumLeft.textContent  = page.pageNum;
  pageNumRight.textContent = page.pageNum;

  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
  pageIndicator.textContent = `${romanNumerals[currentPage]} / ${romanNumerals[pages.length - 1]}`;

  prevBtn.disabled = currentPage === 0 || isAnimating;
  nextBtn.disabled = currentPage === pages.length - 1 || isAnimating;
}

/* =============================================
   ANIMAÇÃO DE VIRADA DE PÁGINA
   ============================================= */
function clonePageContent(targetEl, pageIndex, side) {
  const page = pages[pageIndex];
  if (!page) return;

  let html = '';
  if (side === 'left') {
    html = `
      <div style="padding: 52px 48px; height: 100%; position: relative;">
        <span style="font-family: 'Cinzel', serif; font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; color: #6b3f1e; display: inline-block; margin-bottom: 20px; border-bottom: 1px solid rgba(107,63,30,0.3); padding-bottom: 6px;">${page.chapter}</span>
        <h2 style="font-family: 'Cinzel Decorative', serif; font-size: clamp(1.4rem, 2.5vw, 2.2rem); color: #1e0f05; line-height: 1.2; margin-bottom: 14px;">${page.title}</h2>
        <div style="width: 60%; height: 1px; background: linear-gradient(90deg, #6b3f1e, transparent); margin-bottom: 20px; opacity: 0.4;"></div>
        <p style="font-size: 1.05rem; line-height: 1.9; color: #3f2412; font-style: italic; font-family: 'IM Fell English', Georgia, serif;">${page.content}</p>
        <span style="position: absolute; bottom: 24px; left: 48px; font-family: 'Cinzel', serif; font-size: 0.78rem; color: #6b3f1e; opacity: 0.6; letter-spacing: 2px;">${page.pageNum}</span>
      </div>`;
  } else {
    html = `
      <div style="padding: 52px 48px; height: 100%; position: relative;">
        <h3 style="font-family: 'Cinzel', serif; font-size: clamp(1.1rem, 2vw, 1.6rem); color: #1e0f05; line-height: 1.3; margin-bottom: 14px;">${page.sideTitle}</h3>
        <div style="width: 60%; height: 1px; background: linear-gradient(90deg, #6b3f1e, transparent); margin-bottom: 20px; opacity: 0.4;"></div>
        <p style="font-size: 1.05rem; line-height: 1.9; color: #3f2412; font-style: italic; font-family: 'IM Fell English', Georgia, serif;">${page.sideContent}</p>
        <span style="position: absolute; bottom: 24px; right: 48px; font-family: 'Cinzel', serif; font-size: 0.78rem; color: #6b3f1e; opacity: 0.6; letter-spacing: 2px;">${page.pageNum}</span>
      </div>`;
  }

  targetEl.innerHTML = html;
}

function turnPage(direction) {
  if (isAnimating) return;

  const isNext = direction === 'next';
  const nextIndex = isNext ? currentPage + 1 : currentPage - 1;

  if (nextIndex < 0 || nextIndex >= pages.length) return;

  isAnimating = true;
  prevBtn.disabled = true;
  nextBtn.disabled = true;

  // Prepara os dois lados da página girando
  if (isNext) {
    // Frente: direita atual | Verso: esquerda próxima
    clonePageContent(flipFront, currentPage, 'right');
    clonePageContent(flipBack,  nextIndex,   'left');
    flipWrapper.style.left  = '';
    flipWrapper.style.right = '0';
    flipWrapper.style.width = '50%';
    flipWrapper.style.transformOrigin = 'left center';
  } else {
    // Frente: esquerda atual | Verso: direita próxima  
    clonePageContent(flipFront, currentPage, 'left');
    clonePageContent(flipBack,  nextIndex,   'right');
    flipWrapper.style.left  = '0';
    flipWrapper.style.right = '';
    flipWrapper.style.width = '50%';
    flipWrapper.style.transformOrigin = 'right center';
  }

  flipPage.style.transform = isNext ? 'rotateY(0deg)' : 'rotateY(-180deg)';
  flipPage.style.animation = 'none';
  flipWrapper.classList.remove('flipping-next', 'flipping-prev');

  // Força reflow
  void flipPage.offsetWidth;

  // Inicia a animação
  flipWrapper.classList.add(isNext ? 'flipping-next' : 'flipping-prev');

  // Na metade da animação: troca o conteúdo das páginas de fundo
  const halfTime = parseInt(getComputedStyle(document.documentElement)
    .getPropertyValue('--flip-dur')) || 900;

  setTimeout(() => {
    currentPage = nextIndex;
    renderPage(false);
  }, halfTime * 0.5);

  // Ao final da animação: limpa
  setTimeout(() => {
    flipWrapper.classList.remove('flipping-next', 'flipping-prev');
    flipFront.innerHTML = '';
    flipBack.innerHTML  = '';
    flipPage.style.transform = '';

    isAnimating = false;
    renderPage(true);
  }, halfTime + 60);
}

/* =============================================
   EVENTOS
   ============================================= */
openBookBtn.addEventListener('click', openBook);
nextBtn.addEventListener('click', () => turnPage('next'));
prevBtn.addEventListener('click', () => turnPage('prev'));

// Suporte a teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') turnPage('next');
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   turnPage('prev');
});

/* =============================================
   INIT
   ============================================= */
createDust();
renderPage();
