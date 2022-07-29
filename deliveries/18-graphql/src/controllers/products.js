const hbs = require('handlebars')
const fs = require('fs')
const productHelpers = require('../utils/helpers/products')
const productDao = require('../data/daos/factory/daoFactory').getProductPersistence()
const logError = require('../logs/loggers').logError

const fileContent = fs.readFileSync('./public/views/partials/table.hbs').toString()
const template = hbs.compile(fileContent)

async function generateHtml() {
    const products = await getProducts()
    
    return template({products: products})
}

async function getProducts() {
    const data = await productDao.getAll()
    const products = productHelpers.generateProductDtos(data)

    return products
}

async function createProduct(product) {
    let newProduct
    try {
        newProduct = productHelpers.validateProduct(product.data)
    } catch(e) {
        logError(`Invalid product data: ${e}`)
    }

    const data = await productDao.getAll()
    const newId = data.length = 0 ? 1 : data.length + 1
    
    newProduct.id = newId

    await productDao.save(newProduct)
    const addedProduct = await productDao.getById(newId)

    return addedProduct
}

const productController = {
    getProducts,
    createProduct,
    generateHtml
}

module.exports = productController