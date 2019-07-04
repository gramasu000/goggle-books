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
                .wait("#no-results");
        });

        it("After empty search, header exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header").length)
                .then((num_header_elements) => {
                    assert.strictEqual(num_header_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, website 'logo' exists, is unique, and located in the header", function (done) {
            browser.evaluate(() => document.querySelectorAll("header span").length)
                .then((num_header_span_elements) => {
                    assert.strictEqual(num_header_span_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, website 'logo' has text - i.e. it is not empty", function (done) {
            browser.evaluate(() => document.querySelector("header span").innerHTML)
                .then((header_span_text) => {
                    assert.notEqual(header_span_text, "");
                    done();
                }).catch(done);
        });

        it("After empty search, the text search input must exist in header, and must be unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header input[type='text']").length)
                .then((num_input_elements) => {
                    assert.strictEqual(num_input_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, the search button must exist in header and must be unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header button").length)
                .then((num_button_elements) => {
                    assert.strictEqual(num_button_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, search button has text - i.e. it is not empty", function (done) {
            browser.evaluate(() => document.querySelector("header button").innerHTML)
                .then((button_text) => {
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
                .wait("#no-results");
        });

        it("After empty search, footer exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("footer").length)
                .then((num_footer_elements) => {
                    assert.strictEqual(num_footer_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, footer has a hyperlink", function (done) {
            browser.evaluate(() => document.querySelectorAll("footer a").length)
                .then((num_footer_hyperlink_elements) => {
                    assert.strictEqual(num_footer_hyperlink_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, footer hyperlink links to github profile page", function (done) {
            browser.evaluate(() => document.querySelector("footer a").href)
                .then((hyperlink_link) => {
                    assert.strictEqual(hyperlink_link, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });

    describe("After empty search, footer link still works", function() {
        
        before(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("header input")
                .type("header input", "")
                .click("header button")
                .wait("#content h1")
                .click("footer > a")
                .wait("body");
        });

        it("After empty search, the footer hyperlink, when clicked, should direct browser to proper location", function (done) {
            browser.evaluate(() => document.URL)
                .then((url) => {
                    assert.strictEqual(url, "https://github.com/gramasu000");
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
                .wait("#no-results");
        });

        it("After empty search, #content div exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("#content").length)
                .then((num_content_elements) => {
                    assert.strictEqual(num_content_elements, 1);
                    done();
                }).catch(done);
        });

        it("After empty search, #results div does not exist - as there are no results", function (done) {
            browser.evaluate(() => document.querySelectorAll("#content #results").length)
                .then((num_result_elements) => {
                    assert.strictEqual(num_result_elements, 0);
                    done();
                }).catch(done);
        });

        it("After empty search, #no-results div exist and is unique - showing message that there are no results", function (done) {
            browser.evaluate(() => document.querySelectorAll("#content #no-results").length)
                .then((num_no_results_elements) => {
                    assert.strictEqual(num_no_results_elements, 1);
                    done();
                }).catch(done);
        });

    });
 
});
