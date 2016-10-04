// CALCULATORBINARY.JS
//
//
//

// 
var BinCalc = {

Model : {
	memory : 0,
	equation : '',
	operator: '',
	x : '',
	y : '',
	canRepeat : false,
	isRepeat : false,
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
/*	if(BinCalc.equation == undefined){
		equation = document.getElementById(binTextRow).value
		var operator = 
		document.getElementById(binTextRow).value = '';
	}*/

	digitAction : function (digit) {
		document.getElementById('binTextRow').value += digit;
		BinCalc.Model.canRepeat = false;
	},

	operationAction : function (operation) {
			
		var input = document.getElementById('binTextRow').value;

		if ((!BinCalc.Model.operator || BinCalc.Model.canRepeat) && (input.length > 0))
		{
			BinCalc.Model.canRepeat = false;

			BinCalc.Model.operator = operation;
			BinCalc.Model.x = input;
			BinCalc.Model.x = parseInt(BinCalc.Model.x, 2);

			document.getElementById('binTextRow').value += operation;
		}		
	},
	
	calculate : function() {
			
		var splitInput = (document.getElementById('binTextRow').value).split(BinCalc.Model.operator);

		if (BinCalc.Model.canRepeat && (splitInput.length == 1) && BinCalc.Model.operator)
		{
			var input = parseInt(splitInput[0], 2);

			BinCalc.Model.x = eval( (input + " " + BinCalc.Model.operator + " " + BinCalc.Model.y) ); 
			BinCalc.Model.memory = BinCalc.Model.x;

			console.log("memory set to " + BinCalc.Model.memory);
			document.getElementById('binTextRow').value = (BinCalc.Model.x).toString(2);
			
		}
		else if (BinCalc.Model.operator && BinCalc.Model.x)
		{
			
			BinCalc.Model.y = (document.getElementById('binTextRow').value).split(BinCalc.Model.operator)[1];
			BinCalc.Model.y = parseInt(BinCalc.Model.y, 2);

			BinCalc.Model.x = eval((BinCalc.Model.x + " " + BinCalc.Model.operator + " " + BinCalc.Model.y));
			BinCalc.Model.memory = BinCalc.Model.x;	
			console.log("memory set to " + BinCalc.Model.memory);
			
			document.getElementById('binTextRow').value = (BinCalc.Model.x).toString(2);
	 
			BinCalc.Model.canRepeat = true;
		}
	}
},

run : function() {
	console.log("Potato");
	BinCalc.attachHandlers();
	//console.log(BinCalc.display());
	var a = parseInt("110111", 2);
	console.log(a);
	console.log((a).toString(2));
	console.log((a).toString(10));
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
	document.getElementById('binTextRow').value = (BinCalc.Model.memory).toString(2);
	BinCalc.Model.operator = '';
	BinCalc.Model.canRepeat = false;
	console.log("memory is " + (BinCalc.Model.memory).toString(2));
},

buttonMMinHandler : function() {
	BinCalc.Model.memory -= eval(document.getElementById('binTextRow').value);
},

buttonMPlusHandler : function() {
	console.log("memory was " + BinCalc.Model.memory);
	var input = (document.getElementById('binTextRow').value);
	var splitInput = (document.getElementById('binTextRow').value).split(BinCalc.Model.operator);

	console.log(splitInput);

	if (BinCalc.Model.operator)
	{
		if (splitInput[1])
		{
			var computedValue = eval( (parseInt(splitInput[0], 2)) + " " + BinCalc.Model.operator + " " + (parseInt(splitInput[1], 2)));
			BinCalc.Model.memory += computedValue;

			console.log("~added " +  computedValue); 
		}
		else
		{
			BinCalc.Model.memory += (parseInt(splitInput[0], 2));	
			console.log(splitInput[0]);
			console.log("to be added " + parseInt(splitInput[0], 2));
			console.log("/added " +  (parseInt(splitInput[0], 2)));
		}	

	}
	else
	{
		BinCalc.Model.memory += parseInt(input, 2);

		console.log("!added " + parseInt(input, 2));
	}

	console.log("Memory now " + BinCalc.Model.memory);

/*	if (BinCalc.Model.canRepeat)
	{
		BinCalc.Model.memory += (parseInt(document.getElementById('binTextRow').value, 2));
	}
	else
	{
		var splitInput = (document.getElementById('binTextRow').value).split(BinCalc.Model.operator);

		var localY = (document.getElementById('binTextRow').value).split(BinCalc.Model.operator)[1];
		localY = parseInt(BinCalc.Model.y, 2);

		var localX = eval((BinCalc.Model.x + " " + BinCalc.Model.operator + " " + BinCalc.Model.y));
		BinCalc.Model.memory = BinCalc.Model.x;	
		
		document.getElementById('binTextRow').value = (BinCalc.Model.x).toString(2);
 
		BinCalc.Model.canRepeat = true;
	}
	BinCalc.Model.memory += eval(document.getElementById('binTextRow').value);
*/
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
