(function($,undefined){

	$.fn.pyComment = function(options,param){
		var otherArgs = Array.prototype.slice.call(arguments, 1);
		if (typeof options == 'string') {
			var fn = this[0][options];
			if($.isFunction(fn)){
				return fn.apply(this, otherArgs);
			}else{
				throw ("pyComment - No such method: " + options);
			}
		}

		return this.each(function(){
			var para = {};    // 保留参数
			var self = this;  // 保存组件对象
			var fCode = 0;
			
			var defaults = {
					"agoComment":[],  // 以往评论内容
					"callback":function(comment){
						console.info("返回评论数据");
						console.info(comment);
					}
			};
			
			para = $.extend(defaults,options);
			
			this.init = function(){
				this.addReplyCommentFrom();
				this.createAgoCommentHtml();  // 创建以往评论的html
			};
			
			/**
			 * 功能： 创建回复框
			 */
			this.addReplyCommentFrom = function(){
				var boxHtml = '';
//				boxHtml += '<div class="wp">';
				boxHtml += '	<h2 class="comments-title">4条评论</h2>';
				boxHtml += '	<div id="respond" class="comment-respond">';
				boxHtml += '		<h3 id="reply-title" class="comment-reply-title"><small><a rel="nofollow" id="cancel-comment-reply-link" href="#" style="display: none;">取消回复</a></small></h3>';
				boxHtml += '		<form id="commentform" class="comment-form"  target="nm_iframe">';
				boxHtml += '			<div class="author-info guest"><img src="img/none.png" width="100" class="avatar" title="" style=""></div>';
				boxHtml += '			<div class="comment-form-main">';
				boxHtml += '				<div class="comment-textarea-wrapper">';
				boxHtml += '					<p class="comment-form-comment"><label for="comment">评论</label> <textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" required="required" placeholder="评论…"></textarea></p>';
				boxHtml += '					<div class="comment-form-toolbar">';
				boxHtml += '						<i class="icon-smilies" title="表情" data-track="CommentForm,Click,Smilies"></i>';
				boxHtml += '						<div class="comment-smilies"><img class="emoji" src="./emoji/1f642.png" alt=":smile:" draggable="false"><img class="emoji" src="./emoji/1f641.png" alt=":sad:" draggable="false"><img class="emoji" src="./emoji/1f633.png" alt=":oops:" draggable="false"><img class="emoji" src="./emoji/1f62f.png" alt=":shock:" draggable="false"><img class="emoji" src="./emoji/1f62e.png" alt=":o" draggable="false"><img class="emoji" src="./emoji/1f625.png" alt=":cry:" draggable="false"><img class="emoji" src="./emoji/1f621.png" alt=":x" draggable="false"><img class="emoji" src="./emoji/1f61b.png" alt=":razz:" draggable="false"><img class="emoji" src="./emoji/1f615.png" alt=":???:" draggable="false"><img class="emoji" src="./emoji/1f610.png" alt=":|" draggable="false"><img class="emoji" src="./emoji/1f60e.png" alt=":cool:" draggable="false"><img class="emoji" src="./emoji/1f609.png" alt=";-)" draggable="false"><img class="emoji" src="./emoji/1f608.png" alt=":twisted:" draggable="false"><img class="emoji" src="./emoji/1f606.png" alt=":lol:" draggable="false"><img class="emoji" src="./emoji/1f600.png" alt=":grin:" draggable="false"></div>';
				boxHtml += '					</div>';
				boxHtml += '				</div>';
				boxHtml += '				<div class="comment-form-fields" style="display: none;">';
				boxHtml += '					<p class="comment-form-author"><label for="author">昵称</label> <span class="required">*</span><input id="author" name="author" type="text" value="" size="30" aria-required="true" required="required" placeholder="昵称"></p>';
				boxHtml += '					<p class="comment-form-email"><label for="email">邮箱</label> <span class="required">*</span><input id="email" name="email" type="email" value="" size="30" aria-describedby="email-notes" aria-required="true" required="required" placeholder="邮箱"></p>';
				boxHtml += '					<p class="comment-form-url"><label for="url">网站</label> <input id="url" name="url" type="url" value="" size="30" placeholder="网站"></p>';
				boxHtml += '					<p><input id="sortID" type="text" value="0" size="30"  style="display:none"></p>';
				boxHtml += '					<p><input id="sortName" type="text" value="0" size="30"  style="display:none"></p>';
				boxHtml += '				</div>';
				boxHtml += '				<p class="form-submit"><button name="submit" type="submit" id="submit" class="submit" title="发表评论"><span class="icon"></span></button> <input type="hidden" name="comment_post_ID" value="1020" id="comment_post_ID">';
				boxHtml += '					<input type="hidden" name="comment_parent" id="comment_parent" value="0">';
				boxHtml += '				</p>';
				boxHtml += '			</div>';
				boxHtml += '			<div class="comment-form-extra">';
				boxHtml += '				<p class="labelText"><input type="checkbox" name="comment_mail_notify" id="comment_mail_notify" value="comment_mail_notify" checked="checked" style="width: auto;"><label for="comment_mail_notify">有人回复时邮件通知我</label></p>';
				boxHtml += '			</div>';
				boxHtml += '		</form>';
				boxHtml += '        <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>';
				boxHtml += '	</div>';
//				boxHtml += '	<div class="comments-container"></div>';
//				boxHtml += '</div>';
				
				$(".comments-container").before(boxHtml);
			};
			
			/**
			 * 功能：创建以往评论的html
			 * 参数: 无
			 * 返回: 无 
			 */
			this.createAgoCommentHtml = function(){
				var dateNum=para.agoComment.length;
				var html = '';
				if(dateNum==0){
					html += '<div class="comment_img"></div>';
					html += '<a class="comment_text" > ╮(╯﹏╰。)╭&nbsp;&nbsp;&nbsp;&nbsp;评论都没有,要不您来一条！</a>';
				}else{
					html += '<ul id="comments-list" class="comments-list">';
					html += '</ul>';
				}
				
				$(self).append(html);
				
				$.each(para.agoComment, function(k, v){
					
					var topStyle = "";
					if(k>0){
						topStyle = "topStyle";
					}
					
					var item = '';
					if(v.sortID==0){
						item += '<li id="comment'+v.id+'">';
					}else{
						item += '<li id="comment'+v.id+'" class="comments">';
					}
					item += '	<div class="comment-main-level"  id="div-comment-'+v.id+'" selfID="'+v.id+'">';
					item += '		<div class="comment-avatar" ><img src="'+v.image_src+'" alt=""></div>';
					item += '		<div class="comment-box" >';
					item += '			<div class="comment-head">';
					if(v.userRank==0){
						item += '				<h6 class="comment-name by-author"><a href="'+v.blog_src+'">'+v.userName+'</a></h6>';
					}else{
						if(v.blog_src==null ||v.blog_src==undefined||v.blog_src=="" ){
							item += '				<h6 class="comment-name by-nosrc"><a href="javascript:return false;">'+v.userName+'</a></h6>';
						}else{
							item += '				<h6 class="comment-name"><a href="'+v.blog_src+'">'+v.userName+'</a></h6>';
						}
					}
					if(v.sortID!=0){
						item +='<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12"><path d="M1.664 902.144s97.92-557.888 596.352-557.888V129.728L1024 515.84l-425.984 360.448V628.8c-270.464 0-455.232 23.872-596.352 273.28"></path></svg>';
						item += '				<h6 class="comment-name"><a class="comment-reply" href="'+v.blog_src+'">'+v.sortName+'</a></h6>';
					}
					item += '<span class="comment-item-bullet"> • </span>'
					item += '				<span>'+v.time+'</span>';
					item += '				<i class="material-icons md-15 reply" title = "回复" selfID="'+v.id+'" onclick="return addComment.moveForm( &quot;div-comment-'+v.id+'&quot;, &quot;'+v.id+'&quot;, &quot;respond&quot;, &quot;1020&quot;, &quot;'+v.userName+'&quot;)" >reply</i>';
//					item += '				<i class="material-icons md-15" id="reply" title = "回复" selfID="'+v.id+'" >reply</i>';
					item += '			</div>';
					item += '			<div class="comment-content">'+v.content+'</div>';
					item += '		</div>';
					item += '	</div>';
					item += '</li>';
					
					// 判断此条评论是不是子级评论
					if(v.sortID==0){  // 不是
						$("#comments-list").append(item);
					}else{  // 否
						// 判断父级评论下是不是已经有了子级评论
						if(!($("#comment"+v.sortID).hasClass('comments'))){  // 没有
//							alert($("#comment"+v.sortID).find(".comments").size());
							var comments = '';
							comments += '<ul class="comments-list reply-list comments'+v.sortID+'" >';
							comments += 	item;
							comments += '</ul>';
							
							$("#comment"+v.sortID).append(comments);
						}else{  // 有
							$("#comment"+v.sortID).after(item);
						}
					}
					
					if(k==dateNum-1){
//						alert('加载更多');
						var moreText = '';
						moreText += '<a id="more" data-status="1" class="loadmore" >更多评论</a>';
						moreText += '<input type="hidden" id="page" value="1" />';
						$(".comments-container").after(moreText);
					}
				});
				
				// 初始化html之后绑定点击事件
	            this.addEvent();
			};
			
			/**
			 * 功能：绑定事件
			 * 参数: 无
			 * 返回: 无
			 */
			this.addEvent = function(){
				// 绑定item上的回复事件
				this.replyClickEvent();
				//取消按钮事件绑定
				this.quitClickEvent();
			};
			//分页加载
			this.replyClickEvent = function(){
				// 绑定回复按钮点击事件
				$("#more").click(function () {
//					alert("哈！");
					var page = parseInt($("#page").val());  
				       $(this).html("加载中...");  
				       status=$(this).attr("data-status");  
				       if(status==1) {  
				           status = $(this).attr("data-status", "0");  
				           $.ajax({  
				//		        type: "post",  
								type:"GET",
				               	url: "test.json",  
				               	data: "page=" + page,  
				              	dataType: "json",  
				               	success: function (data) {  
				//		                       data = data.data;  
				                   /*数据不够10条隐藏按钮*/
				                 
				                   if (Object.keys(data).length < 10 || Object.keys(data).length == 0) {  
				                       $(".loadmore").hide();
				                       var noText = '';
				                       noText += '<a class="noMore">╰(￣▽￣)╮我是有底线的...</a>';
									   $(".comments-container").after(noText);
				                   } else {  
				                       $("#page").val(page + 1);//记录页码  
				                    }  
				                    insertDiv(data);  
				                }  
				            });  
				        } 
				});
				function insertDiv(data){  
//					alert(Object.keys(data).length);
		           var information = $("#comments-list");  
		           var html = '';  
		           for (var i = 0; i < data.length; i++) {  
					var item = '';
					if(data[i].sortID==0){
						item += '<li id="comment'+data[i].id+'">';
					}else{
						item += '<li id="comment'+data[i].id+'" class="comments">';
					}
					item += '	<div class="comment-main-level"  id="div-comment-'+data[i].id+'" selfID="'+data[i].id+'">';
					item += '		<div class="comment-avatar" ><img src="'+data[i].image_src+'" alt=""></div>';
					item += '		<div class="comment-box" >';
					item += '			<div class="comment-head">';
					if(data[i].userRank==0){
						item += '				<h6 class="comment-name by-author"><a href="'+data[i].blog_src+'">'+data[i].userName+'</a></h6>';
					}else{
						if(data[i].blog_src==null ||data[i].blog_src==undefined||data[i].blog_src=="" ){
							item += '				<h6 class="comment-name by-nosrc"><a href="javascript:return false;">'+data[i].userName+'</a></h6>';
						}else{
							item += '				<h6 class="comment-name"><a href="'+data[i].blog_src+'">'+data[i].userName+'</a></h6>';
						}
					}
					if(data[i].sortID!=0){
						item +='<svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="12"><path d="M1.664 902.144s97.92-557.888 596.352-557.888V129.728L1024 515.84l-425.984 360.448V628.8c-270.464 0-455.232 23.872-596.352 273.28"></path></svg>';
						item += '				<h6 class="comment-name"><a class="comment-reply" href="'+data[i].blog_src+'">'+data[i].sortName+'</a></h6>';
					}
					item += '<span class="comment-item-bullet"> • </span>'
					item += '				<span>'+data[i].time+'</span>';
					item += '				<i class="material-icons md-15 reply" title = "回复" selfID="'+data[i].id+'" onclick="return addComment.moveForm( &quot;div-comment-'+data[i].id+'&quot;, &quot;'+data[i].id+'&quot;, &quot;respond&quot;, &quot;1020&quot; , &quot;'+data[i].userName+'&quot;)" >reply</i>';
//					item += '				<i class="material-icons md-15" id="reply" title = "回复" selfID="'+data[i].id+'" >reply</i>';
					item += '			</div>';
					item += '			<div class="comment-content">'+data[i].content+'</div>';
					item += '		</div>';
					item += '	</div>';
					item += '</li>';
					
					// 判断此条评论是不是子级评论
					if(data[i].sortID==0){  // 不是
						$("#comments-list").append(item);
					}else{  // 否
						// 判断父级评论下是不是已经有了子级评论
						if(!($("#comment"+data[i].sortID).hasClass('comments'))){  // 没有
//							alert($("#comment"+data[i].sortID).find(".comments").size());
							var comments = '';
							comments += '<ul class="comments-list reply-list comments'+data[i].sortID+'" >';
							comments += 	item;
							comments += '</ul>';
							
							$("#comment"+data[i].sortID).append(comments);
						}else{  // 有
							$("#comment"+data[i].sortID).after(item);
						}
					}
		           }  
		           $("#more").html("加载更多");  
		           $("#more").attr("data-status","1");  
//		           alert($("#page").val());
		       }
			};
			
			
			this.quitClickEvent = function(){
				$("#cancel-comment-reply-link").click(function () {
					$("#sortID").val("0")
					$("#sortName").val("0")
				});
			};
			
			
			// 初始化上传控制层插件
//			alert("1");
			this.init();
		});		
	};
	
})(jQuery);

