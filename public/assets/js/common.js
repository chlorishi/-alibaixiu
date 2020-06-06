//退出
$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗？');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function(re) {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        });
    };
});

//用户信息
$.ajax({
    url: '/users/' + userId,
    type: 'get',
    success: function(response) {
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
});