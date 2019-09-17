window.YG = {};

// 获取地址栏传参过来的关键字
YG.getUrlParams = function () {
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

// 用户登录请求
var loginUrl = '/M/user/login.html';
YG.loginAjax = function (params) {
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success: function (data) {
            if (data.error == 400) {
                location.href = loginUrl + '?returnUrl=' + location.href;
                return false;
            } else {
                params.success && params.success(data);
            }
        },
        error: function () {
            mui.toast('添加失败，请重试')
        }
    })
};

// 表单序列化
YG.serializeToObject = function (serialize) {
    var obj = {};
    if (serialize) {
        var arr = serialize.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');
            obj[itemArr[0]] = itemArr[1];
        })
    }
    return obj;
}

// 获取表单ID
YG.getItemById = function(arr,id){
    var obj = null;
    arr.forEach(function(item,i){
        if(item.id == id){
            obj = item;
        }
    });
    return obj;
}   