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
app.use((req, res) => {
    if (!req.secure) {
        let https_url = `https://${req.headers.host}${req.url}`;
        res.redirect(https_url);
    }
});

/** Serve css and js files with /public mountpoint */
let static_middleware = express.static(path.join(__dirname, "public")); 
app.use("/public", static_middleware);

/** Set callback for GET,/ endpoint to render index.html template */
app.get("/", (req, res) => res.render("index"));

/** Set callback for POST,/ endpoint to render welcome.html subtemplate */
app.post("/welcome", (req, res) => res.render("welcome"));

/* @module app */
module.exports = app;
