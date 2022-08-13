const fs = require("fs");

const getProducts = (searchParams) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    if (searchParams.get("q")) {
        products = products.filter((product) => {
            return product.title.toLowerCase().includes(searchParams.get("q").toLowerCase())
        })
    }
    return products
}

const addProduct = (data) => {
    if (data.title && data.price){
        let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
        id = products[products.length-1].id + 1
        products.push({"id":id, "title":data.title, "price":+data.price, "image": data.image ? data.image :""})
        fs.writeFileSync('products.json', JSON.stringify(products), 'utf-8')
        return true
    }
}

const deleteProduct = (id) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let products2 = products.filter((product) => {
        return product.id !== +id
    })
    if (products.length !== products2.length){
        fs.writeFileSync('products.json', JSON.stringify(products2), 'utf-8')
        return true
    }
}

const findProduct = (id) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let product = products.reduce((x, y) => x.id === +id ? x : y)
    if (product.id === +id) return product
}

const updateProduct = (id, data) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    let product = products.reduce((x, y) => x.id === +id ? x : y)
    if (product.id === +id) {
        product.title = data.title ? data.title : product.title
        product.price = data.price ? +data.price : product.price
        product.image = data.image ? data.image : product.image
        fs.writeFileSync('products.json', JSON.stringify(products), 'utf-8')
        return true
    }
}

module.exports = { getProducts, addProduct, deleteProduct, findProduct, updateProduct }