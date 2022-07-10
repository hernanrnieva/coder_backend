const router = require('express').Router()
const calculatorRouter = require('./calculator')

router.use('/calc', calculatorRouter)

module.exports = router