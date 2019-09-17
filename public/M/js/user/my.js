$(function(){
    // 获取用户信息
    var $box = $('.mui-table-view');
    var name = $box.children().children().find('.name');
    var accounts = $box.children().children().find('.accounts');
    getUserData(function(data){
        name.html(data.username);
        accounts.html('绑定手机:'+data.mobile);
    });

    // 退出登录
    $('.loginOut').on('tap',function(){
        logOut(function(data){
            $('.loginOut').html('正在退出...');
            if(data.success){
                location.href = '/M/user/login.html';
            }
        });
    })
});

// 获取用户数据
var getUserData = function(callback){
    YG.loginAjax({
        type:'get',
        url:'/user/queryUserMessage',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};

// 退出登录
var logOut = function(callback){
    YG.loginAjax({
        type:'get',
        url:'/user/logout',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};


