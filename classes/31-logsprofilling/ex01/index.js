const express = require('express')
const compression = require('compression')
const app = express()
const PORT = 8080

app.listen(PORT, (e) => {
    if(!e)
        console.log(`Server up listening at port: ${PORT}`)
})

app.get('/greeting', (req, res) => {
    let message = 'Hi, how are you?'
    
    res.send(message.repeat(1000))
})

app.get('/greetingGzip', compression(), (req, res) => {
    let message = 'Hi, how are you?'
    
    res.send(message.repeat(1000))
})