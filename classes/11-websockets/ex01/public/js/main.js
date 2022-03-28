const socket = io()

socket.on('welcome', (data) => {
    alert(data)
    socket.emit('notification', 'Welcome message received, thks!')
})

socket.on('history', (data) => {
    document.getElementById('ph').innerHTML = JSON.stringify(data)
})

socket.on('message', (data) => {
    document.getElementById('ph').innerHTML = JSON.stringify(data)
})

function sendM() {
    let message = document.getElementById('inputText').value
    socket.emit('message', message)
}