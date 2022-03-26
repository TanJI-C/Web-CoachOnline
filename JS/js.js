$(function() {
    $("#loader").fadeOut("slow");
    $("body").css('overflow', 'auto');

    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop(); //获取当前窗口距顶部的高度
        if (scrollTop == 0) {
            $('#header').css('background-color', 'transparent');
        } else {
            $('#header').css('background-color', '#222');
        }
    });
})