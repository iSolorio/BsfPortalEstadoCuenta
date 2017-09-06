jQuery(document).ready(function($){

		  // quick search regex
		  var qsRegex;
		  
		  // init Isotope
		  var $grid = $('.grid').isotope({
		    itemSelector: '.element-item',
		    columWidth: 30,
		    layoutMode: 'masonry',
		    filter: function() {
		    	var title = $(this).find(".element-title").find("label").text();
		    	if(title.startsWith("B") && title.slice(2) == "SQUEDAS"){
		    		return true;
		    	}
		    	$(this).find(".element-item-child").each(function( index ) {
		    		$(this).text().match( qsRegex )?$(this).removeClass("element-item-hidden").addClass("element-item-visible"):$(this).removeClass("element-item-visible").addClass("element-item-hidden");
		    	});
		    	if( $(this).find(".element-item-child.element-item-visible").size()>0 ){
		    		if( $(this).find(".element-container").css("display") == "none" ){
		    			$(this).find(".element-container").slideToggle( "slow" );
		    			 if($(this).find(".ui-icon-triangle-1-s").size()>0){
		   				  $(this).find(".ui-icon-triangle-1-s").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
			   			 }else if($(this).find(".ui-icon-triangle-1-e").size()>0){
			   				  $(this).find(".ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
			   			 }
		    		}
		    	}
		    	return qsRegex ? $(this).find(".element-item-child.element-item-visible").size()>0 : true;
		    }
		  });
		  var $grid2 = $('.grid').masonry({
			  columnWidth: 20
			});
		  
		  $grid2.on( 'click', '.element-title', function() {
			  $(this).parent().find(".element-container").slideToggle( "fast" );
			  if($(this).find(".ui-icon-triangle-1-s").size()>0){
				  $(this).find(".ui-icon-triangle-1-s").removeClass("ui-icon-triangle-1-s").addClass("ui-icon-triangle-1-e");
			  }else if($(this).find(".ui-icon-triangle-1-e").size()>0){
				  $(this).find(".ui-icon-triangle-1-e").removeClass("ui-icon-triangle-1-e").addClass("ui-icon-triangle-1-s");
			  }
			  // trigger layout after item size changes
			  setInterval("$('.grid').masonry('layout');", 50);
			});

		  // use value of search field to filter
		  var $quicksearch = $('.quicksearch').keyup( debounce( function() {
		    qsRegex = new RegExp( $quicksearch.val(), 'gi' );
		    $grid.isotope();
		  }, 200 ) );

});

//debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    timeout = setTimeout( delayed, threshold || 100 );
  }
}

