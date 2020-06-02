//展示文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        var html = template('postsTpl', response);
        $('#tb').html(html);

        var page = template('pageTpl', response);
        $('#page').html(page);
    }
});

template.defaults.imports.dateFormat = formatDate;
//格式化日期
function formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

//分页
function changePage(param) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: param,
        },
        success: function(response) {
            var html = template('postsTpl', response);
            $('#tb').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
};

//展示分类列表
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {
        var html = template('categoriesTpl', {
            categories: response
        })
        $('#categories').html(html);
    },
    error: function(response) {}
});

//筛选
$('#chooseBox').on('submit', function() {
    var formDate = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formDate,
        success: function(response) {
            var html = template('postsTpl', response);
            $('#tb').html(html);

            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });

    return false;
});


//文章删除
$('#tb').on('click', '.del', function() {
    if (confirm('您确定要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: "/posts/" + id,
            success: function(param) {
                location.reload();
            }
        });
    }
});