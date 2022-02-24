let string = 'Hello'

function showString(string, end, delay) {
    let index = 0
    const print = setInterval(() => {
        if(string[index] == undefined){
            end()
            clearInterval(print)
        }else{
            console.log(string[index])
            index++
        }
    }, delay)
}

const end = ()=> {console.log('Finished printing!')}

showString(string, end, 0)
showString(string, end, 250)
showString(string, end, 500)