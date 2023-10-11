/**
 * La cantidad actual en steam al día de la fecha
 * 10/10/2023 es de:
 * 45% + 25% + 30% = 100%
 * Por ende, se calcula dos veces el precio
 */
document.addEventListener("DOMContentLoaded", () => {
  const taxAmount = 2;
  const taxCalculator = new TaxCalculator(taxAmount);

  const costInput = document.querySelector(".costEntry");
  const calculateButton = document.querySelector(".costButton");
  const helpButton = document.querySelector(".help__button");
  const copyButton = document.querySelector("p.copy-alias");

  helpButton.addEventListener("click", (e) => {
    e.preventDefault();
    taxCalculator.tool.help();
  });

  costInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      // Si presiona Enter
      e.preventDefault();
      taxCalculator.showTax();
    }
  });

  calculateButton.addEventListener("click", (e) => {
    e.preventDefault();
    taxCalculator.showTax();
  });

  copyButton.addEventListener("click", (e) => {
    e.preventDefault();
    taxCalculator.tool.copyAliasToClipboard();
  });
});

/**
 * Clase encargada de calcular y mostrar el precio final con el valor agregado.
 */
class TaxCalculator {
  constructor(taxAmount) {
    this.tool = new Tool();
    this.taxAmount = taxAmount;
  }

  /**
   * Calcula el impuesto en base al atributo this.taxAmount (asignado en el constructor)
   * @returns El valor final del producto con impuestos incluidos
   */
  calculateTax() {
    const inputValueWithoutComma = document
      .querySelector(".costEntry")
      .value.replace(/,/g, ".");
    return inputValueWithoutComma * this.taxAmount;
  }

  /**
   * Valida que el precio sea valido, crea la imagen del emoji en base al precio,
   * Y luego inserta el precio y la imagen para que el usuario pueda verla
   * @returns Solo retorna false en caso de que el precio cumpla con las condiciones de validez
   */
  showTax() {
    const taxContainer = document.querySelector(".costResult");
    const finalCost = this.calculateTax();

    if (finalCost === 0) {
      swal("Error", "Debes ingresar un precio. Ejemplo: 1000");
      return false;
    }

    if (finalCost < 0 || isNaN(finalCost)) {
      swal(
        "Error",
        "El precio ingresado es inválido. Tip: No uses el símbolo '$' ni ingreses números negativos o letras"
      );
      return false;
    }

    const img = this.tool.createEmojiImage(finalCost);
    const costClass = this.tool.getCostClassByNumericCost(finalCost);

    taxContainer.innerHTML = `Precio&nbsp;final: ARS<span class='cost ${costClass}'>&nbsp;$${parseFloat(
      finalCost
    ).toFixed(2)}`;
    taxContainer.appendChild(img);
  }
}

/**
 * Clase encargada de realizar algunas funciones extras auxiliares
 * No relacionadas con el calculo de impuestos
 */
class Tool {
  /**
   * Se encarga de evaluar el precio y devolver un adjetivo util que sera utilizado para una clase
   * @param {number} finalCost
   * @returns {string} El string del precio para ser insertado en un atributo class
   */
  getCostClassByNumericCost(finalCost) {
    let costClass = "";
    if (finalCost < 500) {
      costClass = "cheaper";
    } else if (finalCost < 2000) {
      costClass = "mediumCost";
    } else {
      costClass = "expensive";
    }
    return costClass;
  }

  /**
   * Segun que tan caro sea el producto, crea un HTMLImageElement
   * En base a ese precio (emoji apple)
   * @param {number} finalCost
   * @returns {HTMLImageElement} Un emoji en <img> segun que tan caro sea el precio
   */
  createEmojiImage(finalCost) {
    const emoji = document.createElement("img");
    emoji.width = 24;
    emoji.height = 24;

    if (finalCost < 500) {
      emoji.src = "./static/blushed_smile.png";
    } else if (finalCost < 2000) {
      emoji.src = "./static/smile.png";
    } else {
      emoji.src = "./static/tearing_smile.png";
    }
    return emoji;
  }

  /**
   * Copia al portapapeles el alias de MP
   * @returns {boolean} true si se copió correctamente, false si no
   */
  copyAliasToClipboard() {
    const alias = document.querySelector("span.alias-mp");

    const range = document.createRange();
    range.selectNode(alias);

    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
      document.execCommand("copy");
      swal("Exitoso", "Se copió el alias correctamente al portapapeles");
      return true;
    } catch (error) {
      swal(
        "Error",
        "Hubo un problema al intentar copiar al portapapeles. Tip: podés seleccionar el texto del alias y copiarlo manualmente"
      );
      return false;
    }
  }

  /**
   * @returns Un swal alert con una ayuda rapida sobre como utilizar la app
   */
  help() {
    return swal({
      title: "¡Hola! ¿Necesitás ayuda?",
      html: "Esta app es súper sencilla de utilizar. Primero que nada:<br><span class='separator'></span><div class='steps'><b>1.</b> Te dirigís a la página de Steam y mirás el precio del juego que desees comprar<br></div><div class='steps'><b>2.</b> Escribís el precio que viste en la entrada de esta página<br></div><div class='steps'><b>3.</b> Presionás en 'Calcular'</div><span class='separator'></span>¡Y listo! Ya te devuelve el precio final que estarías pagando",
      confirmButtonText: "Adelante",
      type: "info",
      customClass: "helpAlert",
    });
  }
}
