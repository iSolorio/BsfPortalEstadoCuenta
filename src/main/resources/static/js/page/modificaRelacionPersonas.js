
var listaAgregados=[];//Arreglo para guardar los datos de las relaciones agregadas.
var indexAgregados=1;//Variable utilizada como indice de los registros agregados.
var listaBorrados=[];
var listaModificados=[];
var listaModificadosInput=[];
var urlApplication = window.location.protocol + "//" + window.location.host;
var context = window.location.target;
var dataBase = null;

/*
 Funci�n para abrir la base de datos.
 */
function startDB() {
    try {
        mostrarBarraProgreso();
        dataBase = indexedDB.open('bansefi', 1);

        dataBase.onsuccess = function (e) {
            console.log('Base de datos accedida.');
            ocultarBarraProgreso();
        };
        dataBase.onerror = function (e) {
            console.log('Error al acceder a la Base de datos.');
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: startDB: " + err.message);
    }
}

function validarCampos() {
    var validacion = true;
    $(".requerido").each(function() {
        if($(this).val() === "") {
            if ($(this).parent().is(":visible")) {
                validacion = false;
                $(this).parent().addClass('has-error');
            }
        } else {
            $(this).parent().removeClass('has-error');
        }
    });
    return validacion;
}

function establecerValidacionRFCFisica() {
    $(".RFCFisica").inputmask(
        'Regex', {
            regex: "^[a-zA-Z]{4}[0-9]{6}[0-9a-zA-Z]{3}$",
            "onincomplete": function () {
                bootbox.alert({
                    message: '<p style="overflow: hidden; float: left;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="./img/messages-g.png" /></p>'
                    + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#161;Atenci&oacute;n&#33; </p>' + '<center><label>Formato del RFC no valido' + '</label></center>',
                    callback: function () {
                        setTimeout(function () {
                            this.focus();
                        }, 100);
                    }
                });
            }
        }
    );
}

/*
 * Busqueda de persona fisica.
 */
function buscarPersonaCriterios(numContenedor) {
    if (typeof(Storage) !== "undefined") {
        var htmlCompleto = $("#principal").html();
        mostrarBarraProgreso();
        // Se agregan a localStorage las variables que se ocuparan regresando de criterios de busqueda.
        localStorage.setItem("html", htmlCompleto);
        localStorage.setItem("txtIdInternoPe2","txtIdInterno_"+numContenedor);
        localStorage.setItem("indexAgregados", indexAgregados);
        localStorage.setItem("listaAgregados", JSON.stringify(listaAgregados));
        localStorage.setItem("listaBorrados", JSON.stringify(listaBorrados));
        localStorage.setItem("listaModificados", JSON.stringify(listaModificados));
        localStorage.setItem("listaModificadosInput", JSON.stringify(listaModificadosInput));
        //localStorage.setItem("dataBase", dataBase);
        localStorage.setItem("idInternoPe", idInternoPe);
        localStorage.setItem("bsfOperador", bsfOperador);

        // Se invoca criterios de busqueda de personas fisicas.
        $("#formCriteriosBusqueda").submit();
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
    }
}

$(document).ready(function() {
    startDB();
    if(criteriosBusqueda === 'SI') {
        $("#principal").html(localStorage.getItem("html"));
        idInternoPe = localStorage.getItem("idInternoPe");
        bsfOperador = localStorage.getItem("bsfOperador");
        //dataBase = localStorage.getItem("dataBase");
        indexAgregados = localStorage.getItem("indexAgregados");
        listaAgregados = localStorage.getItem("listaAgregados")===""?[]:JSON.parse(localStorage.getItem("listaAgregados"));
        listaBorrados = localStorage.getItem("listaBorrados")===""?[]:JSON.parse(localStorage.getItem("listaBorrados"));
        listaModificados = localStorage.getItem("listaModificados")===""?[]:JSON.parse(localStorage.getItem("listaModificados"));
        listaModificadosInput = localStorage.getItem("listaModificadosInput")===""?[]:JSON.parse(localStorage.getItem("listaModificadosInput"));
        $("#"+localStorage.getItem("txtIdInternoPe2")).val(idInternoPe2);
        consultaDatosFisica(idInternoPe2, localStorage.getItem("txtIdInternoPe2").substring(13));
    }
});

/*
 * Buscar datos persona fisica.
 */
function consultaDatosFisica(idInterno, num) {
    var params = {
        idInternoPe: idInterno,
        bsfOperador: bsfOperador
    };
    var url = "./NombrePersonaFisica";
    $.ajax({
        type: 'POST',
        data: params,
        url: './NombrePersonaFisica',
        beforeSend: function () {
            mostrarBarraProgreso();
        },
        success: function (data) {
            bootbox.hideAll();
            $("#txtTitular_"+num).val(data.nomb_50);
        },
        error: function () {
            ocultarBarraProgreso();
            var dialog = bootbox.alert({
                message: '<p class="text-center">' + "No se encontro resultados con los criterios introducidos" + '</p>',
                closeButton: true
            });
        }
    });
}

/*
 * Modificar Existente
 */
function modificarExistente(idElement, idDatosCont, idInterno) {
    //Se realiza split para saber si es persona
    var splitIdInterno = idInterno.split('_');
    if (splitIdInterno.length == 2) { // Es persona en caso de tener longitud de 2
        idInterno = splitIdInterno[0]+splitIdInterno[1];
        loadCatalogoRelaciones("cboRelacion_"+idInterno, splitIdInterno[1]);
        var index = listaAgregados.indexOf(idElement);
        $("#" + idDatosCont + idInterno).hide();
        $("#" + idDatosCont + 'Input' + idInterno).show();
        if (index < 0) {
            listaAgregados.push(idElement);
            listaBorrados.push(idElement);
        }
        consultaDatosFisica(splitIdInterno[0], idInterno);
    } else {
        var index = listaModificados.indexOf(idElement);
        if (index < 0) {
            listaModificados.push(idElement);
            listaModificadosInput.push(idDatosCont + 'Input' + idInterno);
            $("#" + idDatosCont + idInterno).hide();
            $("#" + idDatosCont + 'Input' + idInterno).show();
        }
    }
}

/*
 * Eliminar Existente
 */
function eliminarExistente(idElement) {
    //Se realiza split para saber si es persona
    var splitIdInterno = idElement.split('_');
    if (splitIdInterno.length == 2) { // Es persona en caso de tener longitud de 2
        var index = listaAgregados.indexOf(idElement);
        $("#"+splitIdInterno[0]+splitIdInterno[1]).hide();
        if (index > -1) {
            listaAgregados.splice(index, 1);
        }
    } else {
        listaBorrados.push(idElement);
        $("#"+idElement).hide();
        var index = listaModificados.indexOf(idElement);
        if (index > -1) {
            listaModificados.splice(index, 1);
            listaModificadosInput.splice(index, 1);
        }
    }
}

/*
 * Guardar relaciones.
 */
function guardarRelaciones() {
    console.log(listaAgregados);
    console.log(listaBorrados);
    console.log(listaModificados);
    if (listaAgregados.length != 0 || listaBorrados.length != 0 || listaModificados.length != 0) {
        var validacion = validarCampos();
        if (validacion) {
            var nuevasRelaciones = generarEstructuraNuevasRelaciones();
            var relacionesEliminadas = generarEstructuraRelacionesBorradas();
            var relacionesModificadas = generarEstructuraRelacionesModificadas();
            var relaciones = {
                idInternoPe: idInternoPe,
                bsfOperador: bsfOperador,
                nuevasRelaciones: nuevasRelaciones,
                modificaRelaciones: relacionesModificadas,
                borraRelaciones: relacionesEliminadas
            };
            var jsonParams = JSON.stringify(relaciones);
            var url = "./guardaModificacionRelaciones";
            $.ajax({
                type : "POST",
                data : jsonParams,
                contentType : "application/json",
                url : url,
                cache : false,
                beforeSend: function () {
                    var dialog = bootbox.dialog({
                        message: '<div class="ui-dialog-content ui-widget-content" style="text-align: center"><div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar"><div class="progress-shadow"></div></div></div></div><br/><label class="ui-widget ui-state-default ui-corner-all">Cargando Su Peticion</label></div>',
                        closeButton: false
                    }).css({
                        'margin-top': function () {
                            var w = $(window).height();
                            var b = $(".modal-dialog").height();
                            // should not be (w-h)/2
                            var h = (w) / 2;
                            return h + "px";
                        },
                    });
                },
                success : function(data) {
                    bootbox.hideAll();

                    bootbox.dialog({
                        message: 'Cambios Aplicados'
                    });
                    console.log(data);
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                },
                done : function(e) {
                    console.log("DONE");
                }
            });
        }
    } else {
        bootbox.alert("No hay modificaciones para guardar.");
    }
}

/*
 * Generar json con relaciones borradas.
 */
function generarEstructuraRelacionesModificadas() {
    var relacionesModificadas = {
        accionistas: [],
        funcionarios: [],
        refBancarias: [],
        refComerciales:[]
    };
    for (var i = 0;i<listaModificadosInput.length;i++) {
        var tipo = $("#" + listaModificadosInput[i] + " input.tipo").val();
        var idInternoPe = $("#" + listaModificadosInput[i] + " input.idInterno").val();
        if(tipo === 'ACCIONISTA') {
            var accionista = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaModificadosInput[i] + " div.contNombre input.nombre").val().toUpperCase(),
                txtApPaterno: $("#" + listaModificadosInput[i] + " div.contAPat input.aPat").val().toUpperCase(),
                txtApMaterno: $("#" + listaModificadosInput[i] + " div.contAMat input.aMat").val().toUpperCase(),
                txtRFC: $("#" + listaModificadosInput[i] + " div.contRfc input.rfc").val().toUpperCase(),
                txtAccionariado: $("#" + listaModificadosInput[i] + " div.contAccionariado input.accionariado").val().toUpperCase()
            };
            relacionesModificadas.accionistas.push(accionista);
        } else if (tipo === 'FUNCIONARIO') {
            var funcionario = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaModificadosInput[i] + " div.contNombre input.nombre").val().toUpperCase(),
                txtApPaterno: $("#" + listaModificadosInput[i] + " div.contAPat input.aPat").val().toUpperCase(),
                txtApMaterno: $("#" + listaModificadosInput[i] + " div.contAMat input.aMat").val().toUpperCase(),
                txtRFC: $("#" + listaModificadosInput[i] + " div.contRfc input.rfc").val().toUpperCase(),
                txtPuesto: $("#" + listaModificadosInput[i] + " div.contPuesto input.puesto").val().toUpperCase()
            };
            relacionesModificadas.funcionarios.push(funcionario);
        } else if (tipo === 'REFBANCARIA') {
            var refBancaria = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaModificadosInput[i] + " div.contBanco input.banco").val().toUpperCase(),
                txtNumCuenta: $("#" + listaModificadosInput[i] + " div.contNumCuenta input.numCuenta").val().toUpperCase(),
                txtTipoCuenta: $("#" + listaModificadosInput[i] + " div.contTipoCuenta input.tipoCuenta").val().toUpperCase()
            };
            relacionesModificadas.refBancarias.push(refBancaria);
        } else if (tipo === 'REFCOMERCIAL') {
            var refComercial = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaModificadosInput[i] + " div.contNombre input.nombre").val().toUpperCase(),
                txtGiro: $("#" + listaModificadosInput[i] + " div.contGiro input.giro").val().toUpperCase(),
                txtTel: $("#" + listaModificadosInput[i] + " div.contTel input.tel").val().toUpperCase(),
                txtRelacion: $("#" + listaModificadosInput[i] + " div.contRel input.rel").val().toUpperCase()
            };
            relacionesModificadas.refComerciales.push(refComercial);
        }
    }
    return relacionesModificadas;
}

