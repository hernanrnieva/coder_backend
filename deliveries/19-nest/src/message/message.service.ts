import { Injectable } from '@nestjs/common';
import { MessageDTO } from './dto/message.dto';

@Injectable()
export class MessageService {
  messageList: MessageDTO[] = [];

  getMessages(): MessageDTO[] {
    return this.messageList;
  }

  createMessage(message: MessageDTO): MessageDTO {
    this.messageList.push(message);
    return message;
  }
}
