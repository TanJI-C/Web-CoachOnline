$("#courseFilter li").click(function(){
    var filterValue = $(this).attr('data-filter');
    // alert(filterValue);
    $('.courseContainer').isotope({ filter : filterValue});
    $(this).addClass('filter-active').siblings().removeClass('filter-active');
});

layui.use('table', function(){
    var table = layui.table;
    //转换静态表格， 初始化教练表格
    table.init('coachTable', {
        limit: 100 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
        ,height: 500
        ,toolbar: "#coachTopBar"
        ,defaultToolbar: ['filter']
    });    
    //监听教练右侧按钮事件
    table.on('tool(coachTable)', function(obj){
        var data = obj.data;
        // console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } 
        else if(obj.event === 'detail'){
            layer.msg('查看教练信息<br>' + 'ID: ' + data.ID + '<br>姓名: ' + 
            data.username + '<br>性别: ' + data.sex +'<br>邮箱: ' + 
            data.email + '<br>手机号: ' + data.phone +'<br>加入时间: ' + data.joinTime);
        }
    });
    //监听教练顶部按钮事件
    table.on('toolbar(coachTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event==='addCoach'){

            layer.prompt({
                formType: 2
                ,title: '添加新教练'
                ,value: '输入ID',
                    area: ['800px', '38px']
            }, function(value, index){
                var username=$('#addCoachUsername').val()
                , sex=$('#addCoachSex').val()
                , email=$('#addCoachEmail').val()
                , phone=$('#addCoachPhone').val()
                , joinTime=$('#addCoachJoinTime').val();
                if(value===""){
                    layer.tips("请确认填写完毕",$('.layui-layer-content textarea'));
                    return;
                }
                if( username==="") {
                    layer.tips("请确认填写姓名", $('#addCoachUsername'));
                    return ;
                } 
                if( sex ==="") {
                    layer.tips("请确认填写性别", $('#addCoachSex'));
                    return ;
                } 
                if( email==="") {
                    layer.tips("请确认填写邮箱", $('#addCoachEmail'));
                    return ;
                } 
                if( phone==="") {
                    layer.tips("请确认填写电话", $('#addCoachPhone'));
                    return ;
                } 
                if( joinTime==="") {
                    layer.tips("请确认填写加入时间", $('#addCoachJoinTime'));
                    return ;
                }            
                var oldData = table.cache['coachTable']; 
                oldData.push({
                    "ID": value,
                    "username": username,
                    "sex": sex,
                    "email": email,
                    "phone": phone,
                    "joinTime": joinTime
                })
                table.reload('coachTable', {
                    url: '',
                    data: oldData
                });
                layer.close(index);
            });                                                    
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addCoachSex\" class=\"layui-input\" placeholder=\"输入性别\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addCoachEmail\" class=\"layui-input\" placeholder=\"输入邮箱\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addCoachPhone\" class=\"layui-input\" placeholder=\"输入电话\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addCoachUsername\" class=\"layui-input\" placeholder=\"输入名称\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addCoachJoinTime\" class=\"layui-input\" placeholder=\"输入时间\"/>")
            $("#layui-layer1").css("top", "150px");

        };
    });

    //用户表格初始化
    table.init('userTable', {
        limit: 100 //注意：请务必确保 limit 参数（默认：10）是与你服务端限定的数据条数一致
        //支持所有基础参数
        ,height: 500
        ,toolbar: "#userTopBar"
        ,defaultToolbar: ['filter']
    }); 
    //监听用户右侧按钮事件
    table.on('tool(userTable)', function(obj){
        var data = obj.data;
        // console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } 
        else if(obj.event === 'detail'){
            layer.msg('查看用户信息<br>' + 'ID: ' + data.ID + '<br>姓名: ' + 
            data.username + '<br>性别: ' + data.sex + '<br>手机号: ' + data.phone);
        }
    });
    //监听用户顶部按钮事件
    table.on('toolbar(userTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        if(obj.event==='addUser'){
            layer.prompt({
                formType: 2
                ,title: '添加新教练'
                ,value: '输入ID',
                area: ['800px', '38px']
            }, function(value, index){
                var type=$("#addUserType").val()
                , username=$('#addUserUsername').val()
                , sex=$('#addUserSex').val()
                , phone=$('#addUserPhone').val()
                if(value===""){
                    layer.tips("请确认填写完毕",$('.layui-layer-content textarea'));
                    return;
                }
                if( type==="") {
                    layer.tips("请确认填写用户类型", $('#addUserType'));
                    return ;
                } 
                if( username==="") {
                    layer.tips("请确认填写姓名", $('#addUserUsername'));
                    return ;
                } 
                if( sex ==="") {
                    layer.tips("请确认填写性别", $('#addUserSex'));
                    return ;
                } 
                if( phone==="") {
                    layer.tips("请确认填写电话", $('#addUserPhone'));
                    return ;
                } 
                var oldData = table.cache['userTable']; 
                oldData.push({
                    "ID": value,
                    "type": type,
                    "username": username,
                    "sex": sex,
                    "phone": phone,
                })
                table.reload('userTable', {
                    url: '',
                    data: oldData
                });
                layer.close(index);
            });                                                    
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addUserUsername\" class=\"layui-input\" placeholder=\"输入名称\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addUserSex\" class=\"layui-input\" placeholder=\"输入性别\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addUserType\" class=\"layui-input\" placeholder=\"输入用户类型\"/>")           
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addUserPhone\" class=\"layui-input\" placeholder=\"输入电话\"/>")
            $(".layui-layer-content").append("<input style=\"margin-top: 10px  \" type=\"text\" id= \"addUserJoinTime\" class=\"layui-input\" placeholder=\"输入时间\"/>")

        };
    });
});
