$(function () {
    var vCode='';
    getVcode();
    console.log(vCode);
    $('.mui-btn-danger').on('tap', function () {
        console.log(11);
        var check=true;
        mui("#input_example input").each(function () {
            //若当前input为空，则alert提醒 
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑 
        if (check) {
           var mobile=$('.mobile').val().trim();
            if(!isPoneAvailable(mobile)){
                mui.toast('手机号输入不合法', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var username = $('.username').val().trim();
            if (username.length >= 10) {
                mui.toast('你的用户名太长了要小于10个字母', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var password1 = $('.password1').val().trim();
            var password2 = $('.password2').val().trim();
            // 4.3 判断两次输入密码是否一致
            if (password1 != password2) {
                mui.toast('两次输入的密码不一致', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            var vcode = $('.vcode').val().trim();
            console.log(vcode,vCode);
            if(vcode!=vCode){
                mui.toast('验证码输入错误', {
                    duration: 'long',
                    type: 'div'
                });
                return;
            }
            $.ajax({
                url:'/user/register',
                type: 'post',
                data: {
                    username: username,
                    password: password1,
                    mobile: mobile,
                    vCode: vCode
                },
                success: function (data) {
                    //  6. 判断返回数据是否有错
                    if (data.error) {
                        // 7. 把错误信息提示一下
                        mui.toast(data.message, {
                            duration: 'long',
                            type: 'div'
                        });
                    } else {
                        // 8. 如果没有报错表示注册成功 去跳转到登录页面 但是登录成功要跳转到主页
                        // location = 'login.html?returnUrl='+location.href;
                        location = 'login.html?returnUrl=user.html';
                    }
                }
            })
        }

    })

    // 判断手机号是否合法
    function isPoneAvailable(mobile) {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(mobile)) {
            return false;
        } else {
            return true;
        }
    }
    //获取验证码
    
    function getVcode(){
        $('.btn-vcode').on('tap',function (){
            console.log(22);
            $.ajax({
                url: '/user/vCode',
                success: function (data) {
                    // 3. 把验证码打印到控制台
                    console.log(data.vCode);
                    // 把后台返回的验证码赋值给全局变量
                    vCode=data.vCode;
                }
            })
        })
    }
})