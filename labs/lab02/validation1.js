var submitBtn = document.getElementById("submit");
var nextBtn = document.getElementById("nextPage");
  submitBtn.onclick = function () {
     // show all elements on clicking submit!
     var myForm = document.getElementById("form1");
	 
	 var reg = /[^A-Za-z0-9 ]/;
	 
     var i;
     var s = "";
     var successfulValidation = true;
     for (i = 0; i < myForm.elements.length; i++) {
       if (myForm.elements[i].name) {
           s += myForm.elements[i].name + "=" + myForm.elements[i].value+"\n"; 
       }
	   if (myForm.elements[i].name == 'firstName'){
		   if (!(myForm.elements[i].value) || reg.test(myForm.elements[i].value)){
			   document.getElementById("firstWrong").hidden = false;
			   document.getElementById("firstCorrect").hidden = true;
			   successfulValidation = false;
			   document.cookie = ("firstName=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		   } else {
			   document.getElementById("firstWrong").hidden = true;
			   document.getElementById("firstCorrect").hidden = false;
			   document.cookie = ("firstName=" + myForm.elements[i].value);
		   }
	   } else if(myForm.elements[i].name == 'lastName'){
		   if (!(myForm.elements[i].value) || reg.test(myForm.elements[i].value)){
			   document.getElementById("lastWrong").hidden = false;
			   document.getElementById("lastCorrect").hidden = true;
			   successfulValidation = false;
			   document.cookie = ("lastName=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		   } else {
			   document.getElementById("lastWrong").hidden = true;
			   document.getElementById("lastCorrect").hidden = false;
			   document.cookie = ("lastName=" + myForm.elements[i].value);
		   }
	   } else if(myForm.elements[i].name == 'gender'){
		   if (myForm.elements[i].value == ''){
			   document.getElementById("genderWrong").hidden = false;
			   document.getElementById("genderCorrect").hidden = true;
			   successfulValidation = false;
			   document.cookie = ("gender=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		   } else {
			   document.getElementById("genderWrong").hidden = true;
			   document.getElementById("genderCorrect").hidden = false;
			   document.cookie = ("gender=" + myForm.elements[i].value);
		   }
	   } else if(myForm.elements[i].name == 'state'){
		   if (myForm.elements[i].value == ''){
			   document.getElementById("stateWrong").hidden = false;
			   document.getElementById("stateCorrect").hidden = true;
			   successfulValidation = false;
			   document.cookie = ("state=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		   } else {
			   document.getElementById("stateWrong").hidden = true;
			   document.getElementById("stateCorrect").hidden = false;
			   document.cookie = ("state=" + myForm.elements[i].value);
		   }
	   }
     }
     if (successfulValidation) {	   
	   nextBtn.hidden = false;
     	   alert (s + "has been submitted!");
     } else {
	   nextBtn.hidden = true;
	   alert ("There are errors in the values you entered.\nPlease enter only letters and numbers, complete all fields, and try again.");
     }
  }
  
  nextPage.onclick = function () {
     window.location = "./validation2.html";
  }
      
