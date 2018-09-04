$(function(){
    $(document).click(function(e) {
        if ($("#n0g-popup").is(":visible")) {
            $("#n0g-popup").hide();
            $("#n0g-header").css("display", "flex");
        }
    });
});
