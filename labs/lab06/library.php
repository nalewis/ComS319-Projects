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

<div id="posts">
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