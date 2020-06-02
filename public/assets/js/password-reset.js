$('#modifyPass').on('submit', function() {

    var oldVal = $("#old").val();
    var password = $("#password").val();
    var confirmVal = $("#confirm").val();
    // var formData = $(this).serialize();


    $.ajax({
        url: '/users/password',
        type: 'put',
        data: {
            userPass: oldVal,
            newPass: password,
            confirmPass: confirmVal
        },
        success: function(response) {
            location.href = "login.html";
        },
        error: function(response) {
            alert('密码修改失败');
        },
    });


    return false;
})