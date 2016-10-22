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
<h2 id="username"><?= $_SESSION["user"] ?></h2>
<?= updateDisplay(); ?>

<button type="button" onclick="window.location.href = 'logout.php'">Logout</button>
<button type="button" id="postBut">Make a Post</button>
<br>
<br>
<div id="postForm" style="display: none">
	Post: <input id="postText" type="text">
</div>

<div id="editForm" style="display: none">
	Post: <input id="editText" type="text">
</div>

<div id="adminForm" style="display: none">
	<button id="delete" type="button">Delete</button>
</div>
</body>
<script>

	var user = $('#username')[0].innerHTML;
	var rowTitle;
	var rowDescription;
	var rowTimePosted;
	//admin can't post
	$(function(){
		if(user == "admin"){
			$('#postBut').hide();
		}	
	});

	//show form when add post button is clicked
	$('#postBut').click(function(){
		if(user != "admin"){
			$('#postForm').show();
			$('#editForm').hide();
		}
	});
	
	//if admin, delete the selected row
	$('#delete').click(function(){
		$.post("updatePosts.php", {type: "adminDelete", title: rowTitle, description: rowDescription, timePosted: rowTimePosted}, 
					function(data){
						console.log(data);
						$('#editForm').hide();
						$('#postForm').hide();
						$('#adminForm').hide();
						location.reload();
					});
	});
	
	$('tr').click(function(){
		//to be used in editing or deleting messages
		rowTitle = $(this).children()[0].innerHTML;
		rowDescription = $(this).children()[1].innerHTML;
		rowTimePosted = $(this).children()[2].innerHTML;
		if(user == 'admin'){
			$('#adminForm').show();
		} else if(user == rowTitle){
			$('#editForm').show();
			$('#editText').val(rowDescription);
		} else {
			return;
		}
	});
	
	//send ajax request when enter is pressed in the edit post textbox
	$("#editText").keyup(function(event){
		if(event.keyCode == 13){	
			if ($('#editText').val() === "") { 
				return;
			} else {
				$.post("updatePosts.php", {type: "editPost", text: $("#editText").val(), user: user, oldDesc: rowDescription, oldTime: rowTimePosted}, 
					function(data){
						console.log(data);
						$('#editForm').hide();
						$('#postForm').hide();
						location.reload();
					});
			}
		}
	});

	//send ajax request when enter is pressed in the add post textbox
	$("#postText").keyup(function(event){
		if(event.keyCode == 13){	
			if ($('#postText').val() === "") { 
				return;
			} else {
				$.post("updatePosts.php", {type: "newPost", text: $("#postText").val()}, 
					function(){
						$('#postForm').hide();
						$('#editForm').hide();
						location.reload();
					});
			}
		}
	});
</script>
</html>