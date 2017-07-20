  <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2017</title>
    <script type="text/javascript" src="/js/phaser.min.js"></script>
    <script type="text/javascript" src="/js/game.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
      $username = $_SESSION['username'];

      if($username == 'gustav'){


    ?>

    <div class="hidden username" id="js-username">
    <?php
      echo $username;
    ?>
    </div>
    <div class="content-wrapper">
    <div id="js-phaser" class="game-canvas"></div>
    </div>

    <?php

    }
    else {
      echo'<div class="center">under uppbyggnad</div>';
    }
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
