chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "chrome-extension://". chrome.runtime.id . "/stuff.html";
  chrome.tabs.create({ url: newURL });
});
