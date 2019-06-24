
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
function convert(string) {
    // From Stack Overfow
    let new_string = string.replace(/([A-Z])/g, " $1");
    new_string = new_string.charAt(0).toUpperCase() + new_string.slice(1);
    return new_string;
    // From Stack Overflow
}

function add_img(info, data) {
    let obj = {
        img: "https://image.flaticon.com/icons/svg/149/149374.svg"
    };
    if (info["imageLinks"]) {
        obj.img = Object.values(info["imageLinks"]).slice(-1)[0]
    }
    data.push(obj);
}

function add_title(info, data) {
    if (info["title"]) {
        let obj = { 
            label: "Title: ", 
            value: info["title"] 
        };
        data.push(obj);
    }
}

function add_subtitle(info, data) {
    if (info["subtitle"]) {
        let obj = {
            label: "Subtitle: ",
            value: info["subtitle"]
        };
        data.push(obj);
    }
}

function add_authors(info, data) {
    if (info["authors"]) {
        let obj = {};
        if (info["authors"].length === 1) {
            obj.label = "Author";
        } else {
            obj.label = "Authors";
        }
        obj.values = [];
        for (author of info["authors"]) {
            let obj2 = {
                value: author,
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

function add_publisher(info, data) {
    if (info["publisher"]) {
        let obj = {
            label: "Publisher: ",
            value: info["publisher"]
        };
        data.push(obj);
    }
}

function add_publish_date(info, data) {
    if (info["publishedDate"]) {
        let obj = {
            label: "Published Date: ",
            value: info["publishedDate"]
        };
        data.push(obj);
    }
}

function add_description(info, data) {
    if (info["description"]) {    
        let obj = {
            label: "Description",
            values: [{ value: info["description"] }]
        };
        data.push(obj);
    }
}

function add_identifiers(info, data) {
    if (info["industryIdentifiers"]) {
        let obj = {}
        if (info["industryIdentifiers"].length === 1) {
            obj.label = "Identifier";
        } else {
            obj.label = "Identifiers";
        }
        obj.values = [];
        for (id of info["industryIdentifiers"]) {
            let obj2 = {
                label: id["type"].split("_").join(" ") + ": ",
                value: id["identifier"]
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

function add_categories(info, data) {
    if (info["categories"]) {
        let obj = {};
        if (info["categories"].length === 1) {
            obj.label = "Category";
        } else {
            obj.label = "Categories";
        }
        obj.values = [];
        for (category of info["categories"]) {
            let obj2 = {
                value: category,
            }
            obj.values.push(obj2);
        }
        data.push(obj);
    }
}

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

function add_id(body, data) {
    if (body["id"]) {
        let obj = {
            label: "Google ID: ",
            value: body["id"]
        }
        data.push(obj);
    }
}

function get_details(body) {
    let data = [];
    let info = body["volumeInfo"];
    let access = body["accessInfo"];
    add_title(info, data);
    add_img(info, data);
    add_subtitle(info, data);
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

module.exports = {
    make_options: make_options,
    make_callback: make_callback
}
