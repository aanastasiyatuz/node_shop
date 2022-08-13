const { findProduct } = require("../contexts/productsContext");
const { renderNotFound } = require("../base/notFound");

const renderProductDetail = (id) => {
    let product = findProduct(id)
    if (product){
        return `
        <div class="col-sm-3 d-flex flex-wrap w-100 justify-content-between">
            <div class="card mx-1 mb-3" >
                <img src=${product.image} style="height: 200px; " class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${product.title} <small>$${product.price}</small></p>
                </div>
            </div>
        </div>
    `
    }
    return renderNotFound()  
}

module.exports = { renderProductDetail }