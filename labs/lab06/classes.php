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