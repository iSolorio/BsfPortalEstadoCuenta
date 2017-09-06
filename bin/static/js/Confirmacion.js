/**
 * Created by AppWhere on 23/06/2017.
 */
var Form;
$(document).ready(function()
{
    Form=$("#frmDatosGenerales");
    //GetLocalidad()
})


function imprimir(){
	getDocCedulaTestID(this.cliente);
}

function IrDocumentos()
{
    console.log(Bsfoper)
    $("#bsfOperador").val(Bsfoper)
    $("#bsfOperadorDTO").val(Bsfoper)
    $("#idIntPe").val(cliente)
    $("#txtTipoCedula").val(txtTipo)
    $("#titulo").val(titulo)
    $("#identificacionPM").val(identificacionPM)

    $("#formDocumentos").submit();
}

function getDocCedulaTestID(cliente) 
{
    nomPath = window.location.pathname;
    nomPath = nomPath.substring(1, nomPath.length);
    nomPath = nomPath.split("/", 1);
    nomPath = nomPath + "/";


    var ConsultaFichaDTO={
       "IdInternoPe": cliente,
        "BsfOper":Bsfoper,
        "txtTipo":txtTipo
    }
	var StrUrl = "";
    if(txtTipo=="BR"){
    	StrUrl=window.location.protocol + "//" + window.location.host + "/"+nomPath+"getDocumentCedulaTest";
    	var ConsultaFichaDTO={
    		       "IdInternoPe": cliente,
    		        "BsfOper":Bsfoper,
    		        "txtTipo":txtTipo
    		    }
    }
    else{
    	StrUrl=window.location.protocol + "//" + window.location.host + "/"+nomPath+"getDocumentCedulaMedioAltoTest";
    	var ConsultaFichaDTO={
    		       "IdInternoPe": cliente,
    		        "BsfOper":BsfoperMR,
    		        "txtTipo":txtTipo
    		    }
    }
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
