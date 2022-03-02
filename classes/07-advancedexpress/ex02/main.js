const express = require('express')
const app = express()
const PORT = 8080

const server = app.listen(PORT, () => 
    console.log(`Server is up at port ${server.address().port}`))

app.get('/api/sum', (req, res) => {
    res.json({data: parseInt(req.query.num1) + parseInt(req.query.num2), status: 'Ok'})
})