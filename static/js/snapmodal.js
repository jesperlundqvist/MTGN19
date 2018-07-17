$(function(){
    $(document).click(function(e) {
        if ($(e.target).has($("#snapcode-modal-content")).length != 0)
        {
            $("#snapcode-modal").fadeOut();
        }
    });

    $("#snapcode-modal-x").click(function(e) {
        $("#snapcode-modal").fadeOut();
    });

    $("#snapcode-link-inpho").click(function(e) {
        $("#snapcode-modal").fadeIn();
        $("#snapcode-modal-description").text("inphosnap");
        $("#snapcode-modal-img").attr("src", "/static/images/inphosnap.png");
        e.stopPropagation();
    });

    $("#snapcode-link-arr").click(function(e) {
        $("#snapcode-modal").fadeIn();
        $("#snapcode-modal-description").text("arrsnap");
        $("#snapcode-modal-img").attr("src", "/static/images/arrsnap.png");
        e.stopPropagation();
    });

    $("#snapcode-link-kph").click(function(e) {
        $("#snapcode-modal").fadeIn();
        $("#snapcode-modal-description").text("kphsnap");
        $("#snapcode-modal-img").attr("src", "/static/images/kphsnap.png");
        e.stopPropagation();
    });
});
