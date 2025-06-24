import { Component} from '@angular/core';
import { Contact } from '../contact-model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Input } from '@angular/core';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {
  originalContact: Contact;
  @Input() contact: Contact = new Contact('', '', '', '', '', []);
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';
  invalidContact: boolean = false;
  showInvalidContactMsg = false;
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  onCancel(){
    this.router.navigateByUrl("/contacts")
  }
//   onSubmit(form: NgForm){
//     let value = form.value
//     // let newContact = new Contact('0', value['name'], value['email'], value['phone'], value['imageUrl'], this.groupContacts)
//     let newContact = new Contact(
//   '0',
//   value['name'],
//   value['email'],
//   value['phone'],
//   value['imageUrl'],
//   JSON.parse(JSON.stringify(this.groupContacts))
// );
//     if (this.editMode){
//       this.contactService.updateContact(this.originalContact, newContact)
//     }else{
//       this.contactService.addContact(newContact)
//     }
//     this.router.navigateByUrl("/contacts")
//   }

// onSubmit(form: NgForm){
//   let value = form.value;
  
//   if (this.editMode){
//     // Para editar, mantén el ID original
//     let updatedContact = new Contact(
//       this.originalContact.id,
//       value['name'],
//       value['email'],
//       value['phone'],
//       value['imageUrl'],
//       JSON.parse(JSON.stringify(this.groupContacts))
//     );
//     this.contactService.updateContact(this.originalContact, updatedContact);
//   } else {
//     // Para nuevo contacto, no pases el ID o pasa null
//     let newContact = new Contact(
//       null, // o undefined, dependiendo de tu implementación
//       value['name'],
//       value['email'],
//       value['phone'],
//       value['imageUrl'],
//       JSON.parse(JSON.stringify(this.groupContacts))
//     );
//     this.contactService.addContact(newContact);
//   }
//   this.router.navigateByUrl("/contacts");
// }

onSubmit(form: NgForm){
  let value = form.value;
  
  // Debug: Verificar el estado del grupo antes de guardar
  console.log('Grupo de contactos antes de guardar:', this.groupContacts);
  console.log('Cantidad de contactos en grupo:', this.groupContacts.length);
  
  if (this.editMode){
    let updatedContact = new Contact(
      this.originalContact.id,
      value['name'],
      value['email'],
      value['phone'],
      value['imageUrl'],
      JSON.parse(JSON.stringify(this.groupContacts))
    );
    console.log('Contacto actualizado:', updatedContact);
    this.contactService.updateContact(this.originalContact, updatedContact);
  } else {
    let newContact = new Contact(
      null, // Permitir que el servicio genere el ID
      value['name'],
      value['email'],
      value['phone'],
      value['imageUrl'],
      JSON.parse(JSON.stringify(this.groupContacts))
    );
    console.log('Nuevo contacto a crear:', newContact);
    this.contactService.addContact(newContact);
  }
  this.router.navigateByUrl("/contacts");
}

  // ngOnInit() {
  //   this.route.params.subscribe(
  //     (params: Params) => {
  //       let id = params["id"]
  //       if (!id){
  //         this.editMode = false
  //         return
  //       }
  //       this.originalContact = this.contactService.getContact(id)

  //       if (!this.originalContact){
  //         return
  //       }
  //       this.editMode = true
  //       this.contact = new Contact (    
  //         this.originalContact.id,
  //         this.originalContact.name,
  //         this.originalContact.email,
  //         this.originalContact.phone,
  //         this.originalContact.imageUrl,
  //         this.originalContact.group
  //       )

  //       if (this.contact?.group && this.contact.group.length > 0){
  //         this.groupContacts = JSON.parse(JSON.stringify(this.contact?.group))
  //       }
  //     }
  //   )
  // }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params["id"]
        if (!id){
          this.editMode = false
          return
        }
        this.originalContact = this.contactService.getContact(id)

        if (!this.originalContact){
          return
        }
        this.editMode = true
        this.contact = new Contact (    
          this.originalContact.id,
          this.originalContact.name,
          this.originalContact.email,
          this.originalContact.phone,
          this.originalContact.imageUrl,
          this.originalContact.group
        )
        if (this.contact?.group){
          this.groupContacts = JSON.parse(JSON.stringify(this.contact?.group))
        }
      }
    )
  }
  onRemoveItem(index: number) {
  if (index < 0 || index >= this.groupContacts.length) {
    return;
  }
  this.groupContacts.splice(index, 1);
}

  onRemoveItemFromGroup (index: number) {
    console.log(index)
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    console.log('this should happen')
    this.groupContacts.splice(index, 1);
    console.log('this too should happen')
}


 isInvalidContact(newContact: Contact){
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      this.invalidContact = true
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id) {
        this.invalidContact = true
        return true;
      }
    }
    return false;
    
  }

addToGroup(event: CdkDragDrop<Contact[]>) {
  const selectedContact: Contact = event.previousContainer.data[event.previousIndex];
  if (this.isInvalidContact(selectedContact)) {
    this.showInvalidContactMsg = true;
    return;
  }
  this.groupContacts.push(selectedContact);
  this.showInvalidContactMsg = false;
}

}
