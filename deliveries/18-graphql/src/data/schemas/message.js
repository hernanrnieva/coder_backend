const buildSchema = require('graphql').buildSchema

const messageSchema = buildSchema(`
    type Author {
        name: String,
        lastname: String,
        email: String,
        age: Int,
        avatar: String,
    }
    input AuthorInput {
        name: String,
        lastname: String,
        email: String,
        age: Int,
        avatar: String,
    }
    type Message {
        author: Author,
        text: String,
        date: String
    }
    input MessageInput {
        author: AuthorInput,
        text: String,
    }
    type Query {
        getMessages: [Message],
        generateMessageHTML: String,
    }
    type Mutation {
        createMessage(data: MessageInput): Message
    }
`)

module.exports = messageSchema