const fs = require('fs')

// Sync Mode
console.log('\n****Sync Mode****')
fs.writeFileSync('./file.txt', 'Hola Mundo!')

try {
    let data = fs.readFileSync('./false.txt', 'utf-8')
    console.log(data)
} catch (e) {
    console.log('File not found')
}

try {
    let data = fs.readFileSync('./file.txt', 'utf-8')
    console.log(data)
} catch (e) {
    console.log('File not found')
}

fs.appendFileSync('./file.txt', '\nThis is completely added')

try {
    let data = fs.readFileSync('./file.txt', 'utf-8')
    console.log(data)
} catch (e) {
    console.log('File not found')
}

// Async Mode
console.log('\n****Async Mode****')
fs.readFile('./false.txt', 'utf-8', (error, data)=>{
    if(error){
        console.log('File not found')
    } else {
        console.log(data)
    }
})

fs.readFile('./false.txt', 'utf-8', (error, data)=>{
    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
})

fs.readFile('./file.txt', 'utf-8', (error, data)=>{
    if(error){
        console.log(error)
    } else {
        console.log(data)
    }
})