function loadHumans(url, success, error) {

  var u = parseUri(url),
      humansLink = "http://" + u.host + "/humans.txt";      // set humans.txt link

  var ajax = $.ajax({ type: "GET", url: humansLink })
    .success(function(text, status, xhr) { 
      console.log("xhr", xhr.getResponseHeader("Content-Type"));
      return (/text\/plain/.test(xhr.getResponseHeader("Content-Type"))) ?
        success(text, humansLink) : error(url, humansLink);
    })
    .error(function() { error(url, humansLink); })

}
