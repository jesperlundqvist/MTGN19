<?php
include_once("functions_common.php");

$link = connectToDB();

if (isset($_POST['search'])) {
  $search = filter_input(INPUT_POST, 'search', FILTER_SANITIZE_STRING);

  // --------- nØllan -----------

  $query = "SELECT username, name, imagename, usergroup, n0llegroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'nØllan') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  $output = "";

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>nØllan</h2></div>";
  }

  $currgroup = null;
  while ($r = $result->fetch_object()) {
    if ($n0llegroup !== $r->n0llegroup) {
      $n0llegroup = $r->n0llegroup;
      $output = $output . "<div class='n0llegroup_title'><h3>$n0llegroup</h3></div>";
    }
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

    // --------- ÖPH -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'ÖPH') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>ÖPH</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  // --------- KPH -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'KPH') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>KPH</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  // --------- INPHO -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'INPHO') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>INPHO</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  // --------- ARR -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'ARR') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>ARR</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  // --------- LEK -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'LEK') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>LEK</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  // --------- VRAQUE -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'VRAQUE') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
    $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner'>VRAQUE</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  // --------- RSA -----------

  $search = $_POST['search'];
  $query = "SELECT username, name, imagename, usergroup FROM users WHERE ((name LIKE '%$search%' OR usergroup LIKE '%$search%' OR n0llegroup LIKE '%$search%') AND hidden <> 1 AND usergroup = 'RSA') ORDER BY n0llegroup, name";
  $result = execQuery($link, $query);

  if ($result->num_rows != 0) {
      $output = $output . "<div style='background: linear-gradient(rgba(0,0,0,0), black); padding-top: 500px; margin-left: -50px; margin-right: -50px; margin-bottom: -50px;'>";
      $output = $output . "<div class='usergroup_title'><h2 class='usergroup_banner rsa-ser-allt'>RSA</h2></div>";
  }

  while ($r = $result->fetch_object()) {
    $output = $output . "<a class='profile_link' href='/profile.php?user=$r->username'><div class='profile_preview'><div class='profile_preview_img' style='background-image:url(\"images/uploads/profile_pictures/$r->imagename\")'></div><p>$r->name</p></div></a>";
  }

  if ($result->num_rows != 0) {
      $output = $output . "</div>";
  }

  echo $output;
}

?>
