const hbs = require('handlebars')
const fs = require('fs')
const productHelpers = require('./helpers/products')
const productDao = require('../daos/factory/daoFactory').getProductPersistence()
const fileContent = fs.readFileSync('./src/public/views/partials/table.hbs').toString()
const template = hbs.compile(fileContent)

const productController = {
    sendProducts: (socket) => {
        productDao.getAll().then((data) => {
            const products = productHelpers.generateProductDtos(data)
            socket.emit('product', template({products: products}))
        })
    },
    createProduct: async (product, sockets) => {
        let newProduct
        try {
            newProduct = productHelpers.validateProduct(product)
        } catch(e) {
            logError(`Invalid product data`)
        }
        
        productDao.save(newProduct).then(() => {
            productDao.getAll().then((data) => {
                const products = productHelpers.generateProductDtos(data)
                const string = template({products: products}).toString()
                sockets.emit('product', string)
            })
        })
    }
}

module.exports = productController