var addComment = {
	moveForm: function(a, b, c, d,name) {
		$("#sortID").val(b)
		$("#sortName").val(name)
		var e, f, g, h, i = this,
			j = i.I(a),
			k = i.I(c),
			l = i.I("cancel-comment-reply-link"),
			m = i.I("comment_parent"),
			n = i.I("comment_post_ID"),
			o = k.getElementsByTagName("form")[0];
		if(j && k && l && m && o) {
			i.respondId = c, d = d || !1, i.I("wp-temp-form-div") || (e = document.createElement("div"), e.id = "wp-temp-form-div", e.style.display = "none", k.parentNode.insertBefore(e, k)), j.parentNode.insertBefore(k, j.nextSibling), n && d && (n.value = d), m.value = b, $(".comment-form-fields").css('display','block'),l.style.display = "", l.onclick = function() {
				var a = addComment,
					b = a.I("wp-temp-form-div"),
					c = a.I(a.respondId);
				$(".comment-form-fields").css('display','none');
				if(b && c) return a.I("comment_parent").value = "0", b.parentNode.insertBefore(c, b), b.parentNode.removeChild(b), this.style.display = "none", this.onclick = null, !1
			};
			try {
				for(var p = 0; p < o.elements.length; p++)
					if(f = o.elements[p], h = !1, "getComputedStyle" in window ? g = window.getComputedStyle(f) : document.documentElement.currentStyle && (g = f.currentStyle), (f.offsetWidth <= 0 && f.offsetHeight <= 0 || "hidden" === g.visibility) && (h = !0), "hidden" !== f.type && !f.disabled && !h) {
						f.focus();
						break
					}
			} catch(q) {}
			return !1
		}
	},
	I: function(a) {
		return document.getElementById(a)
	}
};

