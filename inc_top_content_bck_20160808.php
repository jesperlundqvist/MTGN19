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
<div class="site-wrap">

<nav class="mobile-nav">
	<div class="mobile-menu-wrapper">
    <?php 
        // Profilbild
        if ($imagepath != null) {
          echo "<div id='profilepic-wrapper' style='background-image:url(\"$imagepath\")'>";
          echo "</div>";
          echo "<div id='profile-banner'></div>";
        }

        // namn
        if ($name != null) {
          echo "<div class='non-semantic-protector'> ";
          echo "<p class='bottom-ribbon'><span class='ribbon-content'>$name</span></p>";
          if ($usergroup == 'nØllan' || ($usergroup == 'KPH' && $n0llegroup != null)) {
            echo "<p class='n0llegroup'>$n0llegroup</p>";
          }
          echo "</div>";
        }

        // brytstreck
        echo "<svg class='profile-divider-line'>";
        echo "<line x1='0' y1='0' x2='100%' y2='0'/>";
        echo "</svg>";

        if ($admin || $ownProfile) {
          echo "<div class='mobile-item-wrapper'><a id=\"edit_profile\" class=\"no-link button\" href=\"profile_edit.php?user=$username\">Redigera profil</a></div>";
        }

        echo "<div class='mobile-item-wrapper'><a class='show-all-profiles' href='allprofiles.php'>Visa alla profiler</a></div>";
    ?>

    <br/>

    <div class='mobile-item-wrapper'><a class="mobile-blandaren" href="blandaren.php">Bländaren</a></div>
    <div class='mobile-item-wrapper'><a class="mobile-logout" href="functions_logout.php">Logga ut</a></div>

	</div> <!-- mobile-menu-wrapper -->
</nav>

<div class="push-wrap">

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
	<div class="constrainer nav-wrapper">
		<ul id="js-nav-mobile" class="sitenav left hide-on-med-and-down">
			<li class="menu-hamburger" style="display:none;"><a href="#" class="toggle-mobile-menu" style="font-size: 32px; margin-left: 8px;">&#9776;</a></li>
			<li class="menu-start"><a href="/">Startsida </a></li>
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
    	<li class="menu-logout"><a href="functions_logout.php">Logga ut </a></li>
		</ul>
	</div>
</nav>


