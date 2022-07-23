const ContainerFile = require('../../persistence/file')

class UserDaoFile extends ContainerFile{
    constructor(){
        super('users.txt')
    }
}

const userDao = new UserDaoFile()

module.exports = userDao