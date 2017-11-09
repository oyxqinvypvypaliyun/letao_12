// 进度条
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStart(function(){
    setTimeout(function() {
        NProgress.done();
    },500);
})

// 关闭进度条的进度环
NProgress.configure({ showSpinner: false });