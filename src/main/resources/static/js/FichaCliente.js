/**
 * Created by AppWhere on 23/06/2017.
 */
var Form;
var margen = parseInt(7);
var Altura = parseInt(10);

$(document).ready(function () {
    Form = $("#frmDatosGenerales");

    startDB();

    $('#modificacionRelacionarPersonas').click(function() {
        $("#formRelaciones").submit();
    });

    $('#tblCuentas').dataTable({
        "bFilter": true,
        aoColumns: [{
            bSortable: true,
        }, {
            bSortable: true,
        }, {
            bSortable: true,
        }, {
            bSortable: true,
        }],
        "language": {
            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros:",
            "sZeroRecords": "No se encontraron cuentas con ese filtro",
            "sEmptyTable": "No hay cuentas para este cliente",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            }
        }
    });
    // GetLocalidad()
})


function startDB() {
    try {
        dataBase = indexedDB.open('bansefi', 1);
        dataBase.onsuccess = function (e) {
// CargaCombo($("#cboTipoIdentificacion"),"catalogo_tipo_de_identificacion_pm",cboTipoIdentificacion)
// CargaCombo($("#cboRazonAlta"),"catalogo_razon_alta_pm",cboRazonAlta)
//
// CargaCombo($("#cboEstructuraLegal"),"catalogo_estructura_legal_pm",cboEstructuraLegal)
// CargaCombo($("#cboCNAE"),"catalogo_cnae_pm",cboCNAE)
// CargaCombo($("#cboAmbito"),"catalogo_ambito_pm",cboAmbito)
// CargaCombo($("#cboSituacionEconomica"),"catalogo_situacion_economica_pm",cboSituacionEconomica)
// CargaCombo($("#cboRegimenOcupacion"),"catalogo_regimen_de_ocupacion_pm",cboRegimenOcupacion)
// CargaCombo($("#cboTipoCalle"),"catalogo_tipo_de_calle_pm",cboTipoCalle)
// CargaCombo($("#cboComprobanteDomicilio"),"catalogo_comprobante_de_domicilio_pm",cboComprobanteDomicilio)
            cargaTipoIdentificacion();
            for (var i = 0; i < MODEL.lstRepresentantes.length; i++) {
                cargaTipoIdentificacionPF(i);
            }
        };
        dataBase.onerror = function (e) {
            console.log('Error al acceder a la Base de datos.');
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: startDB: " + err.message);
    }
}
//Cambia el codigio de tipo de identificación por su descripción de la PM
function cargaTipoIdentificacionPF(index) {
    try {
        var active = dataBase.result;
        var data = active.transaction(["catalogo_identificacion"], "readonly");
        var object = data.objectStore("catalogo_identificacion");
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
                if (MODEL.lstRepresentantes[index].cod_ID_EXT_PERS == elements[key].identificador) {
                    MODEL.lstRepresentantes[index].cod_ID_EXT_PERS = elements[key].descripcion;
                    break;
                }
            }
            var textIdExtPe = "(" + MODEL.lstRepresentantes[index].cod_ID_EXT_PERS + ":" + MODEL.lstRepresentantes[index].id_EXT_PE + ")";
            $("#identificacion_PF" + MODEL.lstRepresentantes[index].id_INTERNO_PE).html(textIdExtPe);
            active.close();
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: loadAll: " + err.message);
    }
}
//Cambia los codigos de tipo de identificación por su descripción de los representantes
function cargaTipoIdentificacion() {
    try {
        var active = dataBase.result;
        var data = active.transaction(["catalogo_tipo_de_identificacion_pm"], "readonly");
        var object = data.objectStore("catalogo_tipo_de_identificacion_pm");
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
                if (MODEL.txtIndicadorActa == elements[key].identificador) {
                    MODEL.txtIndicadorActa = elements[key].descripcion;
                    break;
                }
            }
            console.log(MODEL)
            $("#identificacionPM2").val(" ("+MODEL.txtIndicadorActa+":"+MODEL.txtIdActa+")")
            $("#titulo").val(MODEL.txtRazonSocial.trim() )
            var textIdExtPe = "("+MODEL.txtIndicadorActa+":"+MODEL.txtIdActa+")";
            $("#identificacionPM").html(textIdExtPe);
            console.log(textIdExtPe);
            active.close();
        };
    } catch (err) {
        console.log("Ocurri&#243; un error: loadAll: " + err.message);
    }
}
// Funcion para enviar el id del cliente a editar.
function editarCliente() {
    console.log(this.cliente);
    $("#bsfOperadorEditPM").val(bsfOperadorDTO);
    $("#idIntPersonaMoralEdit").val(this.cliente);
    $("#formEditPM").submit();
};

