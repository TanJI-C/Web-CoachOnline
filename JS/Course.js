//选课按钮绑定操作
$("#selectFilter li").click(function () {
    var filterValue = $(this).attr('data-filter');
    // alert(filterValue);
    $('.selectContainer').isotope({ filter: filterValue });
    $(this).addClass('filter-active').siblings().removeClass('filter-active');
});
//二维码支付确认框事件绑定
$('.choiceButton').on('click', function () {
    window.button = this
    window.father = $(this).parent().parent().parent().parent().parent();   
    $.confirm({
        title: '扫码支付',
        content: function () {
            this.setContent('<br><div id="qrcode" style="width:250px; height:250px; margin: 15px auto 20px;"></div>');
            new QRCode(document.getElementById("qrcode"), "https://www.bilibili.com/festival/2021bnj?bvid=BV1zN411d7dG");
            return
        },
        confirmButtonClass: 'btn-warning',
        animation: 'zoom',
        animationClose: 'top',
        confirmButton: '确定',
        cancelButton: "取消",
        confirm: function () {
            father.removeClass();
            father.addClass(function () {
                $('.selectContainer').isotope({ filter: ".myCourse" });                             //刷新界面
                $('.selectContainer').isotope({ filter: $('.filter-active').attr('data-filter') }); 
                return "col-3 myCourse py-3"
            });
            father = $(button).parent();                                                            //修改按钮样式
            $(button).remove();
            father.append('<button type="button" class="btn btn-secondary" style="border-radius: 0" disabled>已购买</button>')  
            return true; // prevent dialog from closing.
        }
    });
});
//上面四个按钮的绑定    实现幕布的功能改变,以及给button设定计算类型的属性
$("a[href='#offcanvasCompute']").click(function () {
    //获取当前点击的是那一个按钮, 并对按钮进行相应的赋值
    var toolFather = $(this).parent();
    var text = toolFather.find("h4").text();
    var textpar = toolFather.find("p").text();
    var type;
    if (text === "一分钟了解自已") {
        type = 1;
    } else if (text === "标准体重计算") {
        type = 2;
    } else if (text === "身体质量指数") {
        type = 3;
    } else if (text === "基础代谢计算") {
        type = 4;
    }
    $("#offcanvasCompute").find("h5").text(text);
    $("#offcanvasCompute").find(".card-body").text(textpar);
    //设计button计算类型
    $("#offcanvasCompute").find("#computeForm").attr("computeType", type)
    //将可能出现的ul去掉, 设置为d-none
    $("#computeResult").removeClass("d-block")
    $("#computeResult").addClass("d-none")
});

var M = {
    /**
     * 获取BMI值
     * @param  {Number} height 身高/厘米
     * @param  {Number} weight 体重/千克
     * @return {Number} BMI值
     */
    getBMI: function getBMI(height, weight) {
        var height = height / 100;
        return (weight / (height * height)).toFixed(1);
    },
    /**
     * 获取标准体重
     * @param  {Number} height 身高/米
     * @param  {Number} 性别 {男：1, 女：2}
     * @return {Number} 标准体重值
     */
    getWeight: function getWeight(height, sex) {
        var res;
        if (sex == 1) {
            res = (height - 80) * 0.7;
        } else if (sex == 2) {
            res = (height - 70) * 0.6;
        }
        return res.toFixed(1);
    },
    /**
     * 获取基础代谢率
     * @param  {Number} height 身高/米
     * @param  {Number} weight 体重/千克
     * @param  {Number} 性别 {男：1, 女：2}
     * @param  {Number} age 年龄/岁
     * @return {Number} 标准体重值
     */
    getBMR: function getBMR(height, weight, sex, age) {
        var res;
        if (sex == 1) {
            res = 66 + 13.7 * weight + 5 * height - 6.8 * age;
        } else if (sex == 2) {
            res = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
        }
        return res.toFixed(0);
    },
    /**
     * 获取健康体重范围
     * @return {Number} 健康体重
     */
    getWeightRate: function getWeightRate(weight) {
        var w_rate = [],
            pencent = 0.1;
        w_rate[0] = (weight * (1 - pencent)).toFixed(1);
        w_rate[1] = (weight * (1 + pencent)).toFixed(1);
        return w_rate;
    }
};
$("#sendMessageButton").click(function () {
    //获取输入的值以及设置对应的计算结果
    var computeForm = $("#offcanvasCompute").find("#computeForm");  //获取表格
    var type = computeForm.attr("computeType");                     //获取要计算的种类

    var age = computeForm.find("#age").val();
    var height = computeForm.find("#height").val();
    var weight = computeForm.find("#weight").val();
    var sex = computeForm.find('input[name="sex"]:checked').val();

    //获取ul
    var computeResult = $("#computeResult");
    //设置结果
    computeResult.find("li:nth-child(1) span").text(M.getBMI(height, weight))
    var weightRate = M.getWeightRate(weight);
    computeResult.find("li:nth-child(2) span").text(weightRate[0] + "~" + weightRate[1]);
    computeResult.find("li:nth-child(3) span").text(M.getWeight(height, sex))
    computeResult.find("li:nth-child(4) span").text(M.getBMR(height, weight, sex, age))

    //让ul显现
    computeResult.removeClass("d-none");
    computeResult.addClass("d-block");
    computeResult.find("li").css("display", "none")
    if (type == 1) {
        computeResult.find("li").css("display", "block")
    }
    else if (type == 2) {
        computeResult.children("li:nth-child(2)").css("display", "block")
        computeResult.children("li:nth-child(3)").css("display", "block")
    }
    else if (type == 3) {
        computeResult.children("li:nth-child(1)").css("display", "block")
    }
    else if (type == 4) {
        computeResult.children("li:nth-child(4)").css("display", "block")
    }
});
$("#computeCalorie").click(function() {
    var computeForm = $("#computeForm");
    var height = $("#calorieHeight").val();
    var weight = $("#calorieWeight").val();
    var exercise = $("#calorieExercise option:selected").val();
    var time = $("#calorieTime option:selected").val();
    var food = $("#calorieFood option:selected").val();

    var res = 0;
    if (exercise == 1) res = 718.64;
    else if (exercise == 2) res = 231.82;
    else if (exercise == 3) res = 695.46;
    else if (exercise == 4) res = 869.33;
    else if (exercise == 5) res = 1043.19;
    else if (exercise == 6) res = 1506.83;

    if (time == 1) res *= 1;
    else if (time == 2) res *= 2;
    else if (time == 3) res *= 3;

    if (food == 1) res -= 116;
    else if (food == 2) res -= 367;
    else if (food == 3) res -= 586;
    else if (food == 4) res -= 127;
    else if (food == 5) res -= 151;
    else if (food == 6) res -= 143;

    $("#calorieResult").val("您消耗的热量为"+res+"大卡");
})
