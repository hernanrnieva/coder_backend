export {}

function genColor() {
    var x: number = Math.floor(Math.random() * 255) + 1
    return x
}

console.log(genColor(), genColor(), genColor())