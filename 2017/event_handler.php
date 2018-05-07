<?php
include_once("functions_common.php");
$link = connectToDB();

if(session_id() == ''){ session_start(); }

if ($_SESSION["admin"])
{
    if (!empty($_POST["action"] && !empty($_POST["name"])))
    {
        $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);

        if ($_POST["action"] == "delete")
        {
            $query = "SELECT * FROM images WHERE event='" . $name . "'";
            $imgresult = execQuery($link, $query);

            $query = "SELECT * FROM videos WHERE event='" . $name . "'";
            $vidresult = execQuery($link, $query);


            if ($imgresult->num_rows == 0 && $vidresult->num_rows == 0)
            {
                if ($stmt = $link->prepare("DELETE FROM event WHERE name = '" . $name . "'")) {
                    $stmt->execute();
                } else {
                    echo "Det gick inte att ta bort event " . $name . ". ";
                    echo $link->error;
                }
            }
            else
            {
                echo "Det finns kvar bilder eller videos i \"" . $name . "\". Ta bort alla bilder/videos först!";
            }
        }
        else if ($_POST["action"] == "rename")
        {
            if (isset($_POST["newname"]))
            {
                $newname = $_POST["newname"];

                $query = "UPDATE images SET event='" . $newname . "' WHERE event='" . $name . "'";
                $result = execQuery($link, $query);

                if ($link->error)
                {
                    echo $link-error;
                    exit(1);
                }

                $query = "UPDATE videos SET event='" . $newname . "' WHERE event='" . $name . "'";
                $result = execQuery($link, $query);

                if ($link->error)
                {
                    echo $link-error;
                    exit(1);
                }

                $query = "UPDATE event SET name='" . $newname . "' WHERE name='" . $name . "'";
                $result = execQuery($link, $query);

                if ($link->error)
                {
                    echo $link-error;
                    exit(1);
                }
            }
        }
        else if ($_POST["action"] == "new")
        {
            $query = "INSERT INTO event (name) VALUES ('" . $name . "')";
            $result = execQuery($link, $query);

            if ($link->error)
            {
                echo $link-error;
                exit(1);
            }
        }
    }
}
