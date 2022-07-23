const productHelpers = require('../helpers/products')
const productDao = require('../../daos/factory/daoFactory').getProductPersistence()

const productTestController = {
    get: async (req, res) => {
        const data = await productDao.getAll()
        const products = productHelpers.generateProductDtos(data)

        res.json(products)
    },
    getById: async (req, res) => {
        const product = await productDao.getById(req.params.id)

        if(!product)
            return res.status(400).send({
                message: `Product with id ${req.params.id} not found`
            })

        const productDto = productHelpers.generateProductDto(product) 
        res.json(productDto)
    },
    post: async (req, res) => {
        let newProduct = {}
        try {
            newProduct = productHelpers.validateProduct(req.body)
        } catch(e) {
            return res.status(400).send({
                message: e
            })
        }

        const products = await productDao.getAll()
        const newId = products.length = 0 ? 1 : products.length + 1

        newProduct.id = newId
        await productDao.save(newProduct)

        res.json(newId)
    },
    update: async (req, res) => {
        let newProperties = {}
        try {
            newProperties = productHelpers.validateUpdate(req.body)
        } catch(e) {
            return res.status(400).send({
                message: e
            })
        }

        const productToUpdate = await productDao.getById(req.params.id)

        if(!productToUpdate)
            return res.status(400).send({
                message: `Product with id ${req.params.id} not found`
            })

        const newProductR = await productDao.updateById(req.params.id, newProperties)
        const newProduct = productHelpers.generateProductDto(newProductR)

        res.json(newProduct)
    },
    delete: async (req, res) => {
        const result = await productDao.deleteById(req.params.id)
    
        res.json(result)
    }
}

module.exports = productTestController