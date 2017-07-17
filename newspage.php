   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2017</title>
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
        setlocale(LC_ALL, 'sv_SE.ISO8859-1');

        $username = $_SESSION['username'];
        $admin = $_SESSION['admin'];

        if (isset($_GET['id'])) {
          $id = $_GET['id'];
        } else {
          echo "Inget nyhetsid.";
          exit();
        }

        // Gets data about the news article
        if ($stmt = $link->prepare("SELECT author, title, body, category, newsdate FROM news WHERE id = ?")) {
          $stmt->bind_param('s', $id);
          $stmt->execute();
          $stmt->store_result();
          $stmt->bind_result($author, $title, $body, $category, $newsdate);
          $stmt->fetch();
        } else {
          echo "Kunde inte hämta nyheten.";
          exit();
        }

        $body = nl2br($body);

        // Get name of author
        if ($stmt = $link->prepare("SELECT name, username FROM users WHERE username = ? LIMIT 1")) {
          $stmt->bind_param('s', $author);
          $stmt->execute();
          $stmt->store_result();
          $stmt->bind_result($name, $currusername);
          $stmt->fetch();
        } else {
          $name = "Odefinierad";
        }

        // The markup or displaying the news article
        echo "<div class='news'>";
        echo "<h2 class='adminpanel_title'>$title</h2>";
        echo "<p>$body</p>";

       if ($username === $currusername || $admin) {
            echo "<a class='news-edit button' href=\"newspage_edit.php?id=$id\">Redigera inlägg</a>";
          }
          echo "<div class='post-footer clearfix'>";
          echo "<a class='news-category' href=\"/index.php?category=$category\">$category</a>";
          echo "<div class='news-writtenby'>";
          echo "<span>Skrivet av: </span>$name";

          echo "</div>";
          echo "<div class='news-timestamp'>" . utf8_encode(strftime("%A %#d %B %H:%M", strtotime($newsdate))) . "</div>";
          echo "</div>"; //post-footer
          //echo "<div class='white'></div>";
          echo "</div>"; //news-content
          echo "</div>"; //news
        // echo "</div>"; // end news

      ?>
        <div id="info"></div>
    <!-- </div> -->

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
