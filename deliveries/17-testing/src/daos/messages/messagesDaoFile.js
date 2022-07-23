const ContainerFile = require('../../persistence/file')

class MessageDaoFile extends ContainerFile{
    constructor(){
        super('messages.txt')
    }
}

const messageDao = new MessageDaoFile()

module.exports = messageDao