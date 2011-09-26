// 公共的退出登录函数
function exit() {
    // 1. 获取退出登录按钮添加点击事件
    $('.exit').on('click', function () {
        //   2. 调用请求退出登录
        $.ajax({
            url: '/employee/employeeLogout',
            success: function (data) {
                console.log(data);
                //   3. 判断退出成功就跳转到登录
                if (data.success) {
                    location = 'login.html';
                }
            }
        })
    });
}
// 初始化分页 callback就叫做回调函数
function initPage(callback) {
    $("#page").bootstrapPaginator({
        bootstrapMajorVersion: 3, //对应的bootstrap版本
        currentPage: currentPage, //当前页数 当前显示第几页
        numberOfPages: 10, //每次显示页数 每次显示多少个按钮
        totalPages: totalPages, //总页数  总共有多少页
        shouldShowPage: true, //是否显示该按钮 是否显示分页按钮
        useBootstrapTooltip: true, // 使用bootstrap 工具提示
        //点击事件 当点击了每一个按钮都会会触发事件
        onPageClicked: function (event, originalEvent, type, page) {

            // 触发分页按钮点击的时候 修改全局变量currentPage值 为当前点击page
            currentPage = page;
            console.log(currentPage);
            // 当点击的分页改了数据重新请求和渲染
            // queryTopCategory();
            // 选择调用callback 回调函数而不是固定一个函数
            callback();
        }
    });
}