const { getProducts } = require("../contexts/productsContext");

const renderProductList = (url) => {
    let products = getProducts(url.searchParams)

    return `
        <div class="col-sm-3 d-flex flex-wrap w-100 justify-content-between">
            ${products.map((product)=>{
            return `
            <div class="card mx-1 mb-3" >
                <img src=${product.image} style="height: 200px; " class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${product.title} <small>$${product.price}</small></p>
                </div>
            </div>
            `
            }).join("")}
        </div>
    `
}

module.exports = { renderProductList }