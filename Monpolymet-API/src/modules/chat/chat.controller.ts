import { Controller, Post, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async message(@Body('message') message: string, @Query('lang') lang?: string) {
    return this.chatService.processMessage(message, lang || 'mn');
  }
}
