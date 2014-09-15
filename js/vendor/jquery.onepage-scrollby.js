jQuery.easing['jswing'] = jQuery.easing['swing'];
jQuery.extend( jQuery.easing,
{
	easeOutSine: function (x, t, b, c, d) {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
	return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
	return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
	return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
	if (t==0) return b;
	if (t==d) return b+c;
	if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
	return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});







/* ===========================================================
 * jquery-onepage-scroll.js v1.3
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

!function($){

  var defaults = {
    sectionContainer: "section",
    easing: "ease",
    animationTime: 640,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: true,
    responsiveFallback: false,
    direction : 'vertical'
	};

	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */
	/*------------------------------------------------*/

	$.fn.swipeEvents = function() {
      return this.each(function() {

        var //startX,
            startY,
            $this = $(this);

        $this.bind('touchstart', touchstart);

        function touchstart(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            //startX = touches[0].pageX;
            startY = touches[0].pageY;
            $this.bind('touchmove', touchmove);
			$this.bind('touchend', touchend);
          }
		  //event.preventDefault();
        }

        function touchmove(event) {
          var touches = event.originalEvent.touches;
          if (touches && touches.length) {
            //var deltaX = startX - touches[0].pageX;
            var deltaY = startY - touches[0].pageY;

			/*
            if (deltaX >= 50) {
              $this.trigger("swipeLeft");
            }
            if (deltaX <= -50) {
              $this.trigger("swipeRight");
            }
			*/
            if (deltaY >= 50) {
              $this.trigger("swipeUp");
            }
            if (deltaY <= -50) {
              $this.trigger("swipeDown");
            }
            if (Math.abs(deltaY) >= 50) {
              $this.unbind('touchmove', touchmove);
			       $this.unbind('touchend', touchend);
            }
          }
		  event.preventDefault();
        }
		
		function touchend(event) {
			$this.unbind('touchmove', touchmove);
			//event.preventDefault(); // prevents clicking article link...
		}

      });
    };
  



  $.fn.onepage_scroll = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        sections = $(settings.sectionContainer)
        total = sections.length,
        status = "off",
        topPos = 0,
        leftPos = 0,
        lastAnimation = 0,
        quietPeriod = 250,
        paginationList = "";
		scrollDownAmount = 0;
		scrollDownAmountWhenRefreshed = 0;


	$.fn.scrollBy = function (y) {
		return this.animate({        
			scrollTop: '+=' + y
		}, {
			duration: 1000,
			easing: 'easeInOutExpo'
		});
	};
    
	$.fn.moveDown = function() {
		scrollDownAmount = scrollDownAmount + 1;
		
		var el = $(this);
		el.stop().scrollBy(el.height()); //down

		if ( !($('body').hasClass('page-template-page-gallery-php')) )
			if ( scrollDownAmount % 5 == 4	& scrollDownAmount != 0) {
				if ( scrollDownAmountWhenRefreshed < scrollDownAmount ) {
					window.infiniteScroll.scroller.refresh();
					bindAnchor();
					scrollDownAmountWhenRefreshed = scrollDownAmount;
				}
			}
	}

	$.fn.moveUp = function() {
		if ( scrollDownAmount > 0 )
			scrollDownAmount = scrollDownAmount - 1;
		var el = $(this);
		el.stop().scrollBy(-el.height()); //up
	}


    function init_scroll(event, delta) {	
        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        // Cancel scroll if currently animating or within quiet period
        if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
          el.moveDown()
        } else {
          el.moveUp()
        }
        lastAnimation = timeNow;
    }

    el.swipeEvents().bind("swipeDown",  function(event){
      event.preventDefault();
      el.moveUp();
    }).bind("swipeUp", function(event){
      event.preventDefault();
      el.moveDown();
    });


    $("#onepagescroll").bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
		event.preventDefault();
		var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
		if(!$("body").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
    });
		
	$(window).on('resize', function() {
		el.stop().scrollTop(el.height() * scrollDownAmount );
	});
	
	
	
	
	$(document).keydown(function(e) {
		var tag = e.target.tagName.toLowerCase();

		{
		  switch(e.which) {
			case 37:
			  if (tag != 'input' && tag != 'textarea') el.moveUp()
			break;
			case 39:
			  if (tag != 'input' && tag != 'textarea') el.moveDown()
			break;
			case 38:
			  if (tag != 'input' && tag != 'textarea') el.moveUp()
			break;
			case 40:
			  if (tag != 'input' && tag != 'textarea') el.moveDown()
			break;
			case 33: //page up
			  if (tag != 'input' && tag != 'textarea') el.moveUp()
			break;
			case 34: //page dwn
			  if (tag != 'input' && tag != 'textarea') el.moveDown()
			break;
			/*
			case 36: //home
			  el.moveTo(1);
			break;
			case 35: //end
			  el.moveTo(total);
			break;
			*/
			default: return;
		  }
		}

	});

    return false;
  }
}(window.jQuery);