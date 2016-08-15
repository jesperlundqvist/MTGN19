<?php
include_once 'functions_common.php';

$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}


if (isset($_POST['username'], $_POST['password1'], $_POST['password2'], $_POST['name'], $_POST['email'], $_POST['usergroup'], $_POST['n0llegroup'])) {
  $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
  $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
  $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
  // $imagename = filter_input(INPUT_POST, 'imagename', FILTER_SANITIZE_STRING);
  $usergroup = $_POST['usergroup'];
  $n0llegroup = $_POST['n0llegroup'];

  if ($password1 != $password2) {
    echo 'Lösenorden matchar inte.';
    exit();
  }

  if (strlen($password1) != 128) {
    echo 'Lösenordet hashades inte ordentligt.';
    exit();
  }

  if ($name == "") {
    $name = null;
  }

  if ($email == "") {
    $email = null;
  }

  if ($n0llegroup == "") {
    $n0llegroup = null;
  }

  if ($username == "") {
    echo 'Du måste skriva in användarnamn.';
    exit();
  }

  if ($usergroup == "") {
    echo 'Du måste fylla i grupp.';
    exit();
  }

  $stmt = $link->prepare("SELECT username FROM users WHERE username = ? LIMIT 1");

  //kolla om användaren redan finns
  if ($stmt) {
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
      echo 'Användaren finns redan i databasen.';
      exit();
    }
    $stmt->close();
  }

  $id = uniqid();

  if (isset($_FILES['files']['tmp_name'][0])) {
    $upload_dir = "images/uploads/profile_pictures/";
    if ($_FILES['files']['error'][0] > 0) {
      echo "Det gick inte att ladda upp bilden.<br/>Error: " . $_FILES['file']['error'];
      // echo "error";
      exit();
    }

    $ext = pathinfo($_FILES['files']['name'][0], PATHINFO_EXTENSION);
    $imagename = $id . "." . $ext;

    move_uploaded_file($_FILES['files']['tmp_name'][0], $upload_dir . $imagename);
  } else {

    if($usergroup =='VRAQUE'){
      $imagename = 'default_phos.png';
    }
    else {
      $imagename = 'default.png';
    }
  }

  if (isset($_FILES['files']['tmp_name'][1])) {
    $upload_dir = "images/uploads/profile_gifs/";
    if ($_FILES['files']['error'][1] > 0) {
      echo "Det gick inte att ladda upp bilden.<br/>Error: " . $_FILES['file']['error'];
      // echo "error";
      exit();
    }

    $ext = pathinfo($_FILES['files']['name'][1], PATHINFO_EXTENSION);
    $gifname = $id . "." . $ext;

    move_uploaded_file($_FILES['files']['tmp_name'][1], $upload_dir . $gifname);
  } else {
    $gifname = null;
  }

  $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
  $salted_password = hash('sha512', $password1 . $random_salt);

  if ($stmt = $link->prepare("INSERT INTO users (username, password, salt, name, email, imagename, gifname, usergroup, n0llegroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)")) {
    $stmt->bind_param('sssssssss', $username, $salted_password, $random_salt, $name, $email, $imagename, $gifname, $usergroup, $n0llegroup);
    $stmt->execute();
    if ($stmt->error) {
      echo "Error: $stmt->error";
    } else {
      echo "ok";
    }
  }
}
?>
