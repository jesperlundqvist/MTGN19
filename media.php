  <?php
    //Load header
    include_once ('inc_header.php');

    $link = connectToDB();

    $imagethumbpath = "images/uploads/gallery/thumbs/";
    $imagelargepath = "images/uploads/gallery/large/";

  ?>
    <title>Media</title>
    <link rel="stylesheet" href="css/jquery.fancybox.css" type="text/css">
    <script type="text/javascript" src="js/isotope.pkgd.min.js"></script>
    <script type="text/javascript" src="js/jquery.fancybox.pack.js"></script>
    <script type="text/javascript" src="js/jquery.fancybox-media.js"></script>
    <script type="text/javascript" src="js/media.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <h1>Media</h1>

      <div class="js-filter-show filter-show"><h3>Visa filter</h3></div>
      <div class="js-filter-hide filter-hide"><h3>Göm filter</h3></div>
      <div class="filters clearfix">
        <div class="filter-wrap">
          <h3>Typ</h3>
          <div class="button-group filters-button-group" data-filter-group="type">
            <ul class="button-group-ul">
              <li><a class="button is-checked" data-filter="">Visa alla</a></li>
              <li><a class="button" data-filter=".filter-image">Bild</a></li>
              <li><a class="button" data-filter=".filter-video">Video</a></li>
            </ul>
          </div>
        </div>

        <div class="filter-wrap">
          <h3>Vecka</h3>
          <div class="button-group filters-button-group" data-filter-group="week">
            <ul class="button-group-ul">
              <li><a class="button is-checked" data-filter="">Visa alla</a>
              <li><a class="button" data-filter=".filter-33">33</a></li>
              <li><a class="button" data-filter=".filter-34">34</a></li>
              <li><a class="button" data-filter=".filter-35">35</a></li>
              <li><a class="button" data-filter=".filter-36">36</a></li>
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
            <ul class="button-group-ul">
              <li><a class="button is-checked" data-filter="">Visa&nbsp;alla</a></li>
              <?php
              while ($event = $result->fetch_object()) {
                $name = $event->name;
                echo'<li><a class="button" data-filter=".filter-'.$name.'">'.$name.'</a></li>';
              }
              ?>
            </ul>
          </div>
        </div>

      </div> <!-- end filters -->
      <div class="grid">

        <?php
        // Images
        $query = "SELECT imagename, imagecreateddate, event, week FROM images ORDER BY imagecreateddate, imageorder ASC";
        $result = execQuery($link, $query);
        while ($image = $result->fetch_object()) {
          echo'
          <a class="fancybox-media" rel="gallery1" href="' . $imagelargepath . $image->imagename . '"><div class="filter-item filter-image filter-'.$image->week .' filter-'.$image->event .'" data-category="transition" style="background-image:url(' . $imagethumbpath . $image->imagename . ')">
          </div></a>';
        }

        // Video
        $query = "SELECT videoid, event, week FROM videos ORDER BY uploaddate ASC";
        $result = execQuery($link, $query);
        while ($video = $result->fetch_object()) {
          echo'
         <a class="fancybox-media" rel="gallery1" href="http://www.youtube.com/watch?v='.$video->videoid.'"><div class="filter-item filter-video filter-'.$video->week .' filter-'.$video->event .'" data-category="transition" style="background-image:url(http://img.youtube.com/vi/' . $video->videoid . '/hqdefault.jpg)"><img class="video-play-icon" src="/design/play_icon.png" />
          </div></a>';
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
