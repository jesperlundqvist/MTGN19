<?php
include_once 'functions_common.php';

$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}

if (isset($_POST['username'], $_POST['password1'], $_POST['password2'], $_POST['name'], $_POST['email'], $_POST['description'], $_POST['q1'], $_POST['q2'], $_POST['q3'], $_POST['n0llegroup'])) {
  $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
  $password1 = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
  $password2 = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);
  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
  $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_STRING);
  $description = filter_input(INPUT_POST, 'description', FILTER_SANITIZE_STRING);
  $q1 = filter_input(INPUT_POST, 'q1', FILTER_SANITIZE_STRING);
  $q2 = filter_input(INPUT_POST, 'q2', FILTER_SANITIZE_STRING);
  $q3 = filter_input(INPUT_POST, 'q3', FILTER_SANITIZE_STRING);
  $n0llegroup = filter_input(INPUT_POST, 'n0llegroup', FILTER_SANITIZE_STRING);

  // Hämta gamla informationen
  if ($stmt = $link->prepare("SELECT name, imagename, gifname, email, description, q1, q2, q3, n0llegroup FROM users WHERE username = ? LIMIT 1")) {

    $stmt->bind_param('s', $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($oldname, $oldimagename, $oldgifname, $oldemail, $olddescription, $oldq1, $oldq2, $oldq3, $oldn0llegroup);
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
      echo '<p style="color:red;font-size:20px;">Lösenorden matchar inte.</p>';
      exit();
    }

    if (strlen($password1) != 128) {
      echo '<p style="color:red;font-size:20px;">Lösenordet hashades inte ordentligt.</p>';
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
     $stmt = $link->prepare("UPDATE users SET name = ?, email = ?, imagename = ?, gifname = ?, description = ?, q1 = ?, q2 = ?, q3 = ?, password = ?, salt = ?, n0llegroup = ? WHERE username = ?");
    $stmt->bind_param('ssssssssssss', $name, $email, $imagename, $gifname, $description, $q1, $q2, $q3, $salted_password, $random_salt, $n0llegroup, $username);
  } else {

     $stmt = $link->prepare("UPDATE users SET name = ?, email = ?, imagename = ?, gifname = ?, description = ?, q1 = ?, q2 = ?, q3 = ?, n0llegroup = ? WHERE username = ?");
    $stmt->bind_param('ssssssssss', $name, $email, $imagename, $gifname, $description, $q1, $q2, $q3, $n0llegroup, $username);
  }

  $stmt->execute();
  if ($stmt->error) {
    echo "Error: $stmt->error";
  } else {
    echo "ok";
  }

  if ($updatePassword) {
    ?>
    <script type="text/javascript">
    alert('Du har bytt lösenord. Vänligen logga in med ditt nya lösenord.');
    window.location.href = "/"
    </script>
    <?php
  }
}
?>
