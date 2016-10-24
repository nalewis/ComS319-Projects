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
<div id="posts">
	<?= updateDisplay(); ?>
</div>

<button type="button" onclick="window.location.href = 'logout.php'">Logout</button>
<button type="button" id="postBut">Make a Post</button>
<br>
<br>
<div id="postForm" style="display: none">
	Post: <input id="postText" type="text">
</div>

<div id="editForm" style="display: none">
	Edit: <input id="editText" type="text">
</div>

<div id="adminForm" style="display: none">
	<button id="delete" type="button">Delete</button>
</div>

<div id="messageHeader">
	<h1>Messages</h1>
	<h2>Your Inbox</h2>
</div>

<div id="messages">
	
</div>
<br>
<button type="button" id="createMessage">Send Message</button>
<div id="successMessage" style="color: #006600; display: none">
	Message sent successfully!
</div>
<div id="errorMessage" style="color: #ff0000; display: none">
	<span id="error"></span>
</div>

<div id="messageForm" style="display: none">
	Reciever: <input id="messageRecipient" type="text">
	<br>
	User: <?= $_SESSION["user"] ?>
	<br>
	Body: <input id="message" type="text">
	<br>
	<button type="button" id="sendMessage">Send Message</button>
</div>


</body>
<script>

	var user = $('#username')[0].innerHTML;
	var rowTitle;
	var rowDescription;
	var rowTimePosted;
	
	//admin can't post or see messages
	$(function(){
		if(user == "admin"){
			$('#postBut').hide();
			$('#createMessage').hide();
			$('#messages').hide();
			$('#messageHeader').hide();
		}	
	});
	
	//Load the user's message inbox on page load
	$(function(){
		$.post("inbox.php", {} , function(data){
			$('#messages').html(data);
		});
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
						$('#editForm').hide();
						$('#postForm').hide();
						$('#adminForm').hide();
						$('#posts').html(data);
						$('tr').click(function(){rowClick(this)});
					});
	});
	
	$('tr').click(function(){rowClick(this)});
	
	function rowClick(row){
		//to be used in editing or deleting messages
		rowTitle = $(row).children()[0].innerHTML;
		rowDescription = $(row).children()[1].innerHTML;
		rowTimePosted = $(row).children()[2].innerHTML;
		console.log('hi');
		if(user == 'admin'){
			$('#adminForm').show();
		} else if(user == rowTitle){
			$('#editForm').show();
			$('#postForm').hide();
			$('#editText').val(rowDescription);
		} else {
			return;
		}
	}
	
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
						$('#posts').html(data);
						$('tr').click(function(){rowClick(this)});
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
					function(data){
						$('#postForm').hide();
						$('#editForm').hide();
						$('#posts').html(data);
						$('#postText').val('');
						$('tr').click(function(){rowClick(this)});
					});
			}
		}
	});

	//Show the send message menu when create message button clicked
	$("#createMessage").click(function(){
		
		$("#messageRecipient").val("");
		$("#message").val("");
		$("#messageForm").show();
		$("#successMessage").hide(150);
		$("#errorMessage").hide(150);
	});

	//Send the message when the send message button clicked
	$("#sendMessage").click(function(){
		if ($('#message').val() !== ""){
			$.post("sendMessage.php", {sender: "<?= $_SESSION['user'] ?>", recipient: $("#messageRecipient").val(), message: $("#message").val()}, function(data, textStatus){
				$feedback = $.parseJSON(data);
				
				if($feedback.success){
					$('#messageForm').hide(500);
					$('#successMessage').show(500);
					$('#errorMessage').hide(250);
					$.post("inbox.php", {} , function(data){
						$('#messages').html(data);
					});
				}else{
					$('#error').text($feedback.error);
					$('#errorMessage').show(250);
				}
				
			});
		}
	});
	
	//send ajax request when enter is pressed in the edit post textbox
	$("#message").keyup(function(event){
		if(event.keyCode == 13){	
			if ($('#message').val() !== ""){
				$.post("sendMessage.php", {sender: "<?= $_SESSION['user'] ?>", recipient: $("#messageRecipient").val(), message: $("#message").val()}, function(data, textStatus){
					$feedback = $.parseJSON(data);
				
					if($feedback.success){
						$('#messageForm').hide(500);
						$('#successMessage').show(500);
						$('#errorMessage').hide(250);
						$.post("inbox.php", {} , function(data){
							$('#messages').html(data);
						});
					}else{
						$('#error').text($feedback.error);
						$('#errorMessage').show(250);
					}
				
				});
			}
		}
	});
</script>
</html>
