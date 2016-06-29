<?php
include_once('functions_common.php');

$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}
// session_start();

if (isset($_POST['username'], $_POST['password'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Denna ger alltså ingenting, ger tomt
  if (login($username, $password, $link) == true) {
    // Det gick att logga in
    echo 'true';
  } else {
    // Det gick inte att logga in
    echo 'false';
  }
} else {
  echo 'Invalid Request';
}

?>
