
lexer grammar JSON_Parser;

//###############FRAGMENTS################

fragment DIGIT: [0123456789];
fragment ALPHA: [a-zA-Z] ;
fragment UNDER: '_';
fragment SYMBOLS: [-_.];
fragment SPECIALCHARS: [-_~!$&'()*+,;=:];
fragment AT: '@';
fragment SLASH: '/';
fragment QUOTE: '"';
fragment COMMA: [,];
fragment NEWLINE: [\n];


fragment START: '{';
fragment STOP: '}';

fragment STARTEMAIL: '\"EMAIL\":';
fragment EMAIL: (ALPHA | DIGIT | AT)*;
//Trying a really easy email rule to try to figure out why it's not matching
//fragment EMAIL: (ALPHA | DIGIT | SPECIALCHARS)(~('.')(ALPHA | DIGIT | SPECIALCHARS | '.')~('.'))+(ALPHA | DIGIT | SPECIALCHARS) AT (ALPHA | DIGIT | '-' | '.')+;
fragment ENDEMAIL: ',';

fragment STARTDATE: '"DATE":';
fragment DATE: (QUOTE ([1-2]?[0-9] | '3'[0-1]) SLASH ([1][0-2] | [1-9]) SLASH ('2''0'[0-9][0-9] | '2''1''0''0') QUOTE);
fragment ENDDATE: ',';

fragment STARTPHONE: '"PHONE":';
fragment PHONE: (QUOTE ([0-9][0-9][0-9]'-'[0-9][0-9][0-9]'-'[0-9][0-9][0-9][0-9] | '('[0-9][0-9][0-9]')'' '[0-9][0-9][0-9]'-'[0-9][0-9][0-9][0-9] | [0-9][0-9][0-9]' '[0-9][0-9][0-9]' '[0-9][0-9][0-9][0-9] | [0-9][0-9][0-9]'.'[0-9][0-9][0-9]'.'[0-9][0-9][0-9][0-9]) QUOTE); 
fragment ENDPHONE: ',';

fragment STARTCREDIT: '<CREDITCARD>';
//TODO
fragment CREDIT: DIGIT+;
fragment ENDCREDIT: '</CREDITCARD>';

fragment OTHERSTART: ["](ALPHA | DIGIT | SPECIALCHARS | ' ')+["][:];
fragment OTHER: (QUOTE (ALPHA | DIGIT | SPECIALCHARS | ' ')+ QUOTE);
fragment OTHEREND: ',';

//fragment ELEMENT: '<'(?:(?!xml)(?!XML)(?!Xml))(ALPHA | '_')[a-zA-Z0-9-_.]* '>';
//fragment ELEMENT: (ALPHA | '_')[a-zA-Z0-9-_.]* '>';

//################RULES###################

ELEMEMAIL: STARTEMAIL EMAIL ENDEMAIL {System.out.println("Valid email found " + getText());};
ELEMEMAILINV: STARTEMAIL .*? ENDEMAIL {System.out.println("Invalid email found " + getText());};

ELEMDATE: STARTDATE DATE ENDDATE {System.out.println("Valid Date found " + getText());};
ELEMDATEINV: STARTDATE .*? ENDDATE {System.out.println("Invalid Date found " + getText());};

ELEMPHONE: STARTPHONE PHONE ENDPHONE {System.out.println("Valid Phone number found " + getText());};
ELEMPHONEINV: STARTPHONE .*? ENDPHONE {System.out.println("Invalid Phone number found " + getText());};

ELEMCREDIT: STARTCREDIT CREDIT ENDCREDIT {System.out.println("Valid credit card found " + getText());};
ELEMCREDITINV: STARTCREDIT .*? ENDCREDIT {System.out.println("Invalid credit card found " + getText());};

ELEMOTHER: OTHERSTART  OTHEREND {System.out.println("Valid Element found " + getText());};
ELEMOTHERINV: OTHERSTART .*? OTHEREND {System.out.println("Invalid element found " + getText());};

INVALID: '<'.*?'>'.*?'<''/'.*?'>' {System.out.println("Invalid element found " + getText());};

WS: [ \r\n\t]+ {skip();};
