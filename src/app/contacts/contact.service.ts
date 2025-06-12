  import {Injectable, EventEmitter} from '@angular/core';
  import {Contact} from './contact-model';
  import {MOCKCONTACTS} from './MOCKCONTACTS';
  import { Subject } from 'rxjs';

  @Injectable({
    providedIn: 'root'
})
  export class ContactService {
    contactChangedEvent = new EventEmitter<Contact[]>();
    contactSelectedEvent = new EventEmitter<Contact>();
    documentListChangedEvent = new Subject<Contact[]>();
    maxContactId: number = 0;
    contacts: Contact [] =[];

    constructor() {
      this.contacts = MOCKCONTACTS;
      this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
      return this.contacts.slice();
    }

    getContact(id: string): Contact {
      for(let contact of this.contacts) {
        if(contact.id === id) {
          return contact;
        }
      }
      return null;
    }

    getMaxId(): number {
      let maxId = 0
      this.contacts.forEach(contact => {
        const currentId = +contact.id;
        if (currentId > maxId) {
          maxId = currentId;
        }
      });
      return maxId;
    }

    addContact(newContact: Contact) {
      if (newContact === null || newContact === undefined) {
        return;
      } else {
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        const contactsListClone = this.contacts.slice();
        this.documentListChangedEvent.next(contactsListClone);
      }
    }

    updateContact(originalContact: Contact, newContact: Contact) {
      if (originalContact === null || newContact === null) {
        return;
      }
      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
        return;
      }
      newContact.id = originalContact.id;
      this.contacts[pos] = newContact;
      const contactsListClone = this.contacts.slice();
      this.documentListChangedEvent.next(contactsListClone);
    }
    
    deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
      this.contacts.splice(pos, 1);
      let contactsListClone = this.contacts.slice();
      this.documentListChangedEvent.next(contactsListClone);
    }
  }