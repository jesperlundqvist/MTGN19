<?php
$admin = $_SESSION['admin'];
?>

<div class="header">
    <div class="header-wave-back"></div>
	<div class="constrainer">
		<div class="header-ship"></div>
		<div class="header-logo"></div>
		<div class="header-sun"></div>
    </div>

    <div class="header-wave"></div>
</div>
<nav class="menubar">
	<div class="constrainer">
		<ul class="sitenav">
			<li><a href="/">Startsida </a></li>
			<?php      
			if ($admin) {
			echo'<li><a href="adminpanel.php">Adminpanel</a></li>';
	      	}
	      	?>
	      	<li><a href="logout.php">Logga ut </a></li>

		</ul>
	</div>
</nav>