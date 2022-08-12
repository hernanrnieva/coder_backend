import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDTO } from './dto/message.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {};

  @Get()
  getMessages(): MessageDTO[] {
    return this.messageService.getMessages();
  }

  @Post()
  createMessage(@Body() message: MessageDTO): MessageDTO {
    return this.messageService.createMessage(message)
  }
}