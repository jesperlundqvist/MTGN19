<?php
$admin = $_SESSION['admin'];
?>

<div class="site-wrap">

<nav class="mobile-nav">
    <ul>
        <li><a href="#">Home</a></li> 
        <li><a href="#">About</a></li> 
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li> 
    </ul>
</nav>

<div class="push-wrap">

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


