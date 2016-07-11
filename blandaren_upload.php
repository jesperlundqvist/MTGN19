   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Ladda upp bilder till bländaren</title>
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
      <h2>Ladda upp bländaren</h2>
          <div id="form">
            <br/>
            <input type="text" id="name" name="name" placeholder="Namn" class="input_areas"/>
            <div class="front-wrap">
              <span>Framsida: </span><input type="file" id="blandarfront" name="blandarfront"/>
            </div>
            <div class="pdf-wrap">
            <span>PDF: </span><input type="file" id="blandarpdf" name="blandarpdf"/>
            </div>
            <button id="submit_blandare">Ladda upp bländaren</button>
          </div>
          <div id="statusbar">
            <div id="filesize"></div>
            <div id="progressbar"><div></div></div>
          </div>
          <div id="info"></div>
          <ul id="previewcontainer"></ul>
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
    var frontpage = null;

    $('#submit_blandare').click(function() {
      // Om det finns bilder att ladda upp
      if (pdf != null && frontpage != null && $("#name").val() != null) {
        handleFileUpload(pdf, frontpage, $("#name").val());
      }
    });

    $(document).on('change', '#blandarfront', function() {
      frontpage = $('#blandarfront')[0].files[0];
      console.log(frontpage.name);

      showImage(frontpage);
    });

    $(document).on('change', '#blandarpdf', function() {
      pdf = $('#blandarpdf')[0].files[0];
      console.log(pdf.name);
      if (fileExt(pdf.name) !== "pdf") {
        pdf = null;
        $("#info").append('<p style="color: red">Det är inte en pdf.</p>');
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

    var totalSize = pdf.size + frontpage.size;

    // Ta fram den läsbara storleken
    var sizeStr="";
    var sizeKB = totalSize/1024;
    if(parseInt(sizeKB) > 1024) {
      var sizeMB = sizeKB/1024;
      sizeStr = sizeMB.toFixed(2)+" MB";
    } else {
      sizeStr = sizeKB.toFixed(2)+" KB";
    }
    $("#filesize").html(sizeStr);

    sendFiles(pdf, frontpage, name);
  }

  function sendFiles(pdf, frontpage, name) {
    var fd = new FormData();
    // fd.append('imagedate', $("#datepicker").datepicker({ dateFormat: 'yy-mm-dd' }).val());
    fd.append('files[]', pdf);
    fd.append('files[]', frontpage);
    fd.append('name', name);

    var status = new createStatus(pdf.size + frontpage.size);
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
              percent = Math.ceil(position / total * 100);
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
          $("#info").append('<p style="color: green">Uppladdnig klar.</p>');
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
      var percent = Math.ceil(position / size * 100);
      progressBar.find('div').width(currProgressBarWidth).html(percent + "%");
    }

    this.setDone = function() {
      this.position = this.size;
    }
  }

  function fileExt(filename) {
    return filename.split('.').pop();
  }

  </script>
  </body>
</html>
