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

/** @const express - ExpressJS web app framework module 
 *  @const app - An express server instance
 *  Set the view engine to use PugJS
 */
const express = require("express");
const app = express();
app.set("view engine", "pug");

/** @const redirect - middleware function for enforcing HTTPS connection in Heroku platform 
 * Call this middleware function first when user connects to any part of the site.
 */
const redirect = require("heroku-ssl-redirect");
app.use(redirect());

/** @const path - Inbuild filepath manipulation module 
 * Serve css and js files (static files) in /public url
 */
const path = require("path");
let static_middleware = express.static(path.join(__dirname, "public")); 
app.use("/public", static_middleware);


/** Set callback for GET, / endpoint 
 * Log the event and render index.pug template
 */
app.get("/", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}. Rendering index webpage.`);
    res.render("index");
});

/** Set callback for POST, /welcome endpoint
 * Log the event and render welcome.pug template
 * This endpoint will send back html which will be embedded in the webpage. 
 */
app.post("/welcome", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}. Sending welcome html.`);
    res.render("welcome");
});

/** @const http_req - Module to make HTTP requests */
const http_req = require("request");

/** Set callback for POST, /search endpoint
 *  @const search_api - Module from ./api-search.js (Handles querying and data processing of Google Book Search)
 *  Makes an http request to Google Books Search, gets the results
 *      and renders it in html to serve to the user.
 */
const search_api = require("./api-search"); 
app.post("/search", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}.`)
    http_req(search_api.make_options(req), search_api.make_callback(res));
});

/** Set callback for POST, /volume endpoint
 *  @const volume_api - Module from ./api-volume.js (Handles querying and data processing of Google Volume Info)
 *  Makes an http request to Google Volume Information, gets the details
 *      and renders it in html to server to the user.
 */ 
const volume_api = require("./api-volume");
app.post("/volume/:volumeId", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}.`)
    http_req(volume_api.make_options(req), volume_api.make_callback(res));
});

/* @module app - Export Express instance to be used in server.js file */
module.exports = app;
