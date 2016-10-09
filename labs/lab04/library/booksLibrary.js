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

		s += "<table border=2>";
		s += "<tr>";
		s += "<td>Art</td>";
		s += "<td>Science</td>";
		s += "<td>Sport</td>";
		s += "<td>Literature</td>";
		s += "</tr>";
		for(j = 0; j < longest; j++){
			s += "<tr>";
			for(i = 0; i < this.shelves.length; i++){
				s += "<td>";
				if(this.shelves[i].books.length > j){
					s += this.shelves[i].books[j].id;
				}
				s += "</td>";
			}
			s += "</tr>"
		}
		s += "</table>";

		
		console.log(s);
		return s;
	}
}

var book1 = new Book(1, 'Reference');
var book2 = new Book(2, 'Reference');
var book3 = new Book(3, 'Reference');
var book4 = new Book(4, 'Reference');
var book5 = new Book(5, 'Reference');
var artShelf = new Shelf('Art');
var sciShelf = new Shelf('Science');
var sportShelf = new Shelf('Sport');
var litShelf = new Shelf('Literature');
var bookArray = [book1, book2, book3, book4, book5];
var shelfArray = [artShelf, sciShelf, sportShelf, litShelf];
var library = new Library();

library.initialize(shelfArray, bookArray);
console.log(JSON.stringify(library));