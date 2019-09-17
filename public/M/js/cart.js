$(function(){
    // 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 
    });

    // 刷新动画
    dong($('.fa-refresh'));

    // 上拉加载 下拉刷新
    mui.init({
        pullRefresh : { 
          container:"#refreshContainer",
          down : { // 下拉刷新
            auto:true,
            callback : function(){
                dong($('.fa-refresh'));
                var that = this;
                window.down = this;
                setTimeout(function(){
                    getCartData(function(data){
                      $('.mui-table-view').html(template('cart',data));
                  })
                    that.endPulldownToRefresh();
                },1000)
            }
          }
        }
      });

 });

// 点击刷新按钮 页面刷新
$('.fa-refresh').on('tap',function(){
      var $this = $(this);
      $this.removeClass('rotates');
      setTimeout(function(){
        $this.addClass('rotates');
      },50)
      window.down.pulldownLoading();
});

// 商品编辑
$('.mui-table-view').on('tap','.mui-btn-blue',function(){
    var $this = $(this)
    var id = $this.parent().attr('data-id');
    var item = YG.getItemById(window.cartData.data,id);
    var html = template('edit',item);
    mui.confirm(html.replace(/\n/g,''),'商品编辑',['确认','取消'],function(e){
        var size = $('.p_size span.now').html();
        var num = $('.p_number input').val();
        if(e.index == 0){
            YG.loginAjax({
              type:'post',
              url:'/cart/updateCart',
              data:{ id:id, size:size, num:num},
              dataType:'json',
              success:function(data){
                  mui.toast('编辑成功');
                  if(data.success = true){
                    item.size = size;
                    item.num = num;
                    $this.parent().parent().find('.number').html('x'+num+'双');
                    $this.parent().parent().find('.yards').html('鞋码：'+size);
                    setAmount()
                  }
              }
            })
        }else{

        }
    });
});

$('body').on('tap','span',function(){
  $(this).addClass('now').siblings().removeClass('now')
})

$('body').on('tap','.p_number span',function(){
  var $input = $('.p_number input');
  var current = $input.val();
  var max = parseInt($input.attr('data-max'));
  if($(this).hasClass('reduce')){
    if(current <= 1){
      mui.toast('请选择商品');
      return false;
   };
   current --;
  }else{
    if(current >= max){
      mui.toast('超过商品库存');
      console.log(1)
      return false;
    }
    current ++;
  }
  $input.val(current);
});

// 商品删除
$('.mui-table-view').on('tap','.mui-btn-red',function(){
  var $this = $(this);
  var id = $(this).parent().attr('data-id');
  mui.confirm('您是否要删除该商品？','商品删除',['确认','取消'],function(e){
    if(e.index == 0){
        YG.loginAjax({
          type:'get',
          url:'/cart/deleteCart',
          data:{ id:id},
          dataType:'json',
          success:function(data){
              mui.toast('删除成功');
              if(data.success = true){
                $this.parent().parent().remove();
                setAmount()
              }
          }
        })
    }else{

    }
});
});

// 计算总金额
$('.mui-table-view').on('change','[type=checkbox]',function(){
  setAmount()
});

// 计算总金额
var setAmount = function(){
  var amountSum = 0;
  var $checkInput = $('[type=checkbox]:checked');
  $checkInput.each(function(i,item){
      var id = $(this).attr('data-id');
      var item = YG.getItemById(window.cartData.data,id);
      var num = item.num;
      var price = item.price;
      var amount = price * num;
      amountSum += amount;
  });
  if(Math.floor(amountSum * 100) % 10){
      amountSum = Math.floor(amountSum * 100) / 100;
  }else{
      amountSum = Math.floor(amountSum * 100) / 100;
      amountSum = amountSum.toString() + '0';
  }
  $('#amount').html(amountSum);
}

// 刷新按钮动画
var dong = function(params){
      params.removeClass('rotates');
      setTimeout(function(){
        params.addClass('rotates');
      },50)
};

// 获取购物车数据
var getCartData = function(callback){
  YG.loginAjax({
      type:'get',
      url:'/cart/queryCartPaging',
      data:{ page:1,pageSize:100 },
      dataType:'json',
      success : function(data){
          window.cartData = data;
          callback && callback(data);
      }
  });
};