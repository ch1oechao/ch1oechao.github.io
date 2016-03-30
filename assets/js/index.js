$(document).ready(function(){

  //音乐点击
  var isDisplay = false;
  $(".music-icon").bind("click", function() {
    if (!isDisplay) {
      $(".music-icon").css({
        top: -60 + 'px'
      });
      $(".fa-music").addClass("fa-spin active");
      $(".music-box").css({
        top: -40,
        opacity: 100
      });
    }
    else {
      $(".music-icon").css({
        top: 30 + 'px'
      });
      $(".fa-music").removeClass("fa-spin active");
      $(".music-box").css({
        top: 50 + 'px',
        opacity: 0
      });
    }
    isDisplay = !isDisplay;
  });
  
});