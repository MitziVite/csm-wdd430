import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Contact } from '../contact-model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  subject: Subscription;
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {
    this.contactService.contactSelectedEvent
   }
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
     this.subject = this.contactService.documentListChangedEvent.subscribe( contactList =>{
      this.contacts = contactList
    })
  }
  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);

  }
  ngOnDestroy(){
    this.subject?.unsubscribe()
  }
}

