/** 
 * @fileoverview Script file to get page content from server.
 *
 * @author Gautam Ramasubramanian
 */

/** Variables holding urls of site */
//var host = "https://goggle-books.herokuapp.com";
//var host = "http://localhost:3000";
var index_url = "/";
var welcome_url = "/welcome";
var search_url = "/search";
var volume_url = "/volume";

/** Query String for URL*/
var saved_query = "";

/** Pagination variables */
var start_index = 0;
var max_results = 10;

/**
 * Obtains the text query from text input and converts it to URL format 
 *
 * returns {string} Full query HTTP URL for a post request 
 */
function getQueryURL() {
    var query = document.querySelector("header > div > input[type=text]").value;
    console.log("Text Query: " + query);
    saved_query = encodeURIComponent(query);
    console.log("URL Query Argument: " + saved_query);
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    console.log("Full Query URL: " + query_url);
    return query_url;
}

/**
 * Makes an XMLHTTPRequest to the application server with the query URL to search
 *
 * @param {string} url The HTTP URL to send a post request
 */
function getContent(url) {
    console.log("Sending HTTP POST Request to " + url + ".")
    var req = new XMLHttpRequest();
    req.open("POST", url);
    req.responseType = "text";
    req.onload = loadResponse(req);
    req.send();
}

/** 
 * Inject response from application server (which is HTML) to the #content div.
 * Scroll the browser window to the top.
 *
 * @param {object} req XMLHttpRequest object 
 */
var setContent = function (req) { 
    document.querySelector("#content").innerHTML = req.response;
    window.scrollTo(0,0);
};

/**
 * Set onclicks and disabled properties of #change-page buttons, previous and next.
 * On results page, let prev and next callbacks be assigned to previousPage and nextPage functions respectively.
 * On no-results page, disable both buttons.
 * On volume details page, let prev callback be assigned to currentPage (to go back to the list of search results)
 * On volume details page, disable next button.
 */
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

/** 
 * Returns a callback function which makes a POST request to /volume URL
 *  to get details of a particular volume
 *
 *  @param {string} id Google ID number of volume
 *
 *  @returns {function} callback function which gets details for a particular volume
 */
function makeDetailQuery(id) {
    return function() {
        var query_url = volume_url + "/" + id;
        getContent(query_url);
    }
}

/**
 * On results page, attach a callback to each volume entry which
 *  sends a POST request to /volume to get details.
 */
var setResultLinks = function () {
    if (document.querySelector("#results")) {
        var results = document.querySelectorAll("#results > li > a");
        for (var i = 0; i < results.length; i++) { 
            results[i].onclick = makeDetailQuery(results[i].id);
        }
    }
};

/** 
 * Returns a function which takes the response from the application server, which is HTML,
 *      injects it in the #content div and sets appropriate callback functions for all clickables.
 *
 * @param {object} req XMLHttpRequest object
 *
 * @returns {function} a callback function which inserts the HTML in the #content div, and sets callbacks to all buttons 
 */
function loadResponse(req) {
    return function () {
        setContent(req);
        setPageButtons();
        setResultLinks();
    };
}

/**
 * Sets the start_index pagination variable to 0, gets the search query from text input
 *  and queries the /search url.
 */
function searchQuery() {
    start_index = 0;
    var query_url = getQueryURL();
    getContent(query_url);
}

/**
 * Gets the search query from the text input and queries the /search url.
 * start_index is not set - useful for going back to search results from volume details page.
 */
function currentPage() {
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    getContent(query_url);
}

/**
 * Increments the start_index pagination variable by max_results, gets the search query from text input
 *  and queries the /search url - useful to see the next page of search results.
 */
function nextPage() {
    start_index += max_results;
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    getContent(query_url);
}

/**
 * Decrements the start_index pagination variable by max_results, gets the search query from text input
 *  and queries the /search url - useful to see the previous page of search results.
 */
function previousPage() {
    start_index -= max_results;
    var query_url = search_url + "?q=" + saved_query + "&startIndex=" + start_index + "&maxResults=" + max_results;
    getContent(query_url);
}

/** @const ENTER - keyCode for Return button. */
var ENTER = 13

/**
 * On window load, send post request to /welcome and inject welcome page HTML.
 * Set onclick of search button and Enter button to be searchQuery function.
 */
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
