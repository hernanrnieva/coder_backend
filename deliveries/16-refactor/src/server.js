/* Module imports */
require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cluster = require('cluster')
const os = require('os')
const passport = require('passport')

/* File imports */
const router = require('./routes/main')
const {logInfo, logWarn, logError} = require('./logs/loggers')

/* Arguments init */
const MODE = process.env.MODE? process.env.MODE : 'fork'
const PORT = process.env.PORT? process.env.PORT : 8080

/* Server initialization */
if(MODE == 'cluster' && cluster.isPrimary) {
    const numCPUs = os.cpus().length
    logInfo(`Processors number: ${numCPUs}`)
    logInfo(`PID Master: ${process.pid}`)

    for(let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        const date = new Date().toLocaleString()
        logError(`Worker: ${worker.process.pid} died at ${date}`)

        cluster.fork()
    })

} else {
    const app = express()
    const httpServer = new HTTPServer(app)
    const io = new IOServer(httpServer)

    app.use(cookieParser())
    app.use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000
        }
    }))

    app.use(express.static('./src/public'))
    app.use(passport.initialize())
    app.use(passport.session())

    const server = httpServer.listen(PORT, () => {
        logInfo(`Server is up listening at PORT: ${PORT} and PROCESS: ${process.pid}`)
    })
    server.on('error', (error) => logError(`Error encountered: ${error}`))
    /* ##### Server Up ##### */

    /* Template configuration */
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    app.engine('hbs', handlebars({
        extname: 'hbs',
        layoutsDir: './src/public/views/layouts',
        defaultLayout: ''
    }))
    app.set('views', './src/public/views')
    app.set('view engine', 'hbs')

    /* Routing */
    app.use('/', router)
    const productSocket = require('./routes/products')
    const messageSocket = require('./routes/messages')

    /* Socket functionality */
    io.on('connection', (socket) => {
        /* Existing products emittance */
        productSocket.sendProducts(socket)

        /* Existing messages emittance */
        messageSocket.sendMessages(socket)

        /* New product receipt */
        socket.on('product', (product) => {
            productSocket.createProduct(product, io.sockets)
        })

        /* New message receipt */
        socket.on('message', (message) => {
            messageSocket.createMessage(message, socket, io.sockets)
        })
    })
}