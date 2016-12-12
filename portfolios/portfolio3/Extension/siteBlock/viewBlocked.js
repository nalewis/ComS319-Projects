$(document).ready(function(){
	chrome.storage.local.get('blocked', function(item) {
		for (var key in item.blocked){
			var node = document.createElement("LI");
			var textnode = document.createTextNode(item.blocked[key].site);
			node.appendChild(textnode);
			document.getElementById("list").appendChild(node);
		}
	});
});