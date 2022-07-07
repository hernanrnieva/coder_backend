const express = require('express')
const calc = require('exercise-zerotwo')
const PORT = 8080
const app = express()

const server = app.listen(PORT, () => {
    console.log(`Server up listening at PORT: ${server.address().port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World from Yarn')
})

app.get('/sum', (req, res) => {
    res.send({result: calc.sum(parseInt(req.query.val1), parseInt(req.query.val2))})
})

app.get('/rest', (req, res) => {
    res.send({result: calc.rest(parseInt(req.query.val1), parseInt(req.query.val2))})
})

app.get('/mult', (req, res) => {
    res.send({result: calc.mult(parseInt(req.query.val1), parseInt(req.query.val2))})
})

app.get('/div', (req, res) => {
    res.send({result: calc.div(parseInt(req.query.val1), parseInt(req.query.val2))})
})