/*
 * Generar json con relaciones borradas.
 */
function generarEstructuraRelacionesBorradas() {
    var relacionesEliminadas = {
        accionistas: [],
        funcionarios: [],
        refBancarias: [],
        refComerciales:[],
        personas: []
    };
    for (var i = 0;i<listaBorrados.length;i++) {
        var element = listaBorrados[i].replace('_','');
        var tipoRelacion = $("#" + element + " input.tipo").val();
        var idInternoPe = $("#" + element + " input.idInterno").val();
        if (tipoRelacion === 'ACCIONISTA') {
            var elementoEliminado = {
                idInterno: idInternoPe,
                txtNombre: $("#" + element + " input.nombre").val().toUpperCase(),
                txtApPaterno: $("#" + element + " input.aPat").val().toUpperCase(),
                txtApMaterno: $("#" + element + " input.aMat").val().toUpperCase(),
                txtRFC: $("#" + element + " input.rfc").val().toUpperCase(),
                txtAccionariado: $("#" + element + " input.accionariado").val().toUpperCase()
            };
            relacionesEliminadas.accionistas.push(elementoEliminado);
        } else if (tipoRelacion === 'FUNCIONARIO') {
            elementoEliminado = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaBorrados[i] + " input.nombre").val().toUpperCase(),
                txtApPaterno: $("#" + listaBorrados[i] + " input.aPat").val().toUpperCase(),
                txtApMaterno: $("#" + listaBorrados[i] + " input.aMat").val().toUpperCase(),
                txtRFC: $("#" + listaBorrados[i] + " input.rfc").val().toUpperCase(),
                txtPuesto: $("#" + listaBorrados[i] + " input.puesto").val().toUpperCase()
            };
            relacionesEliminadas.funcionarios.push(elementoEliminado);
        } else if (tipoRelacion === 'REFBANCARIA') {
            elementoEliminado = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaBorrados[i] + " input.banco").val().toUpperCase(),
                txtNumCuenta: $("#" + listaBorrados[i] + " input.numCuenta").val().toUpperCase(),
                txtTipoCuenta: $("#" + listaBorrados[i] + " input.tipoCuenta").val().toUpperCase()
            };
            relacionesEliminadas.refBancarias.push(elementoEliminado);
        } else if (tipoRelacion === 'REFCOMERCIAL') {
            elementoEliminado = {
                idInterno: idInternoPe,
                txtNombre: $("#" + listaBorrados[i] + " input.nombre").val().toUpperCase(),
                txtGiro: $("#" + listaBorrados[i] + " input.giro").val().toUpperCase(),
                txtTel: $("#" + listaBorrados[i] + " input.tel").val().toUpperCase(),
                txtRelacion: $("#" + listaBorrados[i] + " input.relacion").val().toUpperCase()
            };
            relacionesEliminadas.refComerciales.push(elementoEliminado);
        } else if (tipoRelacion === 'PERSONA') {
            elementoEliminado = {
                idInterno: $("#" + element + " input.idInterno").val().toUpperCase(),
                txtTipoRelacion: $("#" + element + " input.codRel").val().toUpperCase()
            };
            relacionesEliminadas.personas.push(elementoEliminado);
        }
    }
    return relacionesEliminadas;
}

