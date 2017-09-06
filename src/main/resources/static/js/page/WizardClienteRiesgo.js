//variables de los Bootbox
var loading;

// variables del MODELO
// variables para emitir doc

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
    // colocar imagenes a los botones, mensajes etc.
    // ========================================================================================================================================================
    $("#next1").css('background-image', 'url(/' + nomPath + 'img/next.png)');
    $("#next2").css('background-image', 'url(/' + nomPath + 'img/next.png)');
    $("#BtnSavePerson").css('background-image', 'url(/' + nomPath + 'img/next.png)');
    // ========================================================================================================================================================
    // iniciar los mensajes de BOOTBOX
    // ========================================================================================================================================================
    iniciaBootbox();
    // $(".img_info").each(function() {
    // $("#" + this.id).attr("src", "/" + nomPath +
    // "img/messages-g.png");
    // });
    // ========================================================================================================================================================
    // Validar los campos para activar botones de siguien
    // ========================================================================================================================================================

    // ========================================================================================================================================================
    // Validar Si es alta o Actualizacion
    // ========================================================================================================================================================
    // if (alta) {
    // iniciarDatosAlta();
    // startDB();
    // } else {
    // iniciarDatosActualizacion();
    // startDB();
    // }

    // ========================================================================================================================================================
    // iniciar datos
    // ========================================================================================================================================================

    // acciones para los botones
    $("#breadcum").click(function() {
	window.history.go(-1);
    });
    $(".btnMenuGlobal").click(function() {
	parent.irMenuGloblaPerderAvance();
    });
    
    InitBtn();
    LoadDataConsult()
    InitTextNumeric();
    
    
    
});

function InitTextNumeric()
{
	$("#txtActFij").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtActCirc").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtPasivCorPlaz").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtPasivLargPlaz").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtCapCont").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtIngAnu").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtCostVent").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtGast").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtUtil").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtNumEmpl").mask('0,000,000,000', {reverse: true});
	$("#txtPagExport").mask('0,000,000,000,000.00', {reverse: true});
	$("#txtPagDlls").mask('0,000,000,000,000.00', {reverse: true});
	$("#NumEmplGrup").mask('00,000,000,000', {reverse: true});
	$("#NumOfGrup").mask('00,000,000,000', {reverse: true});
	$("#txtGrpVentAnu").mask('0,000,000,000,000.00', {reverse: true});
	$("#PartGrup").mask('0000', {reverse: true});
}


function LoadDataConsult()
{
	if($("#TipOperacion").val()=="0")
	{
		InitChechFreConsul();//Inicializa check consulta
		oRelPersonas.forEach(function(element) 
		{
			var StrHtml = '';
			if(element.giro !=null)
			{
				var ObjComer ={
						nombre:(element.nombre === null)? "": element.nombre,
						Giro:  (element.giro === null)? "":element.giro ,
						Domic: (element.domic === null)? "":element.domic ,
						Tel:   (element.telefono === null)? "":element.telefono ,
						RelCliente:(element.persRl === null)? "":element.persRl,
						NumSec :(element.apellido1 === null)? "":element.apellido1		
				};
				StrHtml = LoadPlanRefComercialConsult(ObjComer);
			}
			else
				{
				if(element.puesto!=null)
				{
					var ObjAccFunc=
					{
							nombre:element.nombre,
							paterno:element.apellido1,
							materno: (element.apellido2 === null)? "":element.apellido2 , 
							rfc:element.rfc,
							acciona:null,
							puesto:element.puesto,
							NumSec :(element.telefono === null)? "":element.telefono
					};
					StrHtml=LoadPlantillaAccionistaConsult("FUNCIONARIO", "Puesto",ObjAccFunc);
				}
				else
					{
					if(element.porcentaje!=null){
						var ObjAccFunc=
						{
								nombre:element.nombre,
								paterno:element.apellido1,
								materno:element.apellido2,
								rfc:element.rfc,
								acciona:element.porcentaje,
								puesto:null,
								NumSec :(element.telefono === null)? "":element.telefono
						};	
						StrHtml=LoadPlantillaAccionistaConsult("ACCIONISTA", "% Accionariado",ObjAccFunc);
					}
					}
				}
			if (StrHtml.length > 0) {
				$("#contenedor-personas").append(StrHtml);
			}
		});	
	}
}


