$(function () {
    $('.YG_history').html(template('searchTpl', {
        model: getSearchData()
    }));

    $('.search').val('');

    // 搜索事件
    $('body').on('tap','.search_btn',function () {

        var $val = $.trim($('.search').val());

        if ($val === '') {
            mui.toast('请输入商品');
            return false;
        }

        addSearchData($val);

    }).on('tap', '.icon_delete', function () {
        // 删除搜索记录
        removeSearchData($(this).attr('data-key'));
        $('.YG_history').html(template('searchTpl', {model: getSearchData()}));

    }).on('tap', '.icon_clear', function () {
        // 清空搜索记录
        localStorage.clear();
        $('.YG_history').html(template('searchTpl', {model: getSearchData()}));
    })

    // 点击搜索历史跳转到搜索列表
    $('.history_box li').on('tap','a',function(){
        var data = $(this).attr('data-key')
        /*跳转搜索列表*/
        location.href = 'searchList.html?key='+ data;
    })

})

// 获取本地搜索数据
var getSearchData = function () {
    return JSON.parse(localStorage.getItem('cms') || '[]');
};

// 添加搜索记录
var addSearchData = function ($val) {
    var $lists = getSearchData();

    //把最新的搜索添加到最前面
    $lists.push($val);

    /*最多记录10条*/
    if ($lists.length > 10) {
        $lists.splice(0, $lists.length - 10);
    }

    // 重新保存最新的评论数据
    localStorage.setItem('cms', JSON.stringify($lists));

    /*跳转搜索列表*/
    location.href = 'searchList.html?key='+ $val;

}

// 删除搜索记录
var removeSearchData = function ($val) {
    var $lists = getSearchData();
    $.each($lists,function(i,item){
        if(item == $val){
            $lists.splice(i,1);
        }
    });
    localStorage.setItem('cms', JSON.stringify($lists))
}