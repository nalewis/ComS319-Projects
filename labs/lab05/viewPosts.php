<?php 
session_start();

$path = 'phpseclib';
	set_include_path(get_include_path() . PATH_SEPARATOR . $path);
	include_once('Crypt/RSA.php');

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

//Function for decrypting with RSA 
function rsa_decrypt($string, $private_key)
{
    //Create an instance of the RSA cypher and load the key into it
    $cipher = new Crypt_RSA();
    $cipher->loadKey($private_key);
    //Set the encryption mode
    $cipher->setEncryptionMode(CRYPT_RSA_ENCRYPTION_PKCS1);
    //Return the decrypted version
    return $cipher->decrypt($string);
}

function updateInbox(){
	if(file_exists("messages.txt")){
		
		
		$messages = parseMessages($_SESSION["user"]);
		
		if (!empty($messages)){
			$messageRows = "";
			$users = json_decode(file_get_contents('users.txt'), true);
			$privateKey = "";
			
			if (!empty($users)){
				foreach($users as $user){
					if($user["username"] == $_SESSION["user"]){
						$privateKey = $user["private"];
						//var_dump($_SESSION["user"] . "'s priv is: " . $privateKey);
					}
				}
			}else if (empty($users) || empty($privateKey)){
				echo("Error loading private key for message decryption.<br>");
			}
			
			/*foreach($messages as $message){
				if ($message["Receiver"] == $_SESSION["user"]){
					$messageRows .= "<tr><td>";
					$messageRows .= $message["user"];
					$messageRows .= "</td><td>";
					$messageRows .= rsa_decrypt(base64_decode($message["body"]), $privateKey) ;
					$messageRows .= "</td></tr>";
				}
				
				if(!empty($messageRows)){
					$output = "<table><tr><th>Sender</th><th>Message</th></tr>" + $messageRows + "</table>";
					echo ($output);
				} else {
					echo("You have no messages detected.<br>");
				}
			}*/
			
			foreach($messages as $message){
				$messageRows .= "<tr><td>";
				$messageRows .= $message["user"];
				$messageRows .= "</td><td>";
				$messageRows .= rsa_decrypt($message["body"], $privateKey) ;
				$messageRows .= "</td></tr>";
			}
			
			$output = "<table border=\'2\'><tr><th>Sender</th><th>Message</th></tr>" . $messageRows . "</table>";
			echo($output);
		}else{
			echo("You have no messages.<br>");
		}
	}else{
		echo("You have no messages.<br>");
	}

}

function parseMessages($username){
	$rawMessages = file_get_contents('messages.txt');
	$separateMessages = explode("|endmessage|", $rawMessages);
	
	
	$userMessages = [];
	$i = 0;
	
	foreach($separateMessages as $msg){
		$messageToAdd = [];
		
		if (!empty($msg)){
			$elements = explode(";", $msg);
			
			$recipient = substr($elements[1], 9);
			
			
			if ($recipient == $username)
			{
				$user = substr($elements[0], 5);
				$encryptedMessage = base64_decode(substr($elements[2], 5));
				
				
				$messageToAdd["user"] = $user;
				$messageToAdd["recipient"] = $recipient;
				$messageToAdd["body"] = $encryptedMessage;
				
				
				
				$userMessages[$i++] = $messageToAdd;
			}
			
			//var_dump($user, $recipient, $encryptedMessage);
		}
		
		
	}
	
	return $userMessages;
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

<h1>Messages</h1>
<h2>Your Inbox</h2>

<div id="messages">
	<?= updateInbox() ?>
</div>
<br>
<button type="button" id="createMessage">Create a Message</button>
<div id="messageForm" style="display: none">
	Message Recipient: <input id="messageRecipient" type="text">
	<br>
	Message: <input id="message" type="text">
	<br>
	<button type="button" id="sendMessage">Send Message</button>
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

	$("#createMessage").click(function(){
		$("#messageForm").show();
	});

	$("#sendMessage").click(function(){
		if ($('#message').val() !== "")
		{
			$.post("sendMessage.php", {sender: "<?= $_SESSION['user'] ?>", recipient: $("#messageRecipient").val(), message: $("#message").val()}, function(data, textStatus){
				console.log(data);
				console.log(textStatus);
				console.log(true);
			});
		}
	});
</script>
</html>
