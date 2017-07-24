<?php
$admin = $_SESSION['admin'];
?>

<?php

$link = connectToDB();

  if (session_status() == PHP_SESSION_NONE) {
      sec_session_start();
  }

  $username = $_SESSION['username'];
  $admin = $_SESSION['admin'];

  // Hämta användaruppgifter
  $stmt = $link->prepare("SELECT name, email, imagename, gifname, usergroup, description, n0llegroup FROM users WHERE username = '$username' LIMIT 1");
  $stmt->execute();
  $stmt->store_result();

  $stmt->bind_result($name, $email, $imagename, $gifname, $usergroup, $description, $n0llegroup);
  $stmt->fetch();

  // Hämta profilbild om det finns någon
  if ($usergroup !== 'nØllan') {
    if ($gifname != null) {
      $imagepath = "images/uploads/profile_gifs/" . $gifname;
    } else {
      // $imagepath = null;
      $imagepath = "images/uploads/profile_pictures/" . $imagename;
    }
  } else {
    if ($imagename != null) {
      $imagepath = "images/uploads/profile_pictures/" . $imagename;
    } else {
      $imagepath = null;
    }
  }

?>
<div off-canvas="mobilemenu left push">
  <nav class="mobile-nav" id="mobile-nav">
      <div class="mobile-menu-wrapper">
      <div class="mobile-menu-top">
        <a href="/profile.php?user=<?=$username?>">
        <?php
          // Profilbild
          if ($imagepath != null) {
            echo "<div id='mobile-menu-profile-pic' style='background-image: url(\"design/mobile_profile_border.png\"), url(\"$imagepath\");'>";
            echo "</div>";
            echo "<div id='profile-banner'></div>";
          }

          // namn
          if ($name != null) {
            echo "<div class='name-wrap'> ";
            echo "<p class='bottom-ribbon'><span class='ribbon-content'>$name</span></p>";
            if ($usergroup == 'nØllan' || ($usergroup == 'KPH' && $n0llegroup != null)) {
              echo "<p class='n0llegroup'>$n0llegroup</p>";
            }
            echo "</div>";
          }
        ?>

       </div>
       <div class="mobile-menu-bottom">
        <ul class="mobilenav">
          <li class="menu-start"><a href="/">Startsida</a></li>
          <li class="menu-profile"><a href="/profile.php?user=<?=$username?>">Min profil</a></li>
          <?php
          if ($admin) { ?>
            <li class="menu-adminpanel" onclick="adminDropdownToggle();">
                <a>Admin</a>
                <div class="admin-dropdown-mobile">
                    <a href="adminpanel.php">Nytt inlägg</a>
                    <a href="register.php">Skapa ny användare</a>
                    <a href="gallery_upload_images.php">Ladda upp bilder</a>
                    <a href="video_upload.php">Ladda upp video</a>
                    <a href="blandaren_upload.php">Ladda upp Bländaren</a>
                    <a href="event.php">Lägg till event</a>
                    <a href="basecamp_edit.php">Ändra basecamp</a>
                </div>
            </li> <?php
          }
           ?>
          <li class="menu-profiles"><a href="allprofiles.php">Profiler</a></li>
          <li class="menu-media"><a href="media.php">Media</a></li>
          <li class="menu-schedule"><a href="schedule.php">Schema</a></li>
          <li class="menu-blandaren"><a href="blandaren.php">Bländaren</a></li>
          <li class="menu-basecamp"><a href="basecamp.php">Basecamp</a></li>
          <li class="menu-logout logout-button"><a href="functions_logout.php">Logga ut </a></li>
        </ul>
      </div>
      </div> <!-- mobile-menu-wrapper -->
  </nav>
</div>

<div class="site-wrap" canvas="container">

<div class="header">
    <div class="constrainer">
        <div class="header-mountain"></div>
        <div class="header-logo"><a href="/"><img src="/design/logo.png" alt="Logga" /></a></div>
        <div class="header-sun"></div>
        <div class="header-sun_rays floating"></div>
        <div class="ikaros"></div>
    </div>
  <div class="header-hills"></div>
</div>

<nav class="menubar" id="mobile-menu">
    <div class="center-mobile nav-wrapper">
        <a class="mobile-logo-wrap" href="/"><img class="mobile-logo" src="/design/logo_mobile.png" alt="Logga" /></a>
        <ul id="js-nav-mobile" class="sitenav left hide-on-med-and-down">
            <li id="hamburger-button" class="menu-hamburger toggle-mobilemenu" style="display:none;"><a href="#" class="toggle-mobile-menu" style="font-size: 32px; margin-left: 8px;">☰</a></li>
            <li class="menu-left"></li>
            <li class="menu-padding"></li>
            <li class="menu-start"><a href="/">Startsida</a></li>
            <li class="menu-profile"><a href="/profile.php?user=<?=$username?>">Min profil</a></li>
            <?php
            if ($admin) { ?>
                <li class="menu-adminpanel">
                    <a href="adminpanel_header.php">Admin</a>
                    <div class="admin-dropdown">
                        <a href="adminpanel.php">Nytt inlägg</a>
                        <a href="register.php">Skapa ny användare</a>
                        <a href="gallery_upload_images.php">Ladda upp bilder</a>
                        <a href="video_upload.php">Ladda upp video</a>
                        <a href="blandaren_upload.php">Ladda upp Bländaren</a>
                        <a href="event.php">Lägg till event</a>
                        <a href="basecamp_edit.php">Ändra basecamp</a>
                    </div>
                </li> <?php
            }
            ?>
            <li class="menu-profiles"><a href="allprofiles.php">Profiler</a></li>
            <li class="menu-media"><a href="media.php">Media</a></li>
            <li class="menu-schedule"><a href="schedule.php">Schema</a></li>
            <li class="menu-blandaren"><a href="blandaren.php">Bländaren</a></li>
            <li class="menu-basecamp"><a href="basecamp.php">Basecamp</a></li>
            <li class="menu-logout logout-button"><a href="functions_logout.php">Logga ut </a></li>
            <li class="menu-padding"></li>
            <li class="menu-right"></li>
        </ul>
    </div>
</nav>

<div id="content-panel">
