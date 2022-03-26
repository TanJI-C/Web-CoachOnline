$("#courseFilter li").click(function(){
    var filterValue = $(this).attr('data-filter');
    // alert(filterValue);
    $('.courseContainer').isotope({ filter : filterValue});
    $(this).addClass('filter-active').siblings().removeClass('filter-active');
});

layui.use(['table', 'form'],function () {
    var table = layui.table,
    form = layui.form;

    //用户表格初始化
    table.init('userTable', {
        limit: 100 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
        , height: 500
        , toolbar: true
        , defaultToolbar: ['filter']
    });
    form.on('checkbox(lockDemo)', function (obj) {
        console.log(obj.elem.checked);
        if (obj.elem.checked) {
            layer.tips('已设置为出勤', obj.othis);
        }
        else {
            layer.tips('已设置为缺勤', obj.othis);
        }
    });
});
