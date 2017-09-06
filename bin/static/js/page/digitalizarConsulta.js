//variables de los Bootbox
var loading;
var nomPath;
var nomPe;
// ########################################################################################################################################################
// init Docunemt ready
// ########################################################################################################################################################
$(document).ready(function() {
    // ========================================================================================================================================================
    // Obtener contexto
    // ========================================================================================================================================================
    nomPath = window.location.pathname;
    nomPath = nomPath.substring(1, nomPath.length);
    nomPath = nomPath.split("/", 1);
    nomPath = nomPath + "/";
    // ========================================================================================================================================================
    // inciar los mensajes de BOOTBOX y base de datos de los catalogos
    // ========================================================================================================================================================
    iniciaBootbox();
    
    // ========================================================================================================================================================
    // funcion de clic en boton de digitalizar documento
    // ========================================================================================================================================================
    $('#addDoc').on('click', function () {
        var tipo_doc = $("#tipo_documento").val();
        if (tipo_doc.length != 0) {
            loading.modal('show');
            var obj = {
                BSFOPERADOR: bsfOperador,
                tipoDoc: tipo_doc,
                idInternoPe: idPersona,
                descDoc: $("#tipo_documento option:selected").text(),
                alta: "0",
                nombre: nomPe
            };
            console.log("ID enviado: " + idPersona);
            $.ajax({
                type: "POST",
                url: window.location.protocol + "//" + window.location.host +
                "/"+nomPath+"encriptar",
                data: obj,
                beforeSend: function () {
                    $("#prev1").addClass('hidden');
                    // $("#labelBreadcumReturn").html("Digitalizaci&oacute;n de
		    // Documentos");
                },
                success: OnSuccess,
                failure: function (response) {
                    bootbox.alert("fallo: " + response.encriptado);
                }
            });

            function OnSuccess(response) {
                //document.getElementById('ifrmModalDigitaContainerRet').style.display = 'block';
// document.getElementById('fadeRet').style.display = 'block';
// alert("entrando a digitalizar");
					$("#documentos1").addClass('hidden');
					$("#ifrmModalDigitaContainerRet").removeClass('hidden')
					loading.modal('hide');
                $('#TRANSPORT').val(response.encriptado);
                $("#lblTitulo").html("Digitalizaci&oacute;n de Documentos");
                $('#formDigita').submit();
                
            }
        } else {
            loading.modal('hide');
            bootbox.alert("SELECCIONE UN TIPO DE DOCUMENTO");
            return false;
        }
    });
    $("#returFicha").click(function (){
	$("#bsfOperadorFicha").val(bsfOperadorDTO);
	$("#formFicha").submit();
    });
});

// ########################################################################################################################################################
// FIN Docunemt ready
// ########################################################################################################################################################
function iniciaBootbox() {
    var msg = '<div class="ui-dialog-content ui-widget-content"style="text-align: center">' + '<div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar">'
	    + '<div class="progress-shadow">' + '</div></div></div></div><br/>' + '<label class="ui-widget ui-state-default ui-corner-all">Cargando su Peticion</label></div>';
    loading = bootbox.dialog({
	message : msg,
	closeButton : false,
	show : false
    }).css({
	'top' : '50%',
	'margin-top' : function() {
	    return -(($(this).height() / 2));
	}
    });
    // dialog.modal('hide'); show
}
