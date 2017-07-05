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

    <div class="content-wrapper">
    <?php
    if ($admin){
      ?>
      <h1>Basecamp</h1>
      <?php
      if($isActive){
        echo'
        <div class="form-page">
        <h2>Dölj basecamp</h2>
        <form action="basecamp_edit_process.php" method="post">
          <input type="hidden" name="isActive" id="isActive" value="0"/>
          <input type="submit" class="button-primary" value="Dölj">
        </form>
          <br><br>
          </div>';
      }
      else {
        echo'<h2 class="left">Basecamp dolt</h2>';
        echo'Är basecamp ej aktivt aktiveras det automatiskt när man uppdaterar platsen.';
      }
      ?>
      <br><br>

      Dra i markern för att ändra position på basecamp. Tryck sedan på "uppdatera".
      <div id="map"></div>
      <br>
      <div class="form-page">
      <form action="basecamp_edit_process.php" method="post">
        <input type="hidden" name="lat" id="lat" placeholder="lat" class="input_areas"/>
        <input type="hidden" name="lng" id="lng" placeholder="long" class="input_areas"/>
        <input type="submit" class="button-primary" value="Uppdatera"></form>
      </form>
      </div>
    </div>


    <?php

    }else{
      echo'Logga in som admin';
    }
    ?>

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

        var drag = true;

        var marker = new google.maps.Marker({
          position: pos,
          draggable: drag,
          map: map,
          title: 'Här är basecamp'
        });

        $('#lat').val(marker.getPosition().lat());
        $('#lng').val(marker.getPosition().lng());

        marker.addListener('dragend', function() {
          $('#lat').val(marker.getPosition().lat());
          $('#lng').val(marker.getPosition().lng());
          map.setCenter(marker.getPosition());
        });
      }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC-0HQfVbXdEjF52aCm6rK9UMIrWglIskk&callback=initMap"
    async defer></script>
  </body>
</html>
