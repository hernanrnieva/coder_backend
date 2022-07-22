const ContainerFile = require('../../persistence/file')

class ProductDaoFile extends ContainerFile{
    constructor(){
        super('products.txt')
    }
}

const productDao = new ProductDaoFile()

module.exports = productDao