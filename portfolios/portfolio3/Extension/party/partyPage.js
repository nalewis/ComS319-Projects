$(document).ready(function(){
	var btn = document.createElement("BUTTON")
    var t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    //Appending to DOM 
    document.body.appendChild(btn);
	
	var partyPic = chrome.extension.getURL("party/Nicolas_Cage.png");
	$('img').each(function(index, image){
		$(image).attr('src', partyPic);
	});
	
});