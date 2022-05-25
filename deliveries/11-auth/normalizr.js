const {denormalize: denormalize, normalize: normalize, schema: schema} = require('normalizr')
const util = require('util')

const authorSchema = new schema.Entity('author', {}, {idAttribute: 'email'})
const messageSchema = new schema.Entity('message', {
    author: authorSchema
})
const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
})

class MessageNormalizer{
    print(normalized){
        console.log(util.inspect(normalized, false, 12, true))
    }

    normalizeMessages(messages){
        return normalize(messages, messagesSchema)
    }
    
    denormalizeMessages(messages){
        return denormalize(messages.result, messagesSchema, messages.entities)
    }
}

module.exports = MessageNormalizer