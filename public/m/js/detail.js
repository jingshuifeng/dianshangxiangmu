$(function () {
  
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });
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
    var id = getQueryString('id');
    $.ajax({
        url: '/product/queryProductDetail',
        data: { id: id },
        success: function (obj) {
            var min = obj.size.split('-')[0];
            var max = obj.size.split('-')[1];
            var arr = [];
            for (var i = min; i <= max; i++) {
                arr.push(+i);
            }
            obj.size = arr;
            console.log(obj);
            var html = template('tpl', obj);
            $('#main .mui-scroll').html(html);
            //动态添加元素之后手动初始化轮播图和数字按钮
            //初始化轮播图
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000
            });
            //初始化数字框
            mui('.mui-numbox').numbox();
            //点击按钮变化颜色
            $('.detail-size').on('tap','button',function (){
                $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
            });
        }
    })
    //加入购物车
    $('.btn-add-cart').on('tap',function (){
        //发送一个请求看是否登录成功
        var num=mui('.mui-numbox').numbox().getValue();
        var size=$('.mui-btn-warning').data('size');
        console.log(size);
        if(!size){
            mui.toast('请选择一个尺寸',{ duration:'long', type:'div' })
            return;
        }
        $.ajax({
            url:'/cart/addCart',
            type:'post',
            data:{productId:id,num:num,size:size},
            success:function (obj){
                console.log(obj);
                if(obj.error==400){
                    location="login.html?returnURL="+location.href;
                }else{
                    mui.confirm('您真的要去购物车查看吗？','温馨提示',['确定','取消'],function (e){
                        if(e.index==0){
                            location='cart.html';
                        }else{
                            mui.toast('请继续添加!',{
                                duration:1000,
                                type:'div'
                            })
                        }
                    })
                }
            }
        })
        
    })
})