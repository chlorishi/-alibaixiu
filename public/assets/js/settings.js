//网站图标上传
$('#file').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);
    $.ajax({
        url: '/upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#logo').val(response[0].logo);
            $('#preview').attr('src', response[0].logo);
        }
    });
})

//网站添加信息
$('#settingsForm').on('submit', function() {
    var formData = $(this).serialize();

    $.ajax({
        url: '/settings',
        type: 'post',
        data: formData,
        success: function(response) {
            location.reload();
        }
    })
    return false;
});
//显示设置数据
$.ajax({
    url: '/settings',
    type: 'get',
    success: function(response) {
        if (response) {
            $('#logo').val(response.logo);
            $('#preview').attr('src', response.logo);
            $('input[name="title"]').val(response.title);
            $('input[name="comment"]').prop('checked', response.comment);
            $('input[name="review"]').prop('checked', response.review);
        }
    }
})