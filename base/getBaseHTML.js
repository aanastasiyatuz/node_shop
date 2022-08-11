const fs = require("fs");

const extendBase = (body, title) => {
    let html = fs.readFileSync('base/header.html', 'utf-8')
    return html.replace("{body}", body).replace("{title}", title)
}

module.exports = { extendBase }