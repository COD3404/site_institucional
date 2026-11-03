// Navbar: fundo ao rolar + menu mobile
const nav = document.getElementById("nav"),
  menu = document.getElementById("menu");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 20);
onScroll();
addEventListener("scroll", onScroll);
document.getElementById("burger").onclick = () => menu.classList.toggle("open");
menu
  .querySelectorAll("a")
  .forEach((a) => (a.onclick = () => menu.classList.remove("open")));

// Animação ao rolar (reveal)
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Faixa de marcas
const mq = document.getElementById("mq");
if (mq) {
  const m = ["STARTUP", "AgroELo", "MarketFlow", "VERTEX"];
  mq.innerHTML = [...m, ...m, ...m, ...m]
    .map((x) => `<strong>${x}</strong>`)
    .join("");
}

// Carrossel da equipe
const slide = document.getElementById("slide");
if (slide) {
  const eq = [
    {
      n: "João Vitor",
      c: "Desenvolvedor Full Stack",
      f: "images/joao.jpeg",
      t: "Desenvolvimento",
      d: "Responsável pelo desenvolvimento de aplicações web, integração entre front-end e back-end e implementação de soluções tecnológicas eficientes.",
    },
    {
      n: "Pedro Lacerda",
      c: "Desenvolvedor Front-end",
      f: "images/pedro.jpeg",
      t: "Interfaces digitais",
      d: "Atua na criação de interfaces modernas, responsivas e intuitivas, priorizando a experiência do usuário e a identidade visual dos projetos.",
    },
    {
      n: "Rafael Ferret",
      c: "Desenvolvedor Back-end",
      f: "images/rafa.png",
      t: "Sistemas e dados",
      d: "Responsável pela lógica de negócio, integração com bancos de dados, criação de rotas e desenvolvimento da estrutura que mantém as aplicações funcionando.",
    },
    {
      n: "Guilherme Carneiro",
      c: "Analista de Sistemas",
      f: "images/guilherme.jpeg",
      t: "Análise e inovação",
      d: "Contribui com o planejamento, a análise de requisitos, a organização das funcionalidades e a busca por soluções que atendam às necessidades dos clientes.",
    },
  ];
  const dots = document.getElementById("dots");
  let i = 0,
    timer;
  eq.forEach((_, k) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Integrante " + (k + 1));
    b.onclick = () => ir(k);
    dots.appendChild(b);
  });
  function render() {
    const p = eq[i];
    slide.innerHTML = `<div class="foto"><div class="glow"></div>${
      p.f
        ? `<img src="${p.f}" alt="Foto de ${p.n}">`
        : `<div class="ini"><span class="grad">${p.n
            .split(" ")
            .map((x) => x[0])
            .join("")}</span></div>`
    }<span class="num">0${i + 1} / 0${eq.length}</span></div>
  <div class="info"><p class="eyebrow">NOSSA EQUIPE</p><h3>${p.n}</h3><span class="cargo">${p.c}</span><p>${p.d}</p><span class="tag">${p.t}</span></div>`;
    slide.style.animation = "none";
    slide.offsetHeight;
    slide.style.animation = "";
    [...dots.children].forEach((d, k) => d.classList.toggle("on", k === i));
    clearInterval(timer);
    timer = setInterval(() => ir(i + 1), 6000);
  }
  function ir(n) {
    i = (n + eq.length) % eq.length;
    render();
  }
  document.getElementById("prev").onclick = () => ir(i - 1);
  document.getElementById("next").onclick = () => ir(i + 1);
  render();
}
