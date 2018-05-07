<?php
include_once 'functions_common.php';

$link = connectToDB();

echo'
<script>
  alert("hej");
</script>';

if (isset($_POST['score']) && sset($_POST['username'])) {
  $score = $_POST['score'];
  $username = $_POST['username'];

  $stmt = $link->prepare("INSERT INTO highscores (username, score) VALUES (?, ?)");
  $stmt->bind_param('ss', $username,$score);
  $stmt->execute();
}
