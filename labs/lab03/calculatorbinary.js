// CALCULATORBINARY.JS
//
//
//

// 
var BinCalc = {

Model : {
	memory : 0,
},


View : {
	binTextRow : {id: "binTextRow", type: "text", value: "", onclick:""},
	button1 : {id: "button1", type: "button", value: 1, onclick:""},
	button0 : {id: "button0", type: "button", value: 0, onclick:""},
	buttonBitFlip : {id: "buttonBitFlip", type: "button", value: '~', onclick:""},
	
	buttonPlus : {id: "buttonPlus", type: "button", value: '+', onclick:""},
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
	digitAction : function (digit) {
		document.getElementById('binTextRow').value += digit;
	},

	operationAction : function (operation) {
		document.getElementById('binTextRow').value += operation;	
	},
	
	calculate : function() {
		var newEq = '';
		var numChunk = '';
		console.log("length: " + document.getElementById('binTextRow').value.length);
		for(i = 0; i < document.getElementById('binTextRow').value.length; i++){
			console.log(document.getElementById('binTextRow').value.charAt(i));
			console.log("i: " + i);
			if(!isNaN(document.getElementById('binTextRow').value.charAt(i))){
				numChunk += document.getElementById('binTextRow').value.charAt(i);
				if (i == (document.getElementById('binTextRow').value.length - 1)){
					newEq += parseInt(numChunk, 2);
				}
			} else {
				if(numChunk != ''){
					newEq += parseInt(numChunk, 2);
				}
				console.log(newEq);
				numChunk = '';
				newEq += document.getElementById('binTextRow').value.charAt(i);
				console.log(newEq);
			}
		}
		console.log(newEq);
		console.log(eval(newEq).toString(2));
		document.getElementById('binTextRow').value = eval(newEq).toString(2);
	}
},

run : function() {
	BinCalc.attachHandlers();
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
	BinCalc.Controller.digitAction("1");
},

button0Handler : function() {
	BinCalc.Controller.digitAction("0");
},

buttonBitFlipHandler : function() {
	document.getElementById('binTextRow').value += '~';
},

buttonPlusHandler : function() {
	BinCalc.Controller.operationAction("+");
},

buttonLeftHandler : function() {
	document.getElementById('binTextRow').value += '<<';
},

buttonRightHandler : function() {
	document.getElementById('binTextRow').value += '>>';
},

buttonMinusHandler : function() {
	BinCalc.Controller.operationAction("-");
},

buttonAndHandler : function() {
	document.getElementById('binTextRow').value += '&';
},

buttonOrHandler : function() {
	document.getElementById('binTextRow').value += '|';
},

buttonMultHandler : function() {
	BinCalc.Controller.operationAction("*");
},

buttonDivHandler : function() {
	BinCalc.Controller.operationAction("/");
},


buttonMRHandler : function() {
	document.getElementById('binTextRow').value = BinCalc.Model.memory;
},

buttonMMinHandler : function() {
	BinCalc.Controller.calculate();
	BinCalc.Model.memory = eval(parseInt(BinCalc.Model.memory,2) - parseInt(document.getElementById('binTextRow').value, 2)).toString(2);
},

buttonMPlusHandler : function() {
	BinCalc.Controller.calculate();
	BinCalc.Model.memory = eval(parseInt(BinCalc.Model.memory,2) + parseInt(document.getElementById('binTextRow').value, 2)).toString(2);
},

buttonCHandler : function() {
	document.getElementById('binTextRow').value = '';
	BinCalc.Model.canRepeat = false;
},

buttonMCHandler : function() {
	BinCalc.Model.memory = 0;
},

buttonEqualsHandler : function() {
	BinCalc.Controller.calculate();
},

} // end of BinCalc;
