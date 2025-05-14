import { Component } from '@angular/core';
import { Message } from '../message-model';
@Component({
  selector: 'app-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    { id: '1', subject: 'Greeting', msgText: 'Hello, how are you?', sender: 'Alice' },
    { id: '2', subject: 'Reply', msgText: 'I am fine, thank you!', sender: 'Bob' },
    { id: '3', subject: 'Question', msgText: 'What about you?', sender: 'Alice' },
    { id: '4', subject: 'Response', msgText: 'I am doing well!', sender: 'Bob' }
  ];

  constructor() { }

  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
