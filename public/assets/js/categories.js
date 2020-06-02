//展示分类列表
$.ajax({
    url: '/categories',
    type: 'get',
    success: function(response) {
        var html = template('categoriesTpl', {
            categories: response
        })
        $('#tb').html(html);
    },
    error: function(response) {}
});


//添加分类
$('#categories').on('submit', function() {
    var formData = $(this).serialize();

    $.ajax({
        url: '/categories',
        type: 'post',
        data: formData,
        success: function(response) {
            location.reload();
        },
        error: function(response) {}
    });
    return false;
});

//点击编辑 展示要修改数据
$('#tb').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            var html = template('modifyCategoriesTpl', response)
            $('#modifyBox').html(html);
        }
    })
});
//修改分类数据
$('#modifyBox').on('submit', '#categories', function() {
    var id = $(this).attr('data-id');
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        },
        error: function() {}
    });
    return false;
});

//删除数据
$('#tb').on('click', '.del', function() {
    if (confirm('您确定删除该分类吗？')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(response) {
                location.reload();
            }
        });
    };
});
//批量删除
$('#checkAll').on('change', function() {
    var status = $(this).prop('checked');
    $('#tb').find('input').prop('checked', status);
    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});

$('#tb').on('change', 'input', function() {
    if ($('#tb input:checked').length == $('#tb input').length) {
        $('#checkAll').prop('checked', true);
    } else {
        $('#checkAll').prop('checked', false);
    };

    if ($('#tb input:checked').length > 1) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    };
});

$('#deleteMany').on('click', function() {
    var ids = [];
    $('#tb input:checked').each(function(index, ele) {
        ids.push($(ele).attr('data-id'));
    });
    $.ajax({
        type: 'delete',
        url: '/categories/' + ids.join('-'),
        success: function(response) {
            location.reload();
        }
    })
});