   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Mottagningen 2017</title>
    <link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet">
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');
    ?>

    <div class="content-wrapper form-page">
      <!-- Content -->
      <?php
        $link = connectToDB();

        if (session_status() == PHP_SESSION_NONE) {
            sec_session_start();
        }

        $username = $_SESSION['username'];
        $admin = $_SESSION['admin'];

        if (isset($_GET['id'])) {
          $id = $_GET['id'];
        } else {
          echo "Inget nyhetsidé.";
          exit();
        }

        // Get data about the news article
        if ($stmt = $link->prepare("SELECT author, title, body, category FROM news WHERE id = ?")) {
          $stmt->bind_param('s', $id);
          $stmt->execute();
          $stmt->store_result();
          $stmt->bind_result($author, $title, $body, $category);
          $stmt->fetch();
        } else {
          echo "Kunde inte verifiera att du är skaparen av detta inlägg.";
          exit();
        }

        if ($author !== $username && !$admin) {
          echo "Du har inte skapat detta inlägg och kan därför inte redigera det.";
          exit();
        }

        echo "<h2 class='adminpanel_title'>Redigera inlägg</h2>";

        // --- DELETE ---
        echo "<form action=\"newspage_handler.php?action=delete\" method=\"post\">";
        echo "<input type=\"text\" id=\"id\" name=\"id\" value=\"$id\" style=\"display: none\"/>";
        echo "<input style=\"background:red;\" class=\"button-primary\" type=\"submit\" value=\"Radera nyheten\" id=\"delete_news\">";
        echo "</form>";

        echo'<br>';

        // --- DELETE ---

        // Update
        echo "<form id=\"news_update_form\" action=\"newspage_handler.php?action=update\" method=\"post\">";
        echo "<input type=\"text\" id=\"id\" name=\"id\" value=\"$id\" style=\"display: none\"/>";
        echo "<input id='news_title' type=\"text\" id=\"title\" name=\"title\" value=\"$title\" class=\"input_areas\"/><br/>";
        //echo "<textarea id=\"body\" name=\"body\" cols=\"\" rows=\"10\" class=\"input_areas\">$body</textarea></br>";
        echo "<input type='hidden' name='body'></input>";
        echo "<div id='quilleditor'></div>";

        $query = "SELECT category FROM categories ORDER BY category ASC";
        $result = execQuery($link, $query);


        echo "<select id=\"category\" name=\"category\">";
        while ($cat = $result->fetch_object()) {
          $c = $cat->category;
          if ($c == $category) {
            echo "<option value=\"$c\" selected=\"selected\">$c</option>";
          } else {
            echo "<option value=\"$c\">$c</option>";
          }
        }
        echo "</select>";

        echo'<br><br>';
        echo "<input type=\"submit\" class=\"button-primary\" value=\"Spara\" id=\"save_news\">";
        echo "</form>";

      ?>
        <div id="info"></div>
    </div>

    <?php
      //Load footer
      include_once ('inc_footer.php');
    ?>

    <script src="https://cdn.quilljs.com/1.2.6/quill.js"></script>
    <script>
        var quill = new Quill('#quilleditor', {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    ['link', 'image', 'video'],
                    ['noll']
                ]
            },
            theme: 'snow'
        });

        var noll_button = document.querySelector('.ql-noll');
        noll_button.innerHTML = "<span style='color:#444; font-weight: bold;'>Ø</span>"
        noll_button.addEventListener('click', function() {
            var selection = quill.getSelection();
            if (selection) {
                quill.insertText(selection, "Ø");
            }
        });

        var form = document.querySelector('#news_update_form');
        form.onsubmit = function() {
            var news_input = document.querySelector('input[name=body]');
            news_input.value = quill.container.firstChild.innerHTML;

            return true;
        };

        var toolbar = quill.getModule('toolbar');
        toolbar.addHandler('link', function() {
            var selection = quill.getSelection();
            if (selection) {
                var href = prompt('Länk:')
                if (selection.length > 0) {
                    quill.format('link', href);
                }
                else {
                    quill.insertText(selection.index, href, {"link": href});
                }
            }
        });

        toolbar.addHandler('image', function() {
            var selection = quill.getSelection();
            if (selection) {
                var href = prompt('Länk till bilden:')
                if (href)
                {
                    quill.insertEmbed(selection.index, 'image', href);
                }
            }
        });

        quill.clipboard.dangerouslyPasteHTML("<?php echo $body; ?>");
    </script>
    <style>
        .ql-editor {
            /*background-color: white;*/
            min-height: 300px;
            height: 100%;
        }

        .ql-toolbar {
            background-color: white;
        }
    </style>
  </body>
</html>
