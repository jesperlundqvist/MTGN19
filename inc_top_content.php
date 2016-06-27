<div class="header">
      <a href="/">Startsida </a>
      <?php
      $admin = $_SESSION['admin'];
      if ($admin) {
      ?><a href="adminpanel.php">Adminpanel</a><?php
      }
      ?>
      <a href="logout.php">Logga ut </a>



</div>
