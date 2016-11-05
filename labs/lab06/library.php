<?php
	session_start();
	//include("classes.php");
	//include("functions.php");
	
?>

<HTML>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<?php //var_dump($_SESSION); ?>

<?php if($_SESSION["userInfo"]["Librarian"] == '1'){ ?>
<div id="options">
	<h2>Librarian options:</h2>
	<div id = "addForm">
		<h3>Add a Book</h3>
			<b>Book Id:</b> <input type="text" id="bookId"><br>
			<b>Author:</b> <input type="text" id="author"><br>
			<b>Title:</b> <input type="text" id="title"><br>
			<b>Shelf:</b> <select id="shelves">
				<option value="0">Art</option>
				<option value="1">Science</option>
				<option value="2">Sport</option>
				<option value="3">Literature</option>
			</select><br>
		<button id="addBook" type="button">Add Book</button>
	</div>
	<div id = "deleteForm">
		<h3>Delete a Book</h3>
		<b>Book ID:</b> <input type = "text" id = "deletebookid">
		<button id = "deleteSubmit">Delete Book</button>
		<div id="deleteStatusMessage"></div>
	</div>
	<div id = "historyForm">
		<h3>View Borrow History</h3>
			<b>Username:</b> <input type = "text" id = "targetUsername">
			<button id = "historySubmit">View Borrow History</button>
	</div>
	<br>

</div>
<?php } else { ?>
<div id="options">
	<h2>Student options:</h2>
	<div id = "borrowForm">
		<h3>Borrow a Book</h3>
			<b>Book ID:</b> <input type = "text" id = "borrowbookid">
			<button id = "borrowSubmit">Borrow Book</button>
			<div id="borrowStatusMessage"></div>
	</div>
	<div id = "returnForm">
		<h3>Return a book</h3>
			<b>Book ID:</b> <input type = "text" id = "returnbookid">
			<button id = "returnSubmit">Return Book</button>
			<div id="returnStatusMessage"></div>
	</div>
	<br>
</div>

<?php } ?>
<div id="posts">
	<table id="table" border=2></table>
</div>
<br><br>

<div id"bookInfo">
	<h3>Book Info</h3>
	<b>Book Id:</b> <span id="infoId"></span><br>
	<b>Title:</b> <span id="infoTitle"></span><br>
	<b>Author:</b> <span id="infoAuthor"></span><br>
	<b>Available:</b> <span id="infoAvailable"></span>
</div>

<br><br>
<button type="button" onclick="window.location.href = 'logout.php'">Logout</button>

</body>
</HTML>

<script>
	$('#addBook').click(function(){
		if($.isNumeric($("#bookId").val()) && $("#bookId").val() != "" && $("#author").val() != "" && $("#title").val() != ""){
			$.post("functions.php", {action: "addBook", bookId: $("#bookId").val(), author: $("#author").val(), title: $('#title').val(), shelf: $('#shelves').val()}, 
					function(data){
						update();
						clearMessages();
						$("#bookId").val("");
						$("#author").val("");
						$("#title").val("");
						addListeners();
					});
		}
	});
	
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
	
	$("#historySubmit").click( function(){
		$.post("functions.php", {action: "history", username: $("#targetUsername").val()},
			function(data){
				//success function here
			});
	});
	
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
							$("#infoAvailable").text(data["availability"]);
						});
					}
				}, false);
		}
	}
	
	function update(){
		$.post("functions.php", {action: "display"},
			function(data){
				clearMessages();
				document.getElementById("table").innerHTML = data;
			});
	}
	
	function clearMessages(){
		$("#deleteStatusMessage").empty();
		$("#borrowStatusMessage").empty();
		$("#returnStatusMessage").empty();
	}
	
	$("#table").one("click", function(){addListeners()});
	
$(function() {
    update();
});
</script>
