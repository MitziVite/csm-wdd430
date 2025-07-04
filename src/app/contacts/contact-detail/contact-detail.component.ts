import { Component, Input } from '@angular/core';
import { Contact } from '../contact-model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  @Input() contact: Contact;
  constructor(private contactService: ContactService, private router: Router, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.contact = this.contactService.getContact(id);
    })
  }

  onDelete(){
    if (this.contact){
      this.contactService.deleteContact(this.contact)
    }
    this.router.navigateByUrl('/contacts')
  }
}
