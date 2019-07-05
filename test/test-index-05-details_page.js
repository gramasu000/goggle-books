/**
 * @fileoverview Using MochaJS and NightmareJS to test the webpage when showind details of a particular book.
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

function make_request_options(id) {
    return {
        uri: `https://www.googleapis.com/books/v1/volumes/${id}`,
        method: "GET",
        json: true,
        qs: {
            key: "AIzaSyCoxEfQQzTGEyZeoKM8udfBdt1JOuEK16E",
        }
    };
}

function convert_to_htmls(body) {
    let htmls = [];
    if (body["volumeInfo"]["title"]) {
        htmls.push(`<p><b>Title: </b>${body["volumeInfo"]["title"]}</p>`);
    }
    if (body["volumeInfo"]["subtitle"]) {
        htmls.push(`<p><b>Subtitle: </b>${body["volumeInfo"]["subtitle"]}</p>`);
    }
    //if (body["volumeInfo"]["imageLinks"]) {
    //    let imgsrc = Object.values(body["volumeInfo"]["imageLinks"]).slice(-1)[0];
    //    htmls.push(`<img src="${imgsrc}">`);
    //}
    if (body["volumeInfo"]["authors"]) {
        let authors = body["volumeInfo"]["authors"];
        let label = (authors.length == 1) ? "Author" : "Authors";
        let html = `<p><b>${label}</b></p>`
        for (let author of authors) {
            html += `<div><p>${author}</p></div><br>`;
        }
        htmls.push(html);
    }
    if (body["volumeInfo"]["description"]) {
        htmls.push(`<p><b>Description</b></p><div><p>${body["volumeInfo"]["description"]}</p></div><br>`);
    }
    if (body["id"]) {
        htmls.push(`<p><b>Google ID: </b>${body["id"]}</p>`);
    }
    if (body["volumeInfo"]["publisher"]) {
        htmls.push(`<p><b>Publisher: </b>${body["volumeInfo"]["publisher"]}</p>`);
    }
    if (body["volumeInfo"]["publishedDate"]) {
        htmls.push(`<p><b>Published Date: </b>${body["volumeInfo"]["publishedDate"]}</p>`);
    }
    if (body["volumeInfo"]["industryIdentifiers"]) {
        let identifiers = body["volumeInfo"]["industryIdentifiers"];
        let label = identifiers.length === 1 ? "Identifier" : "Identifiers";
        let html = `<p><b>${label}</b></p>`
        for (let id of identifiers) {
            let id_label = id["type"].split("_").join(" ");
            html += `<div><p><b>${id_label}: </b>${id["identifier"]}</p></div><br>`;
        }
        htmls.push(html);
    }
    if (body["volumeInfo"]["categories"]) {
        let categories = body["volumeInfo"]["categories"];
        let label = (categories.length == 1) ? "Category" : "Categories";
        let html = `<p><b>${label}</b></p>`
        for (let category of categories) {
            html += `<div><p>${category}</p></div><br>`;
        }
        htmls.push(html);

    }
    return htmls;
}


// Change this to whatever you want - provided it is a valid id
let id = "pNruBgrGSFUC";

let api_htmls = [];
let options = make_request_options(id);
let callback = function (err, resp, body) {
    api_htmls = convert_to_htmls(body);
    make_tests();
    run();
}

request(options, callback);

function make_tests() {
    /** Test #content div has all proper elements */
    describe("Nightmare tests https://goggle-books.herokuapp.com - Details Pages", function () {
        
        this.timeout("30s");


        describe("Tests whether Details Page corresponds to Google Books Volume Info", function () {

            let website_htmls = [];

            before(function (done) {
                browser = new Nightmare();
                browser.goto("https://goggle-books.herokuapp.com")
                    .wait("#content h1")
                    .type("header input", `id:${id}`)
                    .click("header button")
                    .wait("#results li")
                    .click("#results li a")
                    .wait("#details li")
                    .evaluate(function () {
                        let results = []
                        for (let item of document.querySelectorAll("#details > li > div")) {
                            // Skip the image, links and ebook details
                            let html = item.innerHTML.replace(/&amp;/g, "&");
                            if (html.search("img") === -1 && html.search("Links") === -1 && html.search("E-book") === -1) {
                                results.push(html);
                            }
                        }
                        return results;
                    }).then(function (results) {
                        website_htmls = results;
                        done();
                    }).catch(done);
            });

            for (let i = 0; i < api_htmls.length; i++) {
                it(`Check that ${i}th detail in list matches Google API`, function () {
                    assert.strictEqual(website_htmls[i], api_htmls[i]);
                });
            }

        });

    });
}
