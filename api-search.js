/**
 * @fileoverview Handles querying and data processing associated with the Google Books API Query Search   
 *
 * @author Gautam Ramasubramanian
 */
"use strict"

/** 
 * Return a request options object detailing the url and other information
 *  associated with the Google Books API search.
 * 
 * @param {object} req ExpressJS request object 
 *
 * @returns {object}  Request options object for Google Books API Search
 */
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

/** 
 * Get book title data from info (if it exists) and store it in obj
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} obj Object which represented a particular volume (to be shown in search results webpage)
 */
function get_title(info, obj) {
    obj.title = "Title not known";
    if (info["title"]) {
        obj.title = info["title"];
    }
}

/** 
 * Get authors array data from info (if it exists) and store it in obj
 *  Join all the authors in a comma-separated string
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} obj Object which represented a particular volume (to be shown in search results webpage)
 */
function get_authors(info, obj) {
    obj.authors = "Authors not known";
    if (info["authors"]) {
        obj.authors = info["authors"].join(", ");
    }
}

/** 
 * Get publisher array data from info (if it exists) and store it in obj
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} obj Object which represented a particular volume (to be shown in search results webpage)
 */
function get_publisher(info, obj) {
    obj.publisher = "Publisher not known";
    if (info["publisher"]) {
        obj.publisher = info["publisher"];
    }
}

/** 
 * Get image link from info (if it exists) and store it in obj
 *  Get image link of largest size - imagelink object orders links in increasing size,
 *      so get the last link.
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} obj Object which represented a particular volume (to be shown in search results webpage)
 */
function get_thumbnail(info, obj) {
    obj.thumbnail = "https://image.flaticon.com/icons/svg/149/149374.svg";
    if (info["imageLinks"]) {
        obj.thumbnail = Object.values(info["imageLinks"]).slice(-1)[0]; 
    }
}

/** 
 * Get Google ID from info (if it exists) and store it in obj
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} obj Object which represented a particular volume (to be shown in search results webpage)
 */
function get_id(item, obj) {
    obj.id = "no-result";
    if (item["id"]) {
        obj.id = item["id"];
    }
}


/** 
 * Take in as input the JSON object retrieved from Google API, and process it to
 *  return data, an array of objects containing the data we want to present to application user
 *
 * @param {object} body JSON object retrieved from Google API
 *
 * @returns {object} data Array of volumes (results from search), each volume is an object containing the title, authors, publisher, thumbnail link and Google ID 
 */
function get_data(body) {
    let data = [];
    if (body.items) {
        for (let item of body.items) {
            let info = item["volumeInfo"];
            let obj = {};
            get_title(info, obj);
            get_authors(info, obj);
            get_publisher(info, obj);
            get_thumbnail(info, obj);
            get_id(item, obj);
            data.push(obj);
        }
    } 
    return data;
}


/* 
 * Return a callback function which request module can use to 
 *  convert the retrieved json data from Google, process it and send html to the application user
 *
 *  @param {object} res - ExpressJS response object
 *
 *  @returns {function} Callback function for request module
 */
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

/* @module 
 * An object which encapsulates the make_options and make_callback functions in this file
 */
module.exports = {
    make_options: make_options,
    make_callback: make_callback
}
