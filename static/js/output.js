var host="http://localhost:3000",index_url=host+"/",welcome_url=host+"/welcome",search_url=host+"/search?query=";function getQueryURL(){var e=document.querySelector("header > form > input[type=text]").value;console.log("Text Query: "+e),e=e.split(" ").join("+"),console.log("URL Query Argument: "+e);var n=search_url+e;return console.log("Full Query URL: "+n),n}function getContent(e){console.log("Creating HTTP POST Request to "+e+".\n\n");var n=new XMLHttpRequest;n.open("POST",e),n.responseType="text",n.onload=function(){document.querySelector("#content").innerHTML=n.response},n.send(),console.log("Sent HTTP POST Request to "+e+".\n\n")}function searchQuery(){getContent(getQueryURL())}window.onload=function(){console.log("Loading Page. Setting Welcome Content and linking button onclick function.\n"),getContent(welcome_url),document.querySelector("header > button").onclick=searchQuery};