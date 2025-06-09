import { Component, OnInit } from '@angular/core';
import { Document } from '../document-model';
import { DocumentService } from '../document.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'app-document-detail',
  standalone: false,
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
   document: Document;
   nativeWindow: any;
  constructor(
    private documentService: DocumentService,
    private windrefService: WindRefService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.document = this.documentService.getDocument(id);
  });
  this.nativeWindow = this.windrefService.getNativeWindow();
  }
  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
   this.documentService.deleteDocument(this.document);
   this.router.navigate(['/documents']);
  }

}
