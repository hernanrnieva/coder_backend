
function getRandom() {
    return Math.floor(Math.random() * 1000 + 1)
}

process.on('message', (amount) => {
    let dict = {}
    for(let i = 0; i < amount; i++) {
        let random = getRandom().toString()
        if(dict[random] === undefined)
            dict[random] = 1 
        else
            dict[random] = dict[random] + 1
    }

    process.send(dict)
})