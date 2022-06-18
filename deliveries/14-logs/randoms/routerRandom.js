const express = require('express')
const Router = express.Router()
const {fork} = require('child_process')
const {logInfo} = require('../logs/loggers')

const deft = 100000000

Router.use(express.urlencoded({extended: true}))
Router.use(express.json())

Router.get('/', (req, res) => {
    logInfo(`URL: ${req.url} & METHOD: ${req.method}`)
    const forked = fork('./randoms/random.js' )
    forked.send(req.query.amount? req.query.amount : deft)
    forked.on('message', (dict) => {
        res.send({dict})
    })
})

module.exports = Router