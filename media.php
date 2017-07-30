  <?php
    //Load header
    include_once ('inc_header.php');

    $link = connectToDB();

    $imagethumbpath = "images/uploads/gallery/thumbs/";
    $imagelargepath = "images/uploads/gallery/large/";

  ?>
    <title>Media</title>
    <link rel="stylesheet" href="css/jquery.fancybox.css?v=1" type="text/css">
    <script type="text/javascript" src="js/isotope.pkgd.min.js"></script>
    <script type="text/javascript" src="js/jquery.fancybox.pack.js"></script>
    <script type="text/javascript" src="js/jquery.fancybox-media.js"></script>
    <script type="text/javascript" src="js/media.js"></script>
    <script type="text/javascript" src="js/carousel.js"></script>

    <link rel="stylesheet" type="text/css" href="css/carousel.css">
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
    <div id="popup_container"></div>
      <h1>Media</h1>
      <div class="gallery">
      <div class="js-filter-show filter-show"><h3>Visa filter</h3></div>
      <div class="js-filter-hide filter-hide"><h3>Göm filter</h3></div>
      <div class="filters clearfix">
        <div class="filter-wrap">
          <h3>Typ</h3>
          <div class="button-group filters-button-group" data-filter-group="type">
            <ul class="button-group-ul" id="gallery-filter-type">
              <li><a class="button is-checked" data-filter="all">Visa alla</a></li>
              <li><a class="button" data-filter="image">Bild</a></li>
              <li><a class="button" data-filter="video">Video</a></li>
            </ul>
          </div>
        </div>

        <div class="filter-wrap">
          <h3>Vecka</h3>
          <div class="button-group filters-button-group" data-filter-group="week">
            <ul class="button-group-ul" id="gallery-filter-week">
              <li><a class="button is-checked" data-filter="all">Visa alla</a>
              <li><a class="button" data-filter="33">33</a></li>
              <li><a class="button" data-filter="34">34</a></li>
              <li><a class="button" data-filter="35">35</a></li>
              <li><a class="button" data-filter="36">36</a></li>
            </ul>
          </div>
        </div>

        <?php
        $query = "SELECT name FROM event";
        $result = execQuery($link, $query);
        ?>
        <div class="filter-wrap">
          <h3>Event</h3>
          <div class="button-group filters-button-group" data-filter-group="event">
            <ul class="button-group-ul" id="gallery-filter-event">
              <li><a class="button is-checked" data-filter="all">Visa&nbsp;alla</a></li>
              <?php
              while ($event = $result->fetch_object()) {
                $name = $event->name;
                echo'<li><a class="button" data-filter="'.$name.'">'.$name.'</a></li>';
              }
              ?>
            </ul>
          </div>
        </div>

      </div>
        <?php
        // Images
        $query = "SELECT * FROM ( SELECT imagename, uploaddate, event, week FROM images UNION SELECT videoid, uploaddate, event, week FROM videos) AS media ORDER BY uploaddate DESC";
        $result = execQuery($link, $query);

        echo "<div class='gallery-carousel' data-slideout-ignore>";
        while ($media = $result->fetch_object()) {
            // Bild
            if (substr($media->imagename, -5, 1) == "." || substr($media->imagename, -4, 1) == ".")
            {
                echo "<div class='gallery-carousel-item image gallery-active-filter-type gallery-active-filter-week gallery-active-filter-event' data-week='" . $media->week . "' data-event='" . $media->event . "' ' style='background-image: url(" . $imagethumbpath . $media->imagename . ");'><input type='checkbox' class='gallery-delete-checkbox' data-id='" . $media->imagename . "' data-type='image' /></div>";
            }
            // Video
            else {
                echo "<div class='gallery-carousel-item video gallery-active-filter-type gallery-active-filter-week gallery-active-filter-event' data-week='" . $media->week . "' data-event='" . $media->event . "' style='background-image: url(http://img.youtube.com/vi/" . $media->imagename . "/hqdefault.jpg);'><img class='video-play-icon' src='/design/play_icon.png' /><input type='checkbox' class='gallery-delete-checkbox' data-id='" . $media->imagename . "' data-type='video' /></div>";
            }
        }
        echo "</div>";
        ?>
        <div id="loader">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>

        <?php
        echo "<div class='gallery-large'>";
        echo "<div id='gallery-carousel-previous'>&#x2039;</div><img id='gallery-large-image'/><iframe id='gallery-ytplayer' type='text/html' src='' frameborder='0' allowfullscreen></iframe><div id='gallery-carousel-next'>&#x203a;</div></div>";
    ?>

    <?php

    if ($admin)
    {
        ?>
        <br><br>
        <a class="button button-primary" id="gallery-remove-button">Ta bort valda bilder/filmer</a>
        <br>
        <br>
        <p id="gallery-remove-status"></p>
        <?php
    }

    ?>
    </div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>
  </body>
</html>
