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

      $query = "SELECT description, lat, lng, isActive FROM basecamp";
      $result = execQuery($link, $query);

      while ($basecamp = $result->fetch_object()) {
        $description = $basecamp->description;
        $lat = $basecamp->lat;
        $lng = $basecamp->lng;
        $isActive = $basecamp->isActive;
      }

    ?>

    <div class="content-wrapper center">
      <h1>Basecamp</h1>
      <?php
      if($admin){
          ?>
          <div style="max-width:200px;">
          <a class="button-primary" href="basecamp_edit.php" style="margin-top:20px;margin-bottom:20px;display:block;">Ändra plats</a>
          </div>
        <?php
      }

      if($isActive){
      ?>
      <div class="basecamp-description">
        <?= $description ?>
      </div>
      <div id="map"></div>

    <?php

      } // end isActive
      else {
        ?>
        <!-- inline jag vet förlåt -->
        <h2 style="color:#e3af49;">Basecamp är tyvärr inte ute för tillfället.</h2>

        <?= $description ?>

        <?php
      }
      echo '</div>'; // content wrapper
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
