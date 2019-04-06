$(function () {
    // 如果考虑性能优先使用tap 的js方式调整
    //   1. 先获取返回上一页的元素 移动端推荐使用tap事件 不会延迟  zepto里面封装好了tap事件
    $('#header .left').on('tap', function () {
        // 2. 当点击的时候调用 历史记录返回上一页
        history.back();
    });

    // 由于区域滚动默认也是没有初始化需要手动初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators: true, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
})