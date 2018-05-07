<?php
include_once 'functions_common.php';

$link = connectToDB();


switch($_GET["action"]){
  case 'image':
    if (isset($_POST['id'])) {
      $id = $_POST['id'];

      if (!unlink('images/uploads/gallery/original/' . $id)) {
        echo "Det gick inte att radera originalversionen av bilden.";
      }

      if (!unlink('images/uploads/gallery/large/' . $id)) {
        echo "Det gick inte att radera den stora versionen av bilden.";
      }

      if (!unlink('images/uploads/gallery/thumbs/' . $id)) {
        echo "Det gick inte att radera den lilla versionen av bilden.";
      }

      if ($stmt = $link->prepare("DELETE FROM images WHERE imagename = ? LIMIT 1")) {
        $stmt->bind_param('s', $id);
        $stmt->execute();
      } else {
        echo "Det gick inte att radera bilden.<br/>";
        if ($stmt->error){
          echo $stmt->error;
        }
      }

    } else {
      echo "Invalid request";
    }
    break;
  case 'video':
    if (isset($_POST['id'])) {
      $id = $_POST['id'];

      if ($stmt = $link->prepare("DELETE FROM videos WHERE videoid = ? LIMIT 1")) {
        $stmt->bind_param('s', $id);
        $stmt->execute();
      } else {
        echo "Det gick inte att radera videon.<br/>";
        if ($stmt->error){
          echo $stmt->error;
        }
      }

    } else {
      echo "Invalid request";
    }
    break;
}

?>
