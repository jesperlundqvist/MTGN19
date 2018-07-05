$(document).ready(function() {
    $("#hamburger").click(function (event) {
        var left = $("#left-content").html();
        $("#left-content").html($("#right-content").html());
        $("#right-content").html(left);
    });
});
