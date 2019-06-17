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

/** Serve static files with /static mountpoint */
app.use("/static", path.join(__dirname, "static"));

/** Set view engine to Pug */
app.set("view engine", "pug");

/** Set callback for GET,/ endpoint to render index.html template */
app.get("/", (req, res) => res.render("index"));

/** Set callback for GET,/ endpoint to render welcome.html subtemplate */
app.get("/welcome", (req, res) => res.render("welcome"));

/* @module app */
module.exports = app;
