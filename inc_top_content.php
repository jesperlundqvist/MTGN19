<?php
$admin = $_SESSION['admin'];
?>


<div class="header">
	
	<div class="header-mini-menu">
		<button class="neutral-btn mini-menu">Hamburgare</button>
	</div>
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
			<li><a href="/">Startsida </a></li>
			<?php
			if ($admin) { ?>
				<li><a href="adminpanel.php">Adminpanel</a></li> <?php
	    }
	     ?>
    	<li><a href="allprofiles.php">Profiler</a></li>
      <!-- Lägg till funktioner getgallerylink osv för att få rätt länk till galleriet -->
      <li><a href="gallery.php">Galleri</a></li>
      <li><a href="video.php">Video</a></li>
      <li><a href="schedule.php">Schema</a></li>
      <li><a href="blandaren.php">Bländaren</a></li>
    	<li><a href="functions_logout.php">Logga ut </a></li>
		</ul>
	</div>
</nav>
