$(document).ready(function() {
  // Init fancybox
  $(".fancybox").fancybox();
  $('.fancybox-media').fancybox({
    openEffect  : 'none',
    closeEffect : 'none',
    helpers : {
      media : {}
    }
  });

  hideDeleteButtons();
  hideDeleteButtonsVideo();
  var deleting = false;
  var deletingvideo = false;
  $(".deletestuff").click(function() {
    if (deleting === true) {
      hideDeleteButtons();
      deleting = false;
    } else {
      showDeleteButtons();
      deleting = true;
    }
  });

  $(".deletestuff_video").click(function() {
    if (deletingvideo === true) {
      hideDeleteButtonsVideo();
      deletingvideo = false;
    } else {
      showDeleteButtonsVideo();
      deletingvideo = true;
      console.log(deletingvideo);
    }
  });

  $(".fancybox-media").click(function(event) {

    if(deleting === true){
      var imageid = $(this).attr('id').substr(7);
      var ext = fileExt(imageid);
      imageid = imageid.replace(/\.[^/.]+$/, "");
      areYouSureDeleteImage(imageid, ext);
    }
    if(deletingvideo === true){
      var videoid = $(this).attr('id').substr(7);
      areYouSureDeleteVideo(videoid);
    }
  });



  function hideDeleteButtons () {
    $(".sluta").remove();
    $(".delete").hide();
  }

  function showDeleteButtons () {
    $("#deleteimagesbutton").prepend('<span class="sluta">sluta </span>');
    $(".delete").show();
  }

   function hideDeleteButtonsVideo () {
    $(".sluta").remove();
    $(".delete_Video").hide();
  }

  function showDeleteButtonsVideo () {
    $("#deleteimagesbuttonVideo").prepend('<span class="sluta">sluta </span>');
    $(".delete_Video").show();
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

    console.log('vaa');
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

  function deleteImage(imageid, ext) {
    $.ajax({
      url: 'media_delete.php?action=image',
      type: "POST",
      data: {
        'id': imageid + '.' + ext
      },
      success: function(output){
        console.log(imageid);
        $("#" + imageid).remove();
        alert('Bilden borttagen! Uppdatera sidan.');
      }
    });
  }

  function deleteVideo(videoid) {
  $.ajax({
    url: 'media_delete.php?action=video',
    type: "POST",
    data: {
      'id': videoid
    },
    success: function(output){
      console.log(videoid);
      $("#" + videoid).remove();
      alert('Video borttagen! Uppdatera sidan.');
    }
  });
}


  function fileExt(filename) {
    return filename.split('.').pop();
  }

  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.filter-item',
    layoutMode: 'fitRows'
  });

  $('.js-filter-show').click(function() {
    $('.filters').show();
    $('.js-filter-hide').show();
    $(this).hide();
  });

  $('.js-filter-hide').click(function() {
    $('.filters').hide();
    $('.js-filter-show').show();
    $(this).hide();
  });

  // store filter for each group
  var filters = {};

  // bind filter button click
  $('.filters').on( 'click', '.button', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.button-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    filters[ filterGroup ] = $this.attr('data-filter');
    // combine filters
    var filterValue = concatValues( filters );
    // set filter for Isotope
    $grid.isotope({ filter: filterValue });
  });

  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', '.button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });

  // flatten object by concatting values
  function concatValues( obj ) {
    var value = '';
    for ( var prop in obj ) {
      value += obj[ prop ];
    }
    return value;
  }
});
