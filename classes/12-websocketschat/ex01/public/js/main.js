const socket = io()

const updatePh = (data) => {document.getElementById('ph').innerHTML = JSON.stringify(data, null, 2)}

function render(data) {
    const html = data.map((m, index) => {
        return(`<div>
            <strong>${m.author}</strong>:
            <em>${m.text}</em>
        </div>`)
    }).join(' ')
    document.getElementById('messages').innerHTML = html
}

socket.on('message', (data) => {
    render(data)
})

function addMessage(e) {
    const message = {
        author: document.getElementById('username').value,
        text: document.getElementById('message').value
    }
    socket.emit('message', message)
    return false
}