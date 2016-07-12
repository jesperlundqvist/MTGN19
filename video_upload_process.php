<?php
include_once("functions_imageresize.php");
include_once("functions_common.php");

$link = connectToDB();

if (isset($_POST['videoid'], $_POST['category'], $_POST['videoname'])) {
  $videoid = filter_input(INPUT_POST, 'videoid', FILTER_SANITIZE_STRING);
  $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
  $videoname = filter_input(INPUT_POST, 'videoname', FILTER_SANITIZE_STRING);
  $date = date("Y-m-d H:i:s");

  if ($stmt = $link->prepare("INSERT INTO videos (videoid, videoname, category, uploaddate) VALUES (?, ?, ?, ?)")) {
    $stmt->bind_param('ssss', $videoid, $videoname, $category, $date);
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
