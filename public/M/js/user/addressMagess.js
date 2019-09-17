$(function(){
    // 初始化省市区
    var cityPicker = new mui.PopPicker({layer:3});
        cityPicker.setData(cityData);

    // 获取id
    var addressId = location.search;
    addressId = addressId && addressId.split('=');
    addressId = addressId && addressId[1];

    // 判断是否有id,修改标题
    if(addressId){
        $('.title').html('修改收货地址');
        $('.mui-btn-primary').html('修改');
        getAddressData(function(data){
            var obj = YG.getItemById(data,addressId);
            $('[name="recipients"]').val(obj.recipients);
            $('[name="mobile"]').val(obj.mobile);
            $('[name="postcode"]').val(obj.postCode);
            $('[name="address"]').val(obj.address);
            $('[name="addressDetail"]').val(obj.addressDetail);
        })
    }else{
        $('.title').html('添加收货地址');
        $('.mui-btn-primary').html('添加');
    }

    // 添加 修改收货地址
    $('.mui-btn-primary').off('tap').on('tap',function(){
        var addressData = {
            recipients : $.trim($('[name="recipients"]').val()),
            mobile : $.trim($('[name="mobile"]').val()),
            postcode : $.trim($('[name="postcode"]').val()),
            address : $.trim($('[name="address"]').val()),
            addressDetail : $.trim($('[name="addressDetail"]').val()),
        };
        if(!addressData.recipients){
            mui.toast('请输入收货人');
            return false;
        };

        if(!addressData.mobile){
            mui.toast('请输入电话');
            return false;
        };

        if(!/^\d{11}$/.test(addressData.mobile)){
            mui.toast('请输入合法手机号');
            return false;
        };

        if(!addressData.postcode){
            mui.toast('请输入邮编');
            return false;
        };
    
        if(!/^\d{6}$/.test(addressData.postcode)){
            mui.toast('请输入合法邮编');
            return false;
        };
    
        if(!addressData.address){
            mui.toast('请输入省市区');
            return false;
        };
    
        if(!addressData.addressDetail){
            mui.toast('请输入详细地址');
            return false;
        };

        var editUrl = '/address/addAddress';
        var tip = '添加';
        if(addressId){
            editUrl = '/address/updateAddress';
            tip = '修改';
            addressData.id = addressId;
        };

        addAddress(addressData,editUrl,function(data){
            if(data.success){
                setTimeout(function(){
                    location.href = 'address.html'
                },1000);
                $('.mui-btn-primary').html('正在提交...');
                mui.toast(tip+'成功');
            }else{
                mui.toast(tip+'失败');
            }
        });
    })

    // 省市区选择
    $('[name="address"]').on('tap',function(){
        cityPicker.show(function(items) {
            if(items[0].text == items[1].text){
                items[0].text = '';
            }
            $('[name="address"]').val(items[0].text+items[1].text+(items[2].text||''));
            //返回 false 可以阻止选择框的关闭
        });
    })
});

// 添加地址
var addAddress = function(params,url,callback){
    YG.loginAjax({
        type:'post',
        url:url,
        data: params,
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    })
};

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