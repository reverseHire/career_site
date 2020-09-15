$(document).ready(function () {

    $('#candidate-login-btn').on('click', function (e) {
        e.preventDefault()
        var email = $('#candidate-email').val()
        var password = $('#candidate-password').val()

        var data = {
            'email': email,
            'password': password,
            'userType': 'C'
        }

        jQuery.ajax({
            url: '/user/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                alert('success')
            },
            error: function (response) {
                alert('fail')
            }

        })

    })

    $('#company-login-btn').on('click', function () {
        alert('Hello')
    })
})
