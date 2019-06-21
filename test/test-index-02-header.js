/** 
 * @fileoverview Using MochaJS and NightmareJS to test html elements of webpage header
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
describe("Nightmare tests https://goggle-books.herokuapp.com header element", function() {
    
    this.timeout("15s");

    let browser;

    /** Before each test, instantiate a new browser instance*/
    beforeEach(function () {
        browser = new Nightmare();
    });

    it("Index page header should exist and should be unique", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("header") !== null);
                let statement_2 = (document.querySelectorAll("header").length === 1);
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

    it("Header span text should exist", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("header > span") !== null);
                let statement_2 = (document.querySelectorAll("header > span").length === 1);
                return [statement_1, statement_2];
            })
            .end()
            .then((array) => { 
                for (statement of array) {
                    assert.ok(statement);
                }
                done();
            }).catch(done);
    });

    it("Header span text should say 'Goggle Books'", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(() => document.querySelector("header > span").innerHTML)
            .end()
            .then((res) => { 
                assert.strictEqual(res, "Goggle Books"); 
                done(); 
            }).catch(done);
    });

    it("Header input should exist", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("header > form > input") !== null);
                let statement_2 = (document.querySelectorAll("header > form > input").length === 1);
                return [statement_1, statement_2];
            })
            .end()
            .then((array) => { 
                for (statement of array) {
                    assert.ok(statement);
                }
                done();
            }).catch(done);
    });

    it("Header input should be text input", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(() => document.querySelector("header > form > input").getAttribute("type"))
            .end()
            .then((res) => { 
                assert.strictEqual(res, "text"); 
                done(); 
            }).catch(done);
    });

    it("Header button should exist", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(function () {
                let statement_1 = (document.querySelector("header > form > button") !== null);
                let statement_2 = (document.querySelectorAll("header > form > button").length === 1);
                return [statement_1, statement_2];
            })
            .end()
            .then((array) => { 
                for (statement of array) {
                    assert.ok(statement);
                }
                done();
            }).catch(done);
    });

    it("Header button should say 'Search'", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .evaluate(() => document.querySelector("header > form > button").innerHTML)
            .end()
            .then((res) => { 
                assert.strictEqual(res, "Search");
                done();
            }).catch(done);
    });

});
