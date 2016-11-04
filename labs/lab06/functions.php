<?php

include("classes.php");

if($_REQUEST["action"] == "addBook"){
	$user = new Student();
	$user->addBook($_REQUEST["bookId"], $_REQUEST["title"], $_REQUEST["author"], $_REQUEST["shelf"]);
}

?>