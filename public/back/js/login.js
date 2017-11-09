$(function(){
    var $form = $('form');
    // 表单验证
    $form.bootstrapValidator({
        // 定义错误时的字体颜色
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        // 定义规则
        fields:{
            username:{
                validators:{
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                    callback:{
                        message:'用户名错误'
                    } 
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    stringLength:{
                        min:6,
                        max:30,
                        message:'用户名长度6-30位之间'
                    },
                    callback:{
                        message:'用户名错误'
                    } 
                }
            }
        }
    })

    // 提交表单验证
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$form.serialize(),
            success:function(data){
                // console.log(data);
                if(data.success){
                    location.href = 'index.html';
                }
                if(data.error === 1000){
                    $form.data('bootstrapValidator').updateStatus('username',"INVALID","callback");
                }
                if(data.error === 1001){
                    $form.data('bootstrapValidator').updateStatus('password',"INVALID","callback");
                }
            }
        })
    })

    // 重置表单
    $("[type='reset']").on("click",function(){
        $form.data("bootstrapValidator").resetForm();
    })

})


