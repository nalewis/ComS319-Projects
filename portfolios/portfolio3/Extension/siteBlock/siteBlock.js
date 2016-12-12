$(document).ready(function(){
	chrome.storage.local.get('blocked', function(item) {
		for (var key in item.blocked){
			if(item.blocked[key].site === window.location.host.toString()){
				chrome.runtime.sendMessage({command: "redirect", redirect: "http://www.google.com"});
			}
		}
	});
});