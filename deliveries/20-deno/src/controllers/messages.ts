import { MessageDTO } from '../data/dtos/message.ts'
import { messageService } from '../services/messages.ts'

class MessageController {
    getMessages(): MessageDTO[] {
        return messageService.getMessages()
    }

    createMessage(m: MessageDTO) {
        return messageService.createMessage(m)
    }
}

const messageController = new MessageController()

export {
    messageController
}