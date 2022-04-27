const express = require('express')
const PORT = 8080
const app = express()

app.use(express.static('public'))
const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

const Router = require('./router.js')

app.use('/api', Router)

app.use(function(req, res, next) {
    res.send({
        error: -1,
        description: `Route '${req.url}' not implemented`
    })
})