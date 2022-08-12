import { MessageDTO } from '../data/dtos/message.ts'

class MessageService {
    messageList: MessageDTO[] = []

    getMessages(): MessageDTO[] {
        return this.messageList
    }

    createMessage(message: MessageDTO): MessageDTO {
        this.messageList.push(message)
        return message
    }
}

const messageService = new MessageService()

export {
    messageService
}