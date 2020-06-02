//获取分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('selTpl', {
            cate: response
        });
        $('#category').html(html);
    }
});


//封面图片上传
$('#feature').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#thumbnail').val(response[0].cover);
            $('#preview').attr('src', response[0].cover).show();
        }
    });
});

//提交新文章
$('#postArt').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(response) {
            location.href = "/admin/posts.html";
        }
    })
    return false;
});


//从浏览器获取修改参数
function getUrlParam(name) {
    var arr = location.search.substr(1).split('&');
    for (var i = 0; i < arr.length; i++) {
        var tmp = arr[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
};
var id = getUrlParam('id');

if (id != -1) {
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function(param) {
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories) {
                    param.categories = categories;
                    var html = template('modifyTpl', param);
                    $('#parentBox').html(html);
                }
            });
        }
    })
};
//修改提交
$('#parentBox').on('submit', '#modifyFrom', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/posts/' + id,
        data: formData,
        success: function(response) {
            location.href = "/admin/posts.html";
        }
    })
    return false;
});