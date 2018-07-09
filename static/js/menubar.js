$(document).ready(function() {
    $("#hamburger").click(function (event) {
        var left = $("#left-content").html();
        $("#left-content").html($("#right-content").html());
        $("#right-content").html(left);

        if ($("#hamburger").text() == "☰")
        {
            $('#hamburger').animate({'opacity': 0}, 100, function () {
                $(this).text('✖');
            }).animate({'opacity': 1}, 100);
        }
        else
        {
            $('#hamburger').animate({'opacity': 0}, 100, function () {
                $(this).text('☰');
            }).animate({'opacity': 1}, 100);
        }
    });
});
