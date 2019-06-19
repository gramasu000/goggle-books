/**
 * @fileoverview Using MochaJS and ZombieJS to test index webpage 
 *      specifically the header and footer html elements
 * 
 * @author Gautam Ramasubramanian
 *
 * @requires NPM:zombie
 */

const Browser = require("zombie");

describe("Zombie visits https://goggle-books.herokuapp.com/", () => { 

    let browser;

    before((done) => {
        browser = new Browser();
        browser.visit("https://goggle-books.herokuapp.com", done)
    })

    describe("Zombie tests the header html elements", () => {

        it("Zombie is at correct url", () => {
            browser.assert.url("https://goggle-books.herokuapp.com")
        });

        it("The header should exist", () => {
            browser.assert.element("body header");
        });

        it("Header should contain a span of text", () => {
            browser.assert.element("body header span");
        });

        it("Span element in header has appropriate text", () => {
            browser.assert.text("body header span", "Goggle Books");
        });

        it("Header should contain form element", () => {
            browser.assert.element("body header form");
        });

        it("Form element in header should contain input element", () => {
            browser.assert.element("body header form input");
        });

        it("input element in form should be of type text", () => {
             browser.assert.attribute("body header form input", "type", "text");
        });

        it("Form element in header also contains button element", () => {
            browser.assert.element("body header form button");
        });

        it("Button element has appropriate text", () => {
            browser.assert.text("body header form button", "Search");
        });

    });


    describe("Zombie tests the footer html elements", () => {
        
        it("The footer should exist", () => {
            browser.assert.element("body footer");
        });
        
        it("Footer should contain a span of text", () => {
            browser.assert.element("body footer span");
        });

        it("Footer span should contain appropriate text", () => {
            browser.assert.text("body footer span", "Gautam Ramasubramanian");
        });

        it("Footer should contain a link", () => {
            browser.assert.element("body footer a");
        });
    });

    
});
