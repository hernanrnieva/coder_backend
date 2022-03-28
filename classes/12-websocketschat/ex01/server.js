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

let messages = [
    {author: 'Hernan', text: 'Hello there!'},
    {author: 'Julian', text: 'Hi'},
    {author: 'PC', text: 'How is it going?'},
    {author: 'Hernan', text: 'Fine, and you guys?'}
]

io.on('connection', (socket) => {
    console.log('A user has connected')
    socket.emit('message', messages)

    socket.on('message', (data) => {
        messages.push(data)
        io.sockets.emit('message', messages)
    })
})






