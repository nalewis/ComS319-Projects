<?php 
session_start();

function updateDisplay(){
	if(file_exists("posts.txt")){
		$posts = json_decode(file_get_contents('posts.txt'), true);
		if(is_null($posts)){
			echo 'No posts here!';
		} else {
			$table = "<table border=\'2\'><tr><th>Title</th><th>Description</th><th>Time Posted</th></tr>";
			foreach($posts as $post){
				$table .= "<tr><td>";
				$table .= $post["title"];
				$table .= "</td><td>";
				$table .= $post["description"];
				$table .= "</td><td>";
				$table .= $post["timePosted"];
				$table .= "</td></tr>";
			}
			$table .= "</table>";
			echo $table;
		}
	} else {
		echo 'No posts here!<br>';
	}
}

?>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<h1>Posts</h1>
<h2>User: <?= $_SESSION["user"] ?></h2>
<?= updateDisplay(); ?>

<button type="button" onclick="window.location.href = 'logout.php'">Logout</button>
<button type="button" id="postBut">Make a Post</button>
<br>
<br>
<div id="postForm" style="display: none">
	Post: <input id="postText" type="text">
</div>
</body>
<script>
	//show form when add post button is clicked
	$('#postBut').click(function(){
			$('#postForm').show();
	});

	//send ajax request when enter is pressed in the add post textbox
	$("#postText").keyup(function(event){
		if(event.keyCode == 13){	
			if ($('postText').val() === "") { 
				return;
			} else {
				$.post("updatePosts.php", {text: $("#postText").val()}, 
					function(){
						$('#postForm').hide();
						location.reload();
					});
			}
		}
	});
</script>
</html>