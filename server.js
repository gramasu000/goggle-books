/**
 * @fileoverview Create an HTTP server instance and listen on port 3000
 *
 * @author Gautam Ramasubramanian
 *
 * @requires http
 * @requires ./app:app
 */

"use strict"

/** @const http - Built-in HTTP module */
const http = require("http");

/** @const app - ExpressJS instance defined in app.js */
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

/** @const port - Get port number, by default or by environment */
const port = initialize_port();

/** Create an http server instance and feed the expressJS app into it */
let server = http.createServer(app)

/** Set server to listen to port, pass a callback which logs the event */
server.listen(port, () => { 
    console.log(`Application server listening to port ${port}`);
});

