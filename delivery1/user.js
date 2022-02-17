class User {
    constructor(name, lastName, pets, books){
        this.name = name
        this.lastName = lastName
        this.pets = pets
        this.books = books
    }

    getFullName(){
        return `${this.name} ${this.lastName}`
    }

    addPet(name){
        this.pets.push(name)
    }

    countPets(){
        return this.pets.length
    }

    addBook(name, author){
        this.books.push({name: name, author: author})
    }

    getBookNames(){
        return user.books.map((book)=>book.name)
    }
}

// User declaration
let user = new User('Hernan', 'Nieva', ['Lola', 'Juani'],
                    [{name: 'Duma Key', author: 'Stephen King'},
                    {name: 'The Analyst', author: 'John Katzenbach'},
                    {name: 'Mr. Mercedes', author: 'Stephen King'}])

// Name
console.log(`User's full name is ${user.getFullName()}`)
console.log('\n')

// Pets
console.log(`User currently has ${user.countPets()} pets`)
console.log(`User's current pets are: ${user.pets}`)

user.addPet('Pancho')
console.log(`User now has ${user.countPets()} pets`)
console.log(`User's updated pets are: ${user.pets}`)

user.addPet('Millie')
user.addPet('Nati')
console.log(`User now has ${user.countPets()} pets`)
console.log(`User's updated pets are: ${user.pets}`)
console.log('\n')

// Books
console.log(`User's current books are: ${user.getBookNames()}`)

user.addBook('It', 'Stephen King')
console.log(`User's updated books are: ${user.getBookNames()}`)

user.addBook('Colorado Kid', 'Stephen King')
user.addBook('The Dead Student', 'John Katzenbach')
console.log(`User's updated books are: ${user.getBookNames()}`)