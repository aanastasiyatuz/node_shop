const http = require("http");
const { renderUserList } = require("./components/userList");
const { renderProductList } = require("./components/productList");
const { renderProductDetail } = require("./components/productDetail");
const { extendBase } = require("./base/getBaseHTML");
const { renderNotFound } = require("./base/notFound");
const { addProduct, deleteProduct, findProduct, updateProduct } = require("./contexts/productsContext");

const server = http.createServer((req, res) => {
    let url = new URL("http://localhost:5000"+req.url)

    if (req.method == 'GET'){
        if (url.pathname == '/users'){
            data = renderUserList(url)
            title = 'users'
        } else if (url.pathname == '/products') {
            data = renderProductList(url)
            title = 'products'
        } else if (url.pathname.split("/")[1] == 'product'){
            data = renderProductDetail(url.pathname.split("/")[2])
            title = 'product'
        } else {
            data = renderNotFound()
            title = 'page not found'
        }
    } else if (req.method == 'POST'){
        let data = '';
        req.on("data", (chunk) => data += chunk)
      
        req.on("end", () => {
            if (addProduct(JSON.parse(data))){
                res.end("successfully created")
            } else {
                res.end("title and price is required")
            }
        })
        return
    } else if (req.method == 'PUT' || req.method == 'PATCH'){
        uris = url.pathname.split("/")
        id = uris[uris.length-1] ? uris[uris.length-1] : uris[uris.length-2]
        let data = '';
        req.on("data", (chunk) => data += chunk)
        req.on("end", () => {
            if (updateProduct(id, JSON.parse(data))){
                res.end("successfully updated")
            } else {
                res.end("not found")
            }
        })    
        return
    } else if (req.method == 'DELETE'){
        uris = url.pathname.split("/")
        id = uris[uris.length-1] ? uris[uris.length-1] : uris[uris.length-2]
        if (deleteProduct(id)){
            res.end("successfully deleted")
        } else {
            res.end("not found")
        }
        return
    }

    res.end(extendBase(data, title))

})

server.listen(5000)
