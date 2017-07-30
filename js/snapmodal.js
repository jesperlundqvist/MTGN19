$(function(){
    $(document).click(function(e) {
        if ($(e.target).not($("#snapcode-link-inpho, #snapcode-link-kph, #snapcode-link-arr")) && $(e.target).not($("#snapcode-modal")))
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
        $("#snapcode-modal-img").attr("src", "images/inphosnap.png");
        e.stopPropagation();
    });

    $("#snapcode-link-arr").click(function(e) {
        $("#snapcode-modal").fadeIn();
        $("#snapcode-modal-description").text("arrsnap");
        $("#snapcode-modal-img").attr("src", "images/arrsnap.png");
        e.stopPropagation();
    });

    $("#snapcode-link-kph").click(function(e) {
        $("#snapcode-modal").fadeIn();
        $("#snapcode-modal-description").text("kphsnap");
        $("#snapcode-modal-img").attr("src", "images/kphsnap.png");
        e.stopPropagation();
    });
});
