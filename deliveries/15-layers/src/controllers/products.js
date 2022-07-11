const hbs = require('handlebars')
const fs = require('fs')
const validateProduct = require('./helpers/products').validateProduct
const productDao = require('../daos/productsDaoMongo')
const fileContent = fs.readFileSync('./src/public/views/partials/table.hbs').toString()
const template = hbs.compile(fileContent)

const productController = {
    sendProducts: (socket) => {
        productDao.getAll().then((data) => {
            socket.emit('product', template({products: data}))
        })
    },
    createProduct: async (product, sockets) => {
        let newProduct
        try {
            newProduct = validateProduct(product)
        } catch(e) {
            logError(`Invalid product data`)
        }
        
        productDao.save(newProduct).then(() => {
            productDao.getAll().then((products) => {
                const string = template({products: products}).toString()
                sockets.emit('product', string)
            })
        })
    }
}

module.exports = productController