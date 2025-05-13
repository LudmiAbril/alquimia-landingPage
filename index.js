/*funcion para frase H1 dinámica*/
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
    const palabrasActuales = animatedText.querySelectorAll("span");
    palabrasActuales.forEach((span, i) => {
      span.classList.remove("fade-in");
      span.classList.add("fade-out");
      span.style.animationDelay = `${i * 0.1}s`;
    });
  }

  mostrarFrase(frases[index]);

  setInterval(() => {
    ocultarFrase();

    setTimeout(() => {
      index = (index + 1) % frases.length;
      mostrarFrase(frases[index]);
    }, 1000); 
  }, 10000); // cada 10 segundos cambia


  /*test*/
  const botonesClima = document.querySelectorAll(".opciones button");
  const resultadoTexto = document.querySelector(".texto-resultado");
  const resultadoFamilia = document.getElementById("resultadoFamilia");
  const pregunta2 = document.getElementById("pregunta2");
  const svgContainer = document.querySelector(".pocima-container");
  const reiniciarBtn = document.getElementById("btnReiniciar");
  
  // Familia -> color y texto
  const familias = {
    acuatica: {
      texto: "Tu familia olfativa es: Acuáticos/Verdes.",
      color: "#66cccc"
    },
    frutal: {
      texto: "Tu familia olfativa es: Frutales/Florales exóticas.",
      color: "#ff6699"
    },
    madera: {
      texto: "Tu familia olfativa es: Maderas/Especias.",
      color: "#cc9966"
    },
    ambarada: {
      texto: "Tu familia olfativa es: Gourmand/Ambarados.",
      color: "#9966cc"
    }
  };
  
  // Carga SVG inline
  async function cargarSVGInline(url) {
    const response = await fetch(url);
    const svgText = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgText, "image/svg+xml");
    const svg = doc.querySelector("svg");
  
    // Asegurar tamaño fijo por código
    svg.setAttribute("width", "250");
    svg.setAttribute("height", "250");
  
    svgContainer.innerHTML = ""; // Limpiar anterior
    svgContainer.appendChild(svg);
  }
  
  
  botonesClima.forEach(btn => {
    btn.addEventListener("click", async () => {
      const tipo = btn.dataset.fragancia;
      const familia = familias[tipo];
      if (familia) {
        resultadoTexto.textContent = familia.texto;
        resultadoFamilia.classList.remove("hidden");
        pregunta2.classList.add("hidden");
  
        // Cargar el SVG correcto
        await cargarSVGInline(`./img/potion/potion04.svg`);
  
        // Cambiar el color del líquido por clase "relleno"
        const relleno = svgContainer.querySelector(".relleno");
        if (relleno) {
          relleno.setAttribute("fill", familia.color);
        }
      }
    });
  });
  
  // Reiniciar prueba
  reiniciarBtn.addEventListener("click", () => {
    resultadoFamilia.classList.add("hidden");
    pregunta2.classList.remove("hidden");
    resultadoTexto.textContent = "";
    cargarSVGInline(`./img/potion/potion00.svg`);
  });
  
  
