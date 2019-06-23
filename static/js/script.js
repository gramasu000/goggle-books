/** 
 * @fileoverview Script file to get page content from server.
 *
 * @author Gautam Ramasubramanian
 */

//var host = "https://goggle-books.herokuapp.com";
var host = "http://localhost:3000";
var index_url = host + "/";
var welcome_url = host + "/welcome";
var search_url = host + "/search";
var saved_query = "";
var start_index = 0;
var max_results = 10;


function getQueryURL() {
    var query = document.querySelector("header > form > input[type=text]").value;
    console.log("Text Query: " + query);
    saved_query = query.split(" ").join("+");
    console.log("URL Query Argument: " + saved_query);
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    console.log("Full Query URL: " + query_url);
    return query_url;
}

function getContent(url) {
    console.log("Sending HTTP POST Request to " + url + ".")
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.responseType = "text";
    req.onload = loadResponse(req);
    req.send();
}

function loadResponse(req) {
    return function () {
        document.querySelector("#content").innerHTML = req.response;
        document.querySelector("#prev").onclick = previousPage;
        document.querySelector("#next").onclick = nextPage;
        if (document.querySelector("#prev")) {
            if (start_index === 0) {
                document.querySelector("#prev").disabled = true;
            } else {
                document.querySelector("#prev").disabled = false;
            }
        }
        if (document.querySelector("#next")) {
            if (document.querySelector("#no-results")) {
                document.querySelector("#next").disabled = true;
            } else {
                document.querySelector("#next").disabled = false;
            }
        }
        window.scrollTo(0,0);
    }
}

function searchQuery() {
    var query_url = getQueryURL();
    getContent(query_url);
}

function nextPage() {
    start_index += max_results;
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    getContent(query_url);
}

function previousPage() {
    start_index -= max_results;
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    getContent(query_url);
}

window.onload = function () {
    console.log("Loading Page. Setting Welcome Content and linking button onclick function.\n")
    getContent(welcome_url);
    document.querySelector("header > button").onclick = searchQuery;
}
