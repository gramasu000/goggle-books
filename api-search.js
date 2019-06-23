
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

function get_title(info, obj) {
    obj.title = "Title not known";
    if (info["title"]) {
        obj.title = info["title"];
    }
}

function get_authors(info, obj) {
    obj.authors = "Authors not known";
    if (info["authors"]) {
        obj.authors = info["authors"].join(", ");
    }
}

function get_publisher(info, obj) {
    obj.publisher = "Publisher not known";
    if (info["publisher"]) {
        obj.publisher = info["publisher"];
    }
}

function get_thumbnail(info, obj) {
    obj.thumbnail = "https://image.flaticon.com/icons/svg/149/149374.svg";
    if (info["imageLinks"]) {
        obj.thumbnail = Object.values(info["imageLinks"]).slice(-1)[0]; 
    }
}

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
            data.push(obj);
        }
    } 
    return data;
}



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

module.exports = {
    make_options: make_options,
    make_callback: make_callback
}
