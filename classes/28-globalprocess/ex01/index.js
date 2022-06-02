console.log('Hola')
console.log('cómo')
console.log('estás?')

process.on('beforeExit', () => {
    console.log('Estoy usando el before exit')
})