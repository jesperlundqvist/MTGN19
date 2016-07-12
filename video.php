   <?php
    //Load header
    include_once ('inc_header.php');
    $link = connectToDB();
  ?>
    <title>Mottagningen 2016</title>

    <link rel="stylesheet" href="css/swiper.min.css" />
    <script type="text/javascript" src="http://www.youtube.com/iframe_api"></script>
    <script src="js/video.js"></script>


<!-- TA BORT DETTA HAR BARA MED JUST NU FÖR ATT SE NÅGONTING -->
    <style>
      h3 {
  display: block;
  clear: both;
  font-family: Sunday;
  font-weight: normal;
  font-size: 110%;
  padding-top: 15px;
}

.buttons a, .buttons a:visited {
  background-color:#43A5A2;
  padding: 3px 9px;
  border:0px;
  text-align:center;
  border-radius:2px;
  text-transform:uppercase;
  color:#fff;
  margin: 0 5px 5px 0;
  display: inline-block;
}
.buttons a:hover, .buttons a:active {
  background: #86d5b6;
}
.buttons a:after { display: none;}

.buttons { margin-bottom: 10px; }
.buttons.week-choice a {
  background: #016551;
}
.videolink.button { margin-top: 10px;}
a.weekbuttonselected,
a.weekbutton:hover {
  background: #43A5A2 !important;
}
a.weekdaybuttonselected,
a.weekdaybutton:hover {
  background: #86d5b6 !important;
}


.choice {
  display: block;
  font-size: 14px;
}

.week-choice { margin-top: 10px;}
.week-choice a {
  width: 25%;
  margin: 0 0;
  padding: 0;
  border-radius: 0;
  height: 48px;
  line-height: 48px;
}

.upload_link {
  width:100%;
  height:48px;
  background-color:#43A5A2;
  padding:0px;
  border:0px;
  text-align:center;
  font-size:14px;
  border-radius:2px;
  line-height: 48px;
  text-transform:uppercase;
  color:#fff !important;
  margin: 0px auto 10px;
  display:block;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-button-prev,
.swiper-button-next {
  background: none;
  color: #43A5A2;
  font-size: 400%;
}
#gallery {
  width:100%;
  height:auto;
  background-color:transparent;
  /*margin-top:100px;*/
  overflow:hidden;
  position:relative;
  left:0px;
  z-index:9;
}

.photoDiv {
  position: relative;
  width: 25%;
  background-color: transparent;
  float: left;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  cursor: pointer;
  opacity:.7;
  -webkit-transition:.3s;
}

.photoDiv:before{
  content: "";
  display: block;
  padding-top: 100%;  /* initial ratio of 1:1*/
}

.photoDiv:hover {
  -webkit-filter: grayscale(0%);
  opacity:1;
}

.imgSize {
  max-height: 100%;
  max-width: 100%;
}

.slideShowHolder {
  width:100%;
  height:100%;
  background-color:transparent;
  position:fixed;
  left:0px;
  top:0px;
  z-index:9999;
  opacity:0;
  -webkit-transform:scale(0.1,0.1);
  -webkit-transition: all 600ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.showSlideShow {
  opacity:1;
  -webkit-transform:scale(1,1);
}
.swiper-wrapper { max-height: 100%; }
.swiper-content {
  height: 100%;
}
.swiper-content:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -0.25em; /* Adjusts for spacing */
}

.swiper-content iframe {
  display: block;
  max-width: 100%;
  max-height: auto;
}
.swiper-content img, .swiper-content iframe {
  display: inline-block;
  vertical-align: middle;

}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: rgba(0,0,0,0);
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: rgba(0,0,0,0.8);
  position: relative;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}


#popup_container {

}

#black_overlay{
  /*display: none;*/
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9998;
  -moz-opacity: 0.8;
  opacity:.80;
  filter: alpha(opacity=80);
}

#deletepopup {
  /*display: none;*/
  position: fixed;
  top: 50%;
  left: 50%;
  width: 340px;
  height: 360px;
  margin-left: -180px;
  margin-top: -190px;
  padding: 30px;
  background-color: white;
  z-index:9999;
}

