/** 
 * @fileoverview Using MochaJS and NightmareJS to test html elements of webpage footer
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

/** Test whether GET,/ endpoint serves webpage properly */
describe("Nightmare tests https://goggle-books.herokuapp.com footer element", function () {
    
    this.timeout("15s");

    let browser;

    /** Before each test, instantiate a new browser instance */
    beforeEach(() => { browser = new Nightmare(); });

    it("Index page footer should exist and be unique", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("footer") !== null);
                let statement_2 = (document.querySelectorAll("footer").length === 1);
                return [statement_1, statement_2];
            }).end()
            .then(function (array) {
                for (statement of array) {
                    assert.ok(statement);
                }
                done();
            })
    });

    it("Footer span should exist and be unique", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("footer > span") !== null);
                let statement_2 = (document.querySelectorAll("footer > span").length === 1);
                return [statement_1, statement_2];
            }).end()
            .then(function (array) {
                for (statement of array) {
                    assert.ok(statement);
                }
                done()
            })
    });

    it("Footer span should say 'Gautam Ramasubramaian'", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(() => document.querySelector("footer > span").innerHTML) 
            .end()
            .then(function (res) {
                assert.strictEqual(res, "Gautam Ramasubramanian");
                done();
            }).catch(done);
    });

    it("Footer link should exist and be unique", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("footer > a") !== null);
                let statement_2 = (document.querySelectorAll("footer > a").length === 1);
                return [statement_1, statement_2];
            }).end()
            .then(function (array) {
                for (statement of array) {
                    assert.ok(statement);
                }
                done();
            }).catch(done);
    });

    it("Footer link should have href property 'https://github.com/gramasu000'", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(() => document.querySelector("footer > a").href)
            .end()
            .then(function (res) {
                assert.strictEqual(res, "https://github.com/gramasu000");
                done();
            }).catch(done);
    });

    it("Footer link should actually direct the browser to 'https://github.com/gramasu000", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .click("footer > a")
            .wait(200)
            .evaluate(() => document.URL)
            .end()
            .then(function (res) {
                assert.strictEqual(res, "https://github.com/gramasu000");
                done();
            }).catch(done);
    });
    
});
