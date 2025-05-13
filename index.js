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