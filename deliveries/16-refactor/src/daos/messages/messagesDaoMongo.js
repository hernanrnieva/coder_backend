require('dotenv').config()
const ContainerMongoDB = require('../../persistence/mongo')
const messageModel = require('../../persistence/models/message')
const URL = process.env.MONGOURL

class MessageDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, messageModel)
    }
}

const productDao = new MessageDaoMongoDB()

module.exports = productDao