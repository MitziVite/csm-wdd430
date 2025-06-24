import { Injectable, EventEmitter } from '@angular/core';
import {Message} from './message-model';
import { MOCKMESSAGES } from '../messages/MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message [] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
   }

  getMessages(): Message[] {
    return this.messages.slice();
  }
  getMessage(id: string): Message {
    for(let message of this.messages) {
      if(message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
  }
  getMaxId(): number {
  let maxId = 0;
  for (let message of this.messages) {
    const currentId = Number(message.id);
    if (!isNaN(currentId) && currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
}
getMessagesFromServer() {
  this.http.get<Message[]>('https://csmproject-b3996-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages ?? [];
          this.maxMessageId = this.getMaxId();
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error(error);
        }
      );
}
storeMessages(): void {
    const messagesString = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(
      'https://csmproject-b3996-default-rtdb.firebaseio.com/messages.json',
      messagesString,
      { headers }
    ).subscribe(
      () => {
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