// Funcion para enviar el id del representante a editar.
// PARAM representante es el parametro que tiene el id del representante a
// editar.
function editarRepresentante(idRepresentante) {
    console.log(idRepresentante);
    $("#bsfOperadorEditPF").val(bsfOperadorDTO);
    $("#idIntPePersonaFisicaEdit").val(idRepresentante)
    $("#formEditPF").submit();
};
//Obtiene los documentos de la persona moral
function documentosPM() {
    $("#idIntPe").val(cliente);
    $("#bsfOperador").val(bsfOperador);
    $("#nombrePersonaMoral").val(nomCliente);
    var msg = '<div class="ui-dialog-content ui-widget-content"style="text-align: center">' + '<div class="progress-container"><div class="progress" style="height: 10px"><div class="progress-bar">'
        + '<div class="progress-shadow">' + '</div></div></div></div><br/>' + '<label class="ui-widget ui-state-default ui-corner-all">Cargando su petici&oacute;n</label></div>';
    loading = bootbox.dialog({
        message: msg,
        closeButton: false
    }).css({
        'top': '50%',
        'margin-top': function () {
            return -(($(this).height() / 2));
        }
    });
    $("#formDocumentos").submit();
}
//
function imprimeFicha() {
    console.log(MODEL);
    var doc = new jsPDF('mm', 'mm', 'letter');
    margen = parseInt(7);
    Altura = parseInt(10);
    var imgData = 'data:image/jpeg;base64, /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYI DAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkF BQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU FBQUFBT/wAARCABYASEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQF BgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEI I0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNk ZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLD xMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEB AQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJB UQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZH SElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaan qKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oA DAMBAAIRAxEAPwD9U6KKSgBaKKKAE7Unr6UdutYXi/w/L4o8P3mlw6rfaG91GY/t2msi 3EQPUoXVlB98GgmTaV0jyrx9+2L8Nfhv4ludB1TVLibULYhZhZ25lSNj/CWHcdxXO/8A DwL4Sd7zVP8AwBb/ABr5I/ak+DPww+C839maH4i8R654xmIlnjvruCSK2QnJMm2FWLN2 GfevnKvKqYmpTlbQ/M8dxDjsJXdK0Xb5n6+fCP8Aaa8FfGzW7zSfDU93LdWlv9pl+0W5 jATcF4J75NeuV+cv/BNL/kq3ir/sDj/0elfo1XbRm6kFJn2mT4ypjsJGvV3dx1FFFdB7 QUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFJuHrQAtFFFA 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 CiiigD//2Q==';
    doc.addFont('ArialNarrow-Bold', 'ArialNarrow', 'bold', 'StandardEncoding');
    doc.addFont('ArialNarrow', 'ArialNarrow', 'normal', 'StandardEncoding');

    doc.addImage(imgData, 'JPEG', margen, 5, 50, 20);
    doc.setFontSize(8);
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, 'Fecha:', 'normal', 165, 'N');
    InsertarPDF(doc, 'Hora:', 'normal', 190, '');
    InsertarPDF(doc, fechaNow, 'normal', 159, 'N');
    InsertarPDF(doc, horaNow, 'normal', 186, '');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    doc.setFontSize(16);
    InsertarPDF(doc, 'Identificación', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    doc.setFontSize(12);
    InsertarPDF(doc, 'Ficha de cliente', 'normal', 0, 'N');
    //InsertarPDF(doc, 'Pag. 1/1', 'normal', 185, '');
    InsertarPDF(doc, '____________________________________________________________________________________', 'bold', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    doc.setFontSize(10);
    InsertarPDF(doc, 'Oficina: ' + OficinaFicha, 'normal', 0, 'N');//<--------------------------oficina
    InsertarPDF(doc, 'Plaza: ' + PlazaFicha, 'normal', 0, 'N');//<--------------------------oficina
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, 'Persona Moral', 'normal', 0, 'N');
    doc.setFontSize(12);
    InsertarPDF(doc, '____________________________________________________________________________________', 'normal', 0, 'N');
    doc.setFontSize(10);
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, 'Nombre:' + MODEL.txtRazonSocial, 'normal', 0, 'N');//<--------------------------Nombre
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, 'ID Oficial: ' + MODEL.txtIndicadorActa + ' ' + MODEL.txtIdActa, 'normal', 0, 'N');//<---------Id externo
    InsertarPDF(doc, 'Teléfono: ' + MODEL.txtTel, 'normal', 120, '');//<--------------------------Teléfono
    InsertarPDF(doc, 'RFC: ' + MODEL.txtRFC, 'normal', 0, 'N');//<--------------------------RFC

    var domValidado = tamanioDomicilio(MODEL.txtDomicilio.trim());
    InsertarPDF(doc, 'Domicilio: ' + domValidado[0], 'normal', 120, '');//<--------------------------Dimicilio
    //var d = new Date(MODEL.txtFecha);
    //console.log(d.format(MODEL.txtFecha, "dd/MM/yyyy"));
    InsertarPDF(doc, 'Fecha de constitución: '+MODEL.txtFecha, 'normal', 0, 'N');//<--------------------------Fecha de constitución
    InsertarPDF(doc, domValidado[1], 'normal', 120, '');//<--------------------------extra de domicilio
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    InsertarPDF(doc, 'Representado por:', 'normal', 0, 'N');
    InsertarPDF(doc, '', 'normal', 0, 'N');
    //################################################### recorrer la lista de representantes
    for (var i = 0; i < MODEL.lstRepresentantes.length; i++) {
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, 'Nombre: ' + MODEL.lstRepresentantes[i].nomb_50, 'normal', 0, 'N');//<----------------------Nombre
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, 'ID Oficial: ' + MODEL.lstRepresentantes[i].cod_ID_EXT_PERS + ' ' + MODEL.lstRepresentantes[i].id_EXT_PE, 'normal', 0, 'N');
        var auxNull = MODEL.lstRepresentantes[i].telefono === null ? "" : MODEL.lstRepresentantes[i].telefono
        InsertarPDF(doc, 'Teléfono: ' + auxNull, 'normal', 120, '');//<------Teléfono
        InsertarPDF(doc, 'RFC: ' + MODEL.lstRepresentantes[i].id_RFC, 'normal', 0, 'N');//<--------------------------RFC
        domValidado = tamanioDomicilio(MODEL.lstRepresentantes[i].direccion);
        InsertarPDF(doc, 'Domicilio: '+domValidado[0], 'normal', 120, '');//<--------------------------Dimicilio
        InsertarPDF(doc, 'Fecha de nacimiento: '+MODEL.lstRepresentantes[i].fec_NCTO_CONST_PE, 'normal', 0, 'N');//<--------------------------Fecha de constitución
        InsertarPDF(doc, domValidado[1], 'normal', 120, '');//<--------------------------extra de domicilio
    }

    //################################################## recorrer lista de cuentas
    if (true) {//validar que tenga cuentas
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, 'No hay cuentas activas.', 'normal', 0, 'N');
    }
    for (var i = 0; i < 0; i++) {
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, 'Nombre: XXXXXXXXX XXXX XXXXXX', 'normal', 0, 'N');//<--------------------------Nombre
        InsertarPDF(doc, '', 'normal', 0, 'N');
        InsertarPDF(doc, 'ID Oficial: XXX XXXXXX', 'normal', 0, 'N');//<--------------------------Id externo
        InsertarPDF(doc, 'Teléfono: XXXXXXXXXX', 'normal', 120, '');//<--------------------------Teléfono
        InsertarPDF(doc, 'RFC: XXXXXXXXX', 'normal', 0, 'N');//<--------------------------RFC
        InsertarPDF(doc, 'Domicilio: XXXXXXXXXXXXXXXXXXXXXXXXXX', 'normal', 120, '');//<--26 carateres----Dimicilio
        InsertarPDF(doc, 'Fecha de constitución: XX/XX/XX', 'normal', 0, 'N');//<--------------------------Fecha de constitución
        InsertarPDF(doc, 'XXX XXXXXX', 'normal', 120, '');//<--------------------------extra de domicilio
    }

    var base64 = doc.output('datauristring');
    var msg1 = '<div style="height: 100% !important"> <object title="Ficha del cliente" type="application/pdf" width="100%" height="100%"  data="';
    var msg2 = '"/> </object> </div>';
    var dataHtml = msg1 + base64 + msg2;
    bootbox.alert({
        size: "large",
        message: dataHtml,
        className: "alertDoc"
    });
}

function InsertarPDF(doc, text, tipoletra, posicion, linea) {
    if (linea == 'N') {
        Altura = parseInt(Altura) + parseInt(4)
    }
    doc.setFontType(tipoletra);
    doc.text(parseInt(margen) + parseInt(posicion), Altura, text)
//console.log("Altura "+Altura)
}
//validar tamaño del domicilio
function tamanioDomicilio(domicilio) {
    var _return = ["", ""];
    if (domicilio.length <= 26) {
        _return[0] = domicilio;
        return _return;
    } else {
        var aux = "";
        var Array_domicilio = domicilio.split(" ");
        for (var i = 0; i < Array_domicilio.length; i++) {
            aux = aux + Array_domicilio[i] + " ";
            if (aux.length > 26) {
                var aux2 = "";
                aux = "";
                var jStop = i;
                for (var i = 0; i < jStop; i++) {
                    aux = aux + Array_domicilio[i] + " ";
                }
                for (var j = jStop; j < Array_domicilio.length; j++) {
                    aux2 = aux2 + Array_domicilio[j] + " ";
                }
                _return[0] = aux;
                _return[1] = aux2;
                return _return;
            }
        }
    }
}
