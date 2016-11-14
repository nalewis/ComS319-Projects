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

if($_REQUEST["action"] == "download"){
	echo json_encode(download());
}

if($_REQUEST["action"] == "getCSRF"){
	echo json_encode(getCSRF());
}

if ($_REQUEST["action"] == "updateCSRF"){
	updateCSRF();
	echo json_encode(getCSRF());
}

if ($_REQUEST["action"] == "validateCSRF") {
	echo json_encode(validateCSRF());
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
	
	if (validateCSRF()){	
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
	} else {
		return ["success" => false, "message" => "Error: CSRF Token has expired. Please reload the page and submit the form again."];
	}
}

//Attempts to delete an item with the given id from the database.	
function deleteItem($idToDelete){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	if (validateCSRF()){	
	
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
	} else {
		return ["success" => false, "message" => "Error: CSRF Token has expired. Please reload the page and submit the form again."];
	}
}

function editItem($id, $name, $quantity, $value){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 
	
	if (validateCSRF()){	
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
	} else {
		return ["success" => false, "message" => "Error: CSRF Token has expired. Please reload the page and submit the form again."];
	}
}

//Attempts to add an item with the given name, quantity, and value to the database.	
function addItem($name, $quantity, $value){
	$username = "dbu319t38"; 
	$password = "!U8refRA"; 
	$dbServer = "mysql.cs.iastate.edu";  
	$dbName   = "db319t38"; 

	if (validateCSRF()){	
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
	} else {
		return ["success" => false, "message" => "Error: CSRF Token has expired. Please reload the page and submit the form again."];
	}
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

function download(){
	/** Include PHPExcel */
	require_once dirname(__FILE__) . '/Excel/PHPExcel.php';
	
	$objPHPExcel = new PHPExcel();
	
	// Set document properties
	$objPHPExcel->getProperties()->setCreator($_SESSION["userInfo"]["userName"])
								->setLastModifiedBy($_SESSION["userInfo"]["userName"])
								->setTitle("Smart Shop Inventory")
								->setSubject("Smart Shop Inventory")
								->setDescription("Inventory outputted from the Smart Shop database.")
								->setKeywords("office PHPExcel php")
								->setCategory("Inventory Data File");
	
	//size the columns appropriately
	$objPHPExcel->getActiveSheet()->getColumnDimension('A')->setWidth(5);
	$objPHPExcel->getActiveSheet()->getColumnDimension('B')->setWidth(18);
	$objPHPExcel->getActiveSheet()->getColumnDimension('C')->setWidth(10);
	$objPHPExcel->getActiveSheet()->getColumnDimension('D')->setWidth(10);
	$objPHPExcel->getActiveSheet()->getColumnDimension('E')->setWidth(20);
	
	//color the title row
	$objPHPExcel->getActiveSheet()
		->getStyle('A1:E1')
		->getFill()
		->setFillType(PHPExcel_Style_Fill::FILL_SOLID)
		->getStartColor()
		->setARGB('FF808080');
	
	//output the titles for the columns
	$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A1', 'ID')
				->setCellValue('B1', 'Name')
				->setCellValue('C1', 'Quantity')
				->setCellValue('D1', 'Value')
				->setCellValue('E1', 'Last Updated');
	
	$items = getItems();
	$i = 2;
	foreach($items as $item){
		//populate the row with values
		$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A'.$i, $item["Id"])
				->setCellValue('B'.$i, $item["Name"])
				->setCellValue('C'.$i, $item["Quantity"])
				->setCellValue('D'.$i, $item["Value"])
				->setCellValue('E'.$i, $item["Updated"]);
		
		//Set the value cell format to currency
		$objPHPExcel->getActiveSheet()
		->getStyle('D'.$i)
		->getNumberFormat()
		->setFormatCode(
			PHPExcel_Style_NumberFormat::FORMAT_CURRENCY_USD_SIMPLE
		);
	
		$i++;
	}
	
	// Set active sheet index to the first sheet, so Excel opens this as the first sheet
	$objPHPExcel->setActiveSheetIndex(0);
	
	$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
	$output = "downloads/" . date("Y-m-d") . "_Inventory.xlsx";
	$objWriter->save($output);
	
	return ["success" => true, "message" => $output];
}

//Recalculates the current and previous CSRF tokens
function updateCSRF()
{
	//If the current minute is >= 30, round down to 30, else, round down to 00
	$minute = (date("i") >= 30) ? "30" : "00";

	//Construct a string of the current date and time rounded to the previous half-hour
	$time = (date("Y-m-d H:") . $minute);

	$past = (new datetime("30 minutes ago"));
	
	$pastMinute = $past->format("i");
	$pastMinute = ($pastMinute >= 30) ? "30" : "00";

	//Create a CSRF token string for the previous 30 minutes with the date, time, and user's username
	$pastCsrfToken = ($past->format("Y-m-d H:") . $pastMinute . " " . $_SESSION["userInfo"]["userName"]);

	//Create a CSRF token string for the current 30 minutes with the date, time, and user's username
	$csrfToken = $time . " " . $_SESSION["userInfo"]["userName"];

	//Return the hashed value of the current and previous CSRF tokens
	$_SESSION["csrf"] = md5($csrfToken);
	$_SESSION["pastCsrf"] = md5($pastCsrfToken);

}

//Returns the current and prevous CSRF tokens without recalculating
function getCSRF()
{
	$return["csrf"] = $_SESSION["csrf"];
	$return["pastCsrf"] = $_SESSION["pastCsrf"];

	return $return;
}

//Checks the current CSRF token against the updated CSRF token
function validateCSRF()
{
	$currentToken = (getCSRF()["csrf"]);

	updateCSRF();

	$updated = getCSRF();


	return ( (($currentToken == $updated["csrf"]) | ($currentToken == $updated["pastCsrf"])) ); 
}
?>
