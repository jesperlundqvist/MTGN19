   <?php
    //Load header
    include_once ('inc_header.php');
  ?>
    <title>Adminpanel</title>
    <link href="https://cdn.quilljs.com/1.2.6/quill.snow.css" rel="stylesheet">
  </head>

  <body>

    <?php
      //Load top content
      include_once ('inc_top_content.php');

    if (session_status() == PHP_SESSION_NONE) {
        sec_session_start();
    }

    $admin = $_SESSION['admin'];
    if ($admin) { ?>
      <div class="content-wrapper">


            <div id="news_input_container" class="news-top form-page">
              <form id="news_input_form" action="newspage_handler.php?action=add" method="post">
                <h2 id="new_post_trigger" class="adminpanel_title">Nytt inlägg <span class="ion-ios-plus-outline" id="new_post_icon"></span></h2>
                <div id="new_post_container">
                  <input id="news_title" name="news_title" placeholder="Rubrik" class="input_areas"/><br/>
                  <!--textarea id="news_input" name="news_input" placeholder="Innehåll" cols="" rows="5" class="input_areas"></textarea><br/-->
                  <input type="hidden" name="news_input"></input>
                  <div id="quilleditor"></div>
                  <p class="news_category_title">Kategori</p>
                  <select id="news_category" name="news_category">
                  <?php
                    $query = "SELECT category FROM categories ORDER BY category ASC";
                    $result = execQuery($link, $query);

                    while ($category = $result->fetch_object()) {
                      $c = $category->category;
                      echo "<option value=\"$c\">$c</option>";
                    }
                  ?>
                  </select>
                  <br/>
                  <br>
                  <input type="submit" value="Skapa inlägg" id="post_news" class="button-primary"/>
                </div>
              </form>
            </div>
      </div>
      <?php
    }
    else {
        // Not logged in as admin
    ?>
    <p>Du måste logga in som admin</p>
    <?php
    }

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

        var form = document.querySelector('#news_input_form');
        form.onsubmit = function() {
            var news_input = document.querySelector('input[name=news_input]');
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

        adminDropdownToggle();
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
