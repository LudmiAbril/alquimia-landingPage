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
  

// =====================
// TOOLTIP: MANEJO REFACTORIZADO
// =====================
const tooltip = document.getElementById("tooltipFamilia");
let tipoSeleccionado = null;

function mostrarTooltip(e, tipo) {
  const familia = familias[tipo];
  if (!familia) return;

  tooltip.querySelector(".tooltip-texto").textContent = familia.descripcion;
  //tooltip.querySelector(".tooltip-img").src = familia.imagen;
  tooltip.querySelector(".tooltip-img").setAttribute("src", `${familia.imagen}`);

  tooltip.style.display = "block";
  tooltip.style.opacity = "1";
  tooltip.style.top = `${e.pageY + 15}px`;
  tooltip.style.left = `${e.pageX + 15}px`;
}

function ocultarTooltip() {
  if (!tooltip) return;
  tooltip.style.display = "none";
  tooltip.style.opacity = "0";
}


resultadoFamilia.addEventListener("mouseover", (e) => {
  const hovered = e.target;

  if (
    hovered.classList.contains("texto-resultado") &&
    hovered.dataset.tipo &&
    tooltip
  ) {
    mostrarTooltip(e, hovered.dataset.tipo);
  }
});

resultadoFamilia.addEventListener("mousemove", (e) => {
  if (tooltip.style.display === "block") {
    tooltip.style.top = `${e.pageY + 15}px`;
    tooltip.style.left = `${e.pageX + 15}px`;
  }
});

resultadoFamilia.addEventListener("mouseleave", () => {
  ocultarTooltip();
});


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
const pregunta2 = document.getElementById("preguntaBlock");
const svgContainer = document.querySelector(".pocima-container");
const reiniciarBtn = document.getElementById("btnReiniciar");

const familias = {
  acuatica: {
    texto: "Marinas/Cítricas.",
    color: "#66cccc",
    descripcion: "Fragancias frescas inspiradas en el mar, ideales para días cálidos.",
    imagen: "./img/familias/acuatica.jpeg"
  },
  frutal: {
    texto: "Frutales/Florales.",
    color: "#ff6699",
    descripcion: "Notas jugosas y dulces como frutas del trópico y flores exóticas.",
    imagen: "./img/familias/frutal.jpg"
  },
  madera: {
    texto: "Amaderadas/Especiadas.",
    color: "#cc9966",
    descripcion: "Aromas cálidos y terrosos, elegantes y envolventes.",
    imagen: "./img/familias/madera.jpeg"
  },
  ambarada: {
    texto: "Gourmand/Ambaradas.",
    color: "#9966cc",
    descripcion: "Esencias dulces, profundas y sensuales como la vainilla y el ámbar.",
    imagen: "./img/familias/ambarada.jpeg"
  }
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
    // 🔊 Reproducir sonido al finalizar animación
    const sonido = document.getElementById("magicSound");
    if (sonido) sonido.play();
  }
}

botonesClima.forEach(btn => {
  btn.addEventListener("click", async () => {
    const tipo = btn.dataset.fragancia;
    const familia = familias[tipo];
    tipoSeleccionado = tipo;
    if (!familia) return;

    resultadoTexto.textContent = "";
    resultadoFamilia.classList.remove("hidden");
    pregunta2.classList.add("hidden");
    resultadoTexto.setAttribute("data-tipo", tipo);

    // Texto animado mágico
    familia.texto.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.animation = "magic-fade 0.6s ease forwards";
      span.style.animationDelay = `${i * 0.05}s`;
      resultadoTexto.appendChild(span);
    });

    // Llenar frasco paso a paso
    await animarLlenado(familia.color);

    // Agregar clase mágica al SVG
    const svg = svgContainer.querySelector("svg");
    svg.classList.add("activated");
    svg.style.color = familia.color;

 

    // Agregar estrellas mágicas
    for (let i = 0; i < 10; i++) {
      
      const estrella = document.createElement("span");
      estrella.classList.add("estrella");
      estrella.style.left = `${Math.random() * 80 + 10}%`;
      estrella.style.bottom = `${Math.random() * 40 + 10}px`;
      estrella.style.animationDelay = `${Math.random() * 2}s`;
      svgContainer.appendChild(estrella);
      
      
      // Eliminarla después de animarse
      setTimeout(() => estrella.remove(), 8000);
    }
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
