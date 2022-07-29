require('dotenv').config()

/* Users */
const userDaoMongo = require('../users/usersDaoMongo')

/* Products */
const productDaoMongo = require('../products/productsDaoMongo')

/* Messages */
const messageDaoMongo = require('../messages/messagesDaoMongo')

const data = {
    usersPersistence: process.env.USERS_PERSISTENCE? process.env.USERS_PERSISTENCE : 'file',
    productsPersistence: process.env.PRODUCTS_PERSISTENCE? process.env.PRODUCTS_PERSISTENCE : 'file',
    messagesPersistence: process.env.MESSAGES_PERSISTENCE? process.env.MESSAGES_PERSISTENCE : 'file',
}

class DaoFactory {
    constructor() {
        this.date = new Date().toLocaleString()
    }

    getUserPersistence() {
        if(data.usersPersistence == 'file') return require('../users/usersDaoFile')
        if(data.usersPersistence == 'mongo') return userDaoMongo
    }

    getProductPersistence() {
        if(data.productsPersistence == 'file') return require('../products/productsDaoFile')
        if(data.productsPersistence == 'mongo') return productDaoMongo
    }

    getMessagePersistence() {
        if(data.messagesPersistence == 'file') return require('../users/usersDaoFile')
        if(data.messagesPersistence == 'mongo') return messageDaoMongo
    }

    getDate() {
        return this.date
    }
}

const daoFactory = new DaoFactory()

module.exports = daoFactory