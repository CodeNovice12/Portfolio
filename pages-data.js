/* =============================================================
   PAGES_DATA — Crônicas de um Desenvolvedor · Lucas Cunha
   -------------------------------------------------------------
   Cada item é UMA FACE de página do livro.
   Índice par = página esquerda · índice ímpar = página direita.

   Estrutura de cada página:
   {
     tag:    'cabeçalho do capítulo'  (opcional)
     title:  'título da página'       (opcional)
     blocks: [ ... ]                  (conteúdo em blocos)
   }

   Tipos de bloco:
   { type:'p',       text:'parágrafo' }
   { type:'list',    title:'Categoria', items:['a','b'] }
   { type:'mission', title:'Nome', meta:[['Chave','Valor']], text:'descrição' }
   { type:'quote',   text:'citação', author:'autor' }
   { type:'center',  title:'Título', sub:'subtítulo' }
   ============================================================= */
const PAGES_DATA = [

  /* ---------- PRÓLOGO ---------- */
  {
    tag: '◆  Prólogo  ◆',
    title: 'Toda grande história começa antes da primeira página',
    blocks: [
      { type: 'p', text: 'Ela nasce em um momento simples: uma pergunta, uma curiosidade ou o desejo de compreender como as coisas funcionam. Foi assim que minha jornada pela tecnologia teve início.' },
      { type: 'p', text: 'Meu nome é Lucas Cunha, e este livro reúne muito mais do que projetos, certificados ou experiências profissionais. Cada capítulo representa um desafio enfrentado, uma habilidade conquistada e uma oportunidade de transformar conhecimento em soluções reais.' },
    ],
  },
  {
    blocks: [
      { type: 'p', text: 'Ao longo dessa caminhada, encontrei na programação uma forma de construir ideias, na análise de dados uma maneira de revelar histórias escondidas nos números e na inteligência artificial um universo de possibilidades para o futuro.' },
      { type: 'p', text: 'Ainda há muito a aprender, e talvez essa seja a parte mais fascinante desta jornada: compreender que todo novo desafio é também o início de um novo capítulo.' },
      { type: 'p', text: 'Agora, convido você a virar a página. As próximas folhas apresentam as experiências, projetos e aprendizados que moldaram minha trajetória até aqui.' },
      { type: 'p', text: 'Seja bem-vindo às minhas crônicas.' },
    ],
  },

  /* ---------- CAPÍTULO I — AS ORIGENS ---------- */
  {
    tag: '◆  Capítulo I  ◆',
    title: 'As Origens',
    blocks: [
      { type: 'p', text: 'Nem toda jornada nasce de um plano cuidadosamente traçado. Algumas começam em momentos de incerteza, quando a necessidade de encontrar um novo caminho se transforma em oportunidade.' },
      { type: 'p', text: 'Foi em 2022, durante um período de desemprego, que encontrei a tecnologia. Meu primeiro contato aconteceu por meio de um curso de Desenvolvimento Web na Udemy, onde descobri que programar era muito mais do que escrever códigos: era construir soluções, criar experiências e dar forma às ideias.' },
    ],
  },
  {
    blocks: [
      { type: 'p', text: 'Movido pela curiosidade, iniciei minha graduação em Ciência da Computação na Faculdade Descomplica ainda naquele mesmo ano. Cada disciplina reforçava a certeza de que eu havia encontrado uma área capaz de unir aprendizado contínuo, criatividade e resolução de problemas.' },
      { type: 'p', text: 'Em 2023 surgiu a primeira oportunidade profissional na área, na Decla. Foi ali que dei meus primeiros passos no desenvolvimento de software em ambiente corporativo, trabalhando com PHP, Laravel e Vue, além de compreender a importância da colaboração em equipe.' },
    ],
  },
  {
    blocks: [
      { type: 'p', text: 'Pouco tempo depois, uma nova porta se abriu. Em agosto de 2023, ingressei na Stellantis, iniciando uma etapa que transformaria minha visão sobre dados e tomada de decisão.' },
      { type: 'p', text: 'Durante dois anos, até setembro de 2025, aprofundei meus conhecimentos em Python, SQL e Análise de Dados, participando de iniciativas voltadas para People Analytics e descobrindo o potencial dos dados para gerar insights, apoiar estratégias e impulsionar resultados.' },
    ],
  },
  {
    blocks: [
      { type: 'p', text: 'Em outubro de 2025, comecei uma nova fase no Instituto Aquila, onde continuo expandindo meus conhecimentos em Python, análise de dados e desenvolvimento de soluções orientadas por informação.' },
      { type: 'p', text: 'Cada experiência adicionou novas habilidades à minha trajetória, consolidando a convicção de que a tecnologia não é apenas uma profissão, mas uma jornada de aprendizado constante.' },
      { type: 'p', text: 'E assim, o que começou como uma busca por um novo caminho tornou-se uma paixão, uma carreira e a certeza de que ainda existem muitos capítulos a serem escritos.' },
    ],
  },

  /* ---------- CAPÍTULO II — O ARSENAL ---------- */
  {
    tag: '◆  Capítulo II  ◆',
    title: 'O Arsenal do Desenvolvedor',
    blocks: [
      { type: 'p', text: 'Toda jornada exige ferramentas adequadas para enfrentar os desafios que surgem pelo caminho. Com o passar dos anos, fui reunindo conhecimentos que hoje compõem meu arsenal profissional.' },
      { type: 'list', title: 'Linguagens Dominadas', items: ['Python', 'SQL', 'JavaScript', 'PHP'] },
      { type: 'list', title: 'Frameworks & Tecnologias', items: ['Laravel', 'Vue.js', 'Dash', 'Plotly'] },
    ],
  },
  {
    blocks: [
      { type: 'list', title: 'Ciência de Dados', items: ['Análise Exploratória', 'Dashboards & BI', 'Visualização de Dados', 'BigQuery · Power BI'] },
      { type: 'list', title: 'Ferramentas de Desenvolvimento', items: ['Git · GitHub', 'VS Code', 'APIs REST'] },
      { type: 'list', title: 'Novas Fronteiras', items: ['IA Generativa', 'Automações', 'Machine Learning', 'Desenvolvimento orientado por dados'] },
    ],
  },

  /* ---------- CAPÍTULO III — AS GRANDES MISSÕES ---------- */
  {
    tag: '◆  Capítulo III  ◆',
    title: 'As Grandes Missões',
    blocks: [
      { type: 'p', text: 'O conhecimento só ganha verdadeiro significado quando colocado em prática. Cada projeto tornou-se um campo de experimentação e uma oportunidade de enfrentar desafios reais.' },
      { type: 'mission', title: 'Missão I — O Mapa das Estruturas Organizacionais', meta: [['Ano', '2024–2025'], ['Categoria', 'People Analytics · Visualização']], text: 'Organograma interativo desenvolvido na Stellantis com Python, Dash, Plotly e NetworkX. Hierarquia completa em formato Top-Down, expansão de nós ao clique, atualização automática via arquivos e navegação dinâmica.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'Missão II — As Hospedarias do Mundo Digital', meta: [['Categoria', 'Front-End']], text: 'Landing page inspirada em um hotel, criada para consolidar HTML e CSS: estruturação semântica, responsividade e design moderno para páginas institucionais.' },
      { type: 'mission', title: 'Missão III — O Espaço do Conhecimento', meta: [['Categoria', 'Desenvolvimento Web']], text: 'Projeto para o Espaço Sabedoria combinando HTML, CSS e JavaScript: componentes interativos, navegação intuitiva e estrutura responsiva.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'Missão IV — O Atelier das Formas', meta: [['Categoria', 'Estudos & Experimentação']], text: 'Landing page para um estúdio de arquitetura, explorando hierarquia visual, tipografia, composição estética e refinamento de layouts.' },
      { type: 'mission', title: 'Missão V — O Caminho das Rotas Inteligentes', meta: [['Categoria', 'Python · Logística · Otimização']], text: 'Sistema de roteirização para operações de varejo, construindo rotas mais eficientes com Python, manipulação de dados e algoritmos de otimização.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'Missão VI — O Guardião das Identidades', meta: [['Categoria', 'Back-End']], text: 'Aplicação em PHP para cadastro e validação de CPFs, com persistência de dados, verificação de consistência e interface funcional.' },
      { type: 'p', text: 'Cada missão concluída representa mais do que um projeto entregue. São registros de uma jornada marcada por aprendizado contínuo, adaptação e curiosidade constante.' },
    ],
  },
  {
    tag: '◆  Missões em Curso  ◆',
    title: 'Novas Expedições',
    blocks: [
      { type: 'p', text: 'Algumas jornadas já foram concluídas, outras estão apenas começando. Afinal, a tecnologia está em constante transformação, e novos caminhos surgem a cada descoberta.' },
      { type: 'mission', title: 'Missão VII — Os Salões dos Dados Interativos', meta: [['Estado', 'Em desenvolvimento'], ['Início', 'Agosto de 2026']], text: 'Dashboards modernos com Streamlit, unindo análise de dados, interatividade e acessibilidade em aplicações visuais intuitivas.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'Missão VIII — As Crônicas Artificiais', meta: [['Estado', 'Em planejamento']], text: 'Estudos em IA Generativa: LLMs, Prompt Engineering, agentes inteligentes e aplicações corporativas.' },
      { type: 'mission', title: 'Missão IX — O Grimório das Automações', meta: [['Estado', 'Primeiras páginas']], text: 'Automação de fluxos de trabalho com ferramentas de IA, assistentes personalizados e sistemas orientados por contexto.' },
      { type: 'p', text: 'São as páginas ainda em branco que despertam maior curiosidade. Talvez sejam elas que reservem as histórias mais interessantes desta aventura.' },
    ],
  },

  /* ---------- CAPÍTULO IV — GUILDAS E ALIANÇAS ---------- */
  {
    tag: '◆  Capítulo IV  ◆',
    title: 'As Guildas e Alianças',
    blocks: [
      { type: 'p', text: 'Nenhuma grande jornada é construída em solidão. Cada organização representou uma etapa importante desta trajetória.' },
      { type: 'mission', title: 'A Primeira Guilda — Decla', meta: [['Ano', '2023'], ['Especialidade', 'Desenvolvimento Web']], text: 'Primeira experiência profissional em tecnologia. Aplicações web corporativas com PHP, Laravel e Vue.js — e a compreensão da importância da colaboração, da organização do código e do aprendizado contínuo.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'A Guilda da Mobilidade — Stellantis', meta: [['Período', 'Ago 2023 — Set 2025'], ['Especialidade', 'Dados · People Analytics']], text: 'Dois anos descobrindo o potencial dos dados para decisões estratégicas: Python, SQL, dashboards, automação de processos e o organograma interativo capaz de representar estruturas organizacionais complexas de forma dinâmica.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'A Guilda da Transformação — Instituto Aquila', meta: [['Período', 'Out 2025 — Presente']], text: 'O capítulo atual desta história. Aprofundamento em Python avançado, análise de dados, dashboards interativos, automação e inteligência artificial.' },
      { type: 'p', text: 'Cada guilda trouxe ensinamentos diferentes. E todas fortaleceram uma convicção: a tecnologia é uma jornada contínua de aprendizado, descoberta e evolução.' },
    ],
  },

  /* ---------- Página de transição (equilibra o livro) ---------- */
  {
    blocks: [
      { type: 'quote', text: 'O conhecimento é a única riqueza que cresce quando compartilhada.', author: '' },
    ],
  },

  /* ---------- CAPÍTULO V — PERGAMINHOS ---------- */
  {
    tag: '◆  Capítulo V  ◆',
    title: 'Os Pergaminhos do Conhecimento',
    blocks: [
      { type: 'mission', title: 'A Academia das Ciências da Computação', meta: [['Instituição', 'Faculdade Descomplica'], ['Situação', 'Em andamento']], text: 'Desde 2022, construindo base sólida em desenvolvimento de software, análise de dados, IA e soluções digitais. A cada trimestre, novos certificados registram a evolução contínua.' },
      { type: 'mission', title: 'O Pergaminho do Desenvolvimento Web', meta: [['Instituição', 'Udemy']], text: 'O primeiro contato com programação: HTML, CSS, JavaScript e os conceitos que despertaram a curiosidade que levaria à graduação.' },
    ],
  },
  {
    blocks: [
      { type: 'mission', title: 'Os Estudos do Reino dos Dados', meta: [['Instituição', 'Alura']], text: 'Formações em Python para Dados, SQL, dashboards, BI, análise exploratória e visualização de dados.' },
      { type: 'mission', title: 'Os Manuscritos da Língua Universal', meta: [['Instituição', 'Alura Língua']], text: 'O estudo do inglês como ferramenta para ampliar horizontes, acessar conteúdos técnicos e colaborar globalmente.' },
      { type: 'p', text: 'Em um universo que está sempre se transformando, aprender é também uma forma de seguir avançando.' },
    ],
  },

  /* ---------- EPÍLOGO ---------- */
  {
    tag: '◆  Epílogo  ◆',
    title: 'As Páginas Ainda em Branco',
    blocks: [
      { type: 'p', text: 'Chegar ao final de um livro costuma significar o encerramento de uma história. Mas algumas histórias não foram feitas para terminar. Foram feitas para continuar sendo escritas.' },
      { type: 'p', text: 'Ao voltar algumas páginas, vejo um jovem em 2022, desempregado, buscando um novo caminho sem imaginar que encontraria na tecnologia muito mais do que uma profissão.' },
      { type: 'p', text: 'Vieram os primeiros códigos. Os primeiros desafios. As primeiras oportunidades. A graduação, a Decla, a Stellantis, o Instituto Aquila — e a certeza de que sempre haverá algo novo a aprender.' },
    ],
  },
  {
    blocks: [
      { type: 'p', text: 'Os próximos capítulos já começam a tomar forma: dashboards em Streamlit, as Crônicas Artificiais, o Grimório das Automações e soluções capazes de conectar pessoas, informações e tecnologia.' },
      { type: 'p', text: 'Mas existe algo que acompanha esta jornada desde o princípio. O desejo de deixar uma marca. Construir algo que permaneça. Compartilhar conhecimento. Contribuir com pessoas.' },
      { type: 'p', text: 'Espero que um dia meus filhos possam olhar para estas páginas e enxergar dedicação, persistência, coragem para recomeçar e a convicção de que vale a pena perseguir aquilo em que acreditamos.' },
    ],
  },
  {
    blocks: [
      { type: 'p', text: 'Ainda existem muitos territórios desconhecidos. Muitas ferramentas para explorar. E inúmeros capítulos esperando para serem escritos.' },
      { type: 'p', text: 'Por isso, não considero estas páginas como o fim desta história. Apenas como o encerramento do primeiro volume. Porque algumas jornadas não terminam. Elas apenas aguardam o próximo capítulo.' },
      { type: 'quote', text: 'As melhores histórias não são aquelas que chegam ao fim, mas aquelas que continuam sendo escritas.', author: 'Lucas Cunha' },
    ],
  },
  {
    blocks: [
      { type: 'center', title: 'Crônicas de um Desenvolvedor', sub: 'Volume I — Em Construção' },
    ],
  },

];
