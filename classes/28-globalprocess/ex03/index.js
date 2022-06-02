const express = require('express')
const {fork} = require('child_process')
const PORT = 8080

const app = express()

app.listen(PORT, () => {
    console.log('Server up listening at Port: ' + PORT)
})

let visits = 0
app.get('/visits', (req, res) => {
    visits ++
    res.send({visits})
})

// Blocking:
// app.get('/calc', (req, res) => {
//     let sum = 0
//     for(let i = 0; i < 6e9; i++)
//         sum += i
    
//     res.send({sum})
// })

// Not blocking:
app.get('/calc', (req, res) => {
    const forked = fork('./sum.js' )
    forked.send('start')
    forked.on('message', (sum) => {
        res.send({sum})
    })
})