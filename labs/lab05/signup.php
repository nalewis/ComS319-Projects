<?php 
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

$rsa = new Crypt_RSA();
$rsa->setPrivateKeyFormat(CRYPT_RSA_PRIVATE_FORMAT_PKCS1);
$rsa->setPublicKeyFormat(CRYPT_RSA_PUBLIC_FORMAT_PKCS1);
extract($rsa->createKey(1024)); /// makes $publickey and $privatekey available
echo $privatekey;
echo $publickey;

$private_key = $privatekey;
$public_key = $publickey;

$name = $_POST["username"];
$pass = $_POST["password"];

//Test out the rsa encryption functions
//$plaintext = "This is some plaintext to encrypt!";
//$ciphertext = rsa_encrypt($name, $public_key);
//$decipheredtext = rsa_decrypt($name, $private_key);


//-----------------------Decrypt doesn't work yet! temp code below-------------------------//


$array = ["username" => $name, "password" => $pass, "public" => $publickey, "private" => $privatekey];

if(file_exists("users.txt")){
	$users = json_decode(file_get_contents("users.txt"));
	if(is_null($users)){
		$users = [];
	}
} else {
	$users = [];
}

array_push($users, $array);
$users = json_encode($users);
file_put_contents("users.txt", $users);

header('Location: login.html');
?>