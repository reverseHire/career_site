$(function () {
    $(document).on('click', '#logout-btn', function () {
        $.sessionStorage.clear()
        var url = '../index.html'
        $(location).attr('href', url)
    })
})