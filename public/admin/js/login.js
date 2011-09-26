$(function (){
    $('.btn-login').on('click',function (){
        var username=$('.username').val().trim();
        var password=$('.password').val().trim();
        console.log(11);
        if(!username){
            alert('请输入用户名');
        }
        if(!password){
            alert('请输入密码');
        }
        $.ajax({
            url:'/employee/employeeLogin',
            type:'post',
            data:{username:username,password:password},
            success:function (obj){
                console.log(obj);
                if(obj.error){
                    alert(obj.message);
                }
                if(obj.success){
                    location="index.html";
                }
            }
        })
    })
})