$(function(){
    // 收货地址渲染
     getAddressData(function(data){
         window.data = data;
        $('.mui-scroll').html(template('Address',{model:data}));
     });

     // 删除收货地址
     $('.mui-scroll').on('tap','.mui-btn-red',function(){
        deleteAddress($(this).parent().attr('data-id'),function(data){
                mui.toast('删除成功');
                getAddressData(function(data){
                    $('.mui-scroll').html(template('Address',{model:data}));
                });
        });
     });
});

// 获取收货地址
var getAddressData = function(callback){
    YG.loginAjax({
        type:'get',
        url:'/address/queryAddress',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
     });
};

// 删除收货地址
var deleteAddress = function(id,callback){
    YG.loginAjax({
        type:'post',
        url:'/address/deleteAddress',
        data:{ id:id},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
     });
};