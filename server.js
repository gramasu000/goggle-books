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

/** 
 * Initialize port number to environment variable
 *  or if that does not exist, 3000
 *
 * @returns {number} - The port number for server to listen 
 */
function initialize_port() {
    let env_port = parseInt(process.env.PORT);
    return env_port || 3000;
}

/** @const port number */
const port = initialize_port();

/** Create an http server instance */
let server = http.createServer(app)

/** Set server to listen to port */
server.listen(port);

