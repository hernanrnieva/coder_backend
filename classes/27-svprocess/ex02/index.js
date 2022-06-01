const parseArgs = require('minimist')

const options = {
    alias: {
        p: 'port', 
        d: 'debug', 
        m: 'mode'
    }
    // default: {
    //     mode: 'prod',
    //     port: 0,
    //     debug: false
    // }
}

console.log(parseArgs(process.argv.slice(2), options))
