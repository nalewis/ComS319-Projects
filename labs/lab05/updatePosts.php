<?php
session_start();

//TODO change this to have logic for admin functions, editing messages, etc...

if($_REQUEST["type"] == "adminDelete"){
	if(file_exists("posts.txt")){
		$posts = json_decode(file_get_contents("posts.txt"), true);
		if(is_null($posts)){
			$posts = [];
		}
	} else {
		$posts = [];
	}
	
	foreach($posts as $key => $post){
		if($_REQUEST["title"] == $posts[$key]["title"] && $_REQUEST["description"] == $posts[$key]["description"] && $_REQUEST["timePosted"] == $posts[$key]["timePosted"]){
			unset($posts[$key]);
		}
	}
	
	$posts = json_encode($posts);
	file_put_contents("posts.txt", $posts);	
}

if($_REQUEST["type"] == "editPost"){
	if(file_exists("posts.txt")){
		$posts = json_decode(file_get_contents("posts.txt"), true);
		if(is_null($posts)){
			$posts = [];
		}
	} else {
		$posts = [];
	}
	date_default_timezone_set ( "America/Chicago" );
	$time = time();
	$date = date("H:i:s m/d/y",$time);
	
	foreach($posts as $key => $post){
		if($_REQUEST["user"] == $posts[$key]["title"] && $_REQUEST["oldDesc"] == $posts[$key]["description"] && $_REQUEST["oldTime"] == $posts[$key]["timePosted"]){
			$posts[$key]["description"] = $_REQUEST["text"];
		}
	}
	
	$posts = json_encode($posts);
	file_put_contents("posts.txt", $posts);	
}

if($_REQUEST["type"] == "newPost"){
	if(file_exists("posts.txt")){
		$posts = json_decode(file_get_contents("posts.txt"), true);
		if(is_null($posts)){
			$posts = [];
		}
	} else {
		$posts = [];
	}
	date_default_timezone_set ( "America/Chicago" );
	$time = time();
	$date = date("H:i:s m/d/y",$time);
	
	$array = ["title" => $_SESSION["user"], "description" => $_REQUEST["text"], "timePosted" => $date];
	
	array_unshift($posts, $array);
	$posts = json_encode($posts);
	file_put_contents("posts.txt", $posts);	
}

//doesn't send any success or failure message to viewPosts
?>