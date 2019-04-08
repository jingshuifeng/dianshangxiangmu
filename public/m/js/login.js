$(function () {
    // 使用正则匹配url参数 返回这个匹配成功的值 根据参数名获取参数的值
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            console.log(r);
            // 别人之前使用unescape 方式解密  但是我们默认是encodeURI加密 使用 decodeURI 解密
            return decodeURI(r[2]);
        }
        return null;
    }
    var url= getQueryString('returnURL');
    console.log(url);
    //登录
    $('.mui-btn-primary').on('tap',function (){
        var usrname=$('.mui-input-clear').val();
        var password=$('.mui-input-password').val();
        $.ajax({
            url:'/user/login',
            type:'post',
            data:{
                username:usrname,
                password:password
            },
            success:function (obj){ 
                console.log(obj);
                if(obj.success){
                    location=url;
                }else{
                    mui.toast(obj.message,{ duration:'long', type:'div' })
                }
                
            }
        })
    })
    //取消
    $('.mui-btn-danger').on('tap',function (){
        alert(222);
    })
})