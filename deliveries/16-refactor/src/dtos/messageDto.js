class MessageDto {

    constructor(message) {
        this.authorEmail = message.author.email
        this.date = message.date
        this.text = message.text
    }
}

module.exports = MessageDto