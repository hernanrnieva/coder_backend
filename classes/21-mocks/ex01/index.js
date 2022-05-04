const express = require('express')
const app = express()

app.listen(8080, () => {console.log('Server is up listening at Port: 8008')})
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const names = ['Luis', 'Juan', 'Maria', 'Hector']
const lastnames = ['Aranda', 'Cruz', 'De los Angeles', 'Bardales']
const colours = ['Red', 'Blue', 'Brown', 'Yellow']

let element = {}

function returnElement(){
    element = {}
    element.name = names[Math.floor(Math.random() * 4)]
    element.lastname = lastnames[Math.floor(Math.random() * 4)]
    element.colour = colours[Math.floor(Math.random() * 4)]
    return element
}

app.get('/test', (req, res) => {
    let data = []
    for(let i = 0; i < 10; i++){
        data.push(returnElement())
    }
    
    res.json(data)
})