var submitBtn = document.getElementById("submit");
  submitBtn.onclick = function () {
     // show all elements on clicking submit!
     var myForm = document.getElementById("form1");
     var i;
     var s = "";
     for (i = 0; i < myForm.elements.length; i++) {
       s += myForm.elements[i].name + "=" + myForm.elements[i].value+"\n"; 
     }
     alert (s + "has been submitted!") ;
  }