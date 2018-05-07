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
             <div class="admin-controls">
               <a class="admin-control" href="adminpanel.php">Nytt inlägg</a>
               <a class="admin-control" href="register.php">Skapa ny användare</a>
               <a class="admin-control" href="gallery_upload_images.php">Ladda upp bilder</a>
               <a class="admin-control" href="video_upload.php">Ladda upp video</a>
               <a class="admin-control" href="blandaren_upload.php">Ladda upp Bländaren</a>
               <a class="admin-control" href="event.php">Lägg till event</a>
               <a class="admin-control" href="basecamp_edit.php">Ändra basecamp</a>
             </div>
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
</body>
</html>
