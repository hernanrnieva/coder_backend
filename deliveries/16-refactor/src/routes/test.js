const express = require('express')
const testRouter = express.Router()
const testController = require('../controllers/test')

/* Test render */
testRouter.get('/products', testController.getTestProducts)
testRouter.get('/factory', testController.getTestFactory)

module.exports = testRouter