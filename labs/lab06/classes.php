<?php



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
		echo "0 results"; 
	}
}

class student{
	public $isLibrarian;
	public $username;
	public $firstName;
	
	function addBook($id, $title, $author, $shelf){
		//TODO check if shelf full
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
		
		//add to books
		$sql = "INSERT INTO books (BookId, BookTitle, Author) VALUES ('" . $id . "', '" . $title . "', '" . $author . "')";
		var_dump($id);
		$result = $conn->query($sql);
		
		if ($conn->query($sql) === TRUE) { 
			echo "New record created successfully<br>"; 
		} else { 
			echo "Error: " . $sql . "<br>" . $conn->error; 
		}
		
		//add to book locations
		$sql = "INSERT INTO bookLocations (BookID, ShelfID) VALUES ('" . $id . "', '" . $shelf . "')";
		$result = $conn->query($sql);
		
		if ($conn->query($sql) === TRUE) { 
			echo "New record created successfully<br>"; 
		} else { 
			echo "Error: " . $sql . "<br>" . $conn->error; 
		}
		
		$conn->close();
	}
	
	function deleteBook($id){
		//sql delete book
	}
	
	function view($user){
		
	}
	
	function viewAllShelves()
	{
		
	}
	
	function borrow($id){
		
	}
	
	function returnBook($id){
		
	}
	
}

class book{
	public $id;
	public $title;
	public $author;
	public $availability;
	
	function __construct($id, $title, $author, $availability){
		$this->id = $id;
		$this->title = $title;
		$this->author = $author;
		$this->availability = $availability;
	}
	
	function display(){
		return "<td>" . $this->id . "</td>";
	}
	
}

class library{
	
}

class shelf{
	public $name;
	public $id;
	
	function __construct($shelfname, $shelfid){
		$this->name = $shelfname;
		$this->id = $shelfid;
	}
	
	function display(){
		return "<th>" . $this->name . "</th>";
	}
	
	
}


?>