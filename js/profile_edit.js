$(document).ready(function() {
  var filedrag = $("#filedrag");
  filedrag.html("Dra profilbild hit.");
  var filedragGif = $("#filedrag_gif");
  filedragGif.html("Dra gif hit.");
  var files = null;
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
    // Om det finns en profilbild att ladda upp
    updateUser(file, gif);
  });

  $(document).on('change', '#fileselect', function() {
    file = $('#fileselect').get(0).files[0];

    showImage(file, filedrag);
  });

  $(document).on('change', '#fileselect_gif', function() {
    gif = $('#fileselect_gif').get(0).files[0];

    showImage(gif, filedragGif);
  });
});

function showImage(file, filedrag) {
  // Kollad om det är en bild och förhandsvisa den.
  if (file.type.indexOf("image") == 0) {
    var reader = new FileReader();
    reader.onload = function(e) {
      filedrag.html(
        "<p><strong>" + file.name + ":</strong><br />" +
        '<img src="' + e.target.result + '" style="width:100px"/></p>'
      );
    }
    reader.readAsDataURL(file);
  } else {
    file = null;
    files = null;
  }
}

function updateUser(profilepicture, gif) {
  $("#statusbarcontainer").empty();
  var status = new createStatusbar();
  var size = 0;
  if (profilepicture != null) {
    size += profilepicture.size;
  }
  if (gif != null) {
    size += gif.size;
  }
  status.setSize(size);

  var username = $("#username").html();
  var password1 = $("#new_password_1").val();
  var password2 = $("#new_password_2").val();
  var name = $("#name").val();
  if (name == null) {
    name = "";
  }
  var email = $("#email").val();
  var description = $("#description").val();
  var q1 = $("#q1").val();
  var q2 = $("#q2").val();
  var q3 = $("#q3").val();
  var n0llegroup = $("#n0llegroup").val();
  if (n0llegroup == null) {
    n0llegroup = "";
  }


  if (password1 !== "" && password2 !== "") {
    var hashed_password1 = hex_sha512(password1);
    var hashed_password2 = hex_sha512(password2);
  } else {
    var hashed_password1 = "";
    var hashed_password2 = "";
  }
  var fd = new FormData();
  fd.append('profile', profilepicture);
  fd.append('gif', gif);
  fd.append('password1', hashed_password1);
  fd.append('password2', hashed_password2);
  fd.append('username', username);
  fd.append('name', name);
  fd.append('email', email);
  fd.append('description', description);
  fd.append('q1', q1);
  fd.append('q2', q2);
  fd.append('q3', q3);
  fd.append('n0llegroup', n0llegroup);

  var info = $("#info");

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
    url: '/profile_edit_process.php',
    type: "POST",
    contentType:false,
    processData: false,
    cache: false,
    data: fd,
    success: function(output){
      // Skriv ut lite info om hur det gick att skapa användaren
      if (output == "ok") {
        var domain = document.domain;
        window.location.href = "/profile.php?user=" + username;
      } else {
        $("#info").html(output);
      }
    }
  });
}
var rowCount = 0;
function createStatusbar() {
  this.statusbar = $("<div class='statusbar'></div>");
  // this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
  this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
  this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
  // this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
  $("#statusbarcontainer").after(this.statusbar);

  this.setSize = function(size){
    var sizeStr="";
    var sizeKB = size/1024;
    if(parseInt(sizeKB) > 1024) {
      var sizeMB = sizeKB/1024;
      sizeStr = sizeMB.toFixed(2)+" MB";
    } else {
      sizeStr = sizeKB.toFixed(2)+" KB";
    }

    // this.filename.html(name);
    this.size.html(sizeStr);
  }
  this.setProgress = function(progress) {
    var progressBarWidth =progress*this.progressBar.width()/ 100;
    this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
  }
  // this.setAbort = function(jqxhr) {
  //  var sb = this.statusbar;
  //  this.abort.click(function() {
  //    jqxhr.abort();
  //    sb.hide();
  //  });
  // }
}
