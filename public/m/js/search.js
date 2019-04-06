

$(function () {
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 
    });
    //添加历史记录的函数
    function addHistory() {
        var arr = [];
        $('.btn-search').on('tap', function () {
            var search = $('.input-search').val().trim();
            if (search != "") {
                //从浏览器取得数据arr判断search是否在里面
                var str = localStorage.getItem('history');

                if (str != null) {
                    arr = JSON.parse(str);
                } else {
                    arr = [];
                }
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == search) {
                        arr.splice(i, 1);
                        i--;
                    }
                }
                arr.unshift(search);
                var str = JSON.stringify(arr);
                localStorage.setItem('history', str);
                $('.input-search').val("");
                queryHistory();
            }
        })

    }
    //查询结果的函数
    function queryHistory() {
        var arr = localStorage.getItem('history');
        if (arr == null) {
            arr = [];
        } else {
            arr = JSON.parse(arr);
        }
        var html = template('historyTpl', { rows: arr });
        $('.search-history ul').html(html);
    }
    //单个XX删除的函数
    function deleteHistory() {
        $('.search-history ul').on('tap', 'span', function () {
            var arr = localStorage.getItem('history');
            if (arr == null) {
                arr = [];
            } else {
                arr = JSON.parse(arr);
            }
            var tet = $(this).parent().text().trim();
            console.log(arr,tet);

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] ==tet) {
                    arr.splice(i, 1);
                    i--;
                }
            }
            arr = JSON.stringify(arr);
            localStorage.setItem('history', arr);
            queryHistory();
        })

    }
    //清空记录的函数
    function clearHistory() {
        $('.btn-clear').on('tap',function (){
            localStorage.removeItem('history');
            queryHistory();

        })
    }
})