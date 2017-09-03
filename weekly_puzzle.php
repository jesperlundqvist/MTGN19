  <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <!-- Content -->
      <div class="puzzle-wrap">
        <div class="puzzle">
          <h1 class=puzzle_title>Problema unum</h1>
            <p>Find est error.</p>
            <p>Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </br>
            <input type="text" id="puzzle-answer" placeholder="Responsum" autocorrect="off" />
            <button id="submit_answer_btn">Confirmo</button>
            <div id="error">Error, iterum conare!</div>
          </div>
          <div class="secret"></div>
      </div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script src="/js/weekly_puzzle.js"></script>
  </body>
</html>
