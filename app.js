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

/** @const path module */
const path = require("path");

/** @const express application instance */
const app = express();

/** @const express middleware function for enforcing HTTPS connection */
const redirect = require("heroku-ssl-redirect");

/** Set view engine to Pug */
app.set("view engine", "pug");

/** Use HTTPS redirect middleware in application - to redirect HTTP connections to HTTPS */
app.use(redirect());

/** Serve css and js files with /public mountpoint */
let static_middleware = express.static(path.join(__dirname, "public")); 
app.use("/public", static_middleware);

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

/* @module app */
module.exports = app;
