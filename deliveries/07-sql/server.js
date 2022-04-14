/* Const declarations and imports */
const express = require('express')
const hbs = require('handlebars')
const fs = require('fs')
const handlebars = require('express-handlebars')
const Container = require('./container')
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')

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
    defaultLayout: 'main.hbs'
}))

app.set('views', './public/views')
app.set('view engine', 'hbs')

const fileContent = fs.readFileSync('./public/views/partials/table.hbs').toString()
let template = hbs.compile(fileContent)

/* Container and sql initializations */
const { sqlite3 } = require('./options/sqlite3')
const { mariaDB } = require('./options/mariaDB')
const messages = new Container(sqlite3, 'messages') 
const products = new Container(mariaDB, 'products') 

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

/* Initial render */
app.get('/products', (req, res) => {
    res.render('layouts/main')
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
        socket.emit('message', data)
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
        message["date"] = new Date().toLocaleString()
        messages.save(message)
        .then(() => {messages.getAll().then((data) => {
            io.sockets.emit('message', data)
        })})
    })
})