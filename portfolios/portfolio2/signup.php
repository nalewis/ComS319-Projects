<?php

mysqlstuff();

function mysqlstuff(){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	// Create connection 
	$conn = new mysqli($dbServer, $username, $password, $dbName);
	
	// Check connection 
	if ($conn->connect_error) { 
		die("Connection failed: " . $conn->connect_error); 
	} else { 
		echo "Connected successfully<br>"; 
	}

	$saltedPassword = $_REQUEST["username"] . "'s password: " . $_REQUEST["pass"];
	
	$sql = "INSERT INTO portfolio2_users (userName, Password) VALUES ('" . $_REQUEST["username"] . "', '" . md5($saltedPassword) . "')";
	
	if ($conn->query($sql) === TRUE) { 
		echo "New record created successfully<br>"; 
	} else { 
		echo "Error: " . $sql . "<br>" . $conn->error; 
	} 
	
	$conn->close();
}

?> 
