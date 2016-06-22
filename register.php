   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2016</title>
    <script src="js/sha512.js"></script>
    <script src="js/register.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      // include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">
    <a href="/"> Startsidan</a>
      <?php
    // Vi kollar att användaren är inloggad som admin
    if (session_status() == PHP_SESSION_NONE) {
        sec_session_start();
    }
    if ($_SESSION['admin']) {
      ?>
        <!-- Sidinnehåll -->
      <div class="container">
        <div class="content_container">
          <h2>Skapa ny användare</h2>
          <input type="text" id="new_username" placeholder="Användarnamn" class="input_areas"/>
          <br/>
          <input type="password" id="new_password_1" placeholder="Lösenord" class="input_areas"/>
          <br/>
          <input type="password" id="new_password_2" placeholder="Lösenord igen" class="input_areas"/>
          <br/>
          <input type="text" id="name" placeholder="Namn" class="input_areas"/>
          <br/>
          <input type="email" id="email" placeholder="E-post" class="input_areas"/>
          <br/>
          Grupp:
          <select id="usergroup" name="usergroup">
          <?php
            $query = "SELECT usergroup FROM usergroups ORDER BY usergroup ASC";
            $result = execQuery($link, $query);

            while ($r = $result->fetch_object()) {
              $u = $r->usergroup;
              echo "<option value=\"$u\">$u</option>";
            }
          ?>
          </select>
          <br/>
          <div id="n0llegroup_container">
          nØllegrupp:
          <select id="n0llegroup" name="usergroup">
          <?php
            $query = "SELECT n0llegroup FROM n0llegroups ORDER BY n0llegroup ASC";
            $result = execQuery($link, $query);

            while ($r = $result->fetch_object()) {
              $u = $r->n0llegroup;
              echo "<option value=\"$u\">$u</option>";
            }
          ?>
          </select>
          <br/>
          </div>
          <span>Profilbild (normal): </span>
          <input type="file" id="fileselect" name="profilepicture"/>
          <br/>
          <div class="drag" id="filedrag"></div>
          <br/>
          <span>Profilbild (gif): </span>
          <input type="file" id="fileselect_gif" name="profilepicture"/>
          <br/>
          <div class="drag" id="filedrag_gif"></div>
          <br/>
          <div id="statusbar">
            <div id="filesizes"></div>
            <div id="progressbar"><div></div></div>
          </div>
          <button id="submit_new_user_btn">Spara ny användare</button>
          <div id="info"></div>
        </div>
      </div>
      <?php
    } else {
      ?>
        <p>Du måste logga in som admin</p>
      <?php
    }
  ?>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

  </body>
</html>

