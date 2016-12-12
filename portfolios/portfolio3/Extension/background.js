//Doesn't do anything at the moment
/*chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "chrome-extension://mflpimebpcdpbonoidbkgbccghmbmndc/stuff.html";
  chrome.tabs.create({ url: newURL });
});*/

chrome.runtime.onMessage.addListener(function(msg, sender){
	if(msg.command === 'displayImage'){	
		displayImage();
	} else if(msg.command === 'blockSite'){
		blockSite();
	} else if(msg.command === 'redirect'){
		chrome.tabs.update(sender.tab.id, {url: msg.redirect});
	}
});

function displayImage(){
    chrome.tabs.query({ active:true, currentWindow:true} , function(tab){
        chrome.tabs.sendMessage( tab[0].id, {command: "displayImage"});
    });
};

function blockSite(){
    chrome.tabs.query({ active:true, currentWindow:true} , function(tab){
        chrome.tabs.sendMessage( tab[0].id, {command: "blockSite"});
    });
};