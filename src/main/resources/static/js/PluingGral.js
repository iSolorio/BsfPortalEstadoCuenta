(function ($)
{
    $.fn.TxtAceptaExpRegular = function (options)
    {
        var $this = this;
        $this.keypress(function (event)
        {

            var settings = $.extend({
                // These are the defaults.
                StrExp: "^[0-9]"
            }, options );
            
            var regex = new RegExp(settings.StrExp);
            var key = String.fromCharCode(event.which);
           
            if (!regex.test(key)) {
                return false;
            }
        });

        $this.keyup(function (event)
        {

            var settings = $.extend({
                            // These are the defaults.
                            StrExp: "^[0-9]"
                        }, options );
           var regex = new RegExp(settings.StrExp);
           //var code = event.keyCode || event.which;
          
           var key = String.fromCharCode(event.which);
           
           if (event.which == 13 ) 
 	   	   {
         	   $this.next().focus();
 	   	        return false;
 	   	   }
           
            if (!regex.test(key)) 
            {
                if (!$.isNumeric($this.val()))
                {
                    $this.val("");
                } 
                else{
                        return false;
                }
            }
        });
    }
}( jQuery ));