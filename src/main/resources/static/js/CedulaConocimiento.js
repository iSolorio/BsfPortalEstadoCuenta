/**
 * Created by AppWhere on 26/07/2017.
 */

$(document).ready(function(){
    Form=$("#frmCedulaConocimiento");
    $("#chkOtro1").click(function(){
        if($("#chkOtro1").is(':checked'))
        {
            $("#txtOtro").prop('readonly', false)
        }
        else
        {
            $("#txtOtro").prop('readonly', true)
            $("#txtOtro").val("")
        }
    })

    $("#chkOtroRecuersos1").click(function(){
        if($("#chkOtroRecuersos1").is(':checked'))
        {
            $("#txtOtroRecuersos").prop('readonly', false)
        }
        else
        {
            $("#txtOtroRecuersos").prop('readonly', true)
            $("#txtOtroRecuersos").val("")
        }
    })

    $("#chkOtroCuenta1").click(function(){
        if($("#chkOtroCuenta1").is(':checked'))
        {
            $("#txtOtroCuenta").prop('readonly', false)
        }
        else
        {
            $("#txtOtroCuenta").prop('readonly', true)
            $("#txtOtroCuenta").val("")
        }
    })
    $(".Titular").click(function ()
    {
        //txtCualDesempeno
        if($("#"+this.id).val()=="S")
        {
            $("#txtCualDesempeno").prop('readonly', false);
        }
        else
        {
            $("#txtCualDesempeno").prop('readonly', true);
            $("#txtCualDesempeno").val("");
        }

    })

    $(".Porcentaje").change(function () {
        if(this.id=='txtPropio')
        {
            var txtPropio=$("#txtPropio").val().replace("%")
            var Valor = 100-  parseInt(txtPropio)
            $("#txtTercero").val(Valor)
        }
        else
        {
            var txtTercero=$("#txtTercero").val().replace("%")
            var Valor = 100-  parseInt(txtTercero)
            $("#txtPropio").val(Valor)
        }
    })

    $(".Socio").click(function ()
    {
        //txtCualDesempeno
        if($("#"+this.id).val()=="S")
        {
            $("#txtCualSocio").prop('readonly', false);
            $("#txtNombre").prop('readonly', false);
        }
        else
        {
            $("#txtCualSocio").prop('readonly', true);
            $("#txtCualSocio").val("");
            $("#txtNombre").prop('readonly', true);
            $("#txtNombre").val("");
        }

    })
})

function StatusChec(element)
{
	var status="N";
	if(	$("#"+element).is(':checked'))
		status="S";
	return status;
}

function IniValCheckEnvio()
{
	$("#ChProvVentas").val(StatusChec("ChProvVentas"));
	$("#ChProvComis").val(StatusChec("ChProvComis"));
	$("#ChProvPrestamos").val(StatusChec("ChProvPrestamos"));
	$("#ChProvDonav").val(StatusChec("ChProvDonav"));
	$("#ChHorar").val(StatusChec("ChHorar"));
	$("#ChInver").val(StatusChec("ChInver"));
	$("#ChArrend").val(StatusChec("ChArrend"));
	$("#chOthr").val(StatusChec("chOthr"));
	$("#ChAporta").val(StatusChec("ChAporta"));
	$("#ChBenf").val(StatusChec("ChBenf"));
	$("#ChAdjud").val(StatusChec("ChAdjud"));
	$("#ChIngCorr").val(StatusChec("ChIngCorr"));
	$("#ChPresRec").val(StatusChec("ChPresRec"));
	$("#ChVentAct").val(StatusChec("ChVentAct"));
	$("#ChRecTerc").val(StatusChec("ChRecTerc"));
	$("#ChOthRecu").val(StatusChec("ChOthRecu"));
	$("#ChAdming").val(StatusChec("ChAdming"));
	$("#ChConce").val(StatusChec("ChConce"));
	$("#ChPagProv").val(StatusChec("ChPagProv"));
	$("#ChCuenPen").val(StatusChec("ChCuenPen"));
	$("#ChPagCred").val(StatusChec("ChPagCred"));
	$("#ChInver").val(StatusChec("ChInver"));
	$("#ChFideic").val(StatusChec("ChFideic"));
	$("#ChDepNom").val(StatusChec("ChDepNom"));
	$("#ChOtroCuent").val(StatusChec("ChOtroCuent"));
	$("#ChDepos").val(StatusChec("ChDepos"));
	$("#ChCob").val(StatusChec("ChCob"));
	$("#ChRet").val(StatusChec("ChRet"));
	$("#ChTrans").val(StatusChec("ChTrans"));
	$("#chDesem").val(StatusChec("chDesem"));
	$("#ChSocio").val(StatusChec("ChSocio"));
}

function ValidacionesExtras(Accion)
{

	IniValCheckEnvio();
    var Bandera=true;
    var Mensaje ="Error falta seleccionar una opcion de: <br/>"
    if(!$(".Provienen").is(':checked'))
    {
        Mensaje+="- Que Provienen de: <br/>"
        Bandera=false;
    }
    if(!$(".RecursosCuenta").is(':checked'))
    {
        Mensaje+="- Recursos de la cuenta:  <br/>"
        Bandera=false;
    }
    if(!$(".PretendeCuenta").is(':checked'))
    {
        Mensaje+="- Uso que Pretende Dar a su Cuenta: <br/>"
        Bandera=false;
    }

    if(($("#txtTercero").val()==""&&$("#txtPropio").val()=="")||($("#txtTercero").val()=="0"&&$("#txtPropio").val()=="0"))
    {
        Mensaje+="- Los porcentajes de la cuenta no pueden ser 0: <br/>"
    }
    if(!$(".Operaciones").is(':checked'))
    {
        Mensaje+="- Operaciones a Realizar: <br/>"
        Bandera=false;
    }

    if($("#chkDesempeno2").is(':checked')&&$("#txtCualDesempeno").val()=="")
    {
        Bandera=false;
        Mensaje+="- Especificar relaci&oacute;n funci&oacute;n Publica con el  titular : <br/>"
    }

    if($("#chkSocio2").is(':checked')&&($("#txtCualSocio").val()==""||$("#txtNombre").val()==""))
    {
        Bandera=false;
        Mensaje+="- Especificar relaci&oacute;n funci&oacute;n Publica con el socio: <br/>"
    }
    if(!Bandera) {
        bootbox.alert({
            message: '<p style="overflow: hidden; float: left;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="./img/messages-g.png" /></p>'
            + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#161;Atenci&oacute;n&#33; </p>' + Mensaje + '</label></center>'
        });
    }
    else
    {
        ValidarCampos(Accion)
    }
}