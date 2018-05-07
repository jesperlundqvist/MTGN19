<?php
include_once("functions_common.php");
$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}

if (isset($_POST['lat'], $_POST['lng'])) {

      $lat = $_POST['lat'];
      $lng = $_POST['lng'];

        if ($stmt = $link->prepare("UPDATE basecamp SET lat = ?, lng = ?, isActive = 1")) {
        $stmt->bind_param('ss', $lat, $lng);
        $stmt->execute();
        header('Location: /basecamp.php');
        } else {
          echo "Det gick inte att uppdatera basecamp.<br/>";
          if ($stmt->error){
            echo $stmt->error;
          }
           }
}

if (isset($_POST['isActive'])) {
  $isActive = $_POST['isActive'];
  if ($stmt = $link->prepare("UPDATE basecamp SET isActive = ?")) {
        $stmt->bind_param('s', $isActive);
        $stmt->execute();
        header('Location: /basecamp.php');
        } else {
          echo "Det gick inte att uppdatera basecamp.<br/>";
          if ($stmt->error){
            echo $stmt->error;
          }
        }
}
?>
