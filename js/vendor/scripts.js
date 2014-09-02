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

function cover() {
	//$("body.single-format-image #cover").height( windowHeight );
	var cover = document.getElementById('cover');
	var video = document.getElementById('video');
	$("#video").css('transform', 'translate3d(0, ' + ($(cover).outerHeight() - $(video).outerHeight())/2 + 'px, 0)' );
}

/*
$("#scrollDown").click(function() {
	$('.main-section').animate({
		scrollTop: $("#content").offset().top
	}, 640, 'easeInOutExpo');
});
*/

$.fn.scrollBy = function (y) {
	return this.animate({        
		scrollTop: '+=' + y
	}, {
		duration: 1000,
		easing: 'easeInOutExpo'
	});
};

$('a[href^="#"]').on('click', function(event) {
	var target = $(this).attr("href");
	
	if( target.length ) {
		event.preventDefault();
		
		$('.main-section').stop().scrollBy( 
			$(target).offset().top - $('.header').height() 
			- ( $(window).height() -  $(target).outerHeight() - $('.header').height() * 2 ) / 2
		);
	}
});



jQuery( window ).load(function() {
	//$(document).foundation();	
	//requestAnimationFrame(function() {
		//offCanvasNav();
	//});
});

jQuery( document ).ready(function() {
	//if ( $("#content").height() > windowHeight ) {
	
		//requestAnimationFrame(function() {
			fixScrollbar();
		//});
	
	//}
	//fixHeights();
	//requestAnimationFrame(function() {
		cover();
	//});
});

var onepagescroll = document.getElementById('onepagescroll');
if ( onepagescroll != null ) {
	$("#onepagescroll").onepage_scroll({
		sectionContainer: ".post",     // sectionContainer accepts any kind of selector in case you don't want to use section
		easing: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in", 
										// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
		animationTime: 640,             // AnimationTime let you define how long each section takes to animate
		pagination: false,                // You can either show or hide the pagination. Toggle true for show, false for hide.
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
}




var resizeId;
$( window ).resize(function() {	
	clearTimeout(resizeId);
	resizeId = setTimeout(doneResizing, 250);
});

function doneResizing(){
	var windowHeight = $( window ).height();
	fixScrollbar();
	//if ( $("#content").height() > windowHeight ) {
	/*
		requestAnimationFrame(function() {
			
		});
	*/
	//}
	//fixHeights();
	//requestAnimationFrame(function() {
		cover(windowHeight);
	//});
}




/*! LazyYT (lazy load Youtube videos plugin) - v0.3.4 - 2014-06-30
* Usage: <div class="lazyYT" data-youtube-id="laknj093n" ratio="16:9" data-parameters="rel=0">loading...</div>
* Copyright (c) 2014 Tyler Pearson; Licensed MIT */
/*
 * https://github.com/tylerpearson/lazyYT
 */


;(function ($) {
    'use strict';

    function setUp($el) {
        var width = $el.data('width'),
            height = $el.data('height'),
            ratio = $el.data('ratio'),
            id = $el.data('youtube-id'),
            aspectRatio = ['16', '9'],
            paddingTop = 0,
            youtubeParameters = $el.data('parameters') || '';

        if (typeof width === 'undefined' || typeof height === 'undefined') {
          height = 0;
          width = '100%';
          aspectRatio = (ratio.split(":")[1] / ratio.split(":")[0]) * 100;
          paddingTop = aspectRatio + '%';
        }

        $el.css({
            'position': 'relative',
            'height': height,
            'width': width,
            'padding-top': paddingTop,
            'background': 'url(http://img.youtube.com/vi/' + id + '/hqdefault.jpg) center center no-repeat',
            'cursor': 'pointer',
            'background-size': 'cover'
        })
            .html('<p id="lazyYT-title-' + id + '" class="lazyYT-title"></p><div class="lazyYT-button"></div>')
            .addClass('lazyYT-image-loaded');

        $.getJSON('https://gdata.youtube.com/feeds/api/videos/' + id + '?v=2&alt=json', function (data) {
            $('#lazyYT-title-' + id).text(data.entry.title.$t);
        });

        $el.on('click', function (e) {
            e.preventDefault();
            if (!$el.hasClass('lazyYT-video-loaded') && $el.hasClass('lazyYT-image-loaded')) {
                $el.html('<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' + id + '?autoplay=1&' + youtubeParameters + '" style="position:absolute; top:0; left:0; width:100%; height:100%;" frameborder="0" allowfullscreen></iframe>')
                    .removeClass('lazyYT-image-loaded')
                    .addClass('lazyYT-video-loaded');
            }
        });

    }

    $.fn.lazyYT = function () {
        return this.each(function () {
            var $el = $(this).css('cursor', 'pointer');
            setUp($el);
        });
    };

}(jQuery));

$('.js-lazyYT').lazyYT();