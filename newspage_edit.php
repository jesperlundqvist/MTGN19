   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2016</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
      <!-- Content -->
      <?php
        $link = connectToDB();

        if (session_status() == PHP_SESSION_NONE) {
            sec_session_start();
        }

        $username = $_SESSION['username'];
        $admin = $_SESSION['admin'];

        if (isset($_GET['id'])) {
          $id = $_GET['id'];
        } else {
          echo "Inget nyhetsidé.";
          exit();
        }

        // Get data about the news article
        if ($stmt = $link->prepare("SELECT author, title, body, category FROM news WHERE id = ?")) {
          $stmt->bind_param('s', $id);
          $stmt->execute();
          $stmt->store_result();
          $stmt->bind_result($author, $title, $body, $category);
          $stmt->fetch();
        } else {
          echo "Kunde inte verifiera att du är skaparen av detta inlägg.";
          exit();
        }

        if ($author !== $username && !$admin) {
          echo "Du har inte skapat detta inlägg och kan därför inte redigera det.";
          exit();
        }

        echo "<h2 class='adminpanel_title'>Redigera inlägg</h2>";

        // --- DELETE ---
        echo "<form action=\"newspage_handler.php?action=delete\" method=\"post\">";
        echo "<input type=\"text\" id=\"id\" name=\"id\" value=\"$id\" style=\"display: none\"/>";
        echo "<input type=\"submit\" value=\"Radera nyheten\" id=\"delete_news\">";
        echo "</form>";
        // --- DELETE ---

        ?>
        <div class="news_instructions">
          <p class="first">TIPS! Du kan använda HTML i inläggen. Länk och bild visas nedan. Du kan även embedda Youtube-videos.</p>
          <code class="first">
            LÄNK: &lt;a href="http://google.com"&gt;text som ska visas&lt;/a&gt; </br>
            BILD: &lt;img src="http://länktillbilden.com/bild.jpg"/&gt;
          </code>
        </div>
        <?php
        // Update
        echo "<form action=\"newspage_handler.php?action=update\" method=\"post\">";
        echo "<input type=\"text\" id=\"id\" name=\"id\" value=\"$id\" style=\"display: none\"/>";
        echo "<input id='news_title' type=\"text\" id=\"title\" name=\"title\" value=\"$title\" class=\"input_areas\"/><br/>";
        echo "<textarea id=\"body\" name=\"body\" cols=\"\" rows=\"10\" class=\"input_areas\">$body</textarea></br>";


        $query = "SELECT category FROM categories ORDER BY category ASC";
        $result = execQuery($link, $query);


        echo "<select id=\"category\" name=\"category\">";
        while ($cat = $result->fetch_object()) {
          $c = $cat->category;
          if ($c == $category) {
            echo "<option value=\"$c\" selected=\"selected\">$c</option>";
          } else {
            echo "<option value=\"$c\">$c</option>";
          }
        }
        echo "</select>";


        echo "<input type=\"submit\" value=\"Spara\" id=\"save_news\">";
        echo "</form>";

      ?>
        <div id="info"></div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
