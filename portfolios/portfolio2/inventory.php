<?php
	session_start();
?>

<HTML>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="tablesorter/jquery.tablesorter.js"></script><!--http://tablesorter.com/docs/index.html-->
<link rel="stylesheet" type="text/css" href="tablesorter/themes/blue/style.css">
<link rel="stylesheet" type="text/css" href="css/app.css">
</head>
<body>
	
<h1>Smart Shop Inventory Management System</h1>

<ul class="funcSelect" id="funcSelect">
	<li><a id="newProd">New Product</a></li>
	<li><a id="editProd">Edit Product</a></li>
	<li><a id="deleteProd">Delete Product</a></li>
	<li><span><?= "Logged in as " . $_SESSION["userInfo"]["userName"] ?></span></li>
	<li><a href="logout.php">Logout</a></li>
</ul>

<div id="inventory">
	<table id="table" class="tablesorter" border=2>
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Quantity</th>
				<th>Value</th>
				<th>Last Updated</th>
			</tr>
		</thead>
		<tbody id="tbod">
		</tbody>
	</table>
</div>
<br>

<div id = "newForm" style="display: none;">
	<fieldset>
		<legend><b>Add New Product</b></legend>
	
		<b>Name:</b> <input type="text" id="newName"><br>
		<b>Quantity:</b> <input type="text" id="newQuantity"><br>
		<b>Value:</b> $<input type="text" id="newValue"><br><br>
	
		<button id="newItem" type="button">Add Product</button>
	</fieldset>
</div>

<div id = "editForm" style="display: none;">
	<fieldset>
		<legend><b>Update Product</b></legend>
	
		<b>Product ID:</b> <input type="text" id="editID"><br>
		<b>Name:</b> <input type="text" id="editName"><br>
		<b>Quantity:</b> <input type="text" id="editQuantity"><br>
		<b>Value:</b> $<input type="text" id="editValue"><br><br>
		
		<button id="editItem" type="button">Update Product</button>
	</fieldset>
</div>

<div id = "deleteForm" style="display: none;">
	<fieldset>
		<legend><b>Add New Product</b></legend>	
	
		<b>Product ID:</b> <input type="text" id="deleteID"><br><br>
	
		<button id="deleteItem" type="button">Remove Product</button>
	</fieldset>
</div>	

</body>
</HTML>

