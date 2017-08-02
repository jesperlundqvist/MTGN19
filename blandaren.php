   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen</title>
    <link rel="stylesheet" href="css/swiper.min.css" />
    <!-- <script src="js/gallery.js"></script> -->
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
      $link = connectToDB();
    ?>

    <div class="content-wrapper">
      <div id="popup_container"></div>
        <?php
          if (session_status() == PHP_SESSION_NONE) {
              sec_session_start();
          }
          $admin = $_SESSION['admin'];


          // =================== BLÄNDAREN ===============
          echo '<div id="blandar_container">';

            echo '<div id="blandare">';
            $query = "SELECT blandarpdf, frontpage, blandarid, blandarname FROM blandare ORDER BY uploaddate ASC";
            $result = execQuery($link, $query);

            while ($blandare = $result->fetch_object()) {
              $nextcategory = $blandare->category;

              echo '<div id="' . $blandare->blandarid . '" class="blandarDiv_container">';

              echo '
                    <a class="no-link" target="_blank" href="images/uploads/blandaren/pdfs/' . $blandare->blandarpdf . '">
                      <h3 class="blandartitle">' . $blandare->blandarname . '</h3>
                      <div class="blandaren-preview">
                          <img class="blandarthumb" src="images/uploads/blandaren/frontpages/' . $blandare->frontpage . '"/>
                          <input type="checkbox" class="blandaren-delete-checkbox" data-id="' . $blandare->blandarid . '" />
                      </div class="blandaren-preview">
                    </a>';

              echo '</div>'; // blandarDiv_container

            }
            echo '</div>';
          echo '</div>';
          // ================ BLÄNDAREN ================

          if ($admin)
          {
              ?>
              <br><br>
              <a class="button button-primary" id="blandaren-remove-button">Ta bort valda Bländaren</a>
              <br>
              <?php
          }

          ?>

    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script src="js/swiper.jquery.min.js"></script>
    <script>
        $("#blandaren-remove-button").click(function(e) {
            var toDelete = $(".blandaren-delete-checkbox:checkbox:checked");
            if (toDelete.length > 0 && confirm("Är du säker på att du vill ta bort " + toDelete.length + " bländaren?"))
            {
                toDelete.each(function(i, val) {
                    $.ajax({
                        type: "POST",
                        url: "/delete_handler.php",
                        data: {
                            id: $(val).data("id"),
                            action: "blandaren"
                        },
                        success: function(data) {
                            if (data != "")
                            {
                                alert(data);
                            }
                            else
                            {
                                location.reload(true);
                            }
                        }
                    });
                });
            }
        });
    </script>
  </body>
</html>
