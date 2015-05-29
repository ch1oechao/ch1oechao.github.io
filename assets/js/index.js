$(document).ready(function(){

    $("#list_info").bind("click",function(){
        $("#list_info").addClass("active");
        $("#list_contact,#list_about").removeClass("active");

        $(".info_me").addClass("info_show");
        $(".contact_me").removeClass("contact_show");
        $(".about_here").removeClass("about_show");
    });

    $("#list_contact").bind("click",function(){
        $("#list_contact").addClass("active");
        $("#list_info,#list_about").removeClass("active");

        $(".contact_me").addClass("contact_show");
        $(".info_me").removeClass("info_show");
        $(".about_here").removeClass("about_show");
    });

    $("#list_about").bind("click",function(){
        $("#list_about").addClass("active");
        $("#list_info,#list_contact").removeClass("active");

        $(".about_here").addClass("about_show");
        $(".contact_me").removeClass("contact_show");
        $(".info_me").removeClass("info_show");
    });

    $("#info_buttom").bind("click",scrollDown);
    $("#home_btn").bind("click",scrollUp);


    // 回到顶部
    $("article").scroll(function(){     
        $("article").scrollTop()>$("header").height()? $("#returnTop").css("bottom","80px"):$("#returnTop").css("bottom","-200px");
    });
    $(window).scroll(function(){
        $(window).scrollTop()>$("article").height()? $("#returnTop").css("bottom","80px"):$("#returnTop").css("bottom","-200px");
    });
    $("#returnTop").bind("click",function(){
        $("article").animate({scrollTop: 0},500),
        $("html,body").animate({scrollTop: 0},500)
    });

    //分类菜单显示
    $("#cateShow").bind("click",function(){
        if($(".cate-content").css("display") == "none"){
            $(".cate-content").show(400);
        }else{
            $(".cate-content").hide(400);
        }
        
    });
    $(".container").click(function(){
        $(".cate-content").hide(400);
    });

    //菜单点击
    $(".cates").hide();
    $(".cate-list li").bind("click",function(){
        var cateName = $(this).attr("data-cate");
        $(".cate-content").hide(400);
        $(".container>ul[data-cate != "+cateName+"]").slideUp(280);
        $(".container>ul[data-cate = "+cateName+"]").slideDown(400);
    });
});

function scrollDown(){
    if($("#info-warp")){
        $("#info-warp").css({
            top: 0 + "px",
            width: 100 + "%",
            height: 100 + "%",
            opacity: 1,
            zIndex: 9999
        });

        $("#list_info").addClass("active");
        $(".info_me").addClass("info_show");
    }
}

function scrollUp(){
    if($("#info-warp")){
        $("#info-warp").css({
            top: -$("html,body").height() +"px",
            opacity: 0,
            zIndex: -1
        });
    }

    $("#list_info,#list_contact,#list_about").removeClass("active");
    $(".info_me").removeClass("info_show");
    $(".contact_me").removeClass("contact_show");
    $(".about_here").removeClass("about_show");
}