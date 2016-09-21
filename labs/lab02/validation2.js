function validate2() {
	var myForm = document.getElementById("form2");
	var nextBtn = document.getElementById("nextPage");
	 
	var reg = /[^A-Za-z0-9 ]/;
	 
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
		//TODO address validation needs work!
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

//pulled from stack overflow
function validateAddress(address) {
    /*if (typeof address !== "string"){
		return false;
	}

    address = address.trim();
    var returned = {};
    var comma = address.indexOf(',');
    returned.city = address.slice(0, comma);
    var after = address.substring(comma + 2);
    var space = after.lastIndexOf(' ');
    returned.state = after.slice(0, space);
    // Return the data.
	alert (returned.city + ' ' + returned.state);*/
	/*var reg = /^([^,]+),\s([A-Z]{2})| (qr(Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut
	|Delaware|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine
	|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada
	|New\sHampshire|New\sJersey|New\sMexico|New\sYork|North\sCarolina|North\sDakota|Ohio|Oklahoma
	|Oregon|Pennsylvania|Rhode\sIsland|South\sCarolina|South\sDakota|Tennessee|Texas|Utah|Vermont
	|Virginia|Washington|West\sVirginia|Wisconsin|Wyoming))$/;
    
	return reg.test(address);
	*/
	return true;
}
>>>>>>> 9175a399001197604a5d364af46bf542c767286a
