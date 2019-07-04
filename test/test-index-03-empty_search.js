/**
 * @fileoverview Using MochaJS and NightmareJS to test the webpage after an empty search
 *
 * @author Gautam Ramasubramanian
 *
 * @requires NPM:nightmare
 * @requires assert
 */

/** @const Nightmare - headless browser class */
const Nightmare = require("nightmare");

/** @const assert - assert module object */
const assert = require("assert");

/** Test #content div has all proper elements */
describe("Nightmare tests https://goggle-books.herokuapp.com empty search", function () {
    
    this.timeout("60s");

    let browser;

    describe("Empty Search retains header elements", function () {
                
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("header input")
                .type("header input", "")
                .click("header button")
                .wait(200)
                .evaluate(() => {
                    let array = [];
                    array.push(document.querySelectorAll("header").length);
                    array.push(document.querySelectorAll("header span").length);
                    array.push(document.querySelector("header span").innerHTML);
                    array.push(document.querySelectorAll("header input[type='text']").length);
                    array.push(document.querySelectorAll("header button").length);
                    array.push(document.querySelector("header button").innerHTML);
                    return array;
                });
        });

        it("After empty search, header exists and is unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_header_elements = array[0];
                    assert.strictEqual(num_header_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, website 'logo' exists, is unique, and located in the header", function (done) {
            browser.end()
                .then((array) => {
                    let num_header_span_elements = array[1];
                    assert.strictEqual(num_header_span_elements, 1);
                    done();
                }).catch(done);
        });

        it("Website 'logo' has text - i.e. it is not empty", function (done) {
            browser.end()
                .then((array) => {
                    let header_span_text = array[2];
                    assert.notEqual(header_span_text, "");
                    done();
                }).catch(done);
        });

        it("After empty search the text search input must exist in header, and must be unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_input_elements = array[3];
                    assert.strictEqual(num_input_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, the search button must exist in header and must be unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_button_elements = array[4];
                    assert.strictEqual(num_button_elements, 1);
                    done();
                }).catch(done);
        });

        it("Search button has text - i.e. it is not empty", function (done) {
            browser.end()
                .then((array) => {
                    let button_text = array[5];
                    assert.notEqual(button_text, "");
                    done();
                }).catch(done);
        });

    });



    describe("Empty search retains footer elements", function () {

        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("header input")
                .type("header input", "")
                .click("header button")
                .wait(200)
                .evaluate(() => {
                    let array = [];
                    array.push(document.querySelectorAll("footer").length);
                    array.push(document.querySelectorAll("footer a").length);
                    array.push(document.querySelector("footer a").href)
                    return array;
                });
        });

        it("After empty search, footer exists and is unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_footer_elements = array[0];
                    assert.strictEqual(num_footer_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, footer has a hyperlink", function (done) {
            browser.end()
                .then((array) => {
                    let num_footer_hyperlink_elements = array[1];
                    assert.strictEqual(num_footer_hyperlink_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, footer hyperlink links to github profile page", function (done) {
            browser.end()
                .then((array) => {
                    let hyperlink_link = array[2];
                    assert.strictEqual(hyperlink_link, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });


    describe("Nightmare tests #content div after empty search", function () {
        
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("header input")
                .type("header input", "")
                .click("header button")
                .wait(200)
                .evaluate(function () {
                    let array = [];
                    array.push(document.querySelectorAll("#content").length);
                    array.push(document.querySelectorAll("#content #results").length);
                    array.push(document.querySelectorAll("#content #no-results").length);
                    return array;
                });
        });

        it("After empty search, #content div exists and is unique", function (done) {
            browser.end()
                .then((array) => {
                    assert.strictEqual(array[0], 1);
                    done();
                }).catch(done);
        });

        it("After empty search, #results div does not exist - as there are no results", function (done) {
            browser.end()
                .then((array) => {
                    assert.strictEqual(array[1], 0);
                    done();
                }).catch(done);
        });

        it("After empty search, #no-results div exist and is unique - showing message that there are no results", function (done) {
            browser.end()
                .then((array) => {
                    assert.strictEqual(array[2], 1);
                    done();
                }).catch(done);
        });

    });
 
});
