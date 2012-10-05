Zepto(function($){

	// only do this if not on a touch device
    if (!('ontouchend' in window)) {
        $(document).delegate('body', 'click', function(e) {
            $(e.target).trigger('tap');
        });
    }
    
    $('.slidemenu_btn').tap(function(event){
		slidemenu();
		return false;
	});

	$(document).touchwipe({
		 wipeLeft: function() { slidemenu(); },
		 wipeRight: function() { slidemenu(); },
		 min_move_x: 40,
		 min_move_y: 20,
		 preventDefaultEvents: false
	});

});

function slidemenu(only_close) {

	$('#slidemenu').css('top', getPageScroll()[1] + 'px');
	$('#slidemenu').height(viewport().height);

	if ($('.slidemenu_btn').attr('data-slideopen') == "false" && !only_close) {

		$('#slidemenu').show();
		
		$('#slidemenu').anim({ translateX: '160px'}, 0.1, 'ease-out');

		$('.page').anim({ translateX: '160px'}, 0.1, 'ease-out');
		
		$('.slidemenu_btn').attr('data-slideopen', "true");

	} else {

		$('#slidemenu').anim({ translateX: '-160px'}, 0.5, 'ease-out');
		$('.page').anim({ translateX: '0px'}, 0.1, 'ease-out');

		$("body").css('left', '0px');
		$('.slidemenu_btn').attr('data-slideopen', "false");
		
	}
	
}

function getPageScroll() {
    var xScroll, yScroll;
    if (self.pageYOffset) {
      yScroll = self.pageYOffset;
      xScroll = self.pageXOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) {
      yScroll = document.documentElement.scrollTop;
      xScroll = document.documentElement.scrollLeft;
    } else if (document.body) {// all other Explorers
      yScroll = document.body.scrollTop;
      xScroll = document.body.scrollLeft;
    }
    return new Array(xScroll,yScroll)
}

function viewport(){
	var e = window;
	var a = 'inner';
	if (!('innerWidth' in window)) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}