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
	session_start();
	$_SESSION["user"] = $_REQUEST["name"];
	$_SESSION["pass"] = $_REQUEST["pass"];
	echo json_encode("True");
} else {
	echo json_encode("False");
}

//EXAMPLE TAKEN FROM DISCUSSION BOARD
//$data1 = "True"; $data2 = "False";
//header('Content-type: application/json');
//if ( login_succeed) echo json_encode( $data1 );
// prints zero-based JS array: ["a","b","c"]
// accessed like: result[1] (returns "b") else echo json_encode( $data2 );
?>