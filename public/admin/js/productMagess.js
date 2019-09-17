$(function(){
    window.page = 1;
    render();

    // 添加商品（接口不对）
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
            proName: {
                validators: {
                    notEmpty: {
                        message: '品牌名称不能为空',
                    }
                }
            },
            proDesc:{
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空',
                    }
                }
            },
            num:{
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空',
                    },
                },
            },
            price:{
                validators: {
                    notEmpty: {
                        message: '品牌价格不能为空',
                    },
                },
            },
            oldPrice:{
                validators: {
                    notEmpty: {
                        message: '品牌原价不能为空',
                    },
                },
            },
            size:{
                validators: {
                    notEmpty: {
                        message: '品牌尺码不能为空',
                    },
                },
            },
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success == true){
                    window.page = 1;
                    render();
                    $('#modal').modal('hide');
                    /*重置表单数据和校验样式*/
                    // $("#form").data('bootstrapValidator').destroy();
                    // $('#form').data('bootstrapValidator',null);
                    // formValidator($("#form"));
                }
            }
        });
    });

    // 商品编辑
    $('.news').on('click','.edit',function(){
        var $itemId = $(this).attr('data-id');
        var $itemData = YG.getItemById(window.itemData.rows,$itemId);
        $('[name="proName"]').val($itemData.proName);
        $('[name="proDesc"]').val($itemData.proDesc);
        $('[name="num"]').val($itemData.num);
        $('[name="price"]').val($itemData.price);
        $('[name="oldPrice"]').val($itemData.oldPrice);
        $('[name="size"]').val($itemData.size);
        $('#editModal').modal('show');
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
            proName: {
                validators: {
                    notEmpty: {
                        message: '品牌名称不能为空',
                    }
                }
            },
            proDesc:{
                validators: {
                    notEmpty: {
                        message: '商品描述不能为空',
                    }
                }
            },
            num:{
                validators: {
                    notEmpty: {
                        message: '商品库存不能为空',
                    },
                },
            },
            price:{
                validators: {
                    notEmpty: {
                        message: '品牌价格不能为空',
                    },
                },
            },
            oldPrice:{
                validators: {
                    notEmpty: {
                        message: '品牌原价不能为空',
                    },
                },
            },
            size:{
                validators: {
                    notEmpty: {
                        message: '品牌尺码不能为空',
                    },
                },
            },
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/product/updateProduct',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success == true){
                    window.page = 1;
                    render();
                    $('#modal').modal('hide');
                }
            }
        });
    });

    // 商品下架
    $('.news').on('click','.lower',function(){
        var $this = $(this);
        var $itemId = $this.attr('data-id');
        var $itemName = $this.attr('data-name');
        $('#lowerModal').find('strong').html(($this.hasClass('btn-danger') ? '下架' : '上架')+' '+ $itemName+' ');
        $('#lowerModal').modal('show');
        $('#lowerModal').off('click','.btn-primary').on('click','.btn-primary',function(){
            var $item = YG.getItemById(window.itemData.rows,$itemId);
            console.log($item)
            if($item == $itemId || $item.statu === 1){
                $item.statu = 0;
                $this.removeClass('btn-danger').addClass('btn-primary').html('上架');
                //$this.parents().find('.or').html('已下架');
            }else if($item.statu === 0) {
                $item.statu = 1;
                $this.removeClass('btn-primary').addClass('btn-danger').html('下架');
               //$this.parents().find('.or').html('已上架');
            }
            
            $('#lowerModal').modal('hide');
        })
    });
});

// 获取数据
var getProductData = function(callback){
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{ page:window.page || 1, pageSize:5},
        dataType:'json',
        success:function(data){
            window.itemData = data;
            callback && callback(data);
        }
    })
};

// 渲染数据
var render = function(){
    getProductData(function(data){
        $('.news').html(template('list',data));
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

// 初始化图片上传
// var initFileUpLoad = function(){
//     $('[type="file"]').fileupload({
//         //url:'/product/addProduct',
//         dataType:'json',
//         done:function(e,data){
//             //$('#upLoadImg').attr('src',data.result.picAddr);
//             //$('[name="pic1"]').val(data.result.picAddr);
//             //$('#form').data('bootstrapValidator').updateStatus('pic','VALID');
//             console.log()
//         }
//     });
// };