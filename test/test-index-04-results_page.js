/**
 * @fileoverview Using MochaJS and NightmareJS to test the webpage after a query search
 *
 * @author Gautam Ramasubramanian
 *
 * @requires NPM:nightmare
 * @requires assert
 */

/** @const Nightmare - headless browser class */
const Nightmare = require("nightmare");

/** @const request - HTTP Request module */
const request = require("request");

/** @const assert - assert module object */
const assert = require("assert");

function make_request_options(query, start_index) {
    return {
        uri: "https://www.googleapis.com/books/v1/volumes",
        method: "GET",
        json: true,
        qs: {
            q: query,
            key: "AIzaSyCoxEfQQzTGEyZeoKM8udfBdt1JOuEK16E",
            maxResults: 10,
            maxAllowedMaturityRating: "not-mature",
            startIndex: start_index
        }
    };
}

function convert_item_to_object(item) {
    let object = {
        title: "Title not known",
        authors: "Authors not known",
        publisher: "Publisher not known",
        thumbnail: "https://image.flaticon.com/icons/svg/149/149374.svg",
        id:"no-result"
    }
    if (item["volumeInfo"]["title"]) {
        object.title = item["volumeInfo"]["title"];
    }
    if (item["volumeInfo"]["authors"]) {
        object.authors = item["volumeInfo"]["authors"].join(", ");
    }
    if (item["volumeInfo"]["publisher"]) {
        object.publisher = item["volumeInfo"]["publisher"];
    }
    if (item["volumeInfo"]["imageLinks"]) {
        object.thumbnail = Object.values(item["volumeInfo"]["imageLinks"]).slice(-1)[0];
    }
    if (item["id"]) {
        object.id = item["id"];
    }
    return object;
}

/** Test #content div has all proper elements */
describe("Nightmare tests https://goggle-books.herokuapp.com - Queried Search", function () {
    
    this.timeout("60s");

    let query = "The Power of Now"; 
    let browser;


    describe("Query Search retains header elements", function () {
        
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait(200)
                .type("header input[type='text']", query)
                .click("header button")
                .wait(200)
        });

        it("After query search, header exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header").length)
                .then((num_header_elements) => {
                    assert.strictEqual(num_header_elements, 1);
                    done();
                }).catch(done);
        });

        it("After query search, website 'logo' exists, is unique, and located in the header", function (done) {
            browser.evaluate(() => document.querySelectorAll("header span").length)
                .then((num_header_span_elements) => {
                    assert.strictEqual(num_header_span_elements, 1);
                    done();
                }).catch(done);
        });

        it("After query search, website 'logo' has text - i.e. it is not empty", function (done) {
            browser.evaluate(() => document.querySelector("header span").innerHTML)
                .then((header_span_text) => {
                    assert.notEqual(header_span_text, "");
                    done();
                }).catch(done);
        });

        it("After query search, the text search input must exist in header, and must be unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header input[type='text']").length)
                .then((num_input_elements) => {
                    assert.strictEqual(num_input_elements, 1);
                    done();
                }).catch(done);
        });

        it("After query search, the search button must exist in header and must be unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("header button").length)
                .then((num_button_elements) => {
                    assert.strictEqual(num_button_elements, 1);
                    done();
                }).catch(done);
        });

        it("After query search, search button has text - i.e. it is not empty", function (done) {
            browser.evaluate(() => document.querySelector("header button").innerHTML)
                .then((button_text) => {
                    assert.notEqual(button_text, "");
                    done();
                }).catch(done);
        });

    });


    describe("Queried Search retains footer elements", function () {
         
        beforeEach(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait(200)
                .type("header input[type='text']", query)
                .click("header button")
                .wait(200)
        });

        it("After query search, footer exists and is unique", function (done) {
            browser.evaluate(() => document.querySelectorAll("footer").length)
                .then((num_footer_elements) => {
                    assert.strictEqual(num_footer_elements, 1);
                    done();
                }).catch(done);
        });

        it("After query search, footer has a hyperlink", function (done) {
            browser.evaluate(() => document.querySelectorAll("footer a").length)
                .then((num_footer_hyperlink_elements) => {
                    assert.strictEqual(num_footer_hyperlink_elements, 1);
                    done();
                }).catch(done);
        });

        it("After query search, footer hyperlink links to github profile page", function (done) {
            browser.evaluate(() => document.querySelector("footer a").href)
                .then((hyperlink_link) => {
                    assert.strictEqual(hyperlink_link, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });


    describe("After query search, footer link still works", function () {
       
        before(function () {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait(200)
                .type("header input[type='text']", query)
                .click("header button")
                .wait(200)
                .click("footer > a")
                .wait("body");
        });

        it("After query search, the footer hyperlink, when clicked, should direct browser to proper location", function (done) {
            browser.evaluate(() => document.URL)
                .then((url) => {
                    assert.strictEqual(url, "https://github.com/gramasu000");
                    done();
                }).catch(done);
        });

    });


    describe("Queried Search Results Test", function () {

        let api_results = [];
        let website_results = [];
        
        before(function (done) {
            let options = make_request_options(query, 0);
            let callback = function (err, resp, body) {
                for (item of body.items) {
                    let object = convert_item_to_object(item);
                    api_results.push(object);
                }
                done();
            };
            request(options, callback);
        });

        before(function (done) {
            browser = new Nightmare();
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1")
                .type("header input[type='text']", query)
                .click("header button")
                .wait("#results")
                .evaluate(function () {
                    let results = [];
                    let ids = document.querySelectorAll("#results > li a");
                    let thumbnails = document.querySelectorAll("#results > li img");
                    let titles = document.querySelectorAll("#results > li h1");
                    let authors = document.querySelectorAll("#results > li h2");
                    let publisher = document.querySelectorAll("#results > li p");
                    for (let i = 0; i < ids.length; i++) {
                        results.push({
                            id: ids[i].id,
                            thumbnail: thumbnails[i].src,
                            title: titles[i].innerHTML,
                            authors: authors[i].innerHTML,
                            publisher: publisher[i].innerHTML
                        });
                    }
                    return results;
                }).then(function (results) {
                    website_results = results;
                    done();
                }).catch(done);
        });

        it("Check whether there are 10 total results from api", function () {
            assert.strictEqual(api_results.length, 10);
        });

        it("Check whether there are 10 total results from website", function () {
            assert.strictEqual(website_results.length, 10);
        });
        
        for (let i = 0; i < 10; i++) {

            it(`Check if ids match for result #${i+1}`, function () {
                assert.strictEqual(api_results[i].id, website_results[i].id);
            });

            it(`Check if thumbnail urls match for result #${i+1}`, function () {
                assert.strictEqual(api_results[i].thumbnail, website_results[i].thumbnail);
            });

            it(`Check if titles match for result #${i+1}`, function () {
                assert.strictEqual(api_results[i].title, website_results[i].title);
            });

            it(`Check if authors match for result #${i+1}`, function () {
                assert.strictEqual(api_results[i].authors, website_results[i].authors);
            });

            it(`Check if publishers match for result #${i+1}`, function () {
                assert.strictEqual(api_results[i].publisher, website_results[i].publisher);
            });

        }

    });
});
