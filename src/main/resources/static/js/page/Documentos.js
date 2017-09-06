//variables de los Bootbox

var loading;
var nomPath;
var idPersona;
var bsfOperador;
var bsfOperadorDTO;
var listDocumentos;
// variables para negociar condiciones

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
    // Guardar bsfOperador en el local storage
    // ========================================================================================================================================================
    var pathFinal = window.location.pathname;
    pathFinal = pathFinal.split("/")[2];
    console.log(pathFinal);
    console.log(listDocumentos);
    if(pathFinal === "documentos"){
	localStorage.setItem("bsfOperadorActualizarPM", bsfOperador);
    }
    // ========================================================================================================================================================
    // inciar los mensajes de BOOTBOX y base de datos de los catalogos
    // ========================================================================================================================================================
    iniciaBootbox();
    // *************************
    // AGREGAR FUNCIONALIDAD A LA LISTA DE DOCUMENTOS DEL CLIENTE
    // *************************
    /*
    $('#tblListDocs').on('click', 'tr', function () {
        if (!$(this).hasClass('Encabezado')) {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $('#tblListDocs tbody tr.selected').removeClass('selected');
                $(this).addClass('selected');
                // console.log($('tr', $(this).closest("table")).index(this)-1);
                // console.log(listDocumentos[$('tr',
		// $(this).closest("table")).index(this)-1].id_documento);

                getDocumentoPersonaByID(listDocumentos[$('tr', $(this).closest("table")).index(this) - 1].id_documento);
            }
        }
    });
    */
    // acciones para los botones de atras y salir
    $("#breadcum").click(function() {
	window.history.go(-1);
    });
    $(".btnMenuGlobal").click(function() {
	parent.irMenuGloblaPerderAvance();
    });
    $(".btnMenuDinamico").click(function() {
	parent.regresarMenuFrecuente();
    });
    startDB();
    redimencionar();
});

// ########################################################################################################################################################
// FIN Docunemt ready
// ########################################################################################################################################################
// ========================================================================================================================================================
// Inicia el acceso a la DB de los catalogos
// ========================================================================================================================================================
function redimencionar() {
	setTimeout(function() {
	    parent.setFrame();
	}, 1500);
}
function startDB() {
 try {
     dataBase = indexedDB.open('bansefi', 1);
     dataBase.onsuccess = function (e) {
         CargaCombo("", "tipo_documento", "catalogo_tipo_documento_pm");
     };
     dataBase.onerror = function (e) {
         console.log('Error al acceder a la Base de datos.');
     };
 } catch (err) {
     console.log("Ocurri&#243; un error: startDB: " + err.message);
 }
}
// ========================================================================================================================================================
// Carga los selected de la vista
// ========================================================================================================================================================
function CargaCombo(idCombo, idSelected, nomCatalago) {
 try {
     var active = dataBase.result;
     var data = active.transaction([nomCatalago], "readonly");
     var object = data.objectStore(nomCatalago);
     var elements = [];
     object.openCursor().onsuccess = function (e) {
         var result = e.target.result;
         if (result === null) {
             return;
         }
         elements.push(result.value);
         result.continue();
     };
     data.oncomplete = function () {
         for (var key in elements) {
                 if (idCombo == elements[key].identificador)
                     $('#' + idSelected).append('<option value="' + elements[key].identificador + '" selected>' + elements[key].descripcion + '</option>');
                 else
                     $('#' + idSelected).append('<option value="' + elements[key].identificador + '">' + elements[key].descripcion + '</option>');
         }
// $("#" + idSelected).selectpicker({
// liveSearch: true,
// maxOptions: 1
// });
     };
 } catch (err) {
     console.log("Ocurri&#243; un error: loadAll: " + err.message);
 }
}
// ========================================================================================================================================================
// Pedir el documento al servidor y mostrarlo en un visor
// ========================================================================================================================================================
function getDocumentoPersonaByID(id) {
 var idDoc = id;
 $.ajax({
     type: 'POST',
     data: idDoc,
     url: window.location.protocol + "//" + window.location.host + "/"+nomPath+"getDocumentByID",
     beforeSend: function () {
         loading.modal('show');
     },
     success: function (data) {
         loading.modal('hide');

         // console.log(data);
         var msg1 = '<div style="height: 100% !important"> <object type="application/pdf" width="100%" height="100%"  data="';
         var msg2 = '"/> </object> </div>';
         var tmppath;
         var msg;
         fetch(data).then(res => res.blob()).then(blob => (
             tmppath = URL.createObjectURL(blob),
                 msg = msg1 + tmppath + msg2,
                 bootbox.alert({
                     size: "large",
                     message: msg,
                     className: "alertDoc"
                 })
         )
         )
     },
     error: function (e) {
         console.log("Error " + e)
         loading.modal('hide');

         bootbox.alert({
             // size : "small",
             message: '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath
             + 'img/messages-g.png" /></p>' + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><center><label>¡Atención!</label><br/>'
             + '<label>Ocurrio un error, intente de nuevo.</label></center>',
         });
     }
 });
}
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
function confirm(msj){
    var confirmacion = bootbox.confirm(
		{
		    // size : "small",
		    message : '<p style="overflow: hidden; float: left; margin-left: 5%;" class="">' + '<img style="margin: -220px 0px -260px 0px;" src="/' + nomPath
			    + 'img/messages-g.png" /></p>' + '<center><label>&iexcl;Atención!</label><br/>'
			    + '<label>'+msj+'</label></center>',
		    buttons : {
			confirm : {
			    label : 'Actualizar Persona Moral'
			// className : 'btn-success'
			},
			cancel : {
			    label : 'Cancelar'
			// className : 'btn-danger'
			}
		    },
		    callback : function(result) {
			if (result) {
			    loading.modal('show');
			    // tomar el bsfOperador del localStorage
			    //console.log(localStorage.getItem("bsfOperadorActualizarPM"));
			    var bsfOperador2 = localStorage.getItem("bsfOperadorActualizarPM");
			    if(bsfOperador2 != null){
				localStorage.removeItem("bsfOperadorActualizarPM");
                    $("#BSFOPERADOR").val(bsfOperador);
				    $("#idIntPM").val(idPersona);
                    $("#titulo").val(titulo);
                    $("#identificacionPM").val(identificacionPM);



				$("#formActualizarPM").submit();
			    }else{
				loading.modal('hide');
				bootbox.alert({
			             // size : "small",
			             message: '<p style="overflow: hidden; float: left; margin-left: 2%; margin-top:1%" class="">' + '<img style="margin: -390px 0px -90px 0px;" src="/' + nomPath
			             + 'img/messages-g.png" /></p>' + '<center><label>&iexcl;Atención!</label><br/>'
			             + '<label>Ocurrio un error, puede buscar a la persona con su ID para actualizar datos.</label><br/>'+
			             '<label> ID: '+idPersona+'</label></center>',
			         });
			    }
			} else {
			    confirmacion.modal('hide');
			}
		    }
		}).css({
	    'top' : '50%',
	    'margin-top' : function() {
		return -(($(this).height() / 2));
	    }
	});
}
function bajaDocumento (obj) {
    var rowID = $(obj).attr('id');
    var valores = new Array();
    i=0;
    $(obj).parents("tr").find("td").each(function(){
        valores[i] =$(this).html();
        i++;
    });
    var reqBajaDocumento = {
        idInternoPe: idPersona,
        idInternoDoc: rowID,
        entidad: $("#entidad").val(),
        codigoDocumento: valores[0],
        terminal:$("#terminal").val(),
        bsfOperador: bsfOperadorDTO
    }
    $.ajax({
        type: 'POST',
        data: reqBajaDocumento,
        url: window.location.protocol + "//" + window.location.host + "/"+nomPath+"borrarDocumento",
        beforeSend: function () {
            var msg = '<div class="ui-dialog-content ui-widget-content"style="text-align: center">'
                + '<div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar">' + '<div class="progress-shadow">' + '</div></div></div></div><br/>'
                + '<label class="ui-widget ui-state-default ui-corner-all">Realizando su petición</label></div>';
            loading = bootbox.dialog({
                message: msg,
                closeButton: false
            }).css({
                'top': '50%',
                'margin-top': function () {
                    return -(($(this).height() / 2));
                }
            });
        },
        success: function (data) {
            loading.modal('hide');
            console.log(data);
            if(data==="OK"){
                bootbox.alert({
                    // size : "small",
                    message: '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath
                    + 'img/messages-g.png" /></p>' + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><center><label>¡Atención!</label><br/>'
                    + '<label>Baja de documento realizada.</label></center>',
                });
                $(obj).parents("tr").remove();
            }else{
                bootbox.alert({
                    // size : "small",
                    message: '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath
                    + 'img/messages-g.png" /></p>' + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><center><label>¡Atención!</label><br/>'
                    + '<label>Ocurrio un error, intente de nuevo:  '+data+'</label></center>',
                });
            }
        },
        error: function (e) {
            console.log("Error " + e)
            loading.modal('hide');

            bootbox.alert({
                // size : "small",
                message: '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath
                + 'img/messages-g.png" /></p>' + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><center><label>¡Atención!</label><br/>'
                + '<label>Ocurrio un error, intente de nuevo.</label></center>',
            });
        }
    });
}
function muestraDoc (obj) {

    var rowID = $(obj).attr('id');
    //console.log(rowID);
    getDocumentoPersonaByID(rowID);
}


