/**
 * @fileoverview Create an HTTP server instance and listen on port 3000
 *
 * @author Gautam Ramasubramanian
 *
 * @requires http
 * @requires ./app:app
 */

"use strict"

/** @const http module */
const http = require("http");

/** @const app module */
const app = require("./app");

/** @const port number */
const port = 3000;

/** Create an http server instance */
let server = http.createServer(app)

/** Set server to listen to port */
server.listen(port);

