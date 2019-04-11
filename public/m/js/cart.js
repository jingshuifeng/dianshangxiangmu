

$(function () {
    //请求数据渲染页面
    // $.ajax({
    //     url:'/cart/queryCart',
    //     success:function (obj){
    //         console.log(obj);
    //         var html=template('tpl',{list:obj});
    //         $('#main .mui-scroll').html(html);
    //     }
    // })
    //判断是否登录
    $.ajax({
        url: '/cart/queryCart',
        success: function (obj) {
            console.log(obj);
            if (obj.error == 400) {
                location = "login.html?returnUrl=" + location.href;
            }
        }
    })
    //刷新页面
    function shuaixin() {
        $.ajax({
            url: '/cart/queryCartPaging',
            data: { page: 1, pageSize: 4 },
            success: function (obj) {
                console.log(obj);
                var html = template('tpl', { list: obj.data });
                $('#main .mui-scroll').html(html);
                mui('#pullrefresh').pullRefresh().refresh(true);
                page = 1;
                getSum();
                $('.mui-checkbox input').on('change', function () {
                    getSum();
                });
            }
        })
    }
    mui.init({
        pullRefresh: {
            container: '#pullrefresh',//这是最外层盒子的选择器
            down: {
                contentdown: "你可以下拉",
                contentover: "你可以松手了",
                contentrefresh: "正在拼命加载中...",
                auto: true,
                callback: pulldownRefresh
            },
            up: {
                contentrefresh: "哥正在拼命加载中...",
                contentnomore: '我是有底线的',
                callback: pullupRefresh
            }
        }
    });
    /**
    * 下拉刷新具体业务实现
    */
    function pulldownRefresh() {

        shuaixin();
        mui('#pullrefresh').pullRefresh().endPulldownToRefresh();

    }
    /**
    * 上拉加载具体业务实现
    */
    var page = 1;
    function pullupRefresh() {

        page++;
        $.ajax({
            url: '/cart/queryCartPaging',
            data: { page: page, pageSize: 2 },
            success: function (obj) {
                console.log(obj);
                if (obj.data) {
                    console.log(111);
                    var html = template('tpl', { list: obj.data });
                    $('#main .mui-scroll').append(html);
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                    getSum();
                    $('.mui-checkbox input').on('change', function () {
                        getSum();
                    });
                } else {
                    console.log(222);
                    mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                    getSum();
                    $('.mui-checkbox input').on('change', function () {
                        getSum();
                    });
                }
            }
        })

    }
    //初始化滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    //删除的事件
    
    $('#main .mui-scroll-wrapper .mui-scroll').on('tap', '.btn-delete', function () {
        var btnArray = ['确认', '取消'];
        var id = $(this).data('id');
        var li = $(this).parent().parent();
        mui.confirm('确认删除该条记录？', '温馨提示', btnArray, function (e) {
            if (e.index == 0) {
                $.ajax({
                    url: '/cart/deleteCart',
                    data: { id: id },
                    success: function (obj) {
                        if (obj.success) {
                            shuaixin();
                        }
                    }
                })
            } else {
                    mui.swipeoutClose(li[0]);//这个地方要加下标
            }
        });


    })

    $('#main .mui-scroll-wrapper .mui-scroll').on('tap', '.btn-edit', function () {
        var btnArray = ['确认', '取消'];
        var li = $(this).parent().parent();
        var obj=$(this).data('edit');
        console.log(obj);
        var min=obj.productSize.split('-')[0];
        var max=obj.productSize.split('-')[1];
        var arr=[];
        for(var i=min;i<=max;i++){
            arr.push(+i);
        }
        obj.arr=arr;

        console.log(obj);
        var html=template('edittpl',obj);
        html = html.replace(/[\r\n]/g, '');
        
        console.log(html);
        mui.confirm(html, '温馨提示', btnArray, function (e) {
            if (e.index == 0) {
                var size = $('.btn-size.mui-btn-warning').data('size');
                console.log('size'+size);
                // 5.2 获取当前选择的数量
                var num = mui('.mui-numbox').numbox().getValue();
                console.log(num);
                // 6. 调用编辑的API接口把最新的尺码数量 商品id传个后台
                $.ajax({
                    url: '/cart/updateCart',
                    type: 'post',
                    // data里面所有数据 里面包含了id
                    data: {
                        id: obj.id,
                        size: size,
                        num: num
                    },
                    success: function (data) {
                        //   7. 判断如果编辑成功调用查询刷新页面
                        if (data.success) {
                            shuaixin();
                           
                        }
                    }
                })
               
            } else {
                    mui.swipeoutClose(li[0]);//这个地方要加下标
            }
        });
        mui('.mui-numbox').numbox();
        var parent=$(this).parent().parent();
        $('.btn-size').on('tap', function () {
            $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
        });
    })
   function getSum(){//计算总金额
    var checkeds=$('.mui-checkbox input:checked');
    console.log(checkeds);
    var sum=0;
    checkeds.each(function (index,value){
        var price=+$(value).data('price');
        var num=+$(value).data('num');
        var count=price*num;
        sum+=count;
    });
    sum=sum.toFixed(2);//保留两位小数
    console.log(sum);
    $('.dingdan strong').html(sum);
   }
})