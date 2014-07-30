var windowHeight = $( window ).height();

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
	//var scale = $(window).width() / ( $(window).width()-scrollbarWidth() );
	$('.archive .main-section').css( 'margin-right', -scrollbarWidth() );
	$('.single .main-section').css( 'margin-right', -scrollbarWidth() );
	
	//$('.archive .main-section').css('transform', 'scaleX(' + scale + ')' ); // distorting!
}

function cover(windowHeight) {
	//var windowHeight = $( window ).height();
	//$("body.single-format-image #cover").height( windowHeight );	
	var video = document.getElementById('video');
	$("#video").css('transform', 'translate3d(0, ' + (windowHeight - $("#video").outerHeight())/2 + 'px, 0)' );
	
	//console.log( (windowHeight - $("#video").height())/2 );
	
	console.log( windowHeight );
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

$('html').on('scroll', function() {
	//$('html, body').css('height', '100%');
});

jQuery( window ).load(function() {
	$(document).foundation();
});

jQuery( document ).ready(function() {	
	fixScrollbar();
	//fixHeights();
	cover(windowHeight);
});

var resizeId;
$( window ).resize(function() {
	clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 250);
});

function doneResizing(){
	var windowHeight = $( window ).height();
	fixScrollbar();
	//fixHeights();
	cover(windowHeight);
}