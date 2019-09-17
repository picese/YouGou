$(function(){
    // 获取验证码
    $('.getCode').on('tap',function(){
        var getCodeBtn = $('.getCode');
        if(getCodeBtn.hasClass('btn_disabled')) return false;
        getCode(function(data){
            console.log(data.vCode)
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

    // 修改密码提交
    $('.mui-btn-primary').on('tap',function(){
        if(window.loading) return false;
        var data = {
            oldPassword : $.trim($('[name="oldPassword"]').val()),
            newPassword : $.trim($('[name="newPassword"]').val()),
            reNewPassword : $.trim($('[name="reNewPassword"]').val()),
            vCode : $.trim($('[name="vCode"]').val()),
        }
        if(!data.oldPassword){
            mui.toast('请输入原密码');
            return false;
        };
        if(!data.newPassword){
            mui.toast('请输入新密码');
            return false;
        };
        if(!data.reNewPassword){
            mui.toast('请再次输入新密码');
            return false;
        };
        if(data.reNewPassword != data.newPassword){
            mui.toast('密码需要一致');
            return false;
        };
        if(!data.vCode){
            mui.toast('请输入验证码');
            return false;
        };
        if(!/^\d{6}$/.test(data.vCode)){
            mui.toast('请输入合法验证码');
            return false;
        };
        setPassword(data,function(data){
            $('.mui-btn-primary').html('正在提交...');
            window.loading = null;
            if(data.success){
                mui.toast('修改成功！');
                setInterval(() => {
                    location.href = '/M/user/my.html';
                },500);
            }else{
                mui.toast(data.message);
            }
        })
    });
});

// 获取验证码
var getCode = function(callback){
    YG.loginAjax({
        type:'get',
        url:'/user/vCodeForUpdatePassword',
        data:'',
        dataType:'json',
        success:function(data){
           callback && callback(data);
        }
    });
};

// 修改密码
var setPassword = function(data,callback){
    YG.loginAjax({
        type:'post',
        url:'/user/updatePassword',
        data:data,
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
}