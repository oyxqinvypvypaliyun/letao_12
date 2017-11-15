$(function(){

    function getHistory(){
        var history = localStorage.getItem("lt_search_history") || "[]";
        return JSON.parse(history);
    }

    function render(){
        var arr = getHistory();
        // console.log(arr);
        $('.lt_history').html( template("tpl",{data:arr}));
    }

    render();

    // 增加操作
    $('.lt_search .mui-btn-blue').on("click",function(){
        var key = $('.lt_search [type=text]').val().trim();
        $('.lt_search [type=text]').val("");
        if(key == ""){
            mui.toast("请输入搜索内容");
            return false;
        }

        
        var arr = getHistory();
        var index = arr.indexOf(key);

        if(index != -1){
            arr.splice(index,1);
        }

        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(key);
        localStorage.setItem("lt_search_history",JSON.stringify(arr));
        render();
        location.href = "searchList.html?key="+key;
    })


    // 清空操作
    $('.lt_history').on('click','.btn_delete',function(){
        mui.confirm("您确定要清空历史记录吗","温馨提示","否是",function(e){
            if(e.index === 1){
                localStorage.removeItem('lt_search_history');
                render();
            }
        })
    });

    // 删除操作
    $('.lt_history').on('click','.btn_alldelete',function(){
        var index = $(this).data('index');
        mui.confirm("您确定要删除这条历史吗","温馨提示","否是",function(e){
            if(e.index === 1){
                var arr = getHistory();
                arr.splice(index,1);
                localStorage.setItem('lt_search_history',JSON.stringify(arr));
                render();
            }
        })
    })
})