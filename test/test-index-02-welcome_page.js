/** 
 * @fileoverview Using MochaJS and NightmareJS to test html elements of welcome webpage
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

/** Test whether GET, / endpoint serves webpage properly */
describe("Nightmare tests https://goggle-books.herokuapp.com index page", function() {
    
    this.timeout("15s");

    let browser;

    describe("Nightmare tests basic functionality of header", function () {
        
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1");
        });

        it("Index Page header exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header").length)
                .then((num_header_elements) => {
                    assert.strictEqual(num_header_elements, 1);
                    done();
                }).catch(done);
        });

        it("Website 'logo' exists, is unique, and located in the header", function (done) {
            browser.evaluate(() => document.querySelectorAll("header span").length)
                .then((num_header_span_elements) => {
                    assert.strictEqual(num_header_span_elements, 1);
                    done();
                }).catch(done);
        });

        it("Website 'logo' has text - i.e. it is not empty", function (done) {
            browser.evaluate(() => document.querySelector("header span").innerHTML)
                .then((header_span_text) => {
                    assert.notEqual(header_span_text, "");
                    done();
                }).catch(done);
        });

        it("Text Search Input must exist in header, and must be unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header input[type='text']").length)
                .then((num_input_elements) => {
                    assert.strictEqual(num_input_elements, 1);
                    done();
                }).catch(done);
        });

        it("Search button must exist in header, and must be unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header button").length)
                .then((num_button_elements) => {
                    assert.strictEqual(num_button_elements, 1);
                    done();
                }).catch(done);
        });

        it("Search button has text - i.e. it is not empty", function (done) {
            browser.evaluate(() => document.querySelector("header button").innerHTML)
                .then((button_text) => {
                    assert.notEqual(button_text, "");
                    done();
                }).catch(done);
        });

    })

    describe("Nightmare tests basic functionality of footer", function () {
        
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1");
        });


        it("Index Page footer exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("footer").length)
                .then((num_footer_elements) => {
                    assert.strictEqual(num_footer_elements, 1);
                    done();
                }).catch(done);
        });

        it("Index Page footer has a hyperlink", function (done) {
            browser.evaluate(() => document.querySelectorAll("footer a").length)
                .then((num_footer_hyperlink_elements) => {
                    assert.strictEqual(num_footer_hyperlink_elements, 1);
                    done();
                }).catch(done);
        });

        it("Index Page footer hyperlink links to github profile page", function (done) {
            browser.evaluate(() => document.querySelector("footer a").href)
                .then((hyperlink_link) => {
                    assert.strictEqual(hyperlink_link, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });

    describe("Nightmare tests footer link", function() {
        
        before(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1")
                .click("footer > a")
                .wait("body");
        });

        it("Index Page footer hyperlink, when clicked, should direct browser to proper location", function (done) {
            browser.evaluate(() => document.URL)
                .then((url) => {
                    assert.strictEqual(url, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });


    describe("Nightmare tests #content div", function () {
        
        before(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait(200);
        });

        it("Index page #content div exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("#content").length)
                .then((num_content_div_elements) => {
                    assert.strictEqual(num_content_div_elements, 1);
                    done();
                }).catch(done);
        });

    });
 
});
