process.on('exit', () => {
    console.log(obj)
    console.log(errorCode)
}) 

let errorCode = 0
let obj = {}
const args = process.argv.slice(2).sort((a, b) => {return a - b})

// No args error
if(args.length == 0) {
    obj = {
        error: {
            description: 'empty entry'
        }
    }
    errorCode = -4
    process.exit()
}

// Type check
let error = false
const arrType = args.map(e => {
    if(isNaN(parseInt(e))) {
        error = true
        return typeof 'sd'
    }
    return typeof parseInt(e)
})

// Error check
if(error) {
    obj = {
        error: {
            description: 'data types error',
            numbers: args,
            types: arrType
        }
    }
    errorCode = -5
    process.exit()
}

// ### No errors ###
// Avg calculation
let sum = 0
args.forEach(element => {
    sum += parseInt(element) 
})

obj = {
    data: {
        numbers: args,
        avg: sum/args.length,
        max: args[args.length - 1],
        min: args[0],
        exec: process.title,
        pid: process.pid
    }
}