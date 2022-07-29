const hbs = require('handlebars')
const fs = require('fs')
const messageHelpers = require('../utils/helpers/messages')
const messageNormalizer = require('../controllers/normalizr')
const messageDao = require('../data/daos/factory/daoFactory').getMessagePersistence()
const logError = require('../logs/loggers').logError

const fileContent = fs.readFileSync('./public/views/partials/messages.hbs').toString()
const template = hbs.compile(fileContent)

async function generateMessageHTML() {
    const messages = await getMessages()

    return template({messages: messages})
}

async function getMessages(message) {
    const data = await messageDao.getAll()
    const messages = messageHelpers.generateMessageDtos(data)

    return messages
}

async function createMessage(message) {
    let newMessage
    try {
        newMessage = messageHelpers.validateMessage(message.data)
    } catch(e) {
        logError(`Invalid message date: ${e}`)
    }

    newMessage.date = new Date().toLocaleString()
    await messageDao.save(newMessage) 

    return newMessage
}

const messageController = {
    generateMessageHTML,
    getMessages,
    createMessage
}

module.exports = messageController