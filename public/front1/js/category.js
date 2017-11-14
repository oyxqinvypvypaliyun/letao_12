$(function(){


    //发送ajax请求，获取一级分类的数据
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(data){
            // console.log(data);
            $('.lt_category_l .mui-scroll').html( template('tpl',data) );
            renderSecond(data.rows[0].id);
        }
    })

//渲染哪个一级分类下的二级分类
    function renderSecond(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data){
                $('.lt_category_r .mui-scroll').html( template('tpl2',data) );
            }
        })
    }

    //给一级分类下的所有的li标签注册委托事件
    $('.lt_category_l').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        renderSecond(id);
    })
})