/**
 * @fileoverview Define an express app instance, specify all middleware+routing and export it
 *
 * @author Gautam Ramasubramanian
 *
 * @requires NPM:express
 * @requires path
 */

"use strict"

/** @const express module */
const express = require("express");

/** @const path module */
const path = require("path");

/** @const express application instance */
const app = express();

/** Set view engine to Pug */
app.set("view engine", "pug");

/** Set middleware to redirect HTTP requests to HTTPS */
app.use((req, res, next) => {
    if (!req.secure) {
        console.log(`App attempting to connect using protocol ${req.protocol}. Redirecting to https.`);
        let https_url = `https://${req.headers.host}${req.url}`;
        res.redirect(https_url);
    }
    console.log(`App connecting using protocol ${req.protocol}. Serving webpages now.`);
    next();
});

/** Serve css and js files with /public mountpoint */
let static_middleware = express.static(path.join(__dirname, "public")); 
app.use("/public", static_middleware);

/** Set callback for GET,/ endpoint to render index.html template */
app.get("/", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}. Rendering index webpage.`)
    res.render("index");
});

/** Set callback for POST,/ endpoint to render welcome.html subtemplate */
app.post("/welcome", (req, res) => {
    console.log(`App connecting to ${req.url} using HTTP method ${req.method}. Sending welcome html.`)
    res.render("welcome")
});

/* @module app */
module.exports = app;
