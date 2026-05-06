const turningPage = document.getElementById("turningPage");
const book = document.getElementById("book");
const openBookButton = document.getElementById("openBookButton");

const chapterLabel = document.getElementById("chapterLabel");
const pageTitle = document.getElementById("pageTitle");
const pageContent = document.getElementById("pageContent");
const sideTitle = document.getElementById("sideTitle");
const sideContent = document.getElementById("sideContent");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageIndicator = document.getElementById("pageIndicator");

const pages = [
  {
    chapter: "Prólogo",
    title: "O Início da Jornada",
    content: "Toda jornada começa antes mesmo do herói entender o chamado.",
    sideTitle: "Notas da Jornada",
    sideContent:
      "Aqui ficará uma introdução sobre quem sou, minha história e minha transição para tecnologia.",
  },
  {
    chapter: "Capítulo I",
    title: "O Aprendiz dos Dados",
    content:
      "Antes das grandes criações, vieram as planilhas, análises, indicadores e a busca por entender problemas reais.",
    sideTitle: "Tecnologias",
    sideContent: "Python, Pandas, Power BI, SQL, BigQuery e automações.",
  },
  {
    chapter: "Capítulo II",
    title: "As Primeiras Ferramentas",
    content:
      "Aqui entrarão meus projetos em HTML, CSS, JavaScript, Vue, React e Laravel.",
    sideTitle: "Projetos Web",
    sideContent:
      "Landing pages, sistemas simples, interfaces interativas e aplicações completas.",
  },
  {
    chapter: "Epílogo",
    title: "O Caminho Adiante",
    content:
      "Este portfólio crescerá junto com minha evolução como desenvolvedor.",
    sideTitle: "Contato",
    sideContent: "GitHub, LinkedIn, e-mail e redes profissionais.",
  },
];

let currentPage = 0;
let isAnimating = false;

function openBook() {
  book.classList.add("open");
}

function renderPage() {
  const page = pages[currentPage];

  chapterLabel.textContent = page.chapter;
  pageTitle.textContent = page.title;
  pageContent.textContent = page.content;
  sideTitle.textContent = page.sideTitle;
  sideContent.textContent = page.sideContent;

  pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;

  prevButton.disabled = currentPage === 0 || isAnimating;
  nextButton.disabled = currentPage === pages.length - 1 || isAnimating;
}

function nextPage() {
  if (currentPage < pages.length - 1 && !isAnimating) {
    isAnimating = true;
    renderPage();

    turningPage.className = "turning-page next";

    setTimeout(() => {
      currentPage++;
      renderPage();
    }, 350);

    setTimeout(() => {
      turningPage.className = "turning-page";
      isAnimating = false;
      renderPage();
    }, 750);
  }
}

function previousPage() {
  if (currentPage > 0 && !isAnimating) {
    isAnimating = true;
    renderPage();

    turningPage.className = "turning-page prev";

    setTimeout(() => {
      currentPage--;
      renderPage();
    }, 350);

    setTimeout(() => {
      turningPage.className = "turning-page";
      isAnimating = false;
      renderPage();
    }, 750);
  }
}

openBookButton.addEventListener("click", openBook);
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", previousPage);

renderPage();