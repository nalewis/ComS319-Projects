// CALCULATORBINARY.JS
//
//
//

// 
var BinCalc = {

Model : {
	memory : 0,
	equation : ''
},


View : {
	binTextRow : {id: "binTextRow", type: "text", value: "", onclick:""},
	button1 : {id: "button1", type: "button", value: 1, onclick:""},
	button0 : {id: "button0", type: "button", value: 0, onclick:""},
	buttonBitFlip : {id: "buttonBitFlip", type: "button", value: '~', onclick:""},
	
	buttonPlus : {id: "buttonPlus", type: "button", value: '+', onclick:""},
	buttonMod : {id: "buttonMod", type: "button", value: '%', onclick:""},
	buttonLeft : {id: "buttonLeft", type: "button", value: '<<', onclick:""},
	
	buttonRight : {id: "buttonRight", type: "button", value: '>>', onclick:""},
	buttonMinus : {id: "buttonMinus", type: "button", value: '-', onclick:""},
	buttonAnd : {id: "buttonAnd", type: "button", value: '&', onclick:""},
	
	buttonOr : {id: "buttonOr", type: "button", value: '|', onclick:""},
	buttonMult : {id: "buttonMult", type: "button", value: '*', onclick:""},
	buttonDiv : {id: "buttonDiv", type: "button", value: '/', onclick:""},
	
	buttonMR : {id: "buttonMR", type: "button", value: 'MR', onclick:""},
	buttonMMin: {id: "buttonMMin", type: "button", value: 'M-', onclick:""},
	buttonMPlus : {id: "buttonMPlus", type: "button", value: 'M+', onclick:""},
	
	buttonC : {id: "buttonC", type: "button", value: 'C', onclick:""},
	buttonMC : {id: "buttonMC", type: "button", value: 'MC', onclick:""},
	buttonEquals: {id: "buttonEquals", type: "button", value: '=', onclick:""},  
},

Controller : {
/*	if(BinCalc.equation == undefined){
		equation = document.getElementById(binTextRow).value
		var operator = 
		document.getElementById(binTextRow).value = '';
	}*/
},

run : function() {
	BinCalc.attachHandlers();
	console.log(BinCalc.display());
	return BinCalc.display();
},


displayElement : function (element) {
	var s = "<input ";
	s += " id=\"" + element.id + "\"";
	s += " type=\"" + element.type + "\"";
	s += " value= \"" + element.value + "\"";
	s += " onclick= \"" + element.onclick + "\"";
	s += ">";
	return s;
},

display : function() {
	var s;
	s = "<table id=\"myTable\" border=2>"
	s += "<tr><td>" + BinCalc.displayElement(BinCalc.View.binTextRow) + "</td></tr>";
	s += "<tr><td>";
	s += BinCalc.displayElement(BinCalc.View.button1);
	s += BinCalc.displayElement(BinCalc.View.button0);
	s += BinCalc.displayElement(BinCalc.View.buttonBitFlip);
	s += "</tr></td>";
	s += "<tr><td>";
	s += BinCalc.displayElement(BinCalc.View.buttonPlus);
	s += BinCalc.displayElement(BinCalc.View.buttonMod);
	s += BinCalc.displayElement(BinCalc.View.buttonLeft);
	s += "</tr></td>";
	s += "<tr><td>";
	s += BinCalc.displayElement(BinCalc.View.buttonRight);
	s += BinCalc.displayElement(BinCalc.View.buttonMinus);
	s += BinCalc.displayElement(BinCalc.View.buttonAnd);
	s += "</tr></td>";
	s += "<tr><td>";
	s += BinCalc.displayElement(BinCalc.View.buttonOr);
	s += BinCalc.displayElement(BinCalc.View.buttonMult);
	s += BinCalc.displayElement(BinCalc.View.buttonDiv);
	s += "</tr></td>";
	s += "<tr><td>";
	s += BinCalc.displayElement(BinCalc.View.buttonMR);
	s += BinCalc.displayElement(BinCalc.View.buttonMMin);
	s += BinCalc.displayElement(BinCalc.View.buttonMPlus);
	s += "</tr></td>";
	s += "<tr><td>";
	s += BinCalc.displayElement(BinCalc.View.buttonC);
	s += BinCalc.displayElement(BinCalc.View.buttonMC);
	s += BinCalc.displayElement(BinCalc.View.buttonEquals);
	s += "</tr></td></table>";
	return s;
},

attachHandlers : function() {
	BinCalc.View.button1.onclick = "BinCalc.button1Handler()";
	BinCalc.View.button0.onclick = "BinCalc.button0Handler()";
	BinCalc.View.buttonBitFlip.onclick = "BinCalc.buttonBitFlipHandler()";
	
	BinCalc.View.buttonPlus.onclick = "BinCalc.buttonPlusHandler()";
	BinCalc.View.buttonMod.onclick = "BinCalc.buttonModHandler()"; 
	BinCalc.View.buttonLeft.onclick = "BinCalc.buttonLeftHandler()";
	
	BinCalc.View.buttonRight.onclick = "BinCalc.buttonRightHandler()"; 
	BinCalc.View.buttonMinus.onclick = "BinCalc.buttonMinusHandler()";
	BinCalc.View.buttonAnd.onclick = "BinCalc.buttonAndHandler()"; 

	BinCalc.View.buttonOr.onclick = "BinCalc.buttonOrHandler()";
	BinCalc.View.buttonMult.onclick = "BinCalc.buttonMultHandler()";
	BinCalc.View.buttonDiv.onclick = "BinCalc.buttonDivHandler()"; 
	
	BinCalc.View.buttonMR.onclick = "BinCalc.buttonMRHandler()"; 
	BinCalc.View.buttonMMin.onclick = "BinCalc.buttonMMinHandler()";
	BinCalc.View.buttonMPlus.onclick = "BinCalc.buttonMPlusHandler()"; 

	BinCalc.View.buttonC.onclick = "BinCalc.buttonCHandler()";
	BinCalc.View.buttonMC.onclick = "BinCalc.buttonMCHandler()";
	BinCalc.View.buttonEquals.onclick = "BinCalc.buttonEqualsHandler()"; 
},

button1Handler : function() {
	document.getElementById('binTextRow').value += '1';
},

button0Handler : function() {
	document.getElementById('binTextRow').value += '0';
},

buttonBitFlipHandler : function() {
	document.getElementById('binTextRow').value += '~';
},

buttonPlusHandler : function() {
	document.getElementById('binTextRow').value += '+';
},

buttonModHandler : function() {
	document.getElementById('binTextRow').value += '%';
},

buttonLeftHandler : function() {
	document.getElementById('binTextRow').value += '<<';
},

buttonRightHandler : function() {
	document.getElementById('binTextRow').value += '>>';
},

buttonMinusHandler : function() {
	document.getElementById('binTextRow').value += '-';
},

buttonAndHandler : function() {
	document.getElementById('binTextRow').value += '&';
},

buttonOrHandler : function() {
	document.getElementById('binTextRow').value += '|';
},

buttonMultHandler : function() {
	document.getElementById('binTextRow').value += '*';
},

buttonDivHandler : function() {
	document.getElementById('binTextRow').value += '/';
},

buttonMRHandler : function() {
	document.getElementById('binTextRow').value = BinCalc.Model.memory;
},

buttonMMinHandler : function() {
	BinCalc.Model.memory -= eval(document.getElementById('binTextRow').value);
},

buttonMPlusHandler : function() {
	BinCalc.Model.memory += eval(document.getElementById('binTextRow').value);
},

buttonCHandler : function() {
	document.getElementById('binTextRow').value = '';
},

buttonMCHandler : function() {
	BinCalc.Model.memory = 0;
},

buttonEqualsHandler : function() {
	document.getElementById('binTextRow').value = eval(document.getElementById('binTextRow').value);
},



} // end of BinCalc;
