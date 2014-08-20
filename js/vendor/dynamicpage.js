$(function() {
	
    //if(Modernizr.history){

    var newHash      		= "",
        $articleContainer 	= $("#articleContainer"),
        $pageWrap    		= $("#page-wrap");
    
	$('#onepagescroll a.entry-readmore').on('click', function() {
        _link = $(this).attr("href");
        history.pushState(null, null, _link);		
        loadContent(_link);		
        return false;
    });

	$.getScript = function(url, callback){
		$.ajax({
				type: "GET",
				url: url,
				success: callback,
				dataType: "script",
				cache: true,
				error: function () {
					console.log('error loading' + url);
				}
		});
	};
	
    function loadContent(href){
		$articleContainer.load(href + " #main", function() {
			$("#content").addClass("show-article");
			
			$('#video').lazyYT();
			cover();
		});
    }
    
	
    $(window).bind('popstate', function(){
	/*
		_link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
		loadContent(_link);
	*/
		$("#content").removeClass("show-article");
    });

//} // otherwise, history is not supported, so nothing fancy here.

    
});