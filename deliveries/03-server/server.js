const express = require('express')
const fs = require('fs')

const PORT = 8080
const app = express()
const server = app.listen(PORT, () => {
    console.log(`Express server running at port: ${PORT}`)
})

class Container{
    /* Constructor */
    constructor(path){
        this.path = path
    }

    /* Methods */
    async getAll(){
        try{
            /* Reads and JSON formats */
            let content = await fs.promises.readFile(this.path, 'utf-8')
            let contentP = JSON.parse(content)

            /* Creates array based on JSON object and returns it */
            let contentArray = []
            for (let i in contentP) {
                contentArray.push(contentP[i])
            }
            return contentArray
        }catch(e){
            return null
        }
    }
}

const container = new Container('products.txt')

app.get('/products', (req, res) => {
    productsArray = container.getAll().then((products) => {
        res.json(products)
    })
})

app.get('/randomProduct', (req, res) => {
    productsArray = container.getAll().then((products) => {
        let random = products[Math.floor(Math.random() * products.length)];
        res.json(random)
    })
})