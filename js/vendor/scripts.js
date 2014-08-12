var windowHeight = $( window ).height();

var offCanvasWrap = document.getElementById('off-canvas-wrap');

$('.left-sidenav').on('click', function leftSidenav() {
	if ($('html').hasClass('classlist')){
		offCanvasWrap.classList.toggle('move-right');
		offCanvasWrap.classList.remove('move-left');
	}
	else {
		$(offCanvasWrap).toggleClass('move-right').removeClass('move-left');
	}	
});

$('.right-sidenav').on('click', function rightSidenav() {
	if ($('html').hasClass('classlist')){
		offCanvasWrap.classList.toggle('move-left')
		offCanvasWrap.classList.remove('move-right');
	}
	else {
		$(offCanvasWrap).toggleClass('move-left').removeClass('move-right');
	}
});

$('.exit-off-canvas').on('click', function exitOffcanvas() {
	if ($('html').hasClass('classlist')){
		offCanvasWrap.classList.remove('move-left')
		offCanvasWrap.classList.remove('move-right');
	}
	else {
		$(offCanvasWrap).removeClass('move-left').removeClass('move-right');
	}
});


function scrollbarWidth() {	
	$('body').append('<div id="outerSW" style="width:50px;height:50px;overflow:hidden;position:absolute;translate3d(-200px, -200px, 0);overflow-y:scroll;"><div id="innerSW" style="height:100px;"></div>');
	var w1 = $('#outerSW').innerWidth();
	var w2 = $('#innerSW').innerWidth();
	//requestAnimationFrame(function() {
		$("#outerSW").remove();
	//});
	return (w1 - w2);
}

function fixHeights() {
	$( ".left-sidenav" ).height( windowHeight );
	$( ".left-off-canvas-menu" ).height( windowHeight );
	$( ".single .placeholder" ).height( windowHeight );
	
	document.getElementById('leftmenuIcon').style.transform = "translate3d(0, " + windowHeight/2 + "px, 0)";
	document.getElementById('rightmenuIcon').style.transform = "translate3d(0, " + windowHeight/2 + "px, 0)";
}

function fixScrollbar() {
	$('.archive .main-section').css( 'margin-right', -scrollbarWidth() );
	$('.single .main-section').css( 'margin-right', -scrollbarWidth() );
}

function cover(windowHeight) {
	//$("body.single-format-image #cover").height( windowHeight );	
	var video = document.getElementById('video');
	$("#video").css('transform', 'translate3d(0, ' + (windowHeight - $("#video").outerHeight())/2 + 'px, 0)' );
}

/*
$("#scrollDown").click(function() {
	$('.main-section').animate({
		scrollTop: $("#content").offset().top
	}, 640, 'easeInOutExpo');
});
*/

/*
$('a[href^="#"]').on('click', function(event) {
	var target = $(this).attr("href");
	
	if( target.length ) {
		event.preventDefault();
		
		$('body, .main-section').animate({
			scrollTop: $('#cover').height()
		}, 1000, 'easeInOutExpo');
	}
});
*/


jQuery( window ).load(function() {
	//$(document).foundation();	
	//requestAnimationFrame(function() {
		//offCanvasNav();
	//});
});

jQuery( document ).ready(function() {
	if ( $("#content").height() > windowHeight ) {
	
	//requestAnimationFrame(function() {
		fixScrollbar();
	//});
	
	}
	//fixHeights();
	//requestAnimationFrame(function() {
		cover(windowHeight);
	//});
});

var onepagescroll = document.getElementById('onepagescroll');
if ( onepagescroll != null ) {
	$("#onepagescroll").onepage_scroll({
		sectionContainer: ".post",     // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: "ease-in-out",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
										// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 640,             // AnimationTime let you define how long each section takes to animate
		pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
		updateURL: true,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		//beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
		//afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
		loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		//keyboard: true,                  // You can activate the keyboard controls
		responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
										// you want the responsive fallback to be triggered. For example, set this to 600 and whenever 
										// the browser's width is less than 600, the fallback will kick in.
		direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
	});
}

var resizeId;
$( window ).resize(function() {	
	clearTimeout(resizeId);
	resizeId = setTimeout(doneResizing, 250);
});

function doneResizing(){
	var windowHeight = $( window ).height();
	//if ( $("#content").height() > windowHeight ) {
	/*
		requestAnimationFrame(function() {
			fixScrollbar();
		});
	*/
	//}
	//fixHeights();
	//requestAnimationFrame(function() {
		cover(windowHeight);
	//});
}



/*
 * http://www.thecssninja.com/javascript/pointer-events-60fps
 */
/*
var body = document.body,
    timer;

window.addEventListener('scroll', function() {
	clearTimeout(timer);
	if(!body.classList.contains('disable-hover')) {
		body.classList.add('disable-hover')
	}

	timer = setTimeout(function(){
		body.classList.remove('disable-hover')
	},500);
}, false);
*/