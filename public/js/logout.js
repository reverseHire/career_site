$(function () {
    $(document).on('click', '#logout-btn', function () {
        var url = '../index.html'
        $(location).attr('href', url)
    })
})