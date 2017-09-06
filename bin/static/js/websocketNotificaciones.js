var ws = undefined;
var socketPath = "ws://"+ document.location.host + document.location.pathname.substring(0, document.location.pathname.indexOf("faces")-1) +"/notificaciones";

$(function() {
    if (window.WebSocket) {
        ws = new WebSocket(socketPath);
        
        $(window).unload(function () {
                ws.close();
                ws = null
            }
        );      
    
        // listen for messages from server using standard syntax
        ws.onmessage = function (event) {
       		$("#msgsForm\\:hdnParam").val(event.data);
       		$("#msgsForm\\:hdnBtn").click();
        };
        
        ws.onerror = function (event) {
               alert('ERROR'+event);
        };
    } else {
    	 alert('ERROR: websockets not supported by browser');
    }

});

function enviarNotificacion(msj){
	ws.send(msj);
}
