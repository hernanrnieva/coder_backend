const graphqlHTTP = require('express-graphql').graphqlHTTP
const messageSchema = require('../data/schemas/message')
const messageRoot = require('../controllers/messages')

const messageRouter = graphqlHTTP({
    schema: messageSchema,
    rootValue: messageRoot,
    graphiql: true
})

module.exports = messageRouter