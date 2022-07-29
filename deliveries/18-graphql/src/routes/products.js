const graphqlHTTP = require('express-graphql').graphqlHTTP
const productSchema = require('../data/schemas/product')
const productRoot = require('../controllers/products')

const productRouter = graphqlHTTP({
    schema: productSchema,
    rootValue: productRoot,
    graphiql: true
})

module.exports = productRouter