/*
 * Generar json con nuevas relaciones.
 */
function generarEstructuraNuevasRelaciones() {
    var nuevasRelaciones = {
        accionistas: [],
        funcionarios: [],
        refBancarias: [],
        refComerciales:[],
        personas: []
    };
   for(var i = 0;i<listaAgregados.length;i++) {
       var splitet = listaAgregados[i].split('_');
       var element = listaAgregados[i].replace('_','');
       var tipo;
       if (splitet[0]=== 'nuevaRelacion') {
           tipo = $("#" + listaAgregados[i] + " input.tipo").val();
       } else {
           tipo = $("#" + element + " input.tipo").val();
       }
      if(tipo === 'ACCIONISTA') {
         var accionista = {
            txtNombre: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contNombre input.nombre").val().toUpperCase(),
            txtApPaterno: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contAPat input.aPat").val().toUpperCase(),
            txtApMaterno: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contAMat input.aMat").val().toUpperCase(),
            txtRFC: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contRfc input.rfc").val().toUpperCase(),
            txtAccionariado: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contPuestoPorcentaje input.puestoPorcentaje").val().toUpperCase()
         };
         nuevasRelaciones.accionistas.push(accionista);
      } else if (tipo === 'FUNCIONARIO') {
         var funcionario = {
            txtNombre: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contNombre input.nombre").val().toUpperCase(),
            txtApPaterno: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contAPat input.aPat").val().toUpperCase(),
            txtApMaterno: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contAMat input.aMat").val().toUpperCase(),
            txtRFC: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contRfc input.rfc").val().toUpperCase(),
            txtPuesto: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contPuestoPorcentaje input.puestoPorcentaje").val().toUpperCase()
         };
         nuevasRelaciones.funcionarios.push(funcionario);
      } else if (tipo === 'REFBANCARIA') {
         var refBancaria = {
            txtNombre: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contNombreBanco input.nombreBanco").val().toUpperCase(),
            txtNumCuenta: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contNumCuenta input.numCuenta").val().toUpperCase(),
            txtTipoCuenta: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contTipoCuenta input.tipoCuenta").val().toUpperCase()
         };
         nuevasRelaciones.refBancarias.push(refBancaria);
      } else if (tipo === 'REFCOMERCIAL') {
         var refComercial = {
            txtNombre: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contNombre input.nombre").val().toUpperCase(),
            txtGiro: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contGiro input.giro").val().toUpperCase(),
            txtDomicilio: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contDomicilio input.domicilio").val().toUpperCase(),
            txtTel: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contTelefono input.telefono").val().toUpperCase(),
            txtRelacion: $("#" + listaAgregados[i] + " div.contInfo div.contCampos div.contRelacion input.relacion").val().toUpperCase()
         };
         nuevasRelaciones.refComerciales.push(refComercial);
      } else if (tipo === 'PERSONA') {
          var numIndex;
          if (splitet[0]=== 'nuevaRelacion') {
              numIndex = splitet[1];
          } else {
              numIndex = element.substring(21);
          }
          var persona = {
              idInterno: $("#txtIdInterno_" + numIndex).val().toUpperCase(),
              txtTipoRelacion: $("#cboRelacion_" + numIndex).val().toUpperCase()
          };
          nuevasRelaciones.personas.push(persona);
      }
   }
   return nuevasRelaciones;
}

