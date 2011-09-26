var currentPage = 1;
var totalPages = 1;
$(function (){
    xuanran();//渲染页面
    addCategory();//添加分类
    //渲染页面函数
    function xuanran(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            data:{page:currentPage,pageSize:6},
            success:function (obj){
                var html=template('tpl',obj);
                $("#main .right #info tbody").html(html);
                totalPages=Math.ceil(obj.total/obj.size);initPage(xuanran);
            }
        })
    }
    
    //添加分类的函数
    function addCategory(){
       
        $('.btn-addcate').on('click',function (){ 
            var categoryName=$('.categoryName').val();
            $.ajax({
                url:'/category/addTopCategory',
                type:'post',
                data:{categoryName:categoryName},
                success:function (obj){
                    xuanran();
                }
            })
        })
    }
})