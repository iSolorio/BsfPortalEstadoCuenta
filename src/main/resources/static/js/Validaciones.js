
var nomPath;
$(document).ready(
    function()
    {
        nomPath = window.location.pathname;
        nomPath = nomPath.substring(1, nomPath.length);
        nomPath = nomPath.split("/", 1);
        nomPath = nomPath + "/";
        //data-inputmask-regex="
        $(".RFCMoral").inputmask(
            'Regex',
            {
                regex: "^[a-zA-Z]{n+}$",
               
            });

        $(".RFCFisica").inputmask(
            'Regex',
            {
                regex: "^[a-zA-Z]{4}[0-9]{6}[0-9a-z�A-Z�]{3}$",
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
            });
        jQuery(".AlfaNumerico").keypress(
            function(tecla) {

                if ((tecla.charCode < 97 || tecla.charCode > 122) && (tecla.charCode < 65 || tecla.charCode > 90) && (tecla.charCode < 192 || tecla.charCode > 255) && (tecla.charCode != 32)
                    && (tecla.charCode < 48 || tecla.charCode > 57)&& (tecla.charCode < 45 || tecla.charCode > 46) )
                    return false;
            });
        jQuery(".Numeros").keypress(
            function(tecla) {
                if ((tecla.charCode < 47 || tecla.charCode >58 ) && (tecla.charCode < 106 || tecla.charCode >65 ) )
                    return false;
            });

        $(".btnMenuGlobal").click(function(){
            parent.irMenuGloblaPerderAvance();
        })
        $(".btnRegresar").click(function(){
            window.history.go(-1);
        })
        $.fn.datepicker.dates['es'] = {
            days: ["Domingo", "Lunes", "Martes", "Mi�rcoles", "Jueves", "Viernes", "S�bado", "Domingo"], daysShort: ["Dom", "Lun", "Mar", "Mi�", "Jue", "Vie", "S�b", "Dom"], daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"], months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"], monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"], today: "Hoy", clear: "Borrar", weekStart: 1, format: "dd/mm/yyyy"
        };

        $('.FechaCompleta').datepicker({
            autoclose: true,
            yearRange: '2017:2100',
            minDate: '01/01/2017',
            Format: "dd/mm/yyyy",
            language: "es"

        });

        $(".SelectSearch").selectpicker({
            liveSearch: true,
            maxOptions: 1
        });

        $(".Money").inputmask('decimal', {
            'integerDigits' : 13,
            'alias' : 'decimal',
            'min' : '0.00',
            'max' : '9999999999999.99',
            'groupSeparator' : ',',
            'autoGroup' : true,
            'digits' : 2,
            'placeholder' : '0.00',
            'autoUnmask' : true,
            'clearMaskOnLostFocus' : !1,
            'prefix' : '$ '
        });
        $(".Porcentaje").inputmask('numeric',
            {
                'integerDigits' : 3,
                'alias': 'numeric',
                'max' : '100',
                'groupSeparator': '',
                'autoGroup': false,
                'placeholder': '0',
                'suffix': '',
                'clearMaskOnLostFocus': !1
            });
        //parent.setFrame();

    }
)

function ValidarCampos(Accion) {
    var valido="true";
    $(".Requeridos").each(function (index) {

        //Forma de validar un radio button este seleccionado
        if ($(this).children().attr("type") == "radio") {
            if (!$('input[name="' + $(this).children().attr("name") + '"]').is(':checked')) {
                $(this).addClass('has-error')
                valido = "false";
            }
            else
                $(this).removeClass('has-error')
        }
        else {

            //Valida Los input que estan a simple vista
            if($(this).find( "input").length>0&&$(this).find( "select").length==0)
            {
                if ($(this).find( "input").val() == ""  )
                {
                    $(this).addClass('has-error')
                    valido = "false";
                }
                else
                    $(this).removeClass('has-error')
            }
            else if($(this).find( "select").length>0)
            {

                if($(this).find( "select").val() == "Null" || $(this).find( "select").val() == null)
                {
                    $(this).addClass('has-error')
                    valido = "false";
                }
                else
                    $(this).removeClass('has-error')
            }



        }
    })
    if(valido=="true")
    {
        Form.attr("action","/"+nomPath+Accion)
        Form.submit();
    }

    else
        bootbox.alert({
            message: '<p style="overflow: hidden; float: left;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="./img/messages-g.png" /></p>'
            + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#161;Atenci&oacute;n&#33; </p>' + '<center><label>Se necesita al menos el nombre completo o el Id Interno' + '</label></center>'
        });
}

function CargaCombo(Combo, nomCatalago,Valor){
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
            Combo.append('<option value="Null">SELECCIONE UN VALOR</option>');
            for (var key in elements) {
                if(Valor==elements[key].identificador)
                    Combo.append('<option value="'+elements[key].identificador+'" selected>'+elements[key].descripcion +'</option>');
                else
                    Combo.append('<option value="'+elements[key].identificador+'">'+elements[key].descripcion +'</option>');
            }
            active.close();
        };
    } catch(err) {
        console.log("Ocurri&#243; un error: loadAll: " +err.message);
    }
}

function Redireccionar(Action)
{
    Form.attr("action","/"+nomPath+Action)
    Form.submit();
}


function Regresar() {
     window.history.go(-1);
}