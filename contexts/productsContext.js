const fs = require("fs");

const getProducts = (searchParams) => {
    let products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))
    if (searchParams.get("q")) {
        products = products.filter((user) => {
            return user.title.toLowerCase().includes(searchParams.get("q").toLowerCase())
        })
    }
    return products
}

module.exports = { getProducts }