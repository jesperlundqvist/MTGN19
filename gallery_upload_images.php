   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Ladda upp bilder</title>
    <script src="js/gallery_upload_images.js"></script>
    <script src="js/jquery-ui.min.js"></script>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>
    <div class="content-wrapper form-page left">
      <?php
      if (session_status() == PHP_SESSION_NONE) {
          sec_session_start();
      }
      if ($_SESSION['admin']) {
        ?>
      <h2 class="adminpanel_title">Ladda upp bilder</h2>
          <div id="form">
            Fotograf:
            <select id="photographer" name="photographer">
            <?php
              $query = "SELECT username, name FROM users WHERE usergroup = 'INPHO' ORDER BY username ASC";
              $result = execQuery($link, $query);

              $username = $_SESSION['username'];

              while ($r = $result->fetch_object()) {
                $u = $r->username;
                $n = $r->name;
                if ($u == $username) {
                  echo "<option value=\"$u\" selected=\"selected\">$n</option>";
                } else {
                  echo "<option value=\"$u\">$n</option>";
                }
              }
            ?>
            </select>
            <br/><br>
            Välj vecka
            <select id="week" name="week">
              <option>Auto</option>
              <option value="33">33</option>
              <option value="34">34</option>
              <option value="35">35</option>
              <option value="36">36</option>
            </select>
            <br/><br/>

            Event
            <select id="event" name="event">
              <?php
              $query = "SELECT name FROM event";
              $result = execQuery($link, $query);

              while ($eventlist = $result->fetch_object()) {
                $name = $eventlist->name;
                echo'<option value="'.$name.'">'.$name.'</option>';
              }
            ?>
            </select>
            <br/><br/><br>
            <input type="file" id="fileselect" name="pictures" multiple="multiple" class="file_input"/>
            <label for="fileselect">Välj fil...</label>
            <br/>
            <div id="filedrag" class="drag">
              <div id="filedraginfo"></div>
            </div>
            <br/>
            
          </div>
          <div id="statusbar">
            <div id="filesizes"></div>
            <div id="progressbar"><div></div></div>
          </div>
          <div id="info"></div>
          <ul id="previewcontainer"></ul>
          <button id="submit_pictures" class="button-primary">Ladda upp bilder</button>
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

