$(function() {
  window.YG = {}; 

  // 后台进度条
$(window).ajaxStart(function () {
    NProgress.start();
  });

$(window).ajaxError(function () {
    NProgress.set(0.04) 
  });

$(window).ajaxComplete(function () {
    NProgress.done();
  });

// 显示分类二级菜单
$('.left [href="javascript:;"]').on('click',function (e) {
  $(this).parent().addClass('active').siblings().removeClass('active');
  $('.sort').slideToggle("slow");
});  

// 隐藏侧边栏
$('.glyphicon-align-justify').on('click',function () {
  $('.left').toggle();
  $('.right').toggleClass('muen');
});

// 全局模态框
var modelHtml = '  <div class="modal fade" id="logoutModel">'+
                '  <div class="modal-dialog modal-sm">'+
                '    <div class="modal-content">'+
                '      <div class="modal-header">'+
                '        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>'+
                '        <h4 class="modal-title">温馨提示</h4>'+
                '      </div>'+
                '      <div class="modal-body text-danger">'+
                '        <p><span class="glyphicon glyphicon-info-sign"></span>您是否要退出后台管理系统？</p>'+
                '      </div>'+
                '      <div class="modal-footer">'+
                '        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>'+
                '        <button type="button" class="btn btn-primary">确定</button>'+
                '      </div>'+
                '    </div>'+
                '  </div>'+
                '</div>';
                $('body').append(modelHtml);


// 退出登录 
$('.glyphicon-log-out').on('click',function () {
  var $logoutModel = $('#logoutModel');
  $logoutModel.modal('show').find('.btn-primary').on('click',function () {
      $.ajax({
          type:'get',
          url:'/employee/employeeLogout',
          data:'',
          dataType:'json',
          success:function (data) {
            if(data.success == true){
              $logoutModel.modal('hide')
              location.href = 'login.html'
            }
          }
      });
  });
});

// 获取表单ID
YG.getItemById = function(arr,id){
  var obj = null;
  $.each(arr, function(i, item){ 
      if(item.id == id){
          obj = item;
      }
  });
  return obj;
} ;

}); 