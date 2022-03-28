const express = require('express')
/* Weird way of importing 
const {method: variableName} = require('module') */
const {Server: IOServer} = require('socket.io')
const {Server: HTTPServer} = require('http')
const app = express()
const PORT = 8080

const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)
app.use(express.static('./public'))

const server = httpServer.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})
server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

let messages = ['Hello', 'these', 'are', 'manual']

io.on('connection', (socket) => {
    console.log('A user has connected')
    socket.emit('welcome', 'Hello, this is a welcome message!')

    socket.on('notification', (data) => {
        console.log(data)
        socket.emit('history', messages)
    })

    socket.on('message', (data) => {
        messages.push(data)
        console.log(data)
        io.sockets.emit('message', messages)
    })
})






