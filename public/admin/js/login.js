$(function () {
    $('#login').bootstrapValidator({
        // 表单框验证图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 表单验证
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空',
                    },
                    stringLength: { // 用户名长度限制
                        min: 4,
                        max: 8,
                        message:'用户名长度必须在4到8位之间'
                    },
                    callback:{
                        message:'用户名不存在',
                    },
                },
            },
            password:{
                validators: {
                    notEmpty: {
                        message: '密码不能为空',
                    },
                    stringLength: { // 密码长度限制
                        min: 6,
                        max: 18,
                        message:'密码长度必须在6到18位之间'
                    },
                    callback:{
                        message:'密码错误',
                    },

                },
            }
        },
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var $form = $(e.target);
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success == true){
                    location.href = 'index.html';
                }else{
                    if(data.error == 1000){
                        // 用户名错误
                        $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                    }else if(data.error == 1001){
                        // 密码错误
                        $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                    }
                }
            }
        });
    });
});