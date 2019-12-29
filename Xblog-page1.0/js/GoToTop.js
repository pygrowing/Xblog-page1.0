
/**
 * Created by doraqiao.
 */

(function($){
    //参数opt表示后期根据需求设置icon的css属性值
    jQuery.fn.gotoTop = function(opt){
        var ele = this;
        var win = $(window);
        var doc = $('html,body');
        var index = false;
			
        //默认icon的css属性值
        var defaultOpt = {
            offset : 420,
            speed : 500,
            iconSpeed : 200,
            animationShow : {
            	'transform' : 'translate(0,0)',
            	'transition': 'transform .5s ease-in-out'
            	},
            animationHide : {
            	'transform' : 'translate(80px,0)',
            	'transition': 'transform .5s ease-in-out'
            },
           
        };

        //将自定义icon的css属性值更新到options中
        var options = $.extend(defaultOpt,opt);

        //点击icon返回顶部
        ele.click(function(){
        	if(options.modetype == 1){
        		doc.animate({scrollTop : '0'},options.speed);
        	}else if(options.modetype == 2){
//				alert("欸！来了");
        	}
        });

        //判断icon动画样式是不是transform
        $.each(options.animationShow,function(i){
            if(i == 'transform'){
                index = true;
            }
        });

        //icon动画样式显示时
        function animateShow(){
            if(index){
                ele.css(options.animationShow);
            }else{
                ele.stop().animate(options.animationShow,options.iconSpeed);
            }
        }

        //icon动画隐藏时
        function animateHide(){
            if(index){
                ele.css(options.animationHide);
            }else{
                ele.stop().animate(options.animationHide,options.iconSpeed);
            }
        }

        //当屏幕的高度大于options.offset时，显示icon（前提是icon事先隐藏了）
        win.scroll(function(){
            /*                console.log(win.scrollTop())*/
            if(win.scrollTop() > options.offset){
                animateShow();
            }else{
                animateHide();
            }
        });

        //如果屏幕里顶部的高度大于设置的offset，则直接将icon显示出来（而不是等滚动事件发生后才显示出来）
        if(win.scrollTop() > options.offset){
//      	$('.goTop').show();
            ele.css(options.animationShow);
        }else{
            ele.css(options.animationHide);
        }
    }
}(jQuery));


window.onload = function () {
				//移动端使用touchend
    var event = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) ? 'touchend' : 'click';
    
     // 选择器
    var Q = function (id) {
        return document.getElementById(id)
    };
    
    //右
//  var _right = new mSlider({
//      dom: ".layer-right",
//      direction: "right",
//      distance:"400px"
//  });

//  Q("btnRight").addEventListener(event, function (e) {
////  	if($(".wrap").is(":hidden")){
////				     _right.open();    //如果元素为隐藏,则将它显现
////				}else{
////				      _right.close();     //如果元素为显现,则将其隐藏
////				}
//		var display =$('.mSlider-main').css('display');
//		if(display == 'none'){
////		   alert("被你发现了，我是隐藏的啦！");
//		   _right.open();
//		}else{
////			alert("这个时候应该执行隐藏");
//			 _right.close();
//		}
//          
//  })
        
}