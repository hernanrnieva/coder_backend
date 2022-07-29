const express = require('express')
const infoRouter = express.Router()
const infoController = require('../controllers/info')

infoRouter.get('/', infoController.getInfo)

module.exports = infoRouter