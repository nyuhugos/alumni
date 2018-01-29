jQuery(document).ready(function ($) {
	

/*
---------------------------------------------------------
INITIALIZE VARIABLES
---------------------------------------------------------
*/




/*
---------------------------------------------------------
FUNCTIONS
---------------------------------------------------------
*/


	function removeHoverCSSRuleForTouch() {
		if ('createTouch' in document) {
			try {
				var ignore = /:hover/;
				for (var i = 0; i < document.styleSheets.length; i++) {
					var sheet = document.styleSheets[i];
					if (!sheet.cssRules) {
						continue;
					}
					for (var j = sheet.cssRules.length - 1; j >= 0; j--) {
						var rule = sheet.cssRules[j];
						if (rule.type === CSSRule.STYLE_RULE && ignore.test(rule.selectorText)) {
							sheet.deleteRule(j);
						}
					}
				}
			}
			catch(e) {}
		}
	}

	function marginLeftSchedule(){
		var hlw = $('#overview').innerWidth();
		var hcw = $('#overview .container').innerWidth();
		var divideBy = hlw - hcw;
		var marginAmount = divideBy / 2;
		$('#schedule .container').css({marginLeft:marginAmount});
		$('.container-fluid-l').css({marginLeft:marginAmount});
		$('.container-fluid-r').css({marginRight:marginAmount});
	}


	function menuHideOnCLick(){
		$('#overview-menu-wrapper.mobile li a').click(function() {
			$('#overview-menu-wrapper.mobile').slideUp('normal');
		});

		$('#events-menu .menu.mobile li a').click(function() {
			$('#events-menu .menu.mobile').slideUp('normal');
		});

		$('#noevents-menu .menu.mobile li a').click(function() {
			$('#noevents-menu .menu.mobile').slideUp('normal');
		});
	}



	

/*
---------------------------------------------------------
DOM FUNCTIONS
---------------------------------------------------------
*/
	
if($('#events-menu').length){	
	$('#events-menu ul').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: ':not(.external)',
		easing: 'swing',
		begin: function() {
			$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
		},
		end: function() {
			$('#device-dummy').remove();
		},
		scrollChange: function($currentListItem) {
		}
	});
};

