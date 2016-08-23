$(document).ready(function() {
  // Göm statusbaren
  $("#statusbar").hide();
  // $("#datepicker").datepicker({
  //  dateFormat: 'yy-mm-dd'
  // });

  var filedrag = $("#filedrag");
  filedrag.find("#filedraginfo").html("Dra bilder hit.");
  var files = null;
  var file = null;
  files = [];
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
    var newFiles = e.originalEvent.dataTransfer.files;
    files = newFiles;

    // Ta fram bilden (första filen som lades till ifall användaren lade till flera.)
    //file = files[0];

    showImages(newFiles, filedrag);
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
  });
  $(document).on('drop', function (e) {
    e.stopPropagation();
    e.preventDefault();
  });

  $('#submit_pictures').click(function() {
    // Om det finns bilder att ladda upp
    if (files != null) {
      handleFileUpload(files, filedrag);
    }
  });

  $(document).on('change', '#fileselect', function() {
    var newFiles = $('#fileselect')[0].files;
    files = newFiles;

    showImages(newFiles, filedrag);


  });
});


totalNumberOfFiles = 0;
filesDoneUploading = 0;
totalSizeUploaded = 0;
totalSize = 0;
currProgressBarWidth = 0;
statuses = [];
order = [];
filesSentCounter = 0;

function showImages(files, filedrag) {
  $("#previewcontainer").empty();
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    // Kolla om det är en bild och förhandsvisa den.
    if (file.type.indexOf("image") == 0) {
      var reader = new FileReader();
      reader.onloadend = (function(counter) {
        var counter = counter;
        return function(e) {
          $("#previewcontainer").append('<li id=' + counter + ' class="preview">' +
            '<img src="' + e.target.result + '" style="width:80px"/>' +
            '</li>'
          );
          // updateSortable();
          updateOrder();
        }
      })(i);
      reader.readAsDataURL(file);
    }
  }
}

function updateOrder() {
  order = [];
  $("#previewcontainer li").each(function(index) {
    order.push(parseInt($(this).attr('id')));
  });
  // console.log(order);
}

function handleFileUpload(files, filedrag) {
  $("#form").hide();
  $("#statusbar").show();
  // $("#previewcontainer").sortable( "disable" );
  var counter = 0;

  for (var j = 0; j < files.length; j++) {
    // for (var i = 0; i < files[j].length; i++) {
      var file = files[j];
      totalSize += file.size;
      counter++;
    // }
  }

  totalNumberOfFiles = counter;

  // Ta fram den läsbara storleken
  var sizeStr="";
  var sizeKB = totalSize/1024;
  if(parseInt(sizeKB) > 1024) {
    var sizeMB = sizeKB/1024;
    sizeStr = sizeMB.toFixed(2)+" MB";
  } else {
    sizeStr = sizeKB.toFixed(2)+" KB";
  }
  $("#filesizes").html(sizeStr);

  sendNextFile(files);


}

function sendNextFile(files) {
  var file = files[order[filesSentCounter]];

  var fd = new FormData();
  fd.append('photographer', $("#photographer").val());
  fd.append('week', $("#week").val());
  fd.append('seldate', $("#seldate").val());
  fd.append('event', $("#event").val());
  fd.append('file', file);

  var status = new createStatus(file.size, totalSize);
  statuses.push(status);
  var fileid = file.name.replace(/\.[^/.]+$/, "");
  fileid = fileid + filesSentCounter;
  sendFileToServer(fd, status, files, fileid);

  filesSentCounter++;
}

function sendFileToServer(formData, status, files, fileid) {
  var uploadURL = "gallery_upload_images_process.php";
  // var extraData = {};
  var jqXHR = $.ajax({
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
    cache: false,
    data: formData,
    success: function(output){
      status.setDone();
      if(!uploadDone()) {
        sendNextFile(files);
      }
      if (output === "1") {
        $("#info").append('<div id="error_' + fileid + '"></div>');
        var info_error = $("#error_" + fileid);
        console.log("#error_" + fileid);
        info_error.append('<p id="error_' + fileid + '" style="color: red">Det gick inte att ladda upp bilden ' + fileid + ' eftersom den inte har någon metadata för när den är tagen. Fyll i datum och tid när bilden är tagen och försök igen.</p>');
        info_error.append('<span>Date: YYYY-MM-DD</span><input type="date" id="date_' + fileid + '"/>');
        info_error.append('<span>Time: HH:MM</span><input type="time" id="time_' + fileid + '"/>');
        info_error.append('<button id="retrybutton_' + fileid + '">Försök igen</button>');
        info_error.find("#retrybutton_" + fileid).click(function() {
          sendFileWithDateToServer(formData, fileid);
        });
      } else if (output !== "ok") {
        $("#info").append('<p>' + output + '</p>');
      }
    }
  });

  // status.setAbort(jqXHR);
}

function sendFileWithDateToServer(formData, fileid) {
  var uploadURL = "gallery_upload_images_process.php";
  var date = $("#date_" + fileid);
  var time = $("#time_" + fileid);

  formData.append('date', date.val());
  formData.append('time', time.val());
  $.ajax({
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
    cache: false,
    data: formData,
    success: function(output){
      if (output === "ok") {
        var info_error = $("#error_" + fileid);
        info_error.empty();
        info_error.append('<p id="error_' + fileid + '" style="color: green">Bild uppladdad.</p>');
      }
    }
  });
}

function createStatus(size, ts) {
  this.position = 0;
  this.size = size;
  this.partOfTotal = this.size / ts;

  this.setProgress = function(position) {
    this.position = position;
    // console.log(this.position / this.size);
    updateStatusBar();
  }

  this.setDone = function() {
    this.position = this.size;
    updateStatusBar();
  }
}

function updateStatusBar() {
  var totalUploaded = 0;

  for (var i = 0; i < statuses.length; i++) {
    totalUploaded += statuses[i].position;
  }
  var progressBar = $("#progressbar");
  var currProgressBarWidth = (totalUploaded / totalSize) * progressBar.width();
  var percent = Math.ceil(totalUploaded / totalSize * 100);
  progressBar.find('div').width(currProgressBarWidth).html(percent + "%");
}

function uploadDone() {
  filesDoneUploading++;

  if (filesDoneUploading === totalNumberOfFiles) {
    $("#statusbar").append("Uppladning klar.");
    return true;
  } else {
    return false;
  }
}
