function calculateTax() {
  const taxAmount = 2;
  const costValue = document.querySelector(".costEntry");
  let newCostValue = costValue.value.replace(/,/g, ".");

  return newCostValue * taxAmount;
}

function showTax() {
  const containerToShow = document.querySelector(".costResult");
  const cost = calculateTax();

  if (cost < 0 || isNaN(cost)) {
    swal(
      "Error :(",
      "Al parecer no ingresaste un precio válido para la App",
      "error"
    );
    return;
  }

  if (cost === 0) {
    swal("Error :(", "Al menos tenés que ingresar un precio", "error");
    return;
  }

  return;
}

if (cost > 0 && cost < 500) {
  let cheaperEmoji = document.createElement("img");

  cheaperEmoji.src = "./static/blushed_smile.png";
  cheaperEmoji.width = 24;
  cheaperEmoji.height = 24;

  containerToShow.innerHTML =
    "Te costará ARS<span class='cost cheaper'>&nbsp;$" +
    parseFloat(cost).toFixed(2);
  containerToShow.appendChild(cheaperEmoji);
} else if (cost >= 500 && cost < 2000) {
  let mediumCostEmoji = document.createElement("img");

  mediumCostEmoji.src = "./static/smile.png";
  mediumCostEmoji.width = 24;
  mediumCostEmoji.height = 24;

  containerToShow.innerHTML =
    "Te costará ARS<span class='cost mediumCost'>&nbsp;$" +
    parseFloat(cost).toFixed(2);
  containerToShow.appendChild(mediumCostEmoji);
} else if (cost >= 2000) {
  let expensiveEmoji = document.createElement("img");

  expensiveEmoji.src = "./static/tearing_smile.png";
  expensiveEmoji.width = 24;
  expensiveEmoji.height = 24;

  containerToShow.innerHTML =
    "Te costará ARS<span class='cost expensive'>&nbsp;$" +
    parseFloat(cost).toFixed(2);
  containerToShow.appendChild(expensiveEmoji);
}

// Mostramos el valor si ninguna condicion es prevista

function help() {
  return swal({
    title: "¡Hola! ¿Necesitás ayuda?",
    html: "Esta app es súper sencilla de utilizar. Primero que nada:<br><span class='separator'></span><div class='steps'><b>1.</b> Te dirigís a la página de Steam y mirás el precio del juego que desees comprar<br></div><div class='steps'><b>2.</b> Escribís el precio que viste en la entrada de esta página<br></div><div class='steps'><b>3.</b> Presionás en 'Calcular'</div><span class='separator'></span>¡Y listo! Ya te devuelve el precio final que estarías pagando",
    confirmButtonText: "Adelante",
    type: "info",
    customClass: "helpAlert",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const calculateInput = document.querySelector(".costEntry");
  const calculateButton = document.querySelector(".costButton");
  const helpButton = document.querySelector(".help__button");

  helpButton.addEventListener("click", (e) => {
    e.preventDefault();
    help();
  });

  calculateInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      // Si presiona Enter
      event.preventDefault();
      showTax();
    }
  });

  calculateButton.addEventListener("click", (event) => {
    event.preventDefault();
    showTax();
  });
});
