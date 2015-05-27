$(document).ready(function(){

	$("#list_info").bind("click",function(){
		$(".info_me").addClass("info_show");
    });

	$("#list_contact").bind("click",function(){
		$(".contact_me").addClass("contact_show");
	});

	$("#info_buttom").bind("click",scrollDown);
	$("#home_btn").bind("click",scrollUp);

	function scrollDown(){
		var clientWidth = document.documentElement.clientWidth;
		var scrollHeight = document.body.scrollHeight;

		if($("#info-warp")){
			if(clientWidth < 980){
				$("#info-warp").css("height",scrollHeight + "px");
			}else{
				$("#info-warp").css("height",100 + "%");
			}
			$("#info-warp").css({
				top: 0 + "px",
				width: 100+"%",
				opacity: 1,
				zIndex: 9999
			});
			$(".info_me").addClass("info_show");
		}
	}

	function scrollUp(){
		var scrollHeight = document.body.scrollHeight;
		if($("#info-warp")){
			$("#info-warp").css({
				top: -scrollHeight +"px",
				opacity: 0,
				zIndex: -1
			});
		}
	}
});
