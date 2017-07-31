 <?php
  //Load header
  include_once ('inc_header.php');

  $link = connectToDB();

  if (session_status() == PHP_SESSION_NONE) {
      sec_session_start();
  }
  ?>
    <title>Mottagningen 2017</title>
    <link href='https://fonts.googleapis.com/css?family=Stardos+Stencil:700' rel='stylesheet' type='text/css'>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');

      $username = $_SESSION['username'];
      $admin = $_SESSION['admin'];

      if(isset($_GET['user'])) {
        $get_username = $_GET['user'];
      }

      // Kolla om det är användarens egna sida
      if ($get_username == $username || $get_username == null) {
        $ownProfile = true;
      } else {
        $ownProfile = false;
      }

      if (!$ownProfile) {
        $username = $get_username;
      }

      // Hämta föregående användare och nästa
      $query = "SELECT username FROM users ORDER BY weight, n0llegroup, name ASC";
      $result = execQuery($link, $query);

      $count = mysqli_num_rows($result);

      $counter = 1;
      while ($r = $result->fetch_object()) {
        if ($counter == 1) {
          $firstUser = $r->username;
        }
        if ($r->username == $username) {
          if ($nextUserObj = $result->fetch_object()) {
            $nextUser = $nextUserObj->username;
          }

          $prevUser =  $pu;
        }

        $pu = $r->username;
        $counter += 1;
        if ($counter == $count) {
          $lastUser = $r->username;
        }
      }

      if (!$prevUser) {
        $prevUser = $lastUser;
      }

      if (!$nextUser) {
        $nextUser = $firstUser;
      }

      // Hämta användaruppgifter
      $stmt = $link->prepare("SELECT name, email, imagename, gifname, usergroup, description, q1, q2, q3, n0llegroup FROM users WHERE username = ? LIMIT 1");
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $stmt->store_result();
      $stmt->bind_result($name, $email, $imagename, $gifname, $usergroup, $description, $q1, $q2, $q3, $n0llegroup);
      $stmt->fetch();

      // Hämta profilbild om det finns någon
      if ($usergroup !== 'nØllan') {
        if ($gifname != null) {
          $imagepath = "images/uploads/profile_gifs/" . $gifname;
        } else {
          // $imagepath = null;
          $imagepath = "images/uploads/profile_pictures/" . $imagename;
        }
      } else {
        if ($imagename != null) {
          $imagepath = "images/uploads/profile_pictures/" . $imagename;
        } else {
          $imagepath = null;
        }
      }
    ?>




    <div class="content-wrapper">

        <?php

        //Wrapper
        echo "<div class='profile-wrapper'>";
        //Länkar
        echo "<div class='prevProfileLink'><a class='no-link' href='profile.php?user=$prevUser'><i class='fa fa-arrow-left' aria-hidden='true'></i></a></div>";
        echo "<div class='nextProfileLink'><a class='no-link' href='profile.php?user=$nextUser'><i class='fa fa-arrow-right' aria-hidden='true'></i></span></a></div>";

        echo '<div class="profile-column-left">';
        // Profilbild
        if ($imagepath != null) {
          echo "<div id='profilepic-wrapper' style='background-image:url(\"$imagepath\")'>";
          echo "</div>";
          echo "<div id='profile-banner'></div>";
        }

        // namn
        if ($name != null) {
          echo "<div class='non-semantic-protector'> ";
          echo "<p class='bottom-ribbon'><span class='ribbon-content'>$name</span></p>";
          if ($usergroup == 'nØllan' || ($usergroup == 'KPH' && $n0llegroup != null)) {
            echo "<p class='n0llegroup'>$n0llegroup</p>";
          }
          echo "</div>";
        }

        echo'</div>';

        echo'<div class="profile-column-right">';

        // brytstreck
        // echo "<svg class='profile-divider-line'>";
        // echo "<line x1='0' y1='0' x2='100%' y2='0'/>";
        // echo "</svg>";

        // beskrivning
        echo "<div class='description-wrap'>";
        echo '<p class="description '.($usergroup == 'RSA' ? 'rsa-ser-allt' : '').'">'.
              $description.'
            </p>';
        echo "</div>";


        // fulhax
        if ($name == 'Ceder') {
          echo "<img style='width:200px;' src='http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=http%3A%2F%2Fmtgn.nu%2Fprofile.php%3Fuser%3DCeder&amp;qzone=1&amp;margin=0&amp;size=400x400&amp;ecc=L' alt='qr code' />";        }
        if($name == 'Marcus'){
        ?>
          <script>
            /*$( document ).ready(function() {
              arr = ["Kapten Haddock", "Kapten Krok"];
              rand = Math.round(Math.random());
              console.log(arr[rand]);
              $(".q2-js").html(arr[rand]);
          });*/
          </script>
        <?php
        }

        if ($q1 != null) {
          echo "<div class='question-wrap'>
              <h3 class='question notranslate'>Grekisk sallad eller romerska bågar?</h3>
              <span class='answer'>$q1</span>
              </div> ";
        }

        if ($q2 != null) {
          echo "<div class='question-wrap'>
              <h3 class='question notranslate'>Skrik eller panik?</h3>
              <span class='answer q2-js'>$q2</span>
              </div> ";
        }

        if ($q3 != null) {
          echo "<div class='question-wrap'>
              <h3 class='question notranslate'>Are you not entertained??</h3>
              <span class='answer'>$q3</span>
              </div> ";
        }

        echo'<br>';

        echo'</div>';

        // Användaren kan bara redigera profilen om det är hens profil eller om hen är admin
        if ($admin || $ownProfile) {
          echo "<div class=\"edit_profile_link\"><a class=\"button-primary\" id=\"edit_profile\" class=\"no-link button\" href=\"profile_edit.php?user=$username\">Redigera profil</a></div>";
        }
        echo "</div>"; //Wrapper
      ?>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>
