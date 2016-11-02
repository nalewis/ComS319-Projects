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

class student{
	public $isLibrarian;
	
	function addBook($id, $title, $author){
		//sql add to not full shelf
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
	
	
	function display(){
		
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