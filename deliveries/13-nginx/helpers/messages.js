/* Message helper functions */
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

module.exports = validateMessage