$(document).ready( function(){
	function Book(id, type) {
		this.id = id;
		this.type = type;
		this.borrowedBy = "";
		this.presence = 1;
	}
	
	//use push method to add items to array
	function Shelf(type) {
		this.type = type;
		this.books = [];
	}
	
	function Library() {
		this.shelves;
		this.initialize = function(shelves, books){
			this.shelves = shelves;
			for(i = 0; i < books.length; i++){
				if(books[i].id % 4 == 0){
					for(j = 0; j < this.shelves.length; j++){
						if(this.shelves[j].type == 'Art'){
							this.shelves[j].books.push(books[i]);
						}
					}
				}
				if(books[i].id % 4 == 1){
					for(j = 0; j < this.shelves.length; j++){
						if(this.shelves[j].type == 'Science'){
							this.shelves[j].books.push(books[i]);
						}
					}
				}
				if(books[i].id % 4 == 2){
					for(j = 0; j < this.shelves.length; j++){
						if(this.shelves[j].type == 'Sport'){
							this.shelves[j].books.push(books[i]);
						}
					}
				}
				if(books[i].id % 4 == 3){
					for(j = 0; j < this.shelves.length; j++){
						if(this.shelves[j].type == 'Literature'){
							this.shelves[j].books.push(books[i]);
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
						for(var key in this) {
							console.log(key + ': ' + this[key]);
						}
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
	}


	//initialize the objects for the library
	var bookArray = [];
	for(i = 0; i < 20; i++){
		bookArray.push(new Book(i, ''));
	}
	for(i = 0; i < 5; i++){
		bookArray.push(new Book(i, 'Reference'));
	}
	
	var artShelf = new Shelf('Art');
	var sciShelf = new Shelf('Science');
	var sportShelf = new Shelf('Sport');
	var litShelf = new Shelf('Literature');
	var shelfArray = [artShelf, sciShelf, sportShelf, litShelf];
	var library = new Library();
	
	library.initialize(shelfArray, bookArray);
	console.log(JSON.stringify(library));
	
	document.getElementById("table").innerHTML = library.display();
	library.addListeners();
	
	
});
