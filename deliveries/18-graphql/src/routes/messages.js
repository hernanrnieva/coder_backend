const messageController = require('../controllers/messages')

const messageSocket = {
    sendMessages: (socket) => { messageController.sendMessages(socket) },
    createMessage: (message, socket, sockets) => {
        messageController.createMessage(message, socket, sockets)
    }
}

module.exports = messageSocket