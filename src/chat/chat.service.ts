import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { db } from '../db/drizzle'; 
import { messages } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ChatService {
  private userStreams: Map<number, Subject<any>> = new Map();
  private roomMessages: Map<string, any[]> = new Map();
  private roomUsers: Map<string, Set<number>> = new Map();

  private getChatKey(user1: string, user2: string): string {
    return [user1, user2].sort().join('_');
  }

  // 메시지 저장
  async saveMessage(roomId: string, msg: any) {
    await db.insert(messages).values({
      roomId,
      sender: msg.data.nickname,
      message: msg.data.message,
      image: msg.data.image ?? null,
      sentAt: msg.data.timestamp ? new Date(msg.data.timestamp) : new Date(),
    });
  }

  // 메시지 조회
  async getMessages(roomId: string) {
    return await db.select().from(messages).where(eq(messages.roomId, roomId)).orderBy(messages.sentAt);
  }

  broadcastToRoom(roomId: string, message: any) {
    const users = this.roomUsers.get(roomId);
    if (!users) return;
    for (const uuid of users) {
      this.sendMessageToUser(uuid, message);
    }
  }

  addUserToRoom(roomId: string, uuid: number) {
    if (!this.roomUsers.has(roomId)) {
        this.roomUsers.set(roomId, new Set());
    }
    const users = this.roomUsers.get(roomId);
    if (users) {
        users.add(uuid);
    }
  }


  getUserStream(uuid: number): Observable<any> {
    let subject = this.userStreams.get(uuid);
    if (!subject) {
      subject = new Subject();
      this.userStreams.set(uuid, subject);
    }
    return subject.asObservable();
  }

  sendMessageToUser(uuid: number, message: any, from?: string) {
    let subject = this.userStreams.get(uuid);
    if (!subject) {
      subject = new Subject();
      this.userStreams.set(uuid, subject);
    }
    subject.next({
      data: JSON.stringify(message),
    });


    if (from) {
      const key = this.getChatKey(uuid.toString(), from);
      if (!this.roomMessages.has(key)) {
        this.roomMessages.set(key, []);
      }
      const history = this.roomMessages.get(key);
      if (history) {
        history.push(message);
      }
    }
  }

  getChatHistory(userA: string, userB: string): any[] {
    const key = this.getChatKey(userA, userB);
    return this.roomMessages.get(key) || [];
  }
}