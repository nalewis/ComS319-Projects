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
	<h3>Librarian options:</h3>
	<div id = "addForm">
		<h4>Add a Book</h4>
			Book Id: <input type="text" id="bookId"><br>
			Author: <input type="text" id="author"><br>
			Title: <input type="text" id="title"><br>
			Shelf: <select id="shelves">
				<option value="0">Art</option>
				<option value="1">Science</option>
				<option value="2">Sport</option>
				<option value="3">Literature</option>
			</select><br>
		<button id="addBook" type="button">Add Book</button>
	</div>
	<div id = "deleteForm">
		<h4>Delete a Book</h4>
		Book ID:<input type = "text" id = "bookid">
		<button id = "deleteSubmit">Delete Book</button>
		<div id="deleteStatusMessage"></div>
	</div>
	<div id = "historyForm">
		<h4>View Borrow History</h4>
			Username:<input type = "text" id = "targetUsername">
			<button id = "historySubmit">View Borrow History</button>
	</div>

</div>
<?php } else { ?>
<div id="options">
	<h3>Student options:</h3>
	<div id = "borrowForm">
		<h4>Borrow a Book</h4>
			Book ID:<input type = "text" id = "borrowbookid">
			<button id = "borrowSubmit">Borrow Book</button>
	</div>
	<div id = "returnForm">
		<h4>Return a book</h4>
			Book ID:<input type = "text" id = "returnbookid">
			<button id = "returnSubmit">Return Book</button>
	</div>

</div>

<?php } ?>
<div id="posts">
	<table id="table" border=2></table>
</div>
<br><br>

<div id"bookInfo">
	<h4>Book Info</h4>
	Book Id: <span id="infoId"></span><br>
	Title: <span id="infoTitle"></span><br>
	Author: <span id="infoAuthor"></span><br>
	Available: <span id="infoAvailable"></span>
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
						$("#bookId").val("");
						$("#author").val("");
						$("#title").val("");
						addListeners();
					});
		}
	});
	
	$("#borrowSubmit").click(function(){
		var id = $("#borrowbookid").val();
		if($.isNumeric(id)){
			$.post("functions.php", {action: "checkAvailable", id: id}, 
				function(json){
					var data = JSON.parse(json);
					console.log(data);
					console.log(data["success"]);
					if(data["success"] == true){
						//console.log("success");
						$.post("functions.php", {action: "borrow", id: id}, 
							function(json){
								var data = JSON.parse(json);
								//TODO popup message?
								console.log(json["success"]);
								$("#borrowbookid").val("");
							});
					} else {
						console.log("fail");
					}
				});
		}		
	});
	
	$("#returnSubmit").click(function(){
		var id = $("#returnbookid").val();
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
											console.log(data["success"]);
											$("#returnbookid").val("");
										
										});
								}
							});
					} else {
						console.log("fail");
					//	return false;
					}
				});
		}		
	});
	
	$("#deleteSubmit").click( function(){
		if ($("#bookid").val() != "")
		{
			$.post("functions.php", {action: "deleteBook", id: $("#bookid").val()},
			function(data){
				$dataJson = $.parseJSON(data);

				if ($dataJson.success)
				{
					$("#deleteStatusMessage").text("Book " + $("#bookid").val() + " deleted.");
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
				document.getElementById("table").innerHTML = data;
			});
	}
	
	$("#table").one("click", function(){addListeners()});
	
$(function() {
    update();
});
</script>
