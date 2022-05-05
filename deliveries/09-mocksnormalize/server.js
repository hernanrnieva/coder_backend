/* Const declarations and imports */
const express = require('express')
const hbs = require('handlebars')
const fs = require('fs')
const handlebars = require('express-handlebars')
const ContainerDB = require('./containers/contDB')
const ContainerFile = require('./containers/contFile')
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')
const {faker: faker} = require('@faker-js/faker')
faker.locale = 'en'
const {commerce, image} = faker
const MessageNormalizer = require('./normalizr')

/* Server initialization */
const app = express()
const PORT = 8080
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)
app.use(express.static('./public'))

const server = httpServer.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})
server.on('error', (error) => console.log(`Error encountered: ${error}`))
/* ##### Server Up ##### */

/* Template configuration */
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir: './public/views/layouts',
    defaultLayout: ''
}))

app.set('views', './public/views')
app.set('view engine', 'hbs')

const fileContent = fs.readFileSync('./public/views/partials/table.hbs').toString()
let template = hbs.compile(fileContent)

/* Container and sql initializations */
// const { sqlite3 } = require('./options/sqlite3')
// const messages = new ContainerDB(sqlite3, 'messages') 
const { mariaDB } = require('./options/mariaDB')
const products = new ContainerDB(mariaDB, 'products') 
const messages = new ContainerFile('messages.txt') 
const messageNormalizer = new MessageNormalizer()

/* Product helper functions */
const PRODUCT_KEYS = 3

const validateProduct = (product) => {
    let keys = Object.keys(product).length
    if(keys != PRODUCT_KEYS)
        throw 'Object does not have the correct amount of properties'

    if(!product.hasOwnProperty('title') || !product.hasOwnProperty('price') || !product.hasOwnProperty('thumbnail'))
        throw 'Object does not have the correct properties'

    return product
}

function returnElement(){
    const element = {}
    element.title = commerce.productName()
    element.price = commerce.price()
    element.thumbnail = image.food()
    return element
}

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

/* Initial render */
app.get('/products', (req, res) => {
    res.render('layouts/main')
})

/* Test render */
app.get('/products-test', (req, res) => {
    const data = []

    for(let i = 0; i < 5; i++)
        data.push(returnElement())

    res.render('layouts/main-test', {products: data})
})

/* Socket functionality */
io.on('connection', (socket) => {
    console.log('A user has connected')
    
    /* Existing products emittance */
    products.getAll().then((data) => {
        socket.emit('product', template({products: data}))
    })

    /* Existing messages emittance */
    messages.getAll().then((data) => {
        const normalized = messageNormalizer.normalizeMessages({
            id: 'messages',
            messages: data
        })
        socket.emit('message', normalized)
    })

    /* New product receipt */
    socket.on('product', (data) => {
        let newProduct
        try{
            newProduct = validateProduct(data)
        }catch(e){
            console.log('Error found with product received')
        }
        
        products.save(newProduct)
        .then(() => {products.getAll().then((data) => {
            io.sockets.emit('product', template({products: data}))
        })})
    })

    /* New message receipt */
    socket.on('message', (message) => {
        message = validateMessage(message)
        if(!message)
            socket.emit('eMessage')
        else {
            message["date"] = new Date().toLocaleString()
            messages.save(message)
            .then(() => {messages.getAll().then((data) => {
                const normalized = messageNormalizer.normalizeMessages({
                    id: 'messages',
                    messages: data
                })
                socket.emit('message', normalized)
                io.sockets.emit('message', normalized)
            })})
        }
    })
})