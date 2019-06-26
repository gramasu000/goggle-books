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
describe("Nightmare tests https://goggle-books.herokuapp.com welcome page", function() {
    
    this.timeout("15s");

    let browser;

    /** Before each test, instantiate a new browser instance*/
    beforeEach(function () {
        browser = new Nightmare();
    });

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
