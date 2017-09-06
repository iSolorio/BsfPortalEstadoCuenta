/**
 * 
 */
$(document).ready(function() {
    // Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    // Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {
	// console.log("click circulo azul: "+ this.id);
	var $target = $(e.target);
	setTimeout(function() {
	    $(window).scrollTop(0);
	}, 100);
	return verificaClick(e.relatedTarget, this);
    });

    $(".next-step").click(function(e) {
	var $active = $('.wizard .nav-tabs li.active');
	nextTab($active);
    });

    $(".prev-step").click(function(e) {
	var $active = $('.wizard .nav-tabs li.active');
	prevTab($active);
    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}