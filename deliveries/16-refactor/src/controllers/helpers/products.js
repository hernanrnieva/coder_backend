const ProductDto = require("../../dtos/productDto")

const PRODUCT_KEYS = 3

const validateProduct = (product) => {
    let keys = Object.keys(product).length
    if(keys != PRODUCT_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!product.hasOwnProperty('title') || !product.hasOwnProperty('price') || !product.hasOwnProperty('thumbnail'))
        throw 'Object does not have the correct properties'

    return product
}

const generateProductDto = (p) => {
    return new ProductDto(p)
}

const generateProductDtos = (products) => {
    return products.map(p => { return new ProductDto(p)})
}

module.exports = {
    validateProduct,
    generateProductDtos,
    generateProductDto
}