

$(function () {
    mui('.mui-wrapper-new').scroll({
        deceleration: 0.0005 
    });
    var search = GetQueryString('search');
    console.log(search);
    //取得页面传过来的搜索参数
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配

        if (r != null)
            console.log(r);
        return decodeURI(r[2]);
    }
    //发请求得到数据渲染页面
    $.ajax({
        url: '/product/queryProduct',
        data: {
            page: 1,
            pageSize: 2,
            proName: search
        },
        success: function (obj) {
            console.log(obj);
            var html = template('tpl', obj);
            $('.product-list .mui-row').html(html);
        }
    })
    nowSearchProduct();
    //当前的搜索框
    function nowSearchProduct() {
        $('.btn-search').on('tap', function () {
            var search = $('.input-search').val().trim();
            if (search != "")
                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        page: 1,
                        pageSize: 2,
                        proName: search
                    },
                    success: function (obj) {
                        console.log(obj);
                        var html = template('tpl', obj);
                        $('.product-list .mui-row').html(html);
                        $('.input-search').val('');
                    }
                })
        })
    }
    //定义一个排序的函数
    sortProduct();
    function sortProduct() {
        $('.mui-card-header a').on('tap', function () {
            var type = $(this).data('type');
            var sort = $(this).data('sort');
            if (sort == 1) {
                sort = 2;
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                sort = 1;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            $(this).data('sort', sort);
            $(this).addClass('active').siblings().removeClass('active');
            var obj = {
                page: 1,
                pageSize: 2,
                proName: search
            }
            obj[type] = sort;
            //发请求得到数据渲染页面
            $.ajax({
                url: '/product/queryProduct',
                data: obj,
                success: function (obj) {
                    console.log(obj);
                    var html = template('tpl', obj);
                    $('.product-list .mui-row').html(html);
                }
            })
        })
    }
    //下拉刷新和加载函数
    pullnew();
    function pullnew() {
        //初始化下拉刷新与加载
        mui.init({
            pullRefresh: {
                container: "#pullrefresh",
                down: {
                    contentdown: "你可以下拉",
                    contentover: "你可以松手了",
                    contentrefresh: "正在拼命加载中...",
                    callback: pulldownRefresh//下拉刷新回调函数
                },
                up: {
                    contentrefresh: "哥正在拼命加载中...",
                    contentnomore: '我是有底线的',
                    callback: pullupRefresh//上拉加载函数
                }
            }
        });
        //下拉刷新回调函数
        function pulldownRefresh() {
            setTimeout(function () {
                //发请求得到数据渲染页面
                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        page: 1,
                        pageSize: 2,
                        proName: search
                    },
                    success: function (obj) {
                        console.log(obj);
                        var html = template('tpl', obj);
                        $('.product-list .mui-row').html(html);
                        mui('#pullrefresh').pullRefresh().refresh(true);
                        page=1;
                    }
                })
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//这是阻止那个东西一直转的东东
            }, 1500)
        }
        //上拉加载函数
        var page = 1;//默认显示一页
        function pullupRefresh() {
            setTimeout(function () {
                page++;//每次下拉显示下一页的数据
                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        page: page,
                        pageSize: 2,
                        proName: search
                    },
                    success: function (res) {
                        if (res.data.length > 0) {//如果有数据
                            var html = template('tpl', res);
                            $('.product-list .mui-row').append(html);//用append添加到页面

                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();//结束页面一直跳加载
                        } else {//没有数据了直接阻止跳转
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        }

                    }
                })
            }, 1500)
        }
    }
    //给每一个button加点击事件跳转到详情页面
    dianji();
    function dianji(){
        $('.product-list').on('tap','button',function (){
            var id=$(this).data('id');
            location="detail.html?id="+id;
        })
    }
})