if($('#noevents-menu').length){	
	$('#noevents-menu ul').onePageNav({
		currentClass: 'current',
		changeHash: false,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: ':not(.external)',
		easing: 'swing',
		begin: function() {
			$('body').append('<div id="device-dummy" style="height: 1px;"></div>');
		},
		end: function() {
			$('#device-dummy').remove();
		},
		scrollChange: function($currentListItem) {
		}
	});
};

	$('#overview-menu-btn').click(function() {
		$('#overview-menu-btn').removeClass('on');
		$('#overview-menu-wrapper').slideUp('normal');
		$('#overview-menu-btn').removeClass('active');

		if($('#overview-menu-wrapper').is(':hidden') == true) {
			$('#overview-menu-wrapper').addClass('on');
			$('#overview-menu-wrapper').slideDown('normal');
			$('#overview-menu-btn').addClass('active');
		}
	});


	$('#events-menu .mobile-menu-btn').click(function() {
		$('#events-menu .mobile-menu-btn').removeClass('on');
		$('#events-menu .menu').slideUp('normal');
		$('#events-menu .menu').removeClass('on');
		$('#events-menu .mobile-menu-btn').removeClass('active');

		if($('#events-menu .menu').is(':hidden') == true) {
			$('#events-menu .menu').addClass('on');
			$('#events-menu .menu').slideDown('normal');
			$('#events-menu .mobile-menu-btn').addClass('active');
		}
	});


	$('#noevents-menu .mobile-menu-btn').click(function() {
		$('#noevents-menu .mobile-menu-btn').removeClass('on');
		$('#noevents-menu .menu').slideUp('normal');
		$('#noevents-menu .mobile-menu-btn').removeClass('active');

		if($('#noevents-menu .menu').is(':hidden') == true) {
			$('#noevents-menu .menu').addClass('on');
			$('#noevents-menu .menu').slideDown('normal');
			$('#noevents-menu .mobile-menu-btn').addClass('active');
		}
	});

	



	$(".speaker-link").click(function(e) {
		var id = $(this).attr('href');
		var offsetD = -160; //Offset of 20px

		e.preventDefault();

		$('html, body').animate({
			scrollTop: $(id).offset().top + offsetD
		}, 750);
	});

	$(".menu-link a, a.menu-link").click(function(e) {
		var id = $(this).attr('href');
		var offsetD = -60; //Offset of 20px

		e.preventDefault();

		$('html, body').animate({
			scrollTop: $(id).offset().top + offsetD
		}, 750);
	});

	//Back to top button
	// $("#bck-top").click(function(){
	// 	$("html, body").animate({ scrollTop: 0 }, "slow");
	// 	return false;
	// });


	removeHoverCSSRuleForTouch();

	$("#events-menu").sticky({ topSpacing: 0 });

	//Sticky Menu when events are present
	if($('#upcoming-event').length){

		var waypoint = new Waypoint({
			element: document.getElementById('registration'),
			handler: function(direction) {
				if (direction === 'down') {
					$('#events-menu .menu').addClass('no-register');
				} else if (direction === 'up') {
					$('#events-menu .menu').removeClass('no-register');
				}
			},
			offset : '50%'
		});

		if($('#past-events').length){

			var waypoint = new Waypoint({
				element: document.getElementById('past-events'),
				handler: function(direction) {
					if (direction === 'down') {
						$('#events-menu .menu').removeClass('no-register');
					} else if (direction === 'up') {
						$('#events-menu .menu').addClass('no-register');
					}
				}
			});

		};

	};
	
	if($('#noevents-menu').length){
		//Sticky Menu when events are not present
		var waypoint = new Waypoint({
			element: document.getElementById('past-events'),
			handler: function(direction) {
				if (direction === 'down') {
					$('#noevents-menu').fadeIn('slow');
				} else if (direction === 'up') {
					$('#noevents-menu').fadeOut('fast');
				}
			},
			offset: '50%'
		});
	};








/*
---------------------------------------------------------
WINDOW EVENTS
---------------------------------------------------------
*/

	$(window).load(function() {

		if (window.innerWidth > 775) {

		}

		marginLeftSchedule();

		if(window.innerWidth < 775){

			$('#overview-menu-wrapper').addClass('mobile');
			$('#events-menu .menu').addClass('mobile');
			$('#noevents-menu .menu').addClass('mobile');
			menuHideOnCLick();

		}

	});// End of Custom Window Load Events


	$(window).resize(function(){
		var w = $(window).width();
		if (typeof checkw == 'undefined') checkw = w;

		if (w!=checkw) {
		//console.log("The width changed from "+checkw+" to "+w);

			if (window.innerWidth > 775) {
				$('#overview-menu-wrapper').css({"display":"block"});
				$('#overview-menu-wrapper').removeClass('mobile');

				$('#events-menu .menu').css({"display":"block"});
				$('#events-menu .menu').removeClass('mobile');

				$('#noevents-menu .menu').css({"display":"block"});
				$('#noevents-menu .menu').removeClass('mobile');

			}

			if (window.innerWidth < 775) {
				$('#overview-menu-wrapper').css({"display":"none"});
				$('#overview-menu-btn').removeClass('on');
				$('#overview-menu-btn').removeClass('active');
				$('#overview-menu-wrapper').addClass('mobile');

				$('#events-menu .menu').css({"display":"none"});
				$('#events-menu .mobile-menu-btn').removeClass('on');
				$('#events-menu .mobile-menu-btn').removeClass('active');
				$('#events-menu .menu').addClass('mobile');

				$('#noevents-menu .menu').css({"display":"none"});
				$('#noevents-menu .mobile-menu-btn').removeClass('on');
				$('#noevents-menu .mobile-menu-btn').removeClass('active');
				$('#noevents-menu .menu').addClass('mobile');

				menuHideOnCLick();
			}

			checkw = w;
		}

		marginLeftSchedule();

	});




	$(window).scroll (function () {

	});// End of Window Scroll Events





/*
---------------------------------------------------------
TIME CALLS
---------------------------------------------------------
*/

	marginLeftSchedule();

	
});