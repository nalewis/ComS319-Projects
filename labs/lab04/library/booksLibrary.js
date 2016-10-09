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
}

function initializeLibrary(library, shelves, books) {
	library.shelves = shelves;
	for(i = 0; i < books.length; i++){
		if(books[i].id % 4 == 0){
			for(j = 0; j < library.shelves.length; j++){
				if(library.shelves[j].type == 'Art'){
					library.shelves[j].books.push(books[i]);
				}
			}
		}
		if(books[i].id % 4 == 1){
			for(j = 0; j < library.shelves.length; j++){
				if(library.shelves[j].type == 'Science'){
					library.shelves[j].books.push(books[i]);
				}
			}
		}
		if(books[i].id % 4 == 2){
			for(j = 0; j < library.shelves.length; j++){
				if(library.shelves[j].type == 'Sport'){
					library.shelves[j].books.push(books[i]);
				}
			}
		}
		if(books[i].id % 4 == 3){
			for(j = 0; j < library.shelves.length; j++){
				if(library.shelves[j].type == 'Literature'){
					library.shelves[j].books.push(books[i]);
				}
			}
		}		
	}
	return library;
}

var book1 = new Book(1, 'Reference');
var artShelf = new Shelf('Art');
var sciShelf = new Shelf('Science');
var sportShelf = new Shelf('Sport');
var litShelf = new Shelf('Literature');
var bookArray = [book1];
var shelfArray = [artShelf, sciShelf, sportShelf, litShelf];
var library = new Library();

console.log(JSON.stringify(initializeLibrary(library, shelfArray, bookArray)));