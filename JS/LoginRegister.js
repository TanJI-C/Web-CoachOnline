var clock = '';
var nums = 30;
var btn;
function sendCode(thisBtn) {
    btn = thisBtn;
    btn.disabled = true; //将按钮置为不可点击
    btn.value = '重新获取（' + nums + '）';
    clock = setInterval(doLoop, 1000); //一秒执行一次
}

function doLoop() {
    nums--;
    if (nums > 0) {
        btn.value = '重新获取（' + nums + '）';
    } else {
        clearInterval(clock); //清除js定时器
        btn.disabled = false;
        btn.value = '点击发送验证码';
        nums = 10; //重置时间
    }
}
$(function () {
    new QRCode(document.getElementById("qrcode"), "https://www.bilibili.com/festival/2021bnj?bvid=BV1zN411d7dG");
    $("#registContainer").hide();
    $("#loginContainer").hide();
    //打开会员登录 
    $("#loginStart").click(function () {
        $("#registContainer").hide();
        $("#Close").show();
        if ($("#startWrap").css("height") != '460px') {
            $("#startWrap").animate({
                height: '460px',
            }, 500)
        }
        $("#loginContainer").show(500);
        $("#Close").animate({
            height: '40px',
            width: '40px'
        }, 500);
    });
    //打开会员注册
    $("#registStart").click(function () {
        $("#loginContainer").hide();
        $("#Close").show();
        if ($("#startWrap").css("height") != '460px') {
            $("#startWrap").animate({
                height: '460px',
            }, 500);
        }
        $("#registContainer").show(500);
        $("#Close").animate({
            height: '40px',
            width: '40px'
        }, 500);
    });
    //关闭页面
    $("#Close").click(function () {
        $("#Close").animate({
            height: '0px',
            width: '0px'
        }, 500, function () {
            $("#Close").hide(500);
            $("#loginContainer").hide(500);
            $("#registContainer").hide(500);
            $("#startWrap").animate({
                height: '0px',
            }, 500);
        });
    });
    //跳转到注册
    $("#toRegist").click(function () {
        $("#loginContainer").hide(500);
        $("#registContainer").show(500);
    });
    //跳转到登录
    $("#toLogin").click(function () {
        $("#registContainer").hide(500);
        $("#loginContainer").show(500);
    });
});

$("#formContainer1").on('submit', function () {
    if ($('input[name="loginType"]:checked').val() === "user") {
        window.open("UserInfo.html");
    }
    else {
        window.open("CoachInfo.html");
    }

});
$("#formContainer2").on('submit', function () {
    if ($('input[name="registType"]:checked').val() === "user") {
        window.open("UserInfo.html");
    }
    else {
        window.open("CoachInfo.html");
    }
});

