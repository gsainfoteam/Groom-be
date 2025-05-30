import { Controller, Sse, Param, Post, Body, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JoinLeaveDto } from './dto/join-leave.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Sse('sse/:uuid')
  sse(@Param('uuid') uuid: number, @Query('roomId') roomId?: string): Observable<any> {
    if (roomId) {
      this.chatService.addUserToRoom(roomId, uuid);
    }
    return this.chatService.getUserStream(uuid);
  }

  // 1:1 대화 내역 조회
  @Get('history')
  getHistory(@Query('userA') userA: string, @Query('userB') userB: string) {
    return this.chatService.getChatHistory(userA, userB);
  }

  // 메시지 전송시 from 정보도 함께 전달
  @Post('send')
  async sendMessage(@Body() body: SendMessageDto) {
    const msg = {
        event: 'new_message',
        data: {
            username: body.nickname,
            message: body.message,
            timestamp: body.timestamp,
            ...(body.image && { image: body.image }),
        },
    };
    await this.chatService.saveMessage(body.roomId, msg);
    this.chatService.broadcastToRoom(body.roomId, msg);
    return { status: 'ok' };
  }

  @Get('messages')
  async getMessages(@Query('roomId') roomId: string) {
    return await this.chatService.getMessages(roomId);
  }

  // 유저 입장 알림
  @Post('join')
  userJoined(@Body() body: JoinLeaveDto) {
    this.chatService.sendMessageToUser(Number(body.to), {
      event: 'user_joined',
      data: {
        username: body.nickname,
        message: body.message,
        timestamp: body.timestamp,
      },
    });
    return { status: 'ok' };
  }

  // 유저 퇴장 알림
  @Post('leave')
  userLeft(@Body() body: JoinLeaveDto) {
    this.chatService.sendMessageToUser(Number(body.to), {
      event: 'user_left',
      data: {
        username: body.nickname,
        message: body.message,
        timestamp: body.timestamp,
      },
    });
    return { status: 'ok' };
  }
}
