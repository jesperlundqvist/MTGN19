<?php

include_once 'functions_common.php';

$link = connectToDB();

if (session_status() == PHP_SESSION_NONE) {
    sec_session_start();
}

if ($_SESSION['admin'])
{
    if (isset($_POST["oldUsername"]) &&
        isset($_POST["username"]) &&
        isset($_POST["name"]) &&
        isset($_POST["group"]) &&
        isset($_POST["n0llegroup"]) &&
        isset($_POST["admin"]) &&
        isset($_POST["remove"]))
    {
        $oldUsername = $_POST["oldUsername"];
        $username = $_POST["username"];
        $name = $_POST["name"];
        $group = $_POST["group"];
        $n0llegroup = $_POST["n0llegroup"];
        $admin = $_POST["admin"] == "true" ? 1 : 0;
        $remove = $_POST["remove"] == "true" ? 1 : 0;

        if ($remove)
        {
            if ($stmt = $link->prepare("DELETE FROM users WHERE username = '" . $oldUsername . "'")) {
                $stmt->execute();
                if ($link->errno == 1451)
                {
                    echo "Kan inte ta bort användare " . $oldUsername . " som har skrivit inlägg. Ta bort inläggen först.";
                }
                else if ($link->errno != 0)
                {
                    echo "Det blev något fel när användare " . $oldUsername . " skulle tas bort.";
                }
                else
                {
                    echo "Tog bort användare " . $oldUsername . ".";
                }
            } else {
                echo "Det gick inte att ta bort användare " . $oldUsername . ". ";
                if ($stmt->error){
                    echo $stmt->error;
                }
            }
        }
        else
        {
            if ($n0llegroup == "Ingen")
            {
                $n0llegroup = NULL;
            }

            if (isset($_FILES['profilePicture']['tmp_name'])) {
              $upload_dir = "images/uploads/profile_pictures/";
              if ($_FILES['profilePicture']['error'] > 0) {
                echo "Det gick inte att ladda upp bilden.<br/>Error: " . $_FILES['file']['error'];
                exit();
              }

              $id = uniqid();
              $ext = pathinfo($_FILES['profilePicture']['name'], PATHINFO_EXTENSION);
              $imagename = $id . "." . $ext;

              $image_update_query = ", imagename = '" . $imagename . "'";

              move_uploaded_file($_FILES['profilePicture']['tmp_name'], $upload_dir . $imagename);
              echo "Laddar upp ny profilbild för " . $oldUsername . ".<br>";
            }

            if ($stmt = $link->prepare("UPDATE users SET username = ?, name = ?, usergroup = ?, n0llegroup = ?, admin = ? " . (isset($imagename) ? $image_update_query : "") . " WHERE username = ?")) {
                $stmt->bind_param('ssssss', $username, $name, $group, $n0llegroup, $admin, $oldUsername);
                $stmt->execute();
                if ($link->affected_rows > 0)
                {
                    echo "Sparade ändringar för " . $oldUsername . ".";
                }
            } else {
                echo "Det gick inte att uppdatera användare. ";
                if ($stmt->error){
                    echo $stmt->error;
                }
            }
        }
    }
    else
    {
        echo "Något gick fel, men oroa dig inte, det var nog inte ditt fel!";
    }
}
else {
    echo "Hallå, bara administratörer får göra sånt här! Pröva logga in igen!";
}

?>
