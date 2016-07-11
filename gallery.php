   <?php
    //Load header
    include_once ('inc_header.php');

  $link = connectToDB();

  $year = 2014;

  echo "<div class='weeks'>";

  function printWeekLink($year, $week, $currentweek) {
    $link = getGalleryLink($year, $week);
    if ($week == $currentweek) {
      echo "<a id=\"linkweek$week\" class=\"weekbutton weekbuttonselected\" href=\"$link\">Vecka $week</a>";
    } else {
      echo "<a id=\"linkweek$week\" class=\"weekbutton\" href=\"$link\">Vecka $week</a>";
    }
  }

  echo "</div>"; //weeks
  echo "<svg class='gallery-divider-line'>";
  echo "<line x1='0' y1='0' x2='100%' y2='0'>";
  echo "</svg>";
  echo "div class='days'>";

  function printWeekdaysLink($year, $week, $day, $currentday) {
    $day++;

    $link = getGalleryLink($year, $week, $day);
    string = getTheDayString($year, $week, $day);
    if ($day == $currentday) {
      echo "<a id=\"linkweekday$day\" class=\"weekdaybutton weekdaybuttonselected\" href=\"$link\">$daystring</a>";
    } else {
      echo "<a id=\"linkweekday$day\" class=\"weekdaybutton\" href=\"$link\">$daystring</a>";
    }
  }

  echo "</div>"; //days
?>
    <title>Galleri</title>
    <link rel="stylesheet" href="css/swiper.min.css" />
    <script src="js/gallery.js"></script>



<?php
// TA BORT DETTA, HAR BARA MED DET JUST NU FÖR ATT SE NÅGONTING - Gustav
?>
    <style>

    /*h3 {
  display: block;
  clear: both;
  font-family: Open Sans;
  font-weight: normal;
  font-size: 110%;
  padding-top: 15px;
}

.buttons a,.buttons a:visited {
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
.buttons a:after {
  display: none;
}


.buttons { margin-bottom: 10px; }
.buttons.week-choice a {
  background: #016551;

}

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
}*/

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

          //Get category
          if (isset($_GET['category'])) {
            $category = $_GET['category'];
          } else {
            $category = "gallery";
          }

          if (session_status() == PHP_SESSION_NONE) {
              sec_session_start();
          }
          $admin = $_SESSION['admin'];
          if ($admin) {
            echo '<a class="no-link upload_link" href="gallery_upload_images.php">Ladda upp bilder</a>';
          }
          ?>

          <?php
          // ================   GALLERY   ================
          echo '<div id="gallery_container">';

          if ($category === "gallery") {

          if ($admin) {
            echo '<div id="deleteimagesbutton" class="deletestuff">Radera bilder</div>';
          }


          echo '<div class="week-choice choice buttons">';
          if (isset($_GET['week'])) {
            $week = $_GET['week'];
          } else {
            $week = date("W");
          }

          for ($i = 0; $i < 4; $i++) {
            printWeekLink($year, 34 + $i, $week);
          }

          if ($_GET['day'] != "") {
            $day = $_GET['day'];
          } else {
            $day = 10; // Valde 10 bara för att null inte fungerade.
          }

          echo '</div>';

          echo '<div class="day-choice choice buttons">';
          for($i = 0; $i < 7; $i++) {
            printWeekdaysLink($year, $week, $i, $day);
          }
          echo '</div>';

        echo '<div id="gallery">';


          //$query = "SELECT imagename, imagedate FROM images ORDER BY imagedate, imageorder ASC";
          if ($day == 10) { // day är alltså inte specifierad
            $weekdates = getStartAndEndDate($year, $week);
            $startdate = dates['weekstart'];
            $enddate = dates['weekend'];
            // $query = "SELECT imagename, imagecreateddate FROM images WHERE date(imagecreateddate) BETWEEN '$startdate' AND '$enddate' ORDER BY imagecreateddate, imageorder ASC";
            $query = "SELECT imagename, imagecreateddate FROM images ORDER BY imagecreateddate, imageorder ASC";
          } else {
            $thedate = getTheDate($year, $week, $day);
            $query = "SELECT imagename, imagecreateddate FROM images WHERE date(imagecreateddate) = '$thedate' ORDER BY imagecreateddate, imageorder ASC";
          }

          $result = execQuery($link, $query);
          //setlocale(LC_ALL, 'sv_SE.ISO8859-1');

          $largepath = "images/uploads/gallery/large/";
          $thumbpath = "images/uploads/gallery/thumbs/";
          $counter = 1;
          $currentdate = null;
          setlocale(LC_ALL, 'sv_SE.ISO8859-1');
          $tz = new DateTimeZone('Europe/Stockholm');
          while ($image = $result->fetch_object()) {
            $nextdate = new DateTime($image->imagecreateddate, $tz);
            $nextdate = $nextdate->format('Y-m-d');
            $imageid = preg_replace('/\\.[^.\\s]{3,4}$/', '', $image->imagename);

            if ($currentdate != $nextdate) {
              $currentdate = $nextdate;
              echo '<h3 class="imagedate" >' . utf8_encode(strftime("%e %B", strtotime($currentdate))) . '</h3>';
            }
            echo '<div id="' . $imageid . '" class="photoDiv_container">';
            echo '<div class="photoDiv thumbdiv" style="background-image:url(' . $thumbpath . $image->imagename . ')">';
            if ($admin) {
              echo '<div class="delete deleteimage" id="delete_' . $image->imagename . '"><span class="ion-ios-trash-outline"></span> <span class="hide-on-mobile">DELETE </span>' . $image->imagename . '</div>';
            }
            echo '<div class="push" onclick="showSlide(' . $counter . ');"></div>';
            echo '</div>'; //end photodiv
            echo '</div>';
            $counter++;
          }
        ?>

        </div>
        <div class="slideShowHolder">
          <!-- Slider main container -->
          <div class="swiper-container swiper-container-horizontal">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
            <?php
              $result = execQuery($link, $query);
              $counter = 1;

              while ($image = $result->fetch_object()) {
                echo '<div class="swiper-slide"> .
                    <div class="swiper-content">
                      <img data-src="' . $largepath . $image->imagename . '" class="swiper-lazy imgSize"/>
                    </div>
                  </div>';
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
        }
        ?>
        </div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script src="js/swiper.jquery.min.js"></script>

  </body>
</html>