function AcepAlfaNumeric(element)
{
	var StrExp= /^[A-ZñÑa-z]/; 
	var expreg = new RegExp(StrExp);
	 if (!expreg.test(element.value)) 
	 {
		 element.value="";
     }
}

function RFCFisica(element){
	var StrExp= /^[a-zA-Z]{4}[0-9]{6}[0-9a-z�A-Z�]{3}$/; 
	var expreg = new RegExp(StrExp);
	 if (!expreg.test(element.value)) 
	 {
		 element.value="";
     }
}
function Numeros(element)
{
	var StrExp= /[0-9]/; 
	var expreg = new RegExp(StrExp);
	 if (!expreg.test(element.value)) 
	 {	
		 element.value="";
     }
}

function AcepNumeric(element)
{
	var StrExp= /^[0-9]/; 
	var expreg = new RegExp(StrExp);
	 if (!expreg.test(element.value)) 
	 {	
		 element.value="";
     }
}


function ReturnObjRel(vObjectPlant) {
	var vDetalle = "";
	var vNumsec ="";
	if(vObjectPlant.vNumSec !=null)
		vNumsec =",num_sec:'"+vObjectPlant.vNumSec +"'";
	
	switch (vObjectPlant.vTypOper) {
	case "ACCFUN":
		if (vObjectPlant.vPuesto != null)
			vDetalle += "{nombre:'" + vObjectPlant.vName + "', codRel:'" + vObjectPlant.vTypOper + "', apellido1:'" + vObjectPlant.vPater + "',apellido2:'" + vObjectPlant.vMater + "',rfc:'" + vObjectPlant.vRfc + "',puesto:'" + vObjectPlant.vPuesto + "'"+vNumsec+"},";
		else
			vDetalle += "{nombre:'" + vObjectPlant.vName + "', codRel:'" + vObjectPlant.vTypOper + "', apellido1:'" + vObjectPlant.vPater + "',apellido2:'" + vObjectPlant.vMater + "',rfc:'" + vObjectPlant.vRfc + "',porcentaje:'" + vObjectPlant.vPorcent + "'"+vNumsec+"},";
		break;
	case "REFBAN":
		vDetalle += "{banco:'" + vObjectPlant.vName + "', codRel:'" + vObjectPlant.vTypOper + "',numCuenta: '" + vObjectPlant.vNumCuenta + "', tipoCuenta:'" + vObjectPlant.vTypCuent + "'"+vNumsec+"},";
		break;
	case "REFCOM":
		vDetalle += "{nombre:'" + vObjectPlant.vName + "', codRel:'" + vObjectPlant.vTypOper + "', giro:'" + vObjectPlant.vGirCuent + "', domic:'" + vObjectPlant.vDomCuent + "',telefono:'" + vObjectPlant.vTelCuent + "',relacion:'" + vObjectPlant.vTipRel + "'"+vNumsec+"},";
		break;
	}
	return vDetalle;
}


function CrearRelacionPersReq()
{
	var vRel="{ ReqRelacionDTO :[";
	var vDetalle="";
	$( ".PLANTILLAPRINCIPAL" ).each(function(  ) {
		var vObjectPlant = {
			vTypOper : $(this).find('.codRel').val(),
			vName : $(this).find('.nombre').val(),
			vPater : $(this).find('.apellido1').val(),
			vMater : $(this).find('.apellido2').val(),
			vRfc : $(this).find('.RfcAccionista').val(),
			vPorcent : $(this).find('.Porcen').val(),
			vNumCuenta : $(this).find('.numCuenta').val(),
			vTypCuent : $(this).find('.TypCuent').val(),
			vGirCuent : $(this).find('.GiroCuent').val(),
			vDomCuent : $(this).find('.DomicCuent').val(),
			vTelCuent : $(this).find('.TelCuent').val(),
			vTipRel : $(this).find('.RelacGiro').val()
		};
		
		vDetalle += ReturnObjRel(vObjectPlant);
	});
	vDetalle = vDetalle.substring(0,vDetalle.length-1);
	vRel +=vDetalle;
	vRel +="]}";
	console.log("Return  "+vRel);
	return vRel;
}

