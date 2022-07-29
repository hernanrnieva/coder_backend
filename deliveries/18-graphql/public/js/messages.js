function createMessage() {
    const message = {
        author: {
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('text').value,
    }

    const graphqlQuery = {
        "operationName": "createMessage",
        "query": `mutation createMessage {
            createMessage(data: {
                author: {
                    name: "${message.author.name}",
                    lastname: "${message.author.lastname}",
                    email: "${message.author.email}",
                    age: ${message.author.age},
                    avatar: "${message.author.avatar}"
                },
                text: "${message.text}"
            }) {
                author {
                    email
                },
                text,
                date
            }
        }`
    }

    const options = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(graphqlQuery)
    }

    fetch('/messagesQl', options)
    .then(data => {
        generateMessageHTML()
    })
}

function generateMessageHTML() {
    const graphqlQuery = {
        "operationName" : "generateMessageHTML",
        "query": `query generateMessageHTML { 
            generateMessageHTML
        }`
    }

    const options = {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify(graphqlQuery)
    }

    fetch('/messagesQl', options)
    .then(data => {
        data.json().then((final) => {
            document.getElementById('messages').innerHTML = final.data.generateMessageHTML
        })
    })
}

generateMessageHTML()