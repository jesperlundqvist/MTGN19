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
  <nav class="mobile-nav">
  	<div class="mobile-menu-wrapper">
      <div class="mobile-menu-top">
        <a href="/profile.php?user=<?=$username?>">
        <?php
          // Profilbild
          if ($imagepath != null) {
            echo "<div id='profilepic-wrapper' style='background-image:url(\"$imagepath\")'>";
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
          <?php
            echo "<li><a href=\"profile_edit.php?user=$username\">Redigera profil</a></li>";
          ?>
          <?php
          if ($admin) { ?>
            <li class="menu-adminpanel"><a href="adminpanel.php">Adminpanel</a></li> <?php
          }
           ?>
          <li class="menu-profiles"><a href="allprofiles.php">Profiler</a></li>
          <li class="menu-media"><a href="media.php">Media</a></li>
          <li class="menu-schedule"><a href="schedule.php">Schema</a></li>
          <li class="menu-blandaren"><a href="blandaren.php">Bländaren</a></li>
          <li class="menu-logout logout-button"><a href="functions_logout.php">Logga ut </a></li>
        </ul>
      </div>
  	</div> <!-- mobile-menu-wrapper -->
  </nav>
</div>
<div class="site-wrap" canvas="container">

<div class="header">

    <div class="header-wave-back"></div>
	<div class="constrainer">
		<div class="header-ship floating"></div>
		<div class="header-logo"><a href="/"><img src="/design/logo.png" alt="Logga" /></a></div>
		<div class="header-sun"></div>
    </div>

    <div class="header-wave"></div>


</div>
<nav class="menubar">
	<div class="constrainer center-mobile nav-wrapper">
    <a class="mobile-logo-wrap" href="/"><img class="mobile-logo" src="/design/logo_mobile.png" alt="Logga" /></a>
		<ul id="js-nav-mobile" class="sitenav left hide-on-med-and-down">
			<li class="menu-hamburger toggle-mobilemenu" style="display:none;"><a href="#" class="toggle-mobile-menu" style="font-size: 32px; margin-left: 8px;">&#9776;</a></li>
			<li class="menu-start"><a href="/">Startsida </a></li>
      <li class="menu-schedule"><a href="/profile.php?user=<?=$username?>">Min profil</a></li>
			<?php
			if ($admin) { ?>
				<li class="menu-adminpanel"><a href="adminpanel.php">Adminpanel</a></li> <?php
	    }
	     ?>
    	<li class="menu-profiles"><a href="allprofiles.php">Profiler</a></li>
    	<li class="menu-media"><a href="media.php">Media</a></li>
      <!-- Lägg till funktioner getgallerylink osv för att få rätt länk till galleriet -->
      <li class="menu-schedule"><a href="schedule.php">Schema</a></li>
      <li class="menu-blandaren"><a href="blandaren.php">Bländaren</a></li>
    	<li class="menu-logout logout-button"><a href="functions_logout.php">Logga ut </a></li>
		</ul>
	</div>
</nav>