function ValidaCamposPlantilla()
{
	var bEstatus =false;
	var iInd =0;

	$(".PLANTILLAPRINCIPAL").each(function(index) {
		$(".CampoValidar").each(function(index01) {
			bEstatus = true;
			if ($(this).val() == "") {
				$(this).addClass("ContenedorMensaje");
				bEstatus = false;
			}
			iInd++;
		});
	});
	if (iInd > 0) {
		if (!bEstatus) {
			bEstatus = false; //alert("No ha ingresado datos");
		}
	} else {
		bEstatus = false; //alert("No ha ingresado datos");
	}
	return bEstatus;
}

function ValidaFieldAccion() {
	var bEstatus = false;
	var iInd = 0;
	$(".PLANTILLAPRINCIPAL").each(function(index) {
		var vTypOper = $(this).find('.Porcen').val();
		console.log("Suma " + iInd);
		if (vTypOper != null)
			iInd++;

	});
	if (iInd >= 2) {
		bEstatus = true;
	}
	return bEstatus;
}

function InitBtn() {
	
	$("#NomGrup").click(function() {
		ShowMsgGrupFillial(false, "NomGrup");
	});

	$("#RfcGrup").click(function() {
		ShowMsgGrupFillial(false, "RfcGrup");
	});

	$("#CobGrup").click(function() {
		ShowMsgGrupFillial(false, "CobGrup");
	});

	$("#ProdServGrup").click(function() {
		ShowMsgGrupFillial(false, "ProdServGrup");
	});
	
	$("#NacionGrup").click(function() {
		ShowMsgGrupFillial(false, "NacionGrup");
	});
	
	$("#PaisGrupo").click(function() {
		ShowMsgGrupFillial(false, "PaisGrupo");
	});
		
	$("#btnSalir").click(function(){
		msjAlertaSalir();
		return false;
	});
	
	$("#btnAddRelPer").click(function () {
		var StrHtml = '';
		switch ($("#catalogoRelacionPersona").val()) {
		case "A": //ACCIONISTA
			StrHtml = PlantillaAccionista("ACCIONISTA", "% Accionariado");
			break;
		case "F": //FUNCIONARIO PRINCIPAL
			StrHtml = PlantillaAccionista("FUNCIONARIO", "Puesto");
			break;
		case "RB": //REFERENCIA BANCARIA
			StrHtml = PlanRefBancaria();
			break;
		case "RC": //REFERENCIA COMERCIAL
			StrHtml = PlanRefComercial();
			break;
		}
		if (StrHtml.length > 0) {
			$("#contenedor-personas").append(StrHtml);
		}
		return false;
	});
	
	
	$('#contenedor-personas').on('click', '.btnEliminar', function() 
	{
		
		var vObjectPlant = {
				vTypOper : $(this).parents('.PLANTILLAPRINCIPAL').find('.codRel').val(),
				vName : $(this).parents('.PLANTILLAPRINCIPAL').find('.nombre').val(),
				vPater : $(this).parents('.PLANTILLAPRINCIPAL').find('.apellido1').val(),
				vMater : $(this).parents('.PLANTILLAPRINCIPAL').find('.apellido2').val(),
				vRfc : $(this).parents('.PLANTILLAPRINCIPAL').find('.RfcAccionista').val(),
				vPorcent : $(this).parents('.PLANTILLAPRINCIPAL').find('.Porcen').val(),
				vNumCuenta : $(this).parents('.PLANTILLAPRINCIPAL').find('.numCuenta').val(),
				vTypCuent : $(this).parents('.PLANTILLAPRINCIPAL').find('.TypCuent').val(),
				vGirCuent : $(this).parents('.PLANTILLAPRINCIPAL').find('.GiroCuent').val(),
				vDomCuent : $(this).parents('.PLANTILLAPRINCIPAL').find('.DomicCuent').val(),
				vTelCuent : $(this).parents('.PLANTILLAPRINCIPAL').find('.TelCuent').val(),
				vTipRel : $(this).parents('.PLANTILLAPRINCIPAL').find('.RelacGiro').val(),
				vNumSec : $(this).parents('.PLANTILLAPRINCIPAL').find('.NumSec').val()
			};
			vDetalle = ReturnObjRel(vObjectPlant);
			var vElemen = $("#RelEliminadas").val()+","+vDetalle;
			$("#RelEliminadas").val(vElemen);
		
		$(this).parents('.PLANTILLAPRINCIPAL').remove();
		return false;
	});

	$('#contenedor-personas').on('click', '.btnEditar', function() {
		try 
		{
			var vStat = $(this).parents('.PLANTILLAPRINCIPAL').find(".StatusEdit").val();
			console.log("value : "+vStat);
			var vBolSta = true;
			var bValue ="0";
			if (vStat =="0")
			{
				vBolSta = false;
				bValue ="1";
			}
			
			$(this).parents('.PLANTILLAPRINCIPAL').find(".StatusEdit").val(bValue);
			$(this).parents('.PLANTILLAPRINCIPAL').find("input").prop("disabled", vBolSta);

		} catch (message) {

			console.log(message);
		}

		return false;
	});



	$('#contenedor-personas').on('click', '.CampoValidar', function() {
		try {
			$(this).removeClass("ContenedorMensaje");
		} catch (message) {
			console.log("In CampoValidar Error " + message);
		}
	});

	$("#btnAlta").click(function()
	{
		var Rel={
				ReqRelacionDTO :[{nombre:'Example'				},
					{nombre:'Example01'				}
					]
		};
		console.log(JSON.stringify(Rel));
		
	});
	
	//Guardar Persona moral
	$("#BtnSavePerson").click(function()
	{
		var StVal =CrearRelacionPersReq();
		$("#BsRel").val(StVal);//JSON.stringify(Rel));
		InitChechAltaPersonaMoral();
		if($("#RelEliminadas").val().length>2)
		{
			var vDetalle = $("#RelEliminadas").val().substring(0,$("#RelEliminadas").val().length-1);
			var vRelElimina="{ ReqRelacionDTO :["+vDetalle+"]}";
			$("#RelEliminadas").val(vRelElimina);
		}
		$("#FrmSavePersMoral").submit();
	});
	
	$("#chTipOtro").click(function(){
		$("#txtOther").prop("disabled",true);
		if($("#chTipOtro").is(':checked')){
			$("#txtOther").prop("disabled",false);
		}
	});
}


