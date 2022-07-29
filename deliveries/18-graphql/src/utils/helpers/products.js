const ProductDto = require("../../data/dtos/productDto")

const PRODUCT_KEYS = 3

const validateProduct = (product) => {
    let keys = Object.keys(product).length
    if(keys != PRODUCT_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!product.hasOwnProperty('title') || !product.hasOwnProperty('price') || !product.hasOwnProperty('thumbnail'))
        throw 'Object does not have the correct properties'

    return product
}

const validateUpdate = (properties) => {
    if(properties.hasOwnProperty('title') || properties.hasOwnProperty('price') || properties.hasOwnProperty('thumbnail'))
        return properties
        
    else 
        throw 'Trying to update a product with incorrect properties'
}

const getNewProduct = (product, properties) => {
    const newProduct = {
        id: product.id,
        title: properties.title? properties.title : product.title,
        price: properties.price? properties.price : product.price,
        thumbnail: properties.thumbnail? properties.thumbnail : product.thumbnail,
    }

    return newProduct
}

const generateProductDto = (p) => {
    return new ProductDto(p)
}

const generateProductDtos = (products) => {
    return products.map(p => { return new ProductDto(p)})
}

module.exports = {
    validateProduct,
    validateUpdate,
    getNewProduct,
    generateProductDtos,
    generateProductDto
}