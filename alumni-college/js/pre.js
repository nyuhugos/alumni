jQuery(document).ready(function ($) {
	$(window).load(function() {
		// Animate loader off screen
		setTimeout( function(){
			$(".se-pre-con").fadeOut("slow");
		}  , 900 );
	});
});