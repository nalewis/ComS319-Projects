//Doesn't do anything at the moment
/*chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "chrome-extension://mflpimebpcdpbonoidbkgbccghmbmndc/stuff.html";
  chrome.tabs.create({ url: newURL });
});*/

chrome.runtime.onMessage.addListener(function(msg, sender){
	console.log("hi");
	if(msg.command === 'displayImage'){
		console.log("background has recieved a message!");
		console.log("sender " + sender);
		
		displayImage();
	}
});

function displayImage(){
    chrome.tabs.query({ active:true, currentWindow:true} , function(tab){
        chrome.tabs.sendMessage( tab[0].id, {command: "displayImage"});
    });
};