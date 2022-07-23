const express = require('express')
const productTestRouter = express.Router()
const productTestController = require('../../controllers/tests/productTestController')

productTestRouter.get('/', productTestController.get)

productTestRouter.get('/:id', productTestController.getById)

productTestRouter.post('/', productTestController.post)

productTestRouter.put('/:id', productTestController.update)

productTestRouter.delete('/:id', productTestController.delete)

module.exports = productTestRouter
