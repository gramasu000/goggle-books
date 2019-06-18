/**
 * @fileoverview Using MochaJS and ZombieJS to test welcome webpage, and see if it has all necessary HTML elements
 * 
 * @author Gautam Ramasubramanian
 *
 * @requires assert
 * @requires NPM:zombie
 */

const Browser = require("zombie");

describe("Zombie visits https://goggle-books.herokuapp.com/", () => { 

    let browser;

    before((done) => {
        Browser.localhost("goggle-books.herokuapp.com:443", 3000);
        browser = new Browser();
        browser.visit("/", done)
    })

    describe("Zombie tests the header html elements", () => {
       
        it("The header should exist", () => {
            browser.assert.element("body header");
        });

        it("Header should contain a span of text", () => {
            browser.assert.element("body header span");
        });

    });
    
});
