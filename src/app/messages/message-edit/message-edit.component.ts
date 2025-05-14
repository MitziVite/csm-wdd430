import { Component,OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Message } from '../message-model';
@Component({
  selector: 'app-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  currentSender: string = 'Mitzi';
  @ViewChild('subject') subjectInput: ElementRef;
  @ViewChild('msgText') messageInput: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  constructor() {}
  ngOnInit() {
  }
  onSendMessage(){
      const subject = this.subjectInput.nativeElement.value;
      const msgText = this.messageInput.nativeElement.value;

      const newMessage = new Message(
        '1', 
        subject,
        msgText, 
        this.currentSender 
      );
    

      this.addMessageEvent.emit(newMessage);
    
  }

  onClear(){
    this.subjectInput.nativeElement.value = '';
    this.messageInput.nativeElement.value = '';
  }
}
