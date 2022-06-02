const ContainerMongoDB = require('../../containers/contMongo')
const modelProduct = require('../../modelsMDB/product')
// const URL = 'mongodb://127.0.0.1:27017/ecommerce'
const URL = 'mongodb+srv://hnieva:83vkK5DfsCI1o5OR@cluster0.3gv82.mongodb.net/ecommerce?retryWrites=true&w=majority'

class ProductDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, modelProduct)
    }
}

module.exports = ProductDaoMongoDB