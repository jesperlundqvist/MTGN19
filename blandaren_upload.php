   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Ladda upp Bländaren</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.8.593/pdf.min.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
    <?php
    if ($_SESSION['admin']) {
    ?>

    <div class="form-page">
      <h2 class="adminpanel_title">Ladda upp Bländaren</h2>
          <div id="form">
            <br/>
            <input type="text" id="name" name="name" placeholder="Namn" class="input_areas"/>
            <br/>
            <div class="pdf-wrap">
            <span class="input_description">PDF: </span><input type="file" id="blandarpdf" name="blandarpdf" class="file_input" accept="application/pdf"/><label id="blandaren-upload-label" for="blandarpdf">Välj fil...</label>
            </div>
            <br/>
            <button id="submit_blandare" class="button-primary">Ladda upp Bländaren</button>
            <div id="frontpage_status"></div>
          </div>
          <div id="statusbar">
            <div id="filesize"></div>
            <div id="progressbar"><div></div></div>
          </div>
          <div id="info"></div>
          <ul id="previewcontainer"></ul>
            <canvas id="blandaren-preview-canvas" style="display:none">
            </canvas>
        </div>
      </div>
  </div>

      <?php
    } else {
      ?>
        <p>Du måste logga in som admin</p>
      <?php
    }
    ?>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>
  <script type="text/javascript">
    $(document).ready(function() {
    // Göm statusbaren
    $("#statusbar").hide();

    var pdf = null;

    $('#submit_blandare').click(function() {
      // Om det finns bilder att ladda upp
      var canvas = document.getElementById("blandaren-preview-canvas");

      var reader = new FileReader();

      reader.addEventListener("progress", function(e) {
          if (e.lengthComputable) {
            var percentage = Math.round((e.loaded * 100) / e.total);
            $("#frontpage_status").html('Laddar miniatyrbild: ' + percentage + '% ');
        }
      });

      reader.addEventListener("loadend", function(e) {
          $("#frontpage_status").html("Skapar miniatyrbild...");

          PDFJS.getDocument(e.target.result).then(function(pdf) {
              pdf.getPage(1).then(function(page) {
                  var desiredWidth = 300;
                  var viewport = page.getViewport(1);
                  var scale = desiredWidth / viewport.width;
                  var scaledViewport = page.getViewport(scale);

                  var context = canvas.getContext('2d');
                  canvas.height = scaledViewport.height;
                  canvas.width = scaledViewport.width;

                  var renderContext = {
                    canvasContext: context,
                    viewport: scaledViewport
                  };

                  page.render(renderContext).then(function() {
                      var frontpage = canvas.toDataURL('image/jpeg');

                      if (pdf != null && $("#name").val() != null) {
                          handleFileUpload(pdf, frontpage, $("#name").val());
                      }
                  });
              });
          });
      });

      reader.readAsDataURL($('#blandarpdf')[0].files[0]);
    });

    $(document).on('change', '#blandarpdf', function() {
      pdf = $('#blandarpdf')[0].files[0];
      $("#blandaren-upload-label").html(pdf.name);
      if (fileExt(pdf.name) !== "pdf") {
        pdf = null;
        $("#info").append('<p style="color: red">Bländaren måste laddas upp som en PDF.</p>');
      }
    });
  });


  function showImage(frontpage) {
    $("#previewcontainer").empty();
    // Kolla om det är en bild och förhandsvisa den.
    if (frontpage.type.indexOf("image") == 0) {
      var reader = new FileReader();
      reader.onloadend = function(e) {
        $("#previewcontainer").append('<img src="' + e.target.result + '" style="width:80px"/>');
      }
      reader.readAsDataURL(frontpage);
    }
  }

  function handleFileUpload(pdf, frontpage, name) {
    $("#form").hide();
    $("#statusbar").show();

    var totalSize = $('#blandarpdf')[0].files[0].size;

    // Ta fram den läsbara storleken
    var sizeStr="";
    var sizeKB = totalSize/1024;
    if(parseInt(sizeKB) > 1024) {
      var sizeMB = sizeKB/1024;
      sizeStr = sizeMB.toFixed(2)+" MB";
    } else {
      sizeStr = sizeKB.toFixed(2)+" KB";
    }
    $("#filesize").html("Vänta tills det står \"uppladdning klar\"!<br>" + sizeStr);

    sendFiles(pdf, frontpage, name);
  }

  function sendFiles(pdf, frontpage, name) {
    var fd = new FormData();
    // fd.append('imagedate', $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' }).val());
    fd.append('pdf', $('#blandarpdf')[0].files[0]);
    fd.append('frontpage', frontpage);
    fd.append('name', name);

    var status = new createStatus($('#blandarpdf')[0].files[0].size);
    sendFileToServer(fd, status);
  }

  function sendFileToServer(formData, status) {
    var uploadURL = "blandaren_upload_process.php";
    // var extraData = {};
    var jqXHR = $.ajax({
      xhr: function() {
        var xhrobj = $.ajaxSettings.xhr();
        if (xhrobj.upload) {
          xhrobj.upload.addEventListener('progress', function(event) {
            var percent = 0;
            var position = event.loaded || event.position;
            var total = event.total;
            if (event.lengthComputable) {
              percent = Math.round(position / total * 100);
            }
            //Set progress
            status.setProgress(position);
          }, false);
        }
        return xhrobj;
      },
      url: uploadURL,
      type: "POST",
      contentType:false,
      processData: false,
      cache: false,
      data: formData,
      success: function(output){
        if (output !== "") {
          $("#info").append('<p style="color: red">' + output + '</p>');
        } else {
          $("#info").append('<p style="color: green">Uppladdning klar.</p>');
        }
      }
    });
  }

  function createStatus(size) {
    this.position = 0;
    this.size = size;

    this.setProgress = function(position) {
      this.position = position;
      var progressBar = $("#progressbar");
      var currProgressBarWidth = (position / size) * progressBar.width();
      var percent = Math.round(position / size * 100);
      progressBar.find('div').width(currProgressBarWidth).html(percent + "%");
    }

    this.setDone = function() {
      this.position = this.size;
    }
  }

  function fileExt(filename) {
    return filename.split('.').pop();
  }

    adminDropdownToggle();
  </script>
  </body>
</html>
