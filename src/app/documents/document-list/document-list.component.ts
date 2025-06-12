import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document-model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})

export class DocumentListComponent implements OnInit, OnDestroy {
  documentSelectedEvent = new EventEmitter<Document>();
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {
    this.documentService.documentSelectedEvent
   }
   
  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document []) => {
        this.documents = documents;
      })
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}


