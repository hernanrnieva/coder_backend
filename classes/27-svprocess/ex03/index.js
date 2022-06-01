const yargs = require('yargs/yargs')(process.argv.slice(2))
// let args = yargs.alias({
//     p: 'port',
//     m: 'mode',
//     d: 'debug'
// }).argv
// 
// console.log(args)

let args = yargs.default({
    mode: 'prod',
    port: 0,
    debug: false
}).argv

console.log(args)