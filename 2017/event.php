  <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Hantera event</title>
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper">

      <!-- Content -->
      <?php
      if ($_SESSION['admin']) { ?>
          <div class="form-page">
        <h1>Hantera event</h1>
        <?php

        $query = "SELECT * FROM event";
        $result = execQuery($link, $query);

        echo "<table>";
        echo "";
        while ($event = $result->fetch_object()) {
            echo "<tr>";
            echo "<td>" . $event->name . "</td>";
            echo "<td><input type='text' class='event-name-input' data-original='" . $event->name . "' value='" . $event->name . "'/></td>";
            echo "<td><a class='delete-event-button' style='cursor:pointer;' data-name='" . $event->name . "'>Ta bort</a></td>";
            echo "</tr>";
        }
        echo "</table>";

        ?>
        <input type="submit" value="Uppdatera events" class="button-primary" id="update-events-button">

        <br><br>

        <h1>Skapa nytt</h1>
          <input id="edit_title" name="name" placeholder="Namn" class="input_areas">
          <input type="submit" value="Lägg till" class="button-primary" id="new_event_button">
        <div id="status"></div>
        </div>
      <?php
      }
      else {
        echo 'Du måste logga in som admin.';
      }
      ?>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>
    <script>
        $(".delete-event-button").click(function(e) {
            var name = $(e.target).data("name");

            if (confirm("Är du säker på att du vill ta bort " + name + "?"))
            {
                $.ajax({
                    url: "/event_handler.php",
                    data: {
                        action: "delete",
                        name: name
                    },
                    type: "POST",
                    success: function(result) {
                        if (result == "")
                        {
                            location.reload();
                        }
                        else
                        {
                            $("#status").text(result);
                        }
                    }
                });
            }
        });

        $("#update-events-button").click(function(e){
            $(".event-name-input").each(function(i, elem) {
                if ($(elem).data("original") != $(elem).val())
                {
                    $.ajax({
                        url: "/event_handler.php",
                        data: {
                            action: "rename",
                            name: $(elem).data("original"),
                            newname: $(elem).val()
                        },
                        type: "POST",
                        success: function(result) {
                            if (result == "")
                            {
                                location.reload();
                            }
                            else
                            {
                                $("#status").text(result);
                            }
                        }
                    });
                }
            });
        });

        $("#new_event_button").click(function(e) {
            var name = $("#edit_title").val();
            $.ajax({
                url: "/event_handler.php",
                data: {
                    action: "new",
                    name: name
                },
                type: "POST",
                success: function(result) {
                    if (result == "")
                    {
                        location.reload();
                    }
                    else
                    {
                        $("#status").text(result);
                    }
                }
            });
        });

        adminDropdownToggle();
    </script>
  </body>
</html>
