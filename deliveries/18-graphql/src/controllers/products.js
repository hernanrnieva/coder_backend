const hbs = require('handlebars')
const fs = require('fs')
const productHelpers = require('../utils/helpers/products')
const productDao = require('../data/daos/factory/daoFactory').getProductPersistence()
const fileContent = fs.readFileSync('./public/views/partials/table.hbs').toString()
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
        
        productDao.getAll().then((data) => {
            const newId = data.length = 0 ? 1 : data.length + 1

            newProduct.id = newId
            productDao.save(newProduct).then(() => {
                productDao.getAll().then((data) => {
                    const products = productHelpers.generateProductDtos(data)
                    const string = template({products: products}).toString()
                    sockets.emit('product', string)
                })
            })
        })
    }
}

module.exports = productController