const productController = require('../controllers/products')

const productSocket = {
    sendProducts: (socket) => { productController.sendProducts(socket) },
    createProduct:  (product, sockets) => { 
        productController.createProduct(product, sockets)
    }
}

module.exports = productSocket