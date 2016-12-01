
lexer grammar XML_Parser;

//###############FRAGMENTS################

fragment DIGIT: [0123456789];
fragment ALPHA: [a-zA-Z] ;
fragment UNDER: '_';
fragment SYMBOLS: [-_.];
fragment SPECIALCHARS: [-_~!$&'()*+,;=:];
fragment AT: '@';
fragment SLASH: '/';

fragment START: '<';
fragment STOP: '</' (ALPHA | DIGIT)+ '>';

fragment STARTEMAIL: '<EMAIL>';
fragment EMAIL: (ALPHA | DIGIT | SPECIALCHARS)(~('.')(ALPHA | DIGIT | SPECIALCHARS | '.')~('.'))+(ALPHA | DIGIT | SPECIALCHARS) AT (ALPHA | DIGIT | '-' | '.')+;
fragment ENDEMAIL: '</EMAIL>';

fragment STARTDATE: '<DATE>';
fragment DATE: ([1-2]?[0-9] | '3'[0-1]) SLASH ([1][0-2] | [1-9]) SLASH ('2''0'[0-9][0-9] | '2''1''0''0');
fragment ENDDATE: '</DATE>';

fragment STARTPHONE: '<PHONE>';
fragment PHONE: ([0-9][0-9][0-9]'-'[0-9][0-9][0-9]'-'[0-9][0-9][0-9][0-9] | '('[0-9][0-9][0-9]')'' '[0-9][0-9][0-9]'-'[0-9][0-9][0-9][0-9] | [0-9][0-9][0-9]' '[0-9][0-9][0-9]' '[0-9][0-9][0-9][0-9] | [0-9][0-9][0-9]'.'[0-9][0-9][0-9]'.'[0-9][0-9][0-9][0-9]); 
fragment ENDPHONE: '</PHONE>';

fragment STARTCREDIT: '<CREDITCARD>';
//TODO
fragment CREDIT: DIGIT+;
fragment ENDCREDIT: '</CREDITCARD>';

fragment OTHERSTART: '<' (~('x')~('m')~('l')(ALPHA | UNDER))(ALPHA | DIGIT | SYMBOLS)* '>';
fragment OTHEREND: '</' (~('x')~('m')~('l')(ALPHA | UNDER))(ALPHA | DIGIT | SYMBOLS)* '>';

//fragment ELEMENT: '<'(?:(?!xml)(?!XML)(?!Xml))(ALPHA | '_')[a-zA-Z0-9-_.]* '>';
//fragment ELEMENT: (ALPHA | '_')[a-zA-Z0-9-_.]* '>';

//################RULES###################

ELEMEMAIL: STARTEMAIL EMAIL ENDEMAIL {System.out.println("Valid email found " + getText());};
ELEMDATE: STARTDATE DATE ENDDATE {System.out.println("Valid Date found " + getText());};
ELEMPHONE: STARTPHONE PHONE ENDPHONE {System.out.println("Valid Phone number found " + getText());};
ELEMCREDIT: STARTCREDIT CREDIT ENDCREDIT {System.out.println("Credit Card found " + getText());};
ELEMOTHER: OTHERSTART (ALPHA | DIGIT | SPECIALCHARS | ' ')+ OTHEREND {System.out.println("Element found " + getText());};
	

WS: [ \r\n\t]+ {skip();};