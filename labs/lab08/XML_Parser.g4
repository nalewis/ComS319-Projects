
lexer grammar XML_Parser;

fragment DIGIT: [0123456789];
NUMBER: DIGIT+ { System.out.println("found number: " + getText()); };

fragment ALPHA: [a-zA-Z] ;
    

// 1. fragment keyword in front on lexical rule means that
//    rule can now be used in OTHER lexical rules! see how
//    NUMBER rule uses the fragment rule DIGIT!
// 2. The placement of fragment rule does not really matter.
//    It could be after the place where it is used.


fragment START: '<' (ALPHA | DIGIT)+ '>';
fragment STOP: '</' (ALPHA | DIGIT)+ '>';

PATH: START ( ALPHA | DIGIT )* STOP
	{System.out.println("NICK::: " + getText());};