function imprimir(){
    getDocCedulaTestID(this.idPersona);
}
function getDocCedulaTestID(cliente)
{
    nomPath = window.location.pathname;
    nomPath = nomPath.substring(1, nomPath.length);
    nomPath = nomPath.split("/", 1);
    nomPath = nomPath + "/";


    var ConsultaFichaDTO={
        "IdInternoPe": cliente,
        "BsfOper":bsfOperador,
        "txtTipo":txtTipoCedula
    }
    var StrUrl = window.location.protocol + "//" + window.location.host + "/"+nomPath+"getDocumentCedulaTest";
    var idDoc = cliente;
    $.ajax({
        type: 'POST',
        data: ConsultaFichaDTO,
        url: StrUrl,
        beforeSend: function () {
            var msg = '<div class="ui-dialog-content ui-widget-content"style="text-align: center">'
                + '<div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar">' + '<div class="progress-shadow">' + '</div></div></div></div><br/>'
                + '<label class="ui-widget ui-state-default ui-corner-all">Cargando su peticion</label></div>';
            loading = bootbox.dialog({
                message: msg,
                closeButton: false
            }).css({
                'top': '50%',
                'margin-top': function () {
                    return -(($(this).height() / 2));
                }
            });
        },
        success: function (data) {
            loading.modal('hide');
            bootbox.alert({
                size: "large",
                message: '<iframe src="data:application/pdf;base64,' + data + '" style="width:100%;height:100%" seamless=""></iframe>',
                className: "alertDoc"
            });

        },
        error: function (e) {
            loading.modal('hide');
            console.log("Error " + e)
//	         loading.modal('hide');

            bootbox.alert({
                // size : "small",
                message: '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath
                + 'img/messages-g.png" /></p>' + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><center><label>¡Atención!</label><br/>'
                + '<label>Ocurrio un error, intente de nuevo.</label></center>',
            });
        }
    });
}
