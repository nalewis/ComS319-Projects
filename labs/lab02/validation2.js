
function validate2() {
	var myForm = document.getElementById("form2");
	var nextBtn = document.getElementById("nextPage");
	 
    var i;
    var s = "";
    var successfulValidation = true;
    for (i = 0; i < myForm.elements.length; i++) {
		if (myForm.elements[i].name) {
			s += myForm.elements[i].name + "=" + myForm.elements[i].value+"\n"; 
		}
		if (myForm.elements[i].name == 'email'){
			if (!(myForm.elements[i].value) || !validateEmail(myForm.elements[i].value)){
				document.getElementById("emailWrong").hidden = false;
				document.getElementById("emailCorrect").hidden = true;
				successfulValidation = false;
				localStorage.setItem("email", '');
			} else {
				document.getElementById("emailWrong").hidden = true;
				document.getElementById("emailCorrect").hidden = false;
				localStorage.setItem("email", myForm.elements[i].value);
			}
		} else if (myForm.elements[i].name == 'phone'){
			if (!validatePhone(myForm.elements[i].value)){
				document.getElementById("phoneWrong").hidden = false;
				document.getElementById("phoneCorrect").hidden = true;
				successfulValidation = false;
				localStorage.setItem("phone", '');
			} else {
				document.getElementById("phoneWrong").hidden = true;
				document.getElementById("phoneCorrect").hidden = false;
				localStorage.setItem("phone", myForm.elements[i].value);
			}
		} 
		else if (myForm.elements[i].name == 'address'){
			if (!(myForm.elements[i].value) || !validateAddress(myForm.elements[i].value)){
				document.getElementById("addressWrong").hidden = false;
				document.getElementById("addressCorrect").hidden = true;
				successfulValidation = false;
				localStorage.setItem("address", '');
			} else {
				document.getElementById("addressWrong").hidden = true;
				document.getElementById("addressCorrect").hidden = false;
				localStorage.setItem("address", myForm.elements[i].value);
			}
		}
	}
	if (successfulValidation){ 
		nextBtn.hidden = false;
		alert (s + "has been submitted!");
    } else {
		nextBtn.hidden = true;
		alert ("There are errors in the values you entered.\nPlease enter only letters and numbers, complete all fields, and try again.");
    }
  
	nextPage.onclick = function () {
		document.cookie = ("firstName=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		document.cookie = ("lastName=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		document.cookie = ("gender=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		document.cookie = ("state=; expires=Fri, 16 Sept 2016 00:00:00 UTC");
		window.location = "./map.html";
	}
	
	//testLocal();

};

function testLocal(){
	alert(localStorage.getItem("email"));
	alert(localStorage.getItem("phone"));
	alert(localStorage.getItem("address"));
	
	return true;
}

//pulled from stack overflow
function validatePhone(phone){
	var phoneno = /\b\d{3}[-]?\d{3}[-]?\d{4}\b/;
	return phoneno.test(phone);
}

//pulled from stack overflow
function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email);
}

function validateAddress(address) {
	var reg = /(.+ )?[a-zA-Z]+, [A-Z]{2}/
	return reg.test(address);
}