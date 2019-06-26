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
const http_request = require("request");

/** @const assert - assert module object */
const assert = require("assert");

/** Test #content div has all proper elements */
describe("Nightmare tests https://goggle-books.herokuapp.com - Queried Search", function () {
    
    this.timeout("30s");

    let browser;
    let queries = ["Artemis Fowl", "The Thief and the Beanstalk", "Half Moon Investigations" ]; 
    
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

    function get_results_data() {
        let results_data = [];
        let a_array = document.querySelectorAll("#results > li a");
        let img_array = document.querySelectorAll("#results > li img");
        let h1_array = document.querySelectorAll("#results > li h1");
        let h2_array = document.querySelectorAll("#results > li h2");
        let p_array = document.querySelectorAll("#results > li p");
        for (let i = 0; i < a_array.length; i++) {
            results_data.push({
                id: a_array[i].id,
                thumbnail: img_array[i].src,
                title: h1_array[i].innerHTML,
                authors: h2_array[i].innerHTML,
                publisher: p_array[i].innerHTML
            });
        }
        return { results: results_data, startIndex: start_index };
    }

    function make_assert_callback(object, start_index, done) {
        return function (err, resp, body) {
           assert.strictEqual(object.startIndex, start_index, "Start indices do not match");
           for (let i = 0; i < object.results.length; i++) {
                let item_title = body["items"][i]["volumeInfo"]["title"];
                let item_authors = body["items"][i]["volumeInfo"]["authors"];
                let item_publisher = body["items"][i]["volumeInfo"]["publisher"];
                let item_thumbnail = body["items"][i]["volumeInfo"]["imageLinks"]
                assert.strictEqual(object.results[i].id, body["items"][i]["id"],`ID of result ${i} does not match`);
                if (item_title) {
                    assert.strictEqual(object.results[i].title, item_title, `title of result ${i} does not match`);
                } 
                if (item_authors) {
                    assert.strictEqual(object.results[i].authors, item_authors.join(", "), `authors of result ${i} do not match`);
                }
                if (item_publisher) {
                    assert.strictEqual(object.results[i].publisher, item_publisher, `publisher of result ${i} does not match`);
                } 
                if (item_thumbnail) {
                    item_thumbnail = Object.values(item_thumbnail).slice(-1)[0];
                    assert.strictEqual(object.results[i].thumbnail, item_thumbnail, `thumbnail of result ${i} does not match`);
                }
           }
           done();
        }       
    }

    beforeEach(function () {
        browser = new Nightmare;
    });
    
    for (query of queries) {
        it(`Search "${query}" and see if data in first page matches Google API`, function(done) {
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1")
                .type("header input", query)
                .click("header button")
                .wait("#results")
                .evaluate(get_results_data)
                .end()
                .then(function (object) {
                    http_request(make_request_options(query, 0), make_assert_callback(object, 0, done));
                });
        });

        it(`Search "${query}" and see if data in second page matches Google API`, function(done) {
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1")
                .type("header input", query)
                .click("header button")
                .wait("#next")
                .click("#next")
                .wait("#results")
                .evaluate(get_results_data)
                .end()
                .then(function (object) {
                    http_request(make_request_options(query, 10), make_assert_callback(object, 10, done));
                });
        });

        it(`Search "${query}" and see if data in third page matches Google API`, function(done) {
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1")
                .type("header input", query)
                .click("header button")
                .wait("#next")
                .click("#next")
                .wait("#next")
                .click("#next")
                .wait("#results")
                .evaluate(get_results_data)
                .end()
                .then(function (object) {
                    http_request(make_request_options(query, 20), make_assert_callback(object, 20));
                });
        });

        it(`Search "${query}" and see if data back in first page matches Google API`, function(done) {
            browser.goto("https://goggle-books.herokuapp.com")
                .wait("#content h1")
                .type("header input", query)
                .click("header button")
                .wait("#next")
                .click("#next")
                .wait("#prev")
                .click("#prev")
                .wait("#results")
                .evaluate(get_results_data)
                .end()
                .then(function (object) {
                    http_request(make_request_options(query, 10), make_assert_callback(object, 10));
                });
        });
  
    }

});
