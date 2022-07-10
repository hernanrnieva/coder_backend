const express = require('express')
const controllerCalculator = require('../controllers/calculator')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Hello World from Yarn')
})

router.get('/sum', controllerCalculator.sum)
router.get('/rest', controllerCalculator.rest)
router.get('/div', controllerCalculator.div)
router.get('/mult', controllerCalculator.mult)
router.get('/operations', controllerCalculator.getOperations)

module.exports = router