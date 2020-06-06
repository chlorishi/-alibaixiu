var key = getUrlParam('key');


$.ajax({
    url: '/posts/search/' + key,
    type: 'get',
    success: function(response) {
        console.log(key);

        var html = template('searchTpl', { data: response });
        $('#listBox').html(html);
    }
});