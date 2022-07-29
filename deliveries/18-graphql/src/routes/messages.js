// const messageController = require('../controllers/messages')

// const messageSocket = {
//     sendMessages: (socket) => { messageController.sendMessages(socket) },
//     createMessage: (message, socket, sockets) => {
//         messageController.createMessage(message, socket, sockets)
//     }
// }

// module.exports = messageSocket

const hbs = require('handlebars')
const fs = require('fs')
const messageHelpers = require('../utils/helpers/messages')
const messageDao = require('../data/daos/factory/daoFactory').getMessagePersistence()
const logError = require('../logs/loggers').logError

async function generateMessageHTML() {
    const messages = await getMessages()

    return template({messages: messages})
}

async function getMessages() {
    const data = await messageDao.getAll()
    const messages = messageHelpers.generateProductDtos(data)

    return messages
}

async function createMessage(message) {
    let newMessage
    try {
        newMessage = messageHelpers.validateMessage(message) 
    } catch(e) {
        logError(`Invalid message data: ${e}`)
    }

    await messageDao.save(newMessage)
    
    return newMessage
}

const messageController = {
    getMessages,
    createMessage,
    generateMessageHTML
}

module.exports = messageController