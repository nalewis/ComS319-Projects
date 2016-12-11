$(document).ready(function(){
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
		if(request.command == "displayImage"){
			var partyPic = chrome.extension.getURL("party/Nicolas_Cage.png");
			$('img').each(function(index, image){
				$(image).attr('src', partyPic);
			});
			document.body.style.backgroundColor = '#F83DFE';
			$('div').css({'backgroundColor': '#F83DFE'});
			$('p').css({'color': '#E6E02A'});
			$('h1').css({'color': '#E6E02A'});
			$('h2').css({'color': '#E6E02A'});
			$('h3').css({'color': '#E6E02A'});
			$('span').css({'color': '#E6E02A', 'backgroundColor': '#F83DFE'});
			$('a').css({'color': 'cyan', 'backgroundColor': '#F83DFE'});

			sendResponse({message: "Message recieved!"});
			return true;
		}
	});
});