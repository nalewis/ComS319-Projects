function Book(id, type) {
	this.id = id;
	this.type = type;
	this.borrowedBy = "";
	this.presence = 1;
}

function User(name, role) {
	this.name = name;
	this.role = role;
	this.borrowedBooks = [];
}

function Shelf(type) {
	this.type = type;
	this.books = [];
}

function Library() {
	this.shelves = [];
	this.books = [];
	this.user;
	
	this.initialize = function(){
		//initialize books
		for(i = 0; i < 20; i++){
			this.books.push(new Book(i, ''));
		}
		for(i = 0; i < 5; i++){
			this.books.push(new Book(i, 'Reference'));
		}
		
		//initialize shelves
		this.shelves = [new Shelf('Art'), new Shelf('Science'), new Shelf('Sport'), new Shelf('Literature')];
		
		for(i = 0; i < this.books.length; i++){
			if(this.books[i].id % 4 == 0){
				for(j = 0; j < this.shelves.length; j++){
					if(this.shelves[j].type == 'Art'){
						this.shelves[j].books.push(this.books[i]);
					}
				}
			}
			if(this.books[i].id % 4 == 1){
				for(j = 0; j < this.shelves.length; j++){
					if(this.shelves[j].type == 'Science'){
						this.shelves[j].books.push(this.books[i]);
					}
				}
			}
			if(this.books[i].id % 4 == 2){
				for(j = 0; j < this.shelves.length; j++){
					if(this.shelves[j].type == 'Sport'){
						this.shelves[j].books.push(this.books[i]);
					}
				}
			}
			if(this.books[i].id % 4 == 3){
				for(j = 0; j < this.shelves.length; j++){
					if(this.shelves[j].type == 'Literature'){
						this.shelves[j].books.push(this.books[i]);
					}
				}
			}		
		}
	}
	
	//create the string to be inserted into the DOM
	this.display = function(){
		var s = "";
		var longest = 0;
		for(i = 0; i < this.shelves.length; i++){
			if(this.shelves[i].books.length > longest){
				longest = this.shelves[i].books.length;
			}
		}

		s += "<tr>";
		s += "<th>Art</th>";
		s += "<th>Science</th>";
		s += "<th>Sport</th>";
		s += "<th>Literature</th>";
		s += "</tr>";
		for(j = 0; j < longest; j++){
			s += "<tr>";
			for(i = 0; i < this.shelves.length; i++){
				s += "<td>";
				if(this.shelves[i].books.length > j){
					if(this.shelves[i].books[j].type == 'Reference'){
						s += "R";
					} else {
						s += "B";
					}
					s += this.shelves[i].books[j].id;
				}
				s += "</td>";
			}
			s += "</tr>"
		}

		//console.log(s);
		return s;
	}
	
	//adds the function that decides the outcome of a user clicking on a table cell
	this.addListeners = function(library){
		var tds = document.getElementsByTagName("td");
		for(var i = 0; i < tds.length; i++){
			tds[i].addEventListener("click", 
				function(){
					var id = this.innerText.substring(1);
					var type = '';
					if(this.innerText.charAt(0) == 'R'){
						type = 'Reference';
					}
					
					for(i = 0; i < library.shelves.length; i++){
						for(k = 0; k < library.shelves[i].books.length; k++){
							//match the correct book object
							if(library.shelves[i].books[k].id == id && type == library.shelves[i].books[k].type){
								//if librarian, display book info, else do undergrad actions
								if(library.user.name == 'admin'){
									if(library.shelves[i].books[k].presence){
										if(type == ""){
											alert("Book ID: " + library.shelves[i].books[k].id + " Type: Book is present on the " + library.shelves[i].type + " shelf.");
										} else {
											alert("Book ID: " + library.shelves[i].books[k].id + " Type: " + type + " is present on the " + library.shelves[i].type + " shelf.");
										}
									} else {
										if(type == ""){
											alert("Book ID: " + library.shelves[i].books[k].id + " Type: Book is checked out from the " + library.shelves[i].type + " shelf by " + library.shelves[i].books[k].borrowedBy + ".");
										} else {
											alert("Book ID: " + library.shelves[i].books[k].id + " Type: " + type + " is checked out from the " + library.shelves[i].type + " shelf by " + library.shelves[i].books[k].borrowedBy + ".");
										}
									}
								} else {
									//check that the book isn't of reference type
									if(library.shelves[i].books[k].type != "Reference"){
										//check that the book is on the shelf
										if(library.shelves[i].books[k].presence){
											//check that the user doesn't already have 2 books checked out
											if(library.user.borrowedBooks.length < 2){
												library.shelves[i].books[k].borrowedBy = library.user.name;
												library.user.borrowedBooks.push(library.shelves[i].books[k]);
												library.shelves[i].books[k].presence = 0;
												//console.log(library.shelves[i].books[k]);
												//console.log(library.user);
												this.style.backgroundColor = "red";
											} else {
												alert("You may not check out more than two books at a time.");
											}
										} else {//otherwise, check if this is a undergrad returning, or if they need to be notified that the book is gone
											if(library.shelves[i].books[k].borrowedBy == library.user.name){
												library.shelves[i].books[k].borrowedBy = '';
												for(m = 0; m < library.user.borrowedBooks.length; m++){
													if(library.user.borrowedBooks[m].id == id){
														library.user.borrowedBooks.splice(m,1);
													}
												}
												library.shelves[i].books[k].presence = 1;
												//console.log(library.shelves[i].books[k]);
												//console.log(library.user);
												this.style.backgroundColor = "white";
											} else {
												alert("Book " + library.shelves[i].books[k].id + " has already been checked out by " + library.shelves[i].books[k].borrowedBy);
											}
										}
									} else {
										alert("Reference books may not be checked out.");
									}
								}
							}
						}
					}
				}, false)
		}
	}
	
	//check the login information and display the library if correct
	this.verifyInput = function(){
		
		if(($("#username").val() == 'admin') && ($("#password").val() == 'admin'))
		{
			document.cookie = ("role=admin");
			$('#libraryDiv').show(100);
			$('#loginDiv').hide(100);
			$("#failure").hide(500);
			
			this.user = new User($("#username").val(), 'admin');
		}
		else if (($("#username").val().substring(0,1).toLowerCase()) == "u")
		{
			document.cookie = ("role=undergraduate");
			$('#libraryDiv').show(100);
			$('#loginDiv').hide(100);
			$("#failure").hide(500);
	
			this.user = new User($("#username").val(), 'undergraduate');
		}
		else
		{
			document.cookie = ("role=; expires=Thu, 01 Jan 2015 00:00:00 UTC");
			$("#failure").show(500);
		} 
	}
	this.logout = function(){
		document.cookie = ("role=; expires=Thu, 01 Jan 2015 00:00:00 UTC");
		$('#libraryDiv').hide(100);
		$('#loginDiv').show(100);
		this.user = '';
	}
}


$(document).ready( function(){
	var library = new Library();
	library.initialize();
	
	document.getElementById("table").innerHTML = library.display();
	library.addListeners(library);
	
	var logButton = document.getElementById("logButton");
	logButton.addEventListener("click", function(){
		library.verifyInput();
	}, false);
	
	var logoutButton = document.getElementById("logoutButton");
	logoutButton.addEventListener("click", function(){
		library.logout();
	}, false);
});
