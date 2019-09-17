// 区域滚动
 mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

$(function(){
    $('.loading').remove();
    var key = YG.getUrlParams().productId;
    getProductData(key,function(data){
       $('.mui-scroll').html(template('Details', data));
           //自动轮播
        mui('.mui-slider').slider({ interval: 3000 });

    // 1.选择尺码
    $('.YG_size span').on('tap',function(){
        $(this).addClass('now').siblings().removeClass('now')
    });

    // 2.选择数量
    $('.YG_number span').on('tap',function(){
        var $input = $('.YG_number input')
        var currNum = $input.val(); 
        var maxNum = parseInt($input.attr('data-max'));
        if($(this).hasClass('reduce')){
            if(currNum == 0){ 
                mui.toast('请选择一件商品');
                return false
            };
            currNum --
        }else{
            if(currNum >= maxNum ){
                mui.toast('超过商品库存');
                return false;
            }
            currNum ++
        }
        $input.val(currNum)
    });

    // 3.添加购物车
    $('.YG_addCart').on('tap',function(){
        var $changBtn = $('.size.now');
        var $productNum = $('.YG_number input').val()
        // 校验是否选择了尺码
        if(!$changBtn.length){
            mui.toast('请选择尺码');
            return false;
        }
        // 校验是否选择了商品
        if($productNum == 0){
            mui.toast('请选择商品');
            return false;
        }

        // 判断用户是否登录
        YG.loginAjax({
            type:'post',
            url:'/cart/addCart',
            data:{ productId:key, num:$productNum, size:$changBtn.html() },
            dataType:'json',
            success : function(data){
                if(data.success == true){
                    mui.confirm('是否添加到购物车','温馨提示',['是','否'],function(e){
                        if(e.index == 0){
                            location.href = 'cart.html';
                        }else{

                        }
                    })
                }
            }
        });

    })
  });
});

// 获取商品详情数据
var getProductData = function(productId,callback){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{ id:productId },
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    })
}




