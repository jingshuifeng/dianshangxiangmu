var currentPage = 1;
var totalPages = 1;
    $(function () {
      
    queryUser();
    exit();
    //刷新页面
    function queryUser() {
        $.ajax({
            url: '/user/queryUser',
            data: { page: currentPage, pageSize: 6 },
            success: function (obj) {
                console.log(obj);
                var html = template('tpl', obj);
                $('#user-tbody').html(html);
                $('#user-tbody').on('click', '.btn', changeStaus);
                totalPages = Math.ceil(obj.total / obj.size);
                //初始化页码事件
                initPage(queryUser);
            }
        })
    }
    //修改状态函数
    function changeStaus() {
        var status = $(this).data('status');
        var id = $(this).data('id');
        status = status ? 0 : 1;
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: status
            },
            success: function (data) {
                console.log(data);
                // 5. 判断如果修改成功调用查询重新渲染页面
                if (data.success) {
                    queryUser();
                }
            }
        })
    }

})