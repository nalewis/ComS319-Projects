chrome.browserAction.onClicked.addListener(function(activeTab){
  var newURL = "chrome-extension://mflpimebpcdpbonoidbkgbccghmbmndc/stuff.html";
  chrome.tabs.create({ url: newURL });
});