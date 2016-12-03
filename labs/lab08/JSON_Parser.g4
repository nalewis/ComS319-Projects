
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

fragment STARTEMAIL: '"EMAIL":';
//fragment EMAIL: (ALPHA | DIGIT | AT)*;
//Trying a really easy email rule to try to figure out why it's not matching
fragment EMAIL: (ALPHA | DIGIT | SPECIALCHARS)(~('.')(ALPHA | DIGIT | SPECIALCHARS | '.')~('.'))+(ALPHA | DIGIT | SPECIALCHARS) AT (ALPHA | DIGIT | '-' | '.')+;
fragment ENDEMAIL: ',';

fragment STARTDATE: '"DATE":';
fragment DATE: (([1-2]?[0-9] | '3'[0-1]) SLASH ([1][0-2] | [1-9]) SLASH ('2''0'[0-9][0-9] | '2''1''0''0'));
fragment ENDDATE: ',';

fragment STARTPHONE: '"PHONE":';
fragment PHONE: ([0-9][0-9][0-9]'-'[0-9][0-9][0-9]'-'[0-9][0-9][0-9][0-9] | '('[0-9][0-9][0-9]')'' '[0-9][0-9][0-9]'-'[0-9][0-9][0-9][0-9] | [0-9][0-9][0-9]' '[0-9][0-9][0-9]' '[0-9][0-9][0-9][0-9] | [0-9][0-9][0-9]'.'[0-9][0-9][0-9]'.'[0-9][0-9][0-9][0-9]); 
fragment ENDPHONE: ',';

fragment STARTCREDIT: '"CREDITCARD"';
fragment NEWVISA: '4' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//15
fragment OLDVISA: '4' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//12
fragment MASTERCARD: '5'[1-5] DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//14
fragment AMERICAN: '3'[47] DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//13
fragment DINER: '3'('0'[0-5] DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT | ('6'| '8') DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT);
fragment DISCOVER: ('6''0''1''1' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT | '6''5' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT);
fragment JCB: (('2''1''3''1' | '1''8''0''0') DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT | '3''5' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT);
fragment CREDIT: DIGIT+;
fragment ENDCREDIT: ',';

fragment OTHERSTART: ["](ALPHA | DIGIT | SPECIALCHARS | ' ')+["][:];
fragment OTHER: (ALPHA | DIGIT | SPECIALCHARS | ' ')+;
fragment OTHEREND: ',';

//################RULES###################

ELEMEMAIL: 			STARTEMAIL QUOTE EMAIL QUOTE ENDEMAIL {System.out.println("Valid email found: " + getText());};
ELEMEMAILINV: 		STARTEMAIL .*? ENDEMAIL {System.out.println("Invalid email found: " + getText());};

ELEMDATE: 			STARTDATE QUOTE DATE QUOTE ENDDATE {System.out.println("Valid Date found: " + getText());};
ELEMDATEINV: 		STARTDATE .*? ENDDATE {System.out.println("Invalid Date found: " + getText());};

ELEMPHONE: 			STARTPHONE QUOTE PHONE QUOTE ENDPHONE {System.out.println("Valid Phone number found: " + getText());};
ELEMPHONEINV: 		STARTPHONE .*? ENDPHONE {System.out.println("Invalid Phone number found: " + getText());};

ELEMCREDITNEWVISA: 	STARTCREDIT QUOTE NEWVISA QUOTE ENDCREDIT {System.out.println("Valid new Visa credit card found: " + getText());};
ELEMCREDITOLDVISA: 	STARTCREDIT QUOTE OLDVISA QUOTE ENDCREDIT {System.out.println("Valid old Visa credit card found: " + getText());};
ELEMCREDITMASTER: 	STARTCREDIT QUOTE MASTERCARD QUOTE ENDCREDIT {System.out.println("Valid Mastercard credit card found: " + getText());};
ELEMCREDITAMERICAN: STARTCREDIT QUOTE AMERICAN QUOTE ENDCREDIT {System.out.println("Valid American Express credit card found: " + getText());};
ELEMCREDITDINER: 	STARTCREDIT QUOTE DINER QUOTE ENDCREDIT {System.out.println("Valid Diners Club credit card found: " + getText());};
ELEMCREDITDISCOVER: STARTCREDIT QUOTE DISCOVER QUOTE ENDCREDIT {System.out.println("Valid Discover credit card found: " + getText());};
ELEMCREDITJCB: 		STARTCREDIT QUOTE JCB QUOTE ENDCREDIT {System.out.println("Valid JCB credit card found: " + getText());};
ELEMCREDITINV: 		STARTCREDIT .*? ENDCREDIT {System.out.println("Invalid credit card found: " + getText());};

ELEMOTHER: 			OTHERSTART QUOTE OTHER QUOTE OTHEREND {System.out.println("Valid Element found: " + getText());};
ELEMOTHERINV: 		OTHERSTART QUOTE .*? QUOTE OTHEREND {System.out.println("Invalid element found: " + getText());};

INVALID: '"'.*?'"'.*?'"'.*?'"'',' {System.out.println("Invalid element found: " + getText());};

WS: [ \r\n\t{}]+ {skip();};