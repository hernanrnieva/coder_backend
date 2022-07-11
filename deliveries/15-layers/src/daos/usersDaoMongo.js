require('dotenv').config()
const ContainerMongoDB = require('../persistence/mongo')
const userModel = require('../persistence/models/user')
const URL = process.env.MONGOURL

class UserDaoMongoDB extends ContainerMongoDB{
    constructor(){
        super(URL, userModel)
    }
}

const userDao = new UserDaoMongoDB()

module.exports = userDao