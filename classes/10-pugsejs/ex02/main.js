const express = require('express')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.static('public'))

app.set('view engine', 'ejs')
        
app.get('/data', (req, res) => {
    res.render('meter.ejs', {
        title: req.query.title,
        min: req.query.min,
        max: req.query.max,
        value: req.query.value
    })
})