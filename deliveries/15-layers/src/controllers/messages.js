const messageNormalizer = require('../controllers/normalizr')
const messageDao = require('../daos/messagesDaoMongo')
const logError = require('../logs/loggers').logError
const validateMessage = require('./helpers/messages').validateMessage

const messageController = {
    sendMessages: (socket) => {
        messageDao.getAll().then((data) => {
            if(data) {
                const formattedData = data.map(d => {
                    delete d["_id"]
                    return d
                })
                const normalized = messageNormalizer.normalizeMessages({
                    id: 'messages',
                    messages: formattedData
                })
                socket.emit('message', normalized)
            }
        })
    },
    createMessage: (message, socket, sockets) => {
        message = validateMessage(message)
        if(!message) {
            logError(`Invalid message data`)
            socket.emit('eMessage')
        } else {
            message["date"] = new Date().toLocaleString()
            messageDao.getAll()
            .then((data) => {
                const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1
                message["id"] = newId
                messageDao.save(message)
                .then(() => { 
                    messageDao.getAll().then((data) => {
                        const newData = data.map(d => {
                            delete d._id
                            return d
                        })
                        const normalized = messageNormalizer.normalizeMessages({
                            id: 'messages',
                            messages: newData
                        })
                        socket.emit('message', normalized)
                        sockets.emit('message', normalized)
                    })
                })
            })
        }
    }
}

module.exports = messageController