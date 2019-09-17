$(function () {
    // 获取验证码
    $('.getCode').on('tap',function(){
        var getCodeBtn = $('.getCode');
        if(getCodeBtn.hasClass('btn_disabled')) return false;
        getCode(function(data){
            console.log(data.vCode);
                getCodeBtn.addClass('btn_disabled').html('正在发送...');
                var time = 60;
                getCodeBtn.html(time + '秒后再获取');
                var timer = setInterval(function(){
                    time --;
                    getCodeBtn.html(time + '秒后再获取');
                    if(time <=0 ){
                        clearInterval(timer);
                        getCodeBtn.removeClass('btn_disabled').html('获取验证码')
                    }
                },1000);
        });
    });

    // 注册
    $('.mui-btn-primary').on('tap', function () {
        // 获取表单数据
        var data = {
            username : $.trim($('[name="phone"]').val()),
            password : $.trim($('[name="password"]').val()),
            rePassword : $.trim($('[name="rePassword"]').val()),
            vCode : $.trim($('[name="vCode"]').val()),
        };
        
        // 表单验证
        if(!data.username){
            mui.toast('请输入手机号');
            return false;
        };

        if(!/^\d{11}$/.test(data.username)){
            mui.toast('请输入合法手机号');
            return false;
        };

        if(!data.password){
            mui.toast('请输入密码');
            return false;
        };

        if(!/^\d{6}$/.test(data.password)){
            mui.toast('密码不能少于6位数');
            return false;
        };

        if(!data.rePassword){
            mui.toast('请在次输入密码');
            return false;
        };
        if(!/^\d{6}$/.test(data.rePassword)){
            mui.toast('密码不能少于6位数');
            return false;
        };

        if(data.password != data.rePassword){
            mui.toast('两次输入的密码不一致');
            return false;
        };

        if(!data.vCode){
            mui.toast('请输入验证码');
            return false;
        };

        if(!/^\d{6}$/.test(data.vCode)){
            mui.toast('请输入合法的验证码');
            return false;
        };

        data.mobile = data.username;
        
        register(data,function(data){
            if(data.success){
                mui.toast('注册成功');
                location.href = 'login.html';
            }else{
                mui.toast(data.message);
            }
        });

    });
});

// 注册
var register = function (data,callback) {
    $.ajax({
        type: 'post',
        url: '/user/register',
        data: data,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};

// 获取验证码
var getCode = function(callback){
    $.ajax({
        type:'get',
        url:'/user/vCode',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
}