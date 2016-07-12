   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Ladda upp video</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <?php
      if (session_status() == PHP_SESSION_NONE) {
        sec_session_start();
      }
      if ($_SESSION['admin']) {
        ?>
        <h2>Ladda upp video</h2>
          <div id="form">
            <input type="text" id="videoname" name="videoname" placeholder="Namn" class="input_areas"/>
            <br/>
            <input type="text" id="videourl" name="videourl" placeholder="Youtubelänk" class="input_areas"/>
            <br/>
            <div class="category-select">
            <span>Kategori: </span><select id="category" name="category">
            <?php
              $query = "SELECT category FROM videocategories ORDER BY category ASC";
              $result = execQuery($link, $query);

              while ($r = $result->fetch_object()) {
                $c = $r->category;
                echo "<option value=\"$c\">$c</option>";
              }
            ?>
            </select>
            </div>

            <button id="submit_video">Ladda upp video</button>
          </div>
          <div id="info"></div>
          <?php
       }
       else {
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
      $('#submit_video').click(function() {
        var videourl = $("#videourl").val();
        var videoid = getParameterFromStringByName(videourl, "v");
        var category = $("#category").val();
        var videoname = $("#videoname").val();

        var pass = true;
        if (videoname == "" || category == "" || videourl == "") {
          $("#info").html("<p style=\"color: red\">Alla fält måste fyllas i.</p>");
          pass = false;
        }

        if (videoid == "") {
          $("#info").html("<p style=\"color: red\">Ogiltig länk.</p>");
          pass = false;
        }

        if (pass) {
          uploadVideo(videoid, category, videoname);
        }

      });
    });

    function uploadVideo(videoid, category, videoname) {
      var uploadURL = "video_upload_process.php";

      $.ajax({
        url: uploadURL,
        type: "POST",
        data: {
          'videoid': videoid,
          'category': category,
          'videoname': videoname
        },
        success: function(output){
          if(output) {
            $("#info").html("<p style=\"color: red\">" + output + "</p>");
          } else {
            $("#info").html("<p style=\"color: green\">Uppladning klar.</p>");
            $("#videourl").val("");
            $("#videoname").val("");
          }
        }
      });
    }

    function getParameterFromStringByName(string, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(string);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

  </script>

  </body>
</html>
