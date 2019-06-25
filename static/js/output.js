var host="https://goggle-books.herokuapp.com",index_url=host+"/",welcome_url=host+"/welcome",search_url=host+"/search",volume_url=host+"/volume",saved_query="",start_index=0,max_results=10;function getQueryURL(){var e=document.querySelector("header > div > input[type=text]").value;console.log("Text Query: "+e),saved_query=e.split(" ").join("+"),console.log("URL Query Argument: "+saved_query);var t=search_url+"?q="+saved_query+"&startIndex="+start_index+"&maxResults="+max_results;return console.log("Full Query URL: "+t),t}function getContent(e){console.log("Sending HTTP POST Request to "+e+".");var t=new XMLHttpRequest;t.open("POST",e),t.responseType="text",t.onload=loadResponse(t),t.send()}var setContent=function(e){document.querySelector("#content").innerHTML=e.response,window.scrollTo(0,0)},setPageButtons=function(){var e=document.querySelector("#prev"),t=document.querySelector("#next"),n=document.querySelector("#results"),o=document.querySelector("#no-results"),r=document.querySelector("#details"),u=document.querySelector("#no-details");e&&n||e&&o?(e.onclick=previousPage,e.disabled=0===start_index):(e&&r||e&&u)&&(e.onclick=currentPage,e.disabled=!1),t&&o||t&&r||t&&u?t.disabled=!0:t&&n&&(t.onclick=nextPage,t.disabled=!1)};function makeDetailQuery(e){return function(){getContent(volume_url+"/"+e)}}var setResultLinks=function(){if(document.querySelector("#results"))for(var e=document.querySelectorAll("#results > li > a"),t=0;t<e.length;t++)e[t].onclick=makeDetailQuery(e[t].id)};function loadResponse(e){return function(){setContent(e),setPageButtons(),setResultLinks()}}function searchQuery(){start_index=0,getContent(getQueryURL())}function currentPage(){getContent(search_url+"?q="+saved_query+"&startIndex="+start_index+"&maxResults="+max_results)}function nextPage(){getContent(search_url+"?q="+saved_query+"&startIndex="+(start_index+=max_results)+"&maxResults="+max_results)}function previousPage(){getContent(search_url+"?q="+saved_query+"&startIndex="+(start_index-=max_results)+"&maxResults="+max_results)}var ENTER=13;window.onload=function(){console.log("Loading Page. Setting Welcome Content and linking button onclick function.\n"),getContent(welcome_url),document.querySelector("header > button").onclick=searchQuery,document.querySelector("header > div > input").addEventListener("keypress",function(e){e.keyCode===ENTER&&searchQuery()})};