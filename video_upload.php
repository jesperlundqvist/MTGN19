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

    <div class="content-wrapper form-page">
      <?php
      if (session_status() == PHP_SESSION_NONE) {
        sec_session_start();
      }
      if ($_SESSION['admin']) {
        ?>
        <h2 class="adminpanel_title">Ladda upp video</h2>
          <div id="form">
            <input type="text" id="videoname" name="videoname" placeholder="Namn" class="input_areas"/>
            <br/>
            <input type="text" id="videourl" name="videourl" placeholder="Youtubelänk" class="input_areas"/>
            <br/>
            <div class="event-select">
            <span>Event: </span><select id="event" name="event">
            <?php
              $query = "SELECT name FROM event";
              $result = execQuery($link, $query);

              while ($r = $result->fetch_object()) {
                $c = $r->name;
                echo "<option value=\"$c\">$c</option>";
              }
            ?>
            </select>
            </div>
            <br><br>

            <div class="week-select">
              <span>Vecka: </span>
              <select id="week" name="week">
                <option>Auto</option>
                <option value="33">33</option>
                <option value="34">34</option>
                <option value="35">35</option>
                <option value="36">36</option>
              </select>
            </div>
            <br><br>

            <button id="submit_video" class="button-primary">Ladda upp video</button>
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
        var event = $("#event").val();
        var week = $("#week").val();
        var videoname = $("#videoname").val();

        var pass = true;
        if (videoname == "" || event == "" || videourl == "") {
          $("#info").html("<p style=\"color: red\">Alla fält måste fyllas i.</p>");
          pass = false;
        }

        if (videoid == "") {
          $("#info").html("<p style=\"color: red\">Ogiltig länk.</p>");
          pass = false;
        }

        if (pass) {
          uploadVideo(videoid, event, week, videoname);
        }

      });
    });

    function uploadVideo(videoid, event, week, videoname) {
      var uploadURL = "video_upload_process.php";

      $.ajax({
        url: uploadURL,
        type: "POST",
        data: {
          'videoid': videoid,
          'event': event,
          'week': week,
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
