(function($){
	jQuery.fn.muneColor = function(opt){
		var ele = this;
        var win = $(window);
        var doc = $('html,body');
        
        win.scroll(function(){
            /*                console.log(win.scrollTop())*/
            if(win.scrollTop() > opt.offset){
                alert("变色");
            }else{
                alert("隐藏");
            }
        });
        
        
        if(win.scrollTop() > opt.offset){
//      	$('.goTop').show();
//          ele.css(options.animationShow);
			alert("1");
        }else{
//          ele.css(options.animationHide);
            alert("2");
        }
	}
	
}(jQuery));