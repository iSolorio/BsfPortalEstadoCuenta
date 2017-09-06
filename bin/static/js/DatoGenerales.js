/**
 * Created by AppWhere on 23/06/2017.
 */
var Form;
$(document).ready(function()
{
    Form=$("#frmDatosGenerales");
    
    
	
	
	
   
})
function Navegacion()
{
    var txtPasoActual =$("#txtPasoActual").val();


    if(txtPasoActual=="1" || txtPasoActual=="2")
    {
        $("#btnRelacion").prop( "disabled", "disabled" );
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
function crearPDF()
{
	 var cred=document.getElementById('credito').innerHTML;
	
	 var bsfoperador=$("#BsfOperador").val();
	 var inicio=document.getElementById("fecha_inicio").innerHTML;
	 var fin=document.getElementById("fecha_fin").innerHTML;
	 var errefece=document.getElementById("rfc").innerHTML;
	 console.log(fin);
	 var ReqPDFDTO=
		 {
			 
			 rfc:errefece,
			 credito: cred,
			 fecinicio:inicio,
			 fecfin:fin,
			 BsfOperador:bsfoperador
		 };
	 $.ajax({
	        type: 'POST',
	        data: JSON.stringify(ReqPDFDTO),
	        url: './consultaPDF',
	        dataType: 'json',
	        contentType: 'application/json',
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
	        	var pdfAsDataUri = "data:application/pdf;base64,"+data.archivo;
	        	window.open(pdfAsDataUri);
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
function Generar(valor,producto)
{
	var div=document.getElementById('tabla');
	div.innerHTML="";
	 var br=document.createElement('br');
	 var cliente=document.getElementById('cliente');
	 var negritasinicio=document.createElement('b');
	 var textonegritas1=document.createTextNode('Fecha Inicio:');
	 var labelinicio=document.createElement('label');
	 var textoinicio=document.createTextNode(valor);
	 negritasinicio.appendChild(textonegritas1);
	 
	 var negritasfin=document.createElement('b');
	 var textonegritas2=document.createTextNode('Fecha Fin:');
	 var labelfin=document.createElement('label');
	 var textofin=document.createTextNode(producto.innerText);
	 negritasfin.appendChild(textonegritas2);
	 labelfin.appendChild(textofin);
	 

	 var boton= document.createElement('button');
	 boton.setAttribute("class","form-control");
	 boton.setAttribute("type","button")
	 boton.setAttribute("onclick","crearPDF()");
	 boton.setAttribute("style","width: 150px;background-color:#007cba;color:white;margin-left: 40%;" );
	 boton.innerHTML='Generar';
	 labelinicio.setAttribute("id","fecha_inicio");
	 labelfin.setAttribute("id","fecha_fin");
	 labelinicio.appendChild(textoinicio);
	 cliente.appendChild(br);
	 cliente.appendChild(negritasinicio);
	 cliente.appendChild(labelinicio);
	 cliente.appendChild(negritasfin);
	 cliente.appendChild(labelfin);
	 cliente.appendChild(br);
	 cliente.appendChild(boton);
}
function Credito(valor,producto)
{
	var div=document.getElementById('tabla');
	div.innerHTML="";
	 var cliente=document.getElementById('cliente');
	 var negritascredito=document.createElement('b');
	 var textonegritas1=document.createTextNode('Credito:');
	 var labelcredito=document.createElement('label');
	 var textocredito=document.createTextNode(valor);
	 negritascredito.appendChild(textonegritas1);
	 
	 var negritasproducto=document.createElement('b');
	 var textonegritas2=document.createTextNode('Producto:');
	 var labelproducto=document.createElement('label');
	 var textoproducto=document.createTextNode(producto.innerText);
	 negritasproducto.appendChild(textonegritas2);
	 
	 
	 labelproducto.appendChild(textoproducto);
	 labelcredito.appendChild(textocredito);
	 
	 labelcredito.setAttribute("id","credito");
	 
	 cliente.appendChild(negritascredito);
	 cliente.appendChild(labelcredito);
	 cliente.appendChild(negritasproducto);
	 cliente.appendChild(labelproducto);
	 var creditoid=valor;
	 var bsfoperador=$("#BsfOperador").val();
	var ReqCreditoDTO=
    {
    	credito: creditoid,
    	
        BsfOperador:bsfoperador
    };
	console.log(creditoid);
	console.log(valor);
	$.ajax({
        type: 'POST',
        data: JSON.stringify(ReqCreditoDTO),
        url: './consultaCredito',
        dataType: 'json',
        contentType: 'application/json',
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
        	var div=document.getElementById('tabla');
        	div.innerHTML="";
        	var table = document.createElement('table');
         	var col1= document.createTextNode('Fecha Inicio');
         	var col2= document.createTextNode('Fecha Fin');
         	var col3= document.createTextNode('Nombre');
         	
         	var th1= document.createElement('th');
         	var th2= document.createElement('th');
         	var th3= document.createElement('th');
         	
         	var trth=document.createElement('tr');
         	var tbody=document.createElement('tbody');
         	var thead=document.createElement('thead');
         	
         	trth.setAttribute("role","row");
         	trth.setAttribute("class","Encabezado");
         	
         	table.setAttribute("class","order-column pe-dynaform-grid tabla-resultados margin-top-20");
         	table.setAttribute("style","text-align: left !important; width: 836px;");
         	table.setAttribute("role","grid");
         	
         	th1.setAttribute("width","20%");
         	th1.setAttribute("class","ui-datatable");
         	th1.setAttribute("tabindex","0");
         	th1.setAttribute("aria-controls","tblBusqueda");
         	th1.setAttribute("rowspan","1");
         	th1.setAttribute("colspan","1");
         	th1.setAttribute( "aria-sort","ascending");
         	th1.setAttribute("aria-label","Credito: Activar para ordenar la columna de manera descendente");

         	th2.setAttribute("width","20%");
         	th2.setAttribute("class","ui-datatable");
         	th2.setAttribute("tabindex","0");
         	th2.setAttribute("aria-controls","tblBusqueda");
         	th2.setAttribute("rowspan","1");
         	th2.setAttribute("colspan","1");
         	th2.setAttribute( "aria-sort","ascending");
         	th2.setAttribute("aria-label","Producto: Activar para ordenar la columna de manera descendente");
         	
         	
         	th3.setAttribute("width","20%");
         	th3.setAttribute("class","ui-datatable");
         	th3.setAttribute("tabindex","0");
         	th3.setAttribute("aria-controls","tblBusqueda");
         	th3.setAttribute("rowspan","1");
         	th3.setAttribute("colspan","1");
         	th3.setAttribute( "aria-sort","ascending");
         	th3.setAttribute("aria-label","Nombre: Activar para ordenar la columna de manera descendente");
         	
         	th1.appendChild(col1);
         	th2.appendChild(col2);
         	th3.appendChild(col3);
         	trth.appendChild(th1);
         	trth.appendChild(th2);
         	trth.appendChild(th2);
         	trth.appendChild(th3);
         	thead.appendChild(trth);
         	table.appendChild(thead);
         	for (var i = 1; i < data.datosCredito.length; i++){
         	    var tr = document.createElement('tr');   
         	    
         	    tr.setAttribute("role","row");
		         	   if(i%2==0)
		   	    	{
		   	    		tr.setAttribute("class","odd");
		   	    	}
		   	    else
		   	    	{
		   	    		tr.setAttribute("class","add");
		   	    	}
         	    tr.setAttribute("style","cursor:pointer;");
         	   
         	    var td1 = document.createElement('td');
         	    var td2 = document.createElement('td');
         	    var td3= document.createElement('td');

         	    var text1 = document.createTextNode(data.datosCredito[i].fecha_INCIAL);
          	    var text2 = document.createTextNode(data.datosCredito[i].fecha_FINAL);
          	    var text3 = document.createTextNode(data.datosCredito[i].nombreto);
          	    
          	    
          	    td1.setAttribute("class","sorting_1");
          	    td1.setAttribute("id","fecha_inicio"+i);
          	    td1.setAttribute("syle","cursor:pointer;");
          	    td1.setAttribute("onclick","Generar(this.innerText,fecha_fin"+i+")")
          	    
          	    td2.setAttribute("class","sorting_1");
          	    td2.setAttribute("id","fecha_fin"+i);
          	    td2.setAttribute("style","cursor:pointer;");
         	    
          	    td3.setAttribute("class","sorting_1");
        	    td3.setAttribute("id","nombreto"+i);
        	    td3.setAttribute("style","cursor:pointer;");
          	    
          	    td1.appendChild(text1);
         	    td2.appendChild(text2);
         	    td3.appendChild(text3);
         	    
         	    tr.appendChild(td1);
         	    tr.appendChild(td2);
         	    tr.appendChild(td3);

         	    tbody.appendChild(tr);
         	}
         	table.appendChild(tbody);
         	div.appendChild(table);
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


function GetLocalidad()
{
    var id=$("#idInternoPe").val();
    var nombre=$("#nombre").val();
    var apePa=$("#apePa").val();
    var apeMa=$("#apeMa").val();
    var referencia=$("#referencia").val();
    var razon=$("#razon").val();
    var bsfoperador=$("#BsfOperador").val();
    console.log(id);
    if(id.length<=0) {
        if (nombre.length<=0 || apePa.lenght<=0 || apeMa.lenght<=0 ) {
            bootbox.alert({
                message: '<p style="overflow: hidden; float: left;" class="">' + '<img style="margin: -220px 0px -240px 0px;" src="./img/messages-g.png" /></p>'
                + '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#161;Atenci&oacute;n&#33; </p>' + '<center><label>Datos insuficientes, se necesita al menos un Id Interno o un Nombre Completo</label></center>',
                callback: function () {
                    setTimeout(function () {
                        $("#idIntenoPe").focus();
                    }, 100);
                }
            });

        }
    }
        else {
            var DatosBasicosDTO=
            {
            	idInternoPe: id,
            	nombre: nombre,
                apePa: apePa,
                apeMa: apeMa,
                referencia: referencia,
                razon: razon,
                BsfOperador:bsfoperador
            };
            console.log(GetLocalidad.BsfOperador);
            $.ajax({
                type: 'POST',
                data: JSON.stringify(DatosBasicosDTO),
                url: './consultaDatos',
                dataType: 'json',
                contentType: 'application/json',
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
                	var div=document.getElementById('tabla');
                	 var cliente=document.getElementById('cliente');
                	 var negritascliente=document.createElement('b');
                	 var textonegritas1=document.createTextNode('Cliente:');
                	 var labelcliente=document.createElement('label');
                	 var textoCliente=document.createTextNode(data.creditos.responseBansefi[0].cliente);
                	 var negritasrfc=document.createElement('b');
                	 var textonegritas2=document.createTextNode('RFC:');
                	 var labelrfc=document.createElement('label');
                	 var textoRFC=document.createTextNode(data.creditos.responseBansefi[0].rfc);
                	 var span=document.createElement('span');
                	 negritascliente.appendChild(textonegritas1);
                	 labelcliente.appendChild(textoCliente);
                	
                	 negritasrfc.appendChild(textonegritas2);
                	 labelrfc.appendChild(textoRFC);
                	 labelrfc.setAttribute("id","rfc");
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 
                	 cliente.appendChild(negritascliente);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(labelcliente);
                	 
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 
                	 cliente.appendChild(negritasrfc);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(span);
                	 cliente.appendChild(labelrfc);
                	var table = document.createElement('table');
                	var col1= document.createTextNode('Credito');
                	var col2= document.createTextNode('Producto');
                	var th1= document.createElement('th');
                	var th2= document.createElement('th');
                	var trth=document.createElement('tr');
                	var tbody=document.createElement('tbody');
                	var thead=document.createElement('thead');
                	
                	trth.setAttribute("role","row");
                	trth.setAttribute("class","Encabezado");
                	
                	table.setAttribute("class","order-column pe-dynaform-grid tabla-resultados margin-top-20");
                	table.setAttribute("style","text-align: left !important; width: 836px;");
                	table.setAttribute("role","grid");
                	
                	th1.setAttribute("width","20%");
                	th1.setAttribute("class","ui-datatable");
                	th1.setAttribute("tabindex","0");
                	th1.setAttribute("aria-controls","tblBusqueda");
                	th1.setAttribute("rowspan","1");
                	th1.setAttribute("colspan","1");
                	th1.setAttribute( "aria-sort","ascending");
                	th1.setAttribute("aria-label","Credito: Activar para ordenar la columna de manera descendente");

                	th2.setAttribute("width","20%");
                	th2.setAttribute("class","ui-datatable");
                	th2.setAttribute("tabindex","0");
                	th2.setAttribute("aria-controls","tblBusqueda");
                	th2.setAttribute("rowspan","1");
                	th2.setAttribute("colspan","1");
                	th2.setAttribute( "aria-sort","ascending");
                	th2.setAttribute("aria-label","Producto: Activar para ordenar la columna de manera descendente");
                	
                	th1.appendChild(col1);
                	th2.appendChild(col2);
                	trth.appendChild(th1);
                	trth.appendChild(th2);
                	thead.appendChild(trth);
                	table.appendChild(thead);
                	for (var i = 0; i < data.creditos.responseBansefi.length; i++){
                	    var tr = document.createElement('tr');   
                	    
                	    tr.setAttribute("role","row");
                	    if(i%2==0)
                	    	{
                	    		tr.setAttribute("class","odd");
                	    	}
                	    else
                	    	{
                	    		tr.setAttribute("class","add");
                	    	}
                	    tr.setAttribute("style","cursor:pointer;");
                	   
                	    var td1 = document.createElement('td');
                	    var td2 = document.createElement('td');

                	    var text1 = document.createTextNode(data.creditos.responseBansefi[i].credito);
                 	    var text2 = document.createTextNode(data.creditos.responseBansefi[i].producto);
                 	   
                 	    td1.setAttribute("class","texto");
                 	    td1.setAttribute("id","credito"+i);
                 	    td1.setAttribute("syle","cursor:pointer;");
                 	    td1.setAttribute("onclick","Credito(this.innerText,producto"+i+")")
                 	    
                 	    td2.setAttribute("class","texto");
                 	    td2.setAttribute("id","producto"+i);
                 	    td2.setAttribute("style","cursor:pointer;");
                	    td1.appendChild(text1);
                	    td2.appendChild(text2);
                	   
                	    tr.appendChild(td1);
                	    tr.appendChild(td2);
                	    

                	    tbody.appendChild(tr);
                	}
                	table.appendChild(tbody);
                	div.appendChild(table);
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


