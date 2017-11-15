

//区域滚动功能
mui('.mui-scroll-wrapper').scroll({
    indicators:false
});

//轮播图自动播放功能
mui('.mui-slider').slider({
    interval:1000
})


// 封装一个工具函数
var tools = {
    getParamObj:function(){

        //1. 获取参数，如果有中文，需要对地址进行解码
        var search = location.search;
        search = decodeURI(search);
        //2. 把参数的?截取掉
        search = search.slice(1);

        var arr = search.split("&");
        // console.log(arr);
        var obj = {};
        for(var i = 0; i < arr.length; i++){
            var key = arr[i].split("=")[0];
            var value = arr[i].split("=")[1];
            obj[key] = value;
        }
        // console.log(obj);
        return obj;
    }
}