chrome.runtime.onMessage.addListener(function(msg, sender){
	if(msg.command === 'displayImage'){	
		displayImage();
	}
	//content script sends redirect command when window.hostname is present
	//in chrome.storage
	else if(msg.command === 'redirect'){
		chrome.tabs.update(sender.tab.id, {url: msg.redirect});
	}
});

//Sends a command to the partyPage.js script to alter the DOM
function displayImage(){
    chrome.tabs.query({ active:true, currentWindow:true} , function(tab){
        chrome.tabs.sendMessage( tab[0].id, {command: "displayImage"});
    });
};
