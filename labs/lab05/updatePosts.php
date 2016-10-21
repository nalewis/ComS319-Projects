<?php
session_start();

//TODO change this to have logic for admin functions, editing messages, etc...

if(file_exists("posts.txt")){
	$posts = json_decode(file_get_contents("posts.txt"), true);
	if(is_null($posts)){
		$posts = [];
	}
} else {
	$posts = [];
}

$time = time();
$date = date("H:i:s m/d/y",$time);

$array = ["title" => $_SESSION["user"], "description" => $_REQUEST["text"], "timePosted" => $date];

array_unshift($posts, $array);
$posts = json_encode($posts);
file_put_contents("posts.txt", $posts);

//doesn't send any success or failure message to viewPosts
?>