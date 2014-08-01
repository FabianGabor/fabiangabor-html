var windowHeight = $( window ).height();

function offCanvasNav() {
	$('.left-sidenav').on('click', function() {
		$('.off-canvas-wrap').toggleClass('move-right').removeClass('move-left');
	});
	
	$('.right-sidenav').on('click', function() {
		$('.off-canvas-wrap').toggleClass('move-left').removeClass('move-right');
	});
	
	$('.exit-off-canvas').on('click', function() {
		$('.off-canvas-wrap').removeClass('move-left').removeClass('move-right');
	});
}

function scrollbarWidth() {
	//var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
	var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;translate3d(-200px, -200px, 0);"><div style="height:100px;"></div>');
	// Append our div, do our calculation and then remove it
	$('body').append(div);
	var w1 = $('div', div).innerWidth();
	div.css('overflow-y', 'scroll');
	var w2 = $('div', div).innerWidth();
	$(div).remove();
	return (w1 - w2);
}

function fixHeights() {
	//var windowHeight = $( window ).height();
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
	//var windowHeight = $( window ).height();
	//$("body.single-format-image #cover").height( windowHeight );	
	var video = document.getElementById('video');
	$("#video").css('transform', 'translate3d(0, ' + (windowHeight - $("#video").outerHeight())/2 + 'px, 0)' );
}


$("#scrollDown").click(function() {
	$('html, body').animate({
		scrollTop: $("#content").offset().top
	//}, 1000, 'easeInOutExpo');
	}, 1000);
});

/*
$('a[href^="#"]').on('click', function(event) {
	var target = $(this).attr("href");
	
	if( target.length ) {
		//event.preventDefault();
		
		$('html, body').animate({
			scrollTop: $(target).offset().top
		}, 1000);
	}
	
	//console.log( $(target).offset().top );
	console.log("click");
});
*/


jQuery( window ).load(function() {
	//$(document).foundation();	
	offCanvasNav();
});

jQuery( document ).ready(function() {
	//if ( $("#content").height() > windowHeight ) {
		fixScrollbar();
	//}
	//fixHeights();
	cover(windowHeight);	
	
	$("#onepagescroll").onepage_scroll({
		sectionContainer: "figure",     // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: "ease-in-out",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
										// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 640,             // AnimationTime let you define how long each section takes to animate
		pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
		updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
		//beforeMove: function(index) {},  // This option accepts a callback function. The function will be called before the page moves.
		//afterMove: function(index) {},   // This option accepts a callback function. The function will be called after the page moves.
		loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
		//keyboard: true,                  // You can activate the keyboard controls
		responsiveFallback: false,        // You can fallback to normal page scroll by defining the width of the browser in which
										// you want the responsive fallback to be triggered. For example, set this to 600 and whenever 
										// the browser's width is less than 600, the fallback will kick in.
		direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
	});
});

var resizeId;
$( window ).resize(function() {
	clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

function doneResizing(){
	var windowHeight = $( window ).height();
	if ( $("#content").height() > windowHeight ) {
		fixScrollbar();
	}
	//fixHeights();
	cover(windowHeight);
}