// ########################################################################################################################################################
// FIN Docunemt ready
// ########################################################################################################################################################
function iniciaBootbox() {
    var msg = '<div class="ui-dialog-content ui-widget-content"style="text-align: center">' + '<div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar">'
	    + '<div class="progress-shadow">' + '</div></div></div></div><br/>' + '<label class="ui-widget ui-state-default ui-corner-all">Cargando SuPeticion</label></div>';
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
    // dialog.modal('hide');
}

function msjAlertaSalir() 
{
	setMensajeAlertaWarn("¡Atención! Si continua perderá todos los cambios </br> ¿Desea continuar de todos modos?");
	/*
    bootbox.confirm({
	// size : "small",
	message : '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath + 'img/messages-g.png" /></p>'
		+ '<center><label>¡Atención! Si continua perderá todos los cambios</label><br/>' + '<label>¿Desea continuar de todos modos? </label></center>',
		 buttons: {
		        confirm: {
		            label: 'Aceptar'
		        },
		        cancel: {
		            label: 'Cancelar'
		        }
		    },		
	callback : function(result) {
		console.log("Result "+result);
		if(result){
			console.log("Salir");
		}
	}
    });
    */
}

function msjAlerta(text) {
    bootbox.alert({
	// size : "small",
	message : '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath + 'img/messages-g.png" /></p>'
		+ '<center><label>¡Atención!</label><br/>' + '<label>' + text + '</label></center>',
	callback : function() {

	}
    });
}
// ========================================================================================================================================================
// Verificar click en las flechas o botones de los pasos
// ========================================================================================================================================================
function verificaClick(fromElement, toElement) 
{
    // pagina de donde se hizo el clic
    var paginaOrigen = fromElement.id;
    // pagina hacia donde se dirige
    var paginaDestino = toElement.id;
    paginaOrigen = paginaOrigen.substr(paginaOrigen.length - 1, paginaOrigen.length);
    paginaDestino = paginaDestino.substr(paginaDestino.length - 1, paginaDestino.length);
    // variable para saber que caso es:
    // de la pagina 1 a la 2
    // de la pagina 1 a la 3
    // de la pagina 2 a la 1
    // de la pagina 2 al a 3
    // de la pagina 3 a la 1
    // de la pagina 3 a la 2
    var caso = paginaOrigen.concat(".", paginaDestino);
    console.log(caso);
    switch (caso)
	{
	 case "1.2":
		 if($("#TipOperacion").val()=="0")
		 {
			 return true;
		 }
		 else
			 {
				var status = ValidaCamposPlantilla() ;
				if (!status)
					msjAlerta('No ha ingresado datos para continuar');
				else {
					status = ValidaFieldAccion();
					if (!status)
						msjAlerta('No ha ingresado por lo menos 2 accionistas');
				}
				return status; //true;			 
			 }

		
		break;
	case "2.3":
		if($("#TipOperacion").val()=="0")
			return true;
		else
			{
				var status = ValidaGrupFilial();
				if (!status)
					msjAlerta('No ha ingresado obligatorios para continuar');
				return status;	
			}
		break;
	case "2.1":
		return true;
		break;
	case "3.2":
		return true;
		break;
	case "3.1":
		return true;
		break;
	default:
		return false;
		break;
		}
}
// ========================================================================================================================================================
// Get AJAX ejemplo
// ========================================================================================================================================================
function peticionAjax(datos, RequestMapping) {
    // var datos = {
    // idCliente : idIntPe,
    // CLABE : CLABE,
    // noCuenta : noCuenta,
    // lgptvpv : lgptvpv,
    // activa : cuentaActiva,
    // bsfOperador : bsfOperador
    // }
    $.ajax({
	type : 'POST',
	data : datos,
	url : window.location.protocol + "//" + window.location.host + "/" + nomPath + RequestMapping,
	beforeSend : function() {
	    loading.modal('show');
	},
	success : function(data) {
	    loading.modal('hide');
	    // console.log(data);
	    return data;
	},
	error : function(e) {
	    console.log("Error " + e);
	    loading.modal('hide');
	    bootbox.alert({
		// size : "small",
		message : '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath
			+ 'img/messages-g.png" /></p>' + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p><center><label>¡Atención!</label><br/>'
			+ '<label>Ocurrio un error, intente de nuevo.</label></center>',
		callback : function() {
		    return "error";
		}
	    });
	}
    });
}

