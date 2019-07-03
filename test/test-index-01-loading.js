/** 
 * @fileoverview Using MochaJS and NightmareJS to test whether index webpage loads properly 
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
describe("Nightmare visits https://goggle-books.herokuapp.com", function() {
    
    this.timeout("15s");

    let browser;

    /** Before running this suite, make a browser instance, go to website */
    before(function () {
        browser = new Nightmare();
        browser.goto("https://goggle-books.herokuapp.com")
            .wait("body")
    });

    /** Make sure 2+2 = 4 according to assert */
    it("Sanity Check (2+2=4)", () => {
        assert.strictEqual(2+2, 4);
    });

    /** Make sure website is loaded without error */
    it("Index page should load without error", function (done) {
        browser.end()
            .then((res) => { done(); })
            .catch(done);
    });


});
