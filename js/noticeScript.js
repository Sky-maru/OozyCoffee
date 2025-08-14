$(document).ready(function(){
    $(".noticeContent").hide();
    $(".notice").click(function(){
        var $currentContent = $(this).next(".noticeContent");
        $(this).siblings(".notice").next(".noticeContent").stop(true, true).slideUp(700);
        $currentContent.stop(true, true).slideToggle(700);
        
    })
    $(".noticeArrowImg").hide();
    $(".notice").mouseenter(function(arrowShow){
        $(this).find(".noticeArrowImg").stop(true, true).show(400);
    })
    $(".notice").mouseout(function(arrowHide){
        $(this).find(".noticeArrowImg").stop(true, true).hide(400);
       
    })
  
        
})//jquery end

AOS.init({
      disable: function() {
    var maxWidth = 720;
    return window.innerWidth < maxWidth;
  }
});