const express = require('express')
const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.set('view engine', 'ejs')
        
const people = []

app.get('/people', (req, res) => {
    res.render('form', {people})
})

app.post('/people', (req, res) => {
    console.log(req.body)
    people.push(req.body)
    res.render('form', {people})
})