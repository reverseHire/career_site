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
                $.sessionStorage.set("email", email)
                $.sessionStorage.set("userType", "C")
                var url = "candidate-home.html";
                $(location).attr('href', url);
            },
            error: function (response) {
                alert(response)
            }

        })

    })

    $('#recruiter-login-btn').on('click', function (e) {
        e.preventDefault()
        var email = $('#recruiter-email').val()
        var password = $('#recruiter-password').val()

        var data = {
            'email': email,
            'password': password,
            'userType': 'R'
        }

        jQuery.ajax({
            url: '/user/login',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                $.sessionStorage.set("email", email)
                $.sessionStorage.set("userType", "R")
                var url = "recruiter-home.html";
                $(location).attr('href', url);
            },
            error: function (response) {
                alert(response)
            }

        })
    })
})
