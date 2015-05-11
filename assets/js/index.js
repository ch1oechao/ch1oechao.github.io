window.onload = function(){

	var infoBtn = $("#info_buttom");
	var pageWarp = $("#info-warp");
	var homeBtn = $("#home_btn");

	var listInfo = $("#list_info");
	var listCon = $("#list_contact");
	var listAbout = $("#list_about");


	addEvent(infoBtn,"click",scrollDown);
	addEvent(homeBtn,"click",scrollUp);

	function scrollDown(){
		var pageWarp = $("#info-warp");

		var clientWidth = document.documentElement.clientWidth || document.body.offsetWidth;
		var clientHeight = document.documentElement.clientHeight || document.body.offsetHeight;

		if(pageWarp){
			pageWarp.style.top = 0 +"px";
			pageWarp.style.width = clientWidth + "px";
			pageWarp.style.height = clientHeight + "px";
		}

	}

	function scrollUp(){
		var pageWarp = $("#info-warp");
		if(pageWarp){
			pageWarp.style.top = -200 +"%" ;
		}
	}
};