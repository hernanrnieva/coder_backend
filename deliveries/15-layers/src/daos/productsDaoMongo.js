require('dotenv').config()
const ContainerMongoDB = require('../persistence/mongo')
const productModel = require('../persistence/models/product')
const URL = process.env.MONGOURL

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, productModel)
    }
}

const productDao = new ProductDaoMongoDB()

module.exports = productDao