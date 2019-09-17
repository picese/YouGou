$(function(){
    getUserData(function(data){
        $('.news').html(template('list',data));
    });

    // 禁用 or 启用
    $('.news').on('click','.btn',function(){
        // 获取数据
        var $this = $(this);
        var $userId = $this.attr('data-id');
        var $userName = $this.attr('data-name');
        var $isDelete = $this.hasClass('btn-danger') ? 0 : 1;
        $('#modal').find('strong').html(($this.hasClass('btn-danger') ? '禁用' : '启用')+' '+ $userName);
        $('#modal').modal('show');
        $('#modal').on('click','.btn',function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{id:$userId,isDelete:$isDelete},
                dataType:'json',
                success:function(data){
                    if(data.success){
                        getUserData(function(data){
                            $('.news').html(template('list',data));
                        });
                        $('#modal').modal('hide');
                    }
                }
            });
        });
    });
});

// 获取用户数据
var getUserData = function(callback){
    $.ajax({
        type:'get',
        url:'/user/queryUser',
        data:{ page:1, pageSize:100 },
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });

}