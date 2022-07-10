const calculator = require('../services/calculator')
const service = require('../services/service')

const controllerCalculator = {
    sum: (req, res) => {
        const result = calculator.sum(parseInt(req.query.val1), parseInt(req.query.val2))
        service.saveData('sum', req.query.val1, req.query.val2, result)
        res.send({result: result})
    },
    rest: (req, res) => {
        const result = calculator.rest(parseInt(req.query.val1), parseInt(req.query.val2))
        service.saveData('rest', req.query.val1, req.query.val2, result)
        res.send({result: result})
    },
    div: (req, res) => {
        const result = calculator.div(parseInt(req.query.val1), parseInt(req.query.val2))
        service.saveData('div', req.query.val1, req.query.val2, result)
        res.send({result: result})
    },
    mult: (req, res) => {
        const result = calculator.mult(parseInt(req.query.val1), parseInt(req.query.val2))
        service.saveData('mult', req.query.val1, req.query.val2, result)
        res.send({result: result})
    },
    getOperations: async (req, res) => {
        const operations = await service.getData()
        res.send({operations: operations})
    }
}

module.exports = controllerCalculator