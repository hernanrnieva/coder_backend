const products = [
    {id: 1, name: "Square", price: 323.45},
    {id: 2, name: "Calculator", price: 3.05},
    {id: 3, name: "Balloon", price: 250.33},
    {id: 4, name: "Paint", price: 200.25},
    {id: 5, name: "Agenda", price: 45.00}
]

let names = ""
let totalPrice = 0
const pricesArray = [];

(()=>{
    for(let product in products){
        names += products[product].name + ", "
        totalPrice += products[product].price
        pricesArray.push(products[product].price)
    }
})();

console.log(names)
console.log(totalPrice)
console.log(Math.max.apply(null, pricesArray))
console.log(Math.min.apply(null, pricesArray))