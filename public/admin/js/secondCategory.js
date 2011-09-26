var currentPage = 1;
var totalPages = 1;
$(function (){
    //渲染页面
    xuanran();
    guan();
    function xuanran(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            data:{page:currentPage,pageSize:4},
            success:function (obj){
                console.log(obj);
                var html=template('tpl',obj);
                $("#main .right #info tbody").html(html);
                totalPages=Math.ceil(obj.total/obj.size);initPage(xuanran);
            }
        })
    }
    //生成馆
    function guan(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{page:1,pageSize:20},
            success:function (obj){
                console.log(obj);
                var html=template('tpl1',obj);
                $('.categoryName').html(html);
            }
        })
    }
})