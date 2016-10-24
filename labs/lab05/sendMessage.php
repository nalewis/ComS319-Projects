<?php 

session_start();


$path = 'phpseclib';
	set_include_path(get_include_path() . PATH_SEPARATOR . $path);
	include_once('Crypt/RSA.php');



//Function for encrypting with RSA
function rsa_encrypt($string, $public_key)
{
    //Create an instance of the RSA cypher and load the key into it
    $cipher = new Crypt_RSA();
    $cipher->loadKey($public_key);
    //Set the encryption mode
    $cipher->setEncryptionMode(CRYPT_RSA_ENCRYPTION_PKCS1);
    //Return the encrypted version
    return $cipher->encrypt($string);
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
//var_dump($_POST);
$sender = $_REQUEST["sender"];
$recipient = $_REQUEST["recipient"];
$message = $_REQUEST["message"];

if (file_exists("users.txt")){

	$users = json_decode(file_get_contents("users.txt"), true);
	if (!empty($users)){
		$recipientKey = NULL;

		foreach($users as $user){
			if (strtolower($user['username']) == strtolower($recipient)){
				$recipientKey = $user['public'];
				$private = $user['private'];
			}
		}	

		if(empty($recipientKey)){
			
			$return = [
				'success' => false,
				'error' => 'Unable to find specified user.',
			];
			echo json_encode($return);
			exit;
		}else{
			$encryptedMessage = rsa_encrypt($message, $recipientKey);
		}

		
	}else{
		$return = [
			'success' => false,
			'error' => 'Unable to find specified user.',
		];
		
		echo json_encode($return);
		exit;
	}
	 
}else{
	$return = [
		'success' => false,
		'error' => 'Unable to find specified user.',
	];
	
	echo json_encode($return);
	exit;
}	


$toStore = "User:" . $sender . ";Receiver:" . $recipient . ";Body:" . base64_encode($encryptedMessage) . "|endmessage|"; 

if(file_put_contents('messages.txt', $toStore, FILE_APPEND)){
	
	$return = [
		'success' => true,
	];

}else{
	
	$return = [
		'success' => false,
		'error' => 'Unable to save message in file.',
	];
}
var_dump($encryptedMessage);
$encodeMsg = base64_encode($encryptedMessage);
$unencodeEncryptedMsg = base64_decode($encodeMsg);

var_dump("priv is :" . $private);
var_dump(rsa_decrypt($unencodeEncryptedMsg, $private));

echo json_encode($return);

?>
