<?php
include_once("functions_imageresize.php");
include_once("functions_common.php");

$link = connectToDB();

if (isset($_POST['videoid'], $_POST['event'], $_POST['videoname'])) {
  $videoid = filter_input(INPUT_POST, 'videoid', FILTER_SANITIZE_STRING);
  $event = filter_input(INPUT_POST, 'event', FILTER_SANITIZE_STRING);
  $videoname = filter_input(INPUT_POST, 'videoname', FILTER_SANITIZE_STRING);
  $date = date("Y-m-d H:i:s");

  if ($stmt = $link->prepare("INSERT INTO videos (videoid, videoname, event, uploaddate) VALUES (?, ?, ?, ?)")) {
    $stmt->bind_param('ssss', $videoid, $videoname, $event, $date);
    $stmt->execute();
  } else {
    echo "Det gick inte att ladda upp videon.<br/>";
    if ($stmt->error){
      echo $stmt->error;
    }
  }

} else {
  echo "Invalid request";
}

?>
