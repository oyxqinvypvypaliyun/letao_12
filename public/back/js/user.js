$(function(){
    // 定义页数
    var page = 1;
    // 定义每页条数
    var pageSize = 5;

    // 封装获取数据AJAX
    function ajax(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);
                $('tbody').html( template('tpl',data) );
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(data.total/data.size),
                    onPageClicked:function(a,b,c,data){
                        // console.log(data);
                        page = data;
                        ajax();
                    }
                })
            }
        })
    }
    // 获取用户数据
    ajax();


    // 点击禁用启用
    $('tbody').on('click','.btn',function(){
        $('#stateModal').modal('show');
       var id = $(this).parent().data('id')
       var state = $(this).hasClass('btn-danger')?0:1;
       $('.btn_state').off().on('click',function(){
        $('#stateModal').modal('hide');
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:state
            },
            success:function(data){
                if(data.success){
                    ajax();
                }
            }
        })
       })
    })
})