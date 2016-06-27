   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Adminpanel</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');

    if (session_status() == PHP_SESSION_NONE) {
        sec_session_start();
    }

    $admin = $_SESSION['admin'];
    if ($admin) { ?>
      <div class="content-wrapper">
            <div class="admin-controls">
              <a href="register.php">Lägg till användare</a>
            </div>

            <div id="news_input_container" class="news-top">
              <form id="news_input_form" action="newspage_handler.php?action=add" method="post">
                <h2 id="new_post_trigger">Skapa nytt inlägg <span class="ion-ios-plus-outline" id="new_post_icon"></span></h2>
                <div id="new_post_container">
                  <div class="news_instructions">
                    <p class="first">TIPS! Du kan använda HTML i inläggen. Länk och bild visas nedan. Du kan även embedda Youtube-videos.</p>
                    <code>
                      LÄNK: &lt;a href="http://google.com"&gt;text som ska visas&lt;/a&gt; </br>
                      BILD: &lt;img src="http://länktillbilden.com/bild.jpg"/&gt;
                    </code>
                  </div>
                  <input id="news_title" name="news_title" placeholder="Titel" class="input_areas"/><br/>
                  <textarea id="news_input" name="news_input" placeholder="Skriv..." cols="" rows="5" class="input_areas"></textarea><br/>
                  <select id="news_category" name="news_category">
                  <?php
                    $query = "SELECT category FROM categories ORDER BY category ASC";
                    $result = execQuery($link, $query);

                    while ($category = $result->fetch_object()) {
                      $c = $category->category;
                      echo "<option value=\"$c\">$c</option>";
                    }
                  ?>
                  </select>
                  <br/>
                  <input type="submit" value="Posta" id="post_news"/>
                </div>
              </form>
            </div>
      </div>
      <?php
    }
    else {
        // Not logged in as admin
    ?>
    <p>Du måste logga in som admin</p>
    <?php
    }

      //Load footer
      include_once ('inc_footer.php');
    ?>


  </body>
</html>