<script>

	$("#newProd").click(function(){
		$("#newForm").show();
		$("#editForm").hide();
		$("#deleteForm").hide();
	});
	
	$("#editProd").click(function(){
		$("#newForm").hide();
		$("#editForm").show();
		$("#deleteForm").hide();
	});
	
	$("#deleteProd").click(function(){
		$("#newForm").hide();
		$("#editForm").hide();
		$("#deleteForm").show();
	});

	$('#editItem').click(function(){
		if($.isNumeric($("#editID").val()) && $("#editID").val() != "" && $.isNumeric($("#editQuantity").val()) && $("#editQuantity").val() != "" && $("#editName").val() != "" && $("#editValue").val() != "" && $.isNumeric($("#editValue").val())){
			$.post("functions.php", {action: "editItem", id: $("#editID").val(), name: $("#editName").val(), quantity: $("#editQuantity").val(), value: $('#editValue').val()}, 
					function(data){
						update();
						//clearMessages();
						$("#editID").val("");
						$("#editName").val("");
						$("#editQuantity").val("");
						$("#editValue").val("");
					});
		}
	});
	
	$('#newItem').click(function(){
		if($.isNumeric($("#newQuantity").val()) && $("#newQuantity").val() != "" && $("#newName").val() != "" && $("#newValue").val() != "" && $.isNumeric($("#newValue").val())){
			$.post("functions.php", {action: "newItem", name: $("#newName").val(), quantity: $("#newQuantity").val(), value: $('#newValue').val()}, 
					function(data){
						update();
						//clearMessages();
						$("#newName").val("");
						$("#newQuantity").val("");
						$("#newValue").val("");
					});
		}
	});
	
	$('#deleteItem').click(function(){
		if($.isNumeric($("#deleteID").val()) && $("#deleteID").val() != "" ){
			$.post("functions.php", {action: "deleteItem", id: $("#deleteID").val()}, 
					function(data){
						update();
						//clearMessages();
						$("#deleteID").val("");
					});
		}
	});
	
	//When the "Borrow Book" button is pressed, attempt to borrow the book with the entered id.
	$("#borrowSubmit").click(function(){
		var id = $("#borrowbookid").val();
		clearMessages();
		if($.isNumeric(id)){
			$.post("functions.php", {action: "checkAvailable", id: id}, 
				function(json){
					var data = JSON.parse(json);
					if(data["success"] == true){
						$.post("functions.php", {action: "borrow", id: id}, 
							function(json){
								var data = JSON.parse(json);
								$("#borrowStatusMessage").text("Successfully borrowed book.");
								$("#borrowbookid").val("");
							});
					} else {
						$("#borrowStatusMessage").text("Unable to borrow specified book.");
					}
				});
		}		
	});

	//When the "Return book" buttion is pressed, attempt to return the book with the entered id.	
	$("#returnSubmit").click(function(){
		var id = $("#returnbookid").val();
		clearMessages();
		if($.isNumeric(id)){
			//Check if book is already checked out
			$.post("functions.php", {action: "checkAvailable", id: id}, 
				function(json){
					var data = JSON.parse(json);
					if(data["success"] != true){
						//Check if the current user is the borrower of the book
						$.post("functions.php", {action: "isBorrower", id: id}, 
							function(json){
								var data = JSON.parse(json);
								//Return the book
								if(data["success"] == true){
									$.post("functions.php", {action: "return", id: id}, 
										function(json){
											var data = JSON.parse(json);
											$("#returnStatusMessage").text("Book successfully returned.");
											$("#returnbookid").val("");
										
										});
								} else {
									$("#returnStatusMessage").text("Unable to return the specified book");
								}
							});
					} else {
						$("#returnStatusMessage").text("Unable to return the specified book");
					}
				});
		}		
	});
	
	//When the "Delete Book" button is pressed, remove the book from the database.
	$("#deleteSubmit").click( function(){
		clearMessages();
		if ($("#deletebookid").val() != "")
		{
			$.post("functions.php", {action: "deleteBook", id: $("#deletebookid").val()},
			function(data){
				console.log(data);
				$dataJson = $.parseJSON(data);
				if ($dataJson.success)
				{
					update();
					$("#deletebookid").val("");
					$("#deleteStatusMessage").text("Book " + $("#deletebookid").val() + " deleted.");
				} else {
					$("#deleteStatusMessage").text($dataJson.message);
				}
			});
		}
	});

	//When the "View Borrow History" button is pressed, get the entered user's history from the database.	
	$("#historySubmit").click( function(){
		if ($("#targetUsername").val() != "")
		{
			$.post("functions.php", {action: "history", username: $("#targetUsername").val()},
				function(data){
					parsedResponse = $.parseJSON(data);
					if (parsedResponse.success){
						$("#historyView").html((parsedResponse.historyTable));
					} else {
						$("#historyView").text(parsedResponse.message);
					}
				});
		}
	});
	
	//Adds event listeners to support clicking on a book id to view the book information.
	function addListeners(){
		$("td").off();
		var tds = $("td");
		for(var i = 0; i < tds.length; i++){
			tds[i].addEventListener("click", 
				function(){
					var id = this.innerText.substring(0);
					if(id != ""){
						$.post("functions.php", {action: "getBook", id: id}, 
						function(json){
							var data = JSON.parse(json);
							$("#infoId").text(data["id"]);
							$("#infoTitle").text(data["title"]);
							$("#infoAuthor").text(data["author"]);
							$("#infoAvailable").text( ((data["availability"] == "1") ? "Yes" : "No") );
						});
					}
				}, false);
		}
	}

	//Hides the status messages and refreshes the shelves table.	
	function update(){
		$.post("functions.php", {action: "display"},
			function(data){
				clearMessages();
				document.getElementById("tbod").innerHTML = data;
				$("#table").trigger("update");
				//addListeners();
			});
	}

	//Resets all of the status messages.	
	function clearMessages(){
		$("#deleteStatusMessage").empty();
		$("#borrowStatusMessage").empty();
		$("#returnStatusMessage").empty();
	}
	
	//$("#table").one("click", function(){addListeners()});
	
$(function() {
	$("#table").tablesorter();
    update();
});
</script>
