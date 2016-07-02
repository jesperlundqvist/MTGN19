<?php
include_once 'functions_common.php';

$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}

if (isset($_POST['username'], $_POST['password1'], $_POST['password2'], $_POST['name'], $_POST['email'], $_POST['description'], $_POST['n0llegroup'])) {
  $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
  $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
  $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
  $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_STRING);
  $n0llegroup = filter_input(INPUT_POST, 'n0llegroup', FILTER_SANITIZE_STRING);


// if (isset($_POST['username'], $_POST['password1'], $_POST['password2'], $_POST['name'], $_POST['email'], $_POST['description'], $_POST['gandalf'], $_POST['kaniner'], $_POST['patronus'], $_POST['n0llegroup'])) {
//   $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
//   $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
//   $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);
//   $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
//   $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
//   $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_STRING);
//   $gandalf = filter_input(INPUT_POST, 'gandalf', FILTER_SANITIZE_STRING);
//   $kaniner = filter_input(INPUT_POST, 'kaniner', FILTER_SANITIZE_STRING);
//   $patronus = filter_input(INPUT_POST, 'patronus', FILTER_SANITIZE_STRING);
//   $n0llegroup = filter_input(INPUT_POST, 'n0llegroup', FILTER_SANITIZE_STRING);

  // Hämta gamla informationen
  // if ($stmt = $link->prepare("SELECT name, imagename, gifname, email, description, gandalf, kaniner, patronus, n0llegroup FROM users WHERE username = ? LIMIT 1")) {
  if ($stmt = $link->prepare("SELECT name, imagename, gifname, email, description, n0llegroup FROM users WHERE username = ? LIMIT 1")) {

    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($oldname, $oldimagename, $oldgifname, $oldemail, $olddescription, $oldn0llegroup);
    // $stmt->bind_result($oldname, $oldimagename, $oldgifname, $oldemail, $olddescription, $oldgandalf, $oldkaniner, $oldpatronus, $oldn0llegroup);
    $stmt->fetch();
  } else {
    echo "Något gick fel med kopplingen till databasen.";
    exit();
  }

  //Kolla om lösenordet ska uppdateras
  if ($password1 != "" && $password2 != "") {
    $updatePassword = true;
  } else {
    $updatePassword = false;
  }

  if ($updatePassword) {
    if ($password1 != $password2) {
      echo 'Lösenorden matchar inte.';
      exit();
    }

    if (strlen($password1) != 128) {
      echo 'Lösenordet hashades inte ordentligt.';
      exit();
    }
  }

  if ($name == "") {
    $name = $oldname;
  }


  if ($n0llegroup == "") {
    $n0llegroup = $oldn0llegroup;
  }

  $upload_dir = "images/uploads/profile_pictures/";
  $id = uniqid();

  if (isset($_FILES['profile']['tmp_name'])) {
    $updateimage = true;
    if ($_FILES['profile']['error'] > 0) {
      echo "error";
      exit();
    }

    $ext = pathinfo($_FILES['profile']['name'], PATHINFO_EXTENSION);
    $imagename = $id . "." . $ext;

    move_uploaded_file($_FILES['profile']['tmp_name'], $upload_dir . $imagename);
  } else {
    $updateimage = false;
    $imagename = $oldimagename;
  }

  $upload_dir = "images/uploads/profile_gifs/";

  if (isset($_FILES['gif']['tmp_name'])) {
    $updategif = true;
    if ($_FILES['gif']['error'] > 0) {
      echo "error";
      exit();
    }

    $ext = pathinfo($_FILES['gif']['name'], PATHINFO_EXTENSION);
    $gifname = $id . "." . $ext;

    move_uploaded_file($_FILES['gif']['tmp_name'], $upload_dir . $gifname);
  } else {
    $updategif = false;
    $gifname = $oldgifname;
  }

  if ($updatePassword) {
    $random_salt = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
    $salted_password = hash('sha512', $password1 . $random_salt);
    $stmt = $link->prepare("UPDATE users SET name = ?, email = ?, imagename = ?, gifname = ?, description = ?, password = ?, salt = ?, n0llegroup = ? WHERE username = ?");
    $stmt->bind_param('sssssssss', $name, $email, $imagename, $gifname, $description, $salted_password, $random_salt, $n0llegroup, $username);
    //  $stmt = $link->prepare("UPDATE users SET name = ?, email = ?, imagename = ?, gifname = ?, description = ?, gandalf = ?, kaniner = ?, patronus = ?, password = ?, salt = ?, n0llegroup = ? WHERE username = ?");
    // $stmt->bind_param('ssssssssssss', $name, $email, $imagename, $gifname, $description, $gandalf, $kaniner, $patronus, $salted_password, $random_salt, $n0llegroup, $username);
  } else {

    $stmt = $link->prepare("UPDATE users SET name = ?, email = ?, imagename = ?, gifname = ?, description = ?, n0llegroup = ? WHERE username = ?");
    $stmt->bind_param('sssssss', $name, $email, $imagename, $gifname, $description, $n0llegroup, $username);



    //  $stmt = $link->prepare("UPDATE users SET name = ?, email = ?, imagename = ?, gifname = ?, description = ?, gandalf = ?, kaniner = ?, patronus = ?, n0llegroup = ? WHERE username = ?");
    // $stmt->bind_param('ssssssssss', $name, $email, $imagename, $gifname, $description, $gandalf, $kaniner, $patronus, $n0llegroup, $username);
  }

  $stmt->execute();
  if ($stmt->error) {
    echo "Error: $stmt->error";
  } else {
    echo "ok";
  }
}
?>
