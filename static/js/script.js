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
var volume_url = host + "/volume";
var saved_query = "";
var start_index = 0;
var max_results = 10;


function getQueryURL() {
    var query = document.querySelector("header > div > input[type=text]").value;
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
    
    var setContent = function (req) { 
        document.querySelector("#content").innerHTML = req.response;
        window.scrollTo(0,0);
    };

    var setPageButtons = function () {
        var prev = document.querySelector("#prev");
        var next = document.querySelector("#next");
        var results = document.querySelector("#results");
        var no_results = document.querySelector("#no-results");
        var details = document.querySelector("#details");
        var no_details = document.querySelector("#no-details");
    
        if (prev && results || prev && no_results) {
            prev.onclick = previousPage;
            if (start_index === 0) {
                prev.disabled = true;
            } else {
                prev.disabled = false;
            }
        } else if (prev && details || prev && no_details) {
            prev.onclick = currentPage;
            prev.disabled = false;
        }

        if (next && no_results || next && details || next && no_details) {
            next.disabled = true;
        } else if (next && results) {
            next.onclick = nextPage
            next.disabled = false;
        }
    };
    
    var setResultLinks = function () {
        var results = document.querySelectorAll("#results > li > a");
        for (var i = 0; i < results.length; i++) { 
            results[i].onclick = makeDetailQuery(results[i].id);
        }
    };

    return function () {
        setContent(req);
        setPageButtons();
        setResultLinks();
    };
}


function makeDetailQuery(id) {
    return function() {
        var query_url = volume_url + "/" + id;
        getContent(query_url);
    }
}

function searchQuery() {
    start_index = 0;
    var query_url = getQueryURL();
    getContent(query_url);
}

function currentPage() {
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
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

var ENTER = 13

window.onload = function () {
    console.log("Loading Page. Setting Welcome Content and linking button onclick function.\n")
    getContent(welcome_url);
    document.querySelector("header > button").onclick = searchQuery;
    document.querySelector("header > div > input").addEventListener("keypress", function (event) {
        if (event.keyCode === ENTER) {
            searchQuery();
        }
    });

}