/*
 * Funci�n para eliminar de la lista de los elementos agregados.
 */
function borrarNuevo(indice){
   var index = listaAgregados.indexOf('nuevaRelacion_' + indice);
   if (index > -1) {
      listaAgregados.splice(index, 1);
   }
   $("#nuevaRelacion_"+indice).remove();
}

/*
 * Funcion para agregar la seccion de la relacion.
 */
function agregar(){
    var StrHtml='';
    switch($("#catalogoRelacionPersona").val()) {
        case "A"://ACCIONISTA
            StrHtml=PlantillaAccionista("ACCIONISTA","% Accionariado", "txtAccionariado");
            break;
        case "F"://FUNCIONARIO PRINCIPAL
            StrHtml=PlantillaAccionista("FUNCIONARIO","Puesto", "txtPuesto");
            break;
        case "RB"://REFERENCIA BANCARIA
            StrHtml= PlanRefBancaria();
            break;
        case "RC"://REFERENCIA COMERCIAL
            StrHtml= PlanRefComercial();
            break;
        case "P"://PERSONA
            StrHtml=PlanPersona();
            break;
    }
    if(StrHtml.length>0) {
        $("#contenedor-personas").append(StrHtml);
        establecerValidacionRFCFisica();
        $('html,body').animate({ scrollTop: 9999 }, 'slow');
        listaAgregados.push('nuevaRelacion_'+indexAgregados);
        if($("#catalogoRelacionPersona").val() === 'P')
            loadCatalogoRelaciones('cboRelacion_'+indexAgregados, null);
        indexAgregados++;
    }
}

