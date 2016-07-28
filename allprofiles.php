   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2016</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <!-- Content -->
        <div class="search-container">
          <input class="input_areas" id="search" type="text" placeholder="Sök..."/>
          <span class="ion-ios-search search-icon"></span>
        </div>

        <br/>
        <!-- Profiles are rendered in file functions_searchusers.php -->
        <div id="profiles"></div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    </div> <!-- close push-wrap from inc_top_content -->
    </div> <!-- close site-wrap from inc_top_content -->

  </body>
</html>
