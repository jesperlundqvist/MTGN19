  <?php
    //Load header
    include_once ('inc_header.php');

    $link = connectToDB();

  ?>
    <title>Media</title>

    <script type="text/javascript" src="js/media.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <h1>Media</h1>
      <div class="filters">
        <div class="button-group filters-button-group" data-filter-group="type">
          <button class="button is-checked" data-filter="">Visa alla</button>
          <button class="button" data-filter=".filter-image">Bild</button>
          <button class="button" data-filter=".filter-video">Video</button>
        </div>

        <div class="button-group filters-button-group" data-filter-group="week">
          <button class="button is-checked" data-filter="">Visa alla</button>
          <button class="button" data-filter=".filter-36">36</button>
          <button class="button" data-filter=".filter-37">37</button>
        </div>

        <div class="button-group filters-button-group" data-filter-group="event">
          <button class="button is-checked" data-filter="">Visa alla</button>
          <button class="button" data-filter=".filter-none">Inget</button>
          <button class="button" data-filter=".filter-vgasque">Välkomstgasquen</button>
          <button class="button" data-filter=".filter-other">Annat</button>
        </div>
      </div>



      <div class="grid">
        <div class="filter-item filter-image filter-36 filter-vgasque" data-category="transition">
          TESTBILD1
        </div>
        <div class="filter-item filter-image filter-36 filter-other" data-category="transition">
          TESTBILD2
        </div>
        <div class="filter-item filter-video filter-37 filter-other" data-category="transition">
          TESTVIDEO1
        </div>
        <div class="filter-item filter-video filter-37 filter-none" data-category="transition">
          TESTVIDEO2
        </div>
      </div>


    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
