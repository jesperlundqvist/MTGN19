   <?php
    //Load header
    include_once ('inc_header.php');
    $link = connectToDB();
  ?>
    <title>Mottagningen 2016</title>

    <link rel="stylesheet" href="CSS/swiper.min.css" />
    <script type="text/javascript" src="http://www.youtube.com/iframe_api"></script>
    <script src="js/video.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
            <div id="popup_container"></div>
        <?php
          if (session_status() == PHP_SESSION_NONE) {
              sec_session_start();
          }
          $admin = $_SESSION['admin'];
          if ($admin) {
            echo '<a class="no-link upload_link" href="uploadvideo.php">Ladda upp videos</a>';
            echo '<div id="deleteimagesbutton" class="deletestuff">Radera videos</div>';
          }

          // länkar
          echo '<div id="links">';
          echo '<a class="videolink button" href="videos.php?category=1">RGBSW</a>';
          echo '<a class="videolink button" href="videos.php?category=2">Välkomstgasquen</a>';
          echo '<a class="videolink button" href="videos.php?category=3">Bolibompagasquen</a>';
          echo '<a class="videolink button" href="videos.php?category=7">Övrigt</a>';
          echo '</div>';


          if (isset($_GET['category'])) {
            $c = $_GET['category'];
            if ($c == '1') {
              $category = 'RGBSW';
            } elseif ($c == '2') {
              $category = 'Välkomstgasquen';
            } elseif ($c == '3') {
              $category = 'Bolibompagasquen';
            } elseif ($c == '4') {
              $category = 'METAgasquen';
            } elseif ($c == '5') {
              $category = 'Stugan';
            } elseif ($c == '6') {
              $category = 'Bossegasquen';
            } elseif ($c == '7') {
              $category = 'Övrigt';
            }

            echo '<div id="videos">';
            $query = "SELECT videoid, category FROM videos WHERE category = '$category' ORDER BY uploaddate ASC";
            $result = execQuery($link, $query);
            $currcategory = "";
            $counter = 1;

            while ($video = $result->fetch_object()) {
              $nextcategory = $video->category;

              if ($currcategory != $nextcategory) {
                $currcategory = $nextcategory;
                echo '<h3 class="videocategorytitle" >' . $currcategory . '</h3>';
              }
              echo '<div id="video_thumb_container_' . $video->videoid . '" class="photoDiv_container">';

              echo '<div class="videodiv thumbdiv" style="background-image:url(http://img.youtube.com/vi/' . $video->videoid . '/hqdefault.jpg)">';
              if ($admin) {
                echo '<div class="delete deletevideo" id="delete_' . $video->videoid . '"><span class="ion-ios-trash-outline"></span> <span class="hide-on-mobile">DELETE </span>' . $video->videoid . '</div>';
              }
              echo '<div class="push" onclick="showSlide(' . $counter . ');"></div>';
              echo '</div>'; //end videodiv
              echo '</div>'; // end photodiv_container
              $counter++;
            }
            echo '</div>';

          }

        ?>


    </div>
    <div class="slideShowHolder">
      <!-- Slider main container -->
      <div class="swiper-container swiper-container-horizontal">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
        <?php
        if (isset($_GET['category'])) {
          $result = execQuery($link, $query);
          $counter = 1;

          while ($video = $result->fetch_object()) {
            echo '<div class="swiper-slide">
                <div class="swiper-content" id="videoframe_' . $counter . '">
                  <div id="videoframe_' . $video->videoid . '"></div>
                </div>
              </div>';
            $counter++;
          }
        }
        ?>
        </div>
        <!-- If we need pagination -->
        <!-- <div class="swiper-pagination"></div> -->

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"><span class="ion-ios-arrow-back"></span></div>
        <div class="swiper-button-next"><span class="ion-ios-arrow-forward"></span></div>

        <!-- If we need scrollbar -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>
        <script src="js/swiper.jquery.min.js"></script>

  </body>
</html>