.popup_img_blandaren {
  width: 190px;
}

.popup_img_img {
  max-width: 250px;
}
.popup_img_vid {
  width: 250px;
  height: 250px;
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.popup_buttons {
  width: 50%;
  height:48px;
  line-height: 48px;
  padding:0px;
  border:0px;
  text-align:center;
  font-size:14px;
  border-radius:2px;
  text-transform:uppercase;
  color:#fff !important;
  margin: 10px auto 0 auto;
  display: inline-block;
  cursor: pointer;
}
.popup_cancel {
  background-color: #C2242C;
}
.popup_ok {
  background-color: #43A5A2;
}

.delete {
  cursor: pointer;
  float: left;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: #ddd;
  color: #000;
  z-index: 3;
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.delete:hover {
  background: #C2242C;
  color: #fff;
}
.delete span {
  font-size: 120%;
}

.deletestuff {
  background-color: #C2242C;
  width:100%;
  height:48px;
  line-height: 48px;
  padding:0px;
  border:0px;
  text-align:center;
  font-size:14px;
  border-radius:2px;
  text-transform:uppercase;
  color:#fff !important;
  margin: 0px auto 0 auto;
  display:block;
  cursor: pointer;
}


/* ============ VIDEOS ============ */
#videos {
  width:100%;
  height:auto;
  background-color:transparent;
  /*margin-top:100px;*/
  overflow:hidden;
  position:relative;
  left:0px;
  z-index:9;
}

.videodiv {
  position: relative;
  width: 25%;
  float: left;
  display: inline-block;
  vertical-align: middle;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  opacity: 0.7;
}
.videodiv:hover {
  -webkit-filter: grayscale(0%);
  opacity:1;
}

.videodiv:before{
  content: "";
  display: block;
  padding-top: 100%;  /* initial ratio of 1:1*/
}

.push {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 2;
}

/* ============ BLANDAREN ============*/
#blandare {
  width:100%;
  top: 10px;
  background-color:transparent;
  /*margin-top:100px;*/
  overflow:hidden;
  position:relative;
  left:0px;
  text-align: left;
}
.blandarDiv_container {
  width: 25%;
  float: left !important;
  position: relative;
  margin-top: 10px;
}
.blandardiv a {
  text-align: center;
}
.blandarthumb {
  position: relative;
  margin: 0;
  width: 100%;
  opacity: 0.7;
}
.blandarthumb:hover {
  -webkit-filter: grayscale(0%);
  opacity:1;
}

.blandartitle {
  display: inline-block;
  margin: 5px auto;
}

.photoDiv, .photoDiv:hover,
.videodiv:hover, .videodiv,
.blandarthumb, .blandarthumb:hover,
.delete, .delete:hover {
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out ;
  -ms-transition: all 0.3s ease-in-out;
}


@media (max-width: 1000px) {
  .photoDiv {
    width: 33%;
  }

  .videodiv {
    width: 33%;
  }

  .blandarDiv_container {
    width: 25%;
  }

  #deletepopup {
    width: 90%;
    left: 5%;
    margin-left: 0;
    padding: 20px 0;
  }
  #deletepopup h2 { margin: 0 20px 20px;}
  .popup_img_vid {
    width: 190px;
    height: 190px;
  }
  .popup_buttons {
    width: 250px;
    padding: 0;
    display: block !important;}
  .popup_cancel { margin-left: 20px;}
  .popup_ok { margin-right: 20px;}

}

</style>

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
            echo '<a class="no-link upload_link" href="video_upload.php">Ladda upp videos</a>';
            echo '<div id="deleteimagesbutton" class="deletestuff">Radera videos</div>';
          }

          // länkar
          echo '<div id="links">';
          echo '<a class="videolink button" href="video.php?category=1">RGBSW</a>';
          echo '<a class="videolink button" href="video.php?category=2">Välkomstgasquen</a>';
          echo '<a class="videolink button" href="video.php?category=3">Bolibompagasquen</a>';
          echo '<a class="videolink button" href="video.php?category=7">Övrigt</a>';
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
