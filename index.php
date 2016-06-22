   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2016</title>
  </head>

  <body>

    <?php
      //Load top content
      // include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <!-- Content -->
      <?php
      $admin = $_SESSION['admin'];
      if ($admin) {
      ?><a href="adminpanel.php">Adminpanel</a><?php
      }
      ?>
      <a href="logout.php">Logga ut </a>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script type="text/javascript">


    </script>

  </body>
</html>
