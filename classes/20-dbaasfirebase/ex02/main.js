const admin = require("firebase-admin");
const configs = require("./bd/class-20-coder-firebase-adminsdk-sjdsy-c3641c97ce.json");

admin.initializeApp({
    credential: admin.credential.cert(configs),
    databaseURL: "https://class-20-coder-default-rtdb.firebaseio.com"
});

const clients = [
    {
        name: "Hernan",
        lastname: "Nieva",
        age: 23
    },
    {
        name: "Julian",
        lastname: "Nieva",
        age: 20
    },
    {
        name: "Ramiro",
        lastname: "Nieva",
        age: 45
    },
    {
        name: "Adriana",
        lastname: "Pisarski",
        age: 40
    },
    {
        name: "Alina",
        lastname: "Pisarski",
        age: 70
    },
    {
        name: "Milagros",
        lastname: "Benavides",
        age: 22
    }
]

async function CRUD(){
    const db = admin.firestore()
    const query = db.collection('users')

    try{
        // Insert
        // const id = 3
        // const doc = query.doc()
        // await doc.create({
        //     name: "Juancito",
        //     lastname: "Pisarski",
        //     age: 40
        // })

        // Update
        // const id = 2
        // const doc = query.doc(`${id}`)
        // const item = await doc.update({name: 'Paulita'})
        // console.log(item)

        // Delete
        // const id = 3
        // const doc = query.doc(`${id}`)
        // const item = await doc.delete()
        // console.log(item)

        // Read All
        const queryAll = await query.get()
        const response = queryAll.docs.map((doc) => {
            console.log(doc.data())
        })
    }catch(e){
        console.log(e)
    }
}

CRUD()