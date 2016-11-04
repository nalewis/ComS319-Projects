<?php

include("classes.php");

session_start();

if($_REQUEST["action"] == "addBook"){
	$user = new Student();
	$user->addBook($_REQUEST["bookId"], $_REQUEST["title"], $_REQUEST["author"], $_REQUEST["shelf"]);
}

if($_REQUEST["action"] == "display"){
	 return updateDisplay();
}

if($_REQUEST["action"] == "getBook"){
	 $response = getBook($_REQUEST["id"]);
	 echo json_encode($response);
}

if($_REQUEST["action"] == "checkAvailable"){
	 $response = getBook($_REQUEST["id"]);
	 if($response["availability"] == 1){
		 echo "true";
	 } else {
		 echo "false";
	 }
}

if(($_REQUEST["action"] == "deleteBook")){
	if ($_SESSION["userInfo"]["Librarian"] == 1){
		$response = deleteBook($_REQUEST["id"]);
		echo json_encode($response);
	}else{
		$response = ["success" => false, "message" => "Invalid credentials. Only librarians may delete books."];
		echo json_encode($response);
	}
}

if(($_REQUEST["action"] == "history")){
	if ($_SESSION["userInfo"]["Librarian"] == 1){
		$response = getHistory($_REQUEST["username"]);
		echo json_encode($response);
	}else{
		$response = ["success" => false, "message" => "Invalid credentials. Only librarians may view user history."];
		echo json_encode($response);
	}
}

function updateDisplay(){
	
	//var_dump(getShelves());
	$shelves = getShelves();
	$books = getBooks();
	//var_dump($books);
	//var_dump($shelves[1]->display());
	$table = "<tr>";
	foreach($shelves as $shelf){
		$table .= $shelf->display();
	}
	$table .= "</tr>";
	if(!is_null($books)){
		$i = 0;
		while($i < 20){
			$table .= "<tr>";
			if(array_key_exists($i, $books["Art"])){
				$table .= $books["Art"][$i]->display();
			} else {
				$table .= "<td></td>";
			}
			if(array_key_exists($i, $books["Science"])){
				$table .= $books["Science"][$i]->display();
			} else {
				$table .= "<td></td>";
			}
			if(array_key_exists($i, $books["Sport"])){
				$table .= $books["Sport"][$i]->display();
			} else {
				$table .= "<td></td>";
			}
			if(array_key_exists($i, $books["Literature"])){
				$table .= $books["Literature"][$i]->display();
			} else {
				$table .= "<td></td>";
			}
			$table .= "</tr>";
			$i++;
		}
	}
	//$table .= "</table>";
	echo $table;
}

function getShelves(){
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
	
	$sql = "SELECT * FROM shelves";
	$shelves = [];
	$result = $conn->query($sql); 
	
	if ($result->num_rows > 0) { 
		// output data of each row 
		while($row = $result->fetch_assoc()) { 
			array_push($shelves, new shelf($row["ShelfName"], $row["ShelfId"]));
		}
		$conn->close();
		return $shelves;
	} else {
		$conn->close();
		echo "0 results"; 
	}
}

function getBooks(){
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
	
	$books = [
		"Art" => [],
		"Science" => [],
		"Sport" => [],
		"Literature" => []
	];
	
	//Figure out which columns all books belong in
	$sql = "SELECT * FROM bookLocations";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) { 
		// output data of each row 
		while($row = $result->fetch_assoc()) {
			if($row["ShelfID"] == "0"){
				//art
				array_push($books["Art"], $row["BookID"]);
			} else if($row["ShelfID"] == "1"){
				//science
				array_push($books["Science"], $row["BookID"]);
			} else if($row["ShelfID"] == "2"){
				//Sport
				array_push($books["Sport"], $row["BookID"]);
			} else {
				//lit
				array_push($books["Literature"], $row["BookID"]);
			}
		}
	}
	
	$returnArray = [
		"Art" => [],
		"Science" => [],
		"Sport" => [],
		"Literature" => []
	];
	
	$sql = "SELECT * FROM books";

	$result = $conn->query($sql); 
	
	if ($result->num_rows > 0) { 
		// output data of each row 
		while($row = $result->fetch_assoc()) {
			if(in_array($row["BookId"], $books["Art"])){
				array_push($returnArray["Art"], new book($row["BookId"], $row["BookTitle"], $row["Author"], $row["Availability"]));
			} else if(in_array($row["BookId"], $books["Science"])){
				array_push($returnArray["Science"], new book($row["BookId"], $row["BookTitle"], $row["Author"], $row["Availability"]));
			} else if(in_array($row["BookId"], $books["Sport"])){
				array_push($returnArray["Sport"], new book($row["BookId"], $row["BookTitle"], $row["Author"], $row["Availability"]));
			} else {
				array_push($returnArray["Literature"], new book($row["BookId"], $row["BookTitle"], $row["Author"], $row["Availability"]));
			}
		}
		$conn->close();
		return $returnArray;
	} else {
		$conn->close();
		//echo "0 results"; 
	}
}

function getBook($id){
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

function deleteBook($idToDelete){
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

	$sql = "DELETE FROM books WHERE BookId = " . $idToDelete;
	$result = $conn->query($sql);
	$rowsDeleted = $conn->affected_rows;

	$conn->close();

	if ($result && ($rowsDeleted > 0)){
		return ["success" => true];
	}else if ($result && ($rowsDeleted == 0)){
		return ["success" => false, "message" => "Unable to locate book with specified id."];
	}else{
		return ["success" => false, "message" => "Unable to delete specified book."];
	}
}

function getHistory($username)
{
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

	$sql = "SELECT * from loanHistory WHERE UserName = " . $username;	

	$result = $conn->query($sql);

	if ($result->num_rows > 0)
	{
		while($row = $result->fetch_assoc()) {
			$conn->close();
			return ["success" => true, "username" => $row["UserName"], "bookid" => $row["BookId"], "duedate" => $row["DueDate"], "returneddate" => $row["ReturnedDate"]];
		}
	} else {
		$conn->close();
		return ["success" => false, "message" => "No history returned for specified user."];
	} 
}
?>
