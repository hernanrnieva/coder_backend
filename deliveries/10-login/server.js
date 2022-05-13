/* Const declarations and imports */
const express = require('express')
const hbs = require('handlebars')
const fs = require('fs')
const handlebars = require('express-handlebars')
const ContainerDB = require('./containers/contDB')
const ContainerFile = require('./containers/contFile')
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')
const MessageNormalizer = require('./normalizr')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const connectMongo = require('connect-mongo')

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
const products = new ContainerFile('products.txt') 
const messages = new ContainerFile('messages.txt') 
const messageNormalizer = new MessageNormalizer()

/* Session configuration */
app.use(cookieParser())
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: connectMongo.create({
        mongoUrl: 'mongodb+srv://hnieva:83vkK5DfsCI1o5OR@cluster0.3gv82.mongodb.net/sessions?retryWrites=true&w=majority',
        mongoOptions: advancedOptions,
        ttl:10
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))

/* Product helper functions */
const validateProduct = require('./helpers/products')

/* Message helper functions */
const validateMessage = require('./helpers/messages')

/* Test render */
const testRouter = require('./test-api/products-test')
app.use('/products-test', testRouter)

/* Initial render */
app.get('/login', (req, res) => {
    if(req.query.username){
        req.session.username = req.query.username
        res.redirect('/products')
    }

    else if(req.session.username)
        res.redirect('/products')

    else
        res.render('layouts/login')
})

app.get('/products', (req, res) => {
    if(!req.session?.username)
        res.redirect('/login')
    else
        res.render('layouts/main', {username: req.session.username})
})

app.get('/logout', (req, res) => {
    const user = req.session.username
    req.session.destroy((e) => {
        if(e) 
            res.json(e)
        else
            res.render('layouts/goodbye', {username: user})
    })
})

/* Socket functionality */
io.on('connection', (socket) => {
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