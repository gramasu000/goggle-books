/**
 * @fileoverview Define an express app instance, specify all middleware+routing and export it
 *
 * @author Gautam Ramasubramanian
 *
 * @requires NPM:express
 * @requires NPM:heroku-ssl-redirect
 * @requires path
 */

"use strict"

/** @const express module */
const express = require("express");

/** @const express application instance */
const app = express();

/** Set view engine to Pug */
app.set("view engine", "pug");

/** @const express middleware function for enforcing HTTPS connection */
const redirect = require("heroku-ssl-redirect");

/** Use HTTPS redirect middleware in application - to redirect HTTP connections to HTTPS */
app.use(redirect());

/** @const path module */
const path = require("path");

/** Serve css and js files with /public mountpoint */
let static_middleware = express.static(path.join(__dirname, "public")); 
app.use("/public", static_middleware);

const http_req = require("request");

function make_options(req) {
    return {
        uri: "https://www.googleapis.com/books/v1/volumes",
        method: "GET",
        json: true,
        qs: {
            q: req.query.q,
            key: "AIzaSyCoxEfQQzTGEyZeoKM8udfBdt1JOuEK16E",
            maxResults: req.query.maxResults,
            maxAllowedMaturityRating: "not-mature",
            startIndex: req.query.startIndex,
        }
    };
}

function get_data(body) {
    let data = [];
    if (body.items) {
        for (let item of body.items) {
            let info = item["volumeInfo"];
            let title = info["title"] || "Title not known";
            let publisher = info["publisher"] || "Publisher not known";
            let infolink = info["infoLink"] || "#";
            let authors = "Authors not known";
            if (info["authors"]) {
                authors = info["authors"].join(", ");
            }
            let thumbnail = "https://image.flaticon.com/icons/svg/149/149374.svg";
            if (info["imageLinks"]) {
                thumbnail = Object.values(info["imageLinks"]).slice(-1)[0]; 
            }
            data.push ({
                title: title,
                authors: authors,
                publisher: publisher,
                thumbnail: thumbnail,
                infolink: infolink
            });
        }
    } 
    return data;
}


function make_callback(res) {
    return function (err, resp, body) {
        let data = get_data(body);
        if (data.length > 0) {
            res.render("list", { data: data });
        } else {
            res.render("no-result");
        }
    }
}

/** Set callback for GET,/ endpoint to 
 *      (1) render index.html template if request is through HTTPS 
 *      (2) redirect to HTTPS link if request is through HTTP
 */
app.get("/", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}. Rendering index webpage.`);
    res.render("index");
});

/** Set callback for POST,/ endpoint to 
 *      (1) render welcome.html subtemplate if request is through HTTPS
 *      (2) Give a 404 error is request is not secure
 */
app.post("/welcome", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}. Sending welcome html.`);
    res.render("welcome");
});

app.post("/search", (req, res, next) => {
    http_req(make_options(req), make_callback(res));
});

app.post("/", (req, res) => {
    console.log("App posting to /");
    console.log(req.args);
});

/* @module app */
module.exports = app;
