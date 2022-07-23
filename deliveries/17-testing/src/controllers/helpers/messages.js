const MessageDto = require('../../dtos/messageDto')

const MESSAGE_KEYS = 2

const validateMessage = (message) => {
    let keys = Object.keys(message).length
    if(keys != MESSAGE_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!message.hasOwnProperty('author') ||
       !message.hasOwnProperty('text'))
        throw 'Object does not have the correct properties'

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if(message.author.email.match(regex))
        return message
    
    return null
}

const generateMessageDto = (m) => {
    return new MessageDto(m)
}

const generateMessageDtos = (messages) => {
    return messages.map(m => { return new MessageDto(m)})
}

module.exports = {
    validateMessage,
    generateMessageDto,
    generateMessageDtos
}