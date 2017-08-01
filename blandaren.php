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
                      <img class="blandarthumb" src="images/uploads/blandaren/frontpages/' . $blandare->frontpage . '"/>
                    </a>';

              echo '</div>'; // blandarDiv_container

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
