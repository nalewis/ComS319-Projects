<?php
	session_start();
	include("classes.php");
	
function updateDisplay(){
	
	//var_dump(getShelves());
	$shelves = getShelves();
	var_dump($shelves[1]->display());
	$table = "<table border=\'2\'><tr>";
	foreach($shelves as $shelf){
		$table .= $shelf->display();
	}
	$table .= "</tr></table>";
	echo $table;

}
?>

<HTML>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<?php var_dump($_SESSION); ?>

<div id="posts">
	<?= updateDisplay(); ?>
</div>

<button type="button" onclick="window.location.href = 'logout.php'">Logout</button>

</body>
</HTML>