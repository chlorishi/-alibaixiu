var id = getUrlParam('id');
var review;
$.ajax({
    url: '/posts/' + id,
    type: 'get',
    success: function(response) {
        var html = template('detailTpl', response);
        $('#detailBox').html(html);
    }
});


//点赞
$('#detailBox').on('click', '#like', function() {
    $.ajax({
        url: '/posts/fabulous/' + id,
        type: 'post',
        success: function(response) {
            alert('点赞成功')
        }
    })
})


//获取网站配置信息
$.ajax({
    url: '/settings',
    type: 'get',
    success: function(response) {
        review = response.review;
        if (response.comment) {
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
})


$('#comment').on('submit', 'form', function() {
    var content = $(this).find('textarea').val();
    var state;
    if (review) {
        state = 0;
    } else {
        state = 1;
    }
    $.ajax({
        url: '/comments',
        type: 'post',
        data: { content: content, post: id, state: state },
        success: function(response) {
            alert('评价成功');
            location.reload();
        },
        error: function() {
            alert('评论失败')
        }
    })
    return false;
})