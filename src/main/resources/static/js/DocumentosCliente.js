/**
 * Created by AppWhere on 23/06/2017.
 */
var Form;
var lstBorrados=[];
$(document).ready(function()
{
    Form=$("#frmDatosGenerales");
    startDB();
    $("#txtCodigoPostal").focusout(function (){
        GetLocalidad()
    });
    //GetLocalidad()
})


function startDB() {
    try {
        dataBase = indexedDB.open('bansefi', 1);
        dataBase.onsuccess = function (e) {
            CargaCombo($("#cboTipoIdentificacion"),"catalogo_tipo_de_identificacion_pm",cboTipoIdentificacion)
            CargaCombo($("#cboRazonAlta"),"catalogo_razon_alta_pm",cboRazonAlta)

            CargaCombo($("#cboEstructuraLegal"),"catalogo_estructura_legal_pm",cboEstructuraLegal)
            CargaCombo($("#cboCNAE"),"catalogo_cnae_pm",cboCNAE)
            CargaCombo($("#cboAmbito"),"catalogo_ambito_pm",cboAmbito)
            CargaCombo($("#cboSituacionEconomica"),"catalogo_situacion_economica_pm",cboSituacionEconomica)
            CargaCombo($("#cboRegimenOcupacion"),"catalogo_regimen_de_ocupacion_pm",cboRegimenOcupacion)
            CargaCombo($("#cboTipoCalle"),"catalogo_tipo_de_calle_pm",cboTipoCalle)
            CargaCombo($("#cboComprobanteDomicilio"),"catalogo_comprobante_de_domicilio_pm",cboComprobanteDomicilio)

        };
        dataBase.onerror = function (e) {
            console.log('Error al acceder a la Base de datos.');
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: startDB: " + err.message);
    }
}

function agregar(){
	
	var opc="";
	switch($("#catalogoDocumentos").val())
	{
		case "CC"://CEDLA CONOCIMIENTO
			opc='<option value="CC" selected>CEDLA. CONOCIMIENTO CLTE. PERS. MORALES</option>'
				+'<option value="CI">CREDENCIAL IFE</option>'
				+'<option value="CD">COMP. DOM. RECIBO DE LUZ</option>';
			break;
		case "CI"://CREDENCIAL IFE
			opc='<option value="CC">CEDLA. CONOCIMIENTO CLTE. PERS. MORALES</option>'
				+'<option value="CI" selected>CREDENCIAL IFE</option>'
				+'<option value="CD">COMP. DOM. RECIBO DE LUZ</option>';
			break;
		case "CD"://COMP DOM RECIBO
			opc='<option value="CC">CEDLA. CONOCIMIENTO CLTE. PERS. MORALES</option>'
				+'<option value="CI">CREDENCIAL IFE</option>'
				+'<option value="CD" selected>COMP. DOM. RECIBO DE LUZ</option>';
			break;
	}
	var StrHtml='<div class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaPersona PLANTILLAPRINCIPAL">'
		+'<div class="ui-panel-content ui-widget-content">'
		+'	<div class="row-flex">'
		+'		<div class="grid_5">'
		+'				<button  ' 
		+'					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
		+'					<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
		+'					<span class="ui-button-text ui-c">ui-button</span>'
		+'				</button>'
		+'		</div>	'
		+'<div class="grid_46">'
		+'<label class="ui-outputlabel ui-widget" > Tipo de documento</label>'
		+'<br/>'
		+'<div>'
		+'<select id="catalogoRelacionPersona" class="form-control" tabindex="-1">'
		+opc
		+'</select>'
		+'</div>'
		+'</div>'
		+'<div class="grid_46">'
		+'<label class="ui-outputlabel ui-widget">Descripci&oacute;n *</label>'
		+'<div class="clear-3"></div>'
		+'<input th:onchange="\'copiarInput(\'idInternoPe\'+${iterationStatus.count}\', this.value);'
		+'buscarIdInterno(\'+${iterationStatus.count}\', this.value);\'"'
        +'th:id="\'idCliente\'+${iterationStatus.count}" th:name="\'idCliente\'+${iterationStatus.count}" type="text" maxlength="14"'
		+'class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false" th:value="${documento.txtDescripcion}" />'
		+'</div>'
		+'	</div>'
		+'	<div class="row-flex">'
		+'	</div>'
		+'</div>'
		+'</div>';	
		
	{
		$("#contenedor-documentos").append(StrHtml);
		$('html,body').animate({ scrollTop: 9999 }, 'slow');
	}
}

function mostrarEditar(divDatos, divEditar){
	$(divDatos).hide();
	$(divEditar).show();
};

function editar(divEditar){
	var general = $(divEditar);
	var descripcion = general.find("input");
	var tipo = general.find("select");
	console.log(descripcion.val());
	console.log(tipo.val());
};

function borrar(divGeneral, idDocumento){
	$(divGeneral).hide();
	this.lstBorrados.push(idDocumento);
	console.log(this.lstBorrados);
};

function PlantillaAccionista(TitleOption,TitleInput)
{
	var vPlantilla='<div   class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo   PLANTILLAPRINCIPAL  Plantilla_'+TitleOption+'">'
	+'<div class="ui-panel-content ui-widget-content">'
	+	'<div class="row-flex">'
	+		'<div class="grid_46">'
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
	+		'		  type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Paterno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'	 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Materno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">RFC</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">'+TitleInput+'</label> <label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
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
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+'	</div>	'
	+'	<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Numero de cuenta </label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+'	</div>		'
			
	+'	<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Tipo de cuenta </label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="false"  />'
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
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all nombreprueba" role="textbox" aria-disabled="false" aria-readonly="false" />'
	+'		</div>'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Giro</label>'
	+'			<div class="clear-3"></div>'
	+'			<div class="input-label-valor">'
	+'				<input type="text" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all" role="textbox" aria-disabled="false" aria-readonly="true"  />'
	+'			</div>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Domicilio</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all porcentaje" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Telefono</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all porcentaje" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"/>'
	+'		</div>'
	+'		<div class="grid_46 " >'
	+'			<label class="ui-outputlabel ui-widget">Relación con el cliente</label>'
	+'			<div class="clear-3"></div>'
	+'			<input  type="text" maxlength="3" class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all porcentaje" role="textbox" aria-disabled="false" aria-readonly="false" onkeyup="validaCharsEsp(this);" onfocusout="noMayor100Porcentaje(this);"/>'
	+'		</div>'
	+'	</div>'
	+'	<div class="row-flex">'
	+'	</div>'
	+'</div>'
+'</div>';	
	return vPlantilla;
}

function PlanPersona()
{ 
	var vPlantilla='<div class="ui-panel ui-widget ui-widget-content ui-corner-all panel-dinamico nuevo PlantillaPersona PLANTILLAPRINCIPAL">'
	+'<div class="ui-panel-content ui-widget-content">'
	+'	<div class="row-flex">'
	+'		<div class="grid_46">'
	+'				<label class="ui-outputlabel ui-widget" > Tipo de Relación</label>'
	+'				<label class="ui-outputlabel ui-widget" > PERSONA</label>'
	+'				<button  ' 
	+'					class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only btn-icono btn-panel btn-eliminar margin-left-5 btnEliminar">'
	+'					<span class="ui-button-icon-left ui-icon ui-c ui-icon-trash"></span>'
	+'					<span class="ui-button-text ui-c">ui-button</span>'
	+'				</button>'
	+'		</div>	'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Relacion con el cliente</label> <label class="textRojo">*</label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all nombreprueba" role="textbox" aria-disabled="false" aria-readonly="false" />'
	+'		</div>'
	+'		<div class="grid_46">'
	+'			<label class="ui-outputlabel ui-widget">Id Oficial</label> <label class="textRojo">*</label>'
	+'			<div class="clear-3"></div>'
	+'			<input '
	+'				 type="text" maxlength="14"'
	+'				class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all nombreprueba" role="textbox" aria-disabled="false" aria-readonly="false" />'
	+'		</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Nombre(s) </label> <label class="textRojo">*</label>' 
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		  type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Paterno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'	 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+		'<div class="grid_46">'
	+		'	<label class="ui-outputlabel ui-widget">Apellido Materno </label><label class="textRojo">*</label>'
	+			'<div class="clear-3"></div>'
	+		'	<input '
	+		'		 type="text" maxlength="14"'
	+		'		class="ui-inputfield ui-inputmask ui-widget ui-state-default ui-corner-all CampoValidar" role="textbox" aria-disabled="false" aria-readonly="false"  />'
	+		'</div>'
	+'	</div>'
	+'	<div class="row-flex">'
	+'	</div>'
	+'</div>'
+'</div>';	
	return vPlantilla;
}