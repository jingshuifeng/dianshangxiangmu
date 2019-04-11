

$(function(){
    //发请求是否登录
    $.ajax({
        url:'/user/queryUserMessage',
        success:function (obj){
            if(!obj.error){
                 var html=template('tpl',obj);
            $('#main ul').prepend(html);
            }else{
                location="login.html?returnUrl="+location.href;
            }
           
        }
    })
    $('.btn-exit').on('tap',function (){
        $.ajax({
            url:"/user/logout",
            success:function (obj){
                console.log(obj);
                if(obj.success){
                    location="login.html?returnUrl="+location.href;
                }
            }
        })
    })
})