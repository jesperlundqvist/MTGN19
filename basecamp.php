  <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Basecamp</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');

      $admin = $_SESSION['admin'];

      $query = "SELECT description, lat, lng FROM basecamp";
      $result = execQuery($link, $query);

      while ($basecamp = $result->fetch_object()) {
        $description = $basecamp->description;
        $lat = $basecamp->lat;
        $lng = $basecamp->lng;
      }

    ?>

    <div class="content-wrapper">
      <h1>Basecamp</h1>
      <?php
      if($admin){
          ?>
          <div style="max-width:200px;">
          <a class="button-primary" href="basecamp_edit.php" style="margin-top:20px;margin-bottom:20px;display:block;">Ändra plats</a>
          </div>
        <?php
      }
      ?>
      <div class="basecamp-description">
        <?= $description ?>
      </div>
      <div id="map"></div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>
    <script>
      var map;
      function initMap() {
        var pos = {lat: <?= $lat ?>, lng: <?= $lng ?>};
        map = new google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 17
        });

        var drag = false;

        var marker = new google.maps.Marker({
          position: pos,
          draggable: drag,
          map: map,
          title: 'Här är basecamp'
        });
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCsUBinzlYwP-gE74Ls5L9-xSlZbJTIqlM&callback=initMap"
    async defer></script>
  </body>
</html>
