const express = require('express')
const app = express()
const PORT = 8080
const petRouter = express.Router()
const peopleRouter = express.Router()

petRouter.use(express.urlencoded({extended: true}))
petRouter.use(express.json())
peopleRouter.use(express.urlencoded({extended: true}))
peopleRouter.use(express.json())

const server = app.listen(PORT, () => 
    console.log(`Server up listening to port ${PORT}`)
)
server.on('error', (error) => console.log('An error has occured: ${error'))

const people = []
const pets = []

/* Pet router */
petRouter.get('/', (req, res) => {
    if(pets.length != 0)
        res.json(pets)
    else
        res.json({message: 'No pets are currently added'})
})

petRouter.post('/', (req, res) => {
    pets.push(req.body)
    res.json({message: 'Pet added correctly'})
})

app.use('/pets', petRouter)

/* People router */
peopleRouter.get('/', (req, res) => {
    if(people.length != 0)
        res.json(people)
    else
        res.json({message: 'No people are currently added'})
})

peopleRouter.post('/', (req, res) => {
    people.push(req.body)
    res.json({message: 'Person added correctly'})
})

app.use('/people', peopleRouter)