$(function () {  
     $('.icon-smilies').click(function (event) {  
         //取消事件冒泡  
         event.stopPropagation();  
         //按钮的icon-smilies,如果div是可见的,点击按钮切换为隐藏的;如果是隐藏的,切换为可见的。  
         $('.comment-smilies').fadeToggle(230);  
         return false;
     });  
     //点击空白处隐藏弹出层，下面为滑动消失效果和淡出消失效果。
     $(document).click(function(event){
          var _con = $('.comment-smilies');   // 设置目标区域
          if(!_con.is(event.target) && _con.has(event.target).length === 0){ // Mark 1
            $('.comment-smilies').fadeOut(230);          //淡出消失
          }
    });
    
    //评论提交
    $('.submit').click(function (event) {
//  	var a=('.comment-respond').prev().attr("selfID");
//		$.ajax({  
//				type:"GET",
//             	url: "test.json",  
//             	data: {"id","1"}, 
//            	dataType: "json",  
//             	success: function (req) {  
//                 if () {  
//                     $(".loadmore").hide();
//                     var noText = '';
//                     noText += '<a class="noMore">╰(￣▽￣)╮我是有底线的...</a>';
//					   $(".comments-container").after(noText);
//                 } else {  
//                     $("#page").val(page + 1);//记录页码  
//                  }  
//                  insertDiv(data);  
//              }  
//          });
		var userName = "测试";
		var time ="刚刚";
		var content ="哈哈哈哈";
		var image_src ="img/2.png";
		var id ="100";
		var item = '';
		
		item += '<li id="comment'+id+'">';
		item += '	<div class="comment-main-level"  id="div-comment-'+id+'" selfID="'+id+'">';
		item += '		<div class="comment-avatar" ><img src="'+image_src+'" alt=""></div>';
		item += '		<div class="comment-box" >';
		item += '			<div class="comment-head">';
		//判断链接是否为空
		item += '				<h6 class="comment-name by-nosrc"><a href="javascript:return false;">'+userName+'</a></h6>';
		
		item += '               <span class="comment-item-bullet"> • </span>'
		item += '				<span>'+time+'</span>';
		item += '				<i class="material-icons md-15 reply" title = "回复" selfID="'+id+'" onclick="return addComment.moveForm( &quot;div-comment-'+id+'&quot;, &quot;'+id+'&quot;, &quot;respond&quot;, &quot;1020&quot; , &quot;'+userName+'&quot;)" >reply</i>';
		item += '			</div>';
		item += '			<div class="comment-content">'+content+'</div>';
		item += '		</div>';
		item += '	</div>';
		item += '</li>';
		alert("参数，sortID='"+$("#sortID").val()+"'   sortName='"+$("#sortName").val()+"'");
		if($("#sortID").val() == 0){
//			alert("为第一层楼主，sortID='"+$("#sortID").val()+"'   sortName='"+$("#sortName").val()+"'");
			$("#comments-list").prepend(item);
		}else{
//			alert("为子楼层上级，sortID='"+$("#sortID").val()+"'   sortName='"+$("#sortName").val()+"'");
			if(!($("#comment"+$("#sortID").val()).hasClass('comments'))){ //没有
				var comments = '';
				comments += '<ul class="comments-list reply-list comments'+$("#sortID").val()+'" >';
				comments += 	item;
				comments += '</ul>';
				$("#comment"+$("#sortID").val()).append(comments);
			}else{
				$("#comment"+$("#sortID").val()).prepend(item);
			}
		}
		//评论完成，回复栏复原
		$("#sortID").val("0")
		$("#sortName").val("0")
		$("#comment").val("");
		$("#author").val("");
		$("#email").val("");
		$("#url").val("");
//		$(".comment-form-fields").css('display','none');
		
    	$("#cancel-comment-reply-link").click();
//		window.location = "./a";
    });
    
    
     $("#comment").click(function(e) {
        $(".comment-form-fields").show(230);
    });
    
//				    alert( $("#sortID").val());
//				    alert( $("#sortName").val());
});