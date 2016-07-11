   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Bländaren</title>
    <link rel="stylesheet" href="CSS/swiper.min.css" />
    <script src="js/gallery.js"></script>
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
            if ($admin) {
              echo '<a class="no-link upload_link" href="blandaren_upload.php">Ladda upp Bländaren</a>';
              echo '<div id="deleteblandarenbutton" class="deletestuff">Radera bländare</div>';
            }

            echo '<div id="blandare">';
            $query = "SELECT blandarpdf, frontpage, blandarid, blandarname FROM blandare ORDER BY uploaddate ASC";
            $result = execQuery($link, $query);

            while ($blandare = $result->fetch_object()) {
              $nextcategory = $blandare->category;

              echo '<div id="' . $blandare->blandarid . '" class="blandarDiv_container">';


              echo  '<div class="blandardiv">';
              if ($admin) {
                echo '<div class="delete deleteblandare" id="delete_' . $blandare->frontpage . '"><span class="ion-ios-trash-outline"></span> <span class="hide-on-mobile">DELETE </span>' . $blandare->blandarid . '</div>';
              }
              echo '
                    <a class="no-link" target="_blank" href="images/uploads/blandaren/pdfs/' . $blandare->blandarpdf . '">
                      <h3 class"blandartitle">' . $blandare->blandarname . '</h3>
                      <img class="blandarthumb" src="images/uploads/blandaren/frontpages/' . $blandare->frontpage . '"/>
                    </a>
                  </div>'; // end blandardiv
              echo '</div>';

            }
            echo '</div>';
          echo '</div>';
          // ================ BLÄNDAREN ================

          ?>

    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script src="js/swiper.jquery.min.js"></script>

  </body>
</html>
