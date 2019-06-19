/**
 * @fileoverview Using MochaJS and ZombieJS to test index webpage
 *      specifically html elements inside #content div
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
        browser.visit("https://goggle-books.herokuapp.com", done);
        browser.evaluate("window.onload()");
        console.log(browser.html());
    })

    describe("Zombie tests the #content elements", () => {
        
        it("Zombie is at correct url", () => {
            browser.assert.url("https://goggle-books.herokuapp.com")
        });

        it("The #content div should exist", () => {
            browser.assert.element("body #content");
        });

        it("The #content heading text should exist", () => {
            browser.assert.element("body #content h1");
        });
      
        it("The #content heading should have appropriate text", () => {
            browser.assert.text("body #content h1", "Welcome to Goggle Books");
        });

        it("The #content paragraph text should exist", () => {
            browser.assert.element("body #content p");
        });

        it("The #content paragraphs should have appropriate text", () => {
            browser.assert.text("body #content p", 
                "This application is a front end to the Google Books API.");
            browser.assert.text("body #content p", 
                "In order to begin, type a query in the search bar.");
            browser.assert.text("body #content p",
                "Press Search to see Google Books results.");
        });
    
    });
});