function PlantillaAccionista(TitleOption,TitleInput)
{
	var OpOper="AcepAlfaNumeric(this)";
	var nameElement="";
	var codRel="ACCFUN";
	var TipPuestPorc="Puesto"
	if(TitleOption=="ACCIONISTA")
	{
		OpOper="Numeros(this)";
		TipPuestPorc="Porcen"
	}
	var vPlantilla='<div   class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo   PLANTILLAPRINCIPAL  Plantilla_'+TitleOption+'">'
	+'<div class="ui-panel-content ui-widget-content" >'
	+	'<div class="row-flex">'
	+		'<div class="grid_46">'
	+		'<input type="hidden" class="codRel" value="'+codRel+'" />'
	+			'<label class="ui-outputlabel ui-widget" > Tipo de Relación</label>'
	+			'<label class="ui-outputlabel ui-widget" > '+TitleOption+'</label>'
	+			'<button  ' 
	+			'	class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
	+			'	<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
	+			'	<span class="ui-button-text ui-c">ui-button</span>'
	+			'</button>'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Nombre(s) </label> <label class="textRojo">*</label>' 
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		  type="text"   ' 
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar nombre" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="AcepAlfaNumeric(this);" />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Paterno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input  '
	+		'	 type="text" maxlength="30"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar apellido1" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="AcepAlfaNumeric(this);"   />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Materno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input  '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar apellido2" role="textbox" aria-disabled="false" aria-readonly="false"  onkeyup="AcepAlfaNumeric(this);" />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">RFC</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input name="Rfc" '
	+		'		 type="text" maxlength="13"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all RfcAccionista" role="textbox" aria-disabled="false" aria-readonly="false" onblur="RFCFisica(this)"/>'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">'+TitleInput+'</label> <label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all '+ TipPuestPorc +' CampoValidar '+TitleInput+'" role="textbox" aria-disabled="false" aria-readonly="false" onblur="'+OpOper+'" />'
	+		'</div>'
	+	'</div>'
	+	'<div class="row-flex">'
	+	'</div>'
	+'</div>'
+'</div>';
	return vPlantilla;
}

