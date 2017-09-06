/**
 * 
 */

$(document).ready(
	function() {
	    // Initialize tooltips
	    $('.nav-tabs > li a[title]').tooltip();

	    // Wizard
	    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

		var $target = $(e.target);

		if ($target.parent().hasClass('disabled')) {
		    return false;
		}
	    });

	    $(".next-step").click(
		    function(e) {
			var $active = $('.wizard .nav-tabs li.active');
			if (next) {
			    var pagina = this.id;
			    pagina = pagina.substr(pagina.length - 1, pagina.length);
			    $active.next().removeClass('disabled');
			    nextTab($active);
			    if (pagina === "1") {
				$("#NUM_DEPOSITOS").change();
				verificaClicNext1();
			    }
			    if (pagina === "2") {
				ValidarCampos();
			    }
			} else {
			    bootbox.alert({
				// size : "small",
				message : '<p style="overflow: hidden; float: left;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath + 'img/messages-g.png" /></p>'
					+ '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;¡Atención! </p>' + '<center><label>Completar los campos obligatorios para continuar</label></center>'
			    });
			}
		    });
	    $(".prev-step").click(function(e) {

		var $active = $('.wizard .nav-tabs li.active');
		prevTab($active);
		var pagina = this.id;
		pagina = pagina.substr(pagina.length - 1, pagina.length);
		if (pagina === "2") {
		    ValidarCampos();
		}
		if (pagina === "3") {

		}
	    });
	    $("#showHideDP").click(function() {
		$("#datosPersonales").toggle("slow");
	    });
	    $("#showHideDomicilio").click(function() {
		$("#domicilio").toggle("slow");
	    });
	    $("#showHideOtrosDatos").click(function() {
		$("#otrosDatos").toggle("slow");
	    });

	});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}