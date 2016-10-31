<?php
	session_start();
	include("classes.php");
	echo "hello";
?>

<HTML>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<?php var_dump($_SESSION); ?>

Hello World!
</body>
</HTML>