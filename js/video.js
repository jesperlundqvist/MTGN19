$(document).ready(function () {
  // categoryEnum = Object.freeze({GALLERY: "gallery", VIDEO: "video", BLANDAREN: "blandaren"});

  // category = getParameterByName("category");


  // if (category === "") {
  //  category = categoryEnum.GALLERY;
  // }
  //initialize swiper when document ready
  swiper = new Swiper('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,

    // If we need pagination
    //pagination: '.swiper-pagination',

    keyboardControl: true,

    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'

    // And if we need scrollbar
    // scrollbar: '.swiper-scrollbar',
  });

  swiper.on('slideChangeStart', function () {
    loadNewEmbededVideo();
  });
  $(".swiper-button-next").click(function() {
    loadNewEmbededVideo();
  });
  $(".swiper-button-prev").click(function() {
    loadNewEmbededVideo();
  });

  //$('#stop').on('click', function() {
    //$('#popup-youtube-player').stopVideo();
  //  $('#youtube-video-'+swiper.activeIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  //});


  // Om man trycker på escape
  $(document).keyup(function(event){
    if(event.keyCode == 27 && slideUp){
      //$('#youtube-video-'+swiper.activeIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
      hideSlide();
    }
  });

  $(".swiper-content").click(function() {
    //$('#youtube-video-'+swiper.activeIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    hideSlide();
  });

  $(".swiper-slide").click(function() {
    //$('#youtube-video-'+swiper.activeIndex)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    hideSlide();
  });

  $(".deletevideo").click(function(event) {
    var videoid = $(this).attr('id').substr(7);
    areYouSureDeleteVideo(videoid);
  });

  hideDeleteButtons();
  var deleting = false;
  $(".deletestuff").click(function() {
    if (deleting === true) {
      hideDeleteButtons();
      deleting = false;
    } else {
      showDeleteButtons();
      deleting = true;
    }
  });

  // hideSlide();
});

slideUp = false;

player = null;
videoid = null;
firstvideo = true;

youtubeReady = false;

function loadNewEmbededVideo() {
  if (youtubeReady) {
    if (player != null) {
      player.pauseVideo();
    }
    if (firstvideo) {
      videoid = $('#videoframe_' + (swiper.previousIndex + 1)).find('div');
      videoid = videoid.attr('id');
      videoid = videoid.substr(11);
      firstvideo = false;
    }
    player = null;
    console.log(videoid);
    console.log(swiper.previousIndex);
    $('#videoframe_' + (swiper.previousIndex + 1)).empty();
    $('#videoframe_' + (swiper.previousIndex + 1)).append('<div id="videoframe_' + videoid + '">Laddar video...</div>');

    // $('.videoframe_' + swiper.previousIndex).attr('src', '');

    videoid = $('#videoframe_' + (swiper.activeIndex + 1)).find('div');
    videoid = videoid.attr('id');
    videoid = videoid.substr(11);
    player = new YT.Player('videoframe_' + videoid, {
      height: '390',
      width: '640',
      videoId: videoid
      // events: {
      //  'onReady': onPlayerReady
      //  // 'onStateChange': onPlayerStateChange
      // }
    });
  } else {
    setTimeout(loadNewEmbededVideo, 500);
  }
}


function onYouTubeIframeAPIReady() {
  youtubeReady = true;
}

function onPlayerReady(event) {
  event.target.playVideo();
}

function showSlide(n) {

  // console.log("show");
  $(".slideShowHolder").css("display", "block");
  $(".slideShowHolder").css("visibility", "visible");
  // $(".slideShowHolder").show();
  // $(".slideShowHolder").width("");
  // $(".slideShowHolder").height("");

  setTimeout(function(){
    $(".slideShowHolder").addClass("showSlideShow");
    slideUp = true;
  }, 10);
  swiper.update(true);
  swiper.slideTo(n - 1, 0, true);
  loadNewEmbededVideo();
}

function hideSlide() {
  if (player != null) {
    player.pauseVideo();
  }
  // console.log("hide");
  $(".slideShowHolder").removeClass("showSlideShow");
  // $(".slideShowHolder").hide();
  // $(".slideShowHolder").width(0);
  // $(".slideShowHolder").height(0);
  setTimeout(function(){$(".slideShowHolder").css("display", "none");}, 300);
  setTimeout(function(){$(".slideShowHolder").css("visibility", "hidden");}, 300);

  slideUp = false;
}

function hideDeleteButtons () {
  $(".sluta").remove();
  $(".delete").hide();
}

function showDeleteButtons () {

  $("#deleteimagesbutton").prepend('<span class="sluta">sluta </span>');
  $(".delete").show();
}

function areYouSureDeleteVideo(videoid) {
  var popup = $("#popup_container");
  popup.append('<div id="deletepopup"></div>');
  var deletepopup = popup.find("#deletepopup");
  popup.append('<div id="black_overlay"></div>');
  deletepopup.append('<h2>Radera?</h2>');
  //deletepopup.append('<img src="http://img.youtube.com/vi/' + videoid + '/0.jpg"/><br/>');
  deletepopup.append('<div class="popup_img_vid" style="background-image:url(http://img.youtube.com/vi/' + videoid + '/0.jpg)"></div>');
  deletepopup.append('<button id="delete_cancel" class="popup_buttons popup_cancel">Cancel</button>');
  deletepopup.append('<button id="delete_ok" class="popup_buttons popup_ok">Ok</button>');
  popup.find("#black_overlay").click(function() {
    popup.empty();
  });
  deletepopup.find("#delete_cancel").click(function() {
    popup.empty();
  });
  deletepopup.find("#delete_ok").click(function() {
    deleteVideo(videoid);
    popup.empty();
  });
}

function deleteVideo(videoid) {
  $.ajax({
    url: 'delete_handler.php?action=video',
    type: "POST",
    data: {
      'id': videoid
    },
    success: function(output){
      console.log(videoid);
      $("#video_thumb_container_" + videoid).remove();
    }
  });
}

function fileExt(filename) {
  return filename.split('.').pop();
}

