// CALCULATOR.JS
//
//
//

// 
var Calc = {

Model : {
	memory : 0,
	equation : '',
	operator : '',
	x : '',
	y : '',
	canRepeat : true,
	isRepeat : false
},


View : {
  textRow : {id: "textRow", type: "text", value: "", onclick:""},
  button7 : {id: "button7", type: "button", value: 7, onclick:""},
  button8 : {id: "button8", type: "button", value: 8, onclick:""},
  button9 : {id: "button9", type: "button", value: 9, onclick:""},
  buttonPlus : {id: "buttonPlus", type: "button", value: '+', onclick:""},
  
  button4 : {id: "button4", type: "button", value: 4, onclick:""},
  button5 : {id: "button5", type: "button", value: 5, onclick:""},
  button6 : {id: "button6", type: "button", value: 6, onclick:""},
  buttonMinus : {id: "buttonMinus", type: "button", value: '-', onclick:""},
  
  button1 : {id: "button1", type: "button", value: 1, onclick:""},
  button2 : {id: "button2", type: "button", value: 2, onclick:""},
  button3 : {id: "button3", type: "button", value: 3, onclick:""},
  buttonMult : {id: "buttonMult", type: "button", value: '*', onclick:""},
  
  button0 : {id: "button1", type: "button", value: 0, onclick:""},
  buttonDot : {id: "buttonDot", type: "button", value: '.', onclick:""},
  buttonEquals : {id: "buttonEquals", type: "button", value: '=', onclick:""},
  buttonDiv : {id: "buttonDiv", type: "button", value: '/', onclick:""},
  
  buttonC : {id: "buttonC", type: "button", value: 'C', onclick:""},
  buttonMR : {id: "buttonMR", type: "button", value: 'MR', onclick:""},
  buttonMMin: {id: "buttonMMin", type: "button", value: 'M-', onclick:""},
  buttonMPlus : {id: "buttonMPlus", type: "button", value: 'M+', onclick:""},
  
  buttonMC : {id: "buttonMC", type: "button", value: 'MC', onclick:""},
},

Controller : {
	numAction : function (num){
		Calc.Model.isRepeat = false;
		document.getElementById('textRow').value += num;
	},
	
	operatorFunc : function (op){
		if(Calc.Model.operator == ''){
			Calc.Model.x = document.getElementById('textRow').value;
			Calc.Model.canRepeat = true;
		} else {
			Calc.Model.canRepeat = false;
		}
		Calc.Model.operator = op;
		document.getElementById('textRow').value += op;
	}
},

run : function() {
  Calc.attachHandlers();
  //console.log(Calc.display());
  return Calc.display();
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
  s += "<tr><td>" + Calc.displayElement(Calc.View.textRow) + "</td></tr>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button7);
  s += Calc.displayElement(Calc.View.button8);
  s += Calc.displayElement(Calc.View.button9);
  s += Calc.displayElement(Calc.View.buttonPlus);
  s += "</tr></td>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button4);
  s += Calc.displayElement(Calc.View.button5);
  s += Calc.displayElement(Calc.View.button6);
  s += Calc.displayElement(Calc.View.buttonMinus);
  s += "</tr></td>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button1);
  s += Calc.displayElement(Calc.View.button2);
  s += Calc.displayElement(Calc.View.button3);
  s += Calc.displayElement(Calc.View.buttonMult);
  s += "</tr></td>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.button0);
  s += Calc.displayElement(Calc.View.buttonDot);
  s += Calc.displayElement(Calc.View.buttonEquals);
  s += Calc.displayElement(Calc.View.buttonDiv);
  s += "</tr></td>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.buttonC);
  s += Calc.displayElement(Calc.View.buttonMR);
  s += Calc.displayElement(Calc.View.buttonMMin);
  s += Calc.displayElement(Calc.View.buttonMPlus);
  s += "</tr></td>";
  s += "<tr><td>";
  s += Calc.displayElement(Calc.View.buttonMC);
  s += "</tr></td></table>";
  return s;
},

attachHandlers : function() {
	Calc.View.button7.onclick = "Calc.button7Handler()";
	Calc.View.button8.onclick = "Calc.button8Handler()";
	Calc.View.button9.onclick = "Calc.button9Handler()";
	Calc.View.buttonPlus.onclick = "Calc.buttonPlusHandler()";
	
	Calc.View.button4.onclick = "Calc.button4Handler()";
	Calc.View.button5.onclick = "Calc.button5Handler()"; 
	Calc.View.button6.onclick = "Calc.button6Handler()";
	Calc.View.buttonMinus.onclick = "Calc.buttonMinusHandler()"; 

	Calc.View.button1.onclick = "Calc.button1Handler()";
	Calc.View.button2.onclick = "Calc.button2Handler()"; 
	Calc.View.button3.onclick = "Calc.button3Handler()";
	Calc.View.buttonMult.onclick = "Calc.buttonMultHandler()"; 

	Calc.View.button0.onclick = "Calc.button0Handler()";
	Calc.View.buttonDot.onclick = "Calc.buttonDotHandler()"; 
	Calc.View.buttonEquals.onclick = "Calc.buttonEqualsHandler()";
	Calc.View.buttonDiv.onclick = "Calc.buttonDivHandler()"; 
	
	Calc.View.buttonC.onclick = "Calc.buttonCHandler()";
	Calc.View.buttonMR.onclick = "Calc.buttonMRHandler()"; 
	Calc.View.buttonMMin.onclick = "Calc.buttonMMinHandler()";
	Calc.View.buttonMPlus.onclick = "Calc.buttonMPlusHandler()"; 

	Calc.View.buttonMC.onclick = "Calc.buttonMCHandler()"; 
},

button7Handler : function() {
	Calc.Controller.numAction('7');
},

button8Handler : function() {
	Calc.Controller.numAction('8');
},

button9Handler : function() {
	Calc.Controller.numAction('9');
},

buttonPlusHandler : function() {
	Calc.Controller.operatorFunc('+');
},

button4Handler : function() {
	Calc.Controller.numAction('4');
},

button5Handler : function() {
	Calc.Controller.numAction('5');
},

button6Handler : function() {
	Calc.Controller.numAction('6');
},

buttonMinusHandler : function() {
	Calc.Controller.operatorFunc('-');
},

button1Handler : function() {
	Calc.Controller.numAction('1');
},

button2Handler : function() {
	Calc.Controller.numAction('2');
},

button3Handler : function() {
	Calc.Controller.numAction('3');
},

buttonMultHandler : function() {
	Calc.Controller.operatorFunc('*');
},

button0Handler : function() {
	Calc.Controller.numAction('0');
},

buttonDotHandler : function() {
  document.getElementById('textRow').value += '.';
},

buttonEqualsHandler : function() {
	Calc.Model.operator = '';
	if(Calc.Model.canRepeat){
		Calc.Model.y = document.getElementById('textRow').value.slice(Calc.Model.x.length);
		console.log(Calc.Model.y);
		document.getElementById('textRow').value = eval(document.getElementById('textRow').value);
		Calc.Model.canRepeat = false;
		Calc.Model.isRepeat = true;		
	} else if (Calc.Model.isRepeat){
		document.getElementById('textRow').value = eval(document.getElementById('textRow').value + Calc.Model.y);
	} else {
		document.getElementById('textRow').value = eval(document.getElementById('textRow').value);
	}
  
},

buttonDivHandler : function() {
	Calc.Controller.operatorFunc('/');
},

buttonCHandler : function() {
  document.getElementById('textRow').value = '';
  Calc.Model.x = '';
  Calc.Model.y = '';
  Calc.Model.canRepeat = true;
  Calc.Model.operator = '';
  Calc.Model.isRepeat = false;
},

buttonMRHandler : function() {
  document.getElementById('textRow').value = Calc.Model.memory;
},

buttonMMinHandler : function() {
  Calc.Model.memory -= eval(document.getElementById('textRow').value);
},

buttonMPlusHandler : function() {
  Calc.Model.memory += eval(document.getElementById('textRow').value);
},

buttonMCHandler : function() {
  Calc.Model.memory = 0;
},

} // end of Calc;
