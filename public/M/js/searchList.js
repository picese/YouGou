$(function () {
    // 1.区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });

    // 2.在输入框中渲染地址栏关键字
    var key = getUrlParams().key || '';
    $('.search').val(key);

    // 3.搜索
    $('.search_btn').on('tap', function () {
        // 输入框不能为空
        if (!$.trim($('.search').val() || '')) {
            mui.toast('请输入商品名称');
            return false;
        }
        getUrlParamsData({ page: 1,pageSize: 4,proName: key }, function (data) {
            $('.mui-clearfix').html(template('shop', data));
        });
    });

    // 4.根据排序重新渲染数据(默认降序)
    $('.YG_order a').on('tap', function () {
        var $this = $(this);
        // 输入框不能为空
        if (!$.trim($('.search').val() || '')) {
            mui.toast('请输入商品名称');
            return false;
        }
        // 没有选中的时候
        if (!$this.hasClass('now')) {
            // 给当前的选中的元素添加 now 并模式全部箭头向下
            $this.addClass('now').siblings().removeClass('now')
                .find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        // 选中的时候
        else {
            // 给选中的元素改变箭头方向
            if ($this.find('span').hasClass('fa-angle-down')) {
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }

        // 获取排序值
        var order = $this.attr('data-order');
        var orderVal = $this.find('span').hasClass('fa-angle-down') ? 1 : 2;
        var params = {
            page: 1,
            pageSize: 4,
            proName: key
        }
        params[order] = orderVal;
        getUrlParamsData(params, function (data) {
            console.log(data)
            $('.mui-clearfix').html(template('shop', data));
        });
    });

    // 5.下拉刷新和上拉加载
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            // 下拉刷新
            down: {
                auto: true,
                callback: function () {
                    var that = this;
                    // 输入框不能为空
                    if (!$.trim($('.search').val() || '')) {
                        mui.toast('请输入商品名称');
                        return false;
                    }
                     // 重置排序
                     $('.YG_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

                    // 下拉刷新加载数据
                    getUrlParamsData({ page: 1,pageSize: 4,proName: key }, function (data) {
                        setTimeout(function () {
                            $('.mui-clearfix').html(template('shop', data));
                            // 加载完成重置
                            that.endPulldownToRefresh();
                            //上拉加载重置
                            that.refresh(true);
                        }, 1000);
                    });

                }
            },

            // 上拉加载
            up: {
                callback: function () {
                    var that = this;
                    window.page++;
                    // 输入框不能为空
                    if (!$.trim($('.search').val() || '')) {
                        mui.toast('请输入商品名称');
                        return false;
                    }
                    var order = $('.YG_order a').attr('data-order');
                    var orderVal = $('.YG_order a').find('span').hasClass('fa-angle-down');
                    var params = { page: window.page,pageSize: 4,proName: key}
                    params[order] = orderVal;
                     // 下拉刷新加载数据
                    getUrlParamsData(params, function (data) {
                            setTimeout(function () {
                                $('.mui-clearfix').append(template('shop', data));

                                if (data.data.length) {
                                    that.endPullupToRefresh();
                                } else {
                                    that.endPullupToRefresh(true);
                                }
                        }, 1000)
                    });
                }
            }
        }
    });

})

/*获取地址栏关键字*/
var getUrlParams = function () {
    var search = location.search; // 获取地址栏关键字
    var params = {}; // 以对象的形式保存
    if (search.indexOf('?') == 0) { // 查找以 ? 链接的参数
        search = search.substr(1); // 截取索引为1的字符串
        var arr = search.split('&'); // 以 & 分割所有的字符串
        for (var i = 0; i < arr.length; i++) { // 遍历分割好的字符串
            var itemArr = arr[i].split('=') // 在以 = 分割
            params[itemArr[0]] = itemArr[1] // key = val
        }
    }

    return params;
}

// 根据地址栏关键字获取数据
var getUrlParamsData = function (params, callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: params,
        dataType: 'json',
        success: function (data) {
            window.page = data.page;
            callback && callback(data)
        }
    })
}