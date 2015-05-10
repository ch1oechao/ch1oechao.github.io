window.onload = function(){

	var infoBtn = $("#info_buttom");
	var pageWarp = $("#info-warp");

	var listInfo = $("#list_info");
	var listCon = $("#list_contact");
	var listAbout = $("#list_about");

	var scrollWidth = document.body.scrollWidth;
	var scrollHeight = document.body.scrollHeight;

	pageWarp.style.top = -scrollHeight +"px";

	infoBtn.onclick = function(){

		var clientWidth = document.documentElement.clientWidth || document.body.offsetWidth;
		var clientHeight = document.documentElement.clientHeight || document.body.offsetHeight;

		if(pageWarp){
			pageWarp.style.top = 0 +"px";
			var pageWidth = Math.min(scrollWidth,clientWidth);
			var pageHeight = Math.min(scrollHeight,clientHeight);
			pageWarp.style.width = pageWidth + "px";
			pageWarp.style.height = pageHeight + "px";
		}
	}
};