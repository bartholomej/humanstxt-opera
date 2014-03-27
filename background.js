humansByTab = {}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  var u = parseUri(tab.url), site = "http://" + u.host;     // Parse URI
  if (u.port && u.port.strlen) site += ":" + u.port
  if (humansByTab[tab.id] && humansByTab[tab.id].site == site) return showPageAction(tab); // already cached
  
  loadHumans(site, function(text, link) {      // humans.txt loading
    showPageAction(tab);
    humansByTab[tab.id] = {
      site: site,
      text: text,
      link: link
    }
  }, function() {
    hidePageAction(tab);
  });
});

function showPageAction(tab) {                // show icon in bar (defined in manifest)
  chrome.pageAction.show(tab.id);
  chrome.pageAction.setIcon({
    tabId: tab.id,
    path: "icon-16.png"
  });
}

function hidePageAction(tab) {
  delete humansByTab[tab.id];
  chrome.pageAction.hide(tab.id);
}

chrome.tabs.onRemoved.addListener(function(tabId) { // removing
  delete humansByTab[tabId];
});
