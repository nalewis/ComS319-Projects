<?php
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
		//echo "Connected successfully<br>"; 
	}


	$saltedPassword = $_REQUEST["username"] . "'s password: " . $_REQUEST["pass"];

	$sql = "SELECT * FROM portfolio2_users WHERE userName = '" . $_REQUEST['username'] . "' AND Password = '" . md5($saltedPassword) . "'"; 
	
	$result = $conn->query($sql); 

	if ($result->num_rows > 0) { 
		// output data of each row 
		$row = $result->fetch_assoc();
		
		if($row["userName"] == $_REQUEST["username"] && $row["password"] == md5($saltedPassword)){
			
			$user->username = $row["userName"];
			session_start();
			$_SESSION["userInfo"] = $row;
			echo "Success"; 
		} else { 
			echo "Invalid"; 
		}
	} else { 
		echo "Invalid"; 
	}


	$conn->close();
?>