function PlanRefBancaria()
{
	var vPlantilla='<div  class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaComercial PLANTILLAPRINCIPAL">'
	+'<div class="ui-panel-content ui-widget-content">'
	+'	<div class="row-flex">'
	+'	<div class="grid_46">'
	+		'<input type="hidden" class="codRel" value="REFBAN" />'	
	+'			<label class="ui-outputlabel ui-widget" > Tipo de Relación</label>'
	+'			<label class="ui-outputlabel ui-widget" > REF. BANCARIA</label>'
	+'			<button  ' 
	+'				class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
	+'				<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
	+'				<span class="ui-button-text ui-c">ui-button</span>'
	+'			</button>'
	+'	</div>'
	+'	<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Nombre del banco </label> <label class="textRojo">*</label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar nombre" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+'	</div>	'
	+'	<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Numero de cuenta </label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all numCuenta" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+'	</div>		'
			
	+'	<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Tipo de cuenta </label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all TypCuent" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+'	</div>			'
	+'	</div>'
	+'	<div class="row-flex">'
	+'	</div>'
	+'</div>'
+'</div>';
	return vPlantilla;
}


function PlanRefComercial()
{
	var vPlantilla='<div class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaComercial PLANTILLAPRINCIPAL">'
	+'<div class="ui-panel-content ui-widget-content">'
	+'	<div class="row-flex">'
	+'		<div class="grid_46">'
	+		'<input type="hidden" class="codRel" value="REFCOM" />'
	+'				<label class="ui-outputlabel ui-widget" > Tipo de Relación</label>'
	+'				<label class="ui-outputlabel ui-widget" > REF. COMERCIAL</label>'
	+'				<button  ' 
	+'					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
	+'					<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
	+'					<span class="ui-button-text ui-c">ui-button</span>'
	+'				</button>'
	+'		</div>	'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Nombre</label> <label class="textRojo">*</label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar nombre" role="textbox" aria-disabled="false" aria-readonly="false" />'
	+'		</div>'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Giro</label>'
	+'			<div class="clear-3"></div>'
	+'			<div class="input-label-valor">'
	+'				<input type="text" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all GiroCuent" role="textbox"/>'
	+'			</div>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Domicilio</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all  DomicCuent" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Telefono</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="10" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all  TelCuent" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Relación con el cliente</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all RelacGiro" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"/>'
	+'		</div>'
	+'	</div>'
	+'	<div class="row-flex">'
	+'	</div>'
	+'</div>'
+'</div>';	
	return vPlantilla;
}

function InitChechFreConsul()
{
	$('#chFrecEspor').prop('checked', StatChechFreBool("FrecEspor"));
	$('#chFreAnual').prop('checked', StatChechFreBool("FreAnual"));
	$('#chFreMensual').prop('checked', StatChechFreBool("FreMen"));
	$('#chFreSem').prop('checked', StatChechFreBool("FreSem"));
	$('#chFreDia').prop('checked', StatChechFreBool("FreDia"));
	$('#chFormEfec').prop('checked', StatChechFreBool("IndFecEfec"));
	$('#chFormCheq').prop('checked', StatChechFreBool("IndFenChq"));
	$('#chFormTC').prop('checked', StatChechFreBool("IndFenTC"));
	$('#chFormTransf').prop('checked', StatChechFreBool("IndFenTrans"));
	$('#chFormEsp').prop('checked', StatChechFreBool("IndFenEsp"));
	$('#chTipPers').prop('checked', StatChechFreBool("IndGral"));
	$('#chTipOtro').prop('checked', StatChechFreBool("IndOtherPer"));
}

function StatChechFreBool(element)
{
	var status =false;
	if(	$("#"+element).val()=="S")
		status =true;
	return status;
}

