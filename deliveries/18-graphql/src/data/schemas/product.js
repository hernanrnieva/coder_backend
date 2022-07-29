const buildSchema = require('graphql').buildSchema

const productSchema = buildSchema(`
    type Product {
        id: ID!,
        title: String,
        price: Int,
        thumbnail: String
    }
    input ProductInput {
        title: String,
        price: Int,
        thumbnail: String
    }
    type Query {
        getProducts: [Product],
        generateHtml: String,
    }
    type Mutation {
        createProduct(data: ProductInput): Product
    }
`)

module.exports = productSchema