/*
 * Plantilla para nuevo accionista
 */
function PlantillaAccionista(TitleOption,TitleInput, inputName)
{
   var vPlantilla='<div  id="nuevaRelacion_'+indexAgregados+'" class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo   PLANTILLAPRINCIPAL  Plantilla_'+TitleOption+'">'
       +'<input hidden class="tipo" value="'+TitleOption+'"/>'
       +'<div class="ui-panel-content ui-widget-content contInfo">'
       +	'<div class="row-flex contCampos">'
       +		'<div class="grid_46">'
       +			'<label class="ui-outputlabel ui-widget" > Tipo de Relaci&oacute;n</label>'
       +			'<label class="ui-outputlabel ui-widget" > '+TitleOption+'</label>'
       +			'<button onclick="borrarNuevo('+indexAgregados+')" '
       +			'	class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
       +			'	<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
       +			'	<span class="ui-button-text ui-c">ui-button</span>'
       +			'</button>'
       +		'</div>'
       +		'<div class="grid_46 contNombre">'
       +		'	<label class="ui-outputlabel ui-widget">Nombre(s) </label> <label class="textRojo">*</label>'
       +			'<div class="clear-3"></div>'
       +		'	<input name="txtNombre"'
       +		'		  type="text" maxlength="50"'
       +		'		class="nombre form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all requerido" role="textbox" aria-disabled="false" aria-readonly="false"  />'
       +		'</div>'
       +		'<div class="grid_46 contAPat">'
       +		'	<label class="ui-outputlabel ui-widget">Apellido Paterno </label><label class="textRojo">*</label>'
       +			'<div class="clear-3"></div>'
       +		'	<input name="txtApPaterno"'
       +		'	 type="text" maxlength="50"'
       +		'		class="aPat form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all requerido" role="textbox" aria-disabled="false" aria-readonly="false"  />'
       +		'</div>'
       +		'<div class="grid_46 contAMat">'
       +		'	<label class="ui-outputlabel ui-widget">Apellido Materno </label><label class="textRojo">*</label>'
       +			'<div class="clear-3"></div>'
       +		'	<input name="txtApMaterno"'
       +		'		 type="text" maxlength="50"'
       +		'		class="aMat form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all requerido" role="textbox" aria-disabled="false" aria-readonly="false"  />'
       +		'</div>'
       +		'<div class="grid_46 contRfc">'
       +		'	<label class="ui-outputlabel ui-widget">RFC</label>'
       +			'<div class="clear-3"></div>'
       +		'	<input name="txtRFC"'
       +		'		 type="text" maxlength="13" id="rfc_'+indexAgregados+'"'
       +		'		class="rfc RFCFisica ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
       +		'</div>'
       +		'<div class="grid_46 contPuestoPorcentaje">'
       +		'	<label class="ui-outputlabel ui-widget">'+TitleInput+'</label> <label class="textRojo">*</label>'
       +			'<div class="clear-3"></div>'
       +		'	<input name="'+inputName+'"'
       +		'		 type="text" maxlength="20"'
       +		'		class="puestoPorcentaje form-control Numeros ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all requerido" role="textbox" aria-disabled="false" aria-readonly="false"  />'
       +		'</div>'
       +	'</div>'
       +	'<div class="row-flex">'
       +	'</div>'
       +'</div>'
       +'</div><br/>';
   return vPlantilla;
}

