<?php

include("classes.php");

session_start();

date_default_timezone_set('America/Chicago');

if($_REQUEST["action"] == "addBook"){
	$user = new Student();
	$user->addBook($_REQUEST["bookId"], $_REQUEST["title"], $_REQUEST["author"], $_REQUEST["shelf"]);
}

if($_REQUEST["action"] == "display"){
	$library = new library();
	echo $library->updateDisplay();
}

if($_REQUEST["action"] == "getBook"){
	$user = new Student();
	echo json_encode($user->getBook($_REQUEST["id"]));
}

if($_REQUEST["action"] == "checkAvailable"){
	$user = new student();
	$response = $user->getBook($_REQUEST["id"]);
	if($response["availability"] == 1){
		echo json_encode(["success" => true]);
	} else {
		echo json_encode(["success" => false]);
	}
}

if($_REQUEST["action"] == "borrow"){
	$user = new Student();
	echo json_encode($user->borrowBook($_REQUEST["id"]));
}

if($_REQUEST["action"] == "return"){
	$user = new Student();
	echo json_encode($user->returnBook($_REQUEST["id"]));
}

if($_REQUEST["action"] == "isBorrower"){
	$user = new Student();
	echo json_encode($user->isBorrower($_REQUEST["id"]));
}

if(($_REQUEST["action"] == "deleteBook")){
	if ($_SESSION["userInfo"]["Librarian"] == 1){
		$user = new student();
		$response = $user->deleteBook($_REQUEST["id"]);
		echo json_encode($response);
	}else{
		$response = ["success" => false, "message" => "Invalid credentials. Only librarians may delete books."];
		echo json_encode($response);
	}
}

if(($_REQUEST["action"] == "history")){
	if ($_SESSION["userInfo"]["Librarian"] == 1){
		$user = new student();
		$response = $user->getHistory($_REQUEST["username"]);
		//$response = getHistory($_REQUEST["username"]);
		echo json_encode($response);
	}else{
		$response = ["success" => false, "message" => "Invalid credentials. Only librarians may view user history."];
		echo json_encode($response);
	}
}


?>
