import express, { json } from 'express'

const numbers = []

const app = express()
app.use(json())

app.post('/in', (req, res) => {
    const { number } = req.body
    numbers.push(number)
    res.send(`Number ${number} added successfully`)
})

app.get('/out', (req, res) => {
    res.json({numbers})
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server up listening at PORT: ${PORT}`)
})

server.on('error', (e) => console.log(e))