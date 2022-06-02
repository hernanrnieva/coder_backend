require('dotenv').config()
const ContainerMongoDB = require('../../containers/contMongo')
const modelProduct = require('../../modelsMDB/product')
// const URL = 'mongodb://127.0.0.1:27017/ecommerce'
const URL = process.env.MONGOURL

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, modelProduct)
    }
}

module.exports = ProductDaoMongoDB