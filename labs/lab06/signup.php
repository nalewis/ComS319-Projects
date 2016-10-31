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
	
	$phone = str_replace('-', '', $_REQUEST["phone"]);
	$sql = "INSERT INTO users (userName, Password, Email, Phone, Librarian, FirstName, LastName)
 VALUES ('" . $_REQUEST["username"] . "', '" . md5($_REQUEST["pass"]) . "', '" . $_REQUEST["email"]
 . "', '" . $phone . "', '" . $_REQUEST["librarian"] . "', '" . $_REQUEST["first"]
 . "', '" . $_REQUEST["last"] . "')";
	
	if ($conn->query($sql) === TRUE) { 
		echo "New record created successfully<br>"; 
	} else { 
		echo "Error: " . $sql . "<br>" . $conn->error; 
	} 
	
	/*
	$sql = "SELECT * FROM users"; 
	
	$result = $conn->query($sql); 
	
	if ($result->num_rows > 0) { 
		// output data of each row 
		while($row = $result->fetch_assoc()) { 
			echo "userID: " . $row["userID"]. "  userDetails: " . $row["userDetails"]. "<br>"; 
		} 
	} else { 
		echo "0 results"; 
	} */
	
	$conn->close();
}

?> 