$(function(){

    // 定义页数
    var page = 1;
    // 定义每页条数
    var pageSize = 5;

    // 封装获取数据AJAX
    function ajax(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);
                $('tbody').html( template('first-list',data) );
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
    ajax();


    // 添加分类模态框
    $('.btn_add').on('click',function(){
        $('#add_Modal').modal('show');
    })


    // 表单校验
    var $form = $('#form');
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:'分类名称不能为空'
                    },
                    stringLength:{
                        min:3,
                        max:7,
                        message:'分类名称长度为3-7位'
                    }
                }
            }
        }
    })

    // 表单校验成功事件
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$form.serialize(),
            success:function(data){
                // console.log(data);
                if(data.success){
                    $('#add_Modal').modal('hide');
                    ajax();
                }
            }
        })
    })

})