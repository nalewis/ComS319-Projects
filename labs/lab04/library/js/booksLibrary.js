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

//use push method to add items to array
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
	
	this.display = function(){
		var s = "";
		var longest = 0;
		for(i = 0; i < this.shelves.length; i++){
			if(this.shelves[i].books.length > longest){
				longest = this.shelves[i].books.length;
			}
		}

		//s += "<table id=\"table\" border=2>";
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
		//s += "</table>";

		console.log(s);
		return s;
	}
	
	this.addListeners = function(){
		//current code to attach a handler for users clicking on table cells
		var tds = document.getElementsByTagName("td");
		for(var i = 0; i < tds.length; i++){
			tds[i].addEventListener("click", 
				function(){
					//debug for seeing attributes of 'this';
					/*for(var key in this) {
						console.log(key + ': ' + this[key]);
					}*/
					var id = this.innerText.substring(1);
					
					console.log(id);
					for(i = 0; i < library.shelves.length; i++){
						for(k = 0; k < library.shelves[i].books.length; k++){
							if(library.shelves[i].books[k].id == id){
								if(library.shelves[i].books[k].presence && library.shelves[i].books[k].type != "Reference"){
									//TODO add borrowed by logic
									library.shelves[i].books[k].presence = 0;
									console.log(library.shelves[i].books[k]);
									this.style.backgroundColor = "red";
								}
							}
						}
					}
				}, false)
		}
	}
	
	this.verifyInput = function(){
		
		if(($("#username").val() == 'admin') && ($("#password").val() == 'admin'))
		{
			document.cookie = ("role=admin");
			$('#libraryDiv').show(100);
			$('#loginDiv').hide(100);
			$("#failure").hide(500);
			var user = new User($("#username").val(), 'admin');
			//window.location = "./index.html?User="+user;
		}
		else if (($("#username").val().substring(0,1).toLowerCase()) == "u")
		{
			document.cookie = ("role=undergraduate");
			$('#libraryDiv').show(100);
			$('#loginDiv').hide(100);
			$("#failure").hide(500);
	
			var user = new User($("#username").val(), 'undergraduate');
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
	console.log(JSON.stringify(library));
	
	document.getElementById("table").innerHTML = library.display();
	library.addListeners();
	
	var logButton = document.getElementById("logButton");
	logButton.addEventListener("click", function(){
		library.verifyInput();
	}, false);
	
	var logoutButton = document.getElementById("logoutButton");
	logoutButton.addEventListener("click", function(){
		library.logout();
	}, false);
	

	
	
});
