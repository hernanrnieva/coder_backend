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
        generateProductHTML: String,
    }
    type Mutation {
        createProduct(data: ProductInput): Product
    }
`)

module.exports = productSchema