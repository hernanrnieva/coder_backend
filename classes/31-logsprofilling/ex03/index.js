const express = require('express')
const app = express()
const PORT = 8080
const winston = require('winston')
require('dotenv').config()

const ENT = process.env.NODE_ENV
let logger

if(ENT == 'PROD') {
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({filename: 'error.log', level: 'error'}),
            new winston.transports.File({filename: 'info.log', level: 'info'})
        ]
    })
} else {
} 

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.listen(PORT, (e) => {
    if(!e)
        console.log(`Server up listening at port: ${PORT}`)
})

app.get('/sum', (req, res) => {
    if(isNaN(req.query.val1) || isNaN(req.query.val2)) {
        logger.log('error', 'Invalid parameters')
        res.json('Data error')
    } else {
        logger.log('info', 'Sum processed successfully')
        res.json(parseInt(req.query.val1) + parseInt(req.query.val2))
    }

})

app.use((req, res) => {
    logger.log('error', 'Incorrect route')
    res.json('Incorrect route')
})