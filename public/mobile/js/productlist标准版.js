$(function() {
    var page = 1;
    var pageSize = 2;
   
    var search = getQueryString('search');
  
    $.ajax({
        url: '/product/queryProduct',
        data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
        success: function(obj) {
          
            var html = template('productlistTpl', obj);
         
            $('.product-box').html(html);
        }
    });
   
    $('.btn-search').on('tap', function() {
       
        search = $('.input-search').val();
      
        if (!search.trim()) {
            alert('请输入合法的内容');
         
            return false;
        }
     
        page = 1;
     
        mui('#refreshContainer').pullRefresh().refresh(true);
    
        $.ajax({
            url: '/product/queryProduct',
            data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
            success: function(data) {
            
                var html = template('productlistTpl', data);
         
                $('.product-box').html(html);
            }
        });
    });
   
    $('.product-list .title a').on('tap', function() {
    
        var sortType = $(this).data('sort-type');
       
        var sort = $(this).data('sort');
    
        if (sort == 1) {
            sort = 2;
          
            $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
        } else {
            sort = 1;
     
            $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
      
        $(this).data('sort', sort);
        
        if (sortType == 'price') {
           
            $.ajax({
                url: '/product/queryProduct',
                data: { proName: search, page: page || 1, pageSize: pageSize || 2, price: sort },
                success: function(data) {
                  
                    var html = template('productlistTpl', data);
                
                    $('.product-box').html(html);
                }
            });
        } else if (sortType == 'num') {
          
            $.ajax({
                url: '/product/queryProduct',
                data: { proName: search, page: page || 1, pageSize: pageSize || 2, num: sort },
                success: function(data) {
                
                    var html = template('productlistTpl', data);
                  
                    $('.product-box').html(html);
                }
            });
        }
     
        $(this).parent().addClass('active').siblings().removeClass('active');
    });
    
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                contentdown: "你可以下拉",
                contentover: "你可以松手了",
                contentrefresh: "正在拼命加载中...",
                callback: function() {
                    page = 1;
                    setTimeout(function() {
                        $.ajax({
                            url: '/product/queryProduct',
                            data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
                            success: function(data) {
                              
                                var html = template('productlistTpl', data);
                             
                                $('.product-box').html(html);
                             
                                mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                               
                                mui('#refreshContainer').pullRefresh().refresh(true);
                            }
                        });
                    }, 2000)
                }
            },
            up: {
                contentrefresh: "哥正在拼命加载中...",
                contentnomore: '我是有底线的',
                callback: function() {
                    setTimeout(function() {
                        page++;
                        $.ajax({
                            url: '/product/queryProduct',
                            data: { proName: search, page: page || 1, pageSize: pageSize || 2 },
                            success: function(data) {
                               
                                if (data.data.length > 0) {
                                   
                                    var html = template('productlistTpl', data);
                                   
                                    $('.product-box').append(html);
                                   
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                                } else {
                                   
                                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                                }
                            }
                        });
                    }, 2000)
                }
            }
        }
    });
    $('.product-box').on('tap','.product-buy',function () {
        var id = $(this).data('id');
        console.log(id);
        location = 'detail.html?id='+id;
    });
});
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}
