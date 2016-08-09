  <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Lägg till nytt event</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper form-page">
      <!-- Content -->
      <?php
      if ($_SESSION['admin']) {

        if ($_POST){
          $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

          if ($stmt = $link->prepare("INSERT INTO event (name) VALUES (?)")) {
          $stmt->bind_param('s', $name);
          $stmt->execute();
          if ($stmt->error) {
            echo "Error: $stmt->error";
          }

          echo'<div class="center"><span style="color:green;">Event tillagt! </span></div>';
  }
        }
      ?>
        <h1>Lägg till nytt event</h1>
        <form class="center" id="even  tform" action="event.php" method="post">
          <input id="edit_title" name="name" placeholder="Namn" class="input_areas">
          <input type="submit" value="Lägg till" class="button-primary">
        </form>
      <?php
      }
      else {
        echo 'Du måste logga in som admin.';
      }
      ?>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
