$(function(){
    // 设置显示页数
    var currentPage = 1;
    var pageSize = 100;
    // 获取传过来的值
    var proName = tools.getParamObj().key;

    $('.lt_search input').val(proName);

    // 封装的ajax函数
    function render(){
        $('.lt_product').html('<div class="loading"></div>');
        var key = $('.lt_sort a[data-type].now').data('type');
        var value = $('.lt_sort a[data-type].now').find('span').hasClass('fa-angle-down')?2:1;

        var obj = {};
        obj.page = currentPage;
        obj.pageSize = pageSize;
        obj.proName = proName;
        if(key){
            obj[key] = value
        }
        console.log(obj);
        $.ajax({
            type:"get",
            url:"/product/queryProduct",
            data:obj,
            success:function(data){
                setTimeout(function(){
                    // console.log(data);
                    $(".lt_product").html(template("tpl", data));
                },1000)
            }
        })
    }
    // 点击发发
    $('.lt_search button').on('click',function(){
        proName = $('.lt_search input').val().trim();
        render();
    })

    // 排序
    $('.lt_sort a[data-type]').on('click',function(){
        var $this = $(this);
        if($this.hasClass("now")){
            // console.log('有')
            $this.find('span').toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            // console.log('没')
            $this.addClass('now').siblings().removeClass('now');
            $(".lt_sort a").find("span").removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        render();
    })
    render();
})  