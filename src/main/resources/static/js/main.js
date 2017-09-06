var ajaxStatusTimeout = undefined;
var specialChars = [];
var charReplacer = '#';

(function($) {

	$(document).ready(function ($) {
	    var isLateralNavAnimating = false;
	
	    //abrir y cerrar navegaci�n lateral
	    $('.cd-nav-trigger').on('click', function (event) {
	        event.preventDefault();
	        //stop if nav animation is running 
	        if (!isLateralNavAnimating) {
	            if ($(this).parents('.csstransitions').length > 0) isLateralNavAnimating = true;
	
	            $('body').toggleClass('navigation-is-open');
	            $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
	                //animation is over
	                isLateralNavAnimating = false;
	            });
	        }
	    });

	    if ( $( "form" ).length > 0 ) {
	        $("form").each(function() {
	        	 $("input:text:visible:first").focus();
	        });
	    }
	    
	    //quitar autocomplete en todos los formularios
	    if ( $( "form" ).length > 0 ) {
	        $("form").each(function() {
	        	  $(this).attr("autocomplete","off");
	        	  $(this).attr("autocorrect","off");
	        	  $(this).attr("spellcheck","false");
	        });
	    }
	    
	    $(document).on("keydown", function (e) {
	    	if([13,17,112,113,114,115,116,117,118,119,120,122,123,124,125,126].indexOf(e.which) != -1){
	    		e.preventDefault();
	    		return false;
	    	}
	    	if (e.which === 8 && (!$(e.target).is("input, textarea") || $(e.target).is("input[type='checkbox']") || $(e.target).is("input[readonly='readonly']") ) ) {	   	
	    		e.preventDefault();
	    		}
	        if (e.ctrlKey &&  e.keyCode === 82) {
	        	return false;
	        } 
	    });
	   
	    //establecer tama�o m�nimo de la ventana
	    if ( $( "main" ).length > 0 ) {
	    	$("main").css("min-height",$(window).height());	    
	    }
	    
	    $("main").on("keydown", function(){applyInputValidator()})
	    
	});
}(jQuery))

//funcion para ocultar y mostrar la toolbox
$(function() {
	$('.icon').click(function() {
		$('.toolbox').toggleClass('tool-300');
	});
});

//funcion para cambiar el hover del bot�n del menu global
$(function() {
	$('.cd-nav-trigger').click(function() {
		$('.cd-nav-trigger').toggleClass('ocultar-menu');
	});
});

String.prototype.removeDiacritics = function() {
	var diacritics = [
	    [/[\300-\306]/g, 'A'],
	    [/[\310-\313]/g, 'E'],
	    [/[\314-\317]/g, 'I'],
	    [/[\322-\330]/g, 'O'],
	    [/[\331-\334]/g, 'U'],
	    [/[\307]/g, 'C']
	];
	var s = this.toUpperCase();
	for (var i = 0; i < diacritics.length; i++) {
	    s = s.replace(diacritics[i][0], diacritics[i][1]);
	}
	return s;
}

/**
 * Funi�n llamada antes de cambiar de pantalla para mostrar la carga de la 
 * siguiente ventana 
 */
window.onbeforeunload = function(e) {
	PF('redirectDialog').show();
}