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
<?php var_dump($_SESSION); ?>

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
	</div>
	<div id = "historyForm">
		<h4>View Borrow History</h4>
			Username:<input type = "text" id = "targetUsername">
			<button id = "historySubmit">View Borrow History</button>
	</div>

</div>
<?php } ?>

<div id="posts">
	<table id="table" border=2></table>
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
					});
		}
	});
	
	$("#deleteSubmit").click( function(){
		$.post("library.php", {type: "deleteBook", id: $("#bookid").val()},
			function(){
				//success function here
			});
	});
	
	$("#historySubmit").click( function(){
		$.post("library.php", {type: "history", title: $("#targetUsername").val()},
			function(){
				//success function here
			});
	});
	
	function addListener(){
		var tds = document.getElementsByTagName("td");
		for(var i = 0; i < tds.length; i++){
			tds[i].addEventListener("click", 
				function(){
					var id = this.innerText.substring(0);
				}, false);
		}
	}
	
	function update(){
		$.post("functions.php", {action: "display"},
			function(data){
				document.getElementById("table").innerHTML = data;
			});
	}
	
$(function() {
    update();
});
</script>