/*
 * Plantilla para nueva referencia bancaria.
 */
function PlanRefBancaria()
{
   var vPlantilla='<div id="nuevaRelacion_'+indexAgregados+'" class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaComercial PLANTILLAPRINCIPAL">'
       +'<input hidden class="tipo" value="REFBANCARIA"/>'
       +'<div class="ui-panel-content ui-widget-content contInfo">'
       +'	<div class="row-flex contCampos">'
          +'	<div class="grid_46">'
          +'			<label class="ui-outputlabel ui-widget" > Tipo de Relaci&oacute;n</label>'
          +'			<label class="ui-outputlabel ui-widget" > REF. BANCARIA</label>'
          +'			<button onclick="borrarNuevo('+indexAgregados+')" '
          +'				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
          +'				<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
          +'				<span class="ui-button-text ui-c">ui-button</span>'
          +'			</button>'
          +'	</div>'
          +'	<div class="grid_46 contNombreBanco">'
          +'			<label class="ui-outputlabel ui-widget">Nombre del banco </label> <label class="textRojo">*</label>'
          +'			<div class="clear-3"></div>'
          +'			<input name="txtNombre"'
          +'				 type="text" maxlength="50"'
          +'				class="nombreBanco requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
          +'	</div>	'
          +'	<div class="grid_46 contNumCuenta">'
          +'			<label class="ui-outputlabel ui-widget">Numero de cuenta *</label>'
          +'			<div class="clear-3"></div>'
          +'			<input name="txtNumCuenta"'
          +'				 type="text" maxlength="18"'
          +'				class="numCuenta requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
          +'	</div>		'

          +'	<div class="grid_46 contTipoCuenta">'
          +'			<label class="ui-outputlabel ui-widget">Tipo de cuenta *</label>'
          +'			<div class="clear-3"></div>'
          +'			<input name="txtTipoCuenta"'
          +'				 type="text" maxlength="30"'
          +'				class="tipoCuenta requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
          +'	</div>			'
       +'	</div>'
       +'	<div class="row-flex">'
       +'	</div>'
       +'</div>'
       +'</div><br/>';
   return vPlantilla;
}

/*
 * Plantilla para nueva referencia comercial.
 */
function PlanRefComercial() {
   var vPlantilla='<div id="nuevaRelacion_'+indexAgregados+'" class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaComercial PLANTILLAPRINCIPAL">'
       +'<input hidden class="tipo" value="REFCOMERCIAL"/>'
       +'<div class="ui-panel-content ui-widget-content contInfo">'
       +'	<div class="row-flex contCampos">'
       +'		<div class="grid_46">'
       +'				<label class="ui-outputlabel ui-widget" > Tipo de Relaci&oacute;n</label>'
       +'				<label class="ui-outputlabel ui-widget" > REF. COMERCIAL</label>'
       +'				<button onclick="borrarNuevo('+indexAgregados+')" '
       +'					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
       +'					<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
       +'					<span class="ui-button-text ui-c">ui-button</span>'
       +'				</button>'
       +'		</div>	'
       +'		<div class="grid_46 contNombre">'
       +'			<label class="ui-outputlabel ui-widget">Nombre </label> <label class="textRojo">*</label>'
       +'			<div class="clear-3"></div>'
       +'			<input name="txtNombre"'
       +'				 type="text" maxlength="50"'
       +'				class="nombre requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all nombreprueba" role="textbox" aria-disabled="false" aria-readonly="false" />'
       +'		</div>'
       +'		<div class="grid_46 contGiro">'
       +'			<label class="ui-outputlabel ui-widget">Giro *</label>'
       +'			<div class="clear-3"></div>'
   +'				<input name="txtGiro" type="text" maxlength="50" class="giro requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
       +'		</div>'
       +'		<div class="grid_46 contDomicilio" >'
       +'			<label class="ui-outputlabel ui-widget">Domicilio *</label>'
       +'			<div class="clear-3"></div>'
       +'			<input name="txtDomicilio" type="text" maxlength="50" class="domicilio requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all porcentaje" role="textbox" aria-disabled="false" aria-readonly="false" />'//onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"
       +'		</div>'
       +'		<div class="grid_46 contTelefono" >'
       +'			<label class="ui-outputlabel ui-widget">Telefono *</label>'
       +'			<div class="clear-3"></div>'
       +'			<input name="txtTel" type="text" maxlength="10" class="telefono requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all porcentaje" role="textbox" aria-disabled="false" aria-readonly="false" />'//onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"
       +'		</div>'
       +'		<div class="grid_46 contRelacion" >'
       +'			<label class="ui-outputlabel ui-widget">Relaci&oacute;n con el cliente *</label>'
       +'			<div class="clear-3"></div>'
       +'			<input name="txtRelacion" type="text" maxlength="50" class="relacion requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all porcentaje" role="textbox" aria-disabled="false" aria-readonly="false" />' //onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"
       +'		</div>'
       +'	</div>'
       +'	<div class="row-flex">'
       +'	</div>'
       +'</div>'
       +'</div><br/>';
   return vPlantilla;
}

