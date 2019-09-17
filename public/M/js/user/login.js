$(function(){
    $('.mui-btn-primary').on('tap',function(){
        // 1 表单序列化,得到字符串，
        var data = $('form').serialize();
        // 2 把字符串转换成对象
        var dataObj = YG.serializeToObject(data);
        // 3 表单验证
        if(!dataObj.username){
            mui.toast('帐号不能为空');
            return false;
        }
        if(!dataObj.password){
            mui.toast('请输入密码');
            return false;
        }
        // 4 发送请求
        login(dataObj,function(data){
            if(data.success == true){
                var url = location.search.replace('?returnUrl=','');
                if(url){
                    // 4.1 登录成功，有返回地址的跳转到返回地址
                    location.href = url;
                }else{
                    // 4.2 登录成功，没有返回地址的跳转到个人中心
                    location.href = 'my.html';
                }
                
            }else{
                mui.toast(data.message);
            }
        });      
    });
});

// 登录
var login = function(data,callback){
    $.ajax({
        type:'post',
        url:'/user/login',
        data: data,
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }

    });
};