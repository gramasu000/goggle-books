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
describe("Nightmare tests https://goggle-books.herokuapp.com - empty search", function () {
    
    this.timeout("15s");

    let browser;

    beforeEach(function () {
        browser = new Nightmare;
    });

    it("Empty search results page - Header html elements do not change", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .type("header > div > input[type=text]", "")
            .click("header > button")
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
                array.push(document.querySelector("header button").innerHTML === "Search");
                return array; 
            }).end()
            .then(function (array) {
                for (let i = 0; i < array.length; i++) {
                    assert.ok(array[i], `Statement ${i} did not hold.`);
                }
                done();
            }).catch(done);
    });

    it("Empty search results page - Footer elements do not change", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .type("header > div > input[type=text]", "")
            .click("header > button")
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

    it("Empty search results page - check #content div", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .type("header > div > input[type=text]", "")
            .click("header > button")
            .wait(200)
            .evaluate(function () {
                let array = [];
                array.push(document.querySelector("#content > #no-results") !== null);
                array.push(document.querySelectorAll("#content > #no-results").length === 1);
                array.push(document.querySelector("#content > #no-results").innerHTML === "No Results");
                array.push(document.querySelector("#content > #change-page") !== null);
                array.push(document.querySelectorAll("#content > #change-page").length === 1);
                array.push(document.querySelectorAll("#content > #change-page > button").length === 2);
                array.push(document.querySelector("#content > #change-page > #next") !== null);
                array.push(document.querySelector("#content > #change-page > #prev") !== null);
                array.push(document.querySelector("#content > #change-page > #next").innerHTML === "Next Page");
                array.push(document.querySelector("#content > #change-page > #prev").innerHTML === "Previous Page");
                array.push(document.querySelector("#content > #change-page > #next").disabled === true);
                array.push(document.querySelector("#content > #change-page > #prev").disabled === true);
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
