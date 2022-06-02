require('dotenv').config()
const ContainerMongoDB = require('../../containers/contMongo')
const modelUser = require('../../modelsMDB/user')
// const URL = 'mongodb://127.0.0.1:27017/ecommerce'
const URL = process.env.MONGOURL

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, modelUser)
    }
}

module.exports = ProductDaoMongoDB