/*
 * Plantilla para nueva persona
 */
function PlanPersona() {
   var Plantilla='<table style="width: 100%" id="nuevaRelacion_'+indexAgregados+'"> <tr id="RelacionPersona_'+indexAgregados+'" class="Ultimo RelacionPersona_'+indexAgregados+'"><td>'
    Plantilla += '<input hidden class="tipo" value="PERSONA"/>'
   Plantilla +='<div class="Datos" style="border-style: solid; border-color: #0684c8;"> \n'
   Plantilla +='<table style="width: 100%;"> \n'
   Plantilla +='<tr> \n'
   Plantilla +='<td > \n'
   Plantilla +='<button id="Btn_'+indexAgregados+'" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only  btn-icono" \n'
   Plantilla +='alt="Eliminar" title="" type="button" role="button" aria-disabled="false" \n'
   Plantilla +='oldtitle="Eliminar" aria-describedby="ui-tooltip-j_idt84" style="color:#333333" onclick="borrarNuevo('+indexAgregados+');"> \n'
   Plantilla +='<span class="glyphicon glyphicon-trash"/> \n'
   Plantilla +='</button> \n'
   Plantilla +='</td> \n'
   Plantilla +='</tr> \n'
   Plantilla +='<tr> \n'
   Plantilla +='<td> \n'
   Plantilla +='<table style="width: 100%"> \n'
   Plantilla +='<tr> \n'
   Plantilla +='<td style="width: 1%">&nbsp;</td> \n'
   Plantilla +='<td style="width: 10%"> \n'
   Plantilla +='<label>Tipo de Relaci&oacute;n</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td style="width: 35%"> \n'
   Plantilla +='<label>Id. Oficial</label> \n'
   Plantilla +='<label class="Requerido">*</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td style="width: 35%"> \n'
   Plantilla +='<label>Titular de la Cuenta</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td style="width: 20%"> \n'
   Plantilla +='<label>Relaci&oacute;n con el Cliente</label> \n'
   Plantilla +='<label class="Requerido">*</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='</tr> \n'
   Plantilla +='<tr> \n'
   Plantilla +='<td style="width: 1%">&nbsp;</td> \n'
   Plantilla +='<td style="width: 10%"> \n'
   Plantilla +='<label style="font-weight: bold;">Persona</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td style="width: 35%"> \n'
   Plantilla +='<div class="grid_30 alpha RequeridBsfPortalSucursalesCriteriosBusquedaos"> \n'
   Plantilla +='<div class="Requeridos"> \n'
   Plantilla +='<input id="txtIdInterno_'+indexAgregados+'" type="text" onchange="consultaDatosFisica(this.value, '+indexAgregados+');"' +
                'class="requerido form-control Numeros" maxlength="14" style="width:90%"/> \n'
   Plantilla +='</div> \n'
   Plantilla +='</div> \n'
   Plantilla +='<div class="grid_5"> \n'
   Plantilla +='<button id="BtnBuscar_'+indexAgregados+'"  class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono-conbackground BuscarPersona" \n'
   Plantilla +='alt="Buscar persona" title="" type="button" role="button" aria-disabled="false" \n'
   Plantilla +='oldtitle="Buscar persona" aria-describedby="ui-tooltip-2" value="idCliente1" onclick="buscarPersonaCriterios('+indexAgregados+');"> \n'
   Plantilla +='<span class="ui-button-icon-left ui-icon ui-c ui-icon-search"></span> \n'
   Plantilla +='<span class="ui-button-text ui-c">ui-button</span> \n'
   Plantilla +='</button> \n'
   Plantilla +='</div> \n'
   Plantilla +='<div class="grid_5"> \n'
   Plantilla +='<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono-conbackground" \n'
   Plantilla +='alt="A�adir" title="" type="button" role="button" aria-disabled="false" \n'
   Plantilla +='oldtitle="A�adir" aria-describedby="ui-tooltip-j_idt84"> \n'
   Plantilla +='<span class="ui-button-icon-left ui-icon ui-c  ui-icon-person "></span> \n'
   Plantilla +='<span class="ui-button-text ui-c">ui-button</span> \n'
   Plantilla +='</button> \n'
   Plantilla +='</div> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td style="width: 35%"> \n'
   Plantilla +='<input id="txtTitular_'+indexAgregados+'" type="text" class="requerido form-control" maxlength="14" style="width:90%" readonly="readonly"/> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td style="width: 20%"> \n'
   Plantilla +='<div class="Requeridos"> \n'
   Plantilla +='<select id="cboRelacion_'+indexAgregados+'" class="requerido form-control" style="width:90%"></select> \n'
   Plantilla +='</div> \n'
   Plantilla +='</td> \n'
   Plantilla +='</tr> \n'
   Plantilla +='</table> \n'
   Plantilla +='<table style="width: 100%"> \n'
   Plantilla +='<tr> \n'
   Plantilla +='<td style="width: 1%">&nbsp;</td> \n'
   Plantilla +='<td width="70%"> \n'
   Plantilla +='<label>Observaciones</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td width="15%"> \n'
   Plantilla +='<label>Fecha Inicio</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td width="15%"> \n'
   Plantilla +='<label>Fecha Fin</label> \n'
   Plantilla +='</td> \n'
   Plantilla +='</tr> \n'
   Plantilla +='<tr> \n'
   Plantilla +='<td style="width: 1%">&nbsp;</td> \n'
   Plantilla +='<td width="70%"> \n'
   Plantilla +='<input id="txtObservacion_'+indexAgregados+'" type="text" class="form-control AlfaNumeros" style="width:90%"/> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td width="15%"> \n'
   Plantilla +='<div class="input-group date FechaCompleta" data-provide="datepicker" style="width:90%"> \n'
   Plantilla +='<input id="txtFechaIncio_'+indexAgregados+'" type="text" class="form-control" readonly="readonly" /> \n'
   Plantilla +='<div class="input-group-addon"> \n'
   Plantilla +='<span class="glyphicon glyphicon-th"></span> \n'
   Plantilla +='</div> \n'
   Plantilla +='</div> \n'
   Plantilla +='</td> \n'
   Plantilla +='<td width="15%"> \n'
   Plantilla +='<div class="input-group date FechaCompleta" data-provide="datepicker" style="width:90%"> \n'
   Plantilla +='<input  id="txtFechaFin_'+indexAgregados+'" type="text" class="form-control" readonly="readonly"/> \n'
   Plantilla +='<div class="input-group-addon"> \n'
   Plantilla +='<span class="glyphicon glyphicon-th"></span> \n'
   Plantilla +='</div> \n'
   Plantilla +='</div> \n'
   Plantilla +='</td> \n'
   Plantilla +='</tr> \n'
   Plantilla +='</table> \n'
   Plantilla +='</td> \n'
   Plantilla +='</tr> \n'
   Plantilla +='</table> \n'
   Plantilla +='<br/> \n'
   Plantilla +='</div> \n'
   Plantilla +='</td>\n</tr>\n<tr class="Ultimo RelacionPersona_'+indexAgregados+'">\n<td>&nbsp;</td>\n</tr></table>'
   return Plantilla;
}

