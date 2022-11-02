
function calculateBill()
{
  const costValue = document.querySelector(".costEntry");
  let newCostValue = costValue.value.replace(/,/g, '.');
  return newCostValue * 1.75;
}

function showBill()
{
  const containerToShow = document.querySelector(".costResult");
  const cost = calculateBill();

  if(cost < 0)
  {
    swal("Error :(", "No hay precios negativos, fijate bien", "error");
    return;
  }

  if(cost === 0) {
    swal("Error :(", "Al menos tenés que ingresar un precio", "error");
    return;
  }

  if(isNaN(cost))
  {
    swal("Cuidado :O", "Al parecer no ingresaste un precio válido para la App", "warning");
    return;
  }

  if((cost > 0) && (cost < 500)) {
    let cheaperEmoji = document.createElement("img");
    cheaperEmoji.src = "./static/blushed_smile.png";
    cheaperEmoji.width = 24;
    cheaperEmoji.height = 24;

    containerToShow.innerHTML = "Te costará ARS<span class='cost cheaper'>&nbsp;$" + parseFloat(cost) + "<a href='#estimatedCostMessage'>(*)</a></span>";
    containerToShow.appendChild(cheaperEmoji);
  }

  else if((cost >= 500) && (cost < 2000)) {
    let mediumCostEmoji = document.createElement("img");
    mediumCostEmoji.src = "./static/smile.png";
    mediumCostEmoji.width = 24;
    mediumCostEmoji.height = 24;

    containerToShow.innerHTML = "Te costará ARS<span class='cost mediumCost'>&nbsp;$" + parseFloat(cost) + "<a href='#estimatedCostMessage'>(*)</a></span>";
    containerToShow.appendChild(mediumCostEmoji);
  }

  else if((cost >= 2000)) {
    let expensiveEmoji = document.createElement("img");
    expensiveEmoji.src = "./static/tearing_smile.png";
    expensiveEmoji.width = 24;
    expensiveEmoji.height = 24;

    containerToShow.innerHTML = "Te costará ARS<span class='cost expensive'>&nbsp;$" + parseFloat(cost) + "<a class='estimatedCostAterisk' href='#estimatedCostMessage'>(*)</a></span>";
    containerToShow.appendChild(expensiveEmoji);
  }

  // Mostramos el valor si ninguna condicion es prevista
  
   
}

function help() {
  return swal({
    title: "¡Hola! ¿Necesitás ayuda?",
    html: "Esta app es súper sencilla de utilizar. Primero que nada:<br><span class='separator'></span><div class='steps'><b>1.</b> Te dirigís a la página de Steam y mirás el precio del juego que desees comprar<br></div><div class='steps'><b>2.</b> Escribís el precio que viste en la entrada de esta página<br></div><div class='steps'><b>3.</b> Presionás en 'Calcular'</div><span class='separator'></span>¡Y listo! Ya te devuelve el precio final que estarías pagando",
    confirmButtonText: "Adelante",
    type: "info",
    customClass: "helpAlert"
  });
}

document.addEventListener("DOMContentLoaded", ()=> {

  const calculateInput = document.querySelector(".costEntry");
  const calculateButton = document.querySelector(".costButton");
  const helpButton = document.querySelector(".help__button");
  const estimatedCostAterisk = document.querySelector(".estimatedCostAterisk");
  const estimatedCostMessage = document.getElementById("estimatedCostMessage");


  helpButton.addEventListener("click", (e)=> {
    e.preventDefault();
    help();
  });

  calculateInput.addEventListener("keydown", (event)=> {

    if(event.keyCode === 13) { // Si presiona Enter
      event.preventDefault();
      showBill();
    }
  });

  calculateButton.addEventListener("click", (event)=> {

    event.preventDefault();
    showBill();
  });

  estimatedCostAterisk.addEventListener("click", (event)=> {
    
    e.preventDefault();

    estimatedCostMessage.focus();

  })
});

