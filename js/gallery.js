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
    loop: true,
    slidesPerView: 1,

    // If we need pagination
    //pagination: '.swiper-pagination',

    keyboardControl: true,

    // Navigation arrows
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',

    preloadImages: false,
    lazyLoading: true,
    lazyLoadingInPrevNext: true,

    // And if we need scrollbar
    // scrollbar: '.swiper-scrollbar',
  });

  // Om man trycker på escape
  $(document).keyup(function(event){
    if(event.keyCode == 27 && slideUp){
      hideSlide();
    }
  });

  $(".swiper-content").click(function() {
    hideSlide();
  });

  $(".swiper-slide").click(function() {
    hideSlide();
  });

  //Klicka utanför bilden
  // $(document).click(function(e) {
  //  var container = $(".swiper-content");
  //  console.log(container);
  //  // var nextButton = $(".swiper-button-next");
  //  // var prevButton = $(".swiper-button-prev");
  //  // if (slideUp) {
  //  //  if (!container.is(e.target) &&// if the target of the click isn't the container...
  //  //    container.has(e.target).length === 0 &&
  //  //    !nextButton.is(e.target) &&
  //  //    !prevButton.is(e.target)) { // ... nor a descendant of the container
  //  //    hideSlide();
  //  //  }
  //  // }
  //  if (slideUp) {
  //    console.log("slide up");
  //    if (container.is(e.target)) {
  //      console.log("target");
  //      hideSlide();
  //    }
  //  }

  // });



  $(".deleteimage").click(function(event) {
    var imageid = $(this).attr('id').substr(7);
    var ext = fileExt(imageid);
    imageid = imageid.replace(/\.[^/.]+$/, "");
    areYouSureDeleteImage(imageid, ext);
  });

  $(".deletevideo").click(function(event) {
    var videoid = $(this).attr('id').substr(7);
    areYouSureDeleteVideo(videoid);
  });

  $(".deleteblandare").click(function(event) {
    var blandarid = $(this).attr('id').substr(7);
    var ext = fileExt(blandarid);
    blandarid = blandarid.replace(/\.[^/.]+$/, "");
    areYouSureDeleteBlandare(blandarid, ext);
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

  hideSlide();
});

slideUp = false;

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
  swiper.slideTo(n, 0, true);
}

function hideSlide() {
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

function areYouSureDeleteImage(imageid, ext) {
  var popup = $("#popup_container");
  popup.append('<div id="deletepopup"></div>');
  var deletepopup = popup.find("#deletepopup");
  popup.append('<div id="black_overlay"></div>');
  deletepopup.append('<h2>Radera?</h2>');
  deletepopup.append('<img class="popup_img_img" src="images/uploads/gallery/thumbs/' + imageid + '.' + ext + '"/><br/>');
  deletepopup.append('<button id="delete_cancel" class="popup_buttons popup_cancel">Cancel</button>');
  deletepopup.append('<button id="delete_ok" class="popup_buttons popup_ok">Ok</button>');
  popup.find("#black_overlay").click(function() {
    popup.empty();
  });
  deletepopup.find("#delete_cancel").click(function() {
    popup.empty();
  });
  deletepopup.find("#delete_ok").click(function() {
    deleteImage(imageid, ext);
    popup.empty();
  });
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

function areYouSureDeleteBlandare(blandarid, ext) {
  var popup = $("#popup_container");
  popup.append('<div id="deletepopup"></div>');
  var deletepopup = popup.find("#deletepopup");
  popup.append('<div id="black_overlay"></div>');
  deletepopup.append('<h2>Radera?</h2>');
  deletepopup.append('<img class="popup_img_blandaren" src="images/uploads/blandaren/frontpages/' + blandarid + '.' + ext + '"/><br/>');
  deletepopup.append('<button id="delete_cancel" class="popup_buttons popup_cancel">Cancel</button>');
  deletepopup.append('<button id="delete_ok" class="popup_buttons popup_ok">Ok</button>');
  popup.find("#black_overlay").click(function() {
    popup.empty();
  });
  deletepopup.find("#delete_cancel").click(function() {
    popup.empty();
  });
  deletepopup.find("#delete_ok").click(function() {
    deleteBlandare(blandarid);
    popup.empty();
  });
}

function deleteImage(imageid, ext) {
  $.ajax({
    url: 'deleteimage.php',
    type: "POST",
    data: {
      'id': imageid + '.' + ext
    },
    success: function(output){
      console.log(imageid);
      $("#" + imageid).remove();
    }
  });
}

function deleteVideo(videoid) {
  $.ajax({
    url: 'deletevideo.php',
    type: "POST",
    data: {
      'id': videoid
    },
    success: function(output){
      console.log(videoid);
      $("#" + videoid).remove();
    }
  });
}

function deleteBlandare(blandarid) {
  $.ajax({
    url: 'deleteblandare.php',
    type: "POST",
    data: {
      'id': blandarid
    },
    success: function(output){
      $("#" + blandarid).remove();
    }
  });
}

function fileExt(filename) {
  return filename.split('.').pop();
}
