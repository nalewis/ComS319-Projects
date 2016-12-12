$(document).ready(function(){
	chrome.storage.local.get('blocked', function(item) {
		//check all of the blocked hostnames and compare to the window hostname
		for (var key in item.blocked){
			if(item.blocked[key].site === window.location.host.toString()){
				//send message to the background.js script, which redirect to google
				chrome.runtime.sendMessage({command: "redirect", redirect: "http://www.google.com"});
			}
		}
	});
});