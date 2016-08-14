<?php
include_once("functions_common.php");
$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}

if (isset($_POST['lat'], $_POST['lng'])) {

      $lat = $_POST['lat'];
      $lng = $_POST['lng'];

      echo $lat;
      echo'<br>';
      echo $lng;

        if ($stmt = $link->prepare("UPDATE basecamp SET lat = ?, lng = ?")) {
        $stmt->bind_param('ss', $lat, $lng);
        $stmt->execute();
        header('Location: /basecamp_edit.php');
        } else {
          echo "Det gick inte att uppdatera basecamp.<br/>";
          if ($stmt->error){
            echo $stmt->error;
          }
           }
}
?>
