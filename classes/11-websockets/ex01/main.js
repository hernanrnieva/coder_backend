const express = require('express')
const app = express()
const PORT = 8080

const router = express.Router()
router.use(express.urlencoded({extended: true}))
router.use(express.json())

const server = app.listen(PORT, () => {
    console.log(`Server is up listening at port: ${PORT}`)
})

server.on('error', (error) => console.log(`Error encountered: ${error}`))

app.use(express.static('public'))