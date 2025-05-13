// =====================
// ANIMACIÓN DEL SUBRAYADO EN EL TÍTULO "¿POR QUÉ ALQUIMIA?"
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector(".reason h2");

  const observer = new IntersectionObserver(
    ([entry]) => {
      titulo.classList.toggle("animate-underline", entry.isIntersecting);
    },
    { threshold: 0.5 }
  );

  if (titulo) observer.observe(titulo);
});


// =====================
// FRASE H1 DINÁMICA (ROTACIÓN DE FRASES MAGICAMENTE)
// =====================
const frases = [
  "Diseñá perfumes que hablen de vos.",
  "Convertí tus recuerdos en aroma.",
  "Tu esencia, hecha perfume.",
  "Explorá ingredientes. Creá magia.",
  "Diseñá como un alquimista moderno."
];

const animatedText = document.getElementById("animated-text");
let index = 0;

function mostrarFrase(frase) {
  const palabras = frase.split(" ");
  animatedText.innerHTML = "";

  palabras.forEach((palabra, i) => {
    const span = document.createElement("span");
    span.innerHTML = palabra + "&nbsp;";
    span.classList.add("fade-word", "fade-in");
    span.style.animationDelay = `${i * 0.2}s`;
    animatedText.appendChild(span);
  });
}

function ocultarFrase() {
  const palabras = animatedText.querySelectorAll("span");
  palabras.forEach((span, i) => {
    span.classList.remove("fade-in");
    span.classList.add("fade-out");
    span.style.animationDelay = `${i * 0.1}s`;
  });
}

// Inicial y bucle cada 10 segundos
mostrarFrase(frases[index]);
setInterval(() => {
  ocultarFrase();
  setTimeout(() => {
    index = (index + 1) % frases.length;
    mostrarFrase(frases[index]);
  }, 1000);
}, 10000);


// =====================
// TEST OLFATIVO: MANEJO DE OPCIONES, RESULTADO Y ANIMACIÓN SVG
// =====================
const botonesClima = document.querySelectorAll(".opciones button");
const resultadoTexto = document.querySelector(".texto-resultado");
const resultadoFamilia = document.getElementById("resultadoFamilia");
const pregunta2 = document.getElementById("pregunta2");
const svgContainer = document.querySelector(".pocima-container");
const reiniciarBtn = document.getElementById("btnReiniciar");

const familias = {
  acuatica: { texto: "Marinas/Cítricas.", color: "#66cccc" },
  frutal: { texto: "Frutales/Florales.", color: "#ff6699" },
  madera: { texto: "Amaderadas/Especiadas.", color: "#cc9966" },
  ambarada: { texto: "Gourmand/Ambaradas.", color: "#9966cc" }
};

const svgPaths = [
  "./img/potion/potion00.svg",
  "./img/potion/potion01.svg",
  "./img/potion/potion03.svg",
  "./img/potion/potion04.svg"
];

// Carga SVG y pinta relleno
async function cargarSVGInlineConColor(url, color) {
  const response = await fetch(url);
  const svgText = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, "image/svg+xml");
  const svg = doc.querySelector("svg");

  svg.setAttribute("width", "300");
  svg.setAttribute("height", "300");

  const relleno = svg.querySelector(".relleno");
  if (relleno) relleno.setAttribute("fill", color);

  svgContainer.innerHTML = "";
  svgContainer.appendChild(svg);
}

// Animación del frasco paso a paso
async function animarLlenado(color) {
  for (let i = 0; i < svgPaths.length; i++) {
    await cargarSVGInlineConColor(svgPaths[i], color);
    await new Promise(resolve => setTimeout(resolve, 300));
  }
}

// Evento click en cada botón del test
botonesClima.forEach(btn => {
  btn.addEventListener("click", async () => {
    const tipo = btn.dataset.fragancia;
    const familia = familias[tipo];
    if (!familia) return;

    resultadoTexto.textContent = "";
    resultadoFamilia.classList.remove("hidden");
    pregunta2.classList.add("hidden");

    // Animar texto mágico
    familia.texto.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animation = "magic-fade 0.6s ease forwards";
      span.style.animationDelay = `${i * 0.05}s`;
      resultadoTexto.appendChild(span);
    });

    await animarLlenado(familia.color);
  });
});

// Reiniciar test
reiniciarBtn.addEventListener("click", () => {
  resultadoFamilia.classList.add("hidden");
  pregunta2.classList.remove("hidden");
  resultadoTexto.textContent = "";
  cargarSVGInlineConColor("./img/potion/potion00.svg", "#00bfa6");
});

// Mostrar la poción vacía al inicio
cargarSVGInlineConColor("./img/potion/potion00.svg", "#00bfa6");
