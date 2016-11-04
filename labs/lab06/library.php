<?php
	session_start();
	include("classes.php");
	
function updateDisplay(){
	
	//var_dump(getShelves());
	$shelves = getShelves();
	$books = getBooks();
	//var_dump($books);
	//var_dump($shelves[1]->display());
	$table = "<table border=\'2\'><tr>";
	foreach($shelves as $shelf){
		$table .= $shelf->display();
	}
	$table .= "</tr>";
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
	$table .= "</table>";
	echo $table;

}
?>

<HTML>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
</head>
<body>
<?php var_dump($_SESSION); ?>
<!-- TODO: Hide the options div if the user isn't a librarian -->
<div id="options">
	<h3>Librarian options:</h3>
	<div id = "addForm">
		<h4>Add a Book</h4>
			Book title:<input type = "text" id="title">
			Book author:<input type = "text" id="author">
			<button id = "addSubmit">Add Book</button>
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
<div id="posts">
	<h4>Shelves</h4>
	<?= updateDisplay(); ?>
</div>
<br><br>

<?php if($_SESSION["userInfo"]["Librarian"] == '1'){
	echo "Book Id: <input type=\"text\" id=\"bookId\"><br>";
	echo "Author: <input type=\"text\" id=\"author\"><br>";
	echo "Title: <input type=\"text\" id=\"title\"><br>";
	echo "Shelf: <select id=\"shelves\">
			<option value=\"0\">Art</option>
			<option value=\"1\">Science</option>
			<option value=\"2\">Sport</option>
			<option value=\"3\">Literature</option>
		</select><br>";
	echo "<button id=\"addBook\" type=\"button\">Add Book</button>";
} ?>

<br><br>
<button type="button" onclick="window.location.href = 'logout.php'">Logout</button>

</body>
<script>
$(



);

$('#addBook').click(function(){
	if($("#bookId").val != "" && $("#author").val != "" && $("#title").val != ""){
		$.post("functions.php", {action: "addBook", bookId: $("#bookId").val(), author: $("#author").val(), title: $('#title').val(), shelf: $('#shelves').val()}, 
				function(data){
					console.log(data);
					//window.location.href = "login.html";
				});
	}
});
</script>
</HTML>

<script>
	$("#addSubmit").click( function(){
		$.post("library.php", {type: "addBook", title: $("#title").val(), author: $("#author").val()},
			function(){
				//success function here
			});
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
</script>
