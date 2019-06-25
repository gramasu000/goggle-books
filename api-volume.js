/**
 * @fileoverview Handles querying and data processing associated with the Google Books API Volume Retrieval 
 *
 * @author Gautam Ramasubramanian
 */
"use strict"

/** 
 * Return a request options object detailing the url and other information
 *  associated with Google API volume retrieval
 * 
 * @param {object} req ExpressJS request object
 *
 */
function make_options(req) {
    return {
        uri: "https://www.googleapis.com/books/v1/volumes/" + req.params["volumeId"],
        method: "GET",
        json: true,
        qs: {
            key: "AIzaSyCoxEfQQzTGEyZeoKM8udfBdt1JOuEK16E",
        }
    };
}


/**
 * Converts a camel-case to space delimited group of words, with the first word capitalized.
 *  Useful for converting a key in the JSON object to a label in the served HTML
 *  Stolen from @link{https://stackoverflow.com/questions/7225407/convert-camelcasetext-to-sentence-case-text/38635498 Convert camelCaseText to Sentence Case Text}
 *
 * @param {string} string String in camel case
 *
 * @returns {string} String in Sentence Case, delimited by white space, and first letter of first word capitalized.
 */
function convert(string) {
    // From Stack Overfow
    let new_string = string.replace(/([A-Z])/g, " $1");
    new_string = new_string.charAt(0).toUpperCase() + new_string.slice(1);
    return new_string;
    // From Stack Overflow
}


/** 
 * Get image data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_img(info, data) {
    let obj = {
        img: "https://image.flaticon.com/icons/svg/149/149374.svg"
    };
    if (info["imageLinks"]) {
        obj.img = Object.values(info["imageLinks"]).slice(-1)[0]
    }
    data.push(obj);
}

/** 
 * Get title data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_title(info, data) {
    if (info["title"]) {
        let obj = { 
            label: "Title: ", 
            value: info["title"] 
        };
        data.push(obj);
    }
}

/** 
 * Get subtitle data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_subtitle(info, data) {
    if (info["subtitle"]) {
        let obj = {
            label: "Subtitle: ",
            value: info["subtitle"]
        };
        data.push(obj);
    }
}

/** 
 * Get authors data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_authors(info, data) {
    if (info["authors"] && info["authors"].length > 0) {
        let obj = {};
        if (info["authors"].length === 1) {
            obj.label = "Author";
        } else {
            obj.label = "Authors";
        }
        obj.values = [];
        for (let author of info["authors"]) {
            let obj2 = {
                value: author,
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

/** 
 * Get publisher data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_publisher(info, data) {
    if (info["publisher"]) {
        let obj = {
            label: "Publisher: ",
            value: info["publisher"]
        };
        data.push(obj);
    }
}

/** 
 * Get publishing date data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_publish_date(info, data) {
    if (info["publishedDate"]) {
        let obj = {
            label: "Published Date: ",
            value: info["publishedDate"]
        };
        data.push(obj);
    }
}

/** 
 * Get description data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_description(info, data) {
    if (info["description"]) {    
        let obj = {
            label: "Description",
            values: [{ value: info["description"] }]
        };
        data.push(obj);
    }
}

/** 
 * Get ISBN numbers from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_identifiers(info, data) {
    if (info["industryIdentifiers"]) {
        let obj = {}
        if (info["industryIdentifiers"].length === 1) {
            obj.label = "Identifier";
        } else {
            obj.label = "Identifiers";
        }
        obj.values = [];
        for (let id of info["industryIdentifiers"]) {
            let obj2 = {
                label: id["type"].split("_").join(" ") + ": ",
                value: id["identifier"]
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

/** 
 * Get category data from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_categories(info, data) {
    if (info["categories"]) {
        let obj = {};
        if (info["categories"].length === 1) {
            obj.label = "Category";
        } else {
            obj.label = "Categories";
        }
        obj.values = [];
        for (let category of info["categories"]) {
            let obj2 = {
                value: category,
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

/** 
 * Get image links from info (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_img_links(info, data) {
    if (info["imageLinks"]) {
        let obj = {};
        let keys = Object.keys(info["imageLinks"]);
        let values = Object.values(info["imageLinks"]);
        if (keys.length === 1) {
            obj.label = "Image Link"
        } else {
            obj.label = "Image Links"
        }
        obj.values = [];
        for (let i = 0; i < keys.length; i++) {
            let new_key = convert(keys[i]);
            let obj2 = {
                value: new_key,
                link: values[i]
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

/** 
 * Get preview, info, webreader, and volume links from info and access (if it exists), store it in an object, and push object in data array
 *
 * @param {object} info "volumeInfo" property of JSON object retrieved from Google API
 * @param {object} access "accessInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_links(info, access, data) {
    let prevL = info["previewLink"];
    let infoL = info["infoLink"];
    let canL = info["canonicalVolumeLink"];
    let webL = access["webReaderLink"]
    if (prevL || infoL || canL || webL) {
        let obj = { values: [] };
        let num = 0
        if (prevL) {
            num++;
            obj.values.push({
                value: "Preview",
                link: prevL,
            });
        } 
        if (infoL) {
            num++;
            obj.values.push({
                value: "Info",
                link: infoL,
            });
        }
        if (canL) {
            num++;
            obj.values.push({
                value: "Canonical Volume",
                link: canL,
            });
        }
        if (webL) {
            num++;
            obj.values.push({
                value: "Web Reader",
                link: webL,
            })
        }
        if (num === 1) {
            obj.label = "Link";
        } else {
            obj.label = "Links";
        }
        data.push(obj);
    }
}

/** 
 * Get ebook access information from access (if it exists), store it in an object, and push object in data array
 *
 * @param {object} access "accessInfo" property of JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_ebook(access, data) {
    let epub = access["epub"]["isAvailable"];
    let pdf = access["pdf"]["isAvailable"];
    if (epub || pdf) {
        let obj = { label: "E-book", values: [] }
        if (epub) {
            obj.values.push({
                value: "EPUB",
                link: access["epub"]["acsTokenLink"]
            });
        }
        if (pdf) {
            obj.values.push({
                value: "PDF",
                link: access["pdf"]["acsTokenLink"]
            });
        }
        data.push(obj);
    }
}

/** 
 * Get Google ID from body (if it exists), store it in an object, and push object in data array
 *
 * @param {object} body entire JSON object retrieved from Google API
 * @param {object} data Array of details for a particular volume
 */
function add_id(body, data) {
    if (body["id"]) {
        let obj = {
            label: "Google ID: ",
            value: body["id"]
        }
        data.push(obj);
    }
}

/** 
 * Take in an input the JSON object retrieved from Google API, and process it
 *  to return data, an array of objects containing the data we want to present to application user
 *
 * @param {object} body entire JSON object retrieved from Google API
 *
 * @return {object} data Array of details for a particular volume
 */
function get_details(body) {
    let data = [];
    let info = body["volumeInfo"];
    let access = body["accessInfo"];
    add_title(info, data);
    add_subtitle(info, data);
    add_img(info, data);
    add_authors(info, data);
    add_description(info, data);
    add_id(body, data);
    add_publisher(info, data);
    add_publish_date(info, data);
    add_img_links(info, data);
    add_links(info, access, data);
    add_ebook(access, data);
    add_identifiers(info, data);
    add_categories(info, data);
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
    return function(err, resp, body) {
        let data = get_details(body);
        if (data.length > 0) {
            res.render("details", { data: data })
        } else {
            res.render("no-details");
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
