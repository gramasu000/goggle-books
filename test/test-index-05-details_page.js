/**
 * @fileoverview Using MochaJS and NightmareJS to test the webpage when showind details of a particular book.
 *
 * @author Gautam Ramasubramanian
 *
 * @requires NPM:nightmare
 * @requires assert
 */

/** @const Nightmare - headless browser class */
const Nightmare = require("nightmare");

/** @const request - HTTP Request module */
const http_request = require("request");

/** @const assert - assert module object */
const assert = require("assert");

/** Test #content div has all proper elements */
describe("Nightmare tests https://goggle-books.herokuapp.com - Queried Search", function () {
    
    this.timeout("30s");

    let browser;
    let one_id = "pNruBgrGSFUC";

    function make_request_options(id) {
        return {
            uri: `https://www.googleapis.com/books/v1/volumes/${id}`,
            method: "GET",
            json: true,
            qs: {
                key: "AIzaSyCoxEfQQzTGEyZeoKM8udfBdt1JOuEK16E",
            }
        };
    }

    /** Before each test, instantiate a new browser instance*/
    beforeEach(function () {
        browser = new Nightmare();
    });


    it(`Test book details page of id:pNruBgrGSFUC for correct title`, function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait("#content h1")
            .type("header input", "id:pNruBgrGSFUC")
            .click("header button")
            .wait("#results li a")
            .click("#results li a")
            .wait("#details")
            .evaluate(function() {
                return document.querySelector("#details p").innerHTML
            }).end()
            .then(function (res) {
                http_request(make_request_options("pNruBgrGSFUC"), function (err, resp, body) {
                    assert.strictEqual(res, "<b>Title: </b>" + body["volumeInfo"]["title"]);
                    done();
                });
            }).catch(done);
    });


});


