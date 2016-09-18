var submitBtn = document.getElementById("submit");
  submitBtn.onclick = function () {
     // show all elements on clicking submit!
     var myForm = document.getElementById("form1");
	 
	 var reg = /[^A-Za-z0-9 ]/;
	 
     var i;
     var s = "";
     for (i = 0; i < myForm.elements.length; i++) {
       s += myForm.elements[i].name + "=" + myForm.elements[i].value+"\n"; 
	   if (myForm.elements[i].name == 'firstName'){
		   if (reg.test(myForm.elements[i].value)){
			   document.getElementById("firstWrong").hidden = false;
			   document.getElementById("firstCorrect").hidden = true;
		   } else {
			   document.getElementById("firstWrong").hidden = true;
			   document.getElementById("firstCorrect").hidden = false;
		   }
	   } else if(myForm.elements[i].name == 'lastName'){
		   if (reg.test(myForm.elements[i].value)){
			   document.getElementById("lastWrong").hidden = false;
			   document.getElementById("lastCorrect").hidden = true;
		   } else {
			   document.getElementById("lastWrong").hidden = true;
			   document.getElementById("lastCorrect").hidden = false;
		   }
	   } else if(myForm.elements[i].name == 'gender'){
		   if (myForm.elements[i].value == ''){
			   document.getElementById("genderWrong").hidden = false;
			   document.getElementById("genderCorrect").hidden = true;
		   } else {
			   document.getElementById("genderWrong").hidden = true;
			   document.getElementById("genderCorrect").hidden = false;
		   }
	   } else if(myForm.elements[i].name == 'state'){
		   if (myForm.elements[i].value == ''){
			   document.getElementById("stateWrong").hidden = false;
			   document.getElementById("stateCorrect").hidden = true;
		   } else {
			   document.getElementById("stateWrong").hidden = true;
			   document.getElementById("stateCorrect").hidden = false;
		   }
	   }
     }
     alert (s + "has been submitted!") ;
  }