
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
fragment NEWVISA: '4' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//15
fragment OLDVISA: '4' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//12
fragment MASTERCARD: '5'[1-5] DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//14
fragment AMERICAN: '3'[47] DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT;//13
fragment DINER: '3'('0'[0-5] DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT | ('6'| '8') DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT);
fragment DISCOVER: ('6''0''1''1' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT | '6''5' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT);
fragment JCB: (('2''1''3''1' | '1''8''0''0') DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT | '3''5' DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT DIGIT);
fragment CREDIT: DIGIT+;
fragment ENDCREDIT: '</CREDITCARD>';

fragment OTHERSTART: '<'(ALPHA | UNDER)(ALPHA | DIGIT | SYMBOLS)*? '>';
fragment OTHEREND: '</'(ALPHA | UNDER)(ALPHA | DIGIT | SYMBOLS)*? '>';

//################RULES###################

ELEMEMAIL: STARTEMAIL EMAIL ENDEMAIL {System.out.println("Valid email found: " + getText());};
ELEMEMAILINV: STARTEMAIL .*? ENDEMAIL {System.out.println("Invalid email found: " + getText());};

ELEMDATE: STARTDATE DATE ENDDATE {System.out.println("Valid Date found: " + getText());};
ELEMDATEINV: STARTDATE .*? ENDDATE {System.out.println("Invalid Date found: " + getText());};

ELEMPHONE: STARTPHONE PHONE ENDPHONE {System.out.println("Valid Phone number found: " + getText());};
ELEMPHONEINV: STARTPHONE .*? ENDPHONE {System.out.println("Invalid Phone number found: " + getText());};

ELEMCREDITNEWVISA: STARTCREDIT NEWVISA ENDCREDIT {System.out.println("Valid new Visa credit card found: " + getText());};
ELEMCREDITOLDVISA: STARTCREDIT OLDVISA ENDCREDIT {System.out.println("Valid old Visa credit card found: " + getText());};
ELEMCREDITMASTER: STARTCREDIT MASTERCARD ENDCREDIT {System.out.println("Valid Mastercard credit card found: " + getText());};
ELEMCREDITAMERICAN: STARTCREDIT AMERICAN ENDCREDIT {System.out.println("Valid American Express credit card found: " + getText());};
ELEMCREDITDINER: STARTCREDIT DINER ENDCREDIT {System.out.println("Valid Diners Club credit card found: " + getText());};
ELEMCREDITDISCOVER: STARTCREDIT DISCOVER ENDCREDIT {System.out.println("Valid Discover credit card found: " + getText());};
ELEMCREDITJCB: STARTCREDIT JCB ENDCREDIT {System.out.println("Valid JCB credit card found: " + getText());};
ELEMCREDITINV: STARTCREDIT .*? ENDCREDIT {System.out.println("Invalid credit card found: " + getText());};

ELEMOTHER: OTHERSTART (ALPHA | DIGIT | SPECIALCHARS | ' ')+ OTHEREND {System.out.println("Valid Element found: " + getText());};
ELEMOTHERINV: OTHERSTART .*? OTHEREND {System.out.println("Invalid element found: " + getText());};

INVALID: '<'.*?'>'.*?'<''/'.*?'>' {System.out.println("Invalid element found: " + getText());};

WS: [ \r\n\t]+ {skip();};