$(function() {
    //全部教练卡片添加
    var all_card_arr = document.querySelector(".coachContent");
    var all_card_str = document.querySelector(".coachContent .col-4");
    var len = 11;
    for (let i = 0; i < len; i++) {
        // card_arr.innerHTML += card_str.innerHTML;
        var new_node = all_card_str.cloneNode(true);
        all_card_arr.appendChild(new_node);
    }
    var all_img_arr = document.querySelectorAll(".allCoach .card img");
    var all_text = ["比利·海灵顿", "暗黑佟大为", "香蕉君", "野兽先辈", "Gearless Joe", "张三", "李四", "王五", "小甜甜", "小背心", "翠花", "埼玉"];
    var all_card_text_arr = document.querySelectorAll(".allCoach .card .text-uppercase.text-light");
    len = document.querySelectorAll(".coachContent .col-4").length;
    var all_card_state = new Array(len); //选择的状态
    for (let i = 0; i < len; i++) {
        all_card_state = 0;
    }
    for (let i = 0; i < len; i++) {
        all_img_arr[i].src = "../MATERIAL/img/trainer/" + (i + 2) + ".jpeg";
    }
    for (let i = 0; i < len; i++) {
        all_card_text_arr[i].innerText = all_text[i];
    }

    //手风琴卡片添加
    var excell_card_arr = document.querySelector(".excellCoach .box");
    var excell_card_str = document.querySelector(".excellCoach .box>div");
    var len = 7;
    for (let i = 0; i < len; i++) {
        new_node = excell_card_str.cloneNode(true);
        excell_card_arr.appendChild(new_node);
    }
    var excell_img_arr = document.querySelectorAll(".excellCoach .box>div img");
    var excell_text = ["乔纳森·乔斯达", " 乔瑟夫·乔斯达", " 空条承太郎", "东方仗助", "乔鲁诺·乔巴拿", "空条徐伦", "乔尼·乔斯达", "东方定助"];
    var excell_card_text_arr = document.querySelectorAll(".excellCoach .box>div h3");
    len = document.querySelectorAll(".excellCoach .box>div").length;
    for (let i = 0; i < len; i++) {
        excell_img_arr[i].src = "../MATERIAL/img/trainer/jo" + (i + 1) + ".jpg";
    }
    for (let i = 0; i < len; i++) {
        excell_card_text_arr[i].innerText = excell_text[i];
    }

    //顶部按钮
    $("#offcanvasBottom .lead").click(function() {
        if (this.innerText == "先加入关注的教练") {
            this.innerText = "取消操作";
            $("#offcanvasBottom .modal-title").text("(○｀ 3′○)");
            $("#offcanvasBottom .modal-body").text("加入成功");
        } else {
            this.innerText = "先加入关注的教练";
            $("#offcanvasBottom .modal-title").text("(；´д｀)ゞ(;)");
            $("#offcanvasBottom .modal-body").text("不好耶");
        }
    });
    //支付二维码
    new QRCode(document.getElementById("qrcode"), "https://www.bilibili.com/festival/2021bnj?bvid=BV1zN411d7dG");
    //套餐选择
    $("#buyType li").click(function () {
        $(this).addClass("bg-light text-success").siblings().removeClass('bg-light text-success');
        console.log();
        $(".moneyTotal").html($(this).find("div.text-muted").html());
    })

})