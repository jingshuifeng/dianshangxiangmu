

$(function (){
    //请求数据渲染页面
    $.ajax({
        url:'/cart/queryCart',
        success:function (obj){
            console.log(obj);
            var html=template('tpl',{list:obj});
            $('#main .mui-scroll').html(html);
        }
    })
    //初始化滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //生成订单总额
    var altm=0;
    $('input:checked').data('price');
    
})