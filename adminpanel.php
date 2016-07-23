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
              <a class="admin-control" href="register.php">Lägg till användare</a>
              <a class="admin-control" href="gallery_upload_images.php">Ladda upp bilder</a>
            </div>

            <div id="news_input_container" class="news-top">
              <form id="news_input_form" action="newspage_handler.php?action=add" method="post">
                <h2 id="new_post_trigger" class="adminpanel_title">Nytt inlägg <span class="ion-ios-plus-outline" id="new_post_icon"></span></h2>
                <div id="new_post_container">
                  <div class="news_instructions">
                    <p class="first">TIPS! Du kan använda HTML i inläggen. Länk och bild visas nedan. Du kan även embedda Youtube-videos.</p>
                    <code class="first">
                      LÄNK: &lt;a href="http://google.com"&gt;text som ska visas&lt;/a&gt; </br>
                      BILD: &lt;img src="http://länktillbilden.com/bild.jpg"/&gt;
                    </code>
                  </div>
                  <input id="news_title" name="news_title" placeholder="Titel" class="input_areas"/><br/>
                  <textarea id="news_input" name="news_input" placeholder="Innehåll" cols="" rows="5" class="input_areas"></textarea><br/>
                  <p class="news_category_title">Kategori</p>
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
                  <input type="submit" value="Skapa inlägg" id="post_news" class="submit_button"/>
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
