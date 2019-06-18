/** 
 * @fileoverview Script file to get page content from server.
 *
 * @author Gautam Ramasubramanian
 */

window.onload = function () {
    var req = new XMLHttpRequest();
    req.open("POST", "https://goggle-books.herokuapp.com/welcome");
    req.responseType = "text";
    req.onload = function () {
        document.querySelector("#content").innerHTML = req.response;
    }
    req.send();
}
