<?php
include_once("database.php");
include_once("functions.php");

$link = connectToDB();

$ALLOWED_TAGS = '<img>|<a>|<iframe>|<ol>|<ul>|<li>|<b>';

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}

// Handles adding, updating and deleting news
switch($_GET["action"]){
  case 'add':
    if (isset($_POST['news_input'], $_POST['news_title'], $_POST['news_category'])) {

      $title = $_POST['news_title'];
      $title = strip_tags($title);
      $text = $_POST['news_input'];
      $text = strip_tags($text, $ALLOWED_TAGS);
      $category = $_POST['news_category'];

      if(login_check($link) && $_SESSION['admin']) {
        $username = $_SESSION['username'];
        $date = date("Y-m-d H:i:s");

        $stmt = $link->prepare("INSERT INTO news (title, body, newsdate, author, category) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('sssss', $title, $text, $date, $username, $category);
        $stmt->execute();

        $host = $_SERVER['HTTP_HOST'];
        $uri  = rtrim(dirname($_SERVER['PHP_SELF']), '/\\');
        header("Location: http://$host$uri/index.php");
      } else {
        echo 'Inte inloggad';
      }
    } else {
      echo 'Invalid Request';
    }
    break;
  case 'update':
    if (isset($_POST['title'], $_POST['body'], $_POST['category'], $_POST['id'])) {
      $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
      $title = strip_tags($title);
      $body = $_POST['body'];
      $body = strip_tags($body, $ALLOWED_TAGS);
      $category = $_POST['category'];
      $id = $_POST['id'];



      if ($stmt = $link->prepare("UPDATE news SET title = ?, body = ?, category = ? WHERE id = ?")) {
        $stmt->bind_param('ssss', $title, $body, $category, $id);
        $stmt->execute();
        header('Location: /');
      } else {
        echo "Det gick inte att uppdatera nyheten.<br/>";
        if ($stmt->error){
          echo $stmt->error;
        }
      }

    } else {
      echo "Invalid request";
    }
    break;
  case 'delete':
    if (isset($_POST['id'])) {
      $id = $_POST['id'];

      if ($stmt = $link->prepare("DELETE FROM news WHERE id = ? LIMIT 1")) {
        $stmt->bind_param('s', $id);
        $stmt->execute();
        header('Location: /');
      } else {
        echo "Det gick inte att radera nyheten.<br/>";
        if ($stmt->error){
          echo $stmt->error;
        }
      }

    } else {
      echo "Invalid request";
    }
    break;

  default:
    echo 'Invalid Request!';
}
