$(function(){
    window.page = 1;
    render();

    //添加商品
    $('.addBtn').on('click',function(){
        $('#modal').modal('show');
    });

    // 添加商品表单验证
    $('#form').bootstrapValidator({
        excluded:[],
        // 表单框验证图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 表单验证
        fields: {
            categoryName:{
                validators: {
                    notEmpty: {
                        message: '商品不能为空'
                    }
                }
            }
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success == true){
                    window.page = 1;
                    render();
                    $('#modal').modal('hide');
                    /*重置表单*/
                    $form.data('bootstrapValidator').resetForm();
                    $form.find('input').val('');
                }
            }
        });
    });

    // 编辑商品
    $('.news').off('click','.btn-primary').on('click','.btn-primary',function(){
        $('#editModal').modal('show');
        // 商品名称
        var $itemId = $(this).attr('data-id');
        var $item = YG.getItemById(window.data.rows,$itemId);
        $('#itemId').val($itemId);
        $('#categoryName').val($item.categoryName);
        $('#editForm').data('bootstrapValidator').updateStatus('categoryName','VALID');

        $('.isDelete').html($item.isDelete == 1 ? '启用' : '禁用');
        $('[name="isDelete"]').val($item.isDelete);
        $('#editForm').data('bootstrapValidator').updateStatus('isDelete','VALID');
        // 启用or禁用
        $('.dropdown-menu li').on('click',function(){
            var $value = $(this).find('a');
            $('.isDelete').html($value.html());
            $('[name="isDelete"]').val($value.attr('data-isDelete'));
        });
    });

    // 商品编辑表单验证
    $('#editForm').bootstrapValidator({
        excluded:[],
        // 表单框验证图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 表单验证
        fields: {
            categoryName:{
                validators: {
                    notEmpty: {
                        message: '商品不能为空'
                    }
                }
            },
            isDelete:{
                validators: {
                    notEmpty: {
                        message: '请选择状态'
                    }
                }
            }
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/category/updateTopCategory',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success){
                    window.page = 1;
                    render();
                    $('#editModal').modal('hide');
                    /*重置表单*/
                    $form.data('bootstrapValidator').resetForm();
                    $form.find('input').val('');
                }
            }
        });
    });

    // 删除商品
    $('.news').on('click','.btn-danger',function(e){
        var $itemId = $(this).attr('data-id');
        $.ajax({
            type:'get',
            url:'/category/deleteTopCategory',
            data:$itemId,
            dataType:'json',
            success:function(data){
                console.log(data)
            }
        });
    });

});

// 获取数据
var getFirstData = function(callback){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{ page:window.page || 1, pageSize:4},
        dataType:'json',
        success:function(data){
            window.data = data;
            callback && callback(data);
        }
    });
};

// 数据渲染
var render = function() {
    getFirstData(function(data){
        $('.news').html(template('list',data));
        //初始化分页组件
        $(".pagination").bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage:data.page, // 设置默认当前页码
            numberOfPages:Math.round(data.total/data.size), // 设置页码的按钮显示数量
            totalPages:Math.ceil(data.total/data.size), // 设置页数
            onPageClicked:function(event, originalEvent, type,page){
                window.page = page;
                render();
                
            }
        });
        // 把数据保存到本地
        localStorage.setItem('itemData', JSON.stringify(window.data.rows));
    });
};

