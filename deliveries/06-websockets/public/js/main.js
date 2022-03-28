const socket = io()

const updatePh = (data) => {document.getElementById('ph').innerHTML = JSON.stringify(data, null, 2)}

function render(data) {
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
    render(data)
})

function addMessage(e) {
    const message = {
        email: document.getElementById('email').value,
        text: document.getElementById('message').value
    }
    socket.emit('message', message)
    return false
}