$(document).ready(function(){
	//Begins listening for messages from background.js
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if(request.command == "displayImage"){
			//insert the partyPic into all <img> elements on the DOM
			var partyPic = chrome.extension.getURL("party/Nicolas_Cage.png");
			$('img').each(function(index, image){
				$(image).attr('src', partyPic);
			});
			//Alters the DOM's colors
			document.body.style.backgroundColor = '#F83DFE';
			$('div').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('p').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('h1').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('h2').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('h3').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('span').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('a').css({'color': 'cyan', 'backgroundColor': '#F83DFE'});

			sendResponse({message: "Message recieved!"});
			return true;
		}
	});
});