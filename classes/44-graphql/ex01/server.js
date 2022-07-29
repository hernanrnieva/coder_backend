import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"
import crypto from "crypto"

const schema = buildSchema(`
    type Reminder {
        id: ID!,
        title: String,
        description: String,
        timestamp: String
        read: Boolean
    }
    input ReminderInput {
        title: String,
        description: String
    }
    type Query {
        getReminders: [Reminder]
    }
    type Mutation {
        createReminder(data: ReminderInput): Reminder
        readReminder(id: ID!): Reminder,
        deleteReadReminders: [Reminder]
    }
`)

class Reminder {
    constructor(id, { title, description }, timestamp) {
        this.id = id
        this.title = title
        this.description = description
        this.timestamp = timestamp
        this.read = false
    }
}

let reminders = []

function getReminders() {
    return reminders
}

function createReminder({data}) {
    const id = crypto.randomBytes(10).toString("hex")
    const newReminder = new Reminder(id, data, new Date().toLocaleString())
    reminders.push(newReminder)
    console.log(reminders)
    return newReminder
}

function readReminder({id}) {
    let currentReminder
    reminders.forEach((r) => {
        if(r.id === id) {
            r.read = true
            currentReminder = r
        }
    })

    return currentReminder
}

function deleteReadReminders() {
    reminders = reminders.filter(
        r => r.read == false
    )

    return reminders
}

const app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {
        getReminders,
        createReminder,
        readReminder,
        deleteReadReminders
    },
    graphiql: true
}))

app.use(express.static('public'))

const PORT = 8080
app.listen(PORT, () => {
    const msg = `Server up running at PORT: ${PORT}`
    console.log(msg)
})