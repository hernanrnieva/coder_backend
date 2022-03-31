const socket = io()

function renderProduct(data) {
    const html = data.map((m, index) => {
        return(`<div><p style="color: brown">
            <b style="color: blue">${m.email}</b>:
            ${m.date} 
            <i style="color: green">${m.text}</i>
        </p></div>`)
    }).join(' ')
    document.getElementById('messages').innerHTML = html
}

socket.on('product', (data) => {
    document.getElementById('products').innerHTML = data 
})

function renderMessage(data) {
    const html = data.map((m, index) => {
        return(`<div><p style="color: brown">
            <b style="color: blue">${m.email}</b>:
            ${m.date} 
            <i style="color: green">${m.text}</i>
        </p></div>`)
    }).join(' ')
    document.getElementById('messages').innerHTML = html
}

socket.on('message', (data) => {
    renderMessage(data)
})

function addMessage(e) {
    const message = {
        email: document.getElementById('email').value,
        text: document.getElementById('text').value
    }
    socket.emit('message', message)
    return false
}

function addProduct(e) {
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    console.log('hi')
    socket.emit('product', product)
    return false
}