/*
 * Barra progreso
 */
function mostrarBarraProgreso() {
    var dialog = bootbox.dialog({
        message: '<div class="ui-dialog-content ui-widget-content" style="text-align: center"><div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar"><div class="progress-shadow"></div></div></div></div><br/><label class="ui-widget ui-state-default ui-corner-all">Cargando Su Peticion</label></div>',
        closeButton: false
    }).css({
        'margin-top': function () {
            var w = $(window).height();
            var b = $(".modal-dialog").height();
            // should not be (w-h)/2
            var h = (w) / 2;
            return h + "px";
        },
    });
}

/*
 * Ocultar barra progreso.
 */
function ocultarBarraProgreso() {
    bootbox.hideAll();
}

/*
 * Funcion para poblar el select de catalogo de relaciones
 */
function loadCatalogoRelaciones(idSelect, selected) {
    mostrarBarraProgreso();
    try {
        var active = dataBase.result;
        var data = active.transaction(["catalogo_relacion_cliente_pm"], "readonly");
        var object = data.objectStore("catalogo_relacion_cliente_pm");

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

            var outerHTML = '<option value="" id="relPers0" selected="selected">SELECCIONE UN VALOR</option>';


            /*for (var key in elements) {
                outerHTML +=
                    '<option value="' + elements[key].identificador +'">' +
                    elements[key].descripcion +'</option>';
            }*/
            outerHTML +=
                '<option value="451">APODERADO DE</option>';
            elements = [];
            $("#"+idSelect).append(outerHTML);
            if(selected != null) {
                $("#"+idSelect).val(selected);
            }

            ocultarBarraProgreso();
        };
    } catch(err) {
        console.log("Ocurri&#243; un error: loadAll: " +err.message);
    }
}