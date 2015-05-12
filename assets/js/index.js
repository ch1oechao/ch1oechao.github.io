window.onload = function(){

	var infoBtn = $("#info_buttom");
	var pageWarp = $("#info-warp");
	var homeBtn = $("#home_btn");


	var listInfo = $("#list_info");
	var listCon = $("#list_contact");
	var listAbout = $("#list_about");

	var audioPlay = $("#audioplay");

	audioPlay.onclick = function(){
		if(audioPlay.className.indexOf("spin") == -1){
			addClass(audioPlay,"fa-spin");
			appendMusic();
		}else{
			audioPlay.setAttribute("class","fa fa-music");
			var audioElement = $("#playMusic");
			var myInfo = $("#myinfo").childNodes;
			for(var  i=0,len=myInfo.length;i<len;i++){
				if(myInfo[i].tagName == "audio"){
					console.log(myInfo[i]);
					myInfo[i].parentNode.removeChild(this);
				}
			}
			// if(audioElement){
			// 	while(audioElement.hasChildNodes()){
			// 		audioElement.removeChild(audioElement.firstChild);
			// 	}
			// }
		}
		
	};

	function appendMusic(){

		var myInfo = $("#myinfo");
		var audioPlay = $("#audioplay");
		var audioElement = document.createElement("audio");
		audioElement.setAttribute("autoplay","autoplay");
		audioElement.setAttribute("id","playMusic");

		var audioSourceOgg = document.createElement("source");
		audioSourceOgg.setAttribute("src","http://7xic0o.com1.z0.glb.clouddn.com/zchen9A Sky Full of Stars.ogg");
		audioSourceOgg.setAttribute("type","audio/ogg");
		var audioSourceMp3 = document.createElement("source");
		audioSourceMp3.setAttribute("src","http://7xic0o.com1.z0.glb.clouddn.com/zchen9A Sky Full of Stars.mp3");
		audioSourceMp3.setAttribute("type","audio/mpeg");

		audioElement.appendChild(audioSourceOgg);
		audioElement.appendChild(audioSourceMp3);
		myInfo.appendChild(audioElement);
	};

	listInfo.onclick = function(){
		var infoMe = $(".info_me")[0];
		addClass(infoMe,"info_show");
	};
	listCon.onclick = function(){
		var contactMe = $(".contact_me")[0];
		addClass(contactMe,"contact_show");
	};


	addEvent(infoBtn,"click",scrollDown);
	addEvent(homeBtn,"click",scrollUp);

	function scrollDown(){
		var pageWarp = $("#info-warp");
		var infoMe = $(".info_me")[0];

		var clientWidth = document.documentElement.clientWidth;
		var scrollHeight = document.body.scrollHeight;

		if(pageWarp){
			if(clientWidth < 980){
				pageWarp.style.height = scrollHeight + "px";
			}else{
				pageWarp.style.height = 100 + "%";
			}
			pageWarp.style.top = 0 +"px";
			pageWarp.style.width = 100 + "%";
			pageWarp.style.opacity = 1;
			pageWarp.style.zIndex = 9999;
			addClass(infoMe,"info_show");
		}
	}

	function scrollUp(){
		var pageWarp = $("#info-warp");
		if(pageWarp){
			pageWarp.style.top = -200 +"%" ;
		}
	}
};