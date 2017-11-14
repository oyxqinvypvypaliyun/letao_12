$(function(){
    //分页渲染
    var currentPage = 1;
    var pageSize = 5;

    // ajax渲染页面封装
    function ajax(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function (data) {  
                $('tbody').html(template('tpl',data) );
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked:function (a,b,c, page) {
                      currentPage = page;
                      ajax();
                    }
                  });
            }
        })
    }
    ajax();

    // 点击出现模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                // console.log(data);
                $('.dropdown-menu').html( template('tpl2',data) );
                $('.dropdown-menu a').on('click',function(){
                    $('.dropdown-text').text( $(this).text() );
                    $('#brandId').val( $(this).data('id') );
                    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
                })
            }
        })
    })


    // 表单校验
  var $form = $("form");
  $form.bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验规则
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          //非空
          notEmpty: {
            message: "请输入商品库存"
          },
          //正则, 不能0开头，必须是数字
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入正确的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "请输入正确的尺码（比如：30-50）"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品价格"
          }
        }
      },
      productLogo: {
        validators: {
          notEmpty: {
            message: "请上传三张图片"
          }
        }
      }
    }
  });

  // 上传图片
  $('#fileupload').fileupload({
    dataType:'json',
    done:function(e,data){
      // console.log(data.result.picAddr);
      $('.imgdebox').append(('<img data-name="' + data.result.picName + '" data-src="'+data.result.picAddr+'" src="' + data.result.picAddr + '" width="100" height="100" alt="">'))
      if($('.imgdebox img').length ===  3){
        $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
      }else{
        $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }
      $('.imgdebox').off().on('dblclick','img',function(){
        $(this).remove();
        if($('.imgdebox img').length ===  3){
          $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
        }else{
          $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
        }
      })
    }
  })


  // 表单校验成功事件
  $form.on('success.form.bv',function(e){
    e.preventDefault();
    // console.log('data');
    var data = $form.serialize();
    var img = $('.imgdebox img');

    data += '&picName1=' + img[0].dataset.name + '&picAddr1=' +img[0].dataset.src;
    data += '&picName2=' + img[1].dataset.name + '&picAddr2=' +img[1].dataset.src;
    data += '&picName3=' + img[2].dataset.name + '&picAddr3=' +img[2].dataset.src;
    console.log(data);

    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function(data){
        console.log(data);
        if(data.success){
          currentPage = 1;
          ajax();

          $('#addModal').modal('hide');
          
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();

          $(".dropdown-text").text("请选择二级分类");
          $("#brandId").val('');
          $(".imgdebox img").remove();
          $("#productLogo").val('');
        }
      }
    })
  })
})