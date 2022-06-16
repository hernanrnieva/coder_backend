const express = require('express')
const app = express()
const PORT = 8080
const pino = require('pino')
require('dotenv').config()

const ENT = process.env.NODE_ENV
let logger

if(ENT == 'PROD') {
    logger = pino('debug.log')
    logger.level = 'info'
} else {
    logger = pino()
    logger.level = 'info'
} 

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.listen(PORT, (e) => {
    if(!e)
        console.log(`Server up listening at port: ${PORT}`)
})

app.get('/sum', (req, res) => {
    if(isNaN(req.query.val1) || isNaN(req.query.val2)) {
        logger.error('Invalid parameters')
        res.json('Data error')
    } else {
        logger.info('Successful processing %o', {sucess: 'success'})
        res.json(parseInt(req.query.val1) + parseInt(req.query.val2))
    }

})

app.use((req, res) => {
    logger.warn('Incorrect route')
    res.json('Incorrect route')
})