const socket = io()

const authorSchema = new normalizr.schema.Entity('author', {}, {idAttribute: 'email'})
const messageSchema = new normalizr.schema.Entity('message', {
    author: authorSchema
})
const messagesSchema = new normalizr.schema.Entity('messages', {
    messages: [messageSchema]
})

class MessageNormalizer{
    print(normalized){
        console.log(util.inspect(normalized, false, 12, true))
    }

    normalizeMessages(messages){
        return normalizr.normalize(messages, messagesSchema)
    }
    
    denormalizeMessages(messages){
        return normalizr.denormalize(messages.result, messagesSchema, messages.entities)
    }
}

const messageNormalizer = new MessageNormalizer()

socket.on('product', (data) => {
    try{
        document.getElementById('products').innerHTML = data 
    }catch(e){}
})

function renderMessage(data) {
    const html = data.map((m, index) => {
        return(`<div><p style="color: brown">
            <b style="color: blue">${m.author.email}</b>:
            ${m.date} 
            <i style="color: green">${m.text}</i>
        </p></div>`)
    }).join(' ')
    try{
        document.getElementById('messages').innerHTML = html
    }catch(e){}
}

function showRatio(ratio){
    try{
        document.getElementById('ratio').innerHTML = `Current compresion percentage: <b>%${ratio > 0? parseFloat(ratio).toFixed(2) : 0}</b>`
    }catch(e){}
}

socket.on('message', (data) => {
    const denormalized = messageNormalizer.denormalizeMessages(data)
    const ratio = 100 - 100 * JSON.stringify(data).length/JSON.stringify(denormalized).length
    
    showRatio(ratio)
    renderMessage(denormalized.messages)
})

socket.on('eMessage', (data) => {
    window.alert(`Email entered does not the have correct format. Please input a valid email`)
})

function addMessage() {
    try{
        const author = {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            lastname: document.getElementById('lastname').value,
            age: document.getElementById('age').value,
            avatar: document.getElementById('avatar').value
        }
        const message = {
            author: author,
            text: document.getElementById('text').value,
        }
        socket.emit('message', message)
        return false
    }catch(e){}
}

function addProduct(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    socket.emit('product', product)
    return false
}