function InitChechAltaPersonaMoral()
{
	var oFreEspo  = StatusChec("chFrecEspor");
	var oFreAnual = StatusChec("chFreAnual");
	var oFreMen   = StatusChec("chFreMensual");
	var oFreSem   = StatusChec("chFreSem");
	var oFreDia   = StatusChec("chFreDia");
	
	var oFormEfec   = StatusChec("chFormEfec");
	var oFormcheq   = StatusChec("chFormCheq");
	var oFormTC  	= StatusChec("chFormTC");
	var oFormTrans 	= StatusChec("chFormTransf");
	var oFormEsp 	= StatusChec("chFormEsp");
	
	var oTipPers 	= StatusChec("chTipPers");
	var oTipOtro 	= StatusChec("chTipOtro");
	var oIndGruEmp 	= StatusChec("chindGrpEmp");
	
	$("#indGpoFilial").val(oIndGruEmp);
	
	$("#FrecEspor").val(oFreEspo);	$("#FreAnual").val(oFreAnual);
	$("#FreMen").val(oFreMen);		$("#FreSem").val(oFreSem);
	$("#FreDia").val(oFreDia);
	
	$("#IndFecEfec").val(oFormEfec);	$("#IndFenChq").val(oFormcheq);
	$("#IndFenTC").val(oFormTC);		$("#IndFenTrans").val(oFormTrans);
	$("#IndFenEsp").val(oFormEsp);
	
	$("#IndGral").val(oTipPers); $("#IndOtherPer").val(oTipPers);
		
}

function StatusChec(element)
{
	var status="N";
	if(	$("#"+element).is(':checked'))
		status="S";
	return status;
}

function InitFieldGrupoFili()
{
	ShowMsgGrupFillial(false,"NomGrup"); 	ShowMsgGrupFillial(false,"RfcGrup");
	ShowMsgGrupFillial(false,"CobGrup");	ShowMsgGrupFillial(false,"ProdServGrup");
	ShowMsgGrupFillial(false,"NacionGrup");	ShowMsgGrupFillial(false,"PaisGrupo");
}
function ValidaGrupFilial()
{
	InitFieldGrupoFili();	
	var status=true;
	if(	$("#chindGrpEmp").is(':checked')){
		status = ShowMsgGrupFillial(true,"NomGrup");
		if(status) 
		{
				status = ShowMsgGrupFillial(true, "RfcGrup") ;
				if (status)
					status = ShowMsgGrupFillial(true, "CobGrup");
				if (status)
					status = ShowMsgGrupFillial(true, "ProdServGrup");
				if (status)
					status = ShowMsgGrupFillial(true, "NacionGrup");
				if (status)
					status = ShowMsgGrupFillial(true, "PaisGrupo");
		}
		else
		{
			status= false;
		}
	}
	
	return status;
}

function ShowMsgGrupFillial(status,elemento) {
		if (status) {
			if ($("#" + elemento).val() == "") {
				$("#" + elemento).addClass("ContenedorMensaje");
				return false;
			}
			else
				return true;
		} else {
			$("#" + elemento).removeClass("ContenedorMensaje");
		}
}


function LoadPlanRefComercialConsult(ObjComer)
{
	var vPlantilla='<div class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaComercial PLANTILLAPRINCIPAL">'
	+'<div class="ui-panel-content ui-widget-content">'
	+'	<div class="row-flex">'
	+'		<div class="grid_46">'
	+		'<input type="hidden" class="StatusEdit" value="0" />'	
	+		'<input type="hidden" class="NumSec" value="'+ObjComer.NumSec+'" />'
	+		'<input type="hidden" class="codRel" value="REFCOM" />'
	+'				<label class="ui-outputlabel ui-widget" > Tipo de Relación</label>'
	+'				<label class="ui-outputlabel ui-widget" > REF. COMERCIAL</label>'
	+'				<button  ' 
	+'					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
	+'					<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
	+'					<span class="ui-button-text ui-c">ui-button</span>'
	+'				</button>'
	
	+			'<button  ' 
	+			'	class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEditar">'
	+			'	<span class="ui-button-icon-left ui-icon ui-c ui-icon-pencil"></span>'
	+			'	<span class="ui-button-text ui-c">ui-button</span>'
	+			'</button>'
	
	+'		</div>	'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Nombre</label> <label class="textRojo">*</label>'
	+'			<div class="clear-3"></div>'
	+'			<input disabled  = "true" '
	+'				 type="text" maxlength="14" value="'+ObjComer.nombre+'" '
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar nombre" role="textbox" aria-disabled="false" aria-readonly="false" />'
	+'		</div>'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Giro</label>'
	+'			<div class="clear-3"></div>'
	+'			<div class="input-label-valor">'
	+'				<input disabled  = "true" type="text" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all GiroCuent" role="textbox" aria-disabled="false" aria-readonly="false"  value="'+ObjComer.Giro+'"  />'
	+'			</div>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Domicilio</label>'
	+'			<div class="clear-3"></div>'
	+'			<input disabled  = "true" type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all  DomicCuent" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" value="'+ObjComer.Domic+'"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Telefono</label>'
	+'			<div class="clear-3"></div>'
	+'			<input disabled  = "true" type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all  TelCuent" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" value="'+ObjComer.Tel+'""/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Relación con el cliente</label>'
	+'			<div class="clear-3"></div>'
	+'			<input disabled  = "true" type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all RelacGiro" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" value="'+ObjComer.RelCliente+'"/>'
	+'		</div>'
	+'	</div>'
	+'	<div class="row-flex">'
	+'	</div>'
	+'</div>'
+'</div>';	
	return vPlantilla;
}

