const express = require('express')
const mainRouter = express.Router()
const userRouter = require('./users')
const testRouter = require('./test')
const infoRouter = require('./info')
const logWarn = require('../logs/loggers').logWarn

mainRouter.use('/', userRouter)
mainRouter.use('/test', testRouter)
mainRouter.use('/info', infoRouter)

mainRouter.use((req, res) => {
    logWarn(`Unexisting route attempt: ${req.url}`)
    res.json('Unexisting route')
})

module.exports = mainRouter