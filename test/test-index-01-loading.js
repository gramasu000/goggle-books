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

    /** Before each test, instantiate a new browser instance*/
    beforeEach(function () {
        browser = new Nightmare();
    });

    /** Visit the webpage and make sure that there is no error */
    it("Index page should load without error", function (done) {
        browser.goto("https://goggle-books.herokuapp.com")
            .wait(200)
            .end()
            .then((res) => { done(); })
            .catch(done);
    });


});
