// Crear un proyecto que genere 10000 números aleatorios entre 1 y 20
// Crear un objeto cuyas claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió dicho número

let numbers = []
let objectNumbers = []

const generateNumbers = () => {
    for(i = 0; i < 10000; i++) {
        numbers.push(parseInt(Math.random() * (21 - 1) + 1))
    }
    console.log(numbers)
}

const verify = ()=>{
    let idx
    let counter = 0
    for(let j = 1; j <= 20;) {
        idx = numbers.indexOf(j)
        if(idx != -1) {
            counter ++
            numbers.splice(idx, 1)
        }else{
            if(counter != 0){
                register(j, counter)
            }
            j++
            counter = 0
        }
    }
    console.log(objectNumbers)
}

const register = (key, counter)=>{
    let newRegister = `{${key} : ${counter}}`
    objectNumbers.push(newRegister)
}

generateNumbers()
verify()