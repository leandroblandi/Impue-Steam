
function calculateBill()
{
  const costValue = document.querySelector(".costEntry");

  return costValue.value.replace(/,/g) * 1.75;
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
  containerToShow.innerText = "Te costará ARS$" + parseFloat(cost);
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
});

