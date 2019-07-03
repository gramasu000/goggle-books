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

        it("Index Page header exists and is unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_header_elements = array[0];
                    assert.strictEqual(num_header_elements, 1);
                    done();
                }).catch(done);
        });

        it("Website 'logo' exists, is unique, and located in the header", function (done) {
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

        it("Text Search Input must exist in header, and must be unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_input_elements = array[3];
                    assert.strictEqual(num_input_elements, 1);
                    done();
                }).catch(done);
        });

        it("Search button must exist in header, and must be unique", function (done) {
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

    })

    describe("Nightmare tests basic functionality of footer", function () {
        
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait(200)
                .evaluate(() => {
                    let array = [];
                    array.push(document.querySelectorAll("footer").length);
                    array.push(document.querySelectorAll("footer a").length);
                    array.push(document.querySelector("footer a").href)
                    return array;
                });
        });


        it("Index Page footer exists and is unique", function (done) {
            browser.end()
                .then((array) => {
                    let num_footer_elements = array[0];
                    assert.strictEqual(num_footer_elements, 1);
                    done();
                }).catch(done);
        });

        it("Index Page footer has a hyperlink", function (done) {
            browser.end()
                .then((array) => {
                    let num_footer_hyperlink_elements = array[1];
                    assert.strictEqual(num_footer_hyperlink_elements, 1);
                    done();
                }).catch(done);
        });

        it("Index Page footer hyperlink links to github profile page", function (done) {
            browser.end()
                .then((array) => {
                    let hyperlink_link = array[2];
                    assert.strictEqual(hyperlink_link, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });

    describe("Nightmare tests footer link", function() {
        
        before(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait(200)
                .click("footer > a")
                .wait(200)
                .evaluate(() => document.URL);
        });

        it("Index Page footer hyperlink, when clicked, should direct browser to proper location", function (done) {
            browser.end()
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
                .wait(200)
                .evaluate(() => document.querySelectorAll("#content").length)
        });

        it("Index page #content div exists and is unique", function (done) {
            browser.end()
                .then((num_content_div_elements) => {
                    assert.strictEqual(num_content_div_elements, 1);
                    done();
                }).catch(done);
        });

    });
 
});
