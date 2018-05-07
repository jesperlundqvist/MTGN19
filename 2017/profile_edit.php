   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Redigera profil</title>
    <script src="js/profile_edit.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper form-page">
      <?php
        $link = connectToDB();

        if (session_status() == PHP_SESSION_NONE) {
            sec_session_start();
        }

        $username = $_SESSION['username'];
        $admin = $_SESSION['admin'];

        //Om användaren är admin, kolla om det finns någon get_username
        if ($admin && isset($_GET['user'])) {
          $get_username = $_GET['user'];
        } else {
          $get_username = null;
        }

        // Kolla om det är användarens egna sida
        if ($get_username == $username || $get_username == null) {
          $ownProfile = true;
        } else {
          $ownProfile = false;
        }

        if (!$ownProfile  && !$admin) {
          echo "<p>Logga in för att redigera användaren.</p>";
          exit();
        }

        // Get info from database
         $stmt = $link->prepare("SELECT name, email, imagename, gifname, usergroup, description, q1, q2, q3, n0llegroup FROM users WHERE username = ? LIMIT 1");
        if (!$ownProfile) {
          $username = $get_username;
        }
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($name, $email, $imagename, $gifname, $usergroup, $description, $q1, $q2, $q3, $n0llegroup);
        $stmt->fetch();

        // Get profile picture if there is any
        // if ($imagename != null) {
        if ($imagename == null) {
          $imagename = "default.png";
        }

        if ($gifname == null) {
          $gifname = "default.png";
        }
        $imagepath = "images/uploads/profile_pictures/" . $imagename;
        $gifpath = "images/uploads/profile_gifs/" . $gifname;
        // } else {
          // $imagepath = null;
        // }

        echo "<h2 class='adminpanel_title'>Redigera profil</h2>";
        // Prints username, hidden and for use with javascript later
        echo "<div id=\"username\" style=\"display: none\">$username</div>";

        if ($admin) {
          // Name
          if ($name == null) {
            $name = "Namn";
          }
          echo "<p class='input_description'>Namn</p>";
          echo "<input type=\"text\" id=\"name\" value=\"$name\" class=\"input_areas\"/><br/>";
        }


        echo "<p class='input_description'>E-post</p>";
        echo "<input type=\"text\" id=\"email\" value=\"$email\" class=\"input_areas\"/><br/>";


        echo "<p class='input_description'>Beskriv dig själv!</p>";
        echo "<textarea rows=\"7\" type=\"text\" id=\"description\" value=\"$description\" class=\"input_areas\">$description</textarea><br/>";

        if ($q1 == null) {
         $q1 = "";
        }
        echo "<p class='input_description'>Grekisk sallad eller romerska bågar?</p>";
        echo "<input type=\"text\" id=\"q1\" name=\"q1\" value=\"$q1\" placeholder=\"$q1\" class=\"input_areas\"/><br/>";

        if ($q2 == null) {
         $q2 = "";
        }
        echo "<p class='input_description'>Alla vägar bär till...?</p>";
        echo "<input type=\"text\" id=\"q2\" name=\"q2\" value=\"$q2\" placeholder=\"$q2\" class=\"input_areas\"/><br/>";

        if ($q3 == null) {
         $q3 = "";
        }
        echo "<p class='input_description'>Vad är ditt gladiatornamn?</p>";
        echo "<input type=\"text\" id=\"q3\" name=\"q3\" value=\"$q3\" placeholder=\"$q3\" class=\"input_areas\"/><br/>";

        echo "<p class='input_description'>Ändra lösenord</p>";
        echo "<input type='password' id='new_password_1' placeholder='Nytt lösenord' class='input_areas'/><br/>";
        echo "<input type='password' id='new_password_2' placeholder='Nytt lösenord igen' class='input_areas'/><br/>";

        if ($usergroup == 'nØllan' && $admin) {
          ?>
          <div id="n0llegroup_container" class="input_description">
          nØllegrupp:
          <select id="n0llegroup" name="usergroup">
          <?php
            $query = "SELECT n0llegroup FROM n0llegroups ORDER BY n0llegroup ASC";
            $result = execQuery($link, $query);

            while ($r = $result->fetch_object()) {
              $u = $r->n0llegroup;
              if ($u === $n0llegroup) {
                echo "<option value=\"$u\" selected='selected'>$u</option>";
              } else {
                echo "<option value=\"$u\">$u</option>";
              }

            }
          ?>
          </select>
          <br/>

          <?php
        }

        // Man kan bara ändra profilbild om man är admin
        if ($admin) {
          echo "<img id=\"profilepicture\" src=\"$imagepath\" class=\"profile_preview_img edit_img\"/><br/>";
          echo "<input type=\"file\" id=\"fileselect\" class=\"fileselect file_input\" name=\"profilepicture\"/>";
          echo "<label for=\"fileselect\">Välj fil...</label><br/>";
          echo "<div class=\"drag\" id=\"filedrag\"></div><br/>";
        }

          // echo "</div>";
      ?>

        <button id="submit_new_user_btn" class="button-primary">Spara ändringar</button>
        <?php
        echo'<div id="statusbarcontainer '.($admin ? '' : 'no-display').'"></div>';
        ?>
        <div id="info"></div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
