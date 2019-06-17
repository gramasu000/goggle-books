/** 
 * @fileoverview Script file to get page content from server.
 *
 * @author Gautam Ramasubramanian
 */
"use strict"

window.onload = function () {
    let request = new XMLHttpRequest();
    request.open("POST", /* Put URL here later */);
    request.responseType = "text";
    request.onload = function () {
        document.querySelector("#content").innerHTML = request.response;
    }
    request.send();
}
