$(document).ready(function () {

    $('#candidate-sign-up-btn').on('click', function (e) {
        e.preventDefault()
        var email = $('#candidate-email').val()
        var password = $('#candidate-password').val()

        var data = {
            'email': email,
            'password': password,
            'userType': 'C'
        }

        jQuery.ajax({
            url: '/user/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                var url = "candidate-home.html";
                $(location).attr('href', url);
            },
            error: function (response) {
                alert(response)
            }

        })

    })

    $('#recruiter-sign-up-btn').on('click', function (e) {
        e.preventDefault()
        var email = $('#recruiter-email').val()
        var password = $('#recruiter-password').val()

        var data = {
            'email': email,
            'password': password,
            'userType': 'R'
        }

        jQuery.ajax({
            url: '/user/register',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (response) {
                var url = "recruiter-home.html";
                $(location).attr('href', url);
            },
            error: function (response) {
                alert(response)
            }

        })
    })
})
