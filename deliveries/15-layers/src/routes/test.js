const express = require('express')
const testRouter = express.Router()
const testController = require('../controllers/test')

/* Test render */
testRouter.get('/', testController.getTestProducts)

module.exports = testRouter