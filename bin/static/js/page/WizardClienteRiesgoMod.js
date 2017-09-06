//Funcion para llenar con la informacion recibida para la modificacion de las relaciones
function ReturnObjRelModificados(vObjectPlant) {
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


function CrearRelacionPersReqMod()
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

function msjAlertaMod(text) {
    bootbox.alert({
	// size : "small",
	message : '<p style="overflow: hidden; float: left; margin-left: 5%; margin-top: 3%" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="/' + nomPath + 'img/messages-g.png" /></p>'
		+ '<center><label>¡Atención!</label><br/>' + '<label>' + text + '</label></center>',
	callback : function() {

	}
    });
}
function PlantillaAccionistaMod(TitleOption,TitleInput)
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

function PlanRefBancariaMod(info)
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


function PlanRefComercialMod(info, pos)
{
	var vPlantilla='<input hidden="hidden" class="idInterno" th:value="${refComercial.idInterno}"/>'
       +'<input hidden="hidden" class="nombre" th:value="${refComercial.txtNombre}"/>'
       +'<input hidden="hidden" class="giro" th:value="${refComercial.txtGiro}"/>'
       +'<input hidden="hidden" class="tel" th:value="${refComercial.txtTel}"/>'
       +'<input hidden="hidden" class="relacion" th:value="${refComercial.txtRelacion}"/>'
       +'<input hidden="" class="tipo" value="REFCOMERCIAL"/>'
       +'<div class="row ContenedorDatos">'
       +'    <div>'
       +'        <button type="button" class="transparente">'
       +'            <span class="glyphicon glyphicon-trash"'
       +'                 th:id="${refComercial.idInterno}"'
       +'                 onclick="eliminarExistente(\'subcontenedorRefComerciales\' + this.id);"></span>'
       +'        </button>'
       +'        <button type="button" class="transparente"'
       +'               th:name="${refComercial.idInterno}"'
       +'               onclick="modificarExistente(\'subcontenedorRefComerciales\' + this.name, \'datosRefComercial\', this.name);">'
       +'            <span class="glyphicon glyphicon-pencil"></span>'
       +'        </button>'
       +'    </div>'
       +'    <div class="row" style="font-size:12px;" th:id="\'datosRefComercial\'+${refComercial.idInterno}">'
       +'        <div class="col-md-2 col-xs-2">'
       +'            <label>Tipo de relaci&oacute;n:</label>'
       +'            <br/>'
       +'            <label th:text="${refComercial.txtTipoRelacion}"></label>'
       +'        </div>'
       +'        <div class="col-md-4 col-xs-4">'
       +'            <label>Nombre:</label>'
       +'            <br/>'
       +'            <label>'+info.nombre+'</label>'
       +'        </div>'
       +'        <div class="col-md-2 col-xs-2">'
       +'            <label>Giro:</label>'
       +'            <br/>'
       +'            <label>'info.giro'</label>'
       +'        </div>'
       +'        <div class="col-md-2 col-xs-2">'
       +'            <label>Tel&eacute;fono:</label>'
       +'            <br/>'
       +'            <label>'+info.telefono+'</label>'
       +'        </div>'
       +'        <div class="col-md-2 col-xs-2">'
       +'            <label>Relaci&oacute;n con el cliente:</label>'
       +'            <br/>'
       +'            <label>'+info.relacion+'</label>'
       +'        </div>'
       +'    </div>'
       //	EDICION DE LA INFORMACION
       +'    <div class="row-flex" style="display:none;" th:id="\'datosRefComercialInput\'+${refComercial.idInterno}">'
       +'        <div class="grid_46">'
       +'            <label class="ui-outputlabel ui-widget" > Tipo de Relaci&oacute;n</label>'
       +'            <label class="ui-outputlabel ui-widget" > REF. COMERCIAL</label>'
       +'        </div>'
       +'        <input hidden="hidden" class="idInterno" th:value="${refComercial.idInterno}"/>'
       +'        <input hidden="hidden" class="tipo" th:value="REFCOMERCIAL"/>'
       +'        <div class="grid_46 contNombre">'
       +'            <label class="ui-outputlabel ui-widget">Nombre *</label>'
       +'            <div class="clear-3"></div>'
       +'            <input type="text"'
       +'                  class="nombre requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"'
       +'                  role="textbox" aria-disabled="false" aria-readonly="false"'
       +'                  value="'+info.nomrbe+'" />'
       +'        </div>'
       +'        <div class="grid_46 contGiro">'
       +'            <label class="ui-outputlabel ui-widget">Giro *</label>'
       +'            <div class="clear-3"></div>'
       +'            <input type="text"'
       +'                  class="giro requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"'
       +'                  role="textbox" aria-disabled="false" aria-readonly="false"'
       +'                  th:value="${refComercial.txtGiro}" />'
       +'        </div>'
       +'        <div class="grid_46 contTel">'
       +'            <label class="ui-outputlabel ui-widget">Tel&eacute;fono *</label>'
       +'            <div class="clear-3"></div>'
       +'            <input type="text"'
       +'                  class="tel requerido form-control Numeros ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"'
       +'                  role="textbox" aria-disabled="false" aria-readonly="false"'
       +'                  th:value="${refComercial.txtTel}" />'
       +'        </div>'
       +'        <div class="grid_46 contRel">'
       +'            <label class="ui-outputlabel ui-widget">Relaci&oacute;n con el cliente *</label>'
       +'            <div class="clear-3"></div>'
       +'            <input type="text"'
       +'                  class="rel requerido form-control ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all"'
       +'                  role="textbox" aria-disabled="false" aria-readonly="false"'
       +'                  th:value="${refComercial.txtRelacion}" />'
       +'        </div>'
       +'    </div>'
       +'</div>'
 +'      <br/>'
 +'  </div>';
	/*
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
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar nombre" role="textbox" aria-disabled="false" aria-readonly="false" value="'+info.nombre+'"/>'
	+'		</div>'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Giro</label>'
	+'			<div class="clear-3"></div>'
	+'			<div class="input-label-valor">'
	+'				<input type="text" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all GiroCuent" role="textbox" value="'+info.giro+'"/>'
	+'			</div>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Domicilio</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all  DomicCuent" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);" value="'+info.domic+'"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Telefono</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="10" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all  TelCuent" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" value="'+info.telefono+'"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Relación con el cliente</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all RelacGiro" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);" value="'+info.relacion+'"/>'
	+'		</div>'
	+'	</div>'
	+'	<div class="row-flex">'
	+'	</div>'
	+'</div>'
+'</div>';	*/
	return vPlantilla;
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
var lstRefCom[];
function llenarRelaciones(relaciones){
	var StrHtml = '';
	for(var i =0; i<relaciones.length;i++){
		
		switch(relaciones[i].codRel){
			case 'ACCFUN':{
				console.log("bla");
			}
			break;
			case 'REFBAN':{
				console.log("bla2");
				StrHtml += PlanRefBancariaMod(relaciones[i]);
			}
			break;
			case 'REFCOM':{
				console.log("bla3");
				StrHtml += PlanRefComercialMod(relaciones[i], i);
			}
			break;
		}
	}
	if (StrHtml.length > 0) {
		alert("si");
		$(document).ready(function() {
			$("#contenedor-personas").append(StrHtml);			
		})
		
	}
}
