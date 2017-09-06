/**
 * Created by AppWhere on 27/06/2017.
 */
var Form;
$(document).ready(function()
{
    Form=$("#frmDatosConstitucion");
    startDB()
    Navegacion()
    $("#CpConstitucion").focusout(function (){
        GetLocalidad($("#cboMunicipioConstitucion"),$("#CpConstitucion"))
    });
    $("#CpRegistral").focusout(function (){
        GetLocalidad($("#cboMunicipioRegistal"),$("#CpRegistral"))
    });
})

function RegresarDatosGenerales()

{
    $("#frmDatosConstitucion").attr("action","./RegresaDatosGenerales")
    $("#frmDatosConstitucion").submit();
}

function startDB() {
    try {
        dataBase = indexedDB.open('bansefi', 1);
        dataBase.onsuccess = function (e) {
            CargaCombo($("#cboTipoRegistro"),"catalogo_tipo_registro_pm",cboTipoRegistro)
            CargaCombo($("#cboIdioma"),"catalogo_idioma_pm",cboIdioma)

        };
        dataBase.onerror = function (e) {
            console.log('Error al acceder a la Base de datos.');
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: startDB: " + err.message);
    }
}
function Navegacion()
{
    var txtPasoActual =$("#TxtPasoActual").val();

    console.log(txtPasoActual)

    if(txtPasoActual=="1" || txtPasoActual=="2")
    {
        $("#btnCedula").prop( "disabled", true );
        $("#btnDocumentos").prop( "disabled", true );
    }
    else if(txtPasoActual=="3")
    {
        $("#btnCedula").prop( "disabled", true );
        $("#btnDocumentos").prop( "disabled", true );
    }
    else if(txtPasoActual=="4")
    {
        $("#btnDocumentos").prop( "disabled", true );
    }
}
function GetLocalidad(Elemento,CP)
{
    var cp=CP.val();
    if(cp.length>0) {
        if (cp.length != 5) {
            bootbox.alert({
                message: '<p style="overflow: hidden; float: left;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="./img/messages-g.png" /></p>'
                + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#161;Atenci&oacute;n&#33; </p>' + '<center><label>Formato del C&oacute;digo Postal no valido</label></center>',
                callback: function () {
                    setTimeout(function () {
                        $("#txtCodigoPostal").focus();
                    }, 100);
                }
            });

        }
        else {
            var GetLocalidad =
                {
                    CP: cp
                }
            $.ajax({
                type: 'POST',
                data: GetLocalidad,
                url: './GetLocalidad',
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
                success: function (data) {
                    bootbox.hideAll()
                    Elemento.val(data.nombLocalidadAg);

                },
                error: function () {

                    bootbox.hideAll()
                    var dialog = bootbox.alert({
                        message: '<p class="text-center">' + "No se encontro resultados con los criterios introducidos" + '</p>',
                        closeButton: true
                    });
                }
            })
        }
    }
}