let sum = 0
process.on('message', (msg) => {
    let sum = 0
    for(let i = 0; i < 6e9; i++)
        sum += i

    process.send(sum)
})