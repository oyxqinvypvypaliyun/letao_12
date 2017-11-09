// 进度条
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStart(function(){
    setTimeout(function() {
        NProgress.done();
    },500);
})
// 判断是否登录
if(location.href.indexOf('login.html') == -1){
    $.ajax({
        url:'/employee/checkRootLogin',
        success:function(data){
            if(data.error === 400){
                location.href = 'login.html';
            }
        }
    })
}
// 关闭进度条的进度环
NProgress.configure({ showSpinner: false });

// 分类管理
$('.child').prev().on('click',function(){
    $(this).next().slideToggle();
})

// 用户界面
$('.btn_menu').on('click',function(){
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
})

// 退出界面
$('.btn_logout').on('click',function(){
    $('#logoutModal').modal('show');
    $('.btn_confirm').off().on('click',function(){
        $.ajax({
            url:'/employee/employeeLogout',
            success:function(data){
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    })
})