/**
 * @fileoverview Using MochaJS and NightmareJS to test the index webpage #content element
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
describe("Nightmare tests https://goggle-books.herokuapp.com #content div", function () {
    
    this.timeout("15s");

    let browser;

    beforeEach(function () {
        browser = new Nightmare;
    });

    it("Index page #content div should exist", function (done) {
       browser.goto("https://goggle-books.herokuapp.com")
        .wait(200)
        .evaluate(function () {
            let statement_1 = (document.querySelector("#content") !== null);
            let statement_2 = (document.querySelectorAll("#content").length === 1);
            return [statement_1, statement_2];
        })
        .end()
        .then(function (array) {
            for (statement of array) {
                assert.ok(statement);
            }
            done();
        }).catch(done);
    });

    it("#content h1 tag should exist", function (done) {
       browser.goto("https://goggle-books.herokuapp.com")
        .wait(200)
        .evaluate(function () {
            return (document.querySelector("#content > h1") !== null);
        })
        .end()
        .then(function (res) {
            assert.ok(res);
            done();
        }).catch(done);
    });

    it("#content h1 tag should contain text", function (done) {
       browser.goto("https://goggle-books.herokuapp.com")
        .wait(200)
        .evaluate(function () {
            return (document.querySelector("#content > h1").innerHTML !== "");
        })
        .end()
        .then(function (res) {
            assert.ok(res);
            done();
        }).catch(done);
    });

    it("#content p tag should exist", function (done) {
       browser.goto("https://goggle-books.herokuapp.com")
        .wait(200)
        .evaluate(function () {
            return (document.querySelector("#content > p") !== null);
        })
        .end()
        .then(function (res) {
            assert.ok(res);
            done();
        }).catch(done);
    });
    
    it("#content p tag should contain text", function (done) {
       browser.goto("https://goggle-books.herokuapp.com")
        .wait(200)
        .evaluate(function () {
            return (document.querySelector("#content > p").innerHTML !== "");
        })
        .end()
        .then(function (res) {
            assert.ok(res);
            done();
        }).catch(done);
    });

});