function LoadPlantillaAccionistaConsult(TitleOption,TitleInput,ObjAccFunc)
{
	var OpOper="AcepAlfaNumeric(this)";
	var nameElement="";
	var codRel="ACCFUN";
	var TipPuestPorc="Puesto"
	var InpPuestPorcen =	ObjAccFunc.puesto;
	if(TitleOption=="ACCIONISTA")
	{
		OpOper="Numeros(this)";
		TipPuestPorc="Porcen"
		InpPuestPorcen= ObjAccFunc.acciona;
	}
	var vPlantilla='<div   class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo   PLANTILLAPRINCIPAL  Plantilla_'+TitleOption+'">'
	+'<div class="ui-panel-content ui-widget-content" >'
	+	'<div class="row-flex">'
	+		'<div class="grid_46">'
	+		'<input type="hidden" class="codRel" value="'+codRel+'" />'
	+		'<input type="hidden" class="NumSec" value="'+ObjAccFunc.NumSec+'" />'
	+		'<input type="hidden" class="StatusEdit" value="0" />'
	+			'<label class="ui-outputlabel ui-widget" > Tipo de Relación</label>'
	+			'<label class="ui-outputlabel ui-widget" > '+TitleOption+'</label>'
	+			'<button  ' 
	+			'	class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
	+			'	<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
	+			'	<span class="ui-button-text ui-c">ui-button</span>'
	+			'</button>'
	+			'<button  ' 
	+			'	class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEditar">'
	+			'	<span class="ui-button-icon-left ui-icon ui-c ui-icon-pencil"></span>'
	+			'	<span class="ui-button-text ui-c">ui-button</span>'
	+			'</button>'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Nombre(s) </label> <label class="textRojo">*</label>' 
	+			'<div class="clear-3"></div>'
	+		'	<input  disabled  = "true" '
	+		'		  type="text"   ' 
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar nombre" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="AcepAlfaNumeric(this);" value="'+ObjAccFunc.nombre+'"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Paterno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input  disabled  = "true" '
	+		'	 type="text" maxlength="30"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar apellido1" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="AcepAlfaNumeric(this);" value="'+ObjAccFunc.paterno+'"   />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Materno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input  disabled  = "true" '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar apellido2" role="textbox" aria-disabled="false" aria-readonly="false"  onkeyup="AcepAlfaNumeric(this);" value="'+ObjAccFunc.materno+'" />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">RFC</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input name="Rfc"  disabled  = "true" '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all RfcAccionista" role="textbox" aria-disabled="false" aria-readonly="false"  value="'+ObjAccFunc.rfc+'" />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">'+TitleInput+'</label> <label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input disabled  = "true" '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all '+ TipPuestPorc +' CampoValidar '+TitleInput+'" role="textbox" aria-disabled="false" aria-readonly="false" onblur="'+OpOper+'" value="'+InpPuestPorcen+'" />'
	+		'</div>'
	+	'</div>'
	+	'<div class="row-flex">'
	+	'</div>'
	+'</div>'
+'</div>';
	return vPlantilla;
}
