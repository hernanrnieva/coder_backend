/* Initializations */
const express = require('express')
const Persistence = require('./persistence.js')

const Router = express.Router()

/* Product Router implementation */
const prodRouter = express.Router()
prodRouter.use(express.urlencoded({extended: true}))
prodRouter.use(express.json())

/* Persistance declaration */
const productPersistence = new Persistence('products.txt')
const products = productPersistence.readFile()

/* Helpers */
const PRODUCT_KEYS = 6

const validateProduct = (product) => {
    let keys = Object.keys(product).length
    if(keys != PRODUCT_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!product.hasOwnProperty('name') ||
       !product.hasOwnProperty('description') ||
       !product.hasOwnProperty('code') ||
       !product.hasOwnProperty('picture') ||
       !product.hasOwnProperty('price') || !product.hasOwnProperty('price') ||
       !product.hasOwnProperty('code'))
        throw 'Object does not have the correct properties'

    return product
}

/* Routes */
prodRouter.get('/', (req, res) => {
    if(products.length != 0)
        res.json(products)
    else
        res.json('No products have been loaded yet')
})

prodRouter.get('/:id', (req, res) => {
    let product = products.find(p => p.id == req.params.id)
    if(!product)
        res.json({error: `Product ${req.params.id} not found`})
    else
        res.json(product)
})

prodRouter.post('/', (req, res) => {
    let newProduct
    try{
        newProduct = validateProduct(req.body)
        let newId = products.length == 0 ? 1 : products[products.length - 1].id + 1
        newProduct["id"] = newId
        newProduct["timestamp"] = new Date().toLocaleString()
        newProduct.price = parseFloat(req.body.price)
        products.push(newProduct)

        productPersistence.writeFile(products)
        res.json(newId)
    }catch(e){
        res.json(e)
    } 
})

prodRouter.put('/:id', (req, res) => {
    let index = products.findIndex(p => p.id == parseInt(req.params.id))
    if(index == -1)
        res.json({error: `Product ${req.params.id} not found to be updated`})
    else{
        let newProduct
        try{
            newProduct = validateProduct(req.body)
            newProduct["id"] = parseInt(req.params.id)
            products[index] = newProduct

            productPersistence.writeFile(products)
            res.json('Product updated')
        }catch(e){
            res.json(e)
        }
    }
    
})

prodRouter.delete('/:id', (req, res) => {
    let index = products.findIndex(p => p.id == req.params.id)
    if(index == -1)
        res.json({error: `Product ${req.params.id} not found to be deleted`})
    else{
        products.splice(index, 1)

        productPersistence.writeFile(products)
        res.json('Product deleted')
    }
})

/* Cart Router Implementation */
const cartRouter = express.Router()
cartRouter.use(express.urlencoded({extended: true}))
cartRouter.use(express.json())

/* Persistance declaration */
const cartPersistence = new Persistence('carts.txt')
const carts = cartPersistence.readFile()

/* Routes */
cartRouter.post('/', (req, res) => {
    let newId = 1
    
    if(carts.length != 0)
        newId = carts[carts.length - 1].id + 1

    const newCart = {
        id: newId,
        timestamp: new Date().toLocaleString(),
        products: []
    }
    carts.push(newCart)

    cartPersistence.writeFile(carts)
    res.send(`Cart ${newId} created`)
})

cartRouter.get('/:id/products', (req, res) => {
    const cart = carts.find(c => c.id == req.params.id)
    if(!cart)
        res.send(`Cart ${req.params.id} not found`)
    else
        if(cart.products.length == 0)
            res.json('No products have been loaded yet')
        else{
            console.log(cart)
            res.send(cart.products)
        }
})

cartRouter.delete('/:id', (req, res) => {
    let index = carts.findIndex(c => c.id == req.params.id)
    if(index == -1)
        res.json({error: `Cart ${req.params.id} not found to be deleted`})
    else{
        carts.splice(index, 1)

        res.json('Cart deleted')
        console.log(carts)
    }
})

cartRouter.post('/:id/products', (req, res) => {
    const cart = carts.find(c => c.id == req.params.id)
    if(!cart)
        res.send(`Cart ${req.params.id} not found`)
    else{
        const product = products.find(p => p.id = req.body.id)
        if(!product)
            res.send(`Product ${req.body.id} not found to be added`)
        else{
            cart.products.push(product)
            console.log(carts)
            console.log(carts[0])
            res.send(`Product ${req.body.id} added sucessfully to cart ${req.params.id}`)
        } 
    }
})

cartRouter.delete('/:id/products/:prodId', (req, res) => {
    const cart = carts.find(c => c.id == req.params.id)
    if(!cart)
        res.send(`Cart ${req.params.id} not found`)
    else{
        let prodIdx = cart.products.findIndex(p => p.id == req.params.prodId)
        if(prodIdx == -1)
            res.send(`Product ${req.params.prodId} not found in Cart ${req.params.id}`)
        else{
            cart.products.splice(prodIdx, 1)
            res.send(`Product ${req.params.prodId} deleted successfully from Cart ${req.params.id}`)
        }
    }
})

/* Link */
Router.use('/products', prodRouter)
Router.use('/cart', cartRouter)

/* Export */
module.exports = Router 