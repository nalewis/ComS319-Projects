<?php
session_start();
$path = 'phpseclib';
	set_include_path(get_include_path() . PATH_SEPARATOR . $path);
	include_once('Crypt/RSA.php');
	
updateInbox();
	
//Generates and echos an HTML table containing all messages addressed to the currently logged in user.	
function updateInbox(){
	
	if(file_exists("messages.txt")){
		$users = json_decode(file_get_contents('users.txt'), true);
		$messages = parseMessages($_SESSION["user"]);
		
		if (!empty($messages)){
			$messageRows = "";
			$privateKey = "";
			
			if (!empty($users)){
				foreach($users as $user){
					if($user["username"] == $_SESSION["user"]){
						$privateKey = $user["private"];
					}
				}
			}else if (empty($users) || empty($privateKey)){
				echo("Error loading private key for message decryption.<br>");
			}
			
			foreach($messages as $message){
				$messageRows .= "<tr><td>";
				$messageRows .= $message["user"];
				$messageRows .= "</td><td>";
				$messageRows .= $message["recipient"];
				$messageRows .= "</td><td>";
				$messageRows .= rsa_decrypt($message["body"], $privateKey) ;
				$messageRows .= "</td></tr>";
			}
			
			$output = "<table border=\'2\'><tr><th>Sender</th><th>Reciever</th><th>Message</th></tr>" . $messageRows . "</table>";
			echo($output);
			
		}else{
			echo("You have no messages.<br>");
		}
	}else{
		echo("You have no messages.<br>");
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

//Reads in from and parses the messages.txt file
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
			
			
			if (strtolower($recipient) == strtolower($username))
			{
				$user = substr($elements[0], 5);
				$encryptedMessage = base64_decode(substr($elements[2], 5));
								
				$messageToAdd["user"] = $user;
				$messageToAdd["recipient"] = $recipient;
				$messageToAdd["body"] = $encryptedMessage;
				
				$userMessages[$i++] = $messageToAdd;
			}
		}	
	}
	return $userMessages;
	
}

?>