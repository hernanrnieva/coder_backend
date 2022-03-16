const express = require('express')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'pug')
        
app.get('/data', (req, res) => {
    res.render('meter.pug', {
        title: req.query.title,
        value: req.query.value,
        min: req.query.min,
        max: req.query.max
    })
})