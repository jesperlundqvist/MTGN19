$(document).ready(function() {
  $('#n0llegroup_container').hide();
  var filedrag = $("#filedrag");
  filedrag.html("Dra profilbild hit.");
  var filedragGif = $("#filedrag_gif");
  filedragGif.html("Dra gif hit.");
  var files = null;
  $("#statusbar").hide();
  file = null;
  gif = null;
  filedrag.on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #0B85A1');
  });
  filedrag.on('dragover', function (e) {
     e.stopPropagation();
     e.preventDefault();
  });
  filedrag.on('drop', function (e) {
    $(this).css('border', '2px dotted #0B85A1');
    e.preventDefault();
    files = e.originalEvent.dataTransfer.files;

    // Ta fram bilden (första filen som lades till ifall användaren lade till flera.)
    file = files[0];

    showImage(file, filedrag);
  });

  filedragGif.on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #0B85A1');
  });
  filedragGif.on('dragover', function (e) {
     e.stopPropagation();
     e.preventDefault();
  });
  filedragGif.on('drop', function (e) {
    $(this).css('border', '2px dotted #0B85A1');
    e.preventDefault();
    gifs = e.originalEvent.dataTransfer.files;

    // Ta fram bilden (första filen som lades till ifall användaren lade till flera.)
    gif = gifs[0];

    showImage(gif, filedragGif);
  });

  // Gör så att inte filerna öppnas i webläsaren om man råkar släppa filen utanför området.
  $(document).on('dragenter', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });
  $(document).on('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    filedrag.css('border', '2px dotted #0B85A1');
    filedragGif.css('border', '2px dotted #0B85A1');
  });
  $(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  $('#submit_new_user_btn').click(function() {
    uploadUser(file, gif);
  });

  $(document).on('change', '#fileselect', function() {
    file = $('#fileselect').get(0).files[0];

    showImage(file, filedrag);
  });

  $(document).on('change', '#fileselect_gif', function() {
    gif = $('#fileselect_gif').get(0).files[0];

    showImage(gif, filedragGif);
  });

  $(document).on('change', '#usergroup', function() {
    if ($('#usergroup').val() == 'nØllan') {
      $('#n0llegroup_container').show();
    } else {
      $('#n0llegroup_container').hide();
    }
  });
});

function showImage(file, filedrag) {
  // Kollad om det är en bild och förhandsvisa den.
  if (file.type.indexOf("image") == 0) {
    var reader = new FileReader();
    reader.onload = function(e) {
      filedrag.html(
        '<div><strong>' + file.name + ':</strong><br />' +
        '<img src="' + e.target.result + '" style="height:100px"/></div>'
      );
    }
    reader.readAsDataURL(file);
  } else {
    console.log("Ej bild");
    file = null;
    files = null;
  }
}


function uploadUser(file, gif) {
  var password1 = $("#new_password_1").val();
  var password2 = $("#new_password_2").val();
  var username = $("#new_username").val();
  var name = $("#name").val();
  var email = $("#email").val();
  var usergroup = $("#usergroup").val();

  if(usergroup == 'nØllan') {
    var n0llegroup = $('#n0llegroup').val();
  } else {
    var n0llegroup = "";
  }

  var info = $("#info");

  if (password1 === "" || password2 === "") {
    info.html("Du måste fylla i lösenord.");
    return;
  }

  var status = new createStatusbar();
  var hashed_password1 = hex_sha512(password1);
  var hashed_password2 = hex_sha512(password2);

  var fd = new FormData();
  fd.append('files[]', file);
  fd.append('files[]', gif);
  fd.append('password1', hashed_password1);
  fd.append('password2', hashed_password2);
  fd.append('username', username);
  fd.append('name', name);
  fd.append('email', email);
  fd.append('usergroup', usergroup);
  fd.append('n0llegroup', n0llegroup);


  // console.log("Filnamn: " + imagename);

  var jqXHR = $.ajax({
    xhr: function() {
      var xhrobj = $.ajaxSettings.xhr();
      if (xhrobj.upload) {
        xhrobj.upload.addEventListener('progress', function(event) {
          var percent = 0;
          var position = event.loaded || event.position;
          var total = event.total;
          if (event.lengthComputable) {
            percent = Math.ceil(position / total * 100);
          }
          //Set progress
          status.setProgress(percent);
        }, false);
      }
      return xhrobj;
    },
    url: "/process_register.php",
    type: "POST",
    contentType:false,
    processData: false,
    cache: false,
    data: fd,
    success: function(output) {
      // Skriv ut lite info om hur det gick att skapa användaren
      if (output == "ok") {
        status.setProgress(100);
        info.html("Användare " + username + " skapad.");
        // Återställ inputsen
        $("#new_password_1").val("");
        $("#new_password_2").val("");
        $("#new_username").val("");
        $("#name").val("");
        $("#email").val("");
      } else {
        $('#info').append('<p>' + output + '</p>');
        $("#statusbar").hide();
      }
    }
  });
}


function createStatusbar() {
  this.statusbar = $("#statusbar");
  this.statusbar.show();
  this.progressBar = $("#progressbar");

  this.setProgress = function(progress) {
    var progressBarWidth = progress * this.progressBar.width()/ 100;
    this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
  }
}
