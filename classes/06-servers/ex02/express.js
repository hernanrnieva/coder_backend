const express = require('express')
const PORT = 8080
const app = express()
const server = app.listen(PORT, () => {
    console.log(`Express server running at port: ${PORT}`)
})

let counter = 0

app.get('/', (req, res) => {
    res.send(`<h1 style='color:blue;'>Welcome to my first server using Express<h1>`)
    counter ++
})

app.get('/visitors', (req, res) => {
    if(counter !== 0)
        res.send(`<h1 style='color:blue;'>The amount of visitors is: ${counter}<h1>`)
    else
        res.send(`<h1 style='color:blue;'>Milagros se la come<h1>`)
})

app.get('/fyh', (req, res) => {
    res.json({data: new Date(), stats: 'Ok'})
})