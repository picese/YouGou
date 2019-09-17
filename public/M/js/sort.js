$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 默认第一个一级分类对应的二级分类
    getSlideData(function(data){
        $('.slide').html(template('Slide',data));
        var slideId = $('.slide ul li:first-child').attr('data-id');

        getContentData({id:slideId},function(data){
            $('.content').html(template('Content',data));
        });
    });

    // 点击一级菜单加载对应的二级分类
    $('.slide').on('tap','li',function(e){
        // 给当前点击的元素添加样式
        $('.slide li').removeClass('now');
        $(this).addClass('now');

        // 给当前点击的项加载数据
        var sortId = $(this).attr('data-id');
        getContentData({id:sortId},function(data){
            $('.content').html(template('Content',data));
        });
    });
})

// 获取tab数据
var getSlideData = function (callback) {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }

    })
}

// 获取分类数据
var getContentData = function(params,callback){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategory',
        data:params,
        dataType:'json',
        success : function(data){
            callback && callback(data)
        }
    })
}

var rendData = function(slideId){
    getContentData({id:slideId},function(data){
        $('.content').html(template('Content',data));
    });
}