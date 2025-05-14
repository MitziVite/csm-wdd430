import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Contact } from '../contact-model';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent  implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [
    new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu",2084963771, "../../assets/images/wdd430_document_wk02files/jacksonk.jpg", null),
    new Contact(2, "Rex Barzee", "barzeer@byui.edu",2084963768, "../../assets/images/wdd430_document_wk02files/barzeer.jpg", null)
  ];

  constructor() { }
  ngOnInit() {

  }
  onSelected(contact: Contact){
    this.selectedContactEvent.emit(contact);
  }
}
