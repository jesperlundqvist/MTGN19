<?php
 //Load header
 include_once ('inc_header.php');
?>
<script src="js/manage_users.js"></script>
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
   <div class="content-wrapper" style="padding-left: 10px; padding-right: 10px;">
       <div>
         <h2 class="adminpanel_title">Hantera användare</h2>
         <table class="manage_users_table">
            <tr>
                <th>Användarnamn</th>
                <th>Namn</th>
                <th>Grupp</th>
                <th>nØllegrupp</th>
                <th>Admin</th>
                <th>Profilbild</th>
                <th>Dold</th>
                <th>Ta bort</th>
            </tr>
         <?php
             $query = "SELECT username, name, imagename, usergroup, n0llegroup, admin, hidden FROM users ORDER BY usergroup, name";
             $result = execQuery($link, $query);

             $usergroups = execQuery($link, "SELECT usergroup FROM usergroups")->fetch_all();
             $n0llegroups = execQuery($link, "SELECT n0llegroup FROM n0llegroups")->fetch_all();

             while ($r = $result->fetch_object()) {
                 echo "<tr data-username='" . $r->username . "'>";
                 echo "<td><input type='text' value='" . $r->username . "'/></td>";
                 echo "<td><input type='text' value='" . $r->name . "'/></td>";
                 echo "<td><select>";

                 foreach ($usergroups as $group) {
                     if ($group[0] == $r->usergroup) {
                         echo "<option selected>" . $group[0] . "</option>";

                     }
                     else {
                         echo "<option>" . $group[0] . "</option>";
                     }
                 }

                 echo "</select></td>";
                 echo "<td><select>";

                 foreach ($n0llegroups as $group) {
                     if ($group[0] == $r->n0llegroup) {
                         echo "<option selected>" . $group[0] . "</option>";

                     }
                     else {
                         echo "<option>" . $group[0] . "</option>";
                     }
                 }

                 echo "<option" . ($r->n0llegroup == "" ? " selected" : "") . ">Ingen</option>";

                 echo "</select></td>";
                 echo "<td><center><input type='checkbox' " . ($r->admin == 1 ? "checked" : "") . " /></center></td>";
                 echo "<td><input type='file' name='userFile' id='filechooser-" . $r->username . "' class='file_input' accept='image/*'><label for='filechooser-" . $r->username . "'>Välj ny...</label></td>";
                 echo "<td><center><input type='checkbox' " . ($r->hidden == 1 ? "checked" : "") . " /></center></td>";
                 echo "<td><center><input type='checkbox' /></center></td>";
                 echo "</tr>";
             }
         ?>
        </table>
        <br>
        <div class="button button-primary" id="manage_button_save">Spara ändringar</div>
        <p id="manage_status"></p>
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
