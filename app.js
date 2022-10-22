
function calculateBill()
{
  const costValue = document.querySelector(".costEntry");
  return costValue.value * 1.75;
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

document.addEventListener("DOMContentLoaded", ()=> {

  const calculateInput = document.querySelector(".costEntry");
  const calculateButton = document.querySelector(".costButton");

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

