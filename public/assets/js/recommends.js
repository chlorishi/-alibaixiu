//请求热门数据
$.ajax({
    url: '/posts/recommend',
    type: 'get',
    success: function(response) {
        console.log(response);

        var html = template('hotsTpl', {
            data: response
        });
        $('#hotsBox').html(html);
    }
})