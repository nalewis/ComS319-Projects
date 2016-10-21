<?php

$users = json_decode(file_get_contents('users.txt'), true);

$login_succeed = false;

//ajax sends data as $_REQUEST
foreach($users as $user){
	if($user["username"] == $_REQUEST["name"] && $user["password"] == $_REQUEST["pass"]){
		$login_succeed = true;
	}
}
header('Content-type: application/json');
if($login_succeed){
	//store the logged in users data in the session variable
	session_start();
	//TODO bring the public and private key along?
	//or maybe just search the users file with user and pass in order to find it later...
	$_SESSION["user"] = $_REQUEST["name"];
	$_SESSION["pass"] = $_REQUEST["pass"];
	echo json_encode("True");
} else {
	echo json_encode("False");
}

?>