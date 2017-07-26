$(document).on({
    ajaxStart: function() {
        $("#loader").addClass("loader-active");
        $(".gallery-large").hide();
    },
});

$(window).on("load", function() {
    $("#loader").removeClass("loader-active");
    $(".gallery-large").show();
    setAspectRatioOfPlayer();
});

function getUrlFromElem(elem) {
    var css = elem.css("background-image");
    var img = css.replace(/(?:^url\("?.*images\/uploads\/gallery\/thumbs\/["']?|["']?"?\)$)/g, "");
    img = "images/uploads/gallery/large/" + img;
    return img;
}

function getVideoIdFromYouTubeThumb(elem) {
    var css = elem.css("background-image");
    var videoid = css.replace(/(?:^url\("?http:\/\/img.youtube.com\/vi\/["']?|["']?\/hqdefault.jpg"?\)$)/g, "");
    return videoid;
}

function scrollToTarget(container, target) {
    // Hur mycket utrymme tills den ska scrolla igen
    var padding = 0;

    // Relativa positioner till scrollbaren
    var targetLeft = target.offset().left - container.offset().left;
    var targetRight = targetLeft + target.width();

    // Kolla ifall thumbnailen inte syns
    if (targetLeft < padding || targetRight > container.width()-padding)
    {
        var scroll = 0;

        // Åt vänster
        if (targetLeft < 0)
        {
            scroll = targetLeft - padding;
        }
        // Åt höger
        else if (targetRight > container.width())
        {
            scroll = targetRight - container.width() + padding;
        }

        scroll += container.scrollLeft();
        container.scrollLeft(scroll);
    }
}

function setLargeFromThumbElem(thumb) {
    if (!thumb.is(current) && thumb.length != 0)
    {
        $("#gallery-ytplayer").attr("src", "");
        $("#gallery-large-image").show();
        $("#gallery-ytplayer").hide();

        thumb.addClass("gallery-active-image");
        if (current) {
            current.removeClass("gallery-active-image");
        }

        if (thumb.hasClass("image"))
        {
            $("#gallery-large-image").attr('src', getUrlFromElem(thumb));
        }
        else if (thumb.hasClass("video"))
        {
            $("#gallery-ytplayer").attr("src", "https://www.youtube.com/embed/" + getVideoIdFromYouTubeThumb(thumb) + "?modestbranding=1&autoplay=1&rel=0&showinfo=0");
            $("#gallery-ytplayer").show();
            setAspectRatioOfPlayer();
            $("#gallery-large-image").hide();
        }

        scrollToTarget($(".gallery-carousel"), thumb);

        current = thumb;
    }

    if (thumb.length == 0) {
        $("#gallery-large-image").attr('src', "");
        $("#gallery-ytplayer").attr("src", "");
        $("#gallery-large-image").hide();
        $("#gallery-ytplayer").hide();
    }
}

function previousImage() {
    var prev = current.prevAll(".gallery-active-filter-type.gallery-active-filter-week.gallery-active-filter-event").eq(0);
    if (prev.length && prev.is(".gallery-active-filter-type.gallery-active-filter-week.gallery-active-filter-event")) {
        setLargeFromThumbElem(prev);
    }
}

function nextImage() {
    var next = current.nextAll(".gallery-active-filter-type.gallery-active-filter-week.gallery-active-filter-event").eq(0);
    if (next.length) {
        setLargeFromThumbElem(next);
    }
}

function setAspectRatioOfPlayer() {
    $("#gallery-ytplayer").height(($("#gallery-ytplayer").width()/16)*9);
}

function refreshFilter() {
    $(".gallery-active-filter-type.gallery-active-filter-week.gallery-active-filter-event").show();
    $(".gallery-carousel > div:not(.gallery-active-filter-type), .gallery-carousel > div:not(.gallery-active-filter-week), .gallery-carousel > div:not(.gallery-active-filter-event)").hide();
    setLargeFromThumbElem($(".gallery-active-filter-type.gallery-active-filter-week.gallery-active-filter-event").eq(0));
}

$(function(){
    current = 0;

    setLargeFromThumbElem($(".gallery-carousel").children().eq(0));
    setAspectRatioOfPlayer();

    $(".gallery-carousel").children().click(function(e) {
        setLargeFromThumbElem($(e.target));
    });

    $("#gallery-carousel-previous").click(previousImage);
    $("#gallery-carousel-next").click(nextImage);

    $(window).resize(setAspectRatioOfPlayer);

    // Filter
    $("#gallery-filter-type > li").click(function(e) {
        var filter = $(e.target).data("filter");

        if (filter == "all"){
            $(".gallery-carousel > div").addClass("gallery-active-filter-type");
        }
        else if (filter == "image") {
            $(".gallery-carousel > div").removeClass("gallery-active-filter-type");
            $(".gallery-carousel > div.image").addClass("gallery-active-filter-type");
        }
        else if (filter == "video") {
            $(".gallery-carousel > div").removeClass("gallery-active-filter-type");
            $(".gallery-carousel > div.video").addClass("gallery-active-filter-type");
        }

        refreshFilter();
    });

    $("#gallery-filter-week > li").click(function(e) {
        var week = $(e.target).data("filter");

        if (week == "all")
        {
            $(".gallery-carousel > div").addClass("gallery-active-filter-week");
        }
        else {
            $(".gallery-carousel > div[data-week='" + week + "']").addClass("gallery-active-filter-week");
            $(".gallery-carousel > div:not([data-week='" + week + "'])").removeClass("gallery-active-filter-week");
        }

        refreshFilter();
    });

    $("#gallery-filter-event > li").click(function(e) {
        var event = $(e.target).data("filter");

        if (event == "all")
        {
            $(".gallery-carousel > div").addClass("gallery-active-filter-event");
        }
        else {
            $(".gallery-carousel > div[data-event='" + event + "']").addClass("gallery-active-filter-event");
            $(".gallery-carousel > div:not([data-event='" + event + "'])").removeClass("gallery-active-filter-event");
        }

        refreshFilter();
    });
})
