const ContainerMongoDB = require('../../containers/contMongo')
const modelProduct = require('../../modelsMDB/user')
const URL = 'mongodb://127.0.0.1:27017/ecommerce'

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, modelProduct)
    }
}

module.exports = ProductDaoMongoDB