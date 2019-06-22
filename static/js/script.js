/** 
 * @fileoverview Script file to get page content from server.
 *
 * @author Gautam Ramasubramanian
 */

var host = "https://goggle-books.herokuapp.com";
//var host = "http://localhost:3000";
var index_url = host + "/";
var welcome_url = host + "/welcome";
var search_url = host + "/search?query=";

function getQueryURL() {
    var query = document.querySelector("header > form > input[type=text]").value;
    console.log("Text Query: " + query);
    query = query.split(" ").join("+");
    console.log("URL Query Argument: " + query);
    var query_url = search_url + query;
    console.log("Full Query URL: " + query_url);
    return query_url;
}

function getContent(url) {
    console.log("Creating HTTP POST Request to " + url + ".\n\n")
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.responseType = "text";
    req.onload = function () {
        document.querySelector("#content").innerHTML = req.response;
    }
    req.send();
    console.log("Sent HTTP POST Request to " + url + ".\n\n")
}

function searchQuery() {
    var query_url = getQueryURL();
    getContent(query_url);
}

window.onload = function () {
    console.log("Loading Page. Setting Welcome Content and linking button onclick function.\n")
    getContent(welcome_url);
    document.querySelector("header > button").onclick = searchQuery;
}
