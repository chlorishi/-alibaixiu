$('#userForm').on('submit', function() {
    //获取表单内容 格式化成字符串
    var formData = $(this).serialize();


    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(param) {
            location.reload();
        },
        error: function(param) {
            alert('用户添加失败');
        }

    });
    //阻止表单默认行为
    return false;
});

//当用户选择头像文件
$('#modifyDiv').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //不解析请求参数
        processData: false,
        //不设置请求参数的类型
        contentType: false,
        success: function(response) {
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    });
});



//获取用户列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        var html = template('userTpl', {
            users: response
        });
        $('#tbu').html(html);
    }
});



//点击编辑 左侧展示修改用户信息     
$('#tbu').on('click', '.edit', function() {

    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            var html = template('modifyTpl', { user: response });
            $('#modifyDiv').html(html);
        }
    })
});






//修改用户信息
$('#modifyDiv').on('submit', '#modifyForm', function() {
    //获取表单内容 格式化成字符串
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.reload();

        },
        error: function(response) {
            alert('用户修改失败');
        }

    });
    //阻止表单默认行为
    return false;
});




//点击删除   
$('#tbu').on('click', '.del', function() {
    if (confirm('您确认删除该用户吗？')) {
        var id = $(this).attr('data-id');
    }
    $.ajax({
        type: 'delete',
        url: '/users/' + id,
        success: function(response) {
            location.reload();
        }
    });
});


//批量删除
var deleteMany = $('#deleteMany');
$('#checkBoxAll').on('change', function() {
    var status = $(this).prop('checked');

    $('#tbu').find('.checkBox').prop('checked', status);
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});
$('#tbu').on('change', '.checkBox', function() {
    if ($('.checkBox:checked').length == $('.checkBox').length) {
        $('#checkBoxAll').prop('checked', true);
    } else {
        $('#checkBoxAll').prop('checked', false);
    }

    if ($('.checkBox:checked').length > 1) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});


deleteMany.on('click', function() {
    if (confirm('确定批量删除用户吗？')) {
        var ids = [];
        $('.checkBox:checked').each(function(index, ele) {
            ids.push($(ele).attr('data-id'));
        });

        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function(response) {
                location.reload();
            }
        });

    }
})