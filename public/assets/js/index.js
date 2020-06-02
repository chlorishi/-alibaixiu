$.ajax({
    url: '/posts/count',
    type: 'get',
    success: function(response) {
        var html = template('postsTpl', response);
        $('#posts').html(html);
    }
});

$.ajax({
    url: '/categories/count',
    type: 'get',
    success: function(response) {
        var html = template('categoriesTpl', response);
        $('#categories').html(html);
    }
});

$.ajax({
    url: '/comments/count',
    type: 'get',
    success: function(response) {
        var html = template('commentsTpl', response);
        $('#comments').html(html);
    }
});