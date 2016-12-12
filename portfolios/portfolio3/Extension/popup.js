document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
	
	document.getElementById("picSwap").addEventListener('click', function(){
		chrome.runtime.sendMessage({command: "displayImage"});
	});
	document.getElementById("blockSite").addEventListener('click', function(){
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			var url = new URL(tabs[0].url);
			if(url.hostname != "www.google.com"){
				addToBlocked(url.hostname);
			}
		});
	});
	document.getElementById("unblockSite").addEventListener('click', function(){
		clearBlocked();
	});
});

var addToBlocked = function(site){
	chrome.storage.local.get('blocked', function(item) {
		if(item.blocked != null){
			item.blocked.push({'site': site});
			chrome.storage.local.set({'blocked': item.blocked}, function() {
				console.log("Added to blocklist.");
			});
		} else {
			chrome.storage.local.set({'blocked': [{"site": site}]}, function() {
				console.log("New blocklist started.");
			});
		}
	});
}

var clearBlocked = function(){
	chrome.storage.local.set({'blocked': []}, function() {
		console.log("Block list cleared.");
	});
}