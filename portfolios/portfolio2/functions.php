<?php

include("classes.php");

session_start();

date_default_timezone_set('America/Chicago');

if($_REQUEST["action"] == "newItem"){
	echo json_encode(addItem($_REQUEST["name"], $_REQUEST["quantity"], $_REQUEST["value"]));
}

if($_REQUEST["action"] == "editItem"){
	echo json_encode(editItem($_REQUEST["id"], $_REQUEST["name"], $_REQUEST["quantity"], $_REQUEST["value"]));
}

if($_REQUEST["action"] == "deleteItem"){
	echo json_encode(deleteItem($_REQUEST["id"]));
}

if($_REQUEST["action"] == "display"){
	echo updateDisplay();
}

function getItems(){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	// Create connection 
	$conn = new mysqli($dbServer, $username, $password, $dbName);
	
	// Check connection 
	if ($conn->connect_error) { 
		die("Connection failed: " . $conn->connect_error); 
	}
	
	$sql = "SELECT * FROM inventory";
	
	$result = $conn->query($sql); 
	
	$returnArray = [];
	
	if ($result->num_rows > 0) { 
		// output data of each row 
		while($row = $result->fetch_assoc()) {
			array_push($returnArray, ["Id" => $row["Id"], "Name" => $row["Name"], "Quantity" => $row["Quantity"], "Value" => $row["Value"], "Updated" => $row["Updated"]]);
		}
		$conn->close();
		return $returnArray;
	} else {
		$conn->close();
	}
}

//TODO
//Returns the information associated with a book with the specified id.	
function getItem($id){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	// Create connection 
	$conn = new mysqli($dbServer, $username, $password, $dbName);
	
	// Check connection 
	if ($conn->connect_error) { 
		die("Connection failed: " . $conn->connect_error); 
	}

	$sql = "SELECT * FROM books WHERE BookId = " . $id;

	$result = $conn->query($sql); 
	if ($result->num_rows > 0) { 
		// output data of each row 
		while($row = $result->fetch_assoc()) {
			$conn->close();
			return ["id" => $row["BookId"], "title" => $row["BookTitle"], "author" => $row["Author"], "availability" => $row["Availability"]];
		}
	} else {
		$conn->close();
		//echo "0 results"; 
	}
}

//Attempts to delete an item with the given id from the database.	
function deleteItem($idToDelete){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	// Create connection 
	$conn = new mysqli($dbServer, $username, $password, $dbName);
	
	// Check connection 
	if ($conn->connect_error) { 
		die("Connection failed: " . $conn->connect_error); 
	}

	$sql = "DELETE FROM inventory WHERE Id = " . $idToDelete;
	$result = $conn->query($sql);
	$rowsDeleted = $conn->affected_rows;
	
	$conn->close();

	if ($result && ($rowsDeleted > 0)){
		return ["success" => true];
	}else if ($result && ($rowsDeleted == 0)){
		return ["success" => false, "message" => "Unable to locate item with specified id."];
	}else{
		return ["success" => false, "message" => "Unable to delete specified item."];
	}
}

function editItem($id, $name, $quantity, $value){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	// Create connection 
	$conn = new mysqli($dbServer, $username, $password, $dbName);
	
	// Check connection 
	if ($conn->connect_error) { 
		die("Connection failed: " . $conn->connect_error); 
	}

	$sql = "UPDATE inventory SET Name = '" . $name . "', Quantity = '" . $quantity . "', Value = '" . $value . "', Updated = '" . date('Y-m-d') . "' WHERE Id = " . $id;

	$conn->query($sql);

	if ($conn->query($sql) === TRUE) {
		return ["success" => true];
	} else {
		return ["success" => false];
	}
}

//Attempts to add an item with the given name, quantity, and value to the database.	
function addItem($name, $quantity, $value){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	// Create connection 
	$conn = new mysqli($dbServer, $username, $password, $dbName);
	
	// Check connection 
	if ($conn->connect_error) { 
		die("Connection failed: " . $conn->connect_error); 
	}
	
	//add to inventory
	$sql = "INSERT INTO inventory (Name, Quantity, Value, Updated) VALUES ('" . $name . "', '" . $quantity . "', '" . $value . "', '" . date('Y-m-d') . "')";
	
	if ($conn->query($sql) === TRUE) { 
		return ["success" => true];
	} else { 
		return ["success" => false, "message" => "Error: " . $sql . "<br>" . $conn->error]; 
	}
		
	$conn->close();
}

function updateDisplay(){
	$items = getItems();
	$table = "";
	if(!is_null($items)){
		//$table .= "<tbody>";
		foreach($items as $item){
			$table .= "<tr>";
			$table .= "<td>" . $item["Id"] . "</td><td>" . $item["Name"] . "</td><td>" . $item["Quantity"] . "</td><td>" . $item["Value"] . "</td><td>" . $item["Updated"] . "</td>";
			$table .= "</tr>";
		}
		//$table .= "</tbody>";
	}
	
	return $table;
}


?>
