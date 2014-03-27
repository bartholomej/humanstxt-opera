$(function() {
  chrome.tabs.getSelected(null, function(tab) {
    var humans = chrome.extension.getBackgroundPage().humansByTab[tab.id];
    var btnText = chrome.i18n.getMessage("openInTab");
    var btnTheIdea = chrome.i18n.getMessage("theIdea");
    var btnStandard = chrome.i18n.getMessage("standard"); 
    
    if (humans) {
      $("#humansText").text(humans.text);
      $("#humansLink").html(btnText);
      $("#theIdea").html(btnTheIdea);
      $("#standard").html(btnStandard);
      $("#humansLink").attr("href", humans.link).show();      
    }
  });
});
