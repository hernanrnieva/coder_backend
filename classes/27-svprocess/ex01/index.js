for(let j = 0; j < process.argv.length; j++) {
    console.log(j + ' --> ' + process.argv[j])
}

console.log('App running in port ' + process.argv[2])