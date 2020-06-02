//添加轮播图
$('#file').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('image', file);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#image').val(response[0].image);
            $('#preview').attr({
                style: 'display="block"',
                src: response[0].image
            });
        }
    });
});

$('#slidesForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        url: '/slides',
        type: 'post',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
})

//展示
$.ajax({
    url: '/slides',
    type: 'get',
    success: function(response) {
        var html = template('slideTpl', {
            data: response
        });
        $('#tb').html(html);
    }
});
//删除
$('#tb').on('click', '.del', function() {
    if (confirm('您真的要删除吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/slides/' + id,
            type: 'delete',
            success: function(response) {
                location.reload();
            }
        });
    }
})