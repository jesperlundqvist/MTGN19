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
        echo "<span class='post-footer'>";
          echo "<h5><span class='hide-on-mobile2'><span class='ion-android-person news-icon'></span> </span>$name</h5>";
          echo "<h5><span class='hide-on-mobile2'><span class='ion-android-bookmark news-icon'></span> </span><a href=\"/index.php?category=$category\">$category</a></h5>";
        if ($username === $currusername || $admin) {
          echo "<a href=\"newspage_edit.php?id=$id\"><h5>Redigera inlägg</h5></a>";
        }

        echo "</span>"; // end post-footer
        echo "<div class='white'></div>";
        echo "<div class='newsdate-wrapper'>";
        echo "<div class='right-banner'>";
        echo "<h6>" . utf8_encode(strftime("%A %#d %B %H:%M", strtotime($newsdate))) . "</h6>";
        echo "</div>";
        echo "</div>"; // end newsdate-wrapper
        echo "</div>"; // end news

      ?>
        <div id="info"></div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
