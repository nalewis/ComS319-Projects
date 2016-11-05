<?php

class student{
	public $isLibrarian;
	public $username;
	public $firstName;
	
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
	
	function getHistory($targetUsername)
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
	
		$sql = "SELECT * from " . $dbName . ".loanHistory WHERE UserName = \"" . $targetUsername . "\" ORDER BY ReturnedDate ASC";	

		$result = $conn->query($sql);
		
		if ($result->num_rows > 0)
		{
			
			$historyTable = "<table border=2 ><tr><th>Book ID</th><th>Due Date</th><th>Returned Date</th></tr>";
			
			while ($row = $result->fetch_assoc())
			{
				$historyTable .= ( "<tr><td>" . $row["BookId"] . "</td><td>" . $row["DueDate"] . "</td><td>" . ($row["ReturnedDate"] ? $row["ReturnedDate"] : "Not yet returned") . "</td></tr>");
			}
			$historyTable .= "</table>";

			$conn->close();
			return ["success" => true, "historyTable" => $historyTable];
		} else {
			$conn->close();
			return ["success" => false, "message" => "No history returned for specified user."];
		} 
	}
	
	function isBorrower($id)
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
	
		$sql = "SELECT * from loanHistory WHERE UserName = '" . $_SESSION["userInfo"]["userName"] . "' AND BookId = '" . $id . "'";
	
		$result = $conn->query($sql);
	
		if ($result->num_rows > 0)
		{
			while($row = $result->fetch_assoc()) {
				if(is_null($row["ReturnedDate"])){
					$conn->close();
					return ["success" => true];
				}
			}
			$conn->close();
			return ["success" => false];
		} else {
			$conn->close();
			return ["success" => false];
		} 
	}
	
	function borrowBook($id){
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
	
		$sql = "UPDATE books SET Availability = '0' WHERE BookId = " . $id;
	
		$conn->query($sql);
		
		$sql = "Insert INTO loanHistory (UserName, BookId, DueDate) VALUES ('" . $_SESSION["userInfo"]["userName"] . "', '" . $id . "', '" . date('Y-m-d', strtotime("+30 days")) . "')";
		if ($conn->query($sql) === TRUE) {
			return ["success" => true];
		} else {
			return ["success" => false];
		}
	}
	
	function returnBook($id){
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
	
		$sql = "UPDATE books SET Availability = '1' WHERE BookId = " . $id;
	
		$conn->query($sql);
	
		$sql = "UPDATE loanHistory SET ReturnedDate = '" . date('Y-m-d') . "' WHERE BookId = '" . $id . "'";
		if ($conn->query($sql) === TRUE) {
			return ["success" => true];
		} else {
			return ["success" => false];
		}
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

	function updateDisplay(){
		$shelves = self::getShelves();
		$books = self::getBooks();
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
		return $table;
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
