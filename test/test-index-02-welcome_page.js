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
describe("Nightmare tests https://goggle-books.herokuapp.com index/welcome page", function() {
    
    this.timeout("15s");

    let browser;

    describe("Nightmare tests basic functionality of header", function () {
        
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuall.com")
                .wait(200)
                .evaluate(() => {
                    let array = [];
                    array.push(document.querySelectorAll("header").length);
                    array.push(document.querySelectorAll("header span").length);
                    array.push(document.querySelectorAll("header span").innerHTML);
                    array.push(document.querySelectorAll("header input[type='text']").length);
                    array.push(document.querySelectorAll("header button").length);
                    array.push(document.querySelectorAll("header button").innerHTML);
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

    it("All html sub-elements of header should exist, be unique and have the appropriate value", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let array = [];
                array.push(document.querySelector("header") !== null);
                array.push(document.querySelectorAll("header").length === 1);
                array.push(document.querySelector("header > span") !== null);
                array.push(document.querySelectorAll("header > span").length === 1);
                array.push(document.querySelector("header > span").innerHTML === "Goggle Books");
                array.push(document.querySelector("header input") !== null);
                array.push(document.querySelectorAll("header input").length === 1);
                array.push(document.querySelector("header input").getAttribute("type") === "text");
                array.push(document.querySelector("header button") !== null);
                array.push(document.querySelectorAll("header button").length === 1);
                array.push(document.querySelectorAll("header button").innerHTML === "Search");
                return array; 
            }).end()
            .then(function (array) {
                for (let i = 0; i < array.length; i++) {
                    assert.ok(array[i], `Statement ${i} did not hold.`);
                }
                done();
            }).catch(done);
    });

    it("All html sub-elements of footer should exist, be unique and have the appropriate value", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let array = [];
                array.push(document.querySelector("footer") !== null);
                array.push(document.querySelectorAll("footer").length === 1);
                array.push(document.querySelector("footer > span") !== null);
                array.push(document.querySelectorAll("footer > span").length === 1);
                array.push(document.querySelector("footer > span").innerHTML === "Gautam Ramasubramanian");
                array.push(document.querySelector("footer > a") !== null);
                array.push(document.querySelectorAll("footer > a").length === 1);
                array.push(document.querySelector("footer > a").href === "https://github.com/gramasu000")
                return array;
            }).end()
            .then(function (array) {
                for (let i = 0; i < array.length; i++) {
                    assert.ok(array[i], `Statement ${i} did not hold.`);
                }
                done();
            }).catch(done);
    });
    
    it("Footer link should direct the browser to 'https://github.com/gramasu000", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .click("footer > a")
            .wait(200)
            .evaluate(() => document.URL === "https://github.com/gramasu000")
            .end()
            .then(function (res) {
                assert.ok(res);
                done();
            }).catch(done);
    });

    it("All sub elements of #content div should exist, be unique and have appropriate value", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let array = [];
                array.push(document.querySelector("#content") !== null);
                array.push(document.querySelectorAll("#content").length === 1);
                array.push(document.querySelector("#content > h1") !== null);
                array.push(document.querySelector("#content > h1").innerHTML !== "");
                array.push(document.querySelector("#content > p") !== null);
                array.push(document.querySelector("#content > p").innerHTML !== "");
                return array;
            }).end()
            .then(function (array) {
                for (let i = 0; i < array.length; i++) {
                    assert.ok(array[i], `Statement ${i} did not hold.`);
                }
                done();
            }).catch(done);
    });
 
});
