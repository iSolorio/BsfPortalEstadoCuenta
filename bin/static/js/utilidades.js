/**
 * Funcion que se encarga que validar que se ha pulsado un numero Se utiliza
 * para aquellos inputText en los que solo se permita introducir numeros
 * 
 * @param e
 * @returns
 */
function justNumbers(e) {
	var keynum = window.event ? window.event.keyCode : e.which;
	if ((keynum == 8) || (keynum == 46))
		return true;

	return /\d/.test(String.fromCharCode(keynum));
}

/**
 * Funcion para imprimir un area/contenedor en especifico
 * 
 * @param id,
 *            el id del componente a imprimir
 */
function printContenedorCamposId(id) {
	console.log("Impriendo contenedor: #" + id);
	var printContents = document.getElementById(id);
	if (printContents != null && printContents != undefined) {
		var href = document.styleSheets[0].href;
		href = href.substring(0, href.lastIndexOf("/") + 1)
				+ "css/impresion.css";
		var toPrint = document.getElementById(id);

        var popupWin = window.open();
        popupWin.document.open();
        popupWin.document.write('<html><title>::Preview::</title><link rel="stylesheet" type="text/css" href="'+href+'" /></head><body onload="window.print();window.close();">')
        popupWin.document.write(toPrint.innerHTML);
        popupWin.document.write('</html>');
        popupWin.document.close();
	}
}

/**
 * Funcion que realiza una animación de mover el scroll hacia una posición
 * específica del dom
 * 
 * @param id
 */
function scrollTo(id) {
	try {
		$('body').animate({
			scrollTop : $(id).offset().top
		}, 1000);
	} catch (e) {
		console.warn("No fue posible encontrar el id indicado para mover el scroll: " +  id);
		console.error(e);
	}
}

/**
 * Funcion que se ejecuta cuando una busqueda generica tiene mas de 10 columnas.
 * Para el caso particular de busqueda de apuntes manuales
 */
function ocultarColumnasBusqueda() {
	try {
		for (var i = 10; i < 15; i++) {
			$(".ui-chkbox-box")[i].click();
		}
	} catch (e) {
		console.log("No hay checks disponibles a deshabilitar");
	}
}
