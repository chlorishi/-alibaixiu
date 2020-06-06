var id = getUrlParam('categoryId');
$.ajax({
    url: '/posts/category/' + id,
    type: 'get',
    success: function(response) {
        var html = template('listTpl', {
            data: response
        });
        $('#listBox').html(html);
    }
});