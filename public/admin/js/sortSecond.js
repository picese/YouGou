$(function(){
    window.page = 1;
    render();

    // 添加品牌
    $('.addBtn').on('click',function(){
        $('#modal').modal('show');
        getSortFirstData(function(data){
            $('.dropdown-menu').html(template('menu',data)).on('click','li',function(){
                var $categoryId = $(this).find('a');
                $('.categoryName').html($categoryId.html());
                $('[name="categoryId"]').val($categoryId.attr('data-id'));
                // 更改校验状态
                $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
            });
        });
    });

    // 图片上传
    initFileUpLoad();

    // 添加品牌表单验证
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
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择商品'
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty: {
                        message: '品牌不能为空'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传品牌Logo',
                    },
                },
            }
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success ){
                    console.log($form.serialize())
                    window.page = 1;
                    render();
                    $('#modal').modal('hide');
                }
            }
        });
    });

    // 编辑品牌
    $('.new').on('click','.edit',function(){
        var $itemId = $(this).attr('data-id');
        var $itemData = YG.getItemById(window.data.rows,$itemId);
        // 下拉框
        $('.categoryName').html($itemData.categoryName);
        $('[name="categoryId"]').val($itemId);
        getSortFirstData(function(data){
            $('.dropdown-menu').html(template('menu',data)).on('click','li',function(){
                var $categoryId = $(this).find('a');
                $('.categoryName').html($categoryId.html());
                $('[name="categoryId"]').val($categoryId.attr('data-id'));
                // 更改校验状态
                $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
            });
        });
        // 名称
        $('[name="brandName"]').val($itemData.brandName);
        //logo
        initFileUpLoad();
        $('#Img').attr('src',$itemData.brandLogo);
        $('[name="brandLogo"]').val($itemData.brandLogo);
        $('#editModal').modal('show');
    });

    // 编辑品牌表单验证
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
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择商品'
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty: {
                        message: '品牌不能为空'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传品牌Logo',
                    },
                },
            }
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/category/updateSecondCategory',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success){
                    window.page = 1;
                    render();
                    $('#modal').modal('hide');
                }
            }
        });
    });

});

// 获取品牌分类数据
var getSortSecondData = function(callback){
    $.ajax({
        type:'get',
        url:'/category/querySecondCategoryPaging',
        data:{page:window.page || 1, pageSize:4},
        dataType:'json',
        success:function(data){
            window.data = data;
            callback && callback(data);
        }
    });
};

// 数据渲染
var render = function() {
    getSortSecondData(function(data){
        $('.new').html(template('list',data));
        // 初始化分页组件
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
    });
};

// 获取商品数据
var getSortFirstData = function(callback){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{page:1,pageSize:1000},
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    });
};

// 初始化图片上传
var initFileUpLoad = function(){
    $('[name="pic1"]').fileupload({
        url:'/category/addSecondCategoryPic',
        dataType:'json',
        done:function(e,data){
            $('#upLoadImg').